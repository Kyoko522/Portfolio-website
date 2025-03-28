### User Interface Engineering 

#### Overview of this topic 
- Despite a lot of advantages in recent years, still quite a few of today's systems are not well designed from a human-interaction standpoint, so it plays off to look at this issue more closely 
- Introduction: different types of systems (or why, what, and how)
- Some theories
- Guidelines and principles (rather general)
- More details and a few examples

#### User interface? its always needed 
- users have to interact with your application and hardware in general, yet the requirements differ for different applications 
- Life-critical systems: air traffic control, nuclear reactors, power utilities, police &fire dispatch systems
	- Reliability and effectiveness are expected, user satisfaction is less of an issue 
	- Lengthy training periods, followed by frequent practice, in order to ensure error-free performance 
- Industrial and commercial uses: banking, insurance, order entry, inventory management, reservation, billing, and point-of-scales systems.
	- Training is expensive, learning must be easy, speed is hte supremem concern followed by low error rates 
	- Subject satisfaction important to limit operator burnout
- Office, home, and entertainment applications: word processing, electronic mail, computer conferencing, and video game systems
	- A wide range of both novice and expert users
	- Competitions causes the need for low cost 
	- Intuitive, easy to use interface is extremely important
- Exploratory, creative, and, cooperative systems: database, artist toolkits, statistical packages, scientific modeling systems 
	- Benchmarks are hard to describe due to the wide array of tasks
	- With these applications, the computer should "vanish" so that the user can be absorbed in their task domain 

### Steps for User-interface Engineering 
- Task analysis to ensure proper functionality (similar to the requirements engineering in your standard lifecycle - only we assume that functionality is known, and focus on how to access it)
- Followed by the usual focus on 
	- Reliability, Availability, Security, and Data Integrity
	- Standardization, Integration, Consistency, and Portability 
	- (all non-functional requirements, mind you)
- And also, pay attention to schedules and Budgets - because being late means that you are likely to be ineffective or even noncompetitive 
- Notice that similarities as well as differences with respect to our usual development lifecycle
![[Pasted image 20240326123641.png]]

#### Task Analysis - ensure proper functionality
 - Defined what tasks and subtasks must be carried out
 - Pay special attention to those tasks which are only performed oxxasionally (common tasks are easy to define)
 - Functionality must be complete, otherwise user will reject or underutilize the product

#### Desirable properties 
- Commands must function as specified 
- Data displayed must reflect the actual state in the database 
- Appease the user's sense of mistrust 
- Appease the user's sense of mistrust 
- System must be error free
- Ensure the user's privacy by preventing unwarranted access, destruction of data, and, malicious tampering 

#### System-User Interface Design Goals
- Define the target user community associated with the interface (communities evolve and change)
- Human factors central to community evaluation 
	- Time to learn
	- Speed of performance
	- Rate of errors by users 
	- Retention over time 
	- Subjective satisfaction

#### Physical abilities and Physical workplace
- No "average user" exists; systems must either compromise or offer multiple versions for different needs.
- Some trade-offs may be necessary for broad usability.
- Implementing tools like macros and shortcuts can reduce the effort required for some tasks.
- Merely considering physical dimensions isn't sufficient; systems should also cater to dynamic human abilities like reach, strength, and speed.
- Systems must accommodate a variety of sense perceptions within the user population.
- Thorough testing of design options should be done, utilizing diverse mock-ups to ensure accessibility and usability across a wide spectrum of physical abilities and workplaces.

#### Cognitive and perceptual abilities
- Cognitive process
- short-term memory
- long-term memory and learning
- problem solving
- decision making 
- attention and set (scope of concern)
- search and scanning
- time 
![[Pasted image 20240404100909.png]]

#### User differences
- Personality differences- several personality tests exists, for example 
- Myers-Briggs Type Inventory (MBTI) which has foru traits
	- extroversion versus introversion
	- sensing versus intuition
	- perceptive versus judging 
	- feeling versus thinking
- Eysenck personality Questionnaire, which has only three:
	- Degree of extroversion
	- Degree of neuroticism
	- Degree of psychotics (something like ... hard-headedness)

#### Other factors also play a role
- education
- cultural and international diversity 
- user with disabilities 
- Age, esp. when it come to elderly users
![[Pasted image 20240404101347.png]]

#### Levels (after Foley and van Dam)
- Four levels
	- Conceptual level: user's mental model
	- Semantic level: meaning conveyed by the user's input and computer's output
	- Syntactic level: how the semantic units form complete sentences and instructions
	- Lexical level: Device dependencies and mechanisms by which a user specifics the syntax
- This approach is convenient for designers
	- Top-down nature is easy to explain 
	- Matches the software architecture 
	- Allows for useful modularity during design


### Usability
Usability is a measure of the effectiveness, efficiency and satisfaction with which specified users can achieve specified goals in a particular goals in a particular environment

#### Affordances
Allows people to know what to do just by looking

#### Constraints
Properties of an object that limit the way it can be used

