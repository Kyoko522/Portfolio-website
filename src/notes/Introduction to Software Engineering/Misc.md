### Software Development Lifecycle and Some Common SDLC Models

#### Software Development Life Cycle
- The process whereby a system is developed is referred to as the software development lifecycle (SDLC)

#### Software Life Cycle
- a series of steps or phases that organized the initiation through retirement of  a software product
	- Phases may or may not have a one-to-one correspodence to tasks
	- Duration can be from days to years, depending on the scope of the project
- A SDLC consists of 
	- overall process 
	- stages of the process
	- intermediate products 
	- "Best Practices" applied and followed thought the process
	- People

#### SDLC Models

##### Code-and-fix Model
![[Pasted image 20240404155332.png]]
- start with a empty program, code and debug until it works
- works for small programs
- useful for "Hacking" single-use/personal-use programs
- Problems become present in any serious project


##### Code-Like-Hell Model
- Focuses on software development and pays little or no attention to planning and design
- difficult to ordinate with non-coding groups (testing, marketing, etc.)
- High rate of burnout
- may not be able to extent the system
- probably won't be able to repeat the process

##### Waterfall Model 
![[Pasted image 20240404160036.png]]
- Main Characteristics
	- Fixed sequence and strict separation of steps
	- well defined deliverables (documentation, mostly) and termination criteria for each phase
	- no turning back the clock - once a phase is done, it is done
- Measurable progress to sooth the fears of upper management (at least in terms of documentation produced)
- Experience applying steps in past projects can be used in estimating duration of similar steps in the future projects
- The waterfall model may work well in an environment that is well understood and stable
- Lot of paper up front, little results invisible until very late in the development cycle
- problems not found until the implementing phase
- change become very costly near the end phases
- problems that require backing up one or tow phases can be very costly
- waterfall is not suitable for unstable environment, first expeience in a new application domain, and/or the use of new technologies
- Project planning and scheduling are difficult because hte pieces do not come together until the very end of the project - there are no intermediate milestone at which the system (as opposed to the project) can be evaluate

##### Waterfall Model with Feedback
![[Pasted image 20240404161127.png]]


##### Incremental Model
![[Pasted image 20240404161154.png]]
- each iteration is a scaled-down waterfall
- iterations driven by features, classified according to feature sets



##### Spiral Model
- similar to Incremental Model
- each iteration is driven by risk management, rather than plain requirements gathering
- Typically, the most risky or most important portions of the system are identified and then implemented first
![[Pasted image 20240404162720.png]]
- users see a working system right of the beginning
- there are frequent checkpoints at which the status of the project is evaluated
- the use of the spirla model does not reduce the amount of effort that goes into analysis and design, it just redistributes the effort throughout the development lifecycle


Overall Summary for stuff above 
- Life cycle approach makes software development
	- predictable
	- repeatable
	- measurable
	- efficient
	- improvable
- High-quality process should lead to high-quality products
--- 
### On Microservices

#### Data flow decomposition 
- Technique to decompose the system in a top-down fashion, resulting gin a hierarchical structure of functions

#### Data flow diagram decoposition
- A process may be decomposed ("exploded") into another data flow diagram
- the process end when the data transformation within a process cannot be thought of as a continuous transformation, but can be described with a flowchart/ pseudocode / ...(substitute any sequential specification)

Advantages: 
- Provide an intuitive model of a proposed system's high-level functionality and of the data dependencies among various processes 
- can be easily transformed into a function-oriented design (slightly harder but nonetheless possible to transform into an object-oriented design)

Disadvantage
- Can be ambiguous and discouraging to a software developer who is less familiar with the problem being modelled
- Suitable for a certain type of problems but not very suitable for other (e.g., interactive program)

#### Service-based software systems:
- "Software as a service" business model
	- Software is not a product any more, but a service available over the network
	- Application Service Providers (ASPs): first step
- Service-Oriented Architecture (SOA)
	- Applications decomposed into distributed services 
	- On-line access to libraries of composable components 
	- CORBA, JINI, Component Service Provider (CSPs) ... then SOA/SOC, Cloud Computing, ... 
#### Definitions of a Web service
- A software application that: 
	- has a unique Uniform resource Identifier (URL),
	- can be defined, described, and discovered using XML (Extensible Markup Language),
	- supports exchange of XML messages via internet-based protocoles
- A black box programmable application logic that can be ueused without worrying about how the service is implemented
	- Defined strictly in temrs of the messages the Web sercice accpets and generates
	- Simply and easily composed over the network, acroess domain boundaries 
	- Accessible using standard and ubiquitous internet protocols and data formates (XML)

#### The Publish-Find -Bind Interaction Model
![[Pasted image 20240404213154.png]]

**Pets:** When machines/serve s get individual names, apps are statically allocated and manually deployed, and when a machine gets sick, it is nursed back to health while the apps are redeployed elsewhere

**Cattle:** when machines are identical and identified by numbers, apps are dynamically allocated wherever there's capacity and when a machine gets sick, you just replace it with an identical healthy one


#### What is a Microservices
- The microsercie architectural style is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often HTTP resources API. These services are build around business capabilities and independently deployable by fully automated deployment machinery 

![[Pasted image 20240404214024.png]]

![[Pasted image 20240404214035.png]]

#### Authentication Microservices
![[Pasted image 20240404214055.png]]

#### Characteristics of microservices 
- Self-contained: Microservices do not have external dependencies. They managed their own data and implement their own user interface
- Lightweight: Microservices communicate using lightweight protocols, so that service communication overheads are low
- Implementation-individual: Microservices may be implemented using different programming languages and may use different technologies (e.g., different types of database) in their implementation
- Independently deployable: Each microservice runs in its won process and is independently deployable, using automated systems
- Business-oriented: Microservices should implement business capabilities and needs, rather than simple provide a technical service


#### Microservice Communication
- Microservices architecture is based on small, autonomous services that communicate through messages. When a service sends a request, it includes necessary details such as service commands and required data. For instance, an authentication service may send a user's login details to a login service, which then responds with a token if the user is recognized or an error if not.

#### Microservice Characteristic
- A well-designed microservice is characterized by high cohesion and low coupling. High cohesion means that all the functions needed for a service's operation are contained within that service. Low coupling refers to a service's independence from other services, minimizing the interdependencies. Each microservice is responsible for a single aspect of the application, a principle known as the Single Responsibility Principle. This means it focuses on a specific task and executes it effectively, although the term 'one thing only' can be subjective and vary across services.

Stopped my notes for slide show 25

---

### Design by Contract

#### Software Quality Aspects

- **Correctness**: Software performs according to specifications.
- **Robustness**: Software handles abnormal conditions gracefully.
- **Efficiency**: Minimal resource usage for tasks.
- **Usability**: Easy end-user interaction.
- **Functionality**: Broad problem-solving applicability.
- **Timeliness**: Availability of software when needed.
- **Extendibility**: Easy adaptation to changes.
- **Compatibility**: Seamless integration with other systems.
- **Portability**: Easy transfer across different environments.
- **Reusability**: Applicability in various applications.
- **Understandability**: Clarity for programmers.
- **Testability**: Simplified correctness and robustness checks.

#### Trade-offs in Software Qualities

- There are often trade-offs between qualities like timeliness, functionality, efficiency, and portability. Priority is given based on project needs.
![[Pasted image 20240404220759.png]]

#### Defects


