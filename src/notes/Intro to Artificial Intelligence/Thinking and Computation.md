Starts with a example of how a sentence can invoce a action
- the sentence was there is free food outside -> the action was that the student got up and started to rush to get the food
- another example was if the prof said that there was free food in nepal there would be no action minus some student being confused on how this relates to them

the first chapter covers the where to look got an answer. it's purpose that thinking is a form of computation. that digital computer perform calculation on representation fo numbers, human brains perform calculation on representations fo what is known. 

the first section review very briefly the notion of thinking. the process of computation is somewhat less familiar


#### 1.1 Thinking
 
 the brain is not like a computer, this book talks about thinking but not the brain but the what hte brain does is think
consider the study of flight (in the day before airplanes) one might want to understand how certain animals like birds and bats are bale to fly one might also want to try to build machines that are capable of flight. there are 2 ways to process:
- study flying animals like birds, looking very carefully at their wings, theri feathers. therir muscles, and then construct machines that emulate birds
- study aerodynamics-how air flows above and below an airfoil, and how this provide lift -by uisong wind tunnels and varying the shape fo airfoils
Both kinds of studies lead to insights, but of a different sort. The second strategy is the more general one: it seeks to discover the principles of flight that apply to anything, including birds.

It is this second strategy that is used here to study thinking. While there is a lot to be learned by studying the brain, this book focuses on the thinking process itself to determine general principles that will apply to brains and to anything else that needs to think.

####  1.1.1 What is thinking? 
Thinking is bringing what you know to bear on what you are doing. Thinking is a biological process, since we are biological creatures


#### 1.2.2 What is computation?
The procees fo thaking symbolic structues, breking them apart, comparing them, and reassembling them according toa precise recipe called a procedure.
	\the symbols are the start of the procedure are called the `input`
	the symbols ate the end of the procedure are called the `output`
	![[Pasted image 20240908162555.png]]
For the example above read the instruction below 
## Procedure `PROC1` Explanation

### Inputs and Outputs
- **Inputs:** Three digits, `a`, `t`, and `b`.
- **Outputs:** Two digits, `c` and `s`.

### Detailed Steps
1. **First Call to `PROC0`:**
   - Inputs: Digits `t` and `b` are provided to `PROC0`.
   - Outputs: Two digits `u` and `v` are returned from `PROC0`.

2. **Second Call to `PROC0`:**
   - Inputs: Digits `a` and the previously returned `v` are provided to `PROC0`.
   - Outputs: Two new digits `u'` and `v'` are returned, overwriting the earlier values of `u` and `v`.

3. **Output Decision Based on Conditions:**
   - Evaluate the updated values of `u` (now `u'`) from the second call.
   - **Condition Checks:**
     - If `u = u' = 0`, then set `c = 0` and `s = v'`.
     - If `u = u' = 1`, then set `c = 2` and `s = v'`.
     - For any other combination of `u` and `u'`, set `c = 1` and `s = v'`.

### Key Points
- `PROC0` is assumed to always return two digits. The internal workings of `PROC0` are not specified but are essential for determining the outcomes of `u` and `v`.
- The values of `u` and `v` get updated with each call to `PROC0`. The final values after the second call are critical for determining the output of `PROC1`.
- The final output of `PROC1` heavily relies on the result of `u` from the second call (`u'`).



### Here is another example 
Given the inputs `a = 7`, `t = 4`, and `b = 5`, the steps are as follows:

1. **First Call to PROC0**:
    
    - **Inputs:** `t = 4` and `b = 5`
    - **Output:** `09` (from `PROC0`), where `u = 0` (carry) and `v = 9` (resultant value).
2. **Second Call to PROC0**:
    
    - **Inputs:** `a = 7` and `v = 9` (from the first call)
    - **Output:** `16` (from `PROC0`), where `u' = 1` (new carry) and `v' = 6` (new resultant value).
3. **Decide Final Output**:
    
    - Compare `u` and `u'`. In this case, since `u ≠ u'`, set `c = 1` and `s = v' = 6`.
    - The output of `PROC1` for this input set is `16`.

### Examples for Clarity:

Let's look at additional examples provided to solidify the understanding:

