'use client';

import Link from 'next/link';
import { Sidebar } from '@/components/docs/Sidebar';
import { EndpointSection } from '@/components/docs/EndpointSection';
import { CodeBlock } from '@/components/docs/CodeBlock';

const sidebarSections = [
  {
    title: 'Getting started',
    links: [
      { label: 'Overview', href: '#overview' },
      { label: 'Authentication', href: '#authentication' },
    ]
  },
  {
    title: 'Auth Endpoints',
    links: [
      { label: 'Register User', href: '#register-user' },
      { label: 'Login User', href: '#login-user' },
      { label: 'Token Refresh', href: '#token-refresh' },
      { label: 'Get Me', href: '#get-me' },
    ]
  },
  {
    title: 'Wallet Endpoints',
    links: [
      { label: 'Get Balance', href: '#wallet-balance' },
      { label: 'Ledger History', href: '#wallet-history' },
      { label: 'Virtual Accounts', href: '#virtual-accounts' },
    ]
  },
  {
    title: 'VTU Services',
    links: [
      { label: 'Get Data Plans', href: '#data-plans' },
      { label: 'Purchase Data', href: '#purchase-data' },
      { label: 'Purchase Airtime', href: '#purchase-airtime' },
      { label: 'Validate Cable TV', href: '#validate-cable' },
      { label: 'Purchase Cable TV', href: '#purchase-cable' },
    ]
  },
  {
    title: 'Webhooks',
    links: [
      { label: 'SMEPlug Webhook', href: '#smeplug-webhook' },
    ]
  }
];

