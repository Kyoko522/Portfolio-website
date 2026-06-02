### Enums with explicit values 
By default all enum values are resolved to numbers. Let's say if you have something like 

```javascript 
enum MimeType{
JPEG,
PNG,
PDF
}
```

the real value behind e.g. MimeType. PDF will be 2. 

But some of the time it is important to have the enum resolve to a different type. E.g. you receive the value from backend / frontend / another system which definitely a string. This could be a pain, but luckily there is this method:

```javascript 
enum MimeType {
  JPEG = <any>'image/jpeg',
  PNG = <any>'image/png',
  PDF = <any>'application/pdf'
}
```

This resolves the MineType.PDF to application/pdf

Since TypeScript 2.4 it's possible to declare string enums:

```javascript
enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  PDF = 'application/pdf',

}
```

You can explicitly provide numeric values using the same method

```javascript
enum MyType {
   Value = 3,
	ValueEx = 30,
	ValueEx2 = 300
}
```

### How to get all enum values

```javascript
enum SomeEnum { A, B }

let enumValues:Array<string>= [];

for(let value in SomeEnum) {  
if(typeof SomeEnum[value] === 'number') {

        enumValues.push(value);
    }

}

enumValues.forEach(v=> console.log(v)) 
//A  
//B
```

### Extending enums without custom enum implementation

```javascript
enum SourceEnum {
  value1 = <any>'value1',
  value2 = <any>'value2'

}

enum AdditionToSourceEnum {
  value3 = <any>'value3',
  value4 = <any>'value4'

}

// we need this type for TypeScript to resolve the types correctly

type TestEnumType = SourceEnum | AdditionToSourceEnum;  
// and we need this value "instance" to use values  
let TestEnum = Object.assign({}, SourceEnum, AdditionToSourceEnum); // also works fine the TypeScript 2 feature  
// let TestEnum = { ...SourceEnum, ...AdditionToSourceEnum };

function check(test: TestEnumType) { return test === TestEnum.value2;

}

console.log(TestEnum.value1);
console.log(TestEnum.value2 === <any>'value2');
console.log(check(TestEnum.value2));
console.log(check(TestEnum.value3));
```

### Custom enum implementation: extends for enums

Sometimes it is required to implement Enum on your own. E.g. there is no clear way to extend other enums. Custom implementation allows this:

```javascript
class Enum {
  constructor(protected value: string) {}

public toString() {  
return String(this.value);


}

public is(value: Enum | string) { return this.value = value.toString();

} }

class SourceEnum extends Enum {  
public static value1 = new SourceEnum('value1'); public static value2 = new SourceEnum('value2');

}

class TestEnum extends SourceEnum {  
public static value3 = new TestEnum('value3'); public static value4 = new TestEnum('value4');

}

function check(test: TestEnum) { return test === TestEnum.value2;

}  
let value1 = TestEnum.value1;

console.log(value1 + 'hello');
console.log(value1.toString() === 'value1');
console.log(value1.is('value1'));
console.log(!TestEnum.value3.is(TestEnum.value3));
console.log(check(TestEnum.value2));

// this works but perhaps your TSLint would complain // attention! does not work with ===  
// use .is() instead  
console.log(TestEnum.value1 == <any>'value1');
```
