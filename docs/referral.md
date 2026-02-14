# ReferralHero Integration Documentation

## Overview

This document explains how the AYRO waitlist and referral system integrates with ReferralHero. The implementation uses the **ReferralHero REST API** for subscriber management and the **ReferralHero Dashboard Widget** for the referral interface.

## Architecture

### Key Components

1. **Waitlist Form** (`/join-our-waitlist`) - Custom form for new signups
2. **Referral Dashboard** (`/referral`) - Shows ReferralHero widget (verification or dashboard)
3. **Referral Login** (`/referral-login`) - Allows existing users to access their dashboard
4. **API Routes** - Handle subscriber creation and lookup

### Technology Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Third-Party**: ReferralHero REST API v2
- **Authentication**: Cookie-based sessions

---

## ReferralHero Configuration

### Environment Variables

```env
REFERRALHERO_API_KEY=your_api_key_here
REFERRALHERO_UUID=your_campaign_uuid_here
```

### Widget Configuration

- **Widget ID**: `MF2f0c6063df`
- **Campaign UUID**: `RH0d3a5b93dd` (used in global script)
- **Session Cookie Name**: `__maitre-session-MF2f0c6063df`

### Important Settings

In ReferralHero admin panel:
- **Double Opt-in**: ENABLED (requires email + phone verification)
- **Verification Method**: Email/SMS code verification
- **Phone Number Field**: Use the real `phone_number` field (NOT custom fields)

---

## Critical Implementation Details

### Session Cookie Approach

**This is the correct way to integrate ReferralHero with REST API**, as confirmed by ReferralHero support:

When using the ReferralHero REST API (instead of the embedded form), the standard signup flow is NOT triggered automatically. To properly show the verification screen and dashboard, you must:

1. **Create subscriber via REST API** → Get `subscriber_id`
2. **Set session cookie** → `__maitre-session-{widgetId} = subscriber_id`
3. **Redirect to dashboard page** → Page with ReferralHero global script and widget container
4. **Verification/Dashboard appears** → Widget detects cookie and shows appropriate screen

### Cookie Format

```javascript
const widgetId = 'MF2f0c6063df';
const cookieName = `__maitre-session-${widgetId}`;
const subscriberId = 'subscriber_id_from_api';
const expirationDays = 30;
const date = new Date();
date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
const expires = `expires=${date.toUTCString()}`;

document.cookie = `${cookieName}=${subscriberId};${expires};path=/;SameSite=Lax`;
```

**IMPORTANT**:
- Cookie MUST be set BEFORE redirecting to the referral page
- Cookie value is the subscriber ID (NOT email or other data)
- Cookie path MUST be `/` to work across all pages
- Use `window.location.href` for redirect (full page reload) to ensure widget initializes properly

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── waitlist/
│   │   │   └── route.ts          # POST (create) & PUT (update) subscribers
│   │   ├── referral-login/
│   │   │   └── route.ts          # GET subscriber by email
│   │   └── check-verification/
│   │       └── route.ts          # Check verification status
│   ├── join-our-waitlist/
│   │   └── page.tsx              # Waitlist signup page
│   ├── referral/
│   │   ├── page.tsx              # Referral dashboard page
│   │   └── referral-hero-custom.css  # Custom widget styling
│   ├── referral-login/
│   │   └── page.tsx              # Login page for existing users
│   └── layout.tsx                # Contains ReferralHero global script
├── components/
│   ├── WaitlistForm.tsx          # Custom waitlist form component
│   └── referral-modal/
│       └── ReferralHeroWidget.tsx # Widget wrapper component
└── docs/
    └── referral.md               # This documentation