export default function DevDocs() {
  const BASE_URL = 'https://api.meledata.ng/api/v1';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans scroll-smooth">
      {/* ─── Navbar ─── */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold tracking-tight text-white hover:text-blue-500 transition-colors">
              MELE DATA <span className="text-blue-500">Developers</span>
            </Link>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 px-3">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-full py-2 px-4 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[220px_1fr] gap-12">
        <Sidebar sections={sidebarSections} />

        <main className="max-w-4xl min-w-0 pb-32">
          
          <section id="overview" className="scroll-mt-24 pb-12 border-b border-slate-800/50">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
              MELE DATA API
            </h1>
            <p className="text-base text-slate-400 leading-7 max-w-2xl mb-8">
              The MELE DATA API lets you integrate mobile data top-ups, airtime, cable TV, and electricity into your own application. It features token authentication, a shared wallet, and idempotent endpoints for safe transaction retries.
            </p>
            
            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/80 mb-8">
              <h4 className="text-sm font-bold text-white mb-2">Base URL</h4>
              <code className="text-blue-400 font-mono text-sm">{BASE_URL}</code>
            </div>

            <h2 id="authentication" className="text-2xl font-bold text-white mb-4 scroll-mt-24 pt-4">Authentication</h2>
            <p className="text-sm text-slate-400 leading-7 mb-4">
              Most endpoints require authorization via a JSON Web Token (JWT). The token must be passed in the Authorization header as a Bearer token.
            </p>
            <CodeBlock title="Headers" badge="bash">
{`Authorization: Bearer <your_access_token>`}
            </CodeBlock>
            <p className="text-sm text-slate-400 leading-7 mt-4">
              Token lifespans: <strong>30 minutes</strong> for access tokens, <strong>7 days</strong> for refresh tokens.
            </p>
          </section>

          {/* ━━━ AUTH ENDPOINTS ━━━ */}
          <EndpointSection 
            id="register-user"
            title="Register User"
            method="POST"
            endpoint="/auth/register"
            rateLimit="10/minute"
            requestFields={[
              { field: 'email', type: 'string', notes: 'Required' },
              { field: 'phone_number', type: 'string', notes: 'Required' },
              { field: 'full_name', type: 'string', notes: 'Required' },
              { field: 'password', type: 'string', notes: 'Required' },
              { field: 'referral_code', type: 'string', notes: 'Optional' },
            ]}
            requestExample={
`{
  "email": "user@example.com",
  "phone_number": "08012345678",
  "full_name": "John Doe",
  "password": "SecurePassword123",
  "referral_code": "optional_code"
}`
            }
            responseExample={
`{
  "id": 42,
  "email": "user@example.com",
  "phone_number": "08012345678",
  "full_name": "John Doe",
  "role": "USER",
  "is_verified": false,
  "is_active": true
}`
            }
          />

          <EndpointSection 
            id="login-user"
            title="Login User"
            method="POST"
            endpoint="/auth/login"
            rateLimit="10/minute"
            requestFields={[
              { field: 'email', type: 'string', notes: 'Required (or phone number)' },
              { field: 'password', type: 'string', notes: 'Required' },
            ]}
            requestExample={
`{
  "email": "user@example.com",
  "password": "SecurePassword123"
}`
            }
            responseExample={
`{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "token_type": "bearer"
}`
            }
          />

          <EndpointSection 
            id="token-refresh"
            title="Token Refresh"
            method="POST"
            endpoint="/auth/refresh"
            requestFields={[
              { field: 'refresh_token', type: 'string', notes: 'Required' },
            ]}
            requestExample={
`{
  "refresh_token": "eyJhbG..."
}`
            }
            responseExample={
`{
  "access_token": "eyJhbG...",
  "refresh_token": "eyJhbG...",
  "token_type": "bearer"
}`
            }
          />

          <EndpointSection 
            id="get-me"
            title="Get Current User Info"
            method="GET"
            endpoint="/auth/me"
            auth="Bearer token"
            responseExample={
`{
  "id": 42,
  "email": "user@example.com",
  "phone_number": "08012345678",
  "full_name": "John Doe",
  "role": "USER",
  "is_verified": true,
  "is_active": true
}`
            }
          />

          {/* ━━━ WALLET ENDPOINTS ━━━ */}
          <EndpointSection 
            id="wallet-balance"
            title="Get Wallet Balance"
            method="GET"
            endpoint="/wallet/balance"
            auth="Bearer token"
            responseExample={
`{
  "balance": "5450.00"
}`
            }
          />

          <EndpointSection 
            id="wallet-history"
            title="Get Wallet Ledger History"
            method="GET"
            endpoint="/wallet/history"
            auth="Bearer token"
            responseExample={
`[
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
]`
            }
          />

          <EndpointSection 
            id="virtual-accounts"
            title="Get Dedicated Virtual Accounts"
            method="GET"
            endpoint="/wallet/virtual-accounts"
            auth="Bearer token"
            responseExample={
`[
  {
    "provider": "MONNIFY",
    "account_number": "7891234560",
    "bank_name": "Wema Bank",
    "account_name": "MELE DATA - John Doe",
    "status": "ACTIVE"
  }
]`
            }
          />

          {/* ━━━ VTU SERVICES ━━━ */}
          <EndpointSection 
            id="data-plans"
            title="Get Data Plans"
            method="GET"
            endpoint="/data/plans"
            auth="Bearer token"
            responseExample={
`[
  {
    "id": 1,
    "plan_code": "mtn-1gb",
    "network": "MTN",
    "name": "MTN SME 1GB",
    "price": "260.00",
    "allowance": "1 GB",
    "validity": "30 Days"
  }
]`
            }
          />

          <EndpointSection 
            id="purchase-data"
            title="Purchase Data"
            method="POST"
            endpoint="/data/buy"
            auth="Bearer token"
            rateLimit="3/minute"
            requestFields={[
              { field: 'plan_code', type: 'string', notes: 'Required' },
              { field: 'phone_number', type: 'string', notes: 'Required' },
              { field: 'client_request_id', type: 'string', notes: 'Required for idempotency' },
              { field: 'pin', type: 'string', notes: 'Required (4-digit)' },
            ]}
            requestExample={
`{
  "plan_code": "mtn-1gb",
  "phone_number": "08031234567",
  "client_request_id": "unique-uuid-or-timestamp-ref",
  "pin": "1234"
}`
            }
            responseExample={
`{
  "reference": "TXN-DATA-987654",
  "status": "SUCCESS",
  "amount": "260.00",
  "network": "MTN",
  "recipient": "08031234567"
}`
            }
          />

          <EndpointSection 
            id="purchase-airtime"
            title="Purchase Airtime"
            method="POST"
            endpoint="/services/airtime/buy"
            auth="Bearer token"
            rateLimit="3/minute"
            requestFields={[
              { field: 'network', type: 'string', notes: 'MTN, GLO, AIRTEL, 9MOBILE' },
              { field: 'amount', type: 'string', notes: 'Required' },
              { field: 'phone_number', type: 'string', notes: 'Required' },
              { field: 'client_request_id', type: 'string', notes: 'Required for idempotency' },
              { field: 'pin', type: 'string', notes: 'Required (4-digit)' },
            ]}
            requestExample={
`{
  "network": "MTN",
  "amount": "200.00",
  "phone_number": "08031234567",
  "client_request_id": "unique-uuid-ref-airtime",
  "pin": "1234"
}`
            }
            responseExample={
`{
  "reference": "TXN-AIRTIME-543210",
  "status": "SUCCESS",
  "amount": "200.00",
  "network": "MTN",
  "recipient": "08031234567"
}`
            }
          />

          <EndpointSection 
            id="validate-cable"
            title="Validate Cable TV Smartcard"
            method="POST"
            endpoint="/services/cable/validate"
            auth="Bearer token"
            requestFields={[
              { field: 'provider', type: 'string', notes: 'DSTV, GOTV, STARTIMES' },
              { field: 'smartcard_number', type: 'string', notes: 'Required' },
            ]}
            requestExample={
`{
  "provider": "DSTV",
  "smartcard_number": "1020304050"
}`
            }
            responseExample={
`{
  "customer_name": "Jane Doe",
  "status": "VALID",
  "smartcard_number": "1020304050"
}`
            }
          />

          <EndpointSection 
            id="purchase-cable"
            title="Purchase Cable TV Subscription"
            method="POST"
            endpoint="/services/cable/buy"
            auth="Bearer token"
            requestFields={[
              { field: 'provider', type: 'string', notes: 'Required' },
              { field: 'smartcard_number', type: 'string', notes: 'Required' },
              { field: 'plan_code', type: 'string', notes: 'Required' },
              { field: 'amount', type: 'string', notes: 'Required' },
              { field: 'pin', type: 'string', notes: 'Required (4-digit)' },
              { field: 'client_request_id', type: 'string', notes: 'Required' },
            ]}
            requestExample={
`{
  "provider": "DSTV",
  "smartcard_number": "1020304050",
  "plan_code": "dstv-padi",
  "amount": "2500.00",
  "pin": "1234",
  "client_request_id": "cable-ref-uuid"
}`
            }
            responseExample={
`{
  "reference": "TXN-CABLE-332211",
  "status": "SUCCESS",
  "amount": "2500.00",
  "recipient": "1020304050"
}`
            }
          />

          {/* ━━━ WEBHOOKS ━━━ */}
          <EndpointSection 
            id="smeplug-webhook"
            title="SMEPlug Webhook (External Inbound)"
            method="POST"
            endpoint="/webhooks/smeplug"
            auth="Custom Bearer Header or X-Webhook-Token"
            description="Listen for asynchronous status updates for transactions processed through SMEPlug (e.g. Airtel data delivery confirmation)."
            requestExample={
`{
  "transaction": {
    "status": "success",
    "reference": "smeplug-ref-9999",
    "customer_reference": "TXN-DATA-987654",
    "beneficiary": "08031234567",
    "price": "230.00"
  }
}`
            }
            responseExample={
`{
  "status": "ok"
}`
            }
          />

        </main>
      </div>
    </div>
  );
}
