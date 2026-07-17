// scripts/test-unlock.ts
//
// Verifikasi cepat sebelum dipasang ke komponen React:
// pastikan hasil generate-secret.ts benar-benar bisa didekripsi balik.
//
// Jalankan: npx tsx scripts/test-unlock.ts

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { unlockContent } from "./pin-crypto"; // sesuaikan path

// Ganti 3 nilai ini dengan hasil dari generate-secret.ts
const CIPHER_B64 = "yGtgpUnWOlf9sy0BDMskBO0RTRLHsg==";
const IV_B64 = "NLWdqAxB9PWnvQ5V";
const SALT = "1nbqHMHIS3jHAFyKP3nCKQ==";

async function main() {
    const rl = createInterface({ input: stdin, output: stdout });
    const pin = await rl.question("Coba masukkan PIN untuk verifikasi: ");

    rl.close();

    const result = await unlockContent(pin, CIPHER_B64, IV_B64, SALT);

    if (result === null) {
        console.log("GAGAL: PIN salah, atau dekripsi tidak cocok.");
    } else {
        console.log("BERHASIL. Konten hasil dekripsi:", result);
    }
}

main();
