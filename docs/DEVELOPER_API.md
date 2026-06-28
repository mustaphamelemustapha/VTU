# Mele Data Developer API Reference

Welcome to the Mele Data Developer API! This API allows you to integrate cheap data and airtime vending directly into your own websites or applications.

## 1. Authentication

All requests to the Developer API must be authenticated using your **LIVE API Token**. You can find this token in your Mele Data Developer Dashboard.

Pass your token in the HTTP Headers using the `Authorization` bearer scheme or the `X-API-Key` header.

**Base URL**: `https://api.meledata.ng/api/v1`

**Example Header:**
```http
Authorization: Bearer mele_pub_xxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
```

---

## 2. Endpoints

### 2.1 Get Wallet Balance
Check your current wallet balance to ensure you have sufficient funds for vending.

**Endpoint**: `GET /developer/wallet/balance`

**Response (200 OK)**
```json
{
  "balance": 15500.50,
  "currency": "NGN"
}
```

### 2.2 List Data Plans
Fetch the list of all active data plans, including your specially discounted developer pricing.

**Endpoint**: `GET /developer/data/plans`

**Response (200 OK)**
```json
{
  "plans": [
    {
      "plan_id": 1,
      "plan_code": "MTN_1GB",
      "network": "MTN",
      "plan_name": "MTN 1GB - 30 Days",
      "data_size": "1GB",
      "validity": "30 Days",
      "price": 250.0
    },
    {
      "plan_id": 2,
      "plan_code": "GLO_2GB",
      "network": "GLO",
      "plan_name": "GLO 2GB - 30 Days",
      "data_size": "2GB",
      "validity": "30 Days",
      "price": 480.0
    }
  ]
}
```

### 2.3 Purchase Data
Buy data for a specific phone number. You must provide a unique `reference` to prevent duplicate charges.

**Endpoint**: `POST /developer/data/purchase`

**Request Body**
```json
{
  "network": "mtn",
  "plan_id": 1,
  "phone_number": "08012345678",
  "reference": "your_unique_tx_ref_001"
}
```

**Response (200 OK)**
```json
{
  "status": "pending", 
  "reference": "your_unique_tx_ref_001",
  "amount": 250.0,
  "message": "Processing"
}
```
*Note: `status` can be `success`, `pending`, or `failed`. If pending, rely on Webhooks or the Status endpoint to confirm delivery.*

### 2.4 Purchase Airtime
Buy airtime for a specific phone number.

**Endpoint**: `POST /developer/airtime/purchase`

**Request Body**
```json
{
  "network": "mtn",
  "amount": 100,
  "phone_number": "08012345678",
  "reference": "your_unique_tx_ref_002"
}
```

**Response (200 OK)**
```json
{
  "status": "success", 
  "reference": "your_unique_tx_ref_002",
  "amount": 98.0,
  "message": "Transaction successful"
}
```

### 2.5 Check Transaction Status
Query the final status of any data or airtime transaction you initiated.

**Endpoint**: `GET /developer/data/status?ref=your_unique_tx_ref`

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "reference": "your_unique_tx_ref_001",
    "status": "delivered", 
    "network": "mtn",
    "mobile_number": "08012345678",
    "amount_charged": 250.0,
    "message": "Data plan delivered to 08012345678 successfully.",
    "purchased_at": "2026-06-28T17:30:00Z"
  }
}
```
*Note: The `status` inside `data` will be either `delivered` or `failed`.*

---

## 3. Webhooks (Callbacks)

Instead of continuously checking the status endpoint, you can configure a **Webhook URL** in your Mele Data Developer Dashboard. 

When a `pending` transaction finishes processing, our server will send an HTTP `POST` request to your webhook URL with the final status.

**Example Webhook Payload**
```json
{
  "event": "transaction.updated",
  "data": {
    "reference": "your_unique_tx_ref_001",
    "status": "delivered",
    "amount": 250.0,
    "network": "mtn",
    "mobile_number": "08012345678",
    "timestamp": "2026-06-28T17:35:00Z"
  }
}
```

### 3.1 Security (Verifying Webhook Signatures)
To ensure the webhook is genuinely from Mele Data, we include a signature in the `X-Mele-Signature` HTTP header. 
This signature is an HMAC-SHA512 hash of the raw JSON payload using your **Webhook Secret** (available in your dashboard).

**Example (Node.js/Express Verification):**
```javascript
const crypto = require('crypto');

app.post('/mele-webhook', (req, res) => {
    const signature = req.headers['x-mele-signature'];
    const payload = JSON.stringify(req.body);
    const secret = "YOUR_WEBHOOK_SECRET";
    
    const hash = crypto.createHmac('sha512', secret)
                       .update(payload)
                       .digest('hex');
                       
    if (hash === signature) {
        // Valid Webhook! Process transaction update...
        res.status(200).send("OK");
    } else {
        res.status(401).send("Invalid signature");
    }
});
```
