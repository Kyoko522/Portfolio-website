# Peak Finding

### One-dimensional version

| a   | b   | c   | d   | e   | f   | g   | h   | i   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
 **Peak** in a 1D array is an element that is greater than or equal to its neighbours.

#### Peak Conditions
1. Middle Elements (e.g., Index 2)
A position is a peak if the element is greater than or equal to both neighbours
Example: Position 2 (Value b) is a peak if: 
	b >= a and b >= c
2. Edge Cases 
	- Left edge (Index 1) is a peak if: 
			a >= b
	- Right edge (index 9) is a peak if: 
			i >= h

#### General Rule:
A number is a peak if:
1. It is equal to or greater than the elements adjacent to it. 
2. If the element is at an edge, it needs to be greater than or equal to the single neighbouring element

#### Problem Statement 
Determine if a peak exists in the give array. 
(Note: A peak always exist in any 1D array with at least one element)



### Straightforward Algorithm
##### Steps: 
1. Start from the leftmost element 
2. Compare the current elements with it's neighbours:
	- If it satisfies the peak condition, return it. 
	- Otherwise, move to the next element
3. If the end of the array is reached without finding a peak, conclude that no peak exists

| Values | a   | b   | c   | d   | e   | f   | g   | h   | i   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Index  | 1   | 2   | 3   | 4   | 5   | 6   | 7   | n-1 | n   |
Complexity: 
- Best Case: O(1) peak found early -> around index 1- Worse Case: O(n) peak at the end -> around index n 
  
  
### Another Approach
We can use the [[Divide & Conquer Algorithm]] to find the peak a lot faster