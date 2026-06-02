#### What is Computer Security?
- is the protection of the items you value, called assets of a computer or a computer system.
	- there are many types of assets, involving hardware, software ,data, people, processes, or combinations of these. 
- A computer device (including hardware, added components, and accessories) in certainly an assets because most computer hardware is pretty useless without programs, the software is also a asset
	- Software assets: Operating system (OS), utilities, devices...
	- Hardware assets: Computer Components, routers, switches...
- To Determine what to protect, you must identify what has value and to whom
	- E.g.: Photos, email messages, contact information, code you created, etc.
- After identifying the asset that you like to protect, you must determine their values

![[Pasted image 20240904214029.png]]

#### Values of Assets
- We often make value base on decisions
	- E.g.: “when you go for a swim you can leave a bottle of water and a towel on the beach, but not your wallet or cell phone. The difference relates to the value of the assets.”
- **The value of an assets depend on the assets owner's or user's perception, and it may be independent of monetary cost and the cost and time to replace the asset**
- An Asset value depends on the perception of its importance with respect to the targeted security goals
![[Pasted image 20240904215124.png]]

#### Goals of Computer Security
 - <span style="color:rgb(255, 0, 0)">Protect valuable assets</span>
 - To study different ways of protection, a security framework should be used - ==which describes how the assets may be harmed and how to counter the harm==.
 - The framework consists of a triple, namely: 
	 - Vulnerability 
	 - Threats 
	 - Controls

#### Vulnerability/ Threat 
- <span style="color:rgb(255, 0, 0)">Vulnerability</span>: Weakness that could be exploited to cause harm to a system
	- In procedures, design, or implementation, that might be exploited to cause loss or harm. For instance, a particular system may be vulnerable to unauthorized data manipulation because the system does not verify a user’s identity before allowing data access
- <span style="color:rgb(255, 0, 0)">Threat</span>: to a computer system is a set of circumstances that has the potential to cause loss or harm

- The difference 
![[Pasted image 20240904215748.png]]
```Example 
Here, a wall is holding water back. The water to the left of the wall is a threat to the man on the right of the wall: The water could rise, overflowing onto the man, or it could stay beneath the height of the wall, causing the wall to collapse. So the threat of harm is the potential for the man to get wet, get hurt, or be drowned. For now, the wall is intact, so the threat to the man is unrealized.

So in this case the Threat is the water that can harm the human and the vulnerability is the crack in the wall since if the water rise or pass beyond the crack the water could or will harm the human
```

- **A <span style="color:rgb(255, 0, 0)">threat</span> is a set of circumstances that could cause harm** 

#### Detecting Potential Harm to An Asset
Two perspectives: 
1. What are the bad things that can happen to an asset?
2. Who/What can cause/allow those bad things to occur?


read page 32 and down (Slide cover most of it but you should read it if you get time)

#### Types of Threats
- ==Threats can be categorized according to whether they are human-caused, malicious, or directed==
![[Pasted image 20240904221527.png]]

- Threats can be malicious/malicious
	- Malicious ones cause harm
		- most computer security attacks are related to this category
	- Non-Malicious are ones purposely introduced for testing purpose by the team of security experts
- Direct attacks (vs. random one): a specific computer is the target of the attack
- Advance Persistent Threat (APT): this originates from organized/well financed/patient attackers. 
	- Analogous to an organized well-prepared crime group that launches an attack on a blank
![[Pasted image 20240904222726.png]]
- Each of these attackers type has a different set of resources, capabilities, and motives
- Understanding the different types help in considering the threats
- No one pattern matches all attackers

#### Method-Opportunity-Motive (MOM)
- Understanding MOM can be a good way to think about potential threats
- Reducing any of those dimensions (i.e. M, O, or M) can lower the risk to the system. 


#### Risk Management
- The value of an asset may change over time => the degree of harm can change as well 
- It is virtually impossible to overcome all kind of harms since threats are unpredictable and the system resource are limited
- To protect against a threat, you should weight the seriousness of it vs. the ability to protect it using the so-called risk management process 
	- This involves selecting which threat to controla nd what resouirce to be allocated to its protection 
- Risks that could cannot be addressed by controls are called residual risks
- Formal models of risk management has been developed in the literature. 
- Basic Model: the user must define ways to: 
	- Calculate the asset value
	- Estimate the amount of harm from all possible threats to the assets 
	- Compute the cost of protection 
	- Compute the cost of selecting the controls based on the degree of risk 
	- Apply the controls to overcome each harm
#### Attacks and Controls 
- A human or system who exploits a vunerability perpetrates an atttack on the system
- An attack can be launched in cascade (for instance, using a connection chain of zombies).
- To address an attack, a control (countermeasure, method) is used as a protection method.
- Control: way to block a threat which tries to exploit one or more vulnerabilites. 
- Different controls are meant to address different threats. 

#### Controls With Today's Computers
- 3 Dimensions by which a control can be categorized
- Thinking about control in this way enables you tyo easily map the ocntorls againes ythe threats that they can help to address. 
- Approaches to design a control: 
	- Encryption
	- Software/Program controls
	- Hardware control 
	- Policies and procedures
	- Physical controls

#### Encryption
- This is a primary control
- Cleartext is scrambled into Ciphertext (also called encipeher text)
- Protecting (C-I-A):
	- Confidentiality (C) - by "masking" the data
	- Integrity (I) - by preventing data updates
	- Availability (A) - by using encryption-based protocols

