### Part A: Formal Languages

#### Alphabets and Strings

- **Alphabets**: A finite set of characters or symbols. Examples:
  - English alphabet (ΣE) contains {a, b, c, ... Z}.
  - Spanish alphabet (ΣS) includes all of ΣE plus {ll}.
  - Greek alphabet (ΣG) consists of characters like {α, β, ...}.

- **Strings**: A sequence of characters from an alphabet. Properties include:
  - The length of a string is the number of characters it contains.
  - The null string, denoted as ε (epsilon) or λ (lambda), has a length of 0.
  - Strings can be considered as ordered n-tuples of characters, e.g., "hello" is shorthand for (h, e, l, l, o).

- **String Concatenation**: Combining two strin gs by appending characters of the second string to the first. The null string acts as an identity element for concatenation (εx = xε = x).

#### Formal Languages

- Defined as a set of strings over an alphabet. For instance, with Σ = {a, b}, a formal language could be L1 = {a, aaa, bbaa, aba}.
- The empty language, denoted as ∅, contains no strings. It is different from {ε}, which is a language containing the null string.
- **Special Languages** 
  - Σ^n represents all strings over Σ of length n. For example, Σ^2 = {aa, ab, ba, bb} if Σ = {a, b}.
  - The size of Σn is |Σ|^n.

- **Alphabet Closures**:
  - Σ+ is the positive closure of Σ, containing all non-empty strings over Σ.
  - Σ* is the [[Kleene Closure]] of Σ, containing all strings over Σ, including the null string.

#### Operations on Languages

- **Union (L ∪ L')**: Combines two languages into one containing all strings from either language.
- **Concatenation (LL')**: Forms a new language by concatenating each string in one language with every string in the other language. (the same way you would do (x-1) * (x-2) where you would have to expand it out
- **Kleene Closure (L*)**: Consists of all possible strings formed by concatenating any finite number of strings from the language, including the null string.
- **Concatenation vs. Cartesian Product**:
  - Concatenation combines strings from two languages into single strings.
  - The Cartesian product pairs each string from one language with each string from the other as distinct entities, e.g., L × L'.

Examples

	L = {ε, a,  ab}       L' = {ε, b}
	L x L' = {(ε,ε), (ε,b), (a,ε), (a,b), (ab,ε), (ab,b)}.         |L x L'| = 6
	LL' = {ε, b, a, ab, abb}                                       |LL'| = 5



### Part B: Regular Languages and Expressions

#### Explanations and Definitions

- **Regular Languages**: Defined by Stephen Kleene in 1951, these languages can be constructed using union, concatenation, and Kleene closure from very simple base languages.
- **Regular Expressions**: Represent patterns in regular languages using algebraic structures and operations such as union, concatenation, and Kleene closure.

#### Regular Expressions – Algebraic Structures

- An algebraic structure consists of a set with defined operations that may have properties like closure, commutativity, and associativity.
- Regular expressions form an algebraic structure where the set comprises regular expressions representing regular languages.
![[Pasted image 20240407145609.png]]

#### Regular Expressions – Recursive Definition

1. **Base**: The empty language, ε, and each symbol of an alphabet are regular expressions.
2. **Recursion**: If `r` and `s` are regular expressions, then `r|s` (union), `rs` (concatenation), and `r*` (Kleene closure) are also regular expressions.
3. **Restriction**: Only expressions formed by the base and recursive steps are considered regular expressions.

#### Precedence in Regular Expressions

- The precedence from highest to lowest is: Parentheses (), Kleene Star (\*), Concatenation (ab), Union (|).

Highest.                Lowest

| ()  | *   | Concatenation (dote or multiplication) | \|  |
| --- | --- | -------------------------------------- | --- |


#### Regular Languages - Examples

- Regular expressions define sets of strings (languages), for example, `(a|b|c)(a|b)*` describes a language over Σ = {a, b, c}.

#### Regular Expressions for Languages

- Translating English descriptions into regular expressions can be straightforward or may require identifying patterns and simplifying expressions.

#### Applications of Regular Expressions

- Used extensively in computer science for tasks like keyword searching, text editing, token recognition in programming languages, and more. UNIX utilities like `grep`, `sed`, and `lex` utilize regular expressions.

| Σ       | Langauge                                                                                  | Reg. expression |
| ------- | ----------------------------------------------------------------------------------------- | --------------- |
| {a,b,c} | {string that do not include the letter c}                                                 | a\|b            |
| {a,b,c} | {strings that include the letter c exactly once}                                          | c               |
| {a,b,c} | {strings where at least one of the letter is doubled (i.e. next to itself) at least once} | (aa\|bb\|cc)*   |
| {a,b,c} | {strings where any letter always shows up doubled}                                        |                 |

#### Regular Expression Notation in UNIX

- UNIX regex expands traditional notation to include constructs like `.` for any character, `[abc]` for `a|b|c`, and `r+` for one or more instances of `r`.

| Regex | Means                                                             | L(regex)                                 |
| ----- | ----------------------------------------------------------------- | ---------------------------------------- |
| .     | any character                                                     | Σ                                        |
| [abc] | a\|b\|c                                                           | L(a)**∪**L(b)**∪**L(c)                   |
| [a-z] | a \| b \| ... \| z (this notation is only consecutive characters) | (L(r)^+)                                 |
| r?    | 0 or 1 instance of r: (r)? = r\|ε                                 | (L(r\|ε)) = L(r)**∪**L(ε) = L(r)**∪**{ε} |

#### Regular Expression Notation System
There are two mainstream notation for regular expressions:
![[Pasted image 20240407153820.png]]
for CPS 420 will only use the first 5 of hte UNIX regex notation(applied)

#### Notation Systems for Regular Expressions

- Different notations include traditional (theoretical) and UNIX regex (applied) with varying syntax for operations like concatenation, union, and Kleene closure.

#### Properties of Regular Expressions

- Regular expressions can be simplified by applying algebraic laws and properties, such as commutativity and associativity of the union, and distributivity of concatenation over the union.

![[Pasted image 20240407154614.png]]
