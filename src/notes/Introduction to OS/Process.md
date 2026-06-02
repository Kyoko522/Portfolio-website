#### Understanding Process Elements

A **Process Element** is a crucial concept in computing, encapsulating an executable program and its associated data. It comprises the following:

- **Process Code:** The executable instructions of the program.
- **Associated Data:** Variables, input/output data, and other runtime information linked with the process code.

When multiple users (e.g., students) run the same program, each execution spawns an independent process. These processes operate in isolation, ensuring that their executions do not interfere with one another, despite sharing the same underlying code.

#### Components of a Process

Upon creation, a process is endowed with several critical attributes:

- **Identifier (PID):** A unique numerical label for identifying and managing the process.
- **State:** The current status of the process (e.g., running, waiting, suspended, blocked).
- **Priority:** A ranking that determines the process's execution precedence, typically user processes have the lowest priority by default.
- **Program Counter:** An indicator of the next instruction to execute in the program sequence.
- **Memory Pointers:** References to the locations within memory where the process's data and code reside. This is done using a pointer which points to the program code and data associated with it.
- **Context Data:** Information about the process's current state, including CPU register contents, crucial for resuming execution after a pause.
- **I/O Status Information:** Includes outstanding I/O requests, I/O devices assigned to this process, a list of files in use by the process, and so on.
- **Accounting Information:** Data regarding the process's resource usage, important for system monitoring and management.

#### Process Control Block (PCB)

The **Process Control Block (PCB)** is a vital data structure that encapsulates all the elements of a process. It serves as a storage area for process information during execution interruptions, facilitating the resumption of the process's activity by restoring its state.

#### Process Behaviour and Management

- **Trace:** The sequence of executed instructions, illustrating the process's behaviour.
- **Dispatcher:** A component responsible for managing the CPU's execution focus among various processes, enabling concurrent execution.

- Examples
![[Pasted image 20240322150329.png]]
![[Pasted image 20240322150356.png]]
#### Process Lifecycle

#### Creation Triggers:

| Reasons                            | Description                                                                                                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New Batch job                      | The OS is provided with a batch job control stream, usually on tap or disk and will read the next series of job control commands when it prepares to take on new work. |
| Interactive log-on                 | A user at a terminal logs on the system                                                                                                                                |
| Created by OS to provide a service | The OS can create a process to perform a function on behalf of a user program without the user having to wait (e.g., a process to control printing).                   |
| Spawned by existing process        | A user program can dictate the creation of several processes for modualrity or to exploit parallelism                                                                  |

#### A Five-State Model
- Running 
	--> The process that is currently being executed. For this chapter, we have to assume that the computer only has a single processor, so at most, one process at a time can be in this state
- Ready
	--> A process that is prepared to execute when given the opportunity 
	--> If processes are dispatched based on priority, multiple Ready queues are beneficial 
	--> Each ready queue corresponds to a different priority level
	--> The Operating system (OS) can easily identify the highest-priority "ready" process 
	--> The OS can also determine which high priority process has waited the longest for dispatch
- Blocked/Waiting: A process that cannot execute until some event occurs, such as completing an I/O operation
	--> the blocked state mean a process waiting for another to provide that data or message 
	--> when a process is finished executing, it is either placed in the ready or blocked queue
	--> Any process in the blocked queue waiting on specific event is moved to the ready queues once that event happens 
		this means that after an event, the operating system has to scan all the items in the blocked queues to see if any processes can be moved to the ready queue.
	--> The most efficient way to store items in the blocked queue is to have multiple queues, each one for a specific event; that way, you can move an entire queue once that event occurs
- New 
	--> This is the state where the OS know there is a process coming but the OS hasn't create a Control Block for that process 
- Exit 
![[Pasted image 20240322161335.png]]
#### Termination Reasons:

Processes may conclude due to various factors, including:

- **Normal Completion:** The process finishes its execution successfully.
- **Resource Limits Exceeded:** The process surpasses allocated time or memory constraints.
- **Errors:** Execution errors such as bounds violations, arithmetic faults, or illegal operations.
- **External Interruptions:** Interruptions by the user, OS, or supervisory processes, including the termination of parent processes.

| Reason for Process Termination | Description                                                                                                                                                                                                                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Normal completion              | The process executes an OS service call to indicate that it has completed running.                                                                                                                                                                                                                                                      |
| Time limit exceeded            | The process has run longer than the specified total time limit. There are a number of possibilities for the type of time that is measured. These include total elapsed time ("wall clock time"), amount of time spent executing, and, in the case of an interactive process, the amount of time since the user last provided any input. |
| Memory unavailable             | The process requires more memory than the system can provide.                                                                                                                                                                                                                                                                           |
| Bounds violation               | The process tries to access a memory location that it is not allowed to access.                                                                                                                                                                                                                                                         |
| Protection error               | The process attempts to use a resource such as a file that it is not allowed to use, or it tries to use it in an improper fashion, such as writing to a read-only file.                                                                                                                                                                 |
| Arithmetic error               | The process tries a prohibited computation (such as division by zero) or tries to store numbers larger than the hardware can accommodate.                                                                                                                                                                                               |
| Time overrun                   | The process has waited longer than a specified maximum for a certain event to occur.                                                                                                                                                                                                                                                    |
| I/O failure                    | An error occurs during input or output, such as inability to find a file, failure to read or write after a specified maximum number of tries (when, for example, a defective area is encountered on a tape), or invalid operation (such as reading from the line printer).                                                              |
| Invalid instruction            | The process attempts to execute a nonexistent instruction (often a result of branching into a data area and attempting to execute the data).                                                                                                                                                                                            |
| Privileged instruction         | The process attempts to use an instruction reserved for the operating system.                                                                                                                                                                                                                                                           |
| Data misuse                    | A piece of data is of the wrong type or is not initialized.                                                                                                                                                                                                                                                                             |
| Operator or OS intervention    | For some reason, the operator or the operating system has terminated the process (e.g., if a deadlock exists).                                                                                                                                                                                                                          |
| Parent termination             | When a parent terminates, the operating system may automatically terminate all of the offspring of that parent.                                                                                                                                                                                                                         |
| Parent request                 | A parent process typically has the authority to terminate any of its offspring.                                                                                                                                                                                                                                                         |

