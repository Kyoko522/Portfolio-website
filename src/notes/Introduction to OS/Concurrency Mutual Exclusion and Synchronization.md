### Multiple Process 
- Operating System design is concerned with the management of process and threads 
	- Multiprogramming (running in parallel)
	- Multiprocessing 
	- Distributed Processing

### Concurrency Arise in Three Different Contexts:
- Multiple Applications 
	- Multiprogramming was invented to allow processing time to be dynamically shared among a number of active application
- Structured applications 
	- As an extension of the principles of modular designed and structured programming, some applications can be effectively programmed as a set of concurrent processes  
- Operating system structure
	- The same structuring advantages apply to systems progress, and we have seen that operating systems are themselves often implemented as a set of processes or threads

### Concurrency Key Terms

| Term             | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Atomic operation | A function or action implemented as a sequence of one or more instructions that appears to be indivisible; that is, no other process can see an intermediate state or interrupt the operation. The sequence of instruction is guaranteed to execute as a group, or not execute at all, having no visible effect on system state. Atomicity guarantees isolation from concurrent process<br><br>you can't be interrupted midway it's either you stop it before it runs or after it's completed |
| Critical Section | A section of the code within a process that requires access to shared resources and that must not be executed while another process is in a corresponding section of code                                                                                                                                                                                                                                                                                                                     |
| Deadlock         | A situation in which two or more process are unable to processed because each is waiting for one of the others to do something                                                                                                                                                                                                                                                                                                                                                                |
| Livelock         | A situation in which two or more processes are continuously change their states in response to changes in the other process(es) without doing any useful work                                                                                                                                                                                                                                                                                                                                 |
| Mutual Exclusion | The requirement that when one process is in a critical section that assesses shared resources, no other process may be in a critical section that accesses any of those shared resources.                                                                                                                                                                                                                                                                                                     |
| Race Condition   | A situation in which multiple threads or processes read and write a shared data item and the final result depends on the relative timing of their execution                                                                                                                                                                                                                                                                                                                                   |
| Starvation       | A situation in which a runnable process is overlooked indefinitely by the scheduler; although it is able to proceed, it is never chosen                                                                                                                                                                                                                                                                                                                                                       |
example of a livelock, here both process are stuck in a loop where they have the first thing they need but another process ahs the second thing that they need to they keep letting go of the first and trying again but the same result happens again and again
![[Pasted image 20240418142214.png]]
### Principles of Concurrency
- Interleaving and overlapping 
	- can be viewed as examples of concurrent processing 
	- both present the same problems
- Uniprocessor - the relative speed of execution of processes cannot be predicted
	- depends on activities of other processes
	- the way the OS handles interrupts 
	- scheduling policies of the OS

### Difficulties of Concurrency 
1. **The sharing of global resources** is fraught with peril. For example if two processes both make use of the same global variable and both perform read sand writes on the variable , then the order in which the various reads and writes are execute is critical. An example of this problem is shows in the following subsection,
2. It is **difficult for the os to manage the allocation of resources optimally**. For example, process aA may request use of, and be granted control of, a particular I/O channel and then be suspended before using that channel. It may be undesirable for ht OS simply to lock the channel and prevent its use by other processes; indeed this may lead to a deadlock condition
3. It becomes very **difficult very difficult to locate a programming error because result are typically not deterministic and reproducible**

All of the foregoing difficulties present themselves in a multiprocessor system as well, because here to the relative speed of execution of processes in unpredictable. A multiprocess system must also deal with problem arising from the simultaneous execution of multiple processes. Fundamentally, however, the problems are the same as those for uniprocessor systems. This should become clear as the discussion proceeds


### Race Condition 
A race condition occurs when multiple processes or threads read and write data items so that the final result depends on the order of execution of instructions in the multiple processes. 

In this example, we have two programs, `p1` and `p2`, competing in a race condition:

- **Program p1**: Assigns the variable `x` the value of `1`.
- **Program p2**: Assigns the variable `x` the value of `2`.

