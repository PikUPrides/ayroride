# AYRO Waitlist & Referral System - User Flow Guide

## Overview
This guide explains how users interact with the AYRO waitlist and referral system, from joining to earning rewards.

---

## 1. Join Waitlist Flow

### Step 1: Fill Out Waitlist Form
**Location:** `/join-our-waitlist` page

**User provides:**
- Name
- Email address
- Phone number
- ZIP code
- User type (Driver, Rider, or Both)

**What happens:**
1. Form validates all fields
2. Data is sent to `/api/waitlist` endpoint
3. User is added to ReferralHero with tag `AYRO_WAITLIST_MEMBER`
4. User receives confirmation email with verification code

### Step 2: Email Verification
**User receives email with:**
- Subject: "Verify Your Email - AYRO"
- Verification code (6 digits)
- Valid for 10 minutes

**User enters code:**
1. Code is validated by ReferralHero
2. Email is marked as verified
3. User proceeds to phone verification

### Step 3: Phone Verification
**User receives SMS with:**
- Verification code (6 digits)
- Valid for 10 minutes

**User enters code:**
1. Code is validated by ReferralHero
2. Phone is marked as verified
3. User is redirected to referral dashboard

### Step 4: Referral Dashboard
**User sees:**
- Welcome message
- Unique referral link
- Referral count
- Rewards progress
- Social sharing buttons

**Next steps:**
- Share referral link with friends
- Track referrals and rewards
- Logout when done

---

## 2. Login Flow (Returning Users)

### When to Use Login
- User has previously joined waitlist
- User wants to access their referral dashboard
- User wants to check referral progress

### Step 1: Navigate to Login
**Location:** `/referral-login` page

**User provides:**
- Email address only

**What happens:**
1. ReferralHero checks if email exists
2. If verified previously:
   - User goes directly to dashboard
   - No re-verification needed (if "Require repeated verification" is OFF)
3. If not verified or verification expired:
   - User receives new verification code
   - Must verify email again

### Step 2: Email Verification (if needed)
- User receives verification code via email
- Enters code to access dashboard
- May need phone verification depending on settings

### Step 3: Dashboard Access
- User sees their referral dashboard
- All previous data and referrals are preserved
- Can continue sharing and earning rewards

---

## 3. Switch Account Flow

### When to Use Switch Account
- User wants to logout and login with different email
- User accidentally used wrong email
- Multiple users sharing same device

### How It Works
**Location:** Link appears on verification/dashboard pages

**What happens:**
1. User clicks "Switch Account" link
2. Current session is cleared
3. User is redirected to login page (`/referral-login`)
4. Can enter different email to login
5. Must verify email (and phone if required)

**Use cases:**
- "I entered wrong email, want to use correct one"
- "This is my work email, want to use personal email"
- "My friend wants to login on my device"

---

## 4. Referral Dashboard Features

### What Users See

**Header Section:**
- AYRO logo
- Logout button

**Welcome Section:**
- Personalized greeting with user's name
- Brief description of referral program

**Referral Link Section:**
- Unique referral URL (e.g., `referralhero.com/code123`)
- Copy button to copy link
- Visual confirmation when copied

**Social Sharing Buttons:**
- Facebook
- Twitter
- LinkedIn
- WhatsApp
- Email
- Each opens share dialog with pre-filled message

**Referral Stats:**
- Total referrals count
- Current reward tier
- Progress to next reward
- Visual progress bar

**Rewards Section:**
- List of available rewards
- Requirements for each reward
- Visual indicators (locked/unlocked)
- Example rewards:
  - 5 referrals: $10 ride credit
  - 10 referrals: $25 ride credit
  - 25 referrals: Premium membership

**Footer:**
- Links to terms and privacy policy
- Contact information
- Copyright notice

---

## 5. Referral Process

### How Referrals Work

**Step 1: User Shares Link**
- User copies their unique referral link
- Shares via social media, email, or direct message
- Link contains unique tracking code

**Step 2: Friend Clicks Link**
- Friend clicks the referral link
- ReferralHero records the click
- Friend is taken to AYRO waitlist page
- Referral tracking cookie is set

**Step 3: Friend Joins Waitlist**
- Friend fills out waitlist form
- ReferralHero links new signup to referrer
- Friend also receives their own referral link

**Step 4: Referral is Credited**
- Original user's referral count increases
- Rewards progress updates automatically
- User can see new referral in dashboard

**Step 5: Rewards Unlock**
- When user hits referral milestone (5, 10, 25, etc.)
- Reward tier unlocks automatically
- User receives notification email
- Reward details shown in dashboard

---

## 6. Verification Code System

### Email Verification Codes

