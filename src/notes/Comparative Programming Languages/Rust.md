### Why use Rust :
- High Performance has comparable speeds to C and C++ and is a system programming (no level)
- Garbage Collection is not Necessary (needs less memory)
- Concurrent Programming 
- Easy to Understand Errors 
- Rust is statically typed, but supports type inference like Haskell

### Mathematical

| Operator | Description                   |
| -------- | ----------------------------- |
| +        | add                           |
| -        | subtract                      |
| *        | multiple                      |
| /        | divide                        |
| %        | remainder                     |
| +=       | add and assign                |
| -=       | subtract and assign           |
| *=       | multiply and assign           |
| /=       | divide and assign             |
| %        | remainder / modulo and assign |
- Note then when doing math operation all the types have to be the same this means that you can't just add a i32 with i64 or a int with a float, you first need to convert the using `as` and then do the math operation 
  
```Rust
fn main(){
	let r1: i32 = 4;
	let r2: f32 = 3.0;
	let r3: f32 = r1 as f32/r2;

	println("Value {}", r1/r2);   //error message
	println("Value {}", r3);      //run correctly give u 0.75
}
```
### Comparison

| Operator | Description           |
| -------- | --------------------- |
| ==       | equal                 |
| !=       | not equal             |
| <        | less than             |
| <=       | less than or equal    |
| >        | greater than          |
| >=       | greater than or equal |

### Logic 

| Operator | Description |
| -------- | ----------- |
| &&       | and         |
| \|\|     | or          |
| !        | not         |
### Bitwise

| Operator | Description            |
| -------- | ---------------------- |
| &        | and                    |
| \|       | or                     |
| ^        | xor                    |
| <<       | left shift             |
| >>       | right shift            |
| &=       | `and` and assign       |
| \|=      | `or` and assign        |
| ^=       | `xor` and assign       |
| <<==     | left shift and assign  |
| >>==     | right shift and assign |
### Integers (Signed and Unsigned)

| Type  | Default | Range                                         | Type  | Default | Type                                       |
| ----- | ------- | --------------------------------------------- | ----- | ------- | ------------------------------------------ |
| i8    | 0       | -128..127                                     | u8    | 0       | 0..255                                     |
| i16   | 0       | -32768..32767                                 | u16   | 0       | 0..65535                                   |
| i32   | 0       | -2147483648..2147483647\|                     | u32   | 0       | 0..4294967295                              |
| i64   | 0       | -9223372036854775808..9223372036854775807     | u64   | 0       | 0..18446744073709551615                    |
| i128  | 0       | min: -170141183460469231731687303715884105728 | u128  | 0       | 0..340282366920938463463374607431768211455 |
| i128  | 0       | max: 170141183460469231731687303715884105727  | usize | 0       | <pointer size on target architecture>      |
| isize | 0       | <pointer size on target architecture>         |       |         |                                            |
### Floats

| Type | Default | Range                 |
| ---- | ------- | --------------------- |
| f32  | 0       | 32-bit floating point |
| f64  | 0       | 64-bit floating point |

### Strings / Characters

| Type     | Notes                                                                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| char     | Unicode scalar value. Creating with single quotes `''`                                                                                                |
| String   | UTF-8-encoded string                                                                                                                                  |
| &str     | Slice into `String` / Slice into a static `str`. Create with double quotes `""`or `r#""#` for a raw mode (no escape sequences, can use double quotes) |
| OsString | Platform-native string                                                                                                                                |
| OsStr    | Borrowed `OsString`                                                                                                                                   |
| CString  | C-compatible nul-terminated string                                                                                                                    |
| CStr     | Borrowed CString                                                                                                                                      |

```Rust
// `let` will create a new variable binding
let foo = 1;
// bindings are immutable by default
foo = 2;              // ERROR: cannot assign; `foo` not mutable

let mut bar = 1;      // create mutable binding
bar = 2;              // OK to mutate

let baz = 'a';        // use single quotes to create a character
let baz = "ok";       // use double quotes to create a string
// variables can be shadowed, so these lines have been valid
let baz = 42;         // `baz` is now an integer; 'a' and "ok" no longer accessible

// Rust infers types, but you can use annotations as well
let foo: i32 = 50;    // set `foo` to i32
let foo: u8 = 100;    // set `foo` to u8
// let foo: u8 = 256; // ERROR: 256 too large to fit in u8

let bar = 14.5_f32;   // underscore can be used to set numeric type...
let bar = 99_u8;
let bar = 1_234_567;  // ...and also to make it easier to read long numbers

let baz;              // variables can start uninitialized, but they must be set before usage
// let foo = baz;     // ERROR: possibly uninitialized.
baz = 0;              // `baz` is now initialized
// baz = 1;           // ERROR: didn't declare baz as mutable

// naming convention:
let use_snake_case_for_variables = ();
```


