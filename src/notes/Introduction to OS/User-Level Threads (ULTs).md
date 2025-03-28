Definition: A thread managed by a user-level library, not the OS (n ULTs are seem as q process to the kernel)

Example
- The posiz, pthread library in C
- The GThread python library

Pros:
- Lightweight (don't required kernel management overhead)
- Code Libraries for ULT s are **Portable**
- Independent from )S scheduler 

Cons:
- If a ULT executes a blocking system call, other ULTs will be **blocked** from execution until the former's system is dinsihed 
- ULTs can't take advantage of actual mutiple
