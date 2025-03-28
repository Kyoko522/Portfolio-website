### Course Overview 
- Efficient procedures for solving large scale problems scalability
- Classic data structures and class algorithms 
- Real Implementations in Python
---
### Analysis & Design
**Analysis** refers to mathematical techniques for establishing both the correctness and efficiency of algorithms. 
	asymptotic running time complexity, space complexity, exact complexity, reductions, reductions, average-case complexity, worse-case complexity, query complexity, completeness of classes, computability theory, ...

**Design** refers to general strategies for creating new algorithms.
	reductions, divide-and-conquer, greedy, dynamic programming, search algorithm, backtracking...

Note: There is no clear cut between analysis and design. Both have a non-empty intersection from an epistemological perspective.

---
### Formal Definitions and Terminology

#### Problem
Problem -> A problem $\Pi$ is defined by specifying all possible (possible infinite) instance, which are denoted by I

Instance - input -> a problem instance I is an input of $\Pi$

Solution - output -> a problem solution is an output from $\Pi$ given a valid input I

Size of Instance -> size (I) denoted the size of instance I, which is the number of bits required to describe I

#### Algorithm
Algorithm -> An algorithm is a step-by-step process (usually is pseudocode) for carrying out a series of computations, given some appropriate input. 

Algorithm solving a problem -> An algorithm A solves a problem $\Pi$ if, for every instance I of $\Pi$, a finds a valid solution for the instance I in finite time. 

Program -> A program is a n **implementation** of an algorithm using a specific computer language 

#### Running Time
Running time for a program on a given instance -> $T_M(I)$ denotes the running time for a program M solving $\Pi$ on instance I. 

Worst-case running time for instances of size for instances of size n $$T_M (N) = max \{ T_M (I) : size(I) = n\}$$

Average-case running time for instance of size n -> $$T_M(n)^{\text{ave}} = \frac{1}{|\{l : \text{size}(l) = n\}|} \sum_{\{l : \text{size}(l) = n\}} T_M(l).$$

#### Complexity
Worst-case complexity of an algorithm -> Let f : $\mathbb{N} \rightarrow \mathbb{R}$. Algorithm A has worst-case complexity f(n) if there exists a program M implementing the algorithm A such that $$T_M (n) \in \Theta (f(n))$$

Average-case Complexity of an al
Let f: $\mathbb{N}$ $\rightarrow$ $\mathbb{R}$ An algorithm A has worst-case complexity f(n) if there exists a program M implementing the algorithm A such that $$T_M (n) \in \theta (f(n)).$$
	$\theta(f(n))$ $\rightarrow$ is the tight bound a value that is the closest approximation to the actual value of something.

##### Running Time versus Complexity
**Running time** -> can only be determined by implementing a program and running it on specific computer. 

Running time is in influenced by many factors, including the programming language, processor, operating system, etc.

**Complexity (growth rate)** can be analyzed by high-level mathematical analysis. It is dependent of the above-mentioned factors affecting running time. 

Complexity is a less precise measure than running time since it is asymptotic and it incorporates unspecified constant factors and unspecified lower order terms. 

However, if algorithm **A** has lower complexity than algorithm **B**, then a program implementing algorithm **A** will be faster than a program implementing algorithm **B** for **sufficiently large inputs**. 


#### Order Notation $\rightarrow$ Asymptotic notation
Asymptotic notation is used to express and compare the growth rate of functions. In our case, the functions will typically represent the running time of algorithms. We will define the asymptotic notations in terms of nonnegative functions, since the running time of an algorithm is always nonnegative. We will focus on the notations most commonly used in the analysis of algorithms.

Asypmptotic notation allows us to express the behaviour of a function as the input approaches infinity. In other words, it is concerned about what happens to f(n) as a gets larger, and is not concerned about the value of f(n) for small values of n.

- **$O$-notation** (Worse-case scenario)
	Let $f, g : \mathbb{N} \rightarrow [0, \infty)$. then $f(n) \in \mathcal{0} (g(n))$ if **there exists** constant c > 0 and $n_0 > 0$ such that $$0 \le f(n) \le f(n)$$ **for all** $n \ge n_0$. The complexity of f is **not higher** than that of g.


- **$\Omega$-notation** (Best-case scenario)  
	Let f$f, g : \mathbb{N} \rightarrow [0, \infty)$. Then $f(n) \in \Omega (g(n)) if **there exists** constant c > 0 and $n_0 > 0$ such that $$0 \le cg(n) \le f(n)$$**for all** $n \ge n_0$. The complexity of f is **not lower** than that of g. 


- **$\Theta$-notation (theta)** (find exact symptomatic growth)
	Let $f, g : \mathbb{N} \rightarrow [0, \infty)$. Then $f(n) \in \theta (g(n))$ if $f(n)\in\Omega (g(n)) \cap {0}(g(n))$.

