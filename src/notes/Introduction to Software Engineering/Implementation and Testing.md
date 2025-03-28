
### Quality Assurance and Testing

- Overall image is that it's assuring that a software system meets the needs of its user

#### Verification vs. validation
- Verification -> are we building the project right?
	- The software should conform to its specification, and we try to show that
	- The final product implements the blueprint, only the blueprint, and nothing but the blueprint
- Validation -> are we building the right product?
	- The software should do what the users really require, and we try to prove that the users got what they wanted in the first place
- V&V have two principal objectives 
	- discovery of defects in the system
	- an assessment of whether or not the system will be unable in an operational situation
	- Verification can be further classified into static and dynamic verification

#### Static Verification 
- Does not require a running system
- Involves analysis on a static system representation to identify issues
- Methods include inspections, review, walkthroughs, and formal analysis if a formal specification exists
- It can be manual, with tools support, or fully automated

#### Dynamic Verification
- Often equated with actual testing of the software
- Involves running the software to observe its behaviour and identify discrepancies between what is observed and what is expected 
- May use simulation or real data from other parts of the system or a previous software version
- Can be done in isolation or integrated with the system it is meant to be a part of 

In essence, static verification is about examining the software's code, design, and documentation to find errors without actually executing the program, while dynamic verification involves executing the program in a live environment to find errors by looking at its actual behaviour against expected behaviour.

##### How much do we use  V&V 
The slide is discussing the factors that determine the extent to which verification and validation (V&V) need to be applied to a software system. Here are the points it makes:

1. **Purpose of the system:** Systems with critical functions, like air traffic control or life support, require more stringent V&V due to the potential consequences of failure.

2. **Importance to company:** The more crucial the correct operation of a product is to the success of a company, the more rigorous the V&V process should be.

3. **User environment:** Systems that are used in environments where users can tolerate or manage some errors may not need as thorough V&V.

4. **Marketing environment:** Sometimes, getting a product to market quickly may take precedence over a comprehensive V&V process to identify all possible defects.

5. **Market positioning:** If a product is positioned as a low-cost option, customers might be more forgiving of some defects.

6. **User expectations:** For some types of software, especially free software, users might have lower expectations, and thus, the software may not undergo extensive V&V.

Essentially, the slide is conveying that the level of V&V required for a software product is not one-size-fits-all but depends on various factors, including the intended use, importance, and context in which the software will operate.

#### Software inspections 
- Involve people examining the source representation with the aim of discovering anomalies and defects 
- Inspections don't require an operational system - they may be used before that actual implementation become available

#### **Formality of Inspections:**
- Inspections can be informal or formal:
    - **Informal Inspections:** Can be done at any time, less structured, and more flexible.
    - **Formal Inspections:** Have a defined process and are structured. Often referred to as reviews, these are planned and follow a specific procedure.
- The primary goal of inspections is for **defect detection**, not necessarily for immediate correction. It’s a proactive approach to identify issues early.
- Inspections are not meant to be punitive or to place blame on team members (hence the note about not using them as an excuse to fire people).
- Defects identified may include logical errors, anomalies in code, uninitialized variables, or deviations from coding standards.

#### **Inspection Success:**
- A single inspection can uncover multiple types of defects, which is efficient compared to dynamic testing where one defect might hide another (a phenomenon known as defect masking).
- Multiple test cycles may be needed in dynamic testing due to the potential for defect masking.
- Inspections rely on the expertise of the inspectors:
    - **More effective with experienced personnel:** Those with domain and programming knowledge can spot defects more readily.
    - **Familiarity with Errors:** Inspectors with prior experience are more adept at recognizing errors they have encountered before.
    - **Sensitivity to Novel Approaches:** Experienced inspectors might be more skeptical of new methods and raise concerns, even if these new methods aren’t necessarily erroneous.

#### Inspection pre-conditions 
- A precise specification must be available 
- Team members must be familiar with the organisation standards
- Syntactically correct code must be available 
- An error checklist should be prepared
- Management must accept that inspection
- Management must not use inspections for staff appraisal 

#### The inspection process
- Planning 
- Overview 
- Individual preparation 
- Inspection meeting 
- rework
- follow-up

#### Inspection checklists
- Checklist of common errors should be used to drive the inspection 
- Error checklist is programming language dependent
- The 'weaker' the type checking, the larger the checklist 
![[Pasted image 20240404010324.png]]

