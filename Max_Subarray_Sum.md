---
tags: [kadane, dynamicprogramming, greedy, maxsubarray, arrays, interview]
topic: Maximum Subarray Sum — Kadane's Algorithm
step: "Step 3.2"
pattern: Greedy Approach
difficulty: Medium
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🟢 Maximum Subarray Sum - Kadane's Algorithm

## 📌 Quick Info

- **Problem**: Find maximum sum of any contiguous subarray
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Arrays Medium|Greedy Approach]]
- **Key Algorithm**: Kadane's Algorithm
- **Frequency**: ⭐⭐⭐⭐⭐ (Most Common!)

**Related**: [[Arrays Medium|← Back to Index]]

---

## 🎯 Problem Statement

Given an array, find the **contiguous subarray** with the **largest sum**.

**Examples**:
```
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6 (subarray [4, -1, 2, 1])

Array: [5, 4, -1, 7, 8]
Output: 23 (entire array)

Array: [-2, -1, -3]
Output: -1 (single element -1, least negative)
```

---

## 🧠 Core Intuition

### The Key Insight: Negative Sums Hurt

**Critical Realization**:
```
If your current sum is negative, it only DECREASES the next element!

Example:
Array: [4, -5, 3]

Option 1: Carry the negative
  sum = 4
  sum += (-5) = -1
  sum += 3 = 2

Option 2: Drop the negative, start fresh
  sum = 4
  sum = 0 (dropped -1)
  sum += 3 = 3 ✓ BETTER!

Why? Because -1 only makes 3 worse!
```

### The Greedy Choice

At each step, ask yourself:
```
"Should I continue my current sum, or start fresh?"

Continue if: current sum > 0 (it helps the next element)
Start fresh if: current sum < 0 (it hurts the next element)
```

### Mental Model: Carrying vs Dropping

Think of it as carrying a backpack:
```
If your backpack is empty (sum=0):
  Pick up the current item (nums[i])
  
If your backpack has positive value:
  Keep carrying it, add current item
  
If your backpack has negative value:
  Drop it! (reset to 0)
  Start with current item instead
  
Keep track of: What's the heaviest I've ever carried?
```

---

## 💡 How to Remember (Memory Hook)

### "Carry Positive, Drop Negative"

**The Three-Step Pattern**:
```
1. Add current element to current sum
2. Update maximum we've seen
3. If sum becomes negative, reset to 0
```

### Why This Works

Because:
- A negative number only reduces future sums
- Starting fresh is always better than carrying negative
- We track the best sum we've achieved

---

## 🔍 Approach 1: Brute Force - O(n³)

### Algorithm

Generate all subarrays, calculate each sum.

```cpp
int maxSubarray_Brute(vector<int>& nums) {
    int maxSum = INT_MIN;
    int n = nums.size();
    
    // Starting point
    for(int i = 0; i < n; i++) {
        // Ending point
        for(int j = i; j < n; j++) {
            // Calculate sum of subarray i to j
            int sum = 0;
            for(int k = i; k <= j; k++) {
                sum += nums[k];
            }
            maxSum = max(maxSum, sum);
        }
    }
    
    return maxSum;
}
```

### Complexity
- **Time**: O(n³) - three nested loops
- **Space**: O(1)

---

## 🔄 Approach 2: Better - O(n²)

### Optimization

Don't recalculate sum. Add incrementally.

```cpp
int maxSubarray_Better(vector<int>& nums) {
    int maxSum = INT_MIN;
    int n = nums.size();
    
    for(int i = 0; i < n; i++) {
        int sum = 0;  // Reset for each starting point
        
        for(int j = i; j < n; j++) {
            sum += nums[j];  // Add incrementally
            maxSum = max(maxSum, sum);
        }
    }
    
    return maxSum;
}
```

### Complexity
- **Time**: **O(n²)** - eliminated inner loop
- **Space**: O(1)

### Improvement Over Brute

```
Brute:   [i] [j] [k] = O(n³)
Better:  [i] [j]     = O(n²)

Key: Maintain running sum instead of recalculating
```

---

## ⭐ Approach 3: Kadane's Algorithm - OPTIMAL

### The Algorithm

```cpp
int maxSubarray_Optimal(vector<int>& nums) {
    int currentSum = 0;
    int maxSum = nums[0];  // Start with first element
    
    for(int num : nums) {
        currentSum += num;
        maxSum = max(maxSum, currentSum);
        
        // If sum is negative, reset
        if(currentSum < 0) {
            currentSum = 0;
        }
    }
    
    return maxSum;
}
```

### Why Start With nums[0]?

Because even if all numbers are negative, we still need to return the largest negative number (least negative).

```
Array: [-5, -2, -3]
maxSum should be -2 (least negative)
Not 0 (which would be "empty subarray")

So initialize: maxSum = nums[0]
```

### Complexity
- **Time**: **O(n)** - single pass
- **Space**: **O(1)** - only two variables

---

## 🚶 Detailed Walkthrough

### Example Array
```
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Expected Output: 6 (from subarray [4, -1, 2, 1])
```

### Step-by-Step Trace

