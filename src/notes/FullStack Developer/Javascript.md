
#### Let vs Var 
- Variables declared by let are only available inside the block where they're defined
- Variables declared by var are available throughout the function in which they're declared 

When declaring multiple variable in one line they are spite by using `,`


## Hooks
Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.

### Use States

`import { useStates } from "react";`

`useStates` accepts an initial state and returns two values: 
1. the current state
2. a function that updates the state.

Examples
```javascript
function FavoriteColor() {
	const [color, setColor] = useState("blue");
}```

The first value, color, is our current state. 
The second value, setColor, is that is used to update our state. 

the `= useState("blue")` set the first value or default value to blue


### Use Ref

`import { useRef } from "react"`

the `useRef` hook allows you to persist values between renders. 

It can be used to store a mutable value that does not cause a re-render when updated