```

---

## Implementation Guide

### Step 1: Add ReferralHero Global Script

In `src/app/layout.tsx`, add the ReferralHero global script:

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}

        {/* ReferralHero Global Script */}
        <Script
          id="referralhero-global"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(m,a,i,t,r,e){if(m.RH)return;r=m.RH={},r.uuid=t,r.loaded=0,r.base_url=i,r.queue=[],m.rht=function(){r.queue.push(arguments)};e=a.getElementsByTagName('script')[0],c=a.createElement('script');c.async=!0,c.src='https://d7zve4d3u0dfm.cloudfront.net/'+'production'+'/'+t+'.js',e.parentNode.insertBefore(c,e)}(window,document,'https://app.referralhero.com','RH0d3a5b93dd');`
          }}
        />
      </body>
    </html>
  );
}
```

### Step 2: Create API Route for Subscriber Creation

File: `src/app/api/waitlist/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, zipCode, userType } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required.' },
                { status: 400 }
            );
        }

        const API_KEY = process.env.REFERRALHERO_API_KEY;
        const UUID = process.env.REFERRALHERO_UUID;

        // Format phone to international format: +1 XXX XXX XXXX (with spaces)
        let formattedPhone = '';
        if (phone) {
            const digits = phone.replace(/\D/g, '');
            if (digits.length === 10) {
                formattedPhone = `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
            } else if (digits.length === 11 && digits.startsWith('1')) {
                const usDigits = digits.substring(1);
                formattedPhone = `+1 ${usDigits.slice(0, 3)} ${usDigits.slice(3, 6)} ${usDigits.slice(6)}`;
            }
        }

        const payload = {
            email: email,
            name: name,
            extra_field: zipCode,      // Custom field 1
            extra_field_2: userType,   // Custom field 2
            double_optin: true         // CRITICAL: Enable double opt-in
        };

        // Only add phone if properly formatted
        if (formattedPhone && formattedPhone.length >= 12) {
            payload.phone_number = formattedPhone; // Use real phone_number field
        }

        const rhResponse = await fetch(
            `https://app.referralhero.com/api/v2/lists/${UUID}/subscribers`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify(payload),
            }
        );

        const rhData = await rhResponse.json();

        if (!rhResponse.ok || rhData.status === 'error') {
            console.error('ReferralHero API Error:', rhData);
            throw new Error(rhData.message || 'Failed to register with ReferralHero.');
        }

        // Return subscriber ID for session cookie
        return NextResponse.json(
            {
                message: 'Successfully joined waitlist!',
                data: rhData,
                subscriberId: rhData.data?.id // CRITICAL: Return subscriber ID
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to join waitlist.',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
```

**Key Points**:
- Phone format MUST be international with spaces: `+1 XXX XXX XXXX`
- Use real `phone_number` field (not custom field) for SMS verification
- Set `double_optin: true` for email + phone verification
- Return `subscriberId` in response for cookie setting

### Step 3: Create Waitlist Form Component

File: `src/components/WaitlistForm.tsx`

```typescript
'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        userType: 'Both'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Successfully joined the waitlist!' });

                // CRITICAL: Set session cookie BEFORE redirecting
                if (data.subscriberId) {
                    const widgetId = 'MF2f0c6063df';
                    const cookieName = `__maitre-session-${widgetId}`;
                    const expirationDays = 30;
                    const date = new Date();
                    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                    const expires = `expires=${date.toUTCString()}`;

                    document.cookie = `${cookieName}=${data.subscriberId};${expires};path=/;SameSite=Lax`;
                    console.log('✅ Session cookie set for:', data.subscriberId);
                } else {
                    console.error('❌ No subscriberId in response!');
                }

                // Redirect with full page reload (IMPORTANT)
                setTimeout(() => {
                    window.location.href = '/referral';
                }, 1500);

            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to join waitlist.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields here */}
        </form>
    );
}
```

**Critical Points**:
1. **Check for `subscriberId`** in API response
2. **Set cookie BEFORE redirect** (not after)
3. **Use `window.location.href`** (not `router.push()`) for full page reload
4. **Verify cookie was set** with console log

### Step 4: Create Referral Dashboard Page

File: `src/app/referral/page.tsx`

```tsx
'use client';

