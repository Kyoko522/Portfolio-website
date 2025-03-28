[![](https://mermaid.ink/img/pako:eNqtVttq4zAQ_RUh6Fv7A3kzjbuUTdPQpAuBgJm1prY2tuSV5Swmyb-v5EvukgutH0wcnzkzZ27ylsaSIR1RVGMOiYJ8JcjJFb7MJq_LMCS73cOD3JJ5MAnelmREVjSFckX96EkY_AobsIY1DsKDxSKcjoPpY2ujMJaKDVqNw_H74-L5ddpHRRiyKtZcikHbWbB8CaeLxjJBfYUf8jwL3hYHgn9SrUvChdPp3pjtrNn8-cc0OIYss1bludndHQmF5romYyxjxYtW0RmmK8f2_F97caExQUVKyEDVEWdk9tONwrzIZI1ocU83cAxjnkPWs0EuK6HdMFnpUoNgXCRRAXWOQl8Evr9U27aKR0iGsMGv6tiAilNQRNcFRvIjakhv6ACNxChQOrI_3f5YpcCWxUGBgt0guNJ-0veeBIDWhg9E_OUsNLHZm03BkfYaqHmOzS3iwvfW1NsdjZYasiiVlSojOyLI3Fi5QdUwNvCBtB0H35O1wy747tY5ELvHoB2TDnlL9lkhHIRXsvud5RHdzdx3TX2nowDO3HnpfeaoU-nS2oM-MRQny9Vb3sJMqU9sH5-AHN1vgTGF5XDHHTe3N6iSJwJ8Xdf7_SN_R2bHZ-iHsOMJ4Aba_mmdKvxbcYU39u4pvkOxqFzzLLvUTu9pjio3NTdfB41Yc4qnhnNF7aHFQK3tmWVxUGk5r0VMRx-QlXhPlaySlI60qsxDVdhqd18XHWT_H_d-Tn4?type=png)](https://mermaid.live/edit#pako:eNqtVttq4zAQ_RUh6Fv7A3kzjbuUTdPQpAuBgJm1prY2tuSV5Swmyb-v5EvukgutH0wcnzkzZ27ylsaSIR1RVGMOiYJ8JcjJFb7MJq_LMCS73cOD3JJ5MAnelmREVjSFckX96EkY_AobsIY1DsKDxSKcjoPpY2ujMJaKDVqNw_H74-L5ddpHRRiyKtZcikHbWbB8CaeLxjJBfYUf8jwL3hYHgn9SrUvChdPp3pjtrNn8-cc0OIYss1bludndHQmF5romYyxjxYtW0RmmK8f2_F97caExQUVKyEDVEWdk9tONwrzIZI1ocU83cAxjnkPWs0EuK6HdMFnpUoNgXCRRAXWOQl8Evr9U27aKR0iGsMGv6tiAilNQRNcFRvIjakhv6ACNxChQOrI_3f5YpcCWxUGBgt0guNJ-0veeBIDWhg9E_OUsNLHZm03BkfYaqHmOzS3iwvfW1NsdjZYasiiVlSojOyLI3Fi5QdUwNvCBtB0H35O1wy747tY5ELvHoB2TDnlL9lkhHIRXsvud5RHdzdx3TX2nowDO3HnpfeaoU-nS2oM-MRQny9Vb3sJMqU9sH5-AHN1vgTGF5XDHHTe3N6iSJwJ8Xdf7_SN_R2bHZ-iHsOMJ4Aba_mmdKvxbcYU39u4pvkOxqFzzLLvUTu9pjio3NTdfB41Yc4qnhnNF7aHFQK3tmWVxUGk5r0VMRx-QlXhPlaySlI60qsxDVdhqd18XHWT_H_d-Tn4)

#### ER Diagram Entity Symbols

An entity can be any real-world object that forms that basic structure of a database. for instance. person, a tree, an organization, an event, or any other livigng/non-living thing can be any entity 

As an analytical tool, IDEF0 lets the modeler define the functions. the functions includdce executiong the requriedmateter, cjeckiong the correctness of the current system, and checking the ecisting syste's mistakes.

| Symbol                               | Name               | Description                                                                                                                                                                                             |
| ------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![[Pasted image 20240915134944.png]] | Entity             | This is a basic entity that is represented by a rectangle with its name inside                                                                                                                          |
| ![[Pasted image 20240915135006.png]] | Weak Entity        | This is an entity that can't solely be identified with its attribute(due to the absence of a primary key). It inherited the identifier of tis parent entity and often integrated it with a particle key |
| ![[Pasted image 20240915135134.png]] | Associative Entity | This is a special entity that is mostly used in many-to-many relationships with all its relationships as "many"                                                                                         |

#### ER Diagram Relationship Symbol
In an ER diagram, relationship would simply define how two or more entities are connected to each other

| Symbol                               | Name                             | Description                                                                                                                                                                                                   |
| ------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![[Pasted image 20240915135328.png]] | Strong Relationship              | A strng relationship is depicted by a single rhombus with its name isnide. In this, an entity is indepentent - that is, it s primary key of any chikld doesn't contain the proimary key of the linked enitity |
| ![[Pasted image 20240915135445.png]] | Weak or Identifying Relationship | A weak relationship is depicted by a single rhombus with the name inside. in this, the child is dependent on the parent entity as its primary key would contains a component of the paren's primary key       |
#### ER Diagram Attribute Symbols
In any set of ER diagram symbols, you can find all kinds of attributes that would define the value or property of any entity. For instance, if a pen is an entity, then its attributes could be color, size, material, and so on.

| Symbol                               | Name                   | Description                                                                                                                                                                          |
| ------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![[Pasted image 20240915135909.png]] | Attribute              | A basic attribute is represented by a single oval with its name written inside                                                                                                       |
| ![[Pasted image 20240915135937.png]] | Key Attribute          | This is a special attributre that is used to uniquely identifgy an entity. it is represented by an oval with its name underlined                                                     |
| ![[Pasted image 20240915140045.png]] | Multi-valued attribute | These are teh attrivute that cna be have mitlitple values (like name attribute can have first and last name) and are represented by a double oval                                    |
| ![[Pasted image 20240915140156.png]] | Derived Attribute      | A derived attribute might not be physical present in the database and could be logically derived from any other attribute (represented by a dotted oval)                             |
| ![[Pasted image 20240915140243.png]] | Weak Key Attribute     | It is an attribute that might be derived from any other attribvute, nit it would have unique idnetifiers for teh entity, it is represented by a dooted oval with its name underlined |

#### ER Diagram Inheritance Symbols
Lastly, when we cover entity relationship diagram symbols, we have a to consider the inheritance between child and parent entities, Ideally the inheritance for a relationship between entities can be of these types

| Symbol                               | Name                   | Description                                                                                                               |
| ------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ![[Pasted image 20240915140554.png]] | Partial Participation  | This is depicted that not all the netnities in the set are a part of the relationshiop and is depouicted bya. single line |
| ![[Pasted image 20240915140635.png]] | Total Participation    | This means that all the entities in the set are in a relationsho ad are depictedf by a double line                        |
| ![[Pasted image 20240915140710.png]] | Optional Participation | This mean that the entities don't have a mandatory partition in the set and are represented by a dotted line.             |

### Crow's Feet Notation ER Diagrams

In the Crow’s Foot notion, three major symbols can be used in different ways to depict cardinality:

- A ring that represents a zero
- A dash that represents one.
- Crow’s Foot that represents many.

These **ER diagram symbols** can be paired in different ways to depict the overall cardinality in our database. In these diagrams, the inner component depicts a minimum while the outer component depicts a maximum value.

##### One to One

This is also known as a Mandatory One relationship in which one entity of set A can be associated with a maximum of one entity of set B. For instance, one student can register for several courses, but all the courses can only have a single registered user.

##### One to Many

In this, one entity of set A can be associated with multiple entities of set B. If you consider a class, then one class can have multiple students enrolled. It is also known as an Optional One cardinality.

##### Many to One

This means that many entities of Set A can be associated with at most one entity of Set B. For example, many students can belong to the same class.

##### Many to Many

Lastly, in this cardinality, more than one entity of Set A can be associated with more than one entity of Set B. For instance, several students in a class can be allocated to multiple faculty members.
![[Pasted image 20240915141252.png]]