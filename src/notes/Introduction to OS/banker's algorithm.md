The banker’s algorithm is a resource allocation and deadlock avoidance algorithm that tests for safety by simulating the allocation for the predetermined maximum possible amounts of all resources, then makes an “s-state” check to test for possible activities, before deciding whether allocation should be allowed to continue.

## ****Why Banker’s Algorithm is Named So?**** 

The banker’s algorithm is named so because it is used in the banking system to check whether a loan can be sanctioned to a person or not. Suppose there are n number of account holders in a bank and the total sum of their money is S. If a person applies for a loan then the bank first subtracts the loan amount from the total money that the bank has and if the remaining amount is greater than S then only the loan is sanctioned. It is done because if all the account holders come to withdraw their money then the bank can easily do it.

It also helps the OS to successfully share the resources between all the processes. It is called the banker’s algorithm because bankers need a similar algorithm- they admit loans that collectively exceed the bank’s funds and then release each borrower’s loan in installments. The banker’s algorithm uses the notation of a safe allocation state to ensure that granting a resource request cannot lead to a deadlock either immediately or in the future.  
In other words, the bank would never allocate its money in such a way that it can no longer satisfy the needs of all its customers. The bank would try to be in a safe state always.

The following ****Data structures**** are used to implement the Banker’s Algorithm:  
Let ****‘n’**** be the number of processes in the system and ****‘m’**** be the number of resource types.

### ****Available****

- It is a 1-d array of size ****‘m’**** indicating the number of available resources of each type.
- Available[ j ] = k means there are ****‘k’**** instances of resource type ****R********j****

### ****Max****

- It is a 2-d array of size ‘****n*m’**** that defines the maximum demand of each process in a system.
- Max[ i, j ] = k means process ****P********i**** may request at most ****‘k’**** instances of resource type ****R********j.****

### ****Allocation****

- It is a 2-d array of size ****‘n*m’**** that defines the number of resources of each type currently allocated to each process.
- Allocation[ i, j ] = k means process ****P********i**** is currently allocated ****‘k’**** instances of resource type ****R********j****

### ****Need****

- It is a 2-d array of size ****‘n*m’**** that indicates the remaining resource need of each process.
- Need [ i,   j ] = k means process ****P********i**** currently needs ****‘k’**** instances of resource type ****R********j****
- Need [ i,   j ] = Max [ i,   j ] – Allocation [ i,   j ]

Allocation specifies the resources currently allocated to process Pi and Need specifies the additional resources that process Pi may still request to complete its task.  
Banker’s algorithm consists of a Safety algorithm and a Resource request algorithm.

### Banker’s Algorithm

1. ****Active****:= Running U Blocked;

for k=1…r

New_ request[k]:= Requested_ resources[requesting_ process, k];

2. ****Simulated_ allocation****:= Allocated_ resources;

for k=1…..r //Compute projected allocation state

Simulated_ allocation [requesting _process, k]:= Simulated_ allocation [requesting _process, k] + New_ request[k];

3. ****feasible****:= true;

for k=1….r // Check whether projected allocation state is feasible

if Total_ resources[k]< Simulated_ total_ alloc [k] then feasible:= false;

4. ****if feasible****= true

then // Check whether projected allocation state is a safe allocation state

while set Active contains a process P1 such that

For all k, Total _resources[k] – Simulated_ total_ alloc[k]>= Max_ need [l ,k]-Simulated_ allocation[l, k]

Delete Pl from Active;

for k=1…..r

Simulated_ total_ alloc[k]:= Simulated_ total_ alloc[k]- Simulated_ allocation[l, k];

5. I****f set Active is empty****

then // Projected allocation state is a safe allocation state

for k=1….r // Delete the request from pending requests

Requested_ resources[requesting_ process, k]:=0;

for k=1….r // Grant the request

Allocated_ resources[requesting_ process, k]:= Allocated_ resources[requesting_ process, k] + New_ request[k];

Total_ alloc[k]:= Total_ alloc[k] + New_ request[k];

## ****Safety Algorithm****

The algorithm for finding out whether or not a system is in a safe state can be described as follows: 

> 1) Let Work and Finish be vectors of length ‘m’ and ‘n’ respectively.   
> Initialize: Work = Available   
> Finish[i] = false; for i=1, 2, 3, 4….n  
> 2) Find an i such that both   
> a) Finish[i] = false   
> b) Needi <= Work   
> if no such i exists goto step (4)  
> 3) Work = Work + Allocation[i]   
> Finish[i] = true   
> goto step (2)  
> 4) if Finish [i] = true for all i   
> then the system is in a safe state 

****Resource-Request Algorithm****  
Let Requesti be the request array for process Pi. Requesti [j] = k means process Pi wants k instances of resource type Rj. When a request for resources is made by process Pi, the following actions are taken:

> 1) If Requesti <= Needi   
> Goto step (2) ; otherwise, raise an error condition, since the process has exceeded its maximum claim.  
> 2) If Requesti <= Available   
> Goto step (3); otherwise, Pi must wait, since the resources are not available.  
> 3) Have the system pretend to have allocated the requested resources to process Pi by modifying the state as   
> follows:   
> Available = Available – Requesti   
> Allocationi = Allocationi + Requesti   
> Needi = Needi– Requesti  
>  

