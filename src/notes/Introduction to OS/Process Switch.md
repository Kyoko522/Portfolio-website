1. Save the context of the processor, including counter and other registers
2. Update the process control block of the process that is currently in the Running state. This includes changing the state of the process to one of the other states (Ready; Blocked, Ready/Suspended; or exit). Other relevant fields must also be updated, including the reason for leaving the Running state and accounting information
3. Move the process control block of this process to the appropriate queue (Ready; Blocked; Ready/Suspended; or Exit; ).
4. Select another process for execution; this topic is explored in Part four
5. Update the process control block of the process selected. This includes changing the state of this process to Running
6. Update the memory management data structure. This may be required depending on how address translation is managed; this topics is explored in part 3
7. Restore the contact of the process to that which existed at the time the selected precess was last switched out of the Running state, by loading in the previous values of the program counter and other registers.