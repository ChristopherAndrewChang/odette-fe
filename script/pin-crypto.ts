// pin-crypto.ts
//
// Utility functions for FE-only PIN-gated content encryption.
//
// IMPORTANT: this raises the cost of a casual bypass (view-source, skip the
// if-check, etc). It does NOT make FE-only validation secure. Anyone with
// the ciphertext, IV, and salt (all shipped in your JS bundle) can still
// brute-force short PINs offline, on their own machine, with no rate limit
// and no way for you to detect it. For anything with real consequences
// (personal data, transactions, admin access), validate on a server instead.

const PBKDF2_ITERATIONS = 100_000;
const SALT_LENGTH_BYTES = 16;
const IV_LENGTH_BYTES = 12; // 96-bit IV, standard for AES-GCM

/**
 * Generate a cryptographically secure random salt, base64-encoded.
 * Safe to store/ship in plaintext — salt is not a secret.
 */
export function generateSalt(length: number = SALT_LENGTH_BYTES): string {
    const bytes = crypto.getRandomValues(new Uint8Array(length));


    return bytesToB64(bytes);
}

/**
 * Derive an AES-GCM key from a PIN + salt using PBKDF2.
 * The iteration count deliberately slows this down, raising the cost
 * of each offline brute-force attempt.
 */
export async function deriveKey(
    pin: string,
    saltStr: string,
    usages: KeyUsage[] = ["decrypt"]
): Promise<CryptoKey> {
    const enc = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(pin),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode(saltStr),
            iterations: PBKDF2_ITERATIONS,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        usages
    );
}

function bytesToB64(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes));
}

function b64ToBytes(b64: string): Uint8Array {
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

/**
 * BUILD-TIME function. Run this once, offline (e.g. in a Node script),
 * to produce the ciphertext/IV/salt you'll ship in your app bundle.
 * Never call this in the browser at runtime with the real PIN — it's
 * meant to generate static values ahead of time, not to run per user.
 */
export async function encryptContent(
    plaintext: string,
    pin: string
): Promise<{ cipherB64: string; ivB64: string; salt: string }> {
    const salt = generateSalt();
    const key = await deriveKey(pin, salt, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES));

    const enc = new TextEncoder();

    const cipherBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(plaintext)
    );

    return {
        cipherB64: bytesToB64(new Uint8Array(cipherBuffer)),
        ivB64: bytesToB64(iv),
        salt,
    };
}

/**
 * RUNTIME function. Call this in the browser when the user submits a PIN.
 * Returns the decrypted plaintext if the PIN was correct, or null if not.
 */
export async function unlockContent(
    pin: string,
    cipherB64: string,
    ivB64: string,
    salt: string
): Promise<string | null> {
    try {
        const key = await deriveKey(pin, salt, ["decrypt"]);
        const iv = b64ToBytes(ivB64);
        const data = b64ToBytes(cipherB64);

        const plainBuffer = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            key,
            data
        );

        return new TextDecoder().decode(plainBuffer); // success = correct PIN
    } catch {
        return null; // decryption/auth failure = wrong PIN
    }
}
