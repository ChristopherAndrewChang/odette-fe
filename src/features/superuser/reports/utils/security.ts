export function generateSalt(length: number = 16): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(length));
}

export async function deriveKey(pin: string, saltStr: string): Promise<CryptoKey> {
    const enc = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(pin), { name: "PBKDF2" }, false, ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode(saltStr), iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );
}

export async function unlockContent(
    pin: string,
    cipherB64: string,
    ivB64: string,
    salt: string
): Promise<string | null> {
    try {
        const key = await deriveKey(pin, salt);
        const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
        const data = Uint8Array.from(atob(cipherB64), c => c.charCodeAt(0));
        const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);

        return new TextDecoder().decode(plain); // sukses = PIN benar
    } catch {
        return null; // gagal decrypt = PIN salah
    }
}
