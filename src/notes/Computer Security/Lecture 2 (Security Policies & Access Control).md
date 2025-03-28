#### Security Policy
Definition: A statement that partitions that states of the system into a set of authorized (secure) states and a set of unauthorized (nonsecure) states.
- A security policy considers all relevant aspects of C-I-A
- A statement of security policy can be informal or/and formal

### Security Policy - Informal 
- Document that describes precisely and concisely the protection properties that a system must have
- Is driven by our understanding of threats, and in its turn drives our system design. 

"The set of laws, rules, and practices regulating the processing of sensitive information and the use of resources by the hardware and software of IT"

### Security Policy - Formal
#### Precise Definition of Confidentiality
![[Pasted image 20240926034735.png]]
- Confidentiality implies that information must not be disclosed to some set of entities. it may be disclosed to others. 
- The membership of set X is often implicit-for example, when we speak of a document that is confidential, some entity has access to it. all entities not authorized to have such access make up the set X. 

#### Precise Definition of Integrity
![[Pasted image 20240926035327.png]]

#### Precise Definition of Availability
![[Pasted image 20240926035352.png]]
- If a book selling server takes 1 hour to service a request to purchase a book, that may meet the client's requirements for "availability"
- if a server of medical information takes 1 hour to service a request for information regarding an allergy to an anaesthetic, that will not meet an emergency room's requirements for "availability"


#### Security Policy - Formal Definition 
![[Pasted image 20240926040359.png]]
- this finite-state machine that consists of 4 states and 5 transitions
- the security policy partitions the states into a set of authorized states A = { s1, s2 } and a set of unauthorized states U = { s3, s4}
- the system is not secure because regardless of which authorized state it starts in, it can enter an unauthorized state.
- But if the edge from s1 to s3 was not present, the system would be secure, because it could not enter an unauthorized state from an authorized one. 
- with respect to confidentiality, a security policy identifies those states in which information leaks to those not authorized to receive it. 
- This includes not only the leakage of rights, but also the illicite transmission of information without leakage of rights. 
- **Integrity**:
	• A security policy defines authorized methods for altering information and who is allowed to make changes. 
	• **Authorization** can be based on different relationships, such as the **separation of duties** principle, which prevents one entity from completing a transaction alone.
	• An **integrity policy** specifies the conditions under which data can be altered.
- **Availability**:
	• A security policy outlines the services that must be provided and any parameters for accessibility.
	• Example: A browser may allow downloading web pages but restrict Java applets.
	• It may also define **quality of service** requirements, such as ensuring a server provides authentication within a specific time frame (e.g., within 1 minute).


### Policy Model
- Policy Model is an abstract description of a policy of class of policies
- focus on points of interest in policies
	- Security leave in multilevel security models (Bell-LaPadula Model)
	- Separation of duty in Clark-Wilson model
	- Conflict of interest in Chinese Wall model 
	- Types of Security Policies
		- Military (governmental) security  policy - protects confidentiality, privacy issues
		- Commercial security policy - protects integrity
		- Confidentiality policy - protects confidentiality 
		- integrity policy - protect integrity 

#### Confidentiality Policies 

This framework helps to enforce which subjects can access which objects, ensuring that sensitive information is only accessible by those with the appropriate clearance and need to know.

• **Goal**: To prevent unauthorized disclosure of information.
• Focuses on **information flow**.
• **Integrity** and **availability** are secondary objectives.
• **Multi-level security models** are commonly used to implement confidentiality.
• **Bell-LaPadula Model** is a foundational model for many security systems focusing on confidentiality.

**Clearances and Security Levels:**
	• A **security policy** dedicated to **confidentiality**.
	• **Clearance levels** represent the sensitivity of information:
	• The higher the security clearance, the more sensitive the information and the stronger the need to maintain confidentiality.

• **Subjects** have security clearances, while **objects** (data or resources) have security classifications.

  

**Categories:**

  

• **Categories** can be added to security clearances to represent different types of information.

• An object can belong to multiple categories.