- **o-notation** (show that T(n) grows slower than f(n) as $n \rightarrow \infty$)
	Let $f, g : \mathbb{N} \rightarrow [0, \infty)$. Then $f(n) \in o(g(n))$ if **for all** constant c > 0, **there exists**      $n_0$ > 0 such that $$0 < f(n) < cg(n),$$
	**for all** $n \ge n_0$. The complexity of f is **lower** than that of g. 


- **$\omega$-notation** (show that T(n) grows faster than f(n) as $n \rightarrow \infty$)
	Let $f, g : \mathbb{N} \rightarrow [0, \infty)$. Then $f(n) \in \omega (g(n))$ if **for all** constant c > 0, **there exist** $n_0 > 0$ such that $$0 < cg(n) < f(n),$$ **for all** $n \ge n_0$. The complexity of f is **higher** than that of g.

| Notation       | Meaning                            | Use Case                   |
| -------------- | ---------------------------------- | -------------------------- |
| $O(f(n))$      | Upper bound (not stricter)         | Worse-case complexity      |
| $o(f(n))$      | Strict upper bound                 | Stricter than Big-O        |
| $\Omega(f(n))$ | Lower bound (not stricter)         | Best-case complexity       |
| $\omega(f(n))$ | Strict lower bound                 | Stricter than Big-$\Omega$ |
| $\Theta(f(n))$ | Tight bound (both upper and lower) | Exact growth rate          |


![[Pasted image 20250118192935.png]]
In order notation, the upper bound is represented by O-notation, and the lower bound is represented by $\Omega-notation$. These notations are used to describe the complexity of algorithm. 
- Big O notation: represents the upper bound, or worse-case performance, or an algorithm.
- Omega notation: represents the lower bound, or best-case performance, of an algorithm.
An upper bound is a value that is greater than or equal to every element in a set. A lower bound is a value that is less than or equal to every element in a set.

In the graph
- C *g(n) represent the upper bound, because it lies above f(n) for all $n \ge n_0$. it ensures that f(n) does not grow faster than C g(n) asymptotically. 
- f(n) represents that actual function, which is the runtime or growth rate of the algorithm being analyzed 
- If there is a line that lies below f(n), it would represent the lower bound, corresponding to Big-$\Omega$ notation. However, in the graph, there is no lower bound.
#### Limit and order notation - I
Let $f, g : \mathbb{N} \rightarrow [0, \infty)$. Suppose that 
$$
L = \lim_{n \to \infty} \frac{f(n)}{g(n)}.
$$

Then

$$
f(n) \in
\begin{cases} 
o(g(n)) & \text{if } L = 0, \\
\Theta(g(n)) & \text{if } 0 < L < \infty, \\
\omega(g(n)) & \text{if } L = \infty.
\end{cases}
$$
This equation is used to comparing the growth rates of two functions and depending on the value of L, the relationship between f(n) and g(n) is categorized into 3 cases.

We have 
(1) If L = 0, then $f(n) \in O(g(n)) but g(n) \notin O(f(n))$.
(2) If $0 < L < \infty$, then $f(n) \in O(g(n))$ and g(n) \in O(f(n)).
(3) If L = $\infty$, then $f(n) \notin O(g(n))$ but $g(n) \in O(f(n)).

duality principle -> Let $f : \mathbb{N} \rightarrow [0, \infty)$ and $g : \mathbb{N} \rightarrow [0, \infty)$. We have $g(n) \in \Omega (f(n))$ **if and only if** $$f(n) \in O(g(n)).$$
Note: 
$f(n) \in O(g(n))$ means the growth rate of $f$ is *no higher* than the growth rate of $g$,
$f(n) \in o(g(n))$ means the growth rate of $f$ is *significantly less than* the growth rate of $g$, 
$f(n) \in \Omega(g(n))$ means the growth rate of $f$ is *at least as high* as the growth rate of $g$, 
$f(n) \in \omega \in (g(n))$ means the growth rate of $f$ is *significantly greater than* growth rate of $g$, and 
$f(n) \in \Theta (g(n))$ means the growth rate of $f$ is *the same as the growth rate* of $g$.

---
### Proof methods

1. Direct
2. Contraposition
3. Counterexample 
4. Contradiction
5. Induction
# Need to review and rewrite $\downarrow$
Example:
Let P be the set of primes. Assume for a contradiction that P in finite. Then |P| $\ge$ 2. Consider c = $\Pi_{p\in_P}$ and y = x + 1. Observe that there is no element of P that divides y because it would require that such an element divides 1. Clearly y is prime and $y \notin P$.

