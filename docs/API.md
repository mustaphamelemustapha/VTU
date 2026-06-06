# MELE DATA API Specification

This document lists the primary API endpoints, request/response payload examples, authentication requirements, and error-handling standards.

---

## 1. Global Conventions

### Base URL
- Local Dev: `http://localhost:8000/api/v1`
- Production: `https://api.meledata.ng/api/v1` (or matching live backend URI)

### Authentication
Most endpoints require authorization via a JSON Web Token (JWT).
- **Header**: `Authorization: Bearer <access_token>`
- Token lifespan: **30 minutes** for access tokens, **7 days** for refresh tokens.

### Common Error Responses
If a request fails, the API returns a structured JSON payload:

```json
{
  "detail": "Error message description"
}
```

---

## 2. Authentication Endpoints

### A. Register User
- **Endpoint**: `POST /auth/register`
- **Authentication**: None
- **Rate Limit**: `10/minute`

#### Request Payload
```json
{
  "email": "user@example.com",
  "phone_number": "08012345678",
  "full_name": "John Doe",
  "password": "SecurePassword123",
  "referral_code": "optional_code"
}
```

#### Response (200 OK)
```json
{
  "id": 42,
  "email": "user@example.com",
  "phone_number": "08012345678",
  "full_name": "John Doe",
  "role": "USER",
  "is_verified": false,
  "is_active": true
}
```

---

### B. Login User
- **Endpoint**: `POST /auth/login`
- **Authentication**: None
- **Rate Limit**: `10/minute`

#### Request Payload
```json
{
  "email": "user@example.com", // Or phone number
  "password": "SecurePassword123"
}
```

#### Response (200 OK)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### C. Token Refresh
- **Endpoint**: `POST /auth/refresh`
- **Authentication**: None

#### Request Payload
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (200 OK)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### D. Get Current User Info
- **Endpoint**: `GET /auth/me`
- **Authentication**: Required

#### Response (200 OK)
```json
{
  "id": 42,
  "email": "user@example.com",
  "phone_number": "08012345678",
  "full_name": "John Doe",
  "role": "USER",
  "is_verified": true,
  "is_active": true
}
```

---

## 3. Wallet Endpoints

### A. Get Wallet Balance
- **Endpoint**: `GET /wallet/balance`
- **Authentication**: Required

#### Response (200 OK)
```json
{
  "balance": "5450.00"
}
```

---

### B. Get Wallet Ledger History
- **Endpoint**: `GET /wallet/history`
- **Authentication**: Required

#### Response (200 OK)
```json
[
  {
    "id": 105,
    "amount": "1000.00",
    "balance_before": "4450.00",
    "balance_after": "5450.00",
    "ledger_type": "CREDIT",
    "reference": "TRF-monnify-123456",
    "description": "Wallet funding via Monnify",
    "created_at": "2026-06-06T09:12:00Z"
  }
]
```

---

### C. Get Dedicated Virtual Accounts
- **Endpoint**: `GET /wallet/virtual-accounts`
- **Authentication**: Required

#### Response (200 OK)
```json
[
  {
    "provider": "MONNIFY",
    "account_number": "7891234560",
    "bank_name": "Wema Bank",
    "account_name": "MELE DATA - John Doe",
    "status": "ACTIVE"
  }
]
```

---

## 4. VTU Services Endpoints

### A. Get Data Plans
- **Endpoint**: `GET /data/plans`
- **Authentication**: Required

#### Response (200 OK)
```json
[
  {
    "id": 1,
    "plan_code": "mtn-1gb",
    "network": "MTN",
    "name": "MTN SME 1GB",
    "price": "260.00",
    "allowance": "1 GB",
    "validity": "30 Days"
  }
]
```

---

### B. Purchase Data
- **Endpoint**: `POST /data/buy`
- **Authentication**: Required
- **Rate Limit**: `3/minute`

#### Request Payload
```json
{
  "plan_code": "mtn-1gb",
  "phone_number": "08031234567",
  "client_request_id": "unique-uuid-or-timestamp-ref",
  "pin": "1234"
}
```

#### Response (200 OK)
```json
{
  "reference": "TXN-DATA-987654",
  "status": "SUCCESS",
  "amount": "260.00",
  "network": "MTN",
  "recipient": "08031234567"
}
```

---

### C. Purchase Airtime
- **Endpoint**: `POST /services/airtime/buy`
- **Authentication**: Required
- **Rate Limit**: `3/minute`

#### Request Payload
```json
{
  "network": "MTN",
  "amount": "200.00",
  "phone_number": "08031234567",
  "client_request_id": "unique-uuid-ref-airtime",
  "pin": "1234"
}
```

#### Response (200 OK)
```json
{
  "reference": "TXN-AIRTIME-543210",
  "status": "SUCCESS",
  "amount": "200.00",
  "network": "MTN",
  "recipient": "08031234567"
}
```

---

### D. Validate Cable TV Smartcard
- **Endpoint**: `POST /services/cable/validate`
- **Authentication**: Required

#### Request Payload
```json
{
  "provider": "DSTV",
  "smartcard_number": "1020304050"
}
```

#### Response (200 OK)
```json
{
  "customer_name": "Jane Doe",
  "status": "VALID",
  "smartcard_number": "1020304050"
}
```

---

### E. Purchase Cable TV Subscription
- **Endpoint**: `POST /services/cable/buy`
- **Authentication**: Required

#### Request Payload
```json
{
  "provider": "DSTV",
  "smartcard_number": "1020304050",
  "plan_code": "dstv-padi",
  "amount": "2500.00",
  "pin": "1234",
  "client_request_id": "cable-ref-uuid"
}
```

#### Response (200 OK)
```json
{
  "reference": "TXN-CABLE-332211",
  "status": "SUCCESS",
  "amount": "2500.00",
  "recipient": "1020304050"
}
```

---

## 5. Webhooks (External Inbound)

### A. SMEPlug Webhook
- **Endpoint**: `POST /webhooks/smeplug`
- **Authentication**: Custom Bearer Header or `X-Webhook-Token`

#### Payload Example
```json
{
  "transaction": {
    "status": "success",
    "reference": "smeplug-ref-9999",
    "customer_reference": "TXN-DATA-987654",
    "beneficiary": "08031234567",
    "price": "230.00"
  }
}
```

#### Response (200 OK)
```json
{
  "status": "ok"
}
```