#### Software/Program Controls
- Operating system & Networking Controls:
	- OS
- Independent Control Program
- Internal Program Control:
- Development Controls:

#### Hardware Controls
Hardware devices can be used to provide higher degree of security: \
- Locks 
- Cables
- Smart cards
- Hardware keys
- Etc. 


#### Policies & Procedures 
- Policy: What is/What is not allowed?
- Procedure: How you enforce the policy
- How to achieve this?
	- Tell people how to act. E.g. laws, regulation
	- Guidelines, Patents, Copyright, Agreements, Contracts, Security policies

#### Physical Controls
- Stop or block an attacker bt using something tagible:
	- wall, fences, locks, human guard, security cameras, backup copies and archives

#### Controls in Today's Networks
- This network system shows all possible touch points where controls can be placed
- Difference types of controls are indicated: deterrence, deflection, prevention, preemption, mitigation, combination of controls, ...
- Prevention: Block the attack/Close the vulnerability
- Deterrence: Make attack harder (but not impossible!)
- Deflection: Make another target more attractive than the current target 
- Detection: Detect the attack during its execution or after it is over
- Recovering: Recover from the effects of an attack
- Mitigation: Making the attack impact less severs
- Preemption: Making the attacker scared away

#### C-I-A Triad
- Confidentiality: ability to ensure that asset is viewed/accessed only by authorized parties
- Integrity: ability to ensure that an asset is modified only by authorized parties
- Availability: ability of a system to ensure that an asset can be used by any authorized parties
- Because networking securoty is also a concern, 3 other characteristics have been added:
	- Authentication: ability of a system to confirm the identity of a sender
	- Non-repudiation (accountability): ability of a system to confirm that a sender cannot convincingly deny having sent something
	- Audibility: ability of a system to trace all actions related to a give asset
C-I-A interpreted from a risk management perspective: 
- Interception: an unauthorized party gains access to an asset.
- Modification/fabrication: an unauthorized party changes the state of an asset
- Repudiation of origin: False denial that an entity did (send/create) something.
- `C` Property may fail if someone intercepts the data
- `I` Property may fail if something/something modifies data or fabricates false data
- `A` Property is not satisfied if someone/something interrupts a flow of data or access to a computer.
- Properties that overlap with Availabilty (A) are shown
![[Pasted image 20240905205936.png]]


#### Refining the C Property
C property: only authorized people/systems can access the protected data
- But nothing is mentioned about data sensitivity since it is not obvious to characterized this
	- who determines these authorized entities and who owns the data?
	- By "accessing" data, do we mean as a single bit or as a whole collection?
	- Can authorized entities disclose the data to other parties?
- Despite the need for raising these questions, confidentiality property is best understood (of all) as it relates mostly to data

How to check if data confidentiality property has failed?
- An unauthorized to access certain data uses this benefit to access other non authorized data
- A subject authorized to access certain data uses this benefits to access other non authroized data 
- An unauthorized subject accesses an approximate data value (e.g. not knowing someone's exact salary, but knowing that the salary falls in a particular range or exceeds a particular amount)
- An unauthorized subject learns the existence of a piece of data (e.g. knowing that a company is developing a new product, or some talks are underway about possible merging with another company).
Basic access control terms 


#### Refining the I Property
Integrity: ability to ensure that an asset is modified only by the authorized parties
- fails can be found by: 
	- receiving a misaddressed email because its originator mistypes the intended recipient. hence propagating sensitive data to incorrect mailing lists.
	- misusing the entry of cell in a spreadsheet when computing a sensitive value, making its content become a text rather than the intended numeric value.
- Preserving means that 
	- precise/accurate/unmodified
	- modified only in acceptable ways/modified only by authorized people
	- modified only by authorized processes 
	- consistent/meaningful and usable

#### Refining the A Property
Availability: ability of a system to ensure that an asset can be used by any authorized parties
- a data or service is said to be available if either of the following is TRUE: 
	- It is accessible in a usable form
	- it has enough capacity to meet the service's needs
	- the service is completed in an acceptable period of time 
	- it is making clear progress, and, if in a waiting mode, there is a limit on its waiting time
	- the service/system can be used easily and in the way it was intended to be used

#### Redefining the Computer Security Goal
Computer Security is meant to: 
- prevent nauthorized viewing (C)
- prevent modification of data (I)
- preserve access (A)


#### Types of Attacks on Data CIA
- Disclosure: Attack on data confidentiality
- Unauthorized modification/Deception: e.g . providing wrong data (attack on data integrity)
- Disruption: Denial of service (DoS) (attack on data confidentiality, integrity or availability)
- Usurpation: Unauthorized use of services (attack on data confidentiality, integrity or availability)
- The cost and effectiveness of controls must be balanced with the likelihood and severity of attack

#### Principles of Computer Security 
Principle of Easiest Penetration
- An intruder must be expected to use any available means of penetration 
- The penetration may not necessarily be by the most obvious means, nor is it necessarily the one against which the most solid defense has been installed. 
Principle of Adequate Protection
- Computer items must be protected to a degree consistent with their values and only until they lose their values. 
Principle of Effectiveness 
- Controls must be used and used properly to be effective
- They must be efficient, easy to use, and appropriate
Principle of Weakest Link
- Security can be no stronger than its weakest link
- Whether it is the power supply that powers the firewall or the operating system under the security application or human, who plans, implements, and administers controls, a failure of any control can lead to a security failure.  
