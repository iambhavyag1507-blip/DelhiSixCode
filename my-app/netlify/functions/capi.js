const https = require('https');
const crypto = require('crypto');

const PIXEL_ID = '980512221438613';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

// Hash PII (email, phone, name)
function hashString(str) {
  if (!str) return undefined;
  return crypto
    .createHash('sha256')
    .update(str.toLowerCase().trim())
    .digest('hex');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { eventName, userData = {}, customData = {} } = JSON.parse(event.body);

    // Get client IP and user agent
    const clientIp = event.headers['client-ip'] || event.headers['x-forwarded-for'];
    const userAgent = event.headers['user-agent'];

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            em: userData.email ? hashString(userData.email) : undefined,
            ph: userData.phone ? hashString(userData.phone.replace(/\D/g, '')) : undefined,
            fn: userData.firstName ? hashString(userData.firstName) : undefined,
            ln: userData.lastName ? hashString(userData.lastName) : undefined,
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            fbc: userData.fbc,
            fbp: userData.fbp,
          },
          custom_data: {
            value: customData.value || 0,
            currency: customData.currency || 'INR',
            ...customData,
          },
          event_id: `${eventName}_${Date.now()}_${Math.random()}`,
          event_source: 'website',
        },
      ],
      test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
    };

    // Remove undefined values
    Object.keys(payload.data[0].user_data).forEach((key) => {
      if (!payload.data[0].user_data[key]) delete payload.data[0].user_data[key];
    });

    return new Promise((resolve) => {
      const url = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
      const options = {
        hostname: 'graph.facebook.com',
        path: `/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve({
              statusCode: res.statusCode,
              body: JSON.stringify(parsedData),
            });
          } catch (e) {
            resolve({
              statusCode: res.statusCode,
              body: data,
            });
          }
        });
      });

      req.on('error', (e) => {
        console.error('CAPI Error:', e);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: e.message }),
        });
      });

      req.write(JSON.stringify(payload));
      req.end();
    });
  } catch (error) {
    console.error('Handler Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
