The scheme that will be used for the first few points is 

```
student(StudentNo, StudentName, Degree, GPA, CourseNo, CourseName, Credits)
```
#### Problems with Bad Database Design
Types of anomalies that we face with a bad database system:
- Update anomalies
	- Direct consequence of redundancy
	- We could update the GPA in one tuple while leaving as is in other tuples for the same student
- Insertion anomalies
	- We cannot insert a new course unless one student is taking it 
	- Could use NULL value but that would introduce problems of their own
		- In general, use NULL values only when unavoidable
- Deletion anomalies
	- Inverse of the last problem
	- If we delete all student taking a course, we also lose unintentionally information on the course

---
#### Decomposition
Process of splitting a single relation into two or more relations. This is done to avoid redundancy and maintain data integrity

Advantages
- Eliminates redundancy
- Prevent anomalies (Update, Insertion, Deletion)

Requirements
- Lossless-Join Property:
	- Ensures no spurious tuples are generated when relations are joined 
- Dependency Preservation:
	- Ensures functional dependencies remain enforceable without joins
---
#### Functional Dependencies
A set of attributes, X functionally determine another set, Y, if: 
- X -> Y: The value of X uniquely determine Y
Examples: 
1. StudentNo -> StudentName: Student number determines student name
2. CourseNo -> CourseName, Credits: Course number determines course details. 

Types of Relationship Captured by FDs:
1. One-to-Many
2. One-to-One
3. Many-to-Many
---
### Normalization Theory
The process of organizing a database to reduce redundancy and eliminate anomalies
- Each normal form imposes stricter constraints than the last
- Popular normal forms: 1NF, 2NF, 3NF, BCNF, 4NF, 5NF
---
#### First Normal Form (1NF)
A table is 1NF if: 
1. Each column contains atomic (indivisible) value
2. There are no repeating group or arrays
3. Each row is unique (typically enforced by a primary key)

Before 

| StudentID | Name  | Courses        |
| --------- | ----- | -------------- |
| 101       | Alice | {CS101, CP102} |
| 102       | Bob   | CS103          |

After

| StudentID | Name  | Courses |
| --------- | ----- | ------- |
| 101       | Alice | CS101   |
| 101       | Alice | CS102   |
| 102       | Bob   | CS103   |

#### Second Normal Form (2NF)
A Table is 2NF if:
1. It is in 1NF
2. Every non-key attribute is fully functionally dependent on the primary key or candidate key
	- No partial dependency

Full Functional Dependency
- A functional dependency X -> Y is a full dependency if removal of any attribute from X means that the dependency does not hold

Partial Dependency
- A functional dependency X -> Y is a partial dependency if there is some attribute A is element X that can be removed from X and dependency will still hold

Before

| StudentID | CourseID | Instructor | StudentName |
| --------- | -------- | ---------- | ----------- |
| 101       | CS101    | Dr.Smith   | Alice       |
| 101       | CS102    | Dr.Brown   | Alice       |
| 102       | CS103    | Dr.White   | Bob         |
After: using Decomposed Tables

| StudentID | StudentName |
| --------- | ----------- |
| 101       | Alice       |
| 102       | Bob         |

| StudentID | CourseID | CourseName |
| --------- | -------- | ---------- |
| 101       | CS101    | Dr. Smith  |
| 101       | CS102    | Dr. Brown  |
| 102       | CS103    | Dr. White  |
Fix: Separate StudentName into it's own table, remove partial dependency
Note: 2NF says we can't have a non-prime attribute that depends on part of the candidate key. In other words all attributes that are not a key have to depend on all they keys not just one key.
#### Third Normal Form (3NF)
A table is in 3NF if: 
1. It is in 2NF
2. There are no transitive dependencies
	- A non-key attribute should not depend on another non-key attribute

Formal Definition: Each non-prime attribute in a table should depend on every candidate key; it should never depend on part of a candidate key; and it should never depend on other non-prime attributes.

Before:

| CourseID | CourseName     | InstructorID | InstructorName |
| -------- | -------------- | ------------ | -------------- |
| CS101    | Intro to CS    | 1            | Dr. Smith      |
| CS102    | Data Structure | 2            | Dr. Brown      |
Issue: InstructorName depends on InstructorID, not directly on the primary key (CourseID). 

After: Use Decomposed Table
1. Course Table

| CourseID | CourseName      | InstructorID |
| -------- | --------------- | ------------ |
| CS101    | Intro to CS     | 1            |
| CS102    | Data Structures | 2            |
2. Instructor Table

| InstructorID | InstructorName |
| ------------ | -------------- |
| 1            | Dr. Smith      |
| 2            | Dr. Brown      |
Fix: Move InstructorName to a separate table

#### Boyce-Codd Normal Form (BCNF)
A table is in BCNF if: 
1. It is in 3NF
2. For every functional dependency X -> Y, X must be a superkey

Note: Every attribute in a table should be dependent on the key, the whole key and nothing but the key

Before: 

