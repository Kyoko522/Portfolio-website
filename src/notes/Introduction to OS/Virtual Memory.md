### Hardware and Control Structures 
- Two characteristics fundamental to memory management
	- all memory reference are logical adresses that are dynamically translated into physical adresses at run time 
	- a process may be broken up into number of pieces that don't need to be contagiously located in main memory during execution 
- If these two characteristic are present, it is not necessary that all pages or segments of a process be in main memory during execution

### Terminology

| Term                  | Definistion                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Virtual Memory        | A Storage allocation scheme is which the secondary memory can be addressed as through it were part of main memory are distigusihsed formt he addresses the memory system used to identify physical storage sites, and program-genrated addresses are tranbslatea utomatically ot hte correspodnign machine adressed. the sizeof virutla storage is limited by the addressing scheme of the computer sustem and by the sammut of secondary memory available and not by the actual number of main storage location |
| Virtual adress        | the address assigned to a location in virtual memory to allow that location be accessed as though it were part of main memory                                                                                                                                                                                                                                                                                                                                                                                    |
| Virtual address space | The virtual storage assigned to a process                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Address Space         | The range of emory addresses available to a process                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Real address          | The address of a storage location in main memory                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
### Executions of a Process 
- Operating system bring into memory a few pieces of the program 
- Resident set - portion of process that is in main memory 
- Hardware generates an interrupts if needed logical address not in main memory (memory access fault)
- Operating system place the process in a blocking state
- Pieces of process that contains the logical address is brought in to main memory:
	- operating system issues a disk I/O Read request 
	- another process is dispatched to run while the disk I/O takes place
	- when the disk I/O is completed, in interrupt is issued causing OS to place the affected process in the Ready state
### Implications 
1. More process may be maintained in main memory
	- only load in some of the piece of each process 
	- with so many process in main memory, it is very likely a process will be in the Ready state at any particular time 
- a process may be larger than all of main memory 
- Better process utilization 
- better memory utilization 
- Faster "suspensions"

### Real and Virtual Memory
Real memory
- main memory
Virtual memory
- memory on disk 
- allo

### Thrashing
- a state in which that system spend most of its times swapping process peices ratehr than executing instructions 
- to avoid this, the operating system tries to guess, based on the recent history, which 

### Principle of Locality
- Program and data reference within a process tehnd to cluster 
- onlyu a few peiee s fo a process will be needed over a short periof of time 
- therefore it is possible ot make a intelligent guesses about which piece will be need in the future
- avoids thrashing

### Support Needed for Virtual Memory
- hardware must support paging and/or segmentation
- operating system must include software for managing the meovement of pages and/or segments between secondary memory and main memory

### Paging 
- the term *virtual memory* is usually associated with systems that employ paging 
- use of a paging to achieve virtual memory was first reported for the Atlas computer
- Use of paging to achieve virtual memory was first reported for the Atlas computer 
- Each process has it's own page table
	- each page table entry contains the frame number of the corresponding page in main memory
- Note that the Page table size will always be proportional to the size of the Virtual memory if the virtual memory is 8GB then the table has to be 8MB


### Page Table Issues 
- P's Page Table is proportional to P's size
- Root PT also proportional to P's size
- All PTs together are proportional to size of V. Memory
Different Approach
- One PT. A slot for each frame of Real memory
- Entry for slot X says what page of what process is occupying frame X now. 
- One PT, proportional to size of Real Memory


### Inverted Page Table
- Virtual address: 
- Page number portion of a virtual address is mapped into a hash value. Hash value point s to inverted page table 


what is a overhead in Virtual memory 



### Translation Look aside Buffer



### Page Size
- The smaller the page size, the lesser the amount of internal fragmentation, and more processes in memory
	- however, more pages are required per process
	- more pages per process mean larger page table 
	- for larger program in a heavily multiporgrammed enviroment some protion of the page tables of active processes must be in virtual memory (VM)
- The physical characteristics of most secondary-memory devices (VM) favor a larger page size for more efficient block transfer of data 
- Issues for hardware designer to consider 


### Segmentation 
- segmentation allows the programmer to view memory as consisting of multiple address spaces to segments 
- Advantage s
	- Simplified handling of growing data structures 
	- allows programs to be alter and recompiled independently 
	- lends itself to sharing data among processes 
	- lend itself to protection 

### Segment Organization 
- Each segment table entry contain the starting address of the correspoding segment in main memory and the length of the segment 
- a bit is needed to determine fif the segment is already in main memory
- another bit is needed to determine if the segment has been modified since it was laode in main memory


### Paging and Segmentation 
- paging 
	- no external fermentation 
	- efficient main memory usage 
	- simpler os algorithms
- Segmentation 
	- grow/shrink structures
	- modularity support 
	- protection/sharing support
- Combined paging and segmentation 
	- in a combined paging/segmentation systems a user's addressing space is broken up into a number of segments. Each segment is broiken up into a number of fixed-sized pages which are equal in length to a main memory fram 
		- segmentation is visible to the programmer 
		- paging is tranpart to the programmer 