```
Initial: currentSum=0, maxSum=-2

i=0, num=-2:
  currentSum = 0 + (-2) = -2
  maxSum = max(-2, -2) = -2
  currentSum < 0? Yes → reset to 0

i=1, num=1:
  currentSum = 0 + 1 = 1
  maxSum = max(-2, 1) = 1
  currentSum < 0? No

i=2, num=-3:
  currentSum = 1 + (-3) = -2
  maxSum = max(1, -2) = 1
  currentSum < 0? Yes → reset to 0

i=3, num=4:
  currentSum = 0 + 4 = 4
  maxSum = max(1, 4) = 4
  currentSum < 0? No

i=4, num=-1:
  currentSum = 4 + (-1) = 3
  maxSum = max(4, 3) = 4
  currentSum < 0? No

i=5, num=2:
  currentSum = 3 + 2 = 5
  maxSum = max(4, 5) = 5
  currentSum < 0? No

i=6, num=1:
  currentSum = 5 + 1 = 6
  maxSum = max(5, 6) = 6 ← ANSWER!
  currentSum < 0? No

i=7, num=-5:
  currentSum = 6 + (-5) = 1
  maxSum = max(6, 1) = 6
  currentSum < 0? No

i=8, num=4:
  currentSum = 1 + 4 = 5
  maxSum = max(6, 5) = 6
  currentSum < 0? No

Final: maxSum = 6 ✓
Subarray: [4, -1, 2, 1] (indices 3-6)
```

### Key Observations

1. When currentSum goes negative, we reset (indices 0, 2)
2. We don't carry negative prefixes forward
3. The maximum we see is 6 (at index 6)
4. This optimal subarray is [4, -1, 2, 1]

---

## 🧪 Code Implementation

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currentSum = 0;
        int maxSum = nums[0];
        
        for(int num : nums) {
            // Add current number to running sum
            currentSum += num;
            
            // Update maximum if needed
            maxSum = max(maxSum, currentSum);
            
            // If sum becomes negative, reset
            // (negative sum only hurts future elements)
            if(currentSum < 0) {
                currentSum = 0;
            }
        }
        
        return maxSum;
    }
};
```

---

## 📍 Follow-up: Find the Actual Subarray

### Problem

Not just the sum, but which elements form that subarray?

### Solution

Track start and end indices:

```cpp
vector<int> maxSubarray_WithIndices(vector<int>& nums) {
    int currentSum = 0;
    int maxSum = nums[0];
    int tempStart = 0;      // Where current subarray starts
    int resultStart = 0;    // Where max subarray starts
    int resultEnd = 0;      // Where max subarray ends
    
    for(int i = 0; i < nums.size(); i++) {
        currentSum += nums[i];
        
        // Found a better maximum
        if(currentSum > maxSum) {
            maxSum = currentSum;
            resultStart = tempStart;
            resultEnd = i;
        }
        
        // Reset when sum goes negative
        if(currentSum < 0) {
            currentSum = 0;
            tempStart = i + 1;  // Next subarray starts after current
        }
    }
    
    // Extract subarray using indices
    vector<int> result(nums.begin() + resultStart, 
                      nums.begin() + resultEnd + 1);
    return result;
}
```

### Example

```
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
tempStart when reset at i=0: tempStart = 1
tempStart when reset at i=2: tempStart = 3

When we find max at i=6:
resultStart = 3, resultEnd = 6
Subarray: nums[3..6] = [4, -1, 2, 1] ✓
```

---

## 🎯 When to Use Kadane's

| Scenario | Use Kadane? |
|---|---|
| Find max sum of any subarray | ✅ YES |
| Find max sum with constraint (e.g., at least k elements) | ❌ Different approach |
| 2D array max subarray sum | ⚠️ Extend Kadane |
| Find all subarrays with max sum | ✅ Modify to collect all |

---

## 🔗 Related Problems

- [[Majority_Element|Majority Element]] (Similar greedy)
- [[Max_Subarray_Sum#Follow-up: Find the Actual Subarray|Find max subarray (follow-up)]]
- [[ARRAY easy part 3#Problem 7 — Longest Subarray with Sum K|Longest Subarray with Sum K]] (Different approach)

---

## 💪 Practice Variations

1. **Maximum product subarray**
   - Can't use same approach (negative×negative=positive)

2. **Minimum subarray sum**
   - Same algorithm, track minimums instead

3. **K non-overlapping subarrays**
   - Dynamic programming variation

4. **Subarray sum closest to target**
   - Store all prefix sums

---

## 🧠 Memorization Checklist

- [ ] Understand why negative resets work
- [ ] Know why maxSum = nums[0] (not INT_MIN)
- [ ] Memorize: "Carry positive, drop negative"
- [ ] Trace through example yourself
- [ ] Code without reference
- [ ] Can find actual subarray (follow-up)
- [ ] Know when greedy works

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| maxSum = INT_MIN (allows empty subarray) | Use maxSum = nums[0] |
| Checking `currentSum <= 0` | Use `currentSum < 0` (0 is okay) |
| Not updating maxSum before resetting | Update maxSum FIRST |
| Losing track of indices | Use tempStart when resetting |

---

## 📊 Complexity Comparison

| Approach | Time | Space | Practical |
|---|---|---|---|
| Brute | O(n³) | O(1) | Very slow |
| Better | O(n²) | O(1) | Okay for n<1000 |
| **Kadane** | **O(n)** | **O(1)** | **Perfect** |

---

## 🧠 Why Greedy Works Here

Usually greedy doesn't work (counter-intuitive), but here:
1. We ONLY care about maximum
2. Negative sum is ALWAYS suboptimal
3. Starting fresh is ALWAYS valid choice
4. These conditions together make greedy optimal

---

**Back to**: [[Arrays Medium|Advanced Problems Index]]
**Related**: [[Max_Subarray_Sum#Core Intuition|Intuition Explained]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
