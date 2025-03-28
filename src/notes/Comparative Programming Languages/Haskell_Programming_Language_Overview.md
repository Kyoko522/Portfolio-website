
---
## Introduction to Haskell

Haskell is a purely functional programming language characterized by 'lazy evaluation'. It computes only what is necessary for the result, optimizing performance by avoiding unnecessary calculations.

Haskell is not a step by step programming language.

## Running Haskell Code in the Terminal

1. Create a Haskell file, for instance, `simple.hs`.
2. Compile the code using GHC (Glasgow Haskell Compiler): `ghc -o simple simple.hs`. This process is akin to using `gcc` for compiling C programs on Linux.

## Key Syntax and Concepts

### Basic IO

- `putStrLn` is employed for outputting strings to the console.
    ```haskell
    main = putStrLn "Hello, World!"
    ```

### Literals and Arithmetic

- Operator precedence in Haskell aligns with conventional rules (PEMDAS/BODMAS).
- Division results in floating-point numbers.
- Square roots and exponentiation examples:
    ```haskell
    sqrt 2 -- Calculates the square root of 2.
    2 ^ 3  -- Raises 2 to the power of 3.
    ```

### Tuples

- Tuples can comprise mixed types, for example, `(3, "Hello")`.
- `fst` and `snd` extract the first and second elements of a tuple, respectively.
- Example 
```Haskell
add_fraction :: (Int, Int) -> (Int, Int) -> (Int, Int)
add_fraction (a,b) (c,d) = (a*d+b*c,b*d)

mul_fraction ::(Int, Int) -> (Int, Int) -> (Int, Int)
mul_fraction x y = (fst x * fst y,snd x * snd y)
```

### Lists

- Lists must be homogeneous. While `[1, 2, 3]` is valid, `[1, 'a']` is not, and will result in a type error.
- The `:` (cons) operator appends an element to the start of a list:
    ```haskell
    0 : [1, 2, 3]  -- Results in [0, 1, 2, 3]
    ```
- Lists can contain tuples with mixed types, but all tuples in the list must have the same structure.
#### List Comprehension

- Syntax for a list Comprehension in Haskell 
```haskell 
[any_function variable_name | to bind <- your list, filter]

%% In other words %%
[Output | Range, FILTER]
```
- Example 1
```haskell
randomlist :: [Int]
randomlist = [1,32,643,2,35,23,57,234,23,12,4,34,123]

isEven :: Int -> Bool
isEven x = if x `mod` 2 == 0 then True else False

evenChecker :: [Int] -> [Int]
evenChecker list = [element | element <- list, isEven element]

%% in this example you have element which is each number in the list one by one that will go throught a filter in this example that filter is isEven if it returns true means that that element will stay inside of the list of false it will not be added to the new list %%
```
- Example 2
```haskell 
my_list :: [Char]
my_list = "hello world"

[toUpper x | x <- my_list]
```
- Example 3 
```haskell
tuplemaker :: Int -> [(Int, Int)]
tuplemaker x = [(a, b) | a <- [1..x], b <- [1..x]]
```

#### Nested List Comprehension and Multiple Filters
- Example 1
```haskell
list_of_list :: [ [Int] ]
list_of_list = [ [2,4], [1,3,4], [8, 5, 12],[2]]

nested_list_filter :: [ [Int] ] -> [ [Int] ]
nested_list_filter lol = [ [ x | x <- xs, mod 2 == 0] | xs <- lol ]

%% take a look at nest_list_filter it has 2 comprehension to it one for the other loop and one for the inner list %%
```

### Strings

- Strings are essentially lists of characters. The `++` operator is used for string or list concatenation.
- `show` converts non-string values into strings.
- `read` interprets strings as numbers, but will result in an error if the string cannot be converted to a numeric value.

### Operations on Lists

