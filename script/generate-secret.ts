// scripts/generate-secret.ts
//
// Jalankan ini di terminal lokal Anda, BUKAN dari kode aplikasi.
// Tujuannya cuma sekali pakai: menghasilkan cipherB64/ivB64/salt
// yang nanti Anda copy manual ke komponen React.
//
// Cara jalankan:
//   npx tsx scripts/generate-secret.ts

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { encryptContent } from "./pin-crypto"; // sesuaikan path kalau lokasi file beda

async function prompt(question: string): Promise<string> {
    const rl = createInterface({ input: stdin, output: stdout });
    const answer = await rl.question(question);

    rl.close();

    return answer;
}

async function main() {
    const plaintext = await prompt("Konten yang mau dienkripsi: ");
    const pin = await prompt("PIN: ");

    const { cipherB64, ivB64, salt } = await encryptContent(plaintext, pin);

    console.log("\n--- Copy 3 baris ini ke komponen React ---");
    console.log("CIPHER_B64 =", JSON.stringify(cipherB64));
    console.log("IV_B64     =", JSON.stringify(ivB64));
    console.log("SALT       =", JSON.stringify(salt));
    console.log("--- PIN TIDAK ikut ditampilkan di atas, dan memang seharusnya begitu ---\n");
}

main();