• The categories form a hierarchical structure (a lattice).

  
**Definition:**
The Security level (L,C) dominates the security level (L',C') ((L,C) dom(L',C')) if and only if L'≤ L and C' ⊆ C

#### Integrity Policies 
• Integrity policies focus on the **accuracy** and correctness of data rather than confidentiality.

• These policies are commonly used in **banks**, **commercial**, and **industrial environments**.

• The system starts in a **consistent state**, defined by specific rules or specifications.

• The policy involves performing a series of **actions** or **transactions**:

• Actions cannot be interrupted.

• If actions are completed, the system remains in a consistent state.

• If actions are not completed, the system reverts to the beginning (consistent state).

• Examples include:

• **Biba Integrity Model**: Prevents data corruption by controlling access based on integrity levels.

• **Clark-Wilson Integrity Model**: Focuses on ensuring data integrity through well-formed transactions and separation of duties.


#### Hybrid Policies
- Most organizations use a composition of condidentiallutya dn itegrity policies
- Hybrid policies address specific environments
- Deals with both Confidentiality and Integrity 

#### Access Control
- Constraints what a user can do directly and what users are allowed to do
- Goals
	- Prevent activity that could lead to breach of security 
	- Protect against accidental/malicious threat by regulating that reading, writing, and execution of data and programs
- Access control relies on/coexists with other security services
	- User identification & authentication
	- protection of the stores access rights 

#### Access Control Mechanisms and Principles
- A configuration of the system physical state described what the subjects can do, not necessarily what they are allowed to do
- A security policy partitions the set of all possible states into authorized versus unauthorized states.
- The access control mechanisms of a system enforce the system's security policies by ensuring that the physical states of the system correspond to authorized states of abstract model.
- Protection is oftern enforced by a program called Reference Monitor, which records which subject may do what. It is called by the underlying OS each time an object in invoked.
 ![[Pasted image 20240929021640.png]]

- Reference monitor: consults the access rights/authorization database to check if the user is authorized for the requested operation

Example
![[Pasted image 20240929022156.png]]
- The system first authenticates a user seeking access
- The access control function determines if the specific requested access by the user is permitted 
- A security administrator maintained an authorization database
- The access control function consults this database to determine whether to grant access
- An auditing function monitors and keeps track of the user accesses to the system's resources 


#### Type of Access Control 
- Role-Based Access Control (RBAC)
	- Based on roles that users have within the system and rules stating what accesses are allowed to suers in given roles
- Mandatory Access Control (MAC)
	- System mechanism controls access to object, and individual cannot alter that access 
- Discretionary Access Control (DAC)
	- Individual user sets access control mechanism to allow or deny access to an object 
- Originator Controlled Access Control (ORCON)
	- Originator (creator) of information controls who can access information (owner does not)
---
#### Role Based Access Control (RBAC)
- Method of regulation access to computer or network resources based on the roles of individual
- Access: ability of a user to perform a specific task such as view, create, or modify a file
	- RBAC system assigns access rights to roles
	- Users are assigned to different roles
 - The relationship of users to roles in many-to-many 
 - The relationship of roles to resources or system objects is also many-to-many
![[Pasted image 20240929024513.png]]


#### Discretionary Access Control (DAC)
- User-oriented security policy (based on ID of the requestor)
- Discretionary because an entity has the rights to enable another entity to access a resource
- General approach as used in OSs and database management systems: use of access matrix
	- Lists subjects is one dimension(rows)
	- list objects in the other dimension(columns)
	- Each matrix entry specifies access rights of the specified subject to that object

##### Access Matrix Elements:
- Object: anything on which a subject can perform operations (this is mediated by access rights)
	- passive objects include file, directory, memory segment
	- objects with operations kill, suspend, resume
- Right: specifies what kind of access a subject can perform on an object like own, read, write, execute, create
![[Pasted image 20240929025737.png]]


#### Access Control List

