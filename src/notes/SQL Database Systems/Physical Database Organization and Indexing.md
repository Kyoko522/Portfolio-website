### Physical Storage

Databases use a hierarchy of storage mediums for managing data efficiently, categorized as follows:

---

### Storage Mediums

1. **Primary Storage**
	- **Main Memory**: Temporary storage for active data processing.
	- **Cache Memory**: Speeds up access to frequently used data.
	- **Characteristics**:
		- **Fast** but **volatile** (data is lost when power is off).
		- **Expensive** and has limited capacity.
		- Directly processes data loaded from secondary storage.

2. **Secondary Storage**
	- **Magnetic Disk Storage**: Used for active database storage (e.g., HDDs).
	- **Flash Memories**: Includes solid-state drives (SSDs) and USB sticks.
		- SSDs are faster but more expensive than HDDs.
	- **Characteristics**:
		- Larger capacity than primary storage.
		- **Non-volatile**: Retains data even when power is off.
		- Slower than primary storage.
	- **Challenges**:
		- Disk failures can cause data loss.
		- Data must be copied to primary storage for processing.

3. **Tertiary Storage**
	- **Magnetic Tapes**:
		- Primarily for backups and archival data.
		- Sequential access only (no random access).
		- Slow but cost-effective.
	- **Optical Disks**:
		- Similar to CDs, often used for backups.
		- Less popular due to slow speed and write issues.

---

### Disk Device Types

1. **Solid-State Drives (SSDs)**:
	- Faster access times as they have no moving parts.
	- Uses **EEPROM (Electrically Erasable Programmable Read-Only Memory)**.
	- Expensive compared to mechanical drives.

2. **Mechanical Drives (HDDs)**:
	- Consist of magnetic disks (platters) with moving heads.
	- **Structure**:
		- **Tracks**: Concentric circles on the disk surface.
		- **Cylinders**: Tracks of the same diameter across multiple platters.
		- **Sectors/Blocks**: Smallest unit of data transfer.
	- Slower than SSDs and prone to mechanical wear.

---

### Disk Parameters

**Access Time**: Time required to transfer a block of data from disk to main memory.

- **Components**:
	1. **Seek Time**: Time to move the read/write head to the correct track.
	2. **Rotational Delay**: Time for the desired block to rotate under the read/write head.
	3. **Block Transfer Time**: Time to read/write the block once located.

**Formula**: `Access time = Seek time + Rotational delay + Block transfer time`

---

### Indexing

#### Hashing

Hashing is used for efficient searching, insertion, and deletion in a database.

- **Searching**:
	- Find the bucket address using the hash function \( h(K_i) \).
	- Search the bucket for the record.

- **Insertion**:
	- Find the bucket address using \( h(K_i) \).
	- Insert the record into the bucket.

- **Deletion**:
	- Find the bucket address using \( h(K_i) \).
	- Delete the record (if it exists) in the bucket.

---

#### Properties of a Good Hash Function

1. **Uniform Distribution**:
	- Key values should be distributed evenly across all buckets.
	- Each bucket should hold approximately the same number of records.

2. **Random Distribution**:
	- Keys are distributed randomly across buckets.
	- Prevents clustering in specific buckets.

**Example**:
- A hash function \( E \mod B \), where \( E \) is the employee number and \( B \) is the number of buckets, distributes keys uniformly if there are no gaps in \( E \).
- However, if all keys are multiples of \( B \), clustering occurs in one bucket.

---

### Bucket Overflow

Bucket overflow occurs when the assigned bucket becomes full.

#### Causes:
1. **Insufficient Number of Buckets**:
	- Not enough buckets allocated for the expected number of records.
	- Leads to performance deterioration as search, insertion, and deletion times increase.

2. **Bucket Skew**:
	- Non-uniform distribution of keys due to:
		- Several records with the same key value.
		- Poor randomization by the hash function.

#### Solutions:
- Allocate **10–20% more buckets** than anticipated to reduce overflow risk.

---

### Techniques to Handle Bucket Overflow

1. **Open Addressing (Open Hashing)**:
	- When a bucket is full, look for the next available bucket (in cyclic order).

2. **Overflow Chaining**:
	- Maintain a linked list of overflow records for each bucket.

3. **Multiple Hashing**:
	- Use a second hash function to locate an alternate bucket.
	- If unsuccessful, apply a third hash function.

---

### Cost Effectiveness & Reliability

- **Primary Storage**:
	- Most expensive but offers the fastest access speed.
	- Used for temporary processing.
	- Volatile, so backups are essential.

- **Secondary Storage**:
	- More cost-effective and non-volatile.
	- Suitable for long-term storage of active databases.
	- Performance can be improved with:
		1. **Disk Cache**: Stores frequently accessed data.
		2. **Indexing**: Speeds up data retrieval.
		3. **File Organization**: Techniques like block clustering improve access times.

- **Tertiary Storage**:
	- Cheapest option with the highest capacity.
	- Best for long-term backups and archival purposes.
	- Slow access and primarily sequential, making it unsuitable for active operations.

---