### Process States and Transitions

- **New:** Initial recognition of the process by the system.
- **Ready:** The process awaits CPU allocation.
- **Running:** Active execution state of the process.
- **Blocked/Waiting:** The process is on hold, pending external event completion.
- **Suspended:** Inactive state, often due to memory management strategies like swapping.
- **Terminated:** The process has completed or been explicitly stopped.

##### One Suspension state
![[Pasted image 20240322162130.png]]

##### Two Suspension states
![[Pasted image 20240322162310.png]]
#### Advanced Process Management Concepts

- **Swapping:** Transferring processes between main memory and secondary storage to manage memory resources efficiently.
- **Process Image:** The combination of the PCB and the process's executable content.
- **Trap:** A mechanism for processes to signal exceptional conditions, potentially leading to suspension or termination.
- **Time Slice:** The allotted maximum duration for process execution before preemption.
- **Mode Switch vs. [[Process Switch]]:** Differentiates the CPU's transition between user and kernel modes (mode switch) and the exchange of executing processes (process switch).
### Suspended State

The reason for Process Suspension
![[Pasted image 20240322175226.png]]
#### Operating System Architectures and Process Handling

- **Separate Kernel:** A structure where the kernel operates independently from user processes, enhancing system stability and security.
- **Integrated OS Functions:** A simpler model where OS routines are executed within user process contexts, potentially simplifying design at the expense of stability.
- **OS as Separate Processes:** An approach where OS functionalities are modularized as distinct processes, allowing for distributed execution and enhanced modularity.
#### Operating System Control Structures
- The OS must have information about the status of all the processes and resources. 
	- it does this by constructing tables of information about each entity it manages 
- In the example, the OS has four tables, which it maintains 
	- [[Memory Tables]]
	- [[Input and Output tables]](I/O tables)
	- [[File Tables]]
	- [[Process Table]]
- Although it might differ from OS to OS, they all keep track of the mentioned four categories. These tables are all linked even though there are multiple.
- This is because they need to be cross-referenced with each other. memory I/O and files are all managed on behalf of the processes
	- The process tables have an indirect or direct reference to these resources.
- When the OS is initialized, it has no idea about its environment at all.  
	- it must have access to some configuration data that define the basic environment, and these data must be created outside the OS  
	- This is what allows it to then configure and create tables.

#### Process Location and Composition:

- **Programs**: A process includes at least one program, which is a set of instructions that the CPU will execute.
- **Memory**: The process must contain enough memory to hold the program, including local, global, and constant data.
- **Stack**: Normally, a program will utilize a stack for managing function calls and parameter passing, which operates on a last-in-first-out (LIFO) basis.

#### Process Control Block (PCB):

- **Attributes**: The operating system (OS) uses a data structure called the process control block to keep track of all necessary information about each process, like process state, process number, program counter, registers, memory limits, list of open files, etc.

#### Process Image:

- **User Program**: The executable code.
- **Data**: This may include variables, user stack area, and modifiable parts of the program.
- **Stack**: Used for tracking the execution of procedures and system calls.
- **Attributes (PCB)**: Information that the OS needs to manage the process.

#### Memory Management:

- **Location**: The process image might be stored in secondary memory, with a part always in main memory for the OS to manage.
- **Execution**: When executed, the process image is brought into main memory.
- **Paging**: Modern OSes use paging, dividing memory into pages, rather than requiring contiguous memory blocks.
- **Partial Loading**: It's common for only parts of a process (pages) to be loaded into main memory as needed.

#### Process Attributes:

- **Identification**: Processes are uniquely identified, typically by a numeric identifier.
- **Processor State**: This includes the content of the processor's registers, which are saved and restored when a process is interrupted and then resumed.
- **Control Information**: Additional information that the OS needs to manage processes, which can be quite varied.

#### Multiprogramming System Considerations:

- **Process Tables**: The OS maintains tables with information about each process, including memory location, state, and other attributes.
- **Linking and Structuring**: The PCB may contain pointers for structuring and linking, which can be scattered or contiguous, depending on the memory management scheme.
- **Categories of PCB Information**:
    - **Process Identification**: Unique IDs for each process, mapping to locate process tables.
    - **Processor State Information**: Includes registers, program status word (PSW), and stack pointers.
    - **Process Control Information**: Additional data necessary for the OS to coordinate processes.






By delving into these elements, we gain a comprehensive understanding of processes in computing, highlighting the intricate mechanisms operating systems employ to manage execution, resource allocation, and system stability efficiently.