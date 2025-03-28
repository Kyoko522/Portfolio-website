# Digital Signatures: Properties and Using PKE

## 1. Properties of Digital Signatures

### Unforgeable
- Only S can produce the pair [M, Sg(S, M)]

### Authenticable/non-repudiation
- R can verify that Sg(S, M) is [M, Sg(S, M)] comes from S
	- Only S could have produced M + Sg(S, M)
	- Sg(S, M) is firmly attached to M

### Not Alterable
- Once a message \( M \) and its signature \( Sg(S, M) \) are sent, they **cannot be altered** by the sender (S), receiver (R), or an attacker.
- Any changes to \( M \) or \( Sg \) will **invalidate the signature** during verification.

### Not Reusable
- If the same message \( M \) is received again, the sender (S) can detect that the message is **old**.
- Prevents digital signatures from being reused for unauthorized purposes.

---

## 2. Using PKE for Digital Signatures (Transmitting Signed Messages)

### Steps for Signing and Sending
1. **Original Message:**
   - The message is \( P \).

2. **Privacy Transformation:**
   - Encrypt \( P \) with the recipient's public key (\( K_{PUB-R} \)):
     \[
     C = E(P, K_{PUB-R})
     \]
   - Only the recipient (R) can decrypt \( C \) using their private key (\( K_{PRIV-R} \)).

3. **Authenticity Transformation (Signing):**
   - Create a signature for the message \( C \) using the sender's private key (\( K_{PRIV-S} \)):
     \[
     Sg = Sg(S, C) = D(C, K_{PRIV-S})
     \]
   - Only the sender can create this signature.

4. **Sent Message:**
   - Transmit \( C \) (encrypted message) and \( Sg \) (signature) to the recipient.

---

## 3. Using PKE for Digital Signatures (Receiving Signed Messages)

### Steps for Receiving and Verifying
1. **Received Message:**
   - The recipient receives \( C \) (encrypted message) and \( Sg \) (signature).

2. **Signature Verification:**
   - Verify \( Sg \) using the sender's public key (\( K_{PUB-S} \)):
     \[
     E(Sg, K_{PUB-S}) = C
     \]
   - If the equation holds, the signature is valid.
   - This works because:
     \[
     E(Sg, K_{PUB-S}) = E(D(C, K_{PRIV-S}), K_{PUB-S}) = C
     \]

3. **Decryption:**
   - Decrypt \( C \) using the recipient's private key (\( K_{PRIV-R} \)):
     \[
     P = D(C, K_{PRIV-R})
     \]
   - This retrieves the original message \( P \).

---

## Key Takeaways
- **Integrity:** Verified by checking \( Sg \) with \( K_{PUB-S} \), ensuring no alterations to \( M \).
- **Confidentiality:** Achieved by encrypting \( P \) with \( K_{PUB-R} \), ensuring only the recipient can decrypt it.
- **Non-repudiation:** The sender cannot deny creating \( Sg \), as only their private key (\( K_{PRIV-S} \)) could have signed it.
