### Deadlock 
- The permanent blocking of a set of processes that either compete for system resource of communicate with each other 
- A set of processes is deadlocked when each process in the set is blocked awaiting an event that can only be triggered by another blocked process in the set
- Permanent 
- No efficient solution 

### Resource Categories 
Reusable
- can be safely used by only one process at a time and is not depleted by the use 
	- processor, I/O channels, main and secondary memory, devices, and data structures such as files, database, and semaphores 
Consumable 
- one that can be created (produced) and destroyed (consumed)
	- interrupts, signals, messages, and information in I/O buffer

###  Resource Allocation Graphs
![[Pasted image 20240418180622.png]]
- a resource allocation graph is used to see if there is a deadlock for example the image above the left graph is a deadlock as it has no instance of Ra to get the request from
![[Pasted image 20240418182720.png]]
- this is a Resource Allocation Graph for the car graph shown below 


when reviewing add the car diagram here


### Conditions for Deadlock 
- Mutual Exclusion 
	- only one process may use a resource at a time 
	- no process may access a resource that has been allocated to another process (need a resource from another process)
- Hold-and-wait
	- a process may hold allocated resources while awaiting assignment of others (able to hold a resource and wait for what it needs)
- No Pre-emption 
	- no resource can be forcibly removed from a process holding it (a resource can't just be taken away)
- Circular wait 
	- a closed chain of processes exists, such that each processes holds at least one resource needed by the next process in the chain (the Resource Allocation Graph has a loop)

### Dealing with Deadlock 
Deadlock Prevention (Direct and Indirect)
- adopt a policy that eliminates one of the conditions for a deadlock (Mutual Exclusion, Hold-and-wait, no pre-empting, Cirular wait)
Deadlock Avoidance
- make the appropriate dynamic choices based on the current state of resource allocation 
Deadlock Detection 
- attempt to detect the presence of deadlock and take action to recover 

### Deadlock Prevention Strategy 
- Design a system in such a way that the possibility of deadlock is excluded 
- Two main methods 
	- Indirect 
		- prevent the occurrence of one of the three necessary conditions (Mutual Exclusion, Hold&Wait, No Pre-Emption) -> from conditons for a deadlock
	- Direct
		- prevent the occurrence of a circular wait

### Deadlock Condition Prevention 
~~Mutual Exclusion~~ 
- In general, the first of the four listed conditions cannot be disallowed. if access to a resource requires mutual exclusion, then mutual exclusion must be supported by the OS. Some resources, such as file may allow multiple accesses for reads by only exclusive access for writes. Even in this case, deadlock can occur if more than one process requires write permission.
Hold and Wait 
- The hold-and-wait condition can be prevent by required that a process request all of its **required resources at one time** and blocking the process until **all request can be granted simultaneously**. this approach is inefficient in two ways. First a process may be held up for a long time waiting for all of its rescuer request to be filled, then in fact it could have processed with only some of the resource. Second, resource allocated to a process may remain unused for a considerable period, during which time they are denied to other processes. Another problem is that a process may not know in advance all of the resource that it will require 
No Preemption 
- This condition can be prevented in several ways. First, if a process holding certain resource is denied a further request, that process must release its original resource and, if necessary, request them again together with the additional resource. Alternatively, if a process request a resource that is currently held by another process, the OS may preempt the second process and required it to release its resources. This latter scheme would prevent deadlock only if no tow processes possessed the same priority
Circular Wait 
- The circular-wait condition can be prevented by defining defining a linear ordering of resource types. if a process has been allocated resources of type R, then it may subsequently request only those resource of types following R in the ordering. To see that this strategy works let us associated an index with each resource type. Then resource R i precedes R j in the ordering if i < j. Now suppose that two processes, A and B, are deadlocked because A has acquired R i and requested R j, and B has acquired R j and requested R i. This condition is impossible because it implied i < j an j < i  
![[Pasted image 20240418185651.png]]

### Deadlock Avoidance 
- A decision is made dynamically whether the current resource allocation request will, if granted, potentially lead to a deadlock
- Requires knowledge of **future process resource requests**

#### Two approach for Deadlock Avoidance
- Do not start a process if its demands might lead to deadlock 
- Do not grand an incremental resource request to a process if this allocation might lead to deadlock


### Process Initiation Denial
- The processes has to state the max memory that they might use
- the OS keep track of only the max and doesn't care how much the processes actually use until the sum of all the process of the running process are lower then what the total os memory it will accept the process once the sum of all the process running plus the one that wants to run is over the total Memory allowed it denys the one that one that wan't to run even if that process are actually using significantly less then there max the os won't risk it like that 
  ![[Pasted image 20240418191045.png]]


### Resource Allocation Denial 
- Referred to as the *[[banker's algorithm]]* this algorithm determine if a process goes to a safe state or a unsafe state
- **State** of the system reflects the current allocation of resource to processes 
- **Safe state** is one in which there is a least one sequence of resource allocations to processes that does not result in a deadlock 
- **Unsafe state** is a state that is not safe
- State of a system consisting of four processes and three resources 
- Allocations have been made to the four processes
![[Pasted image 20240418192607.png]]

### Deadlock Avoidance Strategy 
- Assume (pretend) request granted 
- Update system state (pretend)
- check if state safe
	- if so, grant resource 
	- if no block process 

#### Advantage
- it is not necessary to preempt and rollback processes, as in deadlock detection 
- it is less restrictive than deadlock prevention 

#### Restrictions 
- Maximum resource requirement for each process must be stated in advance 
- Processes under consideration must be independent and with no synchronization requirements
- There must be a fixed number of resource to allocate
- No process may exit while holding resources 

### Deadlock Detection 
Deadlock prevention strategies are very conservative 
- limit access to resource and imposing restrictions on process
Deadlock detection strategies do the opposite 
- resource requests are granted whenever possible 

### Deadlock Detection Algorithms 
- A check for deadlock can be made as frequently as each resource request or, less frequently depending on how likely it is for a deadlock to occur
![[Pasted image 20240420170407.png]]
- The way the Deadlock detection algorithm works is it looks at the request table(not the allocation that avoidance looks at) and see if we have the resources that are need to complete the process if we do then mark it and move on to the next process, if we don't we know that there is a deadlock as we don't have enough resources to continue
#### Advantage
- it leads to early detection 
- the algorithm is relatively simple 
#### Disadvantages 
- frequent checks consume considerable processor time

### Recovery Strategies
1. Abort all deadlock processes -> one of the most common solutions 
2. Back up each deadlocked process to some previously defined checkpoint, and restart all processes
3. Successively abort deadlocked processes until deadlock no longer exists -> The order in which processes are selected for abortion should be on the basis of some criterion of minimum cost. after each absorption the detection algorithm must be re-invoked to see whether deadlock still exists
4. Successively preempt resources until deadlock no longer exists.

### Dining Philosophers Problem

### UNIX Concurrency Mechanisms
- UNIX provides a variety of mechanisms for IPC (interprocess communication) and synchronization including: 
	- Pipes 
	- Messages 
	- Shared memory
	- Semaphores 
	- Signals 

#### Pipes 
- Circular buffers allowing two processes to communicate on the producer- consumer model
	- first-in-first-out queue, written by one process and read by another 
		- Name 
			- creates permanent pipe in filesystem (looks like a file)
				In C
			- Creates permanent pipe filesystem (looks like a file)
			- See with: ls -l (like shell name pipe)
			- Use: mkfifo(), open(), read(), write(), etc. (similar)
		- Unnamed 
			- the pipe that are used in CPS 393 
			- starts all the process at the same time, if the first process take a while the process that follow are just in the block state just waiting for I/O to come in
				In C
			- Only for related processes/threads (i.e., parent/child)
			- When program terminates, pipe closed (like a file)
			- OS blocks if reading from empty or writing to full 
			- Os provides mutual exclusion 

#### Messages 
- A block of bytes with an accompany type
- UNIX provide `msgsnd` and `msgrcv` system calls for processes to engage in message passing 
- Associated with each process is a message queue, which functions like a mailbox

#### Shared Memory
- Fastest form of interprocess communication (IPC)
- Common block of virtual memory shared by multiple processes 
- Permission is read-only or read-write for a process
- Mutual exclusion constrained are not part of the shared-memory facility but must be provided by the processes using the shared memory 
Shared Memory in C
- Program use shmget(), shmat() to create and/or attach to bytes of shared memory
- Program access shared memory memory through pointer obtained from shmat()

read the textbook for the 2 top topics cuz she just yapped for a hours straight for this toppic s


#### [[Semaphores]] 
A semaphore consists of the following elements:
- Current value of the semaphore
-  Process ID of the last process to operate on the semaphore
-  Number of processes waiting for the semaphore value to be greater than its current value
-  Number of processes waiting for the semaphore value to be zero

Associated with the semaphore are queues of processes blocked on that semaphore.

Semaphores are actually created in sets, with a semaphore set consisting of one or more semaphores. There is a `semctl` system call that allows all of the semaphore values in the set to be set at the same time. In addition, there is a `sem_op` system call that takes as an argument a list of semaphore operations, each defined on one of the semaphores in a set. When this call is made, the kernel performs the indicated operations one at a time. For each operation, the actual function is specified by the value `sem_op` .

The following are the possibilities:

- If `sem_o`p is positive, the kernel increments the value of the semaphore and awakens all processes waiting for the value of the semaphore to increase.
-  If `sem_op` is 0, the kernel checks the semaphore value. If the semaphore value equals 0, the kernel continues with the other operations on the list. Otherwise, the kernel increments the number of processes waiting for this semaphore to be 0 and suspends the process to wait for the event that the value of the semaphore equals 0.
- If `sem_op` is negative and its absolute value is less than or equal to the semaphore value, the kernel adds `sem_op` (a negative number) to the semaphore value. If the result is 0, the kernel awakens all processes waiting for the value of the semaphore to equal 0.
-  If `sem_op` is negative and its absolute value is greater than the semaphore value, the kernel suspends the process on the event that the value of the semaphore increases.

This generalization of the semaphore provides considerable flexibility in performing process synchronization and coordination


#### Signals 
- A software mechanism that informs a process of the occurrence of asynchronous events 
	- similar to a hardware interrupt, but does not employ priorities 
- A signal is delivered by updating a field in the process table for the process to which the signal is being sent
- A process may respond to a signal by:
	- performing some default action 
	- elevating a signal-handler function
	- ignoring the signal

### Real-time (RT) Signals
- Linux includes all of the concurrency mechanisms found in other UNIX systems
- Linux also supports real-time (RT) signal 
- RT signals differ from standard UNIX signal in three primary ways:
	- Signal delivery in priority order is supported 
	- Multiple signal can be queued
	- With standard signals, no values or message can be sent to the target process - it is only notification 
	- With RT signals it is possible to send a value along with the signal 

### Linux Kernel Concurrency Mechanism 
- include all the mechanisms found in UNIX (pipe, messages, shared, memory, semaphores, signal) plus:
	- Barriers
	- Spinlock 
	- Semaphores
	- Atomic Operations

#### Atomic Operations 
- Atomic operations executes without interruptions and without interference
- Simplest of the approach to kernel synchronization
- Two Types 
	- Integer Operations (operate on an integer variable, typically used to implement counters)
	- Binary Operations (operate on one of a sequence of bits at an arbitrary memory location indicated by a pointer variable)

#### Spinlocks 
- Most common technique for protecting a critical sections in Linux 
- Can only be acquired by one thread at a time 
	- any other thread will keep trying (spinning) until it can acquire the lock 
- Built on an integer location in memory that is checked by each thread before it enters its critical section 
- Effective in situations where the wait time for acquiring a lock is expected to be very short
- Disadvantages being that locked-out threads continue to execute in a busy-waiting mode

#### Semaphores 
At the user level, Linux provides a semaphore interface corresponding to that in UNIX SVR4. Internally, Linux provides an implementation of semaphores for its own use. That is, code that is part of the kernel can invoke kernel semaphores. These kernel semaphores cannot be accessed directly by the user program via system calls. They are implemented as functions within the kernel and are thus more efficient than user-visible semaphores.

Linux provides three types of semaphore facilities in the kernel: binary semaphores, counting semaphores, and reader–writer semaphores.

Linux provides three types of semaphore facilities in the kernel:
-  binary semaphores,
-  counting semaphores, and
-  reader-writer semaphores.

#### Barriers
To enforce the order in which instructions are executed, Linux provides the memory barrier facility. Table 6.6 lists the most important functions that are defined for this facility. The `rmb()` operation insures that no reads occur across the barrier defined by the place of the `rmb()` in the code. Similarly, the `wmb()` operation insures that no writes occur across the barrier defined by the place of the `wmb()` in the code. The mb() operation provides both a load and store barrier.

Two important points to note about the barrier operations:

1. The barriers relate to machine instructions, namely loads and stores. Thus the higher-level language instruction a = b involves both a load (read) from location b and a store (write) to location a .

2. The `rmb` , `wmb` , and mb operations dictate the behaviour of both the compiler and the processor. In the case of the compiler, the barrier operation dictates that the compiler not reorder instructions during the compile process. In the case of the processor, the barrier operation dictates that any instructions pending in the pipeline before the barrier must be committed for execution before any instructions encountered after the barrier.

#### RCU (Read-Copy-Update)
The RCU (read-copy update) mechanism is an advanced lightweight synchronization mechanism which was integrated into the Linux kernel in 2002. The RCU is used widely in the Linux kernel, for example, in the Networking subsystem, the Memory subsystem, the virtual file system, and more. RCU is also used by other operating systems; and DragonFly BSD uses a mechanism that resembles Linux Sleepable RCU (SRCU). There is also a userspace RCU library called liburcu.

As opposed to common Linux synchronization mechanisms, RCU readers are not locked. The shared resources that the RCU mechanism protects must be accessed via a pointer. The RCU core API is quite small, and consists only of the six following  methods:

• rcu_read_lock()

• rcu_read_unlock()

• call_rcu()

• synchronize_rcu()

• rcu_assign_pointer()

• rcu_dereference()

Apart from these methods, there are about 20 RCU application programming interface (API) minor methods.

The RCU mechanism provides access for multiple readers and writers to a shared resource; when a writer wants to update that resource, it creates a copy of it, updates it, and assigns the pointer to point to the new copy.  Afterwards, the old version of the resource is freed, when it is no longer needed. Updating a pointer is

an atomic operation. Hence, the reader can access that resource before or after the update is completed, but not during the update operation itself. In terms of performance, the RCU synchronization mechanism best suites scenarios when reads are frequent and writes are rare.

Access to a shared resource by readers must be encapsulated within rcu_ read_lock()/rcu_read_unlock() block; moreover, access to the pointer (ptr) of the shared resource within that block must be done by  rcu_dereference(ptr) and not by a direct access to it, and one should not invoke the rcu_dereference()

method outside of such a block. After a writer has created a copy and changed its value, the writer cannot free

the old version until it is sure that all readers do not need it anymore. This can be done by calling synchronize_rcu(), or by calling the nonblocking method call_rcu(). The second parameter of the call_rcu() method references a callback, which will be invoked when the RCU mechanism is assured that the resource can

be freed.