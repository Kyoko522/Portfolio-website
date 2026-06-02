
## What is a Database System?

- A **Database System** is a computerized system for record-keeping, consisting of a collection of programs to create and manage databases.

- It supports operations such as:

- Adding and deleting files in the database.

- Inserting, retrieving, modifying, or removing data from the database.

- **Components of a Database System:**

- **Data:** The information stored.

- **Hardware:** The physical devices used for storage and processing.(Most case a Disk)

- **Software:** The DBMS that facilitates interaction between data and users. (All database have this may be called something else)

- **Users:** People interacting with the system, such as application programmers, end users, and database administrators(single or multiple).

  

## Database System - Data

- Databases can support either a **single user** or **multiple users**:

- **Single-user:** Typically used on small machines.

- **Multi-user:** Common in organizations, requiring considerations for data integration and sharing.

- **Data Integration:**

- The database unifies distinct files, reducing or eliminating redundancy.

- **Data Sharing:**

- Allows different users to access the same data, with customized views based on roles.

- Example: An **EMPLOYEE** file may be accessed by the personnel department, while an **ENROLLMENT** file may be accessed by the education department, each having different views but sharing common data like department info.

  

## What is a Database?

- A **Database** is a collection of persistent data used by application systems of an enterprise.

- It consists of:

	- **Entities:** Things or objects that exist, either physically or conceptually.
	
	- **Relationships:** Connections between entities.
	
	- **Properties:** Characteristics defining entities.
	
	- **Persistent Data:**

	- Data that remains stored long-term and is only removed upon explicit request.

- Initially referred to as "operational data," but now extends to other applications, such as decision support and data warehousing.

  

## Why Use a Database?

- **Shared Data:**

	- Allows existing and new applications to operate on the same data set.

- **Reduced Redundancy:**

	- Controls redundant data, ensuring consistency across updates.

- **Reduced Inconsistency:**

	- Ensures synchronized updates to all instances of redundant data.

- **Transaction Support:**

	- Groups multiple update operations into a single transaction to ensure atomicity.

- **Data Integrity:**

	- Enforces rules to maintain data accuracy (e.g., valid departments, correct working hours).

- **Security Enforcement:**

	- Restricts access to data based on user roles and permissions.

- **Support for Standards:**

	- Enforces consistent data formats and fields (e.g., address fields must be two lines long).

- **Handling Conflicting Requirements:**
	
	- Balances system design to meet overall enterprise needs while addressing individual application requirements.

  

## Data Independence

- **Data Independence** refers to the separation of the logical structure of data from its physical storage.

- **Logical Data Independence:**

	- Allows changes to logical schemas without affecting applications.

	- Example: Adding new fields to a table without modifying existing applications.
	
	- **Physical Data Independence:**
	
	- Enables changes in physical storage methods without altering logical schemas.
	
	- **Traditional File Processing:**
	
	- Data organization and access techniques are embedded in application code, making it less flexible than databases.

- **Examples:**

	- Switching from ASCII to Unicode without impacting application logic, or changing from fixed to floating-point representation.

  

## Relational Systems

- The **Relational Model**, introduced in 1969-70, is based on logic and mathematics, where data is represented as tables (relations).

- **Core Concepts:**

	- Data is organized into tables, with operators that derive new tables from existing ones.

	- Users work with tables directly, without dealing with pointers, which may be used internally for implementation.

- **Example of a Relational Database:**

- **SUPPLIER Table:** Contains supplier information.

- **PART Table:** Contains part information.

- **PART-SUPPLIER Table:** Links parts with suppliers through common attributes.

- **Key Relational Products:**

- Examples include **DB2**, **Oracle**, **SQL Server**, **Sybase**, etc.

- **Non-Relational Systems:**

- Include hierarchical, network, object, and multidimensional models.

  

## Summary

- Database systems enhance data organization by reducing redundancy, improving efficiency, supporting data sharing, and enforcing security.

- They provide data independence, allowing flexibility in system changes without affecting applications.

- The **relational model** simplifies data representation using tables, making it widely adopted in modern database systems.