#### Code Walkthroughs
- Simplified version of inspections 
- Performed in teams, with different people undertaking the role of different parts for the code and enacting their interactions

#### Static analysis
1. **Static Analyzers:** These are automated tools designed for analyzing the source code without executing it (static). They process the program text to find potential errors.

2. **Error Detection:** By parsing the code, these tools aim to identify problematic or erroneous conditions, which they flag for review by the Verification and Validation (V&V) team.

3. **Role in Inspections:** Static analyzers are valuable for supporting inspections because they automate the detection of issues. However, they cannot fully replace human inspections due to the complexities and nuances that only human reviewers can understand and interpret.

4. **Data Production:** These tools are known to generate a considerable amount of data, which needs to be sifted through to find relevant issues.

5. **Comparison with Code Editors:** The slide makes an analogy with code editors that feature syntax highlighting, which can also help in identifying issues by visually distinguishing elements of the source code. However, syntax highlighting in editors is not as thorough as a comprehensive static analysis tool.

![[Pasted image 20240404010819.png]]


#### Types of testing
 1. **Defect Testing:** This involves tests that are specifically designed to find defects within the system. A test is considered successful if it can uncover these defects.
   
2. **Statistical Testing:** This type of testing is based on the frequency of user inputs and is used to estimate the reliability of the system. It reflects real-world usage to determine how likely the software is to fail.
   
3. **Usability Testing:** This testing is done to ensure that the software is user-friendly and that it fulfills its intended purpose effectively from the users' perspective.

Note: “fit” does NOT mean “completely free of defects” –it means “good enough for its intended use” instead, and the usage scenario will determine the degree of confidence that is needed

#### Testing and debugging
1. **Testing and Debugging Are Separate:** defect testing and debugging are two distinct phases within the software development lifecycle.
   
2. **Defect Testing:** This phase is about identifying whether there are defects in the program. It does not involve fixing them but simply determining their existence.

3. **Debugging:** Once a defect is known to exist, the debugging phase begins. This involves the process of locating the exact source of the defect and then repairing it.
   
4. **Debugging Process:** Debugging is a methodical process that often involves formulating hypotheses about how the program should behave, and then testing these hypotheses to isolate and correct the errors causing the defects.

![[Pasted image 20240404011624.png]]

#### Clear (Glass) Box Testing
1. **Access to Code:** Testers have direct access to the internal structure of the code that they are testing.

2. **Test Suite Construction:** Test cases are created after thoroughly inspecting the program code to understand its flow and identify potential areas where things could go wrong.
   
3. **Specification Referencing:** The specifications are used to determine the expected behaviors so that testers can identify deviations, which are flagged as errors.

4. **Testing Pathways:** The testing involves checking both control flow (e.g., if-else conditions, loops) and data flow (how data moves through the code) within the software unit, which could be a method, function, or subroutine.
   
5. **Comprehensive Coverage:** The goal is to test all possible execution paths including every statement, branch, and pathway in the code to ensure thorough testing.

6. **Developer Involvement:** Typically, the developers who wrote the code carry out White Box Testing because they have the most knowledge about the internal workings of the code.

![[Pasted image 20240404012329.png]]


#### Branch Coverage
- **Objective:** Ensure that every possible branch (i.e., outcome of a decision point) in the code is executed at least once during testing.
- **Method:** Simplify complex conditional expressions into simpler conditions that can be evaluated independently.
- **Test Suite Requirements:** Design tests to evaluate both true and false outcomes for each condition to ensure all branches are tested.
- **Consideration:** the possibility of executing all statements in a program without necessarily executing all branches, inviting contemplation on the thoroughness of testing.

#### **Path Coverage:**
- **Objective:** Execute every possible control flow path within the code at least once.
- **Challenge:** Achieving complete path coverage can be difficult or impractical, as illustrated by the example of a simple loop, where the number of possible paths can be very large.
- **Practicality:** The slide suggests that full path coverage may not always be feasible due to the complexity and the number of potential paths, especially in loops or recursive conditions.

#### Basis Path Testing:
- **Goal:** Identify and test a set of paths that together cover all possible paths in the program without redundancy.
- **Method:** Create a flowchart to represent the logic of the subroutine and use it to inform test case design.
- **Test Cases:** Design each test case to cover path segments that are not covered by other test cases, ensuring that all unique paths are tested.
- **Efficiency:** This method seeks to minimize the number of test cases while maximizing coverage by focusing on the basis set of paths that constitute all possible paths through the program logic.

	CONS