- **Example 1:** Inputs are `3, 4, and 1`.
    
    - First call: `PROC0(3, 4)` returns `05`, so `u = 0` and `v = 5`.
    - Second call: `PROC0(1, 5)` returns `06`, so `u' = 0` and `v' = 6`.
    - Final output: Since `u = u' = 0`, `c = 0` and `s = 6`. Result is `06`.
- **Example 2:** Inputs are `8, 9, and 2`.
    
    - First call: `PROC0(8, 9)` returns `17`, so `u = 1` and `v = 7`.
    - Second call: `PROC0(2, 7)` returns `09`, so `u' = 0` and `v' = 9`.
    - Final output: Since `u ≠ u'`, `c = 1` and `s = 9`. Result is `19`.
\



#### 1.2.4 The Lesson
- To procedure meaningful answers, you do not have to understand what the symbols stand for or why the manipulations are correct.
- Computers can perform a wide variety of impressive activities precisely because those activities can be described as a type of symbol processing that can be carreid out prurely mechanically 


#### 1.3 Thinking as computation
- The process of thinking can be usefully understood as a form of symbol processing that can be carried out purely mechanically without having to know what the symbols stand for


#### 1.3.1 Leibniz and his idea 
- The rules fo arithemitc allow us to deal with abstract numbers in terms of concrete symbols. The manipulation ot theose symbiols mirrors the relations amoung the nubers beung reporesented
- The rules of logic allow us to deal withg abstract ideas in terms of concerte symbols. this manipulation of those symbols mirrors the relations amoung idea s being represented 

#### 1.3.2 Propositions vs. Sentence
- Propositions are considered to hold or to not hold. A sentence is true if the proposition it expresses holds, and false if that proposition does not hold. this does nto mean that there will be no controversy aboyt whether the proportion holds. ti just means that it makes snese to ask fi it holds (or if the corresponding sentence is true). a number is a very different sort fo abstract object; we do not sask if a number holds in this sense.
- Proposions are considered to be related to people in certain ways: people may or may not belieove them, worry about them, and so on. These various relationships between people and proportions are what philosophers call propositional attitude
- Proportions are related to eoach other in certain ways: a proportions might imply or provide evidence for , or contradict anotiher proportions


#### **Concept of Logical Entailments**

- **Example Given:** "George is a bachelor."
    - Logical entailments of this statement include:
        - Somebody is a bachelor.
        - George is either a bachelor or a pig farmer.
        - Not everyone is not a bachelor.
        - It is not the case that both George and Henry are not bachelors.
- **Observation:** These entailments are technically true but are described as simplistic and uninteresting for typical human thought processes at social events.

#### **Web of Belief**

- **Description:** Beliefs about George are visualized as a network or web, linking terms like "bachelor," "man," "marriage," etc.
- **Purpose:** To illustrate how different concepts are interconnected through various sentences, forming a complex web of knowledge.
- **Logical Analysis:** While logical analysis finds connections among these terms, the richness of human thought goes beyond mere logical entailments.

#### **Richer Conclusions from the Web**

- **Examples of Richer Entailments:**
    - George has never been the groom at a wedding.
    - Mary has an unmarried son born in Boston.
    - No woman is the wife of any of Fred's children.
- **Insight:** These conclusions are more aligned with natural human thinking, showing the complexity and context-sensitive nature of thought.

#### **Knowledge Bases and Thinking**

- **Knowledge Base (KB):** A vast collection of interconnected sentences about a wide array of subjects.
- **Role of KB:** Thinking involves navigating this extensive collection using logical reasoning to draw new conclusions.
- **Computational Models:** Systems that emulate human thinking might represent knowledge symbolically in a knowledge base and compute entailments from this database.

#### **Computational Simulation of Human Thought**

- **Knowledge-Based Systems:** Computer systems designed to simulate human-like thinking must operate over large, complex knowledge bases using rules of logic to derive new insights.
- **Symbolic Representation and Computation:** People engage with knowledge symbolically, allowing for computation over symbolic representations to generate new knowledge or conclusions.

**Thinking means bringing what one knows to bear on what one is doing** -> this is a repeated point shown in many ways through this chapter 

