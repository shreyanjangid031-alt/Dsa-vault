**What**  
Compute the total units of water that can be trapped between non‑negative building heights in an array.  
Water at index *i* = `max( min(maxLeft, maxRight) - height[i], 0 )`.

**Why**  
The brute‑force approach recomputes left/right maxima for each index, costing *O(n²)* time and *O(n)* space for prefix/suffix arrays.  
The two‑pointer method achieves *O(n)* time and *O(1)* auxiliary space, which is optimal for this problem and preferred in interviews.

**How**  
1. Initialise `left = 0`, `right = n-1`, `leftMax = 0`, `rightMax = 0`, `total = 0`.  
2. While `left < right`:  
   * If `height[left] <= height[right]`:  
     - If `height[left] >= leftMax` → update `leftMax = height[left]`.  
     - Else `total += leftMax - height[left]`.  
     - Increment `left`.  
   * Else (`height[right] < height[left]`):  
     - If `height[right] >= rightMax` → update `rightMax = height[right]`.  
     - Else `total += rightMax - height[right]`.  
     - Decrement `right`.  
3. Return `total`.

The algorithm always processes the smaller side first, guaranteeing that the corresponding maximum (`leftMax` or `rightMax`) is already the limiting factor for water trapping.

**Diagram**  
```
heights:  2  1  0  3  2  5
          ^          ^
          left      right
          |          |
          v          v
leftMax:  2  2  2  3  3  5
rightMax: 5  5  5  5  5  5
water:    0  1  2  0  1  0
```
The two pointers converge from both ends, updating maxima and accumulating trapped water.

**Comparison Table**

| Approach | Time | Space | Key Idea |
|----------|------|-------|----------|
| Prefix‑Suffix | O(n) | O(n) | Precompute left/right maxima arrays |
| Two‑Pointer | O(n) | O(1) | Process smaller side first, maintain running maxima |

**Example**  

Problem:  
Given `heights = [4,2,0,3,2,5]`, compute trapped water.

```cpp
#include <bits/stdc++.h>
using namespace std;

int trap(vector<int>& height) {
    int left = 0, right = (int)height.size() - 1;
    int leftMax = 0, rightMax = 0, total = 0;
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else total += leftMax - height[left];
            ++left;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else total += rightMax - height[right];
            --right;
        }
    }
    return total;
}

int main() {
    vector<int> h = {4,2,0,3,2,5};
    cout << trap(h) << endl; // Output: 9
}
```

The function returns `9`, which is the sum of trapped units: `2 + 4 + 3`.

**Related Concepts**  
- [[ARRAY easy part 1]] (two‑pointer technique)  
- [[Two_Sum_Complete]] (hashing for complement)  
- [[STL]] (vector usage)  
- [[Leaders_in_Array]] (left max concept)  
- [[Best_Time_Buy_Sell_Stock]] (greedy approach)  
- [[Subarray_Sum_Equals_K]] (prefix sum idea)