- Expensive to generate flow charts and construct test suite 
- Tedious and error-prone (unless automated)
- Has high Cyclomatic complexity

#### Cyclomatic Complexity
- **Definition:** It is a metric used for measuring the complexity of a program. It is defined by Thomas McCabe and provides a quantitative measure of the number of linearly independent paths through a program's source code.
- **Formula:** Given a control flow graph of a program, the cyclomatic complexity �(�)V(G) is calculated as �(�)=�−�+�V(G)=e−n+p, where �e is the number of edges, �n is the number of nodes, and �p is the number of connected components in the graph.
- **Simplicity and Utility:** Although the measure is simple and graph-based, it is moderately useful for measurement. However, it is quite useful for testing because it gives an upper bound on the number of test cases needed for basis path testing.

#### Application in Testing:
- **Guiding Test Cases:** It is assumed that the number of tests to test all control statements in a program equals the cyclomatic complexity. This assumes that the cyclomatic complexity can be equated to the number of conditions to be tested.
- **Clarification:** It’s important to understand that executing all paths is not the same as executing all combinations of paths.
- **Practical Example:** The slide provides an example of a binary search function, which has two possible outcomes: the object is found (along with its index), or it is not found (indicated by an index value of -1).

#### **Loop Testing:**
- **Objective:** To identify and isolate independent paths within loops and apply tests that are suitable for the particular type of loop.
- **Testing Goals:** The aim is to detect common issues such as initialization errors, indexing mistakes, incrementing errors, and errors at loop boundaries.

#### **Tests for Simple Loops:**
- **Skipping the Loop:** Verify the behaviour when the loop is not executed at all.
- **Single Iteration:** Ensure that the loop can correctly handle a case where it only runs once.
- **Double Iteration:** Check the loop's functionality when it goes through two iterations.
- **Multiple Iterations:** Test the loop for a typical number of iterations �m, as well as one less (�−1m−1) and one more (�+1m+1) than the typical count, to verify its handling of different iteration counts.
- **Branch Coverage within Loop:** Make sure to test different branching paths that might exist within the loop's body.

#### **Tests for Nested Loops:**
- **Sequential Testing:** Ideally, apply the same tests to each loop in nested loops, but this can be too costly in terms of resources.
- **Practical Approach:**
    - Start by applying simple loop tests to the innermost loop while keeping the outer loops at their minimum iteration parameters.
    - Then, apply the tests to the next outer loop, setting the inner loop to a typical value and keeping the outer loops at their minimum.
    - Continue this process, stepping outwards through the levels of nested loops.
- **Efficiency:** This method aims to thoroughly test loops in a cost-effective manner by minimizing the total number of test cases while still ensuring that the interactions between nested loops are sufficiently tested.

#### Opaque Box Testing
- Testers have limited or no access to the internal structure of the code.
- Test cases are created based on the software's specifications or requirements.
- The focus is on meeting both functional and non-functional requirements.
- The goal is to ensure the software adheres to the specified requirements and to attempt to find behaviors that deviate from the specification.

#### Opaque Box Approaches to Unit Testing:
- Unit tests are applied to individual units like classes and methods or to more complex entities like packages or the entire system.
- These tests exercise the code with valid or nearly valid inputs to verify that the output matches expectations.
- Exhaustive testing is not feasible, so test cases are selected based on their likelihood to find faults efficiently.
- Test cases are designed to "stand in" for a larger set of possible test scenarios and to find different types of faults.

#### Opaque Box Approaches to Testing:
- Functional tests are developed from customer-level requirements.
- The approach includes robustness and functional testing with valid inputs to ensure the system behaves as expected.

#### Equivalence Partitioning:
- This involves dividing inputs into classes or partitions that can be assumed to produce similar behavior from the system.
- For practical testing, representative values from each partition are selected to reduce the total number of test cases needed.
- Partitioning can be based on ranges of values, sets, or other criteria that define the equivalence class.

**Examples:**
- Negative, positive, and zero numerical values.
- Strings of different sizes, including the empty string.
- Ranges that are not correct or are not correct formats.
- Consistent input values and combinations that are not consistent.

