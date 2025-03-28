- A database is to be shared amoung several concurrent process
- Some of these processes may want only to read the database, whereas other may want to update (that is, to read and write) the database
- We distinguish between these two types of processes by referring to the former as Reader and to the latter as Writers. 
- Obviously, if two reader access the shared data simultaneously, no adverse affects will result
- However, if a writer and some other thread (either a reader or a writer) access the database simultaneously, chaos may ensue
To ensure that these difficulties do not arise, we require that the writers has exclusive access to the shared database


#### Semaphore Solution
We will make use of two semaphores and an integer variable:
1. mutex, a semaphore (initialized to 1) which is used to ensure mutual exclusion when readercount is updated i.e. when any reader enters or exit from the critical sections 
2. wrt, a semaphore (initialized to 1) common to both read and writer processes
3. readcount , an integer variable (initialized to 0) that keeps track of how many processes are currently reading the object


##### Writer Process
```c 
while(true){
//writer request for critical section
wait(wrt);
/*perform the write*/
//leave the ciritical section
signal(wrt);
}
```


##### Reader Process 
```c
while (true)
{
wait(mutex);
readcnt++; //the number of reads ahve now increment by 1
if(readcnt == 1)
	wait(wrt); // this ensure no writer can enter if there is even one reader 
	signal(mutex);; // other reader can enter while this current reader is inside the critical section
/* current reader performs reading here */

wait(mutex);
readcnt--; // a reader wants to leave
	if (readcnt == 0)// no reader is left in the critical section
		signal(wrt); // writer can enter 
		signal(mutex) // reader leaves 
}
```


##### Solution of Writer has Priority
![[Pasted image 20240420154352.png]]



#### Message Passing Solution 
An alternative solution, which gives writers priority and which is implemented using message passing, is shown in Figure 5.27 . In this case, there is a controller process that has access to the shared data area. Other processes wishing to access the data area send a request message to the controller, are granted access with an “OK” reply message, and indicate completion of access with a “finished” message. The controller is equipped with three mailboxes, one for each type of message that it may receive.

The controller process services write request messages before read request messages to give writers priority. In addition, mutual exclusion must be enforced. To do this the variable count is used, which is initialized to some number greater than the maximum possible number of readers. In this example, we use a value of 100. The action of the controller can be summarized as follows:

• If count > 0, then no writer is waiting and there may or may not be readers active. Service all “finished” messages first to clear active readers. Then service write requests and then read requests.

• If count = 0, then the only request outstanding is a write request. Allow the writer to proceed and wait for a “finished” message.

• If count < 0, then a writer has made a request and is being made to wait to clear all active readers. Therefore, only “finished” messages should be serviced.

![[Pasted image 20240420154837.png]]
ChatGPT explanation 
### Code Structure

- **`reader` Function**: Represents a reader process that requests and gains access to the shared data area. It sends a `readrequest` message and waits for an "OK" response in its mailbox before it reads the data. After reading, it sends a `finished` message to the controller.
- **`writer` Function**: Represents a writer process that functions similarly to the reader but sends a `writerequest` and waits for an "OK" to write data. After writing, it sends a `finished` message.
- **`controller` Function**: Manages access to the shared data area. It uses a `count` variable to track the status of the data area and uses three mailboxes to receive different types of messages (`finished`, `writerequest`, `readrequest`).

### Controller Logic

- **Count > 0**: No writer is waiting, so readers may be active. The controller services `finished` messages to clear any active readers, then handles `writerequest`, and finally `readrequest` messages.
- **Count = 0**: There is an outstanding write request. The controller allows the writer to proceed and waits for a `finished` message before servicing any other requests.
- **Count < 0**: A writer is waiting, and the controller must clear all active readers before allowing the writer to proceed. Only `finished` messages are serviced to decrement the count until all readers are done.

### Synchronization Mechanism

The system uses message passing for synchronization:

- **Message Passing**: This is an IPC mechanism where processes communicate by sending and receiving messages, avoiding the need for shared memory.
- **Priority to Writers**: Writers are given priority over readers to possibly prevent scenarios such as write starvation.
- **Mutual Exclusion**: Ensured by the controller by allowing only readers or a single writer at a time to access the shared data.
- **Mailboxes**: Used by the controller to receive and send messages to reader and writer processes. It ensures proper sequencing of read/write access.

### Initialization

The `count` variable is initialized to 100, a number larger than the maximum possible number of readers. It serves as a semaphore-like mechanism:

- Decremented for read requests (`count--`), showing a reader is active.
- Set to -100 when a write request comes in (`count = count - 100`), indicating a writer is waiting and no new readers should be serviced.
- Incremented when a reader finishes (`count++`), indicating one less active reader.
- Reset to 100 when a writer finishes after a write request (`count = 100`), indicating the writer is done, and the system is ready for new read or write requests.

The controller process uses these message patterns to maintain a correct and efficient order of access to the shared data, respecting the priority of writers and ensuring mutual exclusion to prevent conflicts between concurrent read and write operations.


