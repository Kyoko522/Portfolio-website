How a programming using Semaphore may look like, used the `semWait(s)` to decrement and enters the critical section, once done it sends `semSignal(s)` allowing other process to enter the critical section
```c
const int n = /* number of processes */
semaphore s = 1;
void P( int i){
	while (true){
		semWait(s);
		/*critical section*/;
		semSignal(s);
		/*remainder*/;
	}
}

void main()
{
	parbegin (P(1), P(2), ... , P(n));
}
```

Note that semaphore is initialized to 1. Thus, the first process that executes a semWait will be ale to enter the critical section immediately, setting the value of s to 0. Any other process attempting to enter the critical section will find i busy and will be blocked, setting the value of s to -1. any number of processes may attempt entry; each such unsuccessful attempt results in a further decrement of the value of s. when the process that initially entered its critical section departs s incremented and one of the blocked processes (if any) is removed from the queue of blocked processes associated wth the semaphore and put in a read state. when it is next schedules by the OS, it may enter the critical section.


![[Pasted image 20240418143755.png]]
### How Semaphore Works (Counting Semaphore)
![[Pasted image 20240418144158.png]]

### How Semaphore Works (Binary Semaphore)
![[Pasted image 20240420133034.png]]

### Semaphore Primitives
![[Pasted image 20240420142328.png]]