**Format:**
- 6-digit numeric code
- Example: 123456

**Validity:**
- Valid for 10 minutes
- After 10 minutes, user must request new code

**Delivery:**
- Sent via email automation
- Subject: "Verify Your Email - AYRO"
- From: AYRO Rides <noreply@ayrorides.com>

**What if code doesn't arrive?**
1. Check spam/junk folder
2. Wait 1-2 minutes (email delivery delay)
3. Click "Resend Code" button
4. Verify email address is correct

### Phone Verification Codes

**Format:**
- 6-digit numeric code
- Example: 123456

**Validity:**
- Valid for 10 minutes
- After 10 minutes, user must request new code

**Delivery:**
- Sent via SMS
- From: ReferralHero or AYRO

**What if code doesn't arrive?**
1. Wait 1-2 minutes (SMS delivery delay)
2. Check phone number is correct
3. Click "Resend Code" button
4. Ensure phone can receive SMS

---

## 7. Common User Scenarios

### Scenario 1: New User Joins Waitlist
```
User visits website
→ Clicks "Join Waitlist"
→ Fills out form with all details
→ Submits form
→ Receives email verification code
→ Enters code
→ Receives phone verification code
→ Enters code
→ Lands on referral dashboard
→ Copies referral link
→ Shares with friends
```

### Scenario 2: Returning User Checks Progress
```
User visits website
→ Clicks "Login" (in header or direct link)
→ Enters email address
→ Receives verification code (if required)
→ Enters code
→ Lands on referral dashboard
→ Sees updated referral count
→ Checks reward progress
→ Shares link again
```

### Scenario 3: User Switches Account
```
User is on verification page
→ Realizes used wrong email
→ Clicks "Switch Account"
→ Redirected to login page
→ Enters correct email
→ Verifies email and phone
→ Accesses correct dashboard
```

### Scenario 4: Friend Gets Referred
```
Friend receives referral link via text/email
→ Clicks link
→ Lands on AYRO waitlist page
→ Sees "Referred by [Name]" message (optional)
→ Fills out waitlist form
→ Verifies email and phone
→ Gets their own referral dashboard
→ Original user sees referral count increase
```

---

## 8. Technical Flow Details