#### Boundary Value Analysis
- More defects tend to occur at the edges of equivalence class boundaries, known as "off by one" errors.
- Array indexing differences across programming languages (starting at zero or one) can increase boundary-related errors.
- This technique enhances equivalence partitioning by focusing on values at the edge of these partitions to catch errors that are likely to occur there.

#### Equivalence Classes
- **Scalar Set Equivalence Classes:**
    - Test with values that are members of the set.
    - Test with values immediately above and below each member of the set.
    - Include the minimum and maximum possible values within the set's data type.
- **Non-Scalar Set Equivalence Classes:**
    - Check for membership in the set.
    - Test with null values (for cases where a value is not part of the set).
    - Include other values of the correct type that are not part of the set.
    - Test with values of an incorrect type that are structurally similar to valid types, especially if these might not be caught by a compiler.

#### Integration Testing
- **Strategies**: Choose between "Big Bang" or Incremental.
    - **"Big Bang"**: Test all units separately, then combine all at once, which can make error tracking difficult.
    - **Incremental**: Combine and test a few units at a time, ideally adding and testing one unit sequentially, with a focus on interface testing and limiting error scope.
#### A Small Problem in Incremental Approaches
- **Issue**: Managing the incomplete parts of the system.
- **Solution**: Use Stubs and Drivers.
    - **Stubs**: Simulate missing called units to test the current module.
    - **Drivers**: Simulate missing calling units to test the current module’s response.
![[Pasted image 20240404020733.png]]

#### Top-Down Integration
- Begin with the highest-level module and progress downwards.
- Perform regression tests with each addition to ensure no new errors.
- **Depth-First**: Integrate all modules along a major path before moving to others.
- **Breadth-First**: Integrate modules level by level across the entire system.
- The aim is to maintain a natural flow of program execution during testing.
- Stubs may be complex to emulate lower-level functionality.

#### Bottom-Up Integration
- Start testing with the most basic units (leaf modules) which don't require stubs.
- Gradually combine modules to form larger subsystems.
- Work through the caller-callee hierarchy until the entire system is integrated.
- Use drivers to feed in test inputs and handle outputs.
- The approach builds the program from fully tested units.
- Control structures and integration points are tested later in the process.

#### Sandwich Integration
- Combines top-down and bottom-up approaches.
- Applies top-down for higher-level module testing within and across groupings.
- Utilizes bottom-up strategy for lower levels.
- Aims to minimize the necessity for drivers and stubs.

#### Other Types of Testing
- **Integration and End-to-End Testing**:
    - Tests broader code components in conjunction for cohesive operation.
- **Acceptance Testing**:
    - Validates the system's behavior against business requirements.
- **Performance Testing**:
    - Assesses if the software meets non-functional requirements, like stability over time and under load.
- **Stress/Load Testing**:
    - Determines the system's breaking points and how well it handles stress.

#### Testing automation 
- Automated testing is based on the idea that tests should be executable 
- An executable test includes the input data to the unit that is being tested, the expected result and a check that the unit returns the expected result 
![[Pasted image 20240404022219.png]]

#### Test Automation
- **Structure automated tests in three parts:**
    - Arrange: Set up the system and define parameters. Use stubs and drivers for unfinished code.
    - Action: Execute the unit being tested with defined parameters.
    - Assert: Verify the outcome against the expected result.
- Use automated tests based on equivalence partitions with both correct and incorrect inputs.

#### Testing GUIs
- GUI testing is often costly to automate.
- Design products to enable feature access via API, not just the GUI, for easier automation.
- Allows the possibility to redesign the GUI without altering underlying functionality.

#### How to Test GUIs?
- Separate functionality into:
    - Model: Business logic.
    - View: Presentation with no validation.
    - Presenter (Controller): Manages user interaction.
- Use the Model-View-Controller pattern to simplify testing and mitigate reliance on manual testing.

#### How to Test Embedded Systems?
- Use hardware simulators to test software in a controlled environment.
- Validate the software by checking the hardware simulator's state after test execution.

#### How to Test Concurrency?
- Concurrent software can exhibit non-deterministic behaviour.
- Timing and order of events critically affect failure modes, which can be severe.
- Challenges include identifying these failure modes, with THERAC-25 as a historical example.
- Formal methods and simulators (like Petri nets) are used for problem identification.
- Tests are designed to replicate or prevent the failure state.
- Successful tests enter the regression suite to prevent future recurrences.