import { Suspense } from 'react';
import ReferralHeroWidget from '@/components/referral-modal/ReferralHeroWidget';
import './referral-hero-custom.css';

function LogoutLink() {
    const handleLogout = () => {
        const widgetId = 'MF2f0c6063df';
        const cookieName = `__maitre-session-${widgetId}`;

        // Clear the cookie
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;

        // Redirect to login page
        window.location.href = '/referral-login';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button onClick={handleLogout}>
                Switch Account
            </button>
        </div>
    );
}

function ReferralContent() {
    return (
        <main className="min-h-screen bg-white" style={{ paddingTop: '110px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 48px 24px' }}>
                <div className="text-center" style={{ marginBottom: '24px' }}>
                    <h1>Refer & Earn Rewards</h1>
                    <p>Share your referral link and earn rewards when your friends join AYRO.</p>
                </div>

                <div className="w-full">
                    {/* ReferralHero widget container - MUST have this exact ID */}
                    <ReferralHeroWidget
                        widgetId="MF2f0c6063df"
                        userEmail={null}
                        subscriberId={null}
                    />
                    <LogoutLink />
                </div>
            </div>
        </main>
    );
}

export default function ReferralPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReferralContent />
        </Suspense>
    );
}
```

### Step 5: Create Widget Component

File: `src/components/referral-modal/ReferralHeroWidget.tsx`

```tsx
'use client';

import React from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
    userEmail?: string | null;
    subscriberId?: string | null;
}

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId }) => {
    return (
        <div
            id={`referralhero-dashboard-${widgetId}`}
            style={{
                minHeight: '400px',
                width: '100%'
            }}
        />
    );
};

