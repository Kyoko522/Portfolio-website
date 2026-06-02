Requires the association of an additional bit with each frame 
	- referred to as the use bit 
- when a page is first loaded memory the use bit is set to 1 
- when a page is referenced, the use bit is set to 1 
- the set of frames is considered to be a circular buffer 
- the algorithm gives preference to frames with use bit 0

### Algorithm 
- Pointer is maintained. Next frame after replace frame 
- To select frame, start a pointer, looking at use bits 
	- if bit = 0 stop, replace this frame, set point to next 
	- else if bit = 1, set it ot 0, keep going
- if all bits were 1, will makes one complete cycle - but when return to original position, bit will be 0, so will be selected 
- Note: frames with use bit 1 are "passed over" by algorithm