#### How to Test Database Transactions?
- Interface creation is key, acting as a stand-in for the actual database.
- Test cases use this interface to simulate the database behaviour, providing controlled data and interpreting test calls.
- This approach avoids writing/reading test data to the actual database.
- Forces failure scenarios that might be difficult to produce naturally.
- Implement a test database mirroring the production database's structure but filled with simulated data for safe and effective testing.


### On Test-Driven Development (TDD)

Write tests before the code, both in small increments, with the goal of having the code pass the tests...always
- In the traditional, sequential development, activities of design, coding, and testing are strictly (or mostly) separated into phases
- TDD lumps them together in a number of small cycles (including refactoring)
![[Pasted image 20240404024043.png]]
Image is bad from the slides can't do anything about it


#### Testing Cycle
- **Process Steps:**
    - Identify the next small step in development.
    - Create a test based on requirements to validate this step (white box approach).
    - Write and compile the test code (it will fail initially).
    - Develop the production code until the test compiles.
    - Continue coding until the test passes.
    - Seek additional tests to cover more code.

#### Cookbook Approach to TDD
- **Test-First Methodology:**
    - Write and compile the test before writing production code.
    - If the test doesn't compile, add production code to pass compilation.
    - Run the test; if it fails, adjust the production code until it passes.
    - Once the test passes, begin with a new test.
    - Repeat this cycle until the production code meets all requirements.

![[Pasted image 20240404024129.png]]


The example used here is a brief overview on what it is doing 
1. **Writing the First Test:**
    - A test is written for the function `testCenterLine()` expecting a `Formatter` class that does not exist yet. This test will not compile initially, highlighting the red-green-refactor cycle of TDD.
2. **Creating the Formatter Class:**
    - A `Formatter` class is created with no methods or properties, just enough for the test to compile.
3. **Expanding the Test and Code:**
    - A new test is added to the `testCenterLine()` method to check if a single word is centered correctly by the `Formatter`.
    - The `Formatter` class is updated with `setLineWidth` and `center` methods, but with minimal code to satisfy compilation. The test fails because the methods are not yet implemented correctly.
4. **Making the Test Pass:**
    - The `Formatter` class is enhanced with actual logic to center a line within a given width, using padding with spaces.
    - A bug is encountered because of incorrect padding calculation, demonstrating that tests can uncover unexpected issues.
5. **Refining the Code:**
    - The code for padding calculation is corrected to ensure that the centered string has correct spacing on both sides.
    - The updated code now passes the tests, illustrating the iterative nature of TDD.
6. **Adding More Tests:**
    - Additional tests are written for edge cases, like centering odd-length strings, guiding further development and refinement of the `Formatter` class.
7. **Principles and Benefits:**
    - The document stresses the importance of isolation (testing the module independently), simplicity, increasing generality, and writing tests to cover boundary cases and decision points.
    - Benefits of TDD mentioned include better code coverage, repeatability, documentation, reduced need for debugging, improved API and system design, and the positive effect on maintenance.
8. **Challenges Noted:**
    - It acknowledges that TDD can feel inefficient at times due to the small increments and extensive test code that requires maintenance. However, the benefits often outweigh these concerns.

#### Benefits of Test-Driven Development (TDD)
- **Coverage**: Almost all production code is covered by unit tests if TDD rules are followed, although not necessarily every pathway.
- **Repeatability**: Tests are repeatable at any stage, aiding in continuous validation of the codebase, especially after modifications.
- **Support for Code Changes**: Tests provide a safety net that encourages and validates changes in the code.
- **Documentation**: Tests serve as a form of documentation, clearly describing both expected behaviour and the API.
- **Simplicity**: Unit tests are simple, unambiguous, and remain up-to-date since they evolve with the code changes.
- **Debugging**: The frequent testing cycles in TDD reduce the need for using a debugger.
- **API Design**: Writing tests first promotes API design from the user's perspective, leading to a more usable API.
- **System Design**: TDD encourages decoupling of modules, improving overall system design and maintainability.
- **Quality**: The decoupling and continuous validation inherent in TDD enhance the overall design quality of the system.


### Acceptance-etc 
Acceptance test corresponds to user stories - that way the users know whether the story has been correctly implemented or not

