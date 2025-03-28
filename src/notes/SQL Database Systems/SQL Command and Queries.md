#### The Basic Data Types that are in SQL
- NUMBERIC -> A Integer 
	- NUMERIC(size)
	- NUMERIC(size, d)
- DECIMAL -> for a decimal number
- REAL -> single-precision floating point with implementation-dependent precision
- Double precision -> implementation-dependent double-precision number
- FLOAT(p) -> provide binary precision greater than or equal to p
- CHAR(size) size character long, pads on the right with blank for shorter strings
	- Using Char is equal to char(1)
- VARCHAR(size): No blank padding is done
- DATE -> YYYY-MM-DD
- TIME -> HH-MM-SS

#### The Basic DDL Statement
Three basic statements
- CREATE TABLE
	- Create a new table
	- Takes various types of constraints into consideration
- ALTER TABLE
	- Used to update/modify an existing table
- DROP TABLE
	- To delete tables

#### Creating table statement (`CREATE TABLE`)
- NULL values
	- NULL values are used to represent information that is out of bounds
	- NULL values alleviate the need to use blanks, 0, -1 to indicate
		- not available
		- not applicable
		- unknown
	- By default, NULL values are allowed 
	
	
- Default values
	- Used when no values is given when a tuple is inserted into the table 

- Candidate keys
	- Any attribute that is UNIQUE is considered a Candidate key 

- Primary Keys
	- One of the candidate keys
		- Attach special significance/characteristics
		- Only one primary key per table
		- No NULL values are allowed in primary key column(s)
		- Note when an attribute is declared as a primary key remove the UNIQUE attribute as that will cause any error

