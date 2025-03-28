### Understanding Threads in Computing

Threads, often referred to as lightweight processes, represent the unit of dispatch within an operating system (OS), facilitating concurrent execution paths within a single process. Unlike processes, which own resources, threads share resources within their parent process, enabling efficient execution and communication.

### Single vs. Multithreading Approaches

- **Single-Threaded Approach:** Traditional execution model where a process contains only one thread of execution. The concept of threads is non-existent, leading to a straightforward but less versatile execution model.
  
- **Multithreading Approach:** Enables an OS to support multiple execution paths within a single process, significantly enhancing concurrency and resource utilization.

### Characteristics of Threads within a Process

Within a multithreaded process, each thread possesses:

- **Execution State:** Indicates whether a thread is running or ready to run.
- **Thread Context:** Saved state when the thread is not running, enabling resumption.
- **Execution Stack:** A stack that stores temporary data such as method/function calls.
- **Static Storage:** Space for thread-local variables.
- **Shared Access:** Threads share the process's memory and resources, allowing for efficient inter-thread communication and resource utilization.

![[Pasted image 20240322222039.png]]

### Thread-Specific Structures

For effective management, each thread maintains:

- **Thread Control Block (TCB):** Contains thread-specific information like status.
- **User and Kernel Stacks:** Separate stacks for user-level and kernel-level operations.
- **Execution Pointer:** Directs the thread's progress within the process's address space.

Despite these individual attributes, threads within a process share certain components:

- **Process Control Block (PCB):** The overarching control structure for the process.
- **User Address Space:** The memory space allocated to the process, accessible by all its threads.

### Process vs. Thread Creation: Clone and Fork

- **Fork:** A traditional method for creating a new process, duplicating the parent's address space. Changes in the child process do not affect the parent.
  
- **Clone:** More granular than fork, used for both process and thread creation. It allows specifying shared resources between parent and child, such as memory and file descriptors, enabling more efficient communication and state sharing.

### Advantages of Threads

Threads offer several benefits over processes:

- **Efficiency:** Threads are quicker to create and terminate.
- **Resource Utilization:** They allow for more efficient use of system resources.
- **Context Switching:** Switching between threads is faster and less resource-intensive than between processes.
- **Communication:** Threads enhance inter-process communication, making it more straightforward and faster.

### Threads in Single-User Systems

Threads significantly improve single-user systems by:

- **Separating Foreground and Background Tasks:** Allowing for smoother user interactions and background processing.
- **Asynchronous Processing:** Enhancing responsiveness and efficiency.
- **Speed:** Improving the execution speed through concurrent processing.
- **Modularity:** Encouraging a more structured and maintainable program design.

### Thread Synchronization

Given that threads share the same address space and resources, synchronization is crucial to prevent conflicts and ensure data consistency. This is particularly important when threads access and modify shared resources concurrently.

### Types of Threads

- **[[User-Level Threads (ULTs)]]:** Managed entirely by the application, with the kernel unaware of their existence. ULTs are fast and flexible but lack support from the kernel for scheduling and management.

- **Kernel-Level Threads (KLTs):** Managed by the kernel, allowing for better integration with OS features like CPU scheduling. KLTs can be slower than ULTs due to the overhead of kernel involvement.

- **Combined Approach:** A hybrid model where thread creation and high-level management occur in user space, but the kernel provides foundational support for scheduling and synchronization.

### The Linux Process/Thread Model

Linux treats threads and processes similarly, with specific states denoting their execution status:

- **Running State:** Comprising Ready and Executing states, indicating that a thread/process is active or ready to be activated.
- **Interruptible State:** A blocked state where a thread/process awaits I/O completion, open to handling signals.
- **Uninterruptible State:** A deeper blocked state, akin to "Do Not Disturb," usually for critical hardware communication.
- **Stopped State:** Represents a temporarily paused thread/process, often triggered by specific signals (e.g., CTRL-Z).
- **Zombie State:** Marks a terminated thread/process awaiting resource cleanup and parent notification.

Threads enhance the flexibility, efficiency, and scalability of software applications, making them indispensable in modern computing paradigms.