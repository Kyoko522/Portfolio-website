
### Terminology 
- Encryption (encoding, encipher): process of encoding a message so that its meaning becomes non-obvious
- Decryption (decoding, decipher): reverse process of encryption with goal to reveal the message
#### Basic Cryptography Scheme
![[Pasted image 20241003230619.png]]
- Algorithms: set of rules on how to encrypt the plaintext and decrypt the cipher text
- An item called key (k) is often used so that the obtained cipher text depends on the plaintext, algorithm and key value
- This dependency is formally written as 
	- C = E(k, P) where
		- E is a set of encryption algorithm
		- Key k selects one specific algorithm from the set.

#### Formal Notation Without Keys 
![[Pasted image 20241003230923.png]]

#### Cryptography System with Keys 
![[Pasted image 20241003230950.png]]

#### Cryptography in Practice 
**![[Pasted image 20241003231017.png]]

#### Cryptanalysis
 Goal 
- Breaking a message 
	- Recognize patterns in encrypted messages to be able to break the subsequent ones 
	- Infer meaning w / o breaking the encryption 
	- - Unusual volume of messages between enemy troops may indicated a coming attack
- Deduce the key to facilitate breaking subsequent message 
- Find vulnerabilities in implementation or environment of an encryption algorithm
- Find a general weakness in an encryption algorithm
- Information for cryptanalyst
	- Intercept encrypted messages
	- Known encryption algorithms
	- Intercepted plaintext
	- Data known or suspected to be cipher text 
	- Math, statistical tools and techniques 
	- Properties of natural languages 
	- Properties of computer system

#### Breakable Encryption 
- Theoretically based on Shannon's theory of information (1948), all unbreakable cryptosystems must have the same requirements as one-time pad.
- Practical cyrptosystems almost always are breakable, given adequate time and computing power 
- The trick is to make breaking a cryptosystem hard enough for the intruder 
- The difficulty of breaking an encryption i.e. the amount of work needed to break it is called work factor 

#### Symmetric Encryption 
- Universal technique for providing confidentiality for both transmitted (communication) and store data (DBs, files)
- ![[Pasted image 20241003233708.png]]
Two requirements for secure use:
- Need for strong encryption algorithm (e.g. an attacker who know E[.] and C is unable to decipher C or find the key k)
- Sender and receiver must obtain copies of the secret key in a secure fashion and must keep the key secure 

#### Attacking Symmetric Encryption 
Cryptanalysis 
- Exploit the nature of the encryption algorithm and the general characteristics of the plaintext-ciphertext pairs
- Attempts to learn a specifics plaintext or secret key
- Once the key is compromised, all the future and past message encrypted by this key are compromised
Brute-force attack (straightforward)
- Obtain a single (plaintext, ciphertext) pair 
- check if P = D[K',C]
- On average, half of all possible keys must be tried. Why?

#### Problems with Symmetric Encryption 
- How do two users A and B obtain their shared secret key?
- If A wants to share encrypted communication with another user C, A and C would need a different shared secret key. 
- Managing keys is the major challenge when using symmetric encryption
- Ensuring security of the "key channel"
- In general, n user who want to communication in pairs need n*(n-1)/2 keys, i.e the number of keys needed increases at a rate proportional to the square of the number of user!
- Thus, symmetric encryption systems required a sound key distribution management scheme

### Asymmetric (Public Key) Encryption 
 ![[Pasted image 20241003235213.png]]
Classification 
- Keyless scryptosystems 
	- less secure (a cryptographic technique where information is hidden by only keeping the originator of a message, and not its contents, secret)
- Symmetric cryptosystems: Ke = Kd 
	- Classic 
	- Encipher and decipher use the same key 
		- or one key is easily derived from other
- Asymmetric Crptosystems: Ke != Kd
	- Public key system
	- Encipher and decipher use different keys 
		- Computationally infeasible to derive one from other 

#### Private Vs Public Keys 
![[Pasted image 20241004000452.png]]

- Private key must be carefully managed in both symmetric and asymmetric (PKE) cryptosystems 
	- Storing / safeguarding / activating-deactivating
- Public key must be carefully distributed in PKE systems
- Key Management is a major issue

### Stream Vs Block Cipher
#### Basic Types of Ciphers 
Substitution ciphers
- Letter of plaintext P replace with other letters by the encryption algorithm E 
Transportation (permutation) ciphers 
- Order of letters in plaintext P rearranged by E
Product ciphers 
- E = E1 + E2 + ... + En
	- Combination of 2 or more ciphers,l which may enhance the security of the cryptosystem

#### Caesar Cipher 
![[Pasted image 20241004001107.png]]

