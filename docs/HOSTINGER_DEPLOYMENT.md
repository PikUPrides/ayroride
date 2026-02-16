# Hostinger Node.js Deployment Guide

## Official Environment Variables Solution

**IMPORTANT:** Environment variables configured in Hostinger's UI (hPanel) are stored in `.builds/config/.env` but are **NOT automatically loaded** by Node.js applications. You must manually copy the `.env` file to your application directory.

This is the **official solution confirmed by Hostinger support**.

### What Hostinger Support Said:

> "I've checked your deployment and found that the application isn't picking up your configuration settings (Environment Variables). To fix this immediately, we just need to **move the configuration file** and secure it."
>
> — Justin, Hostinger Support

**Their solution (verbatim):**
1. Create/copy the `.env` file to `public_html` (the website root)
2. Secure it with `.htaccess` protection:
   ```apache
   <Files .env>
   Order allow,deny
   Deny from all
   </Files>
   ```
3. Restart with: `touch tmp/restart.txt`

The `.env` file location is: `.builds/config/.env` (from Hostinger UI) → **must be copied to** → `public_html/.env` (where the app can read it)

## SSH Access Setup

### SSH Key Configuration

A dedicated SSH key has been created for automated deployments:

**Key Location:** `~/.ssh/ayro_hostinger`
**Public Key:** `~/.ssh/ayro_hostinger.pub`

**Public Key Content:**
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFK1n8EpVI/Tdi+UORsZNZNm4ZKz7+rro6Pmj8Vpq3Pi claude-ayro-deployment
```

This key is already added to the server's `~/.ssh/authorized_keys`.

### SSH Connection Command

```bash
# SSH into server using the deployment key
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115
```

## Quick Fix (After Every Deployment)

After deploying from GitHub or redeploying your app:

### Automated Script (Recommended) ⚡

```bash
# SSH into server and run post-deployment script
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115 'cd domains/ayrorides.com/public_html && ./post-deploy.sh'
```

**Or in two steps:**

```bash
# SSH into server
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115

# Run the post-deployment script
cd domains/ayrorides.com/public_html && ./post-deploy.sh
```

The script automatically:
- ✅ Copies `.env` file from `.builds/config/` to `public_html/`
- ✅ Restarts the application
- ✅ Tests environment variables are loaded
- ✅ Shows you the result

### Manual Method (Alternative)

```bash
# SSH into server
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115

# Copy .env file from Hostinger's config to app directory
cp domains/ayrorides.com/public_html/.builds/config/.env domains/ayrorides.com/public_html/.env

# Restart application
touch domains/ayrorides.com/public_html/tmp/restart.txt
```

## Initial Setup (One-Time)

### Step 1: Protect .env File

Add this to your `.htaccess` file to prevent web access to the `.env` file:

```apache
# Protect .env file from web access
<Files .env>
Order allow,deny
Deny from all
</Files>
```

### Step 2: Copy Environment Variables

```bash
cp domains/ayrorides.com/public_html/.builds/config/.env domains/ayrorides.com/public_html/.env
```

### Step 3: Restart Application

```bash
touch domains/ayrorides.com/public_html/tmp/restart.txt
```

## Environment Variables

Configure these in Hostinger hPanel → Deployments → Environment variables:

### Database Variables
- `DB_HOST` - Database host (usually 127.0.0.1)
- `DB_PORT` - Database port (3306)
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password

### Application Variables
- `REFERRALHERO_API_KEY` - ReferralHero API key
- `REFERRALHERO_UUID` - ReferralHero campaign UUID
- `NODE_ENVIRONMENT` - Environment (production)
- `NEXT_PUBLIC_SITE_URL` - Site URL (https://ayrorides.com)

## Deployment Workflow

### 1. Update Code via GitHub
Push your changes to GitHub. Hostinger will automatically:
- Pull latest code
- Run `npm install`
- Run `npm run build`
- Deploy to `public_html`

### 2. Copy Environment Variables (Required!)
```bash
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115
cp domains/ayrorides.com/public_html/.builds/config/.env domains/ayrorides.com/public_html/.env
```

### 3. Restart Application
```bash
touch domains/ayrorides.com/public_html/tmp/restart.txt
```

### 4. Verify Deployment
```bash
curl https://ayrorides.com/api/test
```

Expected response:
```json
{
  "status": "success",
  "hasReferralHeroKey": true,
  "hasReferralHeroUUID": true
}
```

## Updating Environment Variables

### In Hostinger hPanel:
1. Go to **Websites** → **Deployments**
2. Click **Settings & Redeploy**
3. Navigate to **Environment variables**
4. Add/edit variables
5. Click **Save** and **Redeploy**

### After Redeploy (Required!):
```bash
# Copy updated .env file
cp domains/ayrorides.com/public_html/.builds/config/.env domains/ayrorides.com/public_html/.env

