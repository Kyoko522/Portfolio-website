#### Recurrence Relation
Suppose $(a_n)_{n_\ge0}$ is an infinite sequence of real numbers. 
A **recurrence relation** is a formula that expresses a general term $a_n$ in terms of one or more previous terms $a_i$ for $0\le i\le n-1$.
A **recurrence relation** also specifies initial values.
**Solving** a recurrence relation means finding a formula for $a_n$ that does not involve any previous terms $a_i$ for $0 \le i \le n-1$
Two important methods: guess-and-check  and recursion tree method
We use extensively the recursion tree method. We briefly look at the guess-and-check method before. 

#### Guess and Check Method I
Step 1: Tabulate some value $a_1, a_2, ..., a_n$ using recurrence relation
Step 2: Guess that the solution $a_n$ has a specific form, involving undetermined constants
Step 3: Use $a_1, a_2, ..., a_n$ to determine specific values for the unspecified constants
Step 4: Use induction to prove your guess for $a_n$ is correct. 

a **model** specifies that the running time of some program is $x_n = x_{n-1} + bn + c$ for some b and c such that $x_n$>0.

We measure $x_0, x_1$ and $x_2$. Use the model, we have $x_0$ = c, $x_1 = b + 2c$ and $x_2 = 3(b + c)$. Then we guess that $x_n = a_2n^2 + a_1n + a_1n + a_0$ for some $a_2, a_1$ and $a_0$. We solve the linear system: 
$$x_0 = a_0 = c$$
$$x_1 = a_2 + a_1 + a_0 = 2_c + b$$
$$x_2 = 4a_2 + 2a_1 + a_0 = 3(b + c)$$
we obtain $a_0 = c, a_1 = \frac{b}{2}$ and $a_2 = \frac{b + 2c}{2}$
Now, the induction would be used to complete the proof 

**Warning:** In any inductive proof (not just the Guess-and-check method), the exact statement of inductive hypothesis must be proven. For instance, if we guess that $f(n)\in O(g(n))$ for some positive function g, then the exact statement to prove is that $f(n)\le cg(n)$ for some c > 0, $n_0 > 0$ and for all n>$n_0$. we have to distinguish between the goal and the proof; there is a gap and pitfalls if we confuse the goal and requirements of the proof.

