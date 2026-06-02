#### Goals
1. Prevention
	- Security attacks are often cheaper to prevent, than to fix afterwards
	- Main problem is the so-called internet time - whenever something hapens, the speed with which it spread throught out hte world is astonishing
	- this must be accounted for in process of risk identification and management
2. Detection
	- detect intrusions accurately and quickly
	- ignore legitimate behaviour
	- adapt to new attacks

##### Intrusion Detection
- Anomaly-based (statistical techniques)
	- What is usual, is good; what is unusual, is bad
- Pattern-based (attack signature)
	- what is bad, is known; what is not bad is good
- Specification-based
	- What is good, is known; what is not good, is bad

3. Traceability
	- Once an attack happens, it is important to figure out who did what, and when and where they did it 
	- Although accountability is not the ultimate prevention approach, it may yet help dissuade some attackers

4. recovery 
	- Once an attack happens, normal operation will be disrupted and the system should go back to normal asap
	- We should also assess the actual extent of the damage: was it just the service that was disrupted, or the system suffered some material damage?

Overall Comment
- The objectives of security efforts include preventing attacks, detecting intrusions accurately, tracing activities for accountability, and recovering from attacks promptly.

#### Monitoring 
- Simplest monitoring: looking at network traffic, analyzing network logs (helps in intrusion detection)

#### Multilevel security
- Not everyone should be able to do anything
- Simply, actions and artifacts as well as people, may be categorized into different levels which correspond to different set of allowed actions
- There are theoretical model (Bell-LaPadula, Biba, Clark-Wilson) that deal  
with this, albeit using a very limited set of actions
- Real-time auditing of system activities and establishing levels of access and permissions based on user roles and data sensitivity.

#### Anonymity 
- Discusses the trade-offs between anonymity and traceability, noting how software design can inadvertently affect user anonymity.

#### **Social Engineering:**
- Recognizes the human factor in security, highlighting the risk of social engineering attacks.

#### **Balancing Security with Other Development Goals:**
- Acknowledges the need to balance security with other software development objectives like functionality, usability, and time-to-market, which are not always compatible.


#### Most Common Types of Security Threats
![[Pasted image 20240404135655.png]]
1. Injection attacks 
	- Injection attacks exploit valid input fields to execute unauthorized code or database commands.
	- Such attacks can execute malicious instructions, causing damage to the system, like unauthorized data access.
	- Examples include injecting code that leaks data or interferes with system operations.
	- Two common forms are buffer overflow attacks and SQL injection attacks.
1. SQL poisoning attacks
	- SQL injection targets software interacting with SQL databases.
	- Attackers insert malicious SQL code via user input fields, often within web forms.
	- This malicious code is then executed as part of the SQL query, manipulating the database to disclose information or corrupt data.
	- The vulnerability comes from improper handling or sanitization of user inputs in the database layer.
1. Cross-site scripting attack
	- Cross-site scripting is a common web-based injection attack.
	- Attackers inject malicious JavaScript into a webpage, which is then executed in a user's browser when they visit the compromised site.
	- The malicious script could steal sensitive information from the user or redirect them to a fraudulent site, often attempting to harvest personal data or hijack user sessions by stealing cookies.
	- Preventing XSS typically involves proper validation and sanitization of user inputs on websites.
	![[Pasted image 20240404141045.png]]
	1. **Attack Initiation**: The attacker introduces malicious code into a product website, which could be through a vulnerable input field or by compromising the website's content directly.
    
	2. **Malware Delivery**: When the victim visits the product website, the website sends back the requested data along with the malicious script.
    
	34. **Execution and Exploitation**: Once the malicious script is in the victim's browser, it executes and performs actions such as sending the victim's session cookies back to the attacker. This could allow the attacker to hijack the victim's session, gaining unauthorized access to their accounts on that website.
1. Session hijacking attacks
	- When a user logs into a web application, a session is created, allowing the user to interact with the system without re-authenticating each time.
	- This session is usually maintained by a session cookie, a small piece of data stored on the user's device.
	- Session hijacking occurs when an attacker obtains a user's session cookie, allowing them to impersonate the user and gain unauthorized access to their account.
	- Attackers can obtain session cookies by methods like cross-site scripting (XSS) attacks, where malicious scripts are used to transmit session cookies to the attacker.
	- Another method is traffic monitoring, where attackers capture the data exchanged between a user's device and the server to find the session cookie.
