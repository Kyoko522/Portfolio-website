#### Relational Algebra
There are six fundamental operation that can be performed
- Selection
`σ<cond>(Relation)`

- Projection (unary operations)
		- The **projection operator** Π\PiΠ is used to select specific attributes (columns) from a relation.
`pi<attribute>(Relation)`

- Cartesian Product
		- The Cartesian Product combines **all rows** from one relation (table) RRR with **all rows** from another relation SSS.
`R X S`

- Union
		- The **union** operation combines the rows (tuples) from two relations (tables) into a single result
`R ∪ S`

- Difference
		- The difference operation finds all the tuples (rows) that are in relation RRR but **not** in relation SSS.
`R - S`

- Renaming
		- Change the name of the table or it's attribute
`ρS(A1​,A2​,...,An​)​(R)`
Where
- S is the New table name
- A are all the new attribute names
- R is the Old relation

Other additional operation are defined to simplify
- Intersection
`R ∩ S`
This the opposite of Union where the new relation is the tuple that are in both relation
Another way to do Intersection is `R - (R - S)`
- Division
`R ÷ S` 
- Natural Join
`R ⋈ S`
- Theta-Join
`R ⋈θ S`
- Equi-join

- Assignment 
- Aggregate Function

#### Relational Calculus
While Relation Algebra is procedural language, Relational Calculus is non-procedural 

There are 2 types of relational calculus languages:
- [[# Tuple relational calculus]] - variable represent tuples
- [[# Domain relational calculus]] - variables represent values of attributes

#### Tuple Relational Calculus 
Tuple Relational Calculus (TRC) is a non-procedural query language in relational database theory. In TRC, you specify what you want to retrieve using **tuples (rows)** as variables, without specifying how the query should be executed.

Expressions in TRC are of the from `{ t | F (t) }` where t is a tuple variable and F(t) is a predicate (called formula) involving t


#### Domain Relational Calculus

Domain Relational Calculus (DRC) is also a non-procedural query language, but it focuses on **attribute values** rather than tuples. DRC specifies what to retrieve by stating conditions on the values of specific attributes.

#### Structured Query Language (SQL)

#### Query-By-Example (QBE)
A visual and intuitive database query language where users specify the structure of the desired query by providing examples in a tabular format. Instead of writing complex query syntax (like SQL), users fill in conditions and examples in a graphical or tabular interface.

- Based on domain relational
- Uses table templates to express queries
- Queries are expressed by using domain variables and constraints 
- QBE queries are expressed by example
	- User gives an example of what is desired
	- System generalizes this example to find the answer to the query