| StudentID | CourseID | Instructor |
| --------- | -------- | ---------- |
| 101       | CS101    | Dr. Smith  |
| 102       | CS101    | Dr. Smith  |
- Functional Dependency: CourseID -> Instructor
- Issue: CourseID is not a super-key

After: Decomposed Tables:
1. Course Table

| CourseID | CourseName |
| -------- | ---------- |
| CS101    | Dr. Smith  |

2. Enrolment Table

| StudentID | CourseID |
| --------- | -------- |
| 101       | CS101    |
| 102       | CS102    |
Fix: Separate Instructor into its own table

---
#### More on Functional Dependencies
- F+ is the closure of itself and the all sets of FDs
Two methods to compute the closure

**Method 1**
- Uses inference rules
	1. Reflexivity rule - If X is a set of attributes and Y is a subset of X then X -> Y
	2. Augmentation rule - If X -> Y holds and W is a set of attributes, then WX-> WY holds 
	3. Transitivity rule - X -> Y, Y -> Z => X -> Z
	4. Union rule - If X -> Y and X -> Z holds then X -> YZ holds
	5. Decomposition rule - If X -> YZ holds then X -> Y and X -> Z hold
	6. Pseudo-Transitivity rule -> If X -> Y and WY -> Z hold then WZ -> Z holds

Terms (Armstrong's inference rules)
- Sound -> they generate only the correct FDs
- Complete -> they generate all FDs

**Method 2**
- Algorithm to compute X+
```
X+ := X;
repeat
	old X+ := X+'
	for each FD Y -> Z in F do
		if Y subset of X+
		then X+ := X U Z;              (X union Z)
	until (old X+ = X+);
```

**Desirable Properties of Decomposition**
- Lossless-join decomposition
	- required for semantic correctness
	- when we join the decomposed relations, we should get back exact original relation contents
		- No spurious tuples 
- Dependency preservation
	- required for efficiency
	- If checking a dependency requires joining two or more relations, it is very inefficient to enforce this FD 
		- requires join when inserting a tuple
#### Deriving 3NF: Bernstein's Algorithm
1. Find out facts about the real world
	- Difficult step but must be done in the design of a database
	- Probably takes more time than all the other steps put together
	-Result is a list of attributes and FDs
2. Reduce the lust of functional dependencies
	- There is a straightforward polynomial algorithm
	- This step can ca be done manually for a small list
	- Algorithm can be programmed for a large list
	-Result is a minimal list of FDs
3. Finds the key
	- Difficult steps 
	-Result is a list of candidate keys
4. Derive the final schema 
	- Combine FDs with the same left hand side
	- Make a new table for each FD 
	- Add a key relation if no relation contains a key
	- Eliminate relations that contained in other relationship
	-Result in 3NF schema that is 
	- Lossless
	- Dependency preserving

---
#### Fourth Normal Form (4NF)
A Table is in 4NF if: 
1. It is in BCNF
2. It has no non-trivial multivalued dependencies (MVDs)

Before: 

| CourseID | Instructor | Textbook       |
| -------- | ---------- | -------------- |
| CS101    | Dr. Smith  | Data Structure |
| CS101    | Dr. Smith  | Algorithms     |
After: Use Decomposing 
1. Course-Instructor Table

| CourseID | Instructor |
| -------- | ---------- |
| CS101    | Dr. Smith  |

2. Course-Textbook Table

| CourseID | Textbook       |
| -------- | -------------- |
| CS101    | Data Structure |
| CS101    | Algorithms     |
Fix: Decompose into two tables to eliminate multivalued dependency


#### Fifth Normal Form (5NF)
A table is in 5NF if:
1. It is in 4NF
2. It has no joint dependencies (JD)

Before: 

| StudentID | CourseID | ProjectID |
| --------- | -------- | --------- |
| 101       | CS101    | P1        |
| 101       | CS102    | P2        |
| 102       | CS101    | P1        |
After: 
1. Student-Course Table

| StudentID | CourseID |
| --------- | -------- |
| 101       | CS101    |
| 101       | CS102    |
| 102       | CS101    |

2. Course-Project Table

| CourseID | ProjectID |
| -------- | --------- |
| CS101    | P1        |
| CS102    | P2        |

3. Student-Project Table

| StudentID | ProjectID |
| --------- | --------- |
| 101       | P1        |
| 101       | P2        |
| 102       | P1        |
Fix: Split into multiple tables to ensure no dependency on join order

---
### Summary Table

| Normal Form | Key Concept                            | Example Fix                                    |
| ----------- | -------------------------------------- | ---------------------------------------------- |
| 1NF         | Atomic values, no repeating groups     | Split multi-valued attributes into row         |
| 2NF         | No partial dependenct on compisite key | Decompose tables based on partial dependencies |
| 3NF         | No transitive dependencies             | Move transitively dependent attributes         |
| BCNF        | Determinants must be superkeys         | Decompose to remove non-superkey dependencies  |
| 4NF         | No multivalued dependencies            | Split independent multi-valued attributes      |
| 5NF         | No join dependencies                   | Decompose to eliminate join dependency issues  |
