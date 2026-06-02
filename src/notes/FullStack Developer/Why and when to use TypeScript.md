If you find the arguments for type systems persuasive in general, then you'll be happy with TypeScript.

It brings many of the advantage of type system (safety, readability, improved tooling) to the javascript ecosystem. It also suffers from some of the drawbacks of type systems (added complicity and incompleteness).

### Safety 

TypeScript catches type errors early through static analysis:
```javascript
function double(x : number): number {
	return 2 * x;
}
double('2');
//.    ~~~Argument of type '"2"' is not assignable to parameter of type 'number'.
```

### Readability 

TypeScript enables editors to provide contextual documentation:

![[Pasted image 20240324024248.png]]

You'll never forgot whether String.prototype.slice takes (start, stop) or (start, length) again!

### Tooling

TypeScript allows editors to perform automated refactors which are aware of the rules of the languages

```JavaScript
let foo = '123';
{
const foo = (x: number) => {
	return 2 * x;
	}
	foo(2);
}
```

Here, for instance, Visual Studio Code is able to rename references to the inner foo without altering the outer foo. This would be difficult to do with a simple find/replace. 