****Example:****

****Considering a system with five processes P********0**** ****through P********4**** ****and three resources of type A, B, C. Resource type A has 10 instances, B has 5 instances and type C has 7 instances. Suppose at time t********0**** ****following snapshot of the system has been taken:****  
 

![safety](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2016/01/safety.png)

### ****Q.1: What will be the content of the Need matrix?****

Need [i, j] = Max [i, j] – Allocation [i, j]  
So, the content of Need Matrix is:  
 

![unnamed](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2016/01/unnamed.png)

### ****Q.2:  Is the system in a safe state? If Yes, then what is the safe sequence?****

Applying the Safety algorithm on the given system,  
 

![questionsolved](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2016/01/questionsolved-1024x632.png)

### ****Q.3: What will happen if process P********1**** ****requests one additional instance of resource type A and two instances of resource type C?****

![allocation](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2016/01/Allocation.png)

We must determine whether this new system state is safe. To do so, we again execute Safety algorithm on the above data structures.  
 

![Q31](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2016/01/Q31-1024x636.png)

Hence the new system state is safe, so we can immediately grant the request for process  ****P********1 .****  
Code for Banker’s Algorithm  
 

- C++
- C
- Java
- Python3
- C#
- Javascript

|   |
|---|
|`// Banker's Algorithm`<br><br>`#include <iostream>`<br><br>`using` `namespace` `std;`<br><br>`int` `main()`<br><br>`{`<br><br>    `// P0, P1, P2, P3, P4 are the Process names here`<br><br>  `int` `n, m, i, j, k;`<br><br>  `n = 5;` `// Number of processes`<br><br>  `m = 3;` `// Number of resources`<br><br>  `int` `alloc[5][3] = { { 0, 1, 0 },` `// P0 // Allocation Matrix`<br><br>                     `{ 2, 0, 0 },` `// P1`<br><br>                     `{ 3, 0, 2 },` `// P2`<br><br>                     `{ 2, 1, 1 },` `// P3`<br><br>                     `{ 0, 0, 2 } };` `// P4`<br><br>  `int` `max[5][3] = { { 7, 5, 3 },` `// P0 // MAX Matrix`<br><br>                   `{ 3, 2, 2 },` `// P1`<br><br>                   `{ 9, 0, 2 },` `// P2`<br><br>                   `{ 2, 2, 2 },` `// P3`<br><br>                   `{ 4, 3, 3 } };` `// P4`<br><br>  `int` `avail[3] = { 3, 3, 2 };` `// Available Resources`<br><br>  `int` `f[n], ans[n], ind = 0;`<br><br>  `for` `(k = 0; k < n; k++) {`<br><br>    `f[k] = 0;`<br><br>  `}`<br><br>  `int` `need[n][m];`<br><br>  `for` `(i = 0; i < n; i++) {`<br><br>    `for` `(j = 0; j < m; j++)`<br><br>      `need[i][j] = max[i][j] - alloc[i][j];`<br><br>  `}`<br><br>  `int` `y = 0;`<br><br>  `for` `(k = 0; k < 5; k++) {`<br><br>    `for` `(i = 0; i < n; i++) {`<br><br>      `if` `(f[i] == 0) {`<br><br>        `int` `flag = 0;`<br><br>        `for` `(j = 0; j < m; j++) {`<br><br>          `if` `(need[i][j] > avail[j]){`<br><br>            `flag = 1;`<br><br>            `break``;`<br><br>          `}`<br><br>        `}`<br><br>        `if` `(flag == 0) {`<br><br>          `ans[ind++] = i;`<br><br>          `for` `(y = 0; y < m; y++)`<br><br>            `avail[y] += alloc[i][y];`<br><br>          `f[i] = 1;`<br><br>        `}`<br><br>      `}`<br><br>    `}`<br><br>  `}`<br><br>  `int` `flag = 1;`<br><br>  `// To check if sequence is safe or not`<br><br>  `for``(``int` `i = 0;i<n;i++)`<br><br>  `{`<br><br>        `if``(f[i]==0)`<br><br>      `{`<br><br>        `flag = 0;`<br><br>        `cout <<` `"The given sequence is not safe"``;`<br><br>        `break``;`<br><br>      `}`<br><br>  `}`<br><br>  `if``(flag==1)`<br><br>  `{`<br><br>    `cout <<` `"Following is the SAFE Sequence"` `<< endl;`<br><br>      `for` `(i = 0; i < n - 1; i++)`<br><br>        `cout <<` `" P"` `<< ans[i] <<` `" ->"``;`<br><br>      `cout <<` `" P"` `<< ans[n - 1] <<endl;`<br><br>  `}`<br><br>    `return` `(0);`<br><br>`}`|

**Output**

Following is the SAFE Sequence
 P1 -> P3 -> P4 -> P0 -> P2

- As the processes enter the system, they must predict the maximum number of resources needed which is impractical to determine.
- In this algorithm, the number of processes remain fixed which is not possible in interactive systems.
- This algorithm requires that there should be a fixed number of resources to allocate. If a device breaks and becomes suddenly unavailable the algorithm would not work.
- Overhead cost incurred by the algorithm can be high when there are many processes and resources because it has to be invoked for every processes.