### Waitlist Submission API
**Endpoint:** `POST /api/waitlist`

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "zipCode": "75001",
  "userType": "Both"
}
```

**What happens:**
1. Server validates all fields
2. Calls ReferralHero API to create subscriber
3. Sets `extra_field_3` to `AYRO_WAITLIST_MEMBER`
4. ReferralHero sends verification email
5. Returns success response
6. Frontend redirects to verification page

**Response:**
```json
{
  "message": "Successfully joined waitlist",
  "subscriber_id": "sub_abc123"
}
```

### Login API
**Endpoint:** `POST /api/referral-login`

**Request body:**
```json
{
  "email": "john@example.com"
}
```

**What happens:**
1. Server checks if email exists in ReferralHero
2. If exists and verified:
   - Returns subscriber data
   - Frontend redirects to dashboard
3. If exists but not verified:
   - Triggers new verification email
   - User must verify again
4. If doesn't exist:
   - Returns error
   - Prompts user to join waitlist first

### Verification Flow
**Handled by:** ReferralHero Widget

**Process:**
1. User enters verification code
2. Widget sends code to ReferralHero API
3. ReferralHero validates code
4. If valid:
   - Marks email/phone as verified
   - Returns session token
   - Widget redirects to next step
5. If invalid:
   - Shows error message
   - Allows retry or resend

---

## 9. ReferralHero Widget Integration

### Widget Configuration
**Widget ID:** `MF2f0c6063df`

**Loaded via:**
```javascript
// Global ReferralHero script in layout.tsx
ReferralHero.init('RH0d3a5b93dd')
```

**Widget Types:**

1. **Waitlist Widget** (Join form)
   - Embedded in `/join-our-waitlist` page
   - Collects all user information
   - Triggers email/phone verification

2. **Login Widget**
   - Embedded in `/referral-login` page
   - Email-only login
   - Checks existing subscribers

3. **Dashboard Widget**
   - Embedded in `/referral` page
   - Shows user stats and referral link
   - Displays rewards progress

### Widget Loading States
**ReferralHeroWidget.tsx** handles:
- Loading spinner while widget initializes
- Checks every 100ms if widget has loaded
- 3-second fallback timeout
- Smooth fade-in animation when ready
- Prevents flash of unstyled content (FOUC)

---

## 10. Email Automations

### Welcome/Verification Email
**Trigger:** User joins waitlist

**Content:**
- Verification code
- Code expiration time (10 minutes)
- Instructions to enter code
- Support contact information

**Template variables:**
- `%name%` - User's name
- `%verify_code%` - 6-digit verification code
- `%company_name%` - AYRO Rides

### Phone Verification SMS
**Trigger:** Email verified, needs phone verification

**Content:**
- Verification code
- Short message
- Code expiration time

### Referral Milestone Email
**Trigger:** User reaches referral milestone (5, 10, 25 referrals)

**Content:**
- Congratulations message
- New reward unlocked
- Updated referral count
- Next milestone information
- Call-to-action to keep sharing

---

## 11. User Data Storage

### ReferralHero Fields

**Standard fields:**
- `name` - User's full name
- `email` - Email address (unique identifier)
- `phone_number` - Phone number with country code

**Custom fields:**
- `extra_field` - ZIP code
- `extra_field_2` - User type (Driver/Rider/Both)
- `extra_field_3` - Tag (`AYRO_WAITLIST_MEMBER`)

**Verification status:**
- `confirmed` - Email verified (true/false)
- `phone_confirmed` - Phone verified (true/false)

**Referral tracking:**
- `referral_code` - User's unique referral code
- `referred_by` - Who referred this user
- `referral_count` - Number of successful referrals

---

## 12. Error Handling

### Common Errors

**"Email already exists"**
- User has already joined waitlist
- Solution: Use login instead of join waitlist
- Redirect to `/referral-login`

**"Invalid verification code"**
- Code is incorrect or expired
- Solution: Click "Resend Code" to get new code
- User can retry up to 3 times before lockout

**"Verification code expired"**
- More than 10 minutes have passed
- Solution: Request new code
- Previous code is no longer valid

**"Phone number invalid"**
- Phone number format not recognized
- Solution: Enter with country code, e.g., +1 (555) 123-4567
- Use proper format with area code

**"Server error"**
- API request failed
- Solution: Try again in a few moments
- Check internet connection
- Contact support if persists

---

## 13. Best Practices for Users

### For Best Experience:

**Joining Waitlist:**
- ✅ Use a valid email you check regularly
- ✅ Provide accurate phone number for SMS
- ✅ Use real information (name, ZIP code)
- ✅ Complete verification within 10 minutes
- ❌ Don't use temporary/disposable emails
- ❌ Don't close browser during verification

**Sharing Referral Link:**
- ✅ Share your unique link (don't modify it)
- ✅ Share with people genuinely interested in AYRO
- ✅ Explain what AYRO is and why they should join
- ✅ Share across multiple channels (social, email, text)
- ❌ Don't spam your link
- ❌ Don't create fake accounts to refer yourself

**Checking Progress:**
- ✅ Login periodically to check referral count
- ✅ Keep track of your progress to rewards
- ✅ Share link again when close to milestone
- ❌ Don't create multiple accounts
- ❌ Don't share login credentials

---

## 14. Support & Troubleshooting

### Need Help?

**Common Questions:**
- "I didn't receive verification code" → Check spam, wait 2 minutes, click resend
- "My code doesn't work" → Ensure you're entering it within 10 minutes
- "I forgot my email" → Contact support with name and phone number
- "How do I share my link?" → Copy from dashboard, share via any platform
- "When do I get my reward?" → Rewards activate when you hit milestones

**Contact Support:**
- Email: support@ayrorides.com
- Response time: 24-48 hours
- Include: Name, email, issue description

---

## 15. Privacy & Security

### How We Protect Your Data

**Encryption:**
- All data transmitted via HTTPS
- API keys secured in environment variables
- .env files never exposed to public

**Data Usage:**
- Email: Verification and communications only
- Phone: Verification only (no spam)
- Name: Personalization and rewards
- ZIP code: Regional analytics only

**User Rights:**
- Request data deletion anytime
- Opt out of communications
- Update information in dashboard
- Export your data on request

**Third-Party Services:**
- ReferralHero: Referral tracking and management
- Compliance: GDPR, CCPA compliant
- Data not sold to third parties

---

## Quick Reference

### Key URLs
- Join Waitlist: `https://ayrorides.com/join-our-waitlist`
- Login: `https://ayrorides.com/referral-login`
- Dashboard: `https://ayrorides.com/referral`
- Homepage: `https://ayrorides.com`

### Key Timeframes
- Verification code validity: 10 minutes
- Email delivery: 1-2 minutes
- SMS delivery: 1-2 minutes
- Dashboard updates: Real-time

### Key Contacts
- Support: support@ayrorides.com
- General: info@ayrorides.com
- Website: https://ayrorides.com

---

**Last Updated:** February 14, 2026
**Version:** 1.0
**Author:** AYRO Development Team
