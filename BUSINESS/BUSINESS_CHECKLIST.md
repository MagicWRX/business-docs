# BUSINESS_CHECKLIST.md - Configuration & Testing Guide

**Document Date:** December 28, 2025  
**Last Updated:** December 28, 2025  
**Status:** Active - Setup & Testing Required  
**Purpose:** Comprehensive checklist for Brevo and CloudFlare configurations across business workspaces.

---

## 🎯 Overview

This document provides detailed checklists for configuring and testing **Brevo** (email service) and **CloudFlare** (DNS/CDN) across all business domains. These are critical infrastructure components that need proper setup for email delivery, domain management, and security.

**Priority:** Complete these setups before full production deployment.

---

## 📧 BREVO EMAIL SERVICE CHECKLIST

### 1. Account Setup & Domains
- [ ] **Primary Account**: magicwrxstudio@gmail.com
- [ ] **Domains Configured**:
  - [ ] magicwrx.com
  - [ ] mxn.chat
  - [ ] amazinglystrange.com
  - [ ] brianlindahl.com
  - [ ] pixelextreme.com (customer management)

### 2. Admin Email Addresses
- [ ] **admin@magicwrx.com** - Primary business admin
- [ ] **admin@mxn.chat** - Chat platform admin
- [ ] **admin@amazinglystrange.com** - Website admin
- [ ] **admin@brianlindahl.com** - Personal admin
- [ ] **admin@pixelextreme.com** - Customer management
- [ ] **brian@amazinglystrange.com** - Secondary contact
- [ ] **brian@brianlindahl.com** - Secondary contact

### 3. DNS Configuration (Required for Each Domain)
- [ ] **SPF Records**: Use a *single* SPF TXT record. Brevo commonly uses `include:spf.brevo.com` (legacy: `include:spf.sendinblue.com`).
  - Example (Brevo only): `v=spf1 include:spf.brevo.com ~all`
  - Example (Brevo + Google Workspace + Cloudflare Email Routing): `v=spf1 include:spf.brevo.com include:_spf.google.com include:_spf.mx.cloudflare.net ~all`
- [ ] **DKIM Records**: Brevo-generated DKIM keys added to DNS
- [ ] **DMARC Records**: `v=DMARC1; p=quarantine; rua=mailto:admin@domain.com`
- [ ] **MX Records**: Point to Brevo servers (if using Brevo for receiving)

### 4. SMTP Settings
- [ ] **SMTP Server**: smtp-relay.brevo.com
- [ ] **Port**: 587 (TLS) or 465 (SSL)
- [ ] **Authentication**: Login with Brevo API credentials
- [ ] **API Key**: Generated and stored securely

### 5. Email Templates & Automation
- [ ] **Welcome Emails**: For new user signups
- [ ] **Password Reset**: Automated reset flows
- [ ] **Admin Notifications**: System alerts
- [ ] **Transactional Emails**: Order confirmations, receipts

### 6. Testing Procedures
- [ ] **Send Test Email**: Use Brevo dashboard test function
- [ ] **MXN.CHAT Integration**: Test via `/test-brevo-direct` route
- [ ] **Email Verification**: Confirm delivery to Gmail/Yahoo/etc.
- [ ] **Bounce Handling**: Check bounce rates in dashboard
- [ ] **Spam Testing**: Use tools like Mail-Tester.com

### 7. Monitoring & Maintenance
- [ ] **Dashboard Access**: Regular monitoring of delivery stats
- [ ] **API Limits**: Monitor usage against free/paid limits
- [ ] **Blacklist Checks**: Ensure domains not blacklisted
- [ ] **Reputation Monitoring**: Track sender reputation

---

## ☁️ CLOUDFLARE DNS/CDN CHECKLIST

### 1. Account Setup
- [ ] **Primary Account**: magicwrxstudio@gmail.com
- [ ] **Plan**: Free plan (upgrade if needed for advanced features)
- [ ] **Two-Factor Authentication**: Enabled for security

### 2. Domain Additions
- [ ] **magicwrx.com** - Added to CloudFlare dashboard
- [ ] **mxn.chat** - Added to CloudFlare dashboard
- [ ] **amazinglystrange.com** - Added to CloudFlare dashboard
- [ ] **brianlindahl.com** - Added to CloudFlare dashboard
- [ ] **pixelextreme.com** - Added for customer management

### 3. DNS Records Configuration
For each domain, ensure these records are properly configured:

#### A Records (Point to Vercel)
- [ ] **@ (root)**: Points to Vercel's IP or CNAME
- [ ] **www**: Points to Vercel's IP or CNAME

#### CNAME Records
- [ ] **www**: CNAME to Vercel deployment URL
- [ ] **Custom subdomains** (if any): Properly configured

#### MX Records (Email)
- [ ] **Primary MX**: Priority 10, points to Brevo or email provider
- [ ] **Secondary MX**: Priority 20, backup server

#### TXT Records
- [ ] **SPF**: Use a *single* SPF TXT record.
  - Example: `v=spf1 include:spf.brevo.com ~all`