- Foreign keys
	- A combination of columns of one relation that references primary key attributes of a second relation
		- A tuple in the first table can exist only if there is a tuple in the second table with the corresponding primary key
	- AKA [[# referential integrity]] constraints

- Check conditions
	- Can be used to ensure that every row in the table satisfies the condition
		- Can only use values in a single row of the table
	- Conditions can be any valid expression that evaluates to TRUE or FALSE
		- Can contain functions, any column from this table, and literals
	- Use column constraints form for a single column constraints.
	- Use table constraint from for multi-column constraints.

#### [[# Referential integrity]] actions
- SET DEFAULT 
	- When a reference row is deleted or updated, the foreign key is the referencing table is set to its default value
- SET NULL 
	- When a referenced row is deleted or updated, the foreign key in the referencing table is set to NULL
- CASCADE
	- Changes in the referenced table are propagate to the referencing table:
		- If a row is updated, the foreign key value is the reference table is updated as well.
		- If a row is deleted, the corresponding rows in the referencing table are also deleted. 
- NO ACTIONS
	- No automatic action is taken. The operation (e.g., DELETE or UPDATE) is rejected if it violates referential integrity constraints. 

#### Dropping Tables
- We can use DROP TABLES in the following order for successful deletion of tables
```sql 
DROP TABLE enrolled; 
DROP TABLE teaches;
DROP TABLE can_teach;
DROP TABLE student;
DROP TABLE course;
DROP TABLE professor;```
![[Pasted image 20241202122920.png]]
- You can force deletion of a table by dropping all integrity constraints that refers to the columns in the dropped table
	- Use CASCADE CONSTRAINTS option 

#### Altering Tables
There are two ways to modify a table
- Modify a column's definition
```sql
ALTER TABLE professor ADD (
	Rank CHAR
);
```
or
```sql
ALTER TABLE professor MODIFY (
	Rank CHAR(2)
);
```
- Add/delete a column
	- You can add a column at any time if NOT NULL is not specified
	- *You cannot use NOT NULL as in*
```sql
ALTER TABLE professor ADD (
	Rank CHAR NOT NULL
);
```
This isn't allowed and won't work the corrects steps to implement NOT NULL are
1. Add the column without specifying NOT NULL 
2. Fill every row in the new column with proper data
3. Modify the column to be NOT NULL

- Modifying a column
	- In general, you can
		- Increase a character column width at any time 
		- Increase the number of digits in a NUMBER column at any time
		- Increase/decrease the number of decimal places of a NUMBER column at any time
	- Only if a column has NULL for all rows, you can 
		- Change its data type
		- Decrease a character column width
		- Decrease the number of digit in a NUMBER column


### SQL Queries

##### Select Queries (Basic Structure of all Queries)
```sql
SELECT A1, A2, ..., An
FROM r1, r2, ..., rn
WHERE cond
```
`WHERE` Is a optional clause

Select
- What attributes will be seen
 \* -> to list all attributes  
 DISTINCT -> to eliminate duplicates

From
- List of tables that data is coming from

Where
- Condition statement that will help filter the data that is seen
\> -> greater than
\>= -> greater than or equal to
< -> less than
\<= -> less than or equal to
<> -> not equal to

Logical operators AND, OR, and NOT can be used to combine several simple conditions

	NOT   highest
	AND   middle
	OR    lowest
Parentheses can be used to override the default precedence

Example
List all students (student names only) who are enrolled in Prof. Post's "Introduction to Database Systems" course 

```sql
SELECT StudentName
FROM course c, enrolled e, student s
WHERE c.CourseName = 'Introduction to Database Systems'
	AND ProfName = 'Post'
	AND c.CourseNo = e.CourseNo
	AND e.StudentNo = s.StudentNo;
```

SQL supports three set operations
- SQL supports three set operations
	- Intersection
	- Difference (EXCEPT or MINUS)
	- UNION

- For example we can use
	- EXISTS to implement intersection
	- NOT EXIST for EXVEPT or MINUS


#### Aggregate Functions
Aggregate functions take a set/multiset of values and return a single value

SQL provides five aggregate functions
- Average: AVG
- Minimum: MIN
- Maximum: MAX
- Total: SUM
- Count: COUNT
In ORACLE provides some more: 
- Variance: VARIANCE
- Standard deviation: STDDEV


#### Grouping in SELECT Statements
Order of Execution
- Chooses rows using WHERE clause 
- Groups these rows based on the GROUP BY clause 
- Calculates the results of the aggregate functions for each group
- Uses HAVING clause to choose/eliminate groups 
- Uses ORDER BY to order groups
	- ORDER BY must be either
		- an aggregate functions, or
		- a column in the GROUP BY clause

• Use GROUP BY to aggregate data by specific columns.
• Combine GROUP BY with aggregate functions like COUNT, AVG, SUM.
• Use HAVING to filter groups after aggregation.
• Use DISTINCT within aggregate functions to remove duplicates.
• Combine multiple columns in GROUP BY for more granular grouping.
• Incorporate subqueries for dynamic filtering or comparison.


##### Deletion from a Table

```sql
DELETE FROM table
WHERE <cond>
```

this can be combined with 

```sql
SELECT ProfName
 FROM professor p
 WHERE NOT EXISTS
 (SELECT *
  FROM teaches t
   WHERE p.ProfName=t. ProfName);
```



### Views 
- View defines a virtual table (as opposed to base tables)
- You can specify attributes that created view would have
```sql
CREATE VIEW potential_TA1(TA_StudentNo, TA_name, GPA) 
	AS (SELECT StudentNo, StudentName, GPA
	FROM student
	WHERE Degree = 'B.C.S'
			AND GPA >= 10);
```
- View can be deleted by using DROP VIEW `DROP VIEW potential_TA`
- View cans be used just like base tables in queries 
- Insertions/updates: are the same a regular tables
```sql
INSERT INTO potential_TA1 VALUES (13243, 'Connie Smith', 11.3); 

INSERT INTO potential_TA1(TA_StudentNo, TA_name) VALUES (43243, 'Major Smith');
```
- A view can be read-only using `WITH READ ONLY`