### Protection and Sharing
- segmentation leads itself to the implementation of protection and sharing policies 
- each entry has a based address and length so inadvertent memory access can be controlled 
- sharing can be achieved by segments referencing multiple processes 
this is where the segmentation fault come from that we go in c  this is also where the length is used to make sure you are only access data inside of that segment 

### Operating System Software 
- The design of the memory management portion of an operating system depends on three fundamental area of choice:
	- whether or not to use virtual memory techniques 
	- the use of paging or segmentation or both
	- the algorithm employed for various aspect of memory management
The OS need to have Policies for Virtual Memory
- Fetch Policy 
	- determine when a phage should be brought back into main memory. 
	- the two common alternatives are [[Demand Paging]] and [[Prepaging]]
- Placement. Policy
	- Determines where in real memory a process pieces is to reside 
	- Important design issue in a segmentation system 
	- Paging or combined paging with segmentation placing is irrelevant because hardware performs functions with equal efficiency
	- for NUMA systems an automatic placement strategy is desirable
- Replacement Policy
	- Deals with the selection of a page in main memory to be replaced when a new page must be brought in 
		- objective is that the page that is removed be the page least likely to be reference in the near future
	- the more elaborate the replacement policy the greater the hardware and software overhead to implement it
Frame Locking 
- when a frame is locked the page currently stored in the frame may not replaced
	- kernel of the OS as well as key control structure are held in locked frame
	- I/O buffers and time-critical read may be locked into main memory
	- locking is achieved by associating a lock bit with each frame
- Resident Set Management 
	- notes bellow
- Cleaning Policy
	- Concerned with determining modified page should be write out to secondary memory
		- Demand Cleaning -> a page is written out to secondary memory only when it has been selected for replacement
		- Precleaning -> write out modified pages in batch before they're selected for replacement 
		- Page Buffering -> Put replaced page on appropriate  list: modified/unmodified. Periodically write out modified list and move to unmodified. Pages on unmodified wither reclaimed or lost (so nothing happens to it)
- Load Control

### Basic Algorithms
- [[Optimal Policy]]
- [[Least Recently Used (LRU)]]
- [[First-in-First-out (FIFO)]]
- [[Clock Policy]]

### Page Buffering 
- An interesting strategy that can improve paging performance and allow the use of simpler page replacement policy is page buffering . the VAX VMS approach is representative. the page replace algorithm is simple FIFO. to improve performance a replace page is not lost but rather is assigned to one off two list: the free page list if the page has not been notified, or modified page list if has. Not that the page is no physically moved about in main memory; instead, the entry in the page table for tis page is removed and placed in either the free or modified page list

### Replacement Policy and Memory Cache Size 
- With large memory cache, replace of pages can have performance impact 
	- if the page frame selected for replacement is in the catche, that cache block is lost as well as the page that it holds
- in system using page buffering, cache performance can be improved with a policy for page placement in the page buffer 
	- most OSs select an arbitrary page frame from the page buffer. but could pick one Not in cache instead 

### Resident Set Management
- the OS must decide how many pages to bring into main memory 
	- the smaller the amount of memory allocated to each process, the more processes can reside in memory
	- smaller number of pages loaded increases page faults 
	- beyond a certain size, further allocations of pages will not effect the page fault rate
#### Fixed-allocation 
- give a process a fixed number of frames in main memory within to ececute 
	- when a page fault occurs one of the pages of that process must be replaced

#### Variable-allocation 
- allows the number of page frames allocated to a process to be varied over the lifetime of the process 


### Replacement Scope 
- The scope of a replacement straggles can be categorizes as `global` or `lcoal`
	- both types are activated by a page fault when there are no free page frames 
- local 
	- chooses only among the resident pages of the process the generate the page fault 
- global 
	- considers all unlocked pages in main memory


### Variable Allocation Global Scope
- Easier to implement 
	- adopted in a number of operating systems
- OS maintains a list for free frames
- Free frame is added to resident set of a process when a page fault occurs 
- if no frame are available the OS must choose a page currently in memory 
- One way to counter potential problems is to use page buffering

### Variable Allocation Local Scope 
- when a new process is loaded into main memory, allocate to it a certain number of page frames as its resident set
- when a page fault occurs, select the page to replace from among the resident set of the process that suffers the fault 
- reevaluate the allocation provided to the process and increase or decrease it to improve overall performance 

### Variable Allocation Local Scope 
- Decision to increase and decrease a resident set size is based on the assessment of the likely future demands of active process
- Uses the [[Working Set Strategy]]

### Page Fault Frequency (PFF)
- used to count the number of page fault that a process gets if one get none that may mean that it's not using all of it's space so it will be shrunk to make space for other 

### Variable-Interval Sampled 
- attempts to deal with the phenomenon of interlocalioty transition with a silkar relative low overhead to that of PFF is that variable sampled working set


### Load Control 
- Determines the number of processes that will be resident in main memory
	- multiprogramming level
- Critical in effective memory management
- to few processes, many occasions when all processes will be blocked and much time will be spent in swapping 
- too many processes will lead to thrashing




### Process Suspension 
- If the degree of multiprogramming si ot be reduced, one or more of the currently resident processes must be swapped out 
	- Lowest-priority process
	- Faulting process 
	- Last process activated 
	- Process with the smallest resident set 
	- Largest process 
	- Process with the largest remaining execution window