Example (a proof by contradiction):
**Statement:** There exist two irrational number x and y such that $x^y$ is rational. 
**Proof**: For a contradiction, we use that fact that $\sqrt 2 \in \mathbb{R}$ \ $\mathbb{Q}$ and consider $x = y = \sqrt2$ and $x = x^y$. Then $z^\sqrt2$ = 2 but $2 \in \mathbb{Q}$.

Principle of induction
If S(n) is a given mathematical assertion, dependent on the integer n, then to prove that it is true for $n \in \mathbb{N}$, we need only to prove that following: 
- S(1) is true
- S(2) is true implies S(K+1) is true, for all integers k $\ge$ 1.

Induction and the least counterexample -- proof method I
Induction can be slightly disguised. (T(n) is a mathematical statement, not the running time of some program.)
1. Suppose a statement T(n) is true for all n $\ge$ 1, by supposing that it is false for some n and looking for a contradiction. 
2. If T(n) is false for some n, then there must be a least integer m for which T(m) is false
3. Use the assumption that T(m) is false to prove that there exists some smaller integer k, 1 $\le$ k < m, for which T(k) is also false, 
4. This contradicts the minimality of m, and therefore T(n) must be true for all n $\ge$ 1. 
# $\uparrow$

---
### Mathematical Formulae and Facts 
1. Stirling's formula
	For all $n > 0$ and some $0 < \theta < 1,$
	$$n! = \sqrt{2\pi}n^{n+\frac{1}{2}} exp(-n + \frac{\theta}{12n}).$$
2. Geometric series and derivative
	Let n > 0 be an integer and find $\sum_{i=1}^n ix^i$ for x > 0 given that $\sum_{i=0}^n x^i = \frac{(x^{n+1} -1)}{x-1}$.
	Let S(x) = $\sum^{n}_{i=0} x^i$ and consider S'(x), first order derivative of S(x).
	Then
	$$S(x) = \frac{dS}{dx} = \sum_{i=0}^{n}ix^{i-1} = \frac{1}{x-1}((n+1)x^n)-\frac{x^{n+1}-1}{(x-1)^2}$$
	Then
$$xS'= \sum_{i =1}^nix^i=\frac{x}{x-1}((n+1)x^n - S(x))$$			For x$\ne1$
	
3. Sum of power - recursive formula
	Let $S_k(n) = \sum_{i=1}^n n^k for k \ge 0$. Then $S_0(n)=n$. By induction, we can prove
$$(1+n)^{k+1} = 1 + \sum_{i=0}^{k} \binom{k+1}{i} S_i(n)$$
4. Binary relation
	A binary relation (or more simply, a relation) on X is a set of ordered pairs $R\subset X$ x $X$ If $(x, y) \in R$, then we say that x is related to y. Equivalent notation: $(x, y)\in R, xRy,$ or just x ~ y if the relation R is fixed.

5. Equivalence relation
	A relation ~ on a set X is an equivalence relation if it satisfies the following three properties:
	1. x ~ y for all $x \in X$ (reflexivity).
	2. x ~ y if and only if y ~ x for all x, y, $\in$ X (symmetry).
	3. x ~ y and y ~ z implies x ~ x (transitivity).
~ splits X into equivalent classes. If there are m equivalent classes, then 
$$ X = \cup_{i=1}^m X_i \space\space\space and \space\space\space X_i \cap X_j \space\space for \space i \ne j$$
6. Denumerable set
	A set is denumerable if it can be made in one to one correspondence with the set of natural numbers

7. Countable set
	A countable set is a set that is either finite or denumerable. A synonym of denumerable is countable infinite. A countable set that is not finite is said to be countably infinite. 
	
---
### Probability
Probability theory is mostly described by the terms sample space, outcome, event, experience, probability of event, and random variable, define below:
- experience, observation, outcomes
	An experience is a procedure that results in exactly one of the possibly many observations

	An observation is called an outcome (or realization) of the experiment. 

	The union of all possible outcome of an experiment is the sample space (of the experiment), and denoted by $\Omega$

- Set of possible event
	A subset of a sample space is called an event
	An event that includes a single outcome of an experiment is called a simple event
	A compound event is a collection of one or more outcomes for an experiment
	The set of possible events, usually denoted by $\sum$, satisfies three axioms:
	1. Both the sample space, $\Omega$, and the empty set, $\emptyset$ are in $\sum$. 
	2. If a finite or countable number of events $\omega_1, \omega_2 ...$ belong to $\sum$, then their union and their intersection belongs to $\sum$. 
	3. If the event $\omega$, then its complement, $\Omega \space \omega \in \sum$. 

- random variable
	A random variable is a real-valued function defined on a set of events. A random variable has finite or at most a countable number of possible outcomes is called a discrete random variable. 
	
	Example: Let X be number of heads seen after flipping three fair coins. 
	$\Omega$ = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT} $\rightarrow \space \Omega$ shows that sample size or all possible outcomes after flipping 3 coins
	X({HHH}) = 3, X({THH}) = 2, X({TTH}) = 1

