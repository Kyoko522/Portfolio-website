```python
class Solution(object):
	def lengthOfLongestSubstring(self, s):
	"""
	:type s: str
	:rtype: int
	"""

	seen = {}
	max_count = 0
	start = 0

	for i, letter in enumerate(s):
		if letter in seen and seen[letter] >= start:
			start = seen[letter] + 1
			seen[letter] = i
			max_count = max(max_count, i - start + 1)
	return max_count
```

^ Wrong 