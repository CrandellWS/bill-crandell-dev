---
title: "MyPrize API Exploration: Planning the Moonie Integration"
date: 2025-11-17
tags: [api, integration, myprize, planning]
---

# MyPrize API Exploration: Planning the Moonie Integration

Today was all about exploring the MyPrize Creator API to plan the automated prize distribution system for Moonie-v2.

## What We Built

Created a comprehensive API explorer at `/myprize-api-explorer/`:

- **Interactive credential tool** - Secure secret key input (only prompts for sensitive data)
- **HMAC-SHA512 authentication** - Full implementation of MyPrize's signature algorithm
- **Comprehensive endpoint testing** - Automated tests for 7+ API endpoints
- **Error handling** - Graceful handling of permission errors and API issues

## Key Findings

### ✅ What Works

Successfully authenticated and accessed:
- Referral volume statistics
- Referred users list
- Scaled volume aggregation
- Room activity monitoring

Authentication is working perfectly - HMAC-SHA512 signature generation is correct.

### 🔒 Critical Blocker

The core functionality we need - **promotional prize assignment** - requires additional API permissions:

```
GET /api/creator/promos/assignable
POST /api/creator/promos/{promo_id}/assign
```

Error: `apiKeyPermissionDisabled`

**This is the blocker for Moonie-v2 integration.**

## Why This Matters

The entire point of MyPrize integration is to **automatically assign prizes to Moonie winners**:

1. User plays along on MyPrize → qualifies for Moonie spin
2. Moonie-v2 determines winner and prize tier
3. Backend calls MyPrize API to assign the prize
4. Winner gets notified via PubNub chat
5. Prize appears in their MyPrize account instantly

Without promo assignment access, we can't build or test this flow.

The other endpoints (stats, referrals, etc.) are just for website content - not the core automation.

## What's Next

**Waiting on:** MyPrize account manager to enable promo assignment permissions

**When approved, we'll build:**
- Backend service (Node.js/Python) to bridge MyPrize ↔ Moonie-v2
- Real-time room monitoring (poll every 5 seconds)
- Automatic prize fulfillment system
- PubNub chat notifications
- WebSocket connection to Moonie-v2 frontend

## Project Status

📦 **Shelved** - Complete and ready to resume when permissions are granted

All code is documented in `STATUS.md` with:
- Working endpoints
- Configuration details
- Next steps
- Architecture plans

## Technical Details

### Authentication Flow

MyPrize uses HMAC-SHA512 signatures for all authenticated requests:

```javascript
const timestamp = Math.floor(Date.now() / 1000);
const stringToSign = `${timestamp}|${httpMethod}|${path}`;
const signature = createHmac('sha512', secret)
  .update(stringToSign)
  .digest('hex');

const xApiKey = `${apiKeyLabel}|${timestamp}|${signature}`;
```

Header: `x-api-key: {apiKeyLabel}|{timestamp}|{signature}`

### Rate Limits

- **5000 requests per 5 minutes** - More than enough for our use case
- Respect cache-control headers to avoid unnecessary requests

## Lessons Learned

1. **API permissions matter** - Even with working auth, you need endpoint-level permissions
2. **Test early** - Good we tested before building the full integration
3. **Document blockers** - Clear STATUS.md helps resume work quickly
4. **Secure credentials** - Interactive prompts > storing secrets in files

## The Big Picture

This work sets up the foundation for **fully automated giveaways**:

- Stream on Kick while users play along on MyPrize
- Moonie Machine automatically triggers for qualified players
- Prizes assigned instantly via API
- Chat notifications keep engagement high
- No manual intervention needed

**It's going to be epic once permissions come through.**

---

*Tools: Node.js ES modules, native crypto, readline*
*Status: Paused pending API permissions*
*Next: Backend service architecture*