export default ReferralHeroWidget;
```

**Important**:
- The div ID MUST match the format: `referralhero-dashboard-{widgetId}`
- Keep the component simple - ReferralHero script handles initialization
- Don't add complex useEffect hooks or manual initialization

### Step 6: Create Referral Login Page

File: `src/app/referral-login/page.tsx`

```tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReferralLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isCheckingCookie, setIsCheckingCookie] = useState(true);

    // Auto-redirect if session cookie exists
    useEffect(() => {
        const widgetId = 'MF2f0c6063df';
        const cookieName = `__maitre-session-${widgetId}`;

        const cookies = document.cookie.split(';');
        const sessionCookie = cookies.find(cookie =>
            cookie.trim().startsWith(`${cookieName}=`)
        );

        if (sessionCookie) {
            console.log('✅ Session cookie found, redirecting to dashboard');
            router.push('/referral');
        } else {
            setIsCheckingCookie(false);
        }
    }, [router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/referral-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.subscriberId) {
                // Set session cookie
                const widgetId = 'MF2f0c6063df';
                const cookieName = `__maitre-session-${widgetId}`;
                const expirationDays = 30;
                const date = new Date();
                date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                const expires = `expires=${date.toUTCString()}`;

                document.cookie = `${cookieName}=${data.subscriberId};${expires};path=/;SameSite=Lax`;

                // Redirect with full page reload
                window.location.href = '/referral';
            } else {
                setError(data.error || 'Email not found.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCheckingCookie) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <h1>Access Your Referral Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address*"
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Access Dashboard'}
                </button>
                {error && <div>{error}</div>}
            </form>
            <a href="/join-our-waitlist">Don't have an account? Join the waitlist</a>
        </main>
    );
}
```

### Step 7: Create Referral Login API

File: `src/app/api/referral-login/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required.' },
                { status: 400 }
            );
        }

        const API_KEY = process.env.REFERRALHERO_API_KEY;
        const UUID = process.env.REFERRALHERO_UUID;

        // Look up subscriber by email
        const response = await fetch(
            `https://app.referralhero.com/api/v2/lists/${UUID}/subscribers/retrieve_by_email?email=${encodeURIComponent(email)}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        const data = await response.json();

        if (response.ok && data.data) {
            return NextResponse.json(
                {
                    message: 'Subscriber found',
                    subscriberId: data.data.id,
                    verified: data.data.verified || false
                },
                { status: 200 }
            );
        } else if (data.code === 'subscriber_not_found') {
            return NextResponse.json(
                { error: 'Email not found or not verified. Please join the waitlist or check your email for the verification link.' },
                { status: 404 }
            );
        } else {
            return NextResponse.json(
                { error: 'Failed to look up email.' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('Referral Login API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to access referral dashboard.',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
```

**Note**: The `retrieve_by_email` endpoint only returns **verified** subscribers.

---

## User Flow Diagrams

### New User Signup Flow

```
1. User visits /join-our-waitlist
   ↓
2. Fills out form (name, email, phone, zip, user type)
   ↓
3. Form submits to POST /api/waitlist
   ↓
4. API creates subscriber in ReferralHero
   ↓
5. API returns subscriberId
   ↓
6. WaitlistForm sets session cookie: __maitre-session-MF2f0c6063df=<subscriberId>
   ↓
7. Redirects to /referral (full page reload)
   ↓
8. ReferralHero widget detects cookie
   ↓
9. Shows VERIFICATION SCREEN (email/phone verification)
   ↓
10. User enters verification codes
    ↓
11. Shows REFERRAL DASHBOARD with share link
```

### Existing User Login Flow

```
1. User visits /referral-login
   ↓
2. Enters email address
   ↓
3. Form submits to POST /api/referral-login
   ↓
4. API looks up subscriber by email
   ↓
5. If found: returns subscriberId
   ↓
6. Page sets session cookie
   ↓
7. Redirects to /referral
   ↓
8. ReferralHero widget detects cookie
   ↓
9. Shows REFERRAL DASHBOARD (if verified) or VERIFICATION SCREEN (if unverified)
```

### Returning User Flow

```
1. User visits /referral or /referral-login
   ↓
2. Page checks for session cookie: __maitre-session-MF2f0c6063df
   ↓
3. If cookie exists:
   - Auto-redirects to /referral
   - Widget shows dashboard immediately
   ↓
4. If cookie doesn't exist:
   - Shows login form or signup form
```

---

## Common Issues and Solutions

### Issue 1: Widget Shows Signup Form Instead of Verification

**Symptoms**: After joining waitlist, the /referral page shows ReferralHero's signup form instead of verification screen.

**Cause**: Session cookie is not being set or not persisting.

**Solution**:
1. Check browser console for "✅ Session cookie set for:" log
2. Verify `subscriberId` is returned from API
3. Ensure cookie is set BEFORE redirect
4. Use `window.location.href` (not `router.push()`)
5. Check cookie exists: `document.cookie.includes('__maitre-session-MF2f0c6063df')`

### Issue 2: Verification Link Sent Instead of Code

**Symptoms**: User receives email with "Confirm Email" button/link instead of verification code.

**Cause**: ReferralHero campaign settings or email template configuration.

**Solution**:
1. Contact ReferralHero support
2. Verify "Enable Verification Method" is ON
3. Check email template has `%verify_code%` placeholder
4. Ensure double opt-in is configured for code-based verification

### Issue 3: Phone Number Validation Errors

**Symptoms**: API returns "Please enter a valid phone number" or "Phone already associated with account"

**Cause**:
- Wrong phone format
- Using custom field instead of real `phone_number` field
- Subscriber soft-deleted in ReferralHero

**Solution**:
1. Use correct format: `+1 XXX XXX XXXX` (with spaces)
2. Use `phone_number` field (NOT `extra_field`)
3. Wait for ReferralHero cache to clear if subscriber was deleted
4. Use completely different phone/email for testing

### Issue 4: "Subscriber Not Found" for Unverified Users

**Symptoms**: Login returns 404 for unverified subscribers

**Cause**: `retrieve_by_email` endpoint only returns verified subscribers

**Solution**:
- This is expected behavior
- Update error message to mention verification requirement
- Direct users to check email for verification link

### Issue 5: Cookie Not Persisting Across Pages

**Symptoms**: Cookie exists on one page but not on another

**Cause**: Cookie path or domain restrictions

**Solution**:
- Ensure cookie has `path=/` (not path-specific)
- Don't set `domain` attribute for localhost
- Check `SameSite=Lax` (not `Strict`)

---

## Testing Checklist

### New User Signup
- [ ] Submit waitlist form with valid data
- [ ] Check browser console for "✅ Session cookie set for:" log
- [ ] Verify redirect to /referral
- [ ] Confirm verification screen appears (NOT signup form)
- [ ] Receive verification email/SMS
- [ ] Enter verification codes
- [ ] See referral dashboard with share link

### Existing User Login
- [ ] Enter email on /referral-login
- [ ] Verify redirect to /referral
- [ ] See dashboard (if verified) or verification screen (if unverified)

### Returning User
- [ ] Visit /referral with existing cookie
- [ ] Verify immediate dashboard access (no login required)
- [ ] Click "Switch Account"
- [ ] Verify cookie is cleared and redirected to login

### Phone Number Formats
- [ ] Test 10-digit: 5125551234 → +1 512 555 1234
- [ ] Test 11-digit: 15125551234 → +1 512 555 1234
- [ ] Test formatted: (512) 555-1234 → +1 512 555 1234

---

## ReferralHero Support Guidance

Based on conversation with ReferralHero support (Lee):

### Key Points from Support

1. **REST API doesn't trigger standard flow**: When using the REST API to create subscribers, the standard ReferralHero signup flow (including verification screen) is NOT triggered automatically.

2. **Session cookie is required**: To show verification screen and dashboard, you MUST set the session cookie `__maitre-session-{widgetId}` with the subscriber ID.

3. **Widget behavior**:
   - NO cookie → Shows signup form
   - Cookie + unverified subscriber → Shows verification screen
   - Cookie + verified subscriber → Shows dashboard

4. **Login functionality**: The dashboard widget has a built-in login button where users can enter their email. However, we implemented a custom login page (`/referral-login`) for better UX.

5. **Dashboard link in emails**: The `%advocate_dashboard%` merge tag in ReferralHero emails will open the dashboard directly when clicked (if user is verified).

### Support Contact

If you encounter issues with:
- Verification codes not being sent
- Email template configuration
- Widget behavior
- API endpoints

Contact ReferralHero support at: https://referralhero.com/support

---

## API Reference

### ReferralHero REST API v2

Base URL: `https://app.referralhero.com/api/v2`

#### Create Subscriber

```
POST /lists/{UUID}/subscribers
```

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {API_KEY}
```

**Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "phone_number": "+1 512 555 1234",
  "extra_field": "12345",
  "extra_field_2": "Both",
  "double_optin": true
}
```

**Response** (201):
```json
{
  "status": "success",
  "data": {
    "id": "subscriber_id_here",
    "email": "user@example.com",
    "name": "John Doe",
    "verified": false,
    "created_at": 1708012345,
    ...
  }
}
```

#### Get Subscriber by Email

```
GET /lists/{UUID}/subscribers/retrieve_by_email?email={email}
```

**Note**: Only returns VERIFIED subscribers.

**Response** (200):
```json
{
  "status": "success",
  "data": {
    "id": "subscriber_id_here",
    "email": "user@example.com",
    "verified": true,
    ...
  }
}
```

#### Update Subscriber

```
POST /lists/{UUID}/subscribers/{subscriber_id}
```

**Body**:
```json
{
  "name": "Updated Name",
  "phone_number": "+1 512 555 9999",
  ...
}
```

---

## Custom Styling

File: `src/app/referral/referral-hero-custom.css`

To match the ReferralHero widget styling with your brand:

```css
/* Target the widget container */
#referralhero-dashboard-MF2f0c6063df input[type="text"],
#referralhero-dashboard-MF2f0c6063df input[type="email"],
#referralhero-dashboard-MF2f0c6063df input[type="tel"] {
    height: 48px !important;
    padding: 7px 12px !important;
    background-color: #F4F4F9 !important;
    border: 2px solid transparent !important;
    border-radius: 12px !important;
    font-size: 14px !important;
    color: #5C5C5C !important;
}

#referralhero-dashboard-MF2f0c6063df button[type="submit"] {
    width: 100% !important;
    height: 45px !important;
    background-color: #423DF9 !important;
    color: #FFFFFF !important;
    border-radius: 5px !important;
    font-weight: 700 !important;
}

/* Hide ReferralHero default elements */
#referralhero-dashboard-MF2f0c6063df .mtr-spacer-field {
    display: none !important;
}

#referralhero-dashboard-MF2f0c6063df .mtr-heading {
    display: none !important;
}
```

Import in your referral page:
```tsx
import './referral-hero-custom.css';
```

---

## Security Considerations

1. **Environment Variables**: Never commit `.env` files. Use `.env.local` for local development.

2. **API Keys**: Store ReferralHero API key securely in environment variables, never in client-side code.

3. **Cookie Security**:
   - Use `SameSite=Lax` for CSRF protection
   - Use `Secure` flag in production (HTTPS only)
   - Set appropriate expiration (30 days)

4. **Input Validation**: Always validate and sanitize user inputs before sending to API.

5. **Rate Limiting**: Consider adding rate limiting to prevent abuse of API endpoints.

---

## Debugging Tips

### Enable Debug Logging

Add to `WaitlistForm.tsx`:
```typescript
console.log('🔍 API response:', data);
console.log('🔍 Subscriber ID:', data.subscriberId);
console.log('✅ Cookie set:', document.cookie);
```

### Check Cookie in Browser

Chrome DevTools → Application → Cookies → http://localhost:3000

Look for: `__maitre-session-MF2f0c6063df`

### Monitor API Calls

Chrome DevTools → Network → Filter by "waitlist" or "referral"

### Check ReferralHero Logs

ReferralHero Admin → Check console logs for:
- `[ReferralHero] Signup Form loaded successfully`
- `[ReferralHero] Verification screen triggered`

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Set `REFERRALHERO_API_KEY` in production environment
- [ ] Set `REFERRALHERO_UUID` in production environment
- [ ] Update cookie `Secure` flag for HTTPS
- [ ] Test full signup → verification → dashboard flow
- [ ] Test login flow for existing users
- [ ] Verify email/SMS delivery in production
- [ ] Test phone number validation
- [ ] Check custom CSS styling
- [ ] Monitor error logs

### Post-Deployment Monitoring

Monitor for:
- API errors (check server logs)
- Cookie setting failures (check browser console)
- ReferralHero API rate limits
- User verification completion rates

---

## FAQ

**Q: Why use REST API instead of ReferralHero's embedded form?**
A: The embedded form doesn't support radio buttons and custom layouts. The REST API gives full control over the form design while maintaining ReferralHero's referral tracking.

**Q: Can I use `router.push()` instead of `window.location.href`?**
A: No. `router.push()` is a client-side navigation that doesn't trigger a full page reload. The ReferralHero widget needs a full page reload to properly initialize and detect the session cookie.

**Q: Why does manual refresh work but automatic redirect doesn't?**
A: This indicates the cookie wasn't set before the redirect. Ensure the cookie is set synchronously (not in useEffect or after async operations).

**Q: Can I customize the verification screen?**
A: No. The verification screen is controlled by ReferralHero. You can only customize styling via CSS, but the structure and functionality are fixed.

**Q: How do I handle duplicate signups?**
A: ReferralHero prevents duplicate emails. Check for 409 status in the API response and handle it gracefully (show "Already on waitlist" message).

---

## Version History

- **v1.0** (2026-02-14): Initial documentation
  - Session cookie implementation
  - Custom waitlist form
  - Referral login feature
  - Double opt-in verification
  - Custom CSS styling

---

## Contact

For technical questions about this implementation, contact the development team.

For ReferralHero-specific issues, contact ReferralHero support.
