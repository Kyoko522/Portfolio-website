There are two general approaches to analyse loops:
1. Use $\theta-bounds$ throughout the analysis and thereby obtain a $\theta$-bound for the complexity of the algorithm
2. Prove and O-bound and a matching $\Omega$-bound separately to get a O-bound. Sometimes this technique is easier because arguments for O-bounds use simpler upper bounds (and arguments for $\Omega$ may use simpler lower bounds) than arguments for $\Theta$-bounds do. 


### 1. 2 Bit complexity and unit cost model
Under the **unit cost model**, an operation that is considered elementary has a unit cost

What is considered an elementary operations or not depends on the context. We explain this through an example about division of polynomial, which follows.

Elementary operations can be algebraic operations, comparisons for order structures, accessing elements of a data structure on an external devices, etc.

Example (comparing two integers)
Suppose we have two ℓ-bit integers x and y. Should we consider the comparison, that is the operation x < y, as elementary or not?
1. If ℓ falls within the build-in register size of the machine (usually 64 bites), then almost surely the cost is uniform for all x, y and we can assume some fixed cost to compare x versus y. 
2. If ℓ is larger than the built-in register size, then assuming that the cost is the same for all x ,y is no longer true, especially if ℓ is variable and not known at compiled time.
		a. We may partition x and y into blocks of 64 bits and compare blocks using the native comparison operation 
		b. We may also have to proceed bit by bit if there is no built-in comparison available
	Thus, we can write the complexity of an algorithm that requires comparison, like sorting algorithms, within the unit cost model as in (1) and (2.a) or in the bit model as in (2.b).