# Restart app
touch domains/ayrorides.com/public_html/tmp/restart.txt
```

## Post-Deployment Script

A helper script (`post-deploy.sh`) is available on the server to automate post-deployment tasks.

**Location:** `/home/u943086856/domains/ayrorides.com/public_html/post-deploy.sh`

**What it does:**
```bash
#!/bin/bash
# Copies environment variables from .builds/config/.env to .env
cp .builds/config/.env .env

# Restarts the application
touch tmp/restart.txt

# Waits for restart
sleep 3

# Tests if environment variables loaded successfully
curl -s https://ayrorides.com/api/test | grep -q "hasReferralHeroKey\":true"
```

**How to use:**
```bash
cd domains/ayrorides.com/public_html && ./post-deploy.sh
```

**If the script is missing**, recreate it:
```bash
cat > post-deploy.sh << 'EOF'
#!/bin/bash
echo "🔄 Copying environment variables..."
cp .builds/config/.env .env
echo "♻️  Restarting application..."
touch tmp/restart.txt
echo "⏳ Waiting for restart..."
sleep 3
echo "✅ Testing deployment..."
curl -s https://ayrorides.com/api/test | grep -q "\"hasReferralHeroKey\":true" && echo "✅ Environment variables loaded!" || echo "❌ Failed to load environment variables"
echo ""
echo "Done! 🎉"
EOF
chmod +x post-deploy.sh
```

## Application Restart Methods

### Method 1: Touch restart.txt (Standard)
```bash
touch domains/ayrorides.com/public_html/tmp/restart.txt
```

### Method 2: Remove and Recreate (Force Restart)
```bash
rm domains/ayrorides.com/public_html/tmp/restart.txt
touch domains/ayrorides.com/public_html/tmp/restart.txt
```

### Method 3: Via Hostinger hPanel
1. Go to **Websites** → **Application Setup**
2. Click **Restart Application**

## Server Details

- **Hosting**: Hostinger Shared Hosting with Node.js
- **Web Server**: Phusion Passenger
- **Node.js Version**: 22 (alt-nodejs22)
- **Domain**: ayrorides.com
- **App Directory**: `/home/u943086856/domains/ayrorides.com/public_html/`
- **Config Directory**: `/home/u943086856/domains/ayrorides.com/public_html/.builds/config/`

## File Structure

```
public_html/
├── .env                    # Must be copied from .builds/config/.env
├── .htaccess              # Contains Passenger config + .env protection
├── .next/                 # Next.js build output
├── .builds/
│   └── config/
│       └── .env           # Hostinger stores env vars here
├── node_modules/
├── package.json
├── post-deploy.sh         # Automated post-deployment script
├── server.js             # Next.js standalone server
└── tmp/
    └── restart.txt       # Touch to restart app
```

## .htaccess Configuration

Complete `.htaccess` file:

```apache
PassengerAppRoot /home/u943086856/domains/ayrorides.com/public_html
PassengerAppType node
PassengerNodejs /opt/alt/alt-nodejs22/root/bin/node
PassengerStartupFile server.js
PassengerBaseURI /

# Protect .env file from web access
<Files .env>
Order allow,deny
Deny from all
</Files>
```

## SSH Key Management

### Generating a New SSH Key (If Needed)

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "claude-ayro-deployment" -f ~/.ssh/ayro_hostinger -N ""

# Display the public key
cat ~/.ssh/ayro_hostinger.pub
```

### Adding Public Key to Server

```bash
# SSH into the server (you'll need password authentication the first time)
ssh -p 65002 u943086856@92.112.189.115

# Add the public key to authorized_keys
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFK1n8EpVI/Tdi+UORsZNZNm4ZKz7+rro6Pmj8Vpq3Pi claude-ayro-deployment" >> ~/.ssh/authorized_keys

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Testing SSH Connection

```bash
# Test the connection
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115 'whoami && pwd'

# Expected output:
# u943086856
# /home/u943086856
```

## Troubleshooting

### Problem: SSH connection refused or permission denied
**Solution:**
1. Verify SSH key exists: `ls -la ~/.ssh/ayro_hostinger`
2. Check key permissions: `chmod 600 ~/.ssh/ayro_hostinger`
3. Test with verbose output: `ssh -v -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115`
4. Verify public key is in server's `~/.ssh/authorized_keys`

### Problem: Environment variables not loading
**Solution:**
1. Verify `.env` file exists in `public_html`:
   ```bash
   ls -la domains/ayrorides.com/public_html/.env
   ```
2. Copy from `.builds/config/.env`:
   ```bash
   cp domains/ayrorides.com/public_html/.builds/config/.env domains/ayrorides.com/public_html/.env
   ```
3. Restart application:
   ```bash
   touch domains/ayrorides.com/public_html/tmp/restart.txt
   ```
4. Test: `curl https://ayrorides.com/api/test`