- probability measure
	A probability measure is a real-valued function P : $\sum \rightarrow [0, 1]$ over some set $\sum$ of possible events that satisfies that following properties. 
	1. The probability of an event $\omega \space \in \sum$ is a real number $P(\omega) \ge 0$. 
	2. $P(\Omega) = 1$
	3. If $\omega,\space\omega,...$ is a list of disjoint events from $\sum$ them
$$ P(\cup_{i=1}^\infty\omega_i) = \sum_{i = 1}^{\infty}P(\omega_i)
$$
- probability mass function of a discrete random variable
	Let X be a random variable. The Probability Mass Function (PMF) of X is given via the equality 
$$P(X = k) = \sum_{\omega\in\Omega \space X(\omega)=k}\space P(X(\omega) = k).$$
	Note: The PMF is not arbitrary! The PMF is determined by the values of random variable X over $\Omega$ and the probability measure P from the probability space ($\Omega, \sum, P$)

- probability distribution function
	The right-continuous function $F_x$ given by 
	$$F(x) = P(\omega : X(\omega)\le x)\space\space\space for\space x \in \mathbb{R}$$
	is called the distribution function or the Cumulative Distribution Function (CDF). 
	For a discrete random variable X, the distribution function is defined for every real number x as follows: 	$$ F(x) = P(X\le x) = \sum_{i\le x}P(X = i).$$
- conditional probability
	Let ($\Omega, \sum, P) be a probability space. Let A, B $\in\sum$ be two events. 
	The conditional probability P(A|B) is the probability of an event A when it is known that the event B occurred. 
		Note: In the literature, you can see the restriction P(B) > 0, but this not needed with discrete spaces because if P(B) = 0, then the conditional event cannot not happen. 
		Note: The definition may suggest that we refer to event A occurring after B occurred. We already have information about B, but not about A, and both refer to the outcome of the same experience. 

- independent events
	The events A and B are independent if P(A|B) = P(A)

- joint probability mass function
	Let X and Y be two discrete random variables defined on the same sample space $\Omega$
	The joint probability mass function is the function is P(X=x, Y=y).
	The {X = x, Y = y} we, mean {$\omega \in \Omega : X(\omega) = x\space and\space Y(\omega) = y$}.

- marginal probability mass function
	Let X and Y be two discrete random variables defined on the same sample space $\Omega$ with joint PMF P{X = x, Y = y}. 
	The marginal probability mass function of X is defined by
$$P{X = x} = \sum_y P(X = x, Y = y).$$
- independence of several events
	The n events $A_1, ..., A_n$ are called independent if, for all subset $A_i1, ..., A_ik$ of k of these events k = 2, ..., n, then we have
$$P(A_i1 \cap ... \cap A_ik) = P(A_i1) ... P(A_ik).$$

- Independence of several random variables
The n random variables $X_1, ..., X_n$ are said to be independent (mutually independent) if its CDF is the product of the product of the marginals, that is if for all ($x_1, ..., x_n$) $\in \mathbb{R}^n$, then $$
P(X_1 \le x_1,...,X_n\le x_n) = P(X_1 \le x_1) ... P(X_n \le x_n).$$
- Baye's theorem
	If a finite or countable set of events $A_1, A_2, ...$ form a partition of a sample space $\Omega$, then for any event B and an element of the partition, $A_k$, we have $$
P(A_k| B) = \frac{P(B | A_k)P(A_k)}{\sum_{j\ge1}P(B|A_j)P(A_j)} = \frac{P(B|A_k)P(A_k)}{P(B)}$$
- expectation of a discrete random variable
	Let X be a discrete random variable with the probability mass function p(X = k).
	The mean, or expected value of X is the number (if it exists), denoted E(X), and defined by$$E(X) = \sum_k kP(X = k)$$
	when ever the above sum converges absolutely. (When $\Omega$ is finite, E(X) always exists and the sum always converges.)

- variance of a discrete random variable 
	Let X be a discrete random variable with the probability mass function P(X = k). 
	The variance, if it exists, is denoted V(X), and defined by $$V(X) = \sum_k(k - E(X))^2P(X = k)),$$
	whenever the above sum converges absolutely. (When $\Omega$ is finite, E(X) always exists and the sum always converges.)

---

### Connected Notes:
[[Algorithm Analysis and Reductions]]


1. [[Algorithmic Thinking]] -> Peek finding
2. Sorting & Trees -> Event Simulation
3. Hashing -> Genome comparison
4. Namerics -> RSA encryptions
5. Graphs -> Rubik's cube
6. Shortest path -> Caltech - MIT
7. Dynamic Programming -> Image compression
8. Advanced topics -> 