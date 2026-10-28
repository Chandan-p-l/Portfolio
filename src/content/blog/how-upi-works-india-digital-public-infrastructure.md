---
title: How UPI Works — The Technology Behind India's Real-Time Payments
description: UPI processes billions of payments a month. A technical walkthrough of VPAs, NPCI's switch, PSP banks, how a payment flows, UPI Lite, UPI on credit, and what developers can learn from India Stack.
date: 2026-10-28
tags: Fintech, Architecture
keywords: how UPI works, UPI architecture, NPCI, India Stack, digital public infrastructure, UPI payment flow, VPA, UPI Lite, Razorpay
---

> **TL;DR** — UPI (Unified Payments Interface) is a real-time payment system run by NPCI that lets any bank account send money to any other using a simple address like `name@bank`. It's built as open **digital public infrastructure**: NPCI runs the central switch, banks hold the money, and apps like PhonePe, Google Pay and Paytm provide the interface. It now handles well over 20 billion transactions a month.

## What makes UPI special

Before UPI, sending money in India meant entering account numbers and IFSC codes, waiting for batches to clear and paying fees. UPI, launched by the **National Payments Corporation of India (NPCI)** in 2016, made payments:

- **Instant** — money moves in seconds, 24×7, 365 days a year.
- **Interoperable** — any UPI app works with any participating bank.
- **Simple** — pay with a **virtual payment address (VPA)**, a phone number or a QR code.
- **Free for consumers** — person-to-person and most person-to-merchant payments carry no charge for the payer.

Monthly volumes crossed **20 billion transactions in 2025**, making UPI one of the largest real-time payment systems in the world.

## The key players

| Role | Who | What they do |
|---|---|---|
| **NPCI** | National Payments Corporation of India | Runs the central UPI switch, sets rules and standards |
| **Remitter bank** | Payer's bank | Debits the payer's account |
| **Beneficiary bank** | Payee's bank | Credits the payee's account |
| **PSP (payment service provider) bank** | Banks that sponsor UPI apps | Connects third-party apps to the UPI network |
| **Third-party app (TPAP)** | PhonePe, Google Pay, Paytm, others | The user interface |

Apps like PhonePe and Google Pay don't hold your money and aren't banks. They connect to UPI **through partner PSP banks**.

## Virtual payment addresses

A VPA (also called a UPI ID) looks like `asha@okbank`. It's an alias that maps to a bank account, so you never share account numbers. One account can have several VPAs across different apps, and the mapping is resolved by the PSP and NPCI at payment time.

## How a UPI payment flows

When Asha pays ₹500 to a shop by scanning its QR code:

1. **Scan and confirm.** The QR code contains a UPI payment link with the merchant's VPA, name and, optionally, the amount. Asha confirms in her UPI app.
2. **Enter UPI PIN.** The PIN is captured in a secure, NPCI-provided library on the device and **encrypted** so the app itself never sees it.
3. **Request to NPCI.** Asha's PSP sends the encrypted request to NPCI's UPI switch.
4. **Address resolution.** NPCI resolves the merchant's VPA to their bank through the merchant's PSP.
5. **Debit.** NPCI asks Asha's bank to verify the PIN and debit ₹500.
6. **Credit.** NPCI asks the merchant's bank to credit ₹500.
7. **Confirmation.** Both sides get a success response, and the merchant's soundbox announces the payment — usually within a few seconds.

Behind the scenes, the actual **settlement** between banks happens in batches through the RBI's settlement systems; to users, the credit appears instantly.

## Security design

- **Two factors:** the registered device and SIM (device binding), plus the UPI PIN.
- **PIN never leaves the secure library in plain text**; it's encrypted for the issuing bank.
- **No account numbers shared** — only VPAs.
- **Transaction limits and risk checks** at banks and NPCI.

The biggest risk is **social engineering**: fraudsters send "collect requests" or ask victims to enter their PIN to "receive" money. Remember: **you never need to enter your UPI PIN to receive money.**

## Features beyond basic payments

- **UPI AutoPay** — recurring mandates for subscriptions, SIPs and bills.
- **UPI Lite** — small-value payments from an on-device wallet without a PIN for each transaction, reducing load on bank systems.
- **UPI 123PAY** — UPI for feature phones through IVR calls, missed calls and other non-smartphone methods.
- **Credit on UPI** — RuPay credit cards and pre-approved bank credit lines can be linked to UPI.
- **UPI International** — UPI acceptance and linkages are expanding in several countries.

## UPI as part of India Stack

UPI is one layer of **India Stack**, a set of open digital public infrastructure:

- **Aadhaar** — digital identity and eKYC.
- **UPI** — payments.
- **DigiLocker** — verified digital documents.
- **Account Aggregator** — consent-based financial data sharing.
- **ONDC** — an open network for digital commerce.

The design philosophy is **open protocols on public rails**, with private companies competing on top. That combination of public infrastructure and private innovation is what made adoption so fast.

## What developers can learn from UPI

- **Interoperability beats walled gardens.** A shared protocol grew the whole market.
- **Simple identifiers win.** `name@bank` is easier than an account number and IFSC code.
- **Design for scale and failure.** Idempotent transaction IDs, clear status codes and status-check APIs are essential when billions of requests flow through many parties.
- **Security must be invisible.** Device binding plus a PIN is strong, but it feels like one tap.

## Accepting UPI in your app

Most businesses integrate UPI through a **payment gateway** such as Razorpay, Cashfree, PayU or others, which provide APIs for UPI intent flows (opening the user's UPI app), QR codes, collect requests and AutoPay mandates. Key engineering practices:

- Never mark an order as paid based on the client redirect alone — **verify via server-to-server webhooks** and status APIs.
- **Verify webhook signatures**, and make handlers **idempotent** so retries don't double-process orders.
- Handle **pending** states gracefully; some payments confirm after a delay.

## Frequently asked questions

### How does UPI work?

UPI connects banks through NPCI's central switch. When you pay, your UPI app sends an encrypted request via its partner bank to NPCI, which debits your bank account and credits the recipient's bank account in real time.

### Who owns UPI?

UPI is operated by the National Payments Corporation of India (NPCI), an organisation set up by the Reserve Bank of India and the Indian Banks' Association.

### Is UPI safe?

UPI uses device binding and an encrypted UPI PIN, and never shares account numbers. Most UPI fraud is social engineering, so never share your PIN and never enter it to receive money.

### What is UPI Lite?

UPI Lite is an on-device wallet for small-value UPI payments that can be made without entering a UPI PIN each time, making small payments faster and reducing load on bank systems.