Both programs attempt to modify the same variable, `x`, concurrently. The "winner" of this race is the program that executes its assignment last, as the final value of `x` will reflect the last assignment made. This is a classic example of a race condition, where the outcome depends on the sequence of events which are not controlled or predicted.

###### Race Condition Example: Shared Variables in a Database

In this scenario, two processes, `P1` and `P2`, share variables `a` and `b` with the invariant that `a == b` must always be maintained.

##### Processes Operations:
- **P1** performs the following operations:
  - `a = a + 1`
  - `b = b + 1`
- **P2** performs the following operations:
  - `b = 2 * b`
  - `a = 2 * a`

##### Expected Outcomes:
- Starting with `a = b = 1`, if `P1` completes before `P2`:
  - Result: `a == b == 4`
- Starting with `a = b = 1`, if `P2` completes before `P1`:
  - Result: `a == b == 3`

However, if the execution of `P1` and `P2` is interleaved, a race condition occurs:
1. `a = a + 1` (P1): `a` becomes `2`, `b` remains `1`.
2. `b = 2 * b` (P2): `b` becomes `2`.
3. `b = b + 1` (P1): `b` becomes `3`.
4. `a = 2 * a` (P2): `a` becomes `4`.

Resulting in `a = 4`, `b = 3`, violating the invariant `a == b`.

##### Solution:
To address this, a locking mechanism can be implemented:
- **Lock the variables**: When one process modifies a variable, lock it to prevent the other process from accessing it until the first process releases the lock.
- This ensures that the operations on `a` and `b` by `P1` and `P2` do not interleave in a way that violates the invariant.

This strategy of locking helps maintain data consistency and prevent race conditions in concurrent programming environments.

### Operating System Concerns
1. The OS must be able to keep track of the various process
2. The OS must allocate and de-allocate various resources for each active process
	- Processor time: this is the scheduling function, discussed in Part Four
	- Memory: most operating systems use a visual memory scheme. The topic is addressed in Part Three
	- Files; discussed in Chapter 12
	- I/O devices: Discussed in Chapter 11
3. The OS must protect the data and physical resource of each process against instead interference by other processes. this involved techniques that relate to memory, files and I/O devices.
4. The functioning of a process, and the output it produces, must be independent of the speed at which its execution is carried out relative to the speed of other concurrent processes. 

^Didn't cover this in the lecture recording but in short something need to help the program keep track of the data either the OS or some hardware that's all that this slide talks about not very important

Process Interaction

| Degree of Awareness                                                                      | Relationship                 | Influence that One Process Has on the Other                                                                           | Potential Control Problems                                                                             |
| ---------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Processes unaware of each other                                                          | Competition                  | - Results of one process independent of the action of others <br><br>- Timing of the process may be affected          | - Mutual exlusion <br><br>- Deadlock (renewable resource)<br><br>- Starvation                          |
| Processes indirectly aware of each other (e.g., shared object)                           | Cooperation by sharing       | - Results of one process may depend on information obtained from others <br><br>- Timing of process may be affected   | - Mutual exclusion <br><br>- Deadlock (renewable resource)<br><br>- Starvation <br><br>- Data cherence |
| Processes directly aware of each other (have communication primitives available to them) | Cooperation by communication | - Result of one process may depend on information obtained from others <br><br><br>-Timing of process may be affected | -Deadlock (consumable resource)<br><br>-Starvation                                                     |