![[Pasted image 20240929030044.png]]
^
- Access rights are stored with objects
- ACL may contain default (public) entries 
	- if users not explicitly listed in ACL - default rights are assigned (e.g. read only)
	- elements of ACL include individual users and group of users
- ACLs are convenient when you wish to determine which subjects have which access rights to a particular resource 
	- UNIX and Windows use ACLs to protect files/processes 
ACL requires subject to be authenticated before access to a particular object 

---
#### Capability List (Capabilities)
![[Pasted image 20240929034018.png]]

- Access rights are stored with subjects 
- Capability ticket: specifies the authorized objects and operations for a particular subject
- Easy to determine the set of access right for a given user 
	- More difficult to determine the list of users with specific access rights for a specific resource 
- Each user may have many capability tickets 
	- User may be authorized to give them to others 
	- Tickets may be dispersed around the system, leading to a major security problem 

![[Pasted image 20240929195247.png]]

- A solution consists of implementing capabilities using cryptographic checksums. Each capability has a cryptographic checksum associated with it. which is enciphered using a key known to the OS

| ACL                                                          | Capabilities                                                                      |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| - Access rights are stored with object                       | - Access rights are stored with subjects                                          |
| - Requires authentication of subject                         | Requires unforgettability of capabilities and propagation control of capabilities |
| - Provides access review on a per-object basis               | - Provides revocation facilities on a per-subject basis                           |
| - Most OSs such as UNIX and Windows use ACL to protect files | - Used in authentication systems such as Kerberos                                 |
|                                                              |                                                                                   |

#### Authorization Table
- Data structure that is not sparse (like access matrix), but more convenient than ACL and Capabilities 
	- Sort by Subject
	- Sort by Object
- Commonly used in relational database management systems 

---
#### Mandatory Access Control (MAC)
- MAC attaches security labels to subjects and objects 
	- Security label to subject -> security clearance
	- Security label to object -> security classification 
- System controls the access to resource by comparing their security labels (e.g. high, low, top secret, etc.) with security clearances of subject accessing the resources
- Users have no control of security labels (as in DAC)
	- Note that cleared entity cannot pass on access rights to another entity (as is the case in DAC)
- Example: Bell-Lapadula Model
![[Pasted image 20240929200726.png]]
- Based on the read down and write up principles, and no read-up and no write down properties: 
	- Simple security property: a subject at a given security level may not read an object at a higher security level (no read-up)
		- Subject s can read object o iff L(o) < L(s) and s has permission to read o
		- Information can flow from L(O) to L(S)
	- Star-property: a subject at a given security level must not write to any object at a lower security level (no write-down)
		- Subject s can write object o iff L(s)<= L(o) and s has permission to write o
		- Information can flow from L(S) to L(O)
![[Pasted image 20240929201118.png]]

THEOREM: If a system is initially in a secure state, and every transition of the system satisfies the simple security property and the *-property, then every state of the system is secure 


#### Clark-Wilson Integrity Model (CWIM)

##### Purpose
Focuses on maintaining the integrity of data by enforcing well-formed transactions and separation of duties.

##### Key Components
1. **Constrained Data Items (CDI)**: Data that needs protection.
2. **Unconstrained Data Items (UDI)**: Data that does not need protection.
3. **Integrity Verification Procedures (IVP)**: Procedures that validate the integrity of CDIs.
4. **Transformation Procedures (TP)**: Procedures that manipulate CDIs.

##### Rules
1. Only authorized TPs can modify CDIs.
2. IVPs ensure CDIs are in a valid state.
3. Separation of duties ensures that no single individual has control over an entire process to prevent fraud.

---

#### Chinese Wall Model (CWM)

##### Purpose
Prevents conflicts of interest by restricting access to certain information once a user has accessed conflicting sensitive data.

##### Key Features
1. **Conflict of Interest (COI) classes**: Groups of companies or datasets that are in conflict with one another.
2. **Reading Rules**: A user can read any data, but once they access a company’s data, they cannot access conflicting companies’ data within the same COI class.
3. **Writing Rules**: A user can only write to a dataset if they have not read data from conflicting datasets.


