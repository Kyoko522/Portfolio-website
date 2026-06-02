```python
class Solution(object):
	def twoSum(self, nums, target):
	
	"""
	:type nums: List[int]
	:type target: int
	:rtype: List[int]
	"""
	dic = {}

	for index, value in enumerate(nums):
		left = target - value
		
		if left in dic:
			return [dic[left], index]
		
		dic[value] = index
	return []
```