### Resource Competition 
- Concurrent processes come into conflict with each other when they are **competing for the use of the same resource**. In its pure form, we can describe the situation as follows. Two or more processes need to access a resource during the course of their execution. Each process is unaware of the existence of other processes, and each is to be unaffected by the execution of the other processes. it follows from this that each process should leave the state of any resource that it sued unaffected.
- There is no exchange of information between the competing processes. However, the execution of one process may affect the behaviour of competing processes. In particular, if two processes both wish access to a single resource, then one process will be allocated that resource by the OS, and the other will have to wait. Therefore, the process that is denied assesses will be slowed down. In an extreme case, the blocked process may never get access to the resource and hence will never terminate successfully.
- In the case of competing processing three control problem can take place


	- **Mutual Exclusion** - Only one process at a time should access a critical, non-sharable resource (like a printer or a database). This segment of the program in known as the critical section.
		- It prevents data corruption and ensures that outputs (like printer documents) are not mixed between processes.
	- **DeadLock** - Associated with mutual exclusion, a deadlock occurs when two or more process are waiting and hold a resource that another process might need, creating a cycle of dependencies that prevent any of them from proceeding.
	- **Starvation** - A situation where a process never gains access to a resource it needs because the allocation process is biased towards other processes. 

### Cooperation Among Processes by Sharing
1. Processes interact with other processes without being explicitly aware of them
2. Processes may use and update shared data  without reference to other processes, but know other processes may access the same data
3. Processes must **cooperate** to ensure the **shared data** is properly managed 
4. Control mechanisms must ensure the integrity of the shared data, which are held on resources (devices, memory etc.)
5.  **Need mutual exclusion**. possible deadlock and starvation
	- here, data items may be accessed in two different modes, reading and writing, and only writing operations must be mutually exclusive 


### Cooperating Among Processes By Communication 
- The process participate in a **common effort** 
- Must **synchronize**, or **coordinate**, the various activities 
	- Typically, communication messages of some sort 
	- message send/receive primitives provided by OS kernel or programming language 
- Mutual exclusion is not a control requirement for this sort of cooperation 
- the problems of deadlock and starvation are still present 
![[Pasted image 20240418132722.png]]
- the example on the left show a deadlock where both process are waiting for a message from each other. this message will never happen until one of the process get through the wait stage
- the example to the right is starvation where p1 sent data to either p2 and p3, it is very possible that p1 only choices to send the data to p2 making it so that p3 is never used, causing it to starve

### Requirements for Mutual Exclusion 
1. **Mutual exclusion must be enforced:** Only one process at a time is allowed into its critical section, among all processes that have critical sections for the same resource or shared object 
2. **A process that halts in its noncritical section must do so without interfering with other processes**
3. **It must not be possible for a process requiring access to a critical section to be delayed indefinitely**: no deadlock or starvation
4. **When no process is in a critical section, any process that request entry to its critical section must be permitted to enter without delay**
5. **No assumptions are made about relative process speeds or number of processors**
6. **A process remains inside its critical section for a finite time only**
   

### Mutual Exclusion: Hardware Support (Not used)

