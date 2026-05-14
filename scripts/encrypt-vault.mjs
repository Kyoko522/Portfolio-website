/**
 * Encrypts the vault data with AES-256-GCM + PBKDF2.
 *
 * Usage:
 *   VAULT_PASSWORD=yourpassword node scripts/encrypt-vault.mjs
 *
 * Re-run this script any time you update data.js to regenerate encrypted.js.
 * Output format (all concatenated, then base64-encoded):
 *   salt[16] || iv[12] || ciphertext[...] || authTag[16]
 *
 * The Web Crypto API (browser) expects the authTag appended to the ciphertext,
 * which matches this layout exactly.
 */

import { createCipheriv, pbkdf2Sync, randomBytes } from 'crypto'
import { writeFileSync } from 'fs'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require   = createRequire(import.meta.url)

const password = process.env.VAULT_PASSWORD
if (!password) {
  console.error('Error: set VAULT_PASSWORD env var before running.')
  process.exit(1)
}

// Load the plain-text data (this file is never imported by any page component)
const dataPath = resolve(__dirname, '../src/app/vault/secret/data.js')
const { CATEGORIES, MOVIES_SECTIONS } = require(dataPath)
const plaintext = JSON.stringify({ CATEGORIES, MOVIES_SECTIONS })

// PBKDF2  →  AES-256-GCM
const salt = randomBytes(16)
const iv   = randomBytes(12)
const key  = pbkdf2Sync(password, salt, 100_000, 32, 'sha256')

const cipher    = createCipheriv('aes-256-gcm', key, iv)
const encrypted = Buffer.concat([
  cipher.update(Buffer.from(plaintext, 'utf8')),
  cipher.final(),
])
const authTag = cipher.getAuthTag() // 16 bytes

// Web Crypto decrypt() expects: ciphertext || authTag
const blob = Buffer.concat([salt, iv, encrypted, authTag]).toString('base64')

const outputPath = resolve(__dirname, '../src/app/vault/secret/encrypted.js')
writeFileSync(
  outputPath,
  `// Auto-generated — do not edit manually.
// Re-generate with: VAULT_PASSWORD=<pass> node scripts/encrypt-vault.mjs
export const VAULT_BLOB = '${blob}'
`,
)

console.log('✓ Encrypted vault data written to src/app/vault/secret/encrypted.js')
console.log(`  Plaintext size : ${plaintext.length} bytes`)
console.log(`  Ciphertext size: ${blob.length} base64 chars`)