### Problem: "Server configuration error"
**Cause:** `.env` file is missing or not loaded.
**Solution:** Follow steps above to copy `.env` and restart.

### Problem: Changes not reflecting after GitHub deployment
**Cause:** `.env` file may be overwritten/removed during deployment.
**Solution:** Always copy `.env` file after every deployment.

### Problem: Database connection error
**Solution:**
1. Verify database credentials in hPanel → Databases
2. Update in hPanel → Deployments → Environment variables
3. Copy updated `.env` file
4. Restart application

## Testing Environment Variables

### Test Endpoint
```bash
curl https://ayrorides.com/api/test
```

### Test Contact Form
```bash
curl -X POST https://ayrorides.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Test Waitlist Form
```bash
curl -X POST https://ayrorides.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"(555) 555-5555","zipCode":"75001","userType":"Driver"}'
```

## Security Notes

1. **Never commit .env files** to Git (already in `.gitignore`)
2. **.htaccess protection** prevents direct web access to `.env`
3. **Rotate credentials** if accidentally exposed
4. **SSH keys for server access:**
   - SSH key located at `~/.ssh/ayro_hostinger` (private key - keep secure!)
   - Public key added to server's `~/.ssh/authorized_keys`
   - Never share or commit the private key
   - Key uses ed25519 algorithm (modern and secure)
5. **Monitor logs** for unauthorized access

## Git Configuration

`.gitignore` already includes:
```gitignore
# env files (can opt-in for committing if needed)
.env*
```

This ensures:
- Local `.env.local` is never committed
- Server `.env` files are never committed
- Credentials stay secure

## Quick Reference Commands

```bash
# SSH into server
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115

# Run post-deployment script (RECOMMENDED) - One command deployment
ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115 'cd domains/ayrorides.com/public_html && ./post-deploy.sh'

# OR manually after SSH:
# Copy .env file (REQUIRED after every deployment)
cp domains/ayrorides.com/public_html/.builds/config/.env domains/ayrorides.com/public_html/.env

# Restart application
touch domains/ayrorides.com/public_html/tmp/restart.txt

# Test deployment
curl https://ayrorides.com/api/test

# Check .env file contents
cat domains/ayrorides.com/public_html/.env

# Check .env file exists
ls -la domains/ayrorides.com/public_html/.env

# View application logs
tail -50 domains/ayrorides.com/public_html/stderr.log

# Check .htaccess
cat domains/ayrorides.com/public_html/.htaccess
```

## Complete Post-Deployment Checklist

After every GitHub deployment:

### Using the Automated Script (Recommended):
- [ ] Run one-command deployment: `ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115 'cd domains/ayrorides.com/public_html && ./post-deploy.sh'`
- [ ] Verify script output shows "✅ Environment variables loaded!"
- [ ] (Optional) Test contact form
- [ ] (Optional) Test waitlist form

**Or in two steps:**
- [ ] SSH into server: `ssh -p 65002 -i ~/.ssh/ayro_hostinger u943086856@92.112.189.115`
- [ ] Run script: `cd domains/ayrorides.com/public_html && ./post-deploy.sh`

### Manual Steps:
- [ ] SSH into server
- [ ] Copy `.env` file from `.builds/config/` to `public_html/`
- [ ] Touch `tmp/restart.txt` to restart app
- [ ] Wait 5-10 seconds for restart
- [ ] Test `/api/test` endpoint
- [ ] Verify `hasReferralHeroKey: true`
- [ ] Verify `hasReferralHeroUUID: true`
- [ ] Test contact form
- [ ] Test waitlist form

## Why This is Necessary

Hostinger's Node.js hosting:
1. Stores environment variables in `.builds/config/.env` (from hPanel UI)
2. Does **NOT** automatically load them into the Node.js process
3. Next.js standalone builds expect `.env` file in the app root
4. Passenger (web server) does not inject environment variables from `.builds/config/`

**Therefore:** Manual `.env` copy is required after every deployment.

## Related Documentation

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Phusion Passenger Documentation](https://www.phusionpassenger.com/docs/tutorials/fundamental_concepts/nodejs/)
- [Hostinger Node.js Hosting](https://support.hostinger.com/en/articles/5857810-how-to-deploy-a-node-js-application)
- [Hostinger Environment Variables](https://www.hostinger.com/support/how-to-add-environment-variables-during-node-js-application-deployment/)

---

**Last Updated:** February 12, 2026
**Verified Solution:** Confirmed by Hostinger Support Team
**SSH Key Setup:** Completed and tested with automated deployment
