import { useCallback } from 'react';

export const useCAPI = () => {
  const trackEvent = useCallback(async (eventName, userData = {}, customData = {}) => {
    try {
      const fbp = document.cookie
        .split('; ')
        .find((row) => row.startsWith('_fbp='))
        ?.split('=')[1];

      const fbclid = sessionStorage.getItem('fbclid');
      const fbc = fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;

      const payload = {
        eventName,
        userData: { ...userData, fbp, fbc },
        customData: {
          value: customData.value || 0,
          currency: customData.currency || 'INR',
          ...customData,
        },
      };

      const response = await fetch('/.netlify/functions/capi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`✅ CAPI Event Tracked: ${eventName}`, result);
      } else {
        console.warn(`⚠️ CAPI Warning: ${eventName}`, result);
      }

      return result;
    } catch (error) {
      console.error(`❌ CAPI Error tracking ${eventName}:`, error);
    }
  }, []);

  return { trackEvent };
};
