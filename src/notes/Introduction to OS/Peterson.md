- A classic software-based solution to the critical-section problem
- May not work correctly on modern computer architectures 
- However, it provides a good algorithmic description of solving the critical-section problem and illustrates some of the complexities involved in designing software that addresses the requirements of mutual exclusion, process, and bounded waiting requirements
Peterson's solution is restricted to two process that alternate executions between their critical sections and remained sections

Prelim Peterson's Algorithm without the turn variable 
```c 
boolean flag[2];

void P0(){
	while (true) = true;
	flag [0] = true;
	
	while (flag [1])
	/*critical section*/
	flag[0] = false;
	/* remainder*/
	}
}

void P1()
{
	while (true) {
	flag[1] = true; 

	while flag[1] = false;
	/*crutucal section */;
	flag [1] = false;
	/* remainder*/
	}
}

void main()
{
	flag [0] = false;
	flag [1] = false;
	parbegin (P0, P1);
}
```

Peterson's Algorithm for Two Process
```c 
boolean flag[2];
int turn;

void P0(){
	while (true){
	flag[0] = true; //wants to enter the critical section
	turn = 1;
	
	while (flag [1] && turn == 1);
	/*critical section*/;
	flag[0] = false;
	/* remainder*/
	}
}

void P1()
{
	while (true) {
	flag[1] = true; 
	turn = 0;
	
	while (flag[0] && turn ==0);
	/*critical section */;
	flag [1] = false;
	/* remainder*/
	}
}

void main()
{
	flag [0] = false;
	flag [1] = false;
	parbegin (P0, P1);
}
```

int turn -> indicates whose turn is to enter its critical section
boolean flag[2] -> used to indicate if a process is ready to under its critical section 