1. Denial-of-service attacks
	- **Denial-of-Service attacks**: These are intentional attempts to make a software system unavailable for use. The aim is to disrupt services by overwhelming the system with a flood of requests, causing it to crash or become too slow to handle legitimate requests.
	
	- **Distributed Denial-of-Service attacks (DDoS)**: A more potent form of DoS attack that utilizes many compromised computer systems (often part of a botnet) to perform a massive coordinated attack, making it harder to stop since it originates from multiple sources.
	
	- **Targeting Application Users**: Some DoS attacks specifically target user accounts, for instance by trying to log in with known email addresses as usernames. This could be an attempt to lock the accounts due to multiple failed login attempts, a policy many systems use as a security measure.
	
	- **User Lockout Attacks**: These exploit security measures that lock users out after several failed authentication attempts. The attacker deliberately fails authentication to lock legitimate users out of their accounts.
	
	- **The Dilemma of Locking Accounts**: Not locking accounts can expose the system to brute-force attacks, where attackers try numerous combinations to guess a password. However, locking accounts after failed attempts can inadvertently deny access to legitimate users if this feature is abused by attackers.
1. Brute force attacks
	- attacks on the web application where the attacker has some information, such as valid login name, but not have the password for the site.
	- The attacker tries all possible password combination to break through the phone 
		- Attackers may use a string generator that generates every possible combination  of letters and numbers and use these as passwords. 
		- To speed up the process of password discovery, attackers take advantage of the  fact that many users choose easy-to-remember passwords. They start by trying  passwords from the published lists of the most common passwords.

#### Authentication
- the process of ensuring that a user of your system is who they claim to be![[Pasted image 20240404142047.png]]
- **Knowledge-Based Authentication**: Uses information only the user knows, like a password or PIN, required each time they access the system.
- **Possession-Based Authentication**: Depends on something the user has, like a security token or mobile phone app, which generates a code to be entered alongside their credentials.
- **Attribute-Based Authentication**: Utilizes unique biometric identifiers of the user, such as fingerprints or retinal patterns, to verify identity.
- **Multi-Factor Authentication**: Combines two or more of the above methods for enhanced security, making unauthorized access significantly more difficult.

#### Weaknesses of password-based authentication
![[Pasted image 20240404143451.png]]

#### Federated identity 
- Federated identity allows users to access multiple applications with one set of login credentials from a trusted provider, simplifying user experience and aiming to enhance security by reducing credential duplication across services.
![[Pasted image 20240404144206.png]]

#### Authorization
- Authentication involves a user provoking their identity to a software system
- This is the process following authentication where a user's identity is confirmed, and specific permissions are granted to access certain resources within a system. For example, a Dropbox folder owner can allow others to view but not upload or modify files. Access is governed by a set of rules under an access control policy, detailing who can access what data and in what manner.

#### Encryption
- This is the process following authentication where a user's identity is confirmed, and specific permissions are granted to access certain resources within a system. For example, a Dropbox folder owner can allow others to view but not upload or modify files. Access is governed by a set of rules under an access control policy, detailing who can access what data and in what manner.
![[Pasted image 20240404145528.png]]

#### Symmetric encryption
- the same encryption key is used for encoding and decoding the information that is to kept a secret 
![[Pasted image 20240404145729.png]]
![[Pasted image 20240404145737.png]]


#### Asymmetric encryption
- Does not require secret keys to be shared
- uses different keys for encrypting and decrypting message
- Each user has a public and private key, and messages may be encrypted using either key but can only be decrypted using the other key
- Public keys can be published and shared by the key owner
- Anyone can assess and use the public keys 
- However, messages can only be decrypted by the user’s private key so is only readable by the intended recipient
![[Pasted image 20240404150109.png]]

#### Encryption and authentication
- Asymmetric encryption can also be used to authenticate the sender of a message by encrypting it with a private key and decrypting t wth the corresponding public key


#### Digital Certificates
- A Digital certificates issued by a certificated authority (CA), which is a trusted identity verification service
- The CA encrypts the information in the certificate using their private key to create a unique signature
- This signature is included in the certificate along with the public key of the CA
- To check that the certification is valid, you can decrypt the signature using the CA's public key

#### Privacy
- It's privacy things everyone has their own definition of what they think should and shouldn't be private 

#### Business reasons for Privacy 
![[Pasted image 20240404153416.png]]
i don't think we will be tested on this but sure why not have it


