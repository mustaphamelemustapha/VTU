"use client";

import React, { useState } from 'react';

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState('data');

  const tabs = [
    { id: 'data', label: 'Buy Data API' },
    { id: 'airtime', label: 'Buy Airtime API' },
    { id: 'errors', label: 'Errors & Responses' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-gray-700 pb-5">
        <h1 className="text-3xl font-bold text-white tracking-tight">API Documentation</h1>
        <p className="mt-2 text-sm text-gray-400">Integrate MZ DATA services easily with our standardized REST API.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-left rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white font-medium' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'data' && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Buy Data API</h2>
              <p className="text-gray-400 mb-6">Purchase a data plan for any supported network.</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Endpoint</h3>
                <div className="bg-black p-3 rounded-md flex items-center space-x-3">
                  <span className="text-green-400 font-bold">POST</span>
                  <code className="text-gray-200">/api/v1/developer/data/purchase</code>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Headers</h3>
                <div className="bg-black p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>
{`Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json`}
                    </code>
                  </pre>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Request Body (JSON)</h3>
                <table className="min-w-full divide-y divide-gray-800 mt-2 text-sm text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Field</th>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Type</th>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">network</td>
                      <td className="px-4 py-3 text-xs">string</td>
                      <td className="px-4 py-3">Network name (MTN, GLO, AIRTEL, 9MOBILE)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">phone_number</td>
                      <td className="px-4 py-3 text-xs">string</td>
                      <td className="px-4 py-3">Recipient's 11-digit phone number</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">plan_id</td>
                      <td className="px-4 py-3 text-xs">integer</td>
                      <td className="px-4 py-3">The ID of the data plan to purchase</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">reference</td>
                      <td className="px-4 py-3 text-xs">string</td>
                      <td className="px-4 py-3">Your unique transaction reference</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Success Response (200 OK)</h3>
                <div className="bg-black p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm text-green-400">
                    <code>
{`{
  "status": true,
  "message": "Transaction successful",
  "data": {
    "status": "success",
    "reference": "YOUR_REF_123",
    "amount": 250.0,
    "network": "MTN",
    "phone_number": "08012345678"
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'airtime' && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Buy Airtime API</h2>
              <p className="text-gray-400 mb-6">Top up airtime for any supported network.</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Endpoint</h3>
                <div className="bg-black p-3 rounded-md flex items-center space-x-3">
                  <span className="text-green-400 font-bold">POST</span>
                  <code className="text-gray-200">/api/v1/developer/airtime/purchase</code>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Request Body (JSON)</h3>
                <table className="min-w-full divide-y divide-gray-800 mt-2 text-sm text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Field</th>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Type</th>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">network</td>
                      <td className="px-4 py-3 text-xs">string</td>
                      <td className="px-4 py-3">Network name (MTN, GLO, AIRTEL, 9MOBILE)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">phone_number</td>
                      <td className="px-4 py-3 text-xs">string</td>
                      <td className="px-4 py-3">Recipient's 11-digit phone number</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">amount</td>
                      <td className="px-4 py-3 text-xs">number</td>
                      <td className="px-4 py-3">Amount of airtime to purchase (NGN)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-blue-400">reference</td>
                      <td className="px-4 py-3 text-xs">string</td>
                      <td className="px-4 py-3">Your unique transaction reference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Errors & Responses</h2>
              <p className="text-gray-400 mb-6">Our API uses standardized HTTP status codes and a consistent JSON response format for all errors.</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Error Response Format</h3>
                <div className="bg-black p-4 rounded-md overflow-x-auto mb-4">
                  <pre className="text-sm text-red-400">
                    <code>
{`{
  "status": false,
  "message": "plan_id must be a valid integer."
}`}
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Common Status Codes</h3>
                <table className="min-w-full divide-y divide-gray-800 mt-2 text-sm text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Code</th>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Meaning</th>
                      <th className="px-4 py-3 text-gray-400 font-medium tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">200</td>
                      <td className="px-4 py-3 text-green-400">OK</td>
                      <td className="px-4 py-3">The request was successful.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">400</td>
                      <td className="px-4 py-3 text-yellow-400">Bad Request</td>
                      <td className="px-4 py-3">Invalid input (e.g., non-integer plan_id, insufficient balance).</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">401</td>
                      <td className="px-4 py-3 text-red-400">Unauthorized</td>
                      <td className="px-4 py-3">Invalid or missing API key.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">404</td>
                      <td className="px-4 py-3 text-red-400">Not Found</td>
                      <td className="px-4 py-3">The requested resource (e.g., data plan) does not exist.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