### **Example: division of polynomials - I**
1. Let $\mathbb{K}$ be a field. For instance, $\mathbb{Z}_p, \mathbb{F}_q, \mathbb{Q}, \mathbb{R}$, or $\mathbb{C}$
2. Let T be the cost of mutiplication of two elements from $\mathbb{K}$
3. Let A(X) and B(X) be two polynomials with coefficients in $\mathbb{K}$ of degree n and m, respectively.
$$A(X) = \Sigma^n_{i = 0} a_iX^i \space and \space B(X) = \Sigma^m_{i=0}b_iX^i$$
4. Assume B(X) $\ne$ 0. 
5. Notation: ℓ(P(X)) for a polynomial P(X denotes it leading coefficient
Goal: Division of A(X) by B(X), that is, compute Q(X) and R(X) such that A(X) = B(X)Q(X) + R(X) and deg(R) < deg(B).


### Polynomial Division

We want to divide two polynomials \( A(X) \) (dividend) and \( B(X) \) (divisor) to find:
1. **Quotient**: \( Q(X) \)
2. **Remainder**: \( R(X) \)

The division must satisfy:
$$[
A(X) = B(X) \cdot Q(X) + R(X)]$$
- \( R(X) \) has a degree smaller than \( B(X) \).
- The algorithm finds \( Q(X) \) and \( R(X) \) step by step.

---

### Steps of the Algorithm
#### Inputs:
- \( A(X) \): Dividend polynomial.
- \( B(X) \): Divisor polynomial (\( B(X) \neq 0 \)).

#### Outputs:
- \( Q(X) \): Quotient polynomial.
- \( R(X) \): Remainder polynomial.

#### Algorithm:
1. **Initialize:**
   - Set \( R(X) = A(X) \) (remainder starts as the dividend).
   - Set \( Q(X) = 0 \) (quotient starts as zero).

2. **Repeat While \( $\deg(R(X)) \geq \deg(B(X))$\):**
   - **Step 2.1:** Compute \( S(X) \):
     $$[
     S(X) = \frac{\text{leading coefficient of } R(X)}{\text{leading coefficient of } B(X)} \cdot X^{\deg(R(X)) - \deg(B(X))}
     ]$$
     (This creates the term in \( Q(X) \) to eliminate the leading term of \( R(X) \).)

   - **Step 2.2:** Update \( Q(X) \):
     \[
     $Q(X) \gets Q(X) + S(X)$
     \]

   - **Step 2.3:** Update \( R(X) \): 
     $R(X) \gets R(X) - S(X) \cdot B(X)$

3. **Stop When \( $\deg(R(X)) < \deg(B(X))$ \):**
   - Return \( Q(X) \) and \( R(X) \).

---

### Key Ideas
- The algorithm reduces \( R(X) \) step by step by subtracting multiples of \( B(X) \).
- Each iteration decreases \( \deg(R(X)) \) by at least 1.

---

### Running Time
#### Key Factors:
4. **Number of Iterations:**
   - The loop runs \( \deg(A) - \deg(B) + 1 \) times because the degree of \( R(X) \) decreases by 1 in each iteration.

5. **Cost Per Iteration:**
   - Multiplying \( S(X) \) with \( B(X) \) depends on the degree of \( B(X) \) and \( Q(X) \).

6. **Total Cost:**
   \[
   O((\deg(B) + 1)(\deg(Q) + 1)(\deg(Q))T)
   \]
   - \( T \): Time to multiply coefficients.

---

### Example
Let:
\[
A(X) = X^4 + 3X^3 + 2X + 1, \quad B(X) = X^2 + 2
\]

#### Step-by-Step:
7. **Initialize:** \( R(X) = X^4 + 3X^3 + 2X + 1 \), \( Q(X) = 0 \).

8. **Iteration 1:**
   - \( S(X) = X^2 \cdot \frac{1}{1} = X^2 \).
   - Update \( Q(X): Q(X) = 0 + X^2 = X^2 \).
   - Update \( R(X): R(X) = A(X) - X^2 \cdot B(X) \).
     \[
     R(X) = X^4 + 3X^3 + 2X + 1 - (X^4 + 2X^2) = 3X^3 - 2X^2 + 2X + 1
     \]

9. **Iteration 2:**
   - \( S(X) = X \cdot \frac{3}{1} = 3X \).
   - Update \( Q(X): Q(X) = X^2 + 3X \).
   - Update \( R(X): R(X) = R(X) - 3X \cdot B(X) \).
     \[
     R(X) = 3X^3 - 2X^2 + 2X + 1 - (3X^3 + 6X) = -2X^2 - 4X + 1
     \]

10. **Iteration 3:**
   - \( S(X) = -2 \).
   - Update \( Q(X): Q(X) = X^2 + 3X - 2 \).
   - Update \( R(X): R(X) = R(X) - (-2) \cdot B(X) \).
     \[
     R(X) = -2X^2 - 4X + 1 - (-2X^2 - 4) = 0X^2 - 4X + 5
     \]

11. **Stop:** \( \deg(R(X)) = 1 < \deg(B(X)) = 2 \).

#### Final Output:
\[
Q(X) = X^2 + 3X - 2, \quad R(X) = -4X + 5
\]

---

### Summary
- **Quotient (\( Q(X) \)):** The result of dividing the polynomials.
- **Remainder (\( R(X) \)):** What is left after the division.
- **Time Complexity:** Depends on the degree of the polynomials and the cost of multiplication.



## 3SUM












### Reduction
Let $\Pi_1$ and $\Pi_2$ be two problems and suppose there exists an algorithm, hypothetical or not, for solving $\Pi_2$. Suppose also that $\Pi_2$ is used as a subroutine to solve $\Pi_1.

We reduce $\Pi_1$ to $\Pi_2$; this denoted $\Pi_1 \le \Pi_2$.

A hypothetical algorithm solving $\Pi_2$ is called oracle

The notation "$\le$" is used to suggest informally that solving $\Pi_1$ is not substantially more difficult than solving $\Pi_2$. (Things will be made more precise.)

1. The reduction must treat the oracle as a black box. This means that the input-output behaviour of the oracle is completely specified, but we have no information and make no assumptions about the internal computations that are preformed by the oracle.
2. There might be more than one call made to the oracle in the reduction 
3. For the purposes of a reduction, it does not matter if the oracle is a "real" algorithm
4. Suppose that
	1. $\Pi_1 \le \Pi_2$
	2. $A_2$ is an algorithm that solves $\Pi_2$
	Then, we can substitute $A_2$ into the code of the reduction to obtain an actual algorithm to solve $\Pi_1$
5. Reductions potentially allow re-using code, which may be advantageous


Example (multiplication $\le$ squaring)
Let x and y be two integers or reals, for instance. Then
$$xy = \frac{(x+y)^2 - (x - y)^2}{4}$$

#### From 3ARRAY-3SUM



### Connected Notes
[[Divide and Conquer]]
