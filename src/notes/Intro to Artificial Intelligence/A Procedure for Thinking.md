### Overview of this Chapter
1. Types of sentences included in the knowledge base and some examples 
2. the notion of logical entailment
3. The back-chained procedure
4. complex behaviour of back-chaining involving variables
5. summarizes good and less good about this procedure for thinking

#### 2.1 Atomic and conditional sentences
- Atomic sentences, that is, simple basic sentence whos exact form is left unspecified for now
- Conditional sentence, that ism, sentence fo- the form if P1 and l.. and pn thane 1, where pi and the q are atomic sentences

Examples: 
![[Pasted image 20240908200441.png]]
##### **What This Example Demonstrates:**

1. **Representation of Knowledge:** It shows how relationships and facts (family ties and genders) can be represented in a knowledge base using atomic sentences and conditional rules.
2. **Reasoning with Logic:** These rules allow a reasoning system (such as back-chaining) to infer new information. For example:
    - If you know that "John is a child of Sue," you can infer (using rule 1) that "Sue is a parent of John."
    - If you know that "Sue is a parent of John" and that "Sue is a female," you can infer (using rule 3 or 4) that "John and Sue are of opposite sexes."
    - If you know that "George is a father of Sue" and that "Sue is a parent of John," you can infer (using rule 5) that "George is a grandfather of John."

This example illustrates the foundation of a **knowledge-based system**, where facts and rules can be combined to make logical inferences, just like solving family tree problems. The **back-chaining** technique would be used to answer specific queries like "Is George the grandfather of John?" by tracing through these relationships step by step.

#### **Introduction to Back-chaining**

- **Conceptual Foundation:** The chapter builds on the idea that some forms of thinking can be understood as drawing conclusions from a large collection of sentences, known as a knowledge base (KB). This is akin to how arithmetic manipulates numbers, but here the focus is on symbolic structures representing propositions.
- **Back-chaining Defined:** A computational procedure akin to arithmetic operations but applied to logical reasoning. It aims to determine whether a specific query (atomic sentence) can be logically concluded from a set of predefined sentences (KB).

#### **Structure of the Knowledge Base (KB)**

- **Types of Sentences:**
    - **Atomic Sentences:** Simple declarations with no conditional elements.
    - **Conditional Sentences:** More complex structures that involve conditions leading to a conclusion, formatted as "If P1, P2, ..., Pn then Q".
- **Example KB:** Provides family relationships and gender information, which helps illustrate how back-chaining works with real-world-like data.

#### **Logical Entailment and Computational Procedure**

- **Logical Entailment:** A core concept where a query is considered true if it naturally follows from the truths held within the KB.
- **Procedure Overview:**
    1. **Direct Match:** Search for the query directly within the KB.
    2. **Conditional Search:** If not found, look for a conditional sentence that implies the query.
    3. **Recursive Process:** Use back-chaining recursively to establish the truth of each premise in the conditional sentence.
    4. **Conclusion:** Confirm the query if all premises are established; otherwise, declare failure or continue searching.

#### **Handling Variables in Queries**

- **Variable Usage:** Variables allow for generalizations in the KB, enabling broad applications from specific conditional sentences.
- **Complex Queries:** Variables complicate the back-chaining process as they require finding all applicable instances that satisfy the query conditions.

#### **Detailed Examples of Back-chaining**

1. **Simple Direct Match:** A query like "Jane is a child of Sue" is directly found in the KB.
2. **Complex Conditional Match:** For a query like "George is a grandfather of Jane," back-chaining would piece together several conditional sentences to establish a family lineage that supports the query.

#### **Challenges and Limitations**

- **Backtracking:** Essential when initial paths to establishing a query fail. The process must revisit and try alternative possibilities.
- **Loops and Tautologies:** Back-chaining can get stuck in loops or be misled by tautological statements (statements that are true by necessity without adding information).

#### **Advantages of Back-chaining**

- **Goal-Oriented:** Efficiently targets the resolution of specific queries by working backward from the query to the conditions.
- **Logical Soundness and Completeness:** Ensures that all successful conclusions are logically sound, and strives to be complete by finding all possible solutions unless structural limitations arise.

#### **Practical Applications**

- **Prolog Programming:** Back-chaining forms the basis of the logic programming language Prolog, demonstrating its practical utility in computational logic and programming.
- **Knowledge-Based Systems:** Illustrates the foundation for building systems that can reason about extensive sets of data logically.