#### Conventions 
- Conventions typically start as good ideas proposed by someone, which, over time, become standard practice.
- Examples include publishing conventions like page numbers and tables of contents, as well as software engineering conventions such as GUI widgets.
- Sometimes, brand names become so entrenched that they replace generic terms for items, as with Kleenex for tissues or FedEx for courier delivery services. This phenomenon also extends to different languages and cultures.
- Conventions gain widespread acceptance because they generally make tasks or operations simpler and more intuitive for those who are familiar with them.
- If conventions are ignored, it can result in a less intuitive and more cumbersome user experience.

#### Mapping 
- **Mapping** refers to the correlation between a control and its effects; essentially how user actions on controls translate into changes in the system or environment.
- **Natural Mapping** leverages physical analogies and cultural standards to facilitate an intuitive connection between controls and their effects.
- The slide uses the car steering wheel as an example of natural mapping. Despite attempts to innovate or replace it, the steering wheel endures because of its intuitive design; people naturally understand how turning the wheel steers the car.

#### Feedback
- Feedback is the immediate information given to users about the results of their actions.
- Examples include the tone from pressing a phone keypad, the click sound and flashing light of a car's turn signal, and the 'connecting to...' message in a web browser.
- Effective feedback should be clear, unambiguous, and attention-grabbing, whether through visual or auditory signals, ensuring users understand the outcome of their interactions with the system
#### Visibility
- Design should ensure that controls are visible and easily identifiable by users.
- Users should be able to understand the state of the system and the available actions at a glance, like knowing a car's turning light isn't working.
- There's a common trend where the principle of visibility is compromised in favor of aesthetic appeal, which can detract from usability.
#### Design principles
![[Pasted image 20240404103546.png]]

#### Conceptual models
- conceptual models are the same systems or objects are understood by people, based on 
	- affordances
	- constraints
	- (natural) mapping 
	- visibility
	- feedback

#### Relationship between designer and user
![[Pasted image 20240404115021.png]]

#### Action models: seven stage of human action

| Goal       | forming the goal                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Execution  | forming the intention <br>specifying an action<br>executing the action                              |
| Evaluation | Perceiving the state of the world <br>interpreting the state of the world<br>evaluating the outcome |

#### Stages of human action as a design guide

| Stage of action                     | Design Questions <br>How easily can the user ...                  |
| ----------------------------------- | ----------------------------------------------------------------- |
| forming the goal                    | ...determine the function of the product or system?               |
| forming the intention               | ...tell what actions are possible                                 |
| Specifying an action                | ...determine mapping from intention to action?                    |
| execution gthe action               | ...perform the action                                             |
| perceiving hte state of the world   | ...tell the state in which the system is                          |
| interpreting the state of the world | ...determine the mapping from system staet to interpretation      |
| evaluating the outcome              | ...tell weather the system has actually reached the desired state |

#### Gulfs (or gaps) of execution and evaluation
- Gulf of execution: distance between user's goals and the mean of achieving them through the system
- Gulf of evaluation: the amount of effort required to determine the system state
- The wider the gulf(s), the wider the distance between designers and users, and the greater the difficulty of using the system or product
![[Pasted image 20240404120117.png]]


#### Four points where user failure can occur
- users can form an inadequate goal 
- users might not find correct interface object because of an incomprehensible label or icon
- User may not know how to specify or execute a desire action 
- User may receive inappropriate or misleading feedback

#### Four principles of good design
- state of the system and the action alternative should be clearly visible
- the system should have a good conceptional model with a consistent system image
- Interface should include good mapping that reveal the relationships between stage
- User should receive continuous and informative feedback

#### Consistent user interface goals
- Achieving a consistent UI is complex, as it may involve various levels and aspects that could sometimes conflict.
- Inconsistent use of action verbs or commands in the UI can result in a steeper learning curve, increase the likelihood of user errors, slow down user interaction, and make the interface harder to remember.
- Despite these issues, there might be situations where inconsistency in the UI could be beneficial, but caution is advised when deciding to deviate from consistency

#### First Principle: Recognize the Diversity
- Usage profile
- User characteristic(typical as well as atypical users)
- Task profiles
	- Decomposition into multiple middle-level task actions, which are redefined into atomic actions
	- Task frequencies of use
	- Matrix of user and task helpful

#### Interaction style
- Direct manipulation (of object)
- Menu selection
- Form fill-in
- Command language
- Natural Language (desirable ... but so fare not very successful)

#### Second Principle: Follow the Rules of Interface Design
- Strive for consistency (most frequently violated rule)
- Enable frequent users to use shortcuts 
- Offer informative feedback
- Design dialogs to yield closure
- Offer error prevention and simple error handling
- Permit easy reversal of actions
- Support internal locus of control
- Reduce short-term memory load


#### Data Display Guidelines
- Goals:
	- Efficient information assimilation by the user
	- Minimal memory load on user
	- Compatibility of data display with data entry
	- Flexibility for user control of data display
- Organizing the display
- Consistency of data display
- Getting the user's attention 

#### Data Entry Guidelines
- Consistency of data-entry transactions
- Minimal input actions by user
- Minimal memory load on user
- Compatibility of data entry with data display
- Flexibility for user control of data entry

#### Balance of Automation and Human Control
- Ultimate goal: eliminate human actions whenever no judgment is required
- real world is open system, which computers constitute close system
- human judgement necessary for unpredictable events
	- equipment failure
	- improper human performance
	- incomplete or erroneous data