- `head` retrieves the first element of a list. `tail` returns the remaining elements, excluding the head. Using `tail` on a list with a single element yields an empty list, while applying it on an empty list triggers an error: `Exception: Prelude.tail: empty list`.
- ```last``` give you the last element in the list 
- `init` give a all the number in the list minus the last one
- `Maximum` give you the largest value in the list. This also works with strings as well (goes of it's ascii value)
- `Minimum` the opposite of `maximum` it will find the smallest value in the list
- `map` applies a function to each item in a list.
- `filter` removes items that do not satisfy a provided predicate function.

### Functions and Operators

- Infix functions allow for the use of symbols like `+`, `-`, `*`, and `/` in a functional manner:
    ```haskell
    (+) 5 10  -- Equivalent to 5 + 10
    (*) 5 10  -- Equivalent to 5 * 10
    ```
- `foldl` and `foldr` consolidate lists using a specified function, effectively substituting the cons operator:
    ```haskell
    foldr (+) 0 [1, 2, 3, 4]  -- Summates the list elements starting from the right.
    ```


![[Pasted_image_20240403022513.png]]


-  `foldl` vs `foldr`: 
```haskell
-- foldr is right associative. Meaning: 
	foldr (-) 1 [4, 8, 5]
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	4 - 8 - 5 -1
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	-- is actually: 
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	(4 - (8 - (5 - 1)))
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	0
	
--foldl is left associative. Meaning:

	foldr (-) 1 [4, 8, 5]
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	1 - 4 - 8 - 5 
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	--is actually
	(((1 - 4) - 8) - 5)
	↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
	16
	```

##### List Generation
```haskell
--List declartion--
list :: [Int]
list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

--Can be written as
list = [1..9]

--Specific interval
list = [1, 3..9]
	 = [1, 3, 5, 7, 9]     -- Interval is discerned from the difference between the first two elements
```


- `zip` 
```haskell
x = [1..]
zip "Hello" x 
--returns [('H', 1), ('e',2), ('l',3), ('l',4), ('o',5)]
```

What zip does it it match the first element of all the list first element together look at the example above

Another example is let's say we have 3 list and u zip them together it will make a list inside of a list where the inner list is all the first element of all three put together followed my another list with all the second element and so on

## Functions

- Function declaration consist of the function name and its argument list along with its output 
- Function definition is where you actually define a function. 

```haskell 
add :: Integer -> Integer -> Integer   --function declaration (signiture) 
add x y =  x + y                       --function definition 

main = do 
   putStrLn "The addition of the two numbers is:"  
   print(add 2 5)    --calling a function
```

A function in Haskell needs there things
```haskell
sum a b c d = a + b + c + d

double :: Num a -> a -> a 
double x = 2 * x

double2 :: Num a -> a -> a -> 
double2 = double x + double y
```
- Function named sum
- parameter list (a, b, c, d)
- Expression to evaluate ( a + b + c + d)
### Control Structures 
- if then else 
```haskell 
f x = if x < 0 then 0 else 1
f 67 
-> 1
f 0 
-> 1 
f (-6)
-> 0
f -6
<interactive>:203:1: error:
```

- if then else if then else
```haskell 
sign x = 
	if x < 0 then -1
	else if x > 0 then 1
	else 0
	-- indentation matter it will give you error if the indentation is wrong
```
Here he have a function named **sign**, takes one argument x and returns: 
- -1 if x is negative 
- 1 if x is positive
- 0 if x is 0

- if/else construct in Haskell is similar to most other languages. It must include a then and an else

Golden Rule:
- Code which is part of some expression should be indented further than the beginning of that expression 

### Local Name in Functions

```haskell
sign x = do 
	let q = x 
	if q < 0 then -1 
	else if q > 0 then -1
	else 0
```
- When binding a name inside a function, we use the "let" keyword

### Multiple Expression

```haskell 
sign x = do 
	let q = x 
	if q < 0 then -1
	else if q > 0 then 1
	else 0
```
- We now have expressions in this function!
	- if/else and let
- Must add the do keyword
![[Screenshot 2024-04-03 at 11.00.59 PM.png]]

### Case Expression

```haskell 
isNum x = 
	case x of
		0 -> 0
		1 -> 1
		2 -> 2
		_ -> -1

sign x = do
	let q = x
	if x < 0 then -1 
	else if x > 0 then 1 
	else 0
```

### Pattern Matching
- Pattern matching in Haskell is used to simplify code by identifying specific types of expression.
- We can also use `if-else` as an alternative to patterning matching 
- Pattern matching can also be seen as a kind of dynamic polymorphism where, based on the parameter list, different methods can be executed
- Example 1
```haskell 
sq :: Int -> Int sq 0 = 1 --first pattern 
sq n = n * n -- second pattern 

main = do 
putStrLn "The square of 5 is:" -- adding text decsription 
print (sq 5) --calling the sq function and printing output
```
- Example 2
```haskell
firstchar :: String -> String
firstchar [] = error "Empty String"
firstchar all@(x:xs) = "The first character in " ++ all ++ " is " ++ [x]

check8 :: (Int, Int, Int) -> Bool
check8 (8, _, _) = True
check8 (_, 8, _) = True
check8 (_, _, 8) = True
check8 _ = False
```



### Guards and Where

- Guards in Haskell is like cond in Lisp and Elixir the way they work are the same the syntax is:
```haskell
cube :: Int -> Int -> Int -> String
cube w h d
| CONDITION = something
| CONDITION = something
| CONDITION = something
| otherwise = 

```
- Example 1
```haskell
cube :: Int -> Int -> Int -> String
cube w h d
| w < 0 || h < 0 || d < 0 = error "Negative Volume"
| w * h * d < 50 = "Small Cube"
| w * h * d < 50 = "Medium Cube"
| w * h * d < 500 = "Large Cube"
| otherwise = "ENORMOUS Cube"
```
- Example 2, where is used to reduce reduncacy of calculation instead of calculating the volume in every case we can just do it one with where and refer to it whenever it is needed 
```haskell
cube :: Int -> Int -> Int -> String
cube w h d
| w < 0 || h < 0 || d < 0 = error "Negative Volume"
| volume < 50 = "Small Cube"
| volume < 50 = "Medium Cube"
| volume < 500 = "Large Cube"
| otherwise = "ENORMOUS Cube"
	where volume = w * h * d
```


### Accessing list Items
- `x:y`
```Haskell 
getListItem :: Int -> String
getListItem (x:[]) = "Your list is empty"
getListItem (x:y:[]) = "Your list contains " ++ show x ++ " and the second item is " ++ show y
getListItem (x:xs) = "The 1st item in the list is " ++ show x ++ " and the rest is " ++ show xs
```
- `as`
```haskell 
getFristItem :: String -> String
getFristItem [] = "Empty String"
getFristItem all@(x:xs) = "The first letter in " ++ all ++ " is " ++ [x]
```


### Advance functions 

### Some Useful Build-in Functions 
```Haskell 
lenList = length list_name.     

revList = reverse list_name

isListEmpty = null list_name

secondIndex = list_name !! 1

firstIndex = head list_name

drop_first_3_element = drop 3 list_name

is_number_in_list = 7 `elem` list_name

sort_list = sort list_name
```