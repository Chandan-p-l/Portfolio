---
title: Passkeys Explained — How Passwordless Login Works and How to Add It
description: Passkeys replace passwords with phishing-resistant public-key cryptography. How WebAuthn and FIDO2 work, synced vs device-bound passkeys, and how to implement passkeys on your site.
date: 2026-10-28
tags: Security, Web Platform
keywords: passkeys, passwordless login, WebAuthn, FIDO2, phishing resistant authentication, passkey implementation
---

> **TL;DR** — A passkey is a login credential based on public-key cryptography. Your device keeps a private key and unlocks it with your fingerprint, face or screen lock; the website stores only a public key. There's nothing to remember, nothing to leak in a database breach, and passkeys can't be phished — they only work on the real website.

## Why passwords keep failing

Passwords fail in predictable ways. People reuse them, so one breach unlocks many accounts. Phishing pages trick people into typing them in. Databases of password hashes get stolen and cracked. One-time codes by SMS help, but they can be phished too, and SIM-swap attacks defeat them.

Passkeys, built on the **FIDO2** standards from the FIDO Alliance and the W3C's **WebAuthn** API, fix the root cause: there's no shared secret at all.

## How passkeys work

### Registration

1. The website asks the browser to create a credential for its domain.
2. Your device generates a new **key pair** just for that site.
3. The **private key** stays on your device or in your password manager, protected by biometrics or a PIN.
4. The **public key** is sent to the website and stored with your account.

### Sign-in

1. The website sends a random **challenge**.
2. You unlock the passkey with your fingerprint, face or PIN. The biometric never leaves your device.
3. The device **signs the challenge** with the private key.
4. The website verifies the signature with the stored public key. If it checks out, you're in.

## Why passkeys can't be phished

Every passkey is bound to the website's **domain** — technically, its relying party ID. If a phishing site at `paypa1-login.com` asks for your PayPal passkey, the browser simply won't offer it. The user can't be tricked into handing it over, because the decision isn't theirs to make.

And because servers store only public keys, a database breach exposes nothing an attacker can use to sign in.

## Synced vs device-bound passkeys

| | Synced passkeys | Device-bound passkeys |
|---|---|---|
| Where the key lives | Password manager (iCloud Keychain, Google Password Manager, 1Password and others) | A single device or hardware security key |
| Survives a lost phone | Yes — restored from the account | No — needs a backup method |
| Best for | Consumers | High-security and enterprise use |

You can also sign in on a device that doesn't have your passkey, such as a borrowed laptop, by **scanning a QR code with your phone**. The phone and laptop confirm they are physically close using Bluetooth.

## Implementing passkeys on your website

The browser API is `navigator.credentials`. Registration looks roughly like this:

```js
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: serverChallenge,           // random bytes from your server
    rp: { id: 'example.com', name: 'Example' },
    user: { id: userIdBytes, name: 'asha@example.com', displayName: 'Asha' },
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
    authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
  },
});
// send credential to your server to verify and store the public key
```

Don't write the server-side verification yourself. Use a well-maintained library such as **SimpleWebAuthn** (Node.js), **py_webauthn** (Python) or **webauthn4j** (Java), or an identity provider that supports passkeys.

### UX best practices

- **Offer passkey creation right after sign-in or sign-up**, not buried in settings.
- **Use autofill (conditional UI).** Add `autocomplete="username webauthn"` to the username field so passkeys appear in the browser's autofill menu.
- **Keep a recovery path** — email or another verified method — for users who lose all their devices.
- **Let users manage passkeys**: list them, name them and delete them.
- **Use clear words.** "Sign in with your fingerprint or face" is clearer than "Use a FIDO credential".

## Who supports passkeys?

All major platforms — Apple, Google and Microsoft — support passkeys in their operating systems and browsers, and major password managers can store and sync them. Large services across e-commerce, banking, social media and developer tools now offer passkey sign-in, and adoption keeps growing.

## Frequently asked questions

### What is a passkey?

A passkey is a passwordless login credential that uses public-key cryptography. The private key stays on your device and is unlocked with biometrics or a PIN, while the website stores only the public key.

### Are passkeys safer than passwords?

Yes. Passkeys can't be reused, guessed or phished, and a server breach doesn't expose anything attackers can use to sign in.

### What happens to my passkeys if I lose my phone?

Synced passkeys are backed up to your password manager account, such as iCloud Keychain or Google Password Manager, and can be restored on a new device.

### Does my biometric data get sent to the website?

No. Your fingerprint or face is only used locally to unlock the passkey. The website receives a cryptographic signature, never biometric data.