| Interrupt Disabling                                                                                                                 | Disadvantages                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| - uniprocessor system<br><br>- disabling interrupts guarantees mutual exclusion <br><br>e.g. can use with assembly or gcc build-ins | - the efficiency of execution could be noticeably degraded<br><br>- this approach will not work in a multiprocessor architecture |
This approach isn't use as removing interrupts make it so that OS is a single processor where only one process can be executed at a time.
#### Special Machine Instructions (Compare and Swap Instruction)
- also called a `compare and exchange instruction`
- a compare is made between memory value and a test value
- if the values are the same a swap occurs  
- carried out atomically (it can't be stopped or interrupted midway)
- How a compare_and_swap function might look like
```c 
compare_and_swap ( word, testval, newval )
	oldval = word
	if ( word == testval ) word == newval
	return oldval
```
- Note that this is one instruction so it can't be stopped mind way
```c 
/*program mutualexclusion */
const int n = /* number of processes */;
int bolt; 
void P (int i)
{
	while (true){
		while (compare_and_swap (bolt, 0, 1) == 1) //when a process comes in it will change the bolt from 0 to 1 closing it for all the other processes until the process that inside is done returning the bolt back to 0 opening it for other processes
			/* do nothing */
		/*critical section*/
		bolt = 0;
		/* remainder */
	}
}

void main()
{
	bolt = 0; //when a process comes in the initial value will be 0
	parbegin (P(1), p(2), ... , P(n));
}
```
Other command that do the same thing 
- exchange (replace the bolt value with another given value) this approach is the same just there is no comparison made, this mean that there has to be another while loop to check if the critical section is already in used by another process 


#### Advantages of a Special Machine Instruction 
- Applicable to any number of processes on either a single processor or multiple processor sharing main memory (can be used in single or multiple processing systems)
- Simple and easy to verify 
- Supports multiple critical sections; each critical section can be defined by its own variable

#### Disadvantage of a Special Machine Instruction 
- Busy waiting is employed, thus while a process is waiting for access to a criitcal section it continues to consume processor time 
- Starvation is possible when a process leaves a critical section and more then one process is waiting 
- deadlock is possible


### Mutual Exclusion Software Approaches 
- Can be implemented for concurrent processes that execute on a single-processor or a multiprocessor machine with sharing main memory 
- At the most basic level, these approaches assume that there is some form of mutual exclusion already in place for memory access. This means that if multiple processes try to read from or write to the same memory location at the same time, their access will be controlled (serialized) by a mechanism (like a memory arbiter), ensuring that only one process can access that memory location at a time. However, the sequence in which processes gain access isn't predetermined.
- The approaches do not assume any additional support from the hardware, the operating system, or specific programming languages to manage mutual exclusion beyond the elementary level of memory access serialization.
- Algorithms include those by Dekker and [[Peterson]]


### Common Concurrency Mechanisms 

| Term                 | Definition                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| semaphore            | An integer value used for signalling among processes. Only three operations may be performed on a semaphore, all of which are atomic: initialize, decrement, and increment, the decrement operation may result in the blocking of a process, and the increment operation may result in the unblocking of a process. Also known as a counting semaphore or a general semaphore                                 |
| Binary Semaphore     | A semaphroe that take on only the values 0 and 1                                                                                                                                                                                                                                                                                                                                                              |
| Mutex                | Similar to a binary semaphore. A key difference between the two is that the process that locks the mutex (sets the value to zero) must be the one to unlock it (sets the value to 1)                                                                                                                                                                                                                          |
| Conditional Variable | A data type that is used to block a process or thread until a particular condition is true                                                                                                                                                                                                                                                                                                                    |
| Monitor              | A programming language construct that encapsulates variables, access procedures and initialization code within an abstract data type. The monitor's variable may only be accessed via its access procedures and only one process may be actively accessing the monitor at any one time. The access procedures are _critical sections_. A monitor may have a queue of processes that are waiting to access it. |
| Event Flag           | A memory word used as a synchronization mechanism. Application code may associate a different event with each bit in a flag. A thread can wait for either a single event or a combination of events by checking one or multiple bits in the corresponding flag. The thread is blocked until all of the required bits are set (AND) or until at least one of the bits is set (OR).                             |
| Mailboxes/Messages   | A means for two processes to exchange information and that may be used for synchronization.                                                                                                                                                                                                                                                                                                                   |
| Spinlocks            | Mutual exclusion mechanism in which a process executes in an infinite loop waiting for the value of a lock variable to indicate availability.                                                                                                                                                                                                                                                                 |


### [[Semaphore]]
- A variable that has an integer value upon which only three operations are defined 
- There is no way to inspect or manipulate semaphores other than these three operations 
	1. A semaphore may be initialized to a nonnegative integer value 
	2. The semWait operation decrements the semaphore value. if the value become negative, then the process executing the semWait is block 
	3. The semSignal operation increments the semaphore value. if the resulting value is less than or equal to zero, then the process blocked by a semWait operation , if any is unblocked. Other than these three operations, there is no way to inspect or manipulate semaphores.
	`seminit` - initialized the variables
	``


### Consequences 
- There is no way to know before a process decrements a semaphore whether it will block or not 
- There is no way to know which process will continue immediately on a uniprocessor system when two processes are running concurrently 
- You don't know whether another process is waiting so the number of blocked processes may be zero or one


### Binary Semaphore 
- Similar to counting/general semaphore except:
	- can only take on values 0 or 1 
	- cannot allow multiple processes into CS at once 
- Same expressive power as counting/general


### Mutex 
- Programming flag used to grab and release an object 
- similar to binary semaphore 
- only process that locked the mutex may unlock it is the only difference between the binary Semaphore an da Mutex 
- pthread functions for mutex: init, lock, unlock, destroy etc.


### Strong and Weak Semaphores 
- A queue is used to hold Processes waiting on the semaphore

#### Strong Semaphores
- process blocked the longest is released from the queue first (FIFO)
- no starvation 

#### Weak Semaphores
- processes removed from queue in no specified order 
- possible starvation 

### Synchronization by a Semaphore
- A semaphore can be initialized to start at 0 so that no process can use the critical section until a specific process intended to run first is complete and sends a signal to unlock the critical section for all process
- You can use multiple semaphore to define the order of which process need to run first and so after that

### Producer/Consumer Problem
General Situation
- one or more producers are generating data and placing these in a buffer 
- a single consumer is taking items out of the buffer one at a time 
- only one producer or consumer may access the buffer at any one time
The problem 
- ensure that the producer can't add data into full buffer and consumer can't remove data from an empty buffer 
^ this is a just a example problem that can be solved in multiple ways don't need to know this example but understand the concepts to solve the problem 
[[Consumer Problem]]


#### Implementation of Semaphores 
- Impearative that the semWait and semSignal operations be implemented as atomic primitives 
- Can be implemented in hardware or firmware
- Software schemes such as Dekker's or Peterson's algorithms can be used 
- Use one of the hardware-support sheme for mutual exclusion

### Synchronization 
+ Achieved by the use of condition variables that are contained within the monitor anc accessible only within the monitor 
+ COndition variables are a special data type which are operated on by two functions
	+ cwait(c) -> suspends ececution of the calling process on conadition c
	+ csignal(c) -> resume execution of some process blocked after a cwait on the same condition 

The communication of a message between two processes implies some level of synchronization between the two: The receiver cannot receive a message until it has been sent by another process. In addition, we need to specify what happens to a process after it issues a send or receive primitive. Consider the send primitive first. When a send primitive is executed in a process, there are two possibilities: Either the sending process is blocked until the message is received, or it is not. Similarly, when a process issues a receive primitive, there are two possibilities:

1. If a message has previously been sent, the message is received and execution continues.

2. If there is no waiting message, then either (a) the process is blocked until a message arrives, or (b) the process continues to execute, abandoning the attempt to receive.

Semaphore also help with synchronization
### Monitor 
- Programming language construct that provides equivalent functionality to that of semaphores and is easier to control 
- Implements in a number of programming languages 
- Has also been implemented as a programming library 
- Software module consisting of one or more procedures, an initialization sequence, and local data 

### The chef characteristics of a monitor
1. The local data variables are accessible only by the monitor's procedures and not by any external procedure 
2. A process enters the monitor by invoking one of its procedures 
3. Only one process may be executing in the monitor at a time any other process that have invoked the monitor are blocked, waiting for the monitor to become available.

### Synchronization with Monitors
- A monitor supports synchronization by the use of condition variable that are contained within the monitor and accessible only within the monitor (like classes in java). Condition variable are a special data type in monitors, which are operated on by two function
	- `cwait(c)` - suspend execution of the calling process on condition c. the monitor is now available for use by another process
	- `csignal(c)` resume execution of some process blocked after a `cwait` on the same condition. if there are several such processes, choose one of them if there is no such process do nothing 
Note that it's difference from a semaphore. if a process in a monitor signal and no task is waiting on the condition variable, the single is lost
![[Pasted image 20240420144807.png]]
- Once a process is in the monitor, it may temporarily block itself on condition x by issuing `cwait(x)` ; it is then placed in a queue of processes waiting to reenter the monitor when the condition changes, and resume execution at the point in its program following the `cwait(x)` call
- If a process that is executing in the monitor detects a change in the condition variable x , it issues `csignal(x)` , which alerts the corresponding condition queue that the condition has changed.

1. **`cwait(c)`:** This function is used within a monitor when a process or thread needs to wait for a certain condition `c` to become true. The `cwait` function suspends the calling process, meaning the process stops executing until the condition is met. This suspension allows the monitor to be used by other processes or threads. Importantly, the waiting is typically for a condition that will be altered by some other piece of code running in a different process or thread that also has access to the same monitor.
    
2. **`csignal(c)`:** This function is used to signal that a condition `c` has been met (or changed in a relevant way). It's used to wake up, or resume, one of the processes (if any) that are suspended and waiting on the condition variable `c` associated with that condition. If `csignal(c)` is called and no processes are currently waiting on the condition variable, the signal effectively does nothing—it is "lost" because there is no process to receive and act upon that signal.

### Hoare's Definition of Monitor
- The old monitor had a problem where if 
- The Mesa language, developed by Butler Lampson and David Redell, modifies the monitor structure to address the inefficiencies in Hoare's monitors. Instead of forcing the signaling process to leave or block, Mesa monitors allow the signaling process to continue executing after issuing a signal.
- This means that when a signal is issued, the signalled process is moved to a ready queue but is not immediately run. The signaling process continues until it leaves the monitor, after which the signalled process may then enter the monitor. This avoids the two context switches mentioned in Hoare's approach.
- The approach used in Mesa monitors also informs the design of monitors in the Modula-3 programming language, suggesting that it has practical applications in systems programming languages.

### Message Passing 
- When processes interact with one another two fundamental requirements must be satisfied 
- Synchronization -> to ensure mutual exclusion 
- Communication -> to exchange information 
- Message passing is one approach to providing both of these functions
	- works with distributed systems and shared memory multiprocessor and uniprocessor systems 
- the actual function is normally provided in the form of a pair of primitives:
	- send (destination, message)
	- receive (source, message)
- A process sends information in the form of a message to another process designated by a destination 
- A process receives information by executing the receive primitive, indication the source and the message

### Synchronization with Message Passing
The communication of a message between two processes implies some level of synchronization between the two: The receiver cannot receive a message until it has been sent by another process. In addition, we need to specify what happens to a process after it issues a send or receive primitive. Consider the send primitive first. When a send primitive is executed in a process, there are two possibilities: Either the sending process is blocked until the message is received, or it is not. Similarly, when a process issues a receive primitive, there are two possibilities:

1. If a message has previously been sent, the message is received and execution continues.

2. If there is no waiting message, then either (a) the process is blocked until a message arrives, or (b) the process continues to execute, abandoning the attempt to receive.

### Blocking Send, Blocking Receive
- Both the send and receiver are blocked until the message is delivered
- this is also known as `rendevous`

### Nonblocking Send 
NonBlocking send, blocking receive 
- Sender continued on by receiver is blocked until the requested message arrives 
- most useful combination 
- sends one or more messages to a variety of destinations as quickly as possible 
- example -- a service process that exists to provide a service or resource to other processes 

Nonblocking send, nonblocking receive
- neither party is required to wait 

The nonblocking send is more natural for many concurrent programming tasks. For example, if it is used to request an output operation, such as printing, it allows the requesting process to issue the request in the form of a message and then carry on. One potential danger of the nonblocking send is that an error could lead to a situation in which a process repeatedly generates messages. Because there is no blocking to discipline the process, these messages could consume system resources, including processor time and buffer space, to the detriment of other processes and the OS. Also, the nonblocking send places the burden on the programmer to determine that a message has been received: Processes must employ reply messages to acknowledge receipt of a message.

For the receive primitive, the blocking version appears to be more natural for many concurrent programming tasks. Generally, a process that requests a message will need the expected information before proceeding. However, if a message is lost, which can happen in a distributed system, or if a process fails before it sends an anticipated message, a receiving process could be blocked indefinitely. This problem can be solved by the use of the nonblocking receive . However, the danger of this approach is that if a message is sent after a process has already executed a matching receive , the message will be lost. Other possible approaches are to allow a process to test whether a message is waiting before issuing a receive and allow a process to specify more than one source in a receive primitive. The latter approach is useful if a process is waiting for messages from more than one source and can proceed if any of these messages arrive.

### Addressing 
- Schemes for specifying processes in send and receive primitives fall into two categories 
	- Direct addressing 
	- Indirect addressing 

### Direct Addressing 
- Send primitive include a specific identifier of the destination process 
- Receive primitive can be handled in one of two ways 
	1. **Explicit Designation**: The receiving process must specify the sender's identifier. This method is efficient when processes are working together and know each other's identifiers.
	2. **Implicit Addressing**: The receiving process does not need to specify who the message is from. Instead, the receive operation returns the sender's identifier as part of the message. This is similar to receiving a letter with a return address.

### Indirected Addressing 
The other general approach is indirect addressing . In this case, messages are not sent directly from sender to receiver but rather are sent to a shared data structure consisting of queues that can temporarily hold messages. Such queues are generally referred to as mailboxes . Thus, for two processes to communicate, one process sends a message to the appropriate mailbox and the other process picks up the message from the mailbox.

A strength of the use of indirect addressing is that, by decoupling the sender and receiver, it allows for greater flexibility in the use of messages.


### Relationship between Senders & Receivers 
1. A one-to-one relationship 
	- allows a private communication link to be set up between two processes.
	- This insulates their interactions from erroneous interference from other processes
2. A many-to-one relationship is useful for client/server interaction
	- one process provides service to a number of other processes
	- In this case, the mailbox is often referred to as a port
3. A one-to-many relationship allows for one sender and multiple receivers;
	- it is useful for applications where a message or some information is to be broadcast to a set of processes 
4. A many-to-many relationship 
	- allow multiple server processes to provide concurrent service to multiple clients


### General Message Format
- a header which contains information about message
	- a header may contain an identification of the source and intended destination of the message, a length field, and a type field to discriminate among various types of messages.
	- additional control information, e.g. pointer field so a linked list of messages can be created; a sequence number, to keep track of the number and order of messages passed source and destination; and priority field.
- a body, which contains the actual contents of the message


### System V Style  Messages
- has only msg type in header
	- other fields in send/reveive argumetns
- Indirect Addressing 
	- Defaults:
	- send blocks (only if MsgQ full)
	- receive blocks (only if MsgQ empty)
	- use send/receive flag argument to change 
	msgsnd ( int msgid, void *msg, size_t size, int flag)

### Readers/Writers Problem 
- A data area in shared among many processes 
	- Some processes only read the data area, (readers) and some only write to the data area (writers)
- Conditions that must be satisfied:
	1. any number of readers may simultaneously read the data area 
	2. only one writer at a time may write to the data area 
	3. if a writer is writing to the data area, no reader may read it 
- data area could be a file, block of main memory, etc.
- [[Writers Problem]]

| Readers only in the system                | - wsem set<br>- no queues                                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Writers only in the system                | -wsem and rsem set<br>-writers queue on wsem                                                                                        |
| Both readers and writers with read first  | -wsem set by reader <br>-rsem set by writer<br>-all writers queue on wsem<br>-one reader queues on rsem<br>-other reader queue on z |
| Both readers and writers with write first | -wsem set by writer <br>-rsem set by writer <br>-writers queue on wsem <br>-one reader queue on rsem <br>-other readers queue on z  |

### A Readers/Writers Solution using Message Passing 
- controller gives access to shared data 
- process (r/w) sends controller request msg, controller grants access with OK reply msg, when process done, sends finished msg 
- controller has 3 mailboxes (1 for each type of msg)
- Writers have priority
- Variable count for M.E. (initialized to some value > the max num. readers possible at once).
- Suppose max 99 concurrent reads possible 
	- initialize count = 100 
- Each concurrent read: count = count-1 (but never gets to zero)
- write request: count=count -100
- when of -10 means 10 concurrent reads, and 1 write waiting
- when count <0,
	- wait for all reads to finish (each time count ++), then 
	- when count up to zero, let the writer proceed (send it OK msg)


