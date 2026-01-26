# Testing Guide - Delhi Six Couture Improvements

## 🧪 How to Test Each Improvement

### 1. **Unique Design Descriptions**
**Action:** Navigate to `/collection` then click any design
**Expected:** Each design shows different, detailed description unique to that style
- Design 1: Heritage focus with zari work
- Design 2: Fusion with contemporary edge
- Design 3: Ethereal with lace details
- Design 4: Minimalist with clean lines
- Design 5: Opulent with maximum embellishment

---

### 2. **Pricing & Timeline Info**
**Action:** On design details page, check the details grid
**Expected:** See 6 items including:
- Investment: e.g., "₹1,50,000 - ₹2,00,000" (in red)
- Timeline: e.g., "8-12 weeks"

---

### 3. **Email Domain Fix**
**Action:** Scroll to contact form footer or visit `/contact` page
**Expected:** Email shows as `hello@delhisixcouture.in` (not .example)

---

### 4. **Real Customer Images**
**Action:** Scroll to testimonials section on homepage
**Expected:** See real professional photos instead of placeholder text
- All 3 testimonials show actual profile images
- Images load from Unsplash

---

### 5. **Form Validation**
**Action:** Go to `/contact` and try to submit form
**Test Cases:**
- Leave Name empty → see "Please enter your name" error
- Enter invalid email → see "Please enter a valid email" error
- Leave Wedding Date empty → see "Please select a wedding date" error
- Fix the error → error message disappears
- Fill all required fields → form submits to WhatsApp

**Expected Success State:**
- Green background success message appears
- Message says: "Your enquiry has been sent to WhatsApp. Our artisans will connect within 24 hours..."
- Form auto-clears after 2 seconds

---

### 6. **Back Button**
**Action:** Visit any design details page
**Expected:** Below the "Schedule Your Consultation" button, see "← Back to Collection" link
- Clicking it returns to collection page

---

### 7. **Button Styling**
**Action:** Observe all buttons across site
**Expected:**
- "Schedule Your Consultation" - Deep red (primary)
- "← Back to Collection" - Outlined/secondary style
- "Book Your Consultation" - White with red text
- "💬 Quick Chat" - WhatsApp green
- Buttons have hover effects (lift up slightly)

---

## 🔗 Test URLs

1. **Homepage:** http://localhost:3000/
2. **Collection:** http://localhost:3000/collection
3. **Design 1 Details:** http://localhost:3000/collection/1
4. **Contact:** http://localhost:3000/contact

---

## ✓ Checklist for Sign-Off

- [ ] All 5 designs have unique descriptions
- [ ] Pricing visible on all designs
- [ ] Timeline visible on all designs
- [ ] Email domain is correct (.in, not .example)
- [ ] Testimonial images are real photos
- [ ] Form validates name field
- [ ] Form validates email field
- [ ] Form validates wedding date field
- [ ] Errors clear when user fixes input
- [ ] Success message is green and informative
- [ ] Back button appears on design pages
- [ ] Back button works correctly
- [ ] WhatsApp link includes all form data
- [ ] All buttons have proper styling
- [ ] No console errors

---

## 💡 What Changed Code-Wise

### App.js Changes:
1. `descriptions` object - 5 new unique descriptions
2. `details` object - added `price` and `timeline` properties
3. Testimonials data - new image URLs and enhanced quotes
4. `DesignDetailsPage` - added pricing/timeline to grid, added back button
5. `ContactPage` - added error state management and validation logic
6. Form inputs - now display error messages inline
7. Success message - styled with green background

### styles.css Changes:
1. Added `.btn--primary` variant
2. Added `.btn--secondary` variant with outline style
3. Added `.btn--white` variant
4. Updated `.btn--whatsapp-form` style
5. Improved all button hover states

---

## 🐛 Troubleshooting

**Issue:** Images not loading
- Check internet connection
- Verify Unsplash URL is accessible
- Check browser console for network errors

**Issue:** Form not validating
- Check browser console for JS errors
- Verify all state variables are initialized
- Check if email regex is working: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**Issue:** WhatsApp link not opening
- Try clicking on any WhatsApp button
- Check if URL is properly encoded
- Verify phone number is correct: `917011764857`

---

**Testing Date:** January 25, 2026
**Status:** Ready for customer review
