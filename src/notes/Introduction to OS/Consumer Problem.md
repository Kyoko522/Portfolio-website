The Bound Buffer Problem (Producer Consumer Problem), is one of the classic problems of synchronization.

There is a buffer of n slots and each slots and each slot is capable of storing one unit of data.

There are two processes running, namely, Producer and Consumer, which are operating on the buffer.

![[Pasted image 20240420135541.png]]

- The producer tries to insert data into an empty slot of the buffer 
- The consumer tries to remove data from a filled slot in the buffer 
- the producer must not insert data when the buffer is full 
- The consumer must not remove data when the buffer is empty
- The producer and Consumer should not remove and insert data simultaneously


#### Semaphores Approach

We will make use of three semaphores: 
1. m (mutex), a binary semaphore which is used to acquire and release the lock
2. empty, a counting semaphore whose initial value is the number of slots in the buffer, since, initially all slots are empty
3. full, a counting semaphore whose initial value is 0

##### Producer 

```c 
while(true)
{
wait(empty); //wait until empty>0 and decrement 'empty'

wait(mutex); //acquire lock
/* add data to buffer */
signal(mutex); //release lock
 
signal(full); // increment 'full'
} 
```
- `wait(empty)` - empty is the number of empty spot left if there is no empty spots ( buffer is full ) the producer has to wait
- `wait(mutex)` - before adding something to the buffer lock it so that the consumer won't be able to remove something at the same time
- `signal(mutex)` - unlock the buffer for other process (consumer)
- `singal(full)` - add one to the full stating another item has been added to the buffer

##### Consumer
```c
while (true)
{
wait(full); //wait until fll>0 and then decrement 'full'

wait(mutex); //acquire loock
/* add data to buffer */
signal(mutex); //release lock

signal(empty); // increment 'empty'
}
```
- `wait(full)` - full shows how many spot in the buffer are filled, if it's 0 or less that means there is nothing to consume and has to wait
- `wait(mutex)`- lock the critical section from Producer so that they can't add when something is being removed
- `signal(mutex)`- unlock the lock so that things can be added
- `signal(empty)` add one to empty saying that something in the buffer has been consumed




#### Monitor Approach

![[Pasted image 20240420145404.png]]

This example points out the division of responsibility with monitors compared to semaphores. In the case of monitors, the monitor construct itself enforces mutual exclusion: It is not possible for both a producer and a consumer simultaneously to access the buffer. However, the programmer must place the appropriate cwait and `csignal` primitives inside the monitor to prevent processes from depositing items in a full buffer or removing them from an empty one. In the case of semaphores, both mutual exclusion and synchronization are the responsibility of the programmer.

Note that in Figure 5.19 , a process exits the monitor immediately after executing the `csignal` function. If the `csignal` does not occur at the end of the procedure, then, in Hoare’s proposal, the process issuing the signal is blocked to make the monitor available and placed in a queue until the monitor is free. One possibility at this point would be to place the blocked process in the entrance queue, so that it would have to compete for access with other processes that had not yet entered the monitor. However, because a process blocked on a `csignal` function has already partially performed its task in the monitor, it makes sense to give this process precedence over newly entering processes by setting up a separate urgent queue ( Figure 5.18 ). One language that uses monitors, Concurrent Pascal, requires that `csignal` only appear as the last operation executed by a monitor procedure.

 If there are no processes waiting on condition x , then the execution of `csignal( x )` has no effect.

As with semaphores, it is possible to make mistakes in the synchronization function of monitors. For example, if either of the `csignal` functions in the bounded buffer monitor are omitted, then processes entering the corresponding condition queue are permanently hung up. The advantage that monitors have over semaphores is that all of the synchronization functions are confined to the  monitor. Therefore, it is easier to verify that the synchronization has been done correctly and to detect bugs.

Furthermore, once a monitor is correctly programmed, access to the protected resource is correct for access from all processes. In contrast, with semaphores, resource access is correct only if all of the processes that access the resource are programmed correctly.