**Acceptance Tests:**
- Reflect user stories to validate if the requirements are met (e.g., "Panic" button functionality).
- Focused on ensuring the software fulfills user needs and stories.
- Typically conducted by end-users or customers in a real-world setting with actual data.
- Deployment follows successful acceptance testing.
- Acceptance testing uncovers defects for developers to fix.
- The testing plan is based on criteria outlined in the Software Requirements Specification (SRS).

**Running Acceptance Tests:**
- Often written in non-technical language, these need to be translated into executable tests.
- Automation is essential, although there might be an inclination to defer these tests until the end of the development process.
- Acceptance tests should be automated for efficiency and to provide early feedback, akin to unit tests.

**Examples of Acceptance Test Cases:**
- Payment functionalities with various credit card types and conditions (valid, invalid, expired, etc.).
- Specification by the customer to direct developers on the intent of user stories.
- Tools like Fit can be used for setting up and running acceptance tests, specifying various card types and conditions.

**Responsibilities:**
- **Developers**: Automate acceptance tests, conduct unit tests, and consider additional acceptance tests.
- **Customers**: Write and execute the acceptance tests.

### Exotic Techniques

#### Fault seeding 
- It's a method to assess how well a test suite can detect defects in the code.
- Artificial defects (faults) are intentionally added to the software.
- The test suite is then run to see how many of the seeded faults it can detect.
- By comparing the number of detected seeded faults to the total number of seeded faults, the effectiveness of the test suite can be measured.
- If the test suite finds a consistent proportion of both artificial and natural faults, the total number of natural faults in the software can be estimated.
- An important aspect of fault seeding is to distribute the artificial faults in a way that mimics the natural occurrence of faults in the software.

![[Pasted image 20240404030304.png]]


#### **Mutation Testing Process:**
- Begin with a developed black box test suite.
- Ensure the program initially passes all the test cases.
- Introduce small mutations to the code, altering it while keeping syntax correct but not the intended meaning (semantics).
- Re-run the test suite to check if it detects the changes introduced by these mutations.
- Iterate this process by introducing different mutations each time.

#### **Types of Mutations:**
- Possible mutations can include, but are not limited to:
    - Reversing the direction of a comparison operator (e.g., changing `<` to `>`).
    - Swapping an arithmetic operator (e.g., changing `+` to `-`).
    - Altering a constant value within the code.
    - Using a different variable or modifying an array index.
    - Removing a code statement.
    - Changing a return statement or adding an extra one.


#### Orthogonal Defects Classification
Whenever an error is found, people try to blame someone else. Rather than assigning blame to individuals or teams when defects are discovered, the focus should be on classifying the type of defect and determining the necessary steps to rectify it. This approach facilitates objective analysis and resolution of issues without implicating fault, which is more productive and less contentious.

![[Pasted image 20240404030930.png]]


#### Test Plan
- A test plan sets the strategy for the project's testing phases, from inception to acceptance testing.
- It's crafted from key project documents, including requirements, project plans, and design specs.
- The plan defines testing levels, targeted units, and features (functionality, performance, usability).
- It lays out testing criteria, endpoints, evaluation methods, deliverables, and schedules task allocations.

#### **Defect Logging and Tracking:**
- Large software projects may encounter numerous defects detected by different individuals.
- The person who identifies the defect is often not the one who fixes it, necessitating a robust defect tracking system to ensure issues are resolved from discovery to closure.
- Defect logging and tracking is an industry best practice.

#### **Defect Logging:**
- A defect has a lifecycle: identified, logged, assigned, fixed, and closed, with possible additional states for more complexity.
- This process forms the test-fix-test cycle, essential for systematic debugging and quality assurance.

#### **The Ripple Effect:**
- Efforts to fix defects can inadvertently introduce new defects.
- Fixes without full comprehension of the code's interconnectedness can lead to more errors, with the code quality potentially degrading over time.
- Continuous maintenance can inadvertently introduce errors, hinting at the importance of careful management and possibly considering Test-Driven Development (TDD) to mitigate some issues.

#### **Defect Logging Details:**
- Defects are categorized into types (e.g., logic, UI, interfaces, performance) and logged with severity levels to prioritize fixing efforts.
- Severity levels range from critical to cosmetic, guiding the urgency and order of fixes.
- Ideally, all defects should be resolved, but sometimes releases may proceed with known defects prioritized by severity.

#### **Decision to Stop Testing:**
- Testing may stop when certain thresholds are met, such as reaching a pre-defined delivery deadline or achieving specific coverage criteria (like 90% paths tested).
- Stopping testing is often a strategic decision, balancing product quality, deadlines, and resource allocation.
#### Fault Distribution
- Set a cap on faults per module during testing.
- Exceeding the limit may prompt a module's redesign, recoding, or removal.
- Consider the trade-offs between fixing faults and overhauling modules, factoring in risk, schedule, and potential for additional errors.


---
Stopped at Testing-automation here is quick recap of what was inside of this slide from mark
406-17:

- Automated Testing (How, What, Tools)

Test automation also mentioned, same thing as automated testing. Explains how, what, and why

- Examples of what might be automated
- Compents that might automatically test whatever
- Best practices for Automation Tools
- Steps for a well-defined test automation
- What automation testers do
- Challenges of automation testing
- Common tools (Last slide)


quick notes from Chat GPT

Let's summarize the entire slideshow on test automation into detailed notes:

### Test Automation Overview

- Manual testing is error-prone and may not cover all cases, leading to potential missed bugs.
- Automated testing uses software to control test execution and outcome comparison, leading to accurate, reliable results and wider scenario coverage.
- Test automation is essential for rapid releases of complex applications in dynamic markets.
- Automation relieves testers from repetitive tasks and supports industry demands for quick, quality releases.

### Test Automation Process

- Automated testing utilizes tools to execute predefined test cases and compares actual outcomes to expected results.
- It's suitable for regression, performance, load, security, and other testing types.
- Ensures no human errors affect the results.

### Business Benefits of Test Automation

- Enhances test coverage and thoroughness, especially for critical performance or security areas.
- Speeds up the testing process.
- May lead to reduced QA personnel needs.

### Automation Scope

- **Unit Testing**: Individual components are tested during the coding phase by developers or automation testers.
- **Smoke Testing**: Assesses if the build is stable enough for further tests.
- **Integration Testing**: Checks data communication between application modules.
- **Functional Testing**: Verifies all functions, including APIs, databases, and overall app functionality.
- **Regression Testing**: Ensures existing features work after recent code changes.

### Components of Automated Testing

- **Unit Tests**: Test individual code units for errors.
- **API Tests**: Ensure effective communication with other applications and focus on functionality and security.
- **GUI Tests**: Assess graphical user interface elements and their interactions.
- **Web Services Testing**: Validates requests and responses in web service communication using protocols like SOAP and REST.

### Automation Tools

- Tools range from open-source to licensed software and are essential for running test scripts without human intervention.

### Best Practices for Using Tools

- Choose the right tool aligning with project requirements.
- Design tests before automation to uncover and fix defects efficiently.
- Avoid automating unstable or new features until they stabilize.
- Regularly run automated tests to catch bugs early, saving time and cost.
- Strategically select what tests to automate.
- Do not rely solely on UI test automation; plan carefully for a holistic testing strategy.

### Steps for Effective Test Automation

1. Assess the need for automation.
2. Set automation goals and priorities.
3. Plan the automation strategy.
4. Choose the appropriate tools and framework.
5. Determine which test cases to automate.
6. Generate quality test data.
7. Develop tests resilient to UI changes.
8. Execute tests and integrate with CI/CD processes.
9. Maintain test scripts regularly.

### Role of Automation Testers

- Automation testers design scripts, execute tests, identify bugs, and ensure new features don't impact existing functionalities.
- They collaborate closely with developers and QA analysts.

### Test Automation Challenges

- Communication gaps between teams can hinder automation success.
- Selecting the right tools requires careful evaluation to match application needs.
- Technical expertise is crucial for designing and maintaining frameworks and scripts.
- High initial costs for setting up frameworks and tools can be a barrier.
- Scalability issues in test environments, particularly on-premise, can be mitigated by using cloud services.

### Tools

- Common tools used in test automation include Selenium, QTP, LoadRunner, and JUnit.

In summary, the slideshow conveys the critical role of test automation in modern software development, outlining its processes, benefits, components, tooling, best practices, and challenges. It emphasizes the importance of a strategic approach to test automation to enhance software quality and efficiency.

---
Didn't look at slide 23 accidents-happens