- [ ] **DKIM**: Brevo-generated keys
- [ ] **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:admin@domain.com`
- [ ] **Domain Verification**: Google, Microsoft, etc. if needed

### 4. SSL/TLS Configuration
- [ ] **SSL Mode**: Full (strict) for all domains
- [ ] **Certificate**: CloudFlare-managed certificates
- [ ] **HTTPS Redirect**: Always redirect HTTP to HTTPS
- [ ] **HSTS**: Enabled for security headers

### 5. CDN & Performance Settings
- [ ] **CDN Enabled**: Active for static assets
- [ ] **Caching**: Appropriate cache rules for Next.js apps
- [ ] **Minification**: HTML, CSS, JS enabled
- [ ] **Rocket Loader**: Disabled (can conflict with React)
- [ ] **Auto Minify**: Enabled for performance

### 6. Security Settings
- [ ] **WAF (Web Application Firewall)**: Enabled with appropriate rules
- [ ] **DDoS Protection**: CloudFlare's automatic protection
- [ ] **Bot Management**: Enabled to block malicious bots
- [ ] **Rate Limiting**: Configured for API endpoints
- [ ] **SSL/TLS Encryption**: Full encryption enabled

### 7. Email Routing (CloudFlare Email)
- [ ] **Email Routing Enabled**: For domains using CloudFlare email
- [ ] **Custom Addresses**: admin@, support@, etc. configured
- [ ] **Forwarding Rules**: Emails forwarded to Gmail/Brevo
- [ ] **Spam Filtering**: Enabled

### 8. Testing Procedures
- [ ] **DNS Propagation**: Use `dig domain.com` to verify records
- [ ] **SSL Certificate**: Visit https://domain.com and check padlock
- [ ] **HTTP to HTTPS Redirect**: Test http://domain.com redirects
- [ ] **CDN Caching**: Check response headers for CloudFlare
- [ ] **Email Delivery**: Send test emails and confirm receipt
- [ ] **Performance**: Use tools like GTmetrix or Pingdom

### 9. Monitoring & Maintenance
- [ ] **Analytics Dashboard**: Monitor traffic and performance
- [ ] **DNS Changes**: Track propagation with DNS checker tools
- [ ] **SSL Renewals**: Automatic, but monitor expiration
- [ ] **Security Alerts**: Enable notifications for threats
- [ ] **Backup DNS**: Have secondary DNS provider ready

---

## 🔗 INTEGRATION CHECKLIST

### Brevo + CloudFlare Integration
- [ ] **DNS Records Match**: SPF/DKIM in CloudFlare match Brevo settings
- [ ] **MX Records**: Properly configured for email routing
- [ ] **Domain Verification**: Brevo domains verified in CloudFlare

### Vercel + CloudFlare Integration
- [ ] **CNAME Records**: Point to Vercel deployment URLs
- [ ] **SSL Certificates**: CloudFlare handles SSL for Vercel apps
- [ ] **CDN Optimization**: CloudFlare caches Vercel static assets

### Testing Cross-Service Integration
- [ ] **Email from Apps**: Test transactional emails from Next.js apps
- [ ] **Domain Routing**: Ensure all domains route to correct Vercel projects
- [ ] **SSL Everywhere**: All subdomains and routes use HTTPS

---

## 🧩 MagicWRX SaaS: Customer Branded Email (Option A)

If MagicWRX customers should be able to send as `admin@customer-domain.com` **without** MagicWRX provisioning mailboxes, follow the Option A runbook:

- [ ] Read and implement: `MAGICWRX_CUSTOMER_BRANDED_EMAIL_OPTION_A.md`

---

## 🛠️ VERIFICATION SCRIPTS & TOOLS

### Automated Checks
- [ ] **MXN.CHAT Scripts**:
  - [ ] `./check-auth-dns.sh` - Comprehensive auth & DNS validation
  - [ ] `./check-dns.sh` - DNS-only validation
  - [ ] `./verify-brevo-dns.sh` - Email-specific DNS validation
  - [ ] `node scripts/verify-brevo-key.js` - Brevo API key validation

### Manual Testing Tools
- [ ] **DNS Tools**: dig, nslookup, DNS Checker (online)
- [ ] **SSL Tools**: SSL Labs SSL Test, Qualys SSL Server Test
- [ ] **Email Tools**: Mail-Tester.com, GlockApps, SendForensics
- [ ] **Performance Tools**: GTmetrix, Pingdom, WebPageTest

---

## 📋 COMPLETION STATUS

### Brevo Setup Progress: [0/25] items completed
### CloudFlare Setup Progress: [0/35] items completed
### Integration Testing: [0/10] items completed

**Next Priority Actions:**
1. Add domains to CloudFlare dashboard
2. Configure DNS records for each domain
3. Set up Brevo accounts and verify domains
4. Test email sending and delivery
5. Run automated verification scripts

---

## 📞 SUPPORT & RESOURCES

- **CloudFlare Support**: https://support.cloudflare.com/
- **Brevo Support**: https://help.brevo.com/
- **DNS Tools**: https://dnschecker.org/, https://mxtoolbox.com/
- **SSL Tools**: https://www.ssllabs.com/ssltest/

**Last Updated:** December 28, 2025