### Variables in Rust 
- Rust is a static programming language meaning that it has to be total what type each of it's values are 
	- there are 2 ways of doing this one is the coder put it the type when assigning it a value (statically typed)
	- Another way of doing it letting the compiler decide it when the code is compiled it will tell it what type it is receiving (implicit)
- 
### Constants
- const is different from let, let is used to make a variable while const is something can not change it's type or value once it is defined, something like symbols in elixir 
- When assigning or creating a const make the name in ALL CAPS to differentiate from variables made with let

```rust
// `const` will create a new constant value
const PEACE: char = '☮';    // type annotations are required
const MY_CONST: i32 = 4;    // naming conventions is SCREAMING_SNAKE_CASE

// const UNINIT_CONST: usize;  // ERROR: must have initial value for constants

// use `once_cell` crate if you need lazy initialization of a constant
use once_cell::sync::OnceCell;
const HOME_DIR: OnceCell<String> = OnceCell::new();
// use .set to set the value (can only be done once)
HOME_DIR.set(std::env::var("HOME").expect("HOME not set"));
// use .get to retrieve the value
HOME_DIR.get().unwrap();
```



### Functions

- `main()` returns nothing, accepts no arguments. Convention for making functions is snake_case.
- **Parameters** separated by commas, indicating types is **mandatory**
- 


### Control Flow
- `if` check if a condition evalutes to `true` and if so, will execute a specific branch of code
```Rust 
if some_bool { /* body */ }

if one && another {
    // when true
} else {
    // when false
}

if a || (b && c) {
    // when one of the above
} else if d {
    // when d
} else {
    // none are true
}

// `if` is an expression, so it can be assigned to a variable
let (min, max, num) = (0, 10, 12);
let num = if num > max {
    max
} else if num < min {
min 
} else {
num };

assert_eq!(num, 10);
```


### Tuples

- Tuples offer a way to group unrelated data into an anonymous data type. Since tuples are anonymous, try to keep the number of elements limited to avoid ambiguities.
- In short Tuples can be heterogeneous, and we don't need to specify the type

```rust
// create a new tuple named `tup` containing 4 pieces of data
let tup = ('a', 'b', 1, 2);
// tuple members are accessed by index
assert_eq!(tup.0, 'a');// use tup_name.index to access a certain element 

assert_eq!(tup.1, 'b');
assert_eq!(tup.2, 1);
assert_eq!(tup.3, 2);

// tuples can be destructured into individual variables
let (a, b, one, two) = (tup.0, tup.1, tup.2, tup.3);
let (a, b, one, two) = ('a', 'b', 1, 2);
// a, b, one, two now can be used as individual variables

// tuple data types are just existing types surrounded by parentheses
fn double(point: (i32, i32)) -> (i32, i32) {

    (point.0 * 2, point.1 * 2)
}```

- De-structuring a Tuple
```Rust 
fn (main){
let tup = (42,3.141592, '!');
let (x, y, z) = tup;

println!("{}, {}, {}",x,y,z);
}
```


### Ownership

- Let's what most programming language use 

|                          | Pros                                                                                 | Cons                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Garbage collection       | - Error free*<br>- Faster write time                                                 | - No control over memory<br>- Slower and unpredictable runtime performance <br>- Larger program size |
| Manual memory Management | - Control over memory<br>- Faster runtime<br>- Smaller program size                  | - Error prone<br>- Slower write time                                                                 |
| Ownership model          | - Control over memory<br>- Error free*<br>- Faster runtime<br>- Smaller program size | - Slower write time. Learning curve (fighting with borrow checker)                                   |
- Stack is a fixed size and cannot grow or shrink during run time
- stack also stack frames and stack frame hold the variable of the function being executed the size of a stack frame is calculate during compile time so that means the variables inside of stack from have a known fixed size variables inside of a stack and only live as long as the stack frame lives 
- Heap is not organized and ti data is dynamic in size meaning that it can shrink and grow as the program needs and the programmer controls the lifetime of 

#### Ownership Rules
1. Each value in Rust has a variable that's called its owner 
2. There can only be one owner at a time
3. When the owner goes out of scope, the value will be dropped