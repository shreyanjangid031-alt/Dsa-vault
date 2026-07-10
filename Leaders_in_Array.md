---
tags: [leaders, backward, tracking, arrays, interview]
topic: Leaders in an Array
step: "Step 3.2 (continued)"
pattern: Backward Iteration + Tracking
difficulty: Medium
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🏆 Leaders in an Array

## 📌 Quick Info

- **Problem**: Find elements greater than all elements to their right
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[INDEX_New_Problems#Pattern 1 Tracking Values|Backward Iteration + Tracking]]
- **Key Concept**: Track right maximum
- **Frequency**: ⭐⭐⭐⭐ (Common)

**Related**: [[INDEX_New_Problems|← Back to Index]]

---

## 🎯 Problem Statement

### Definition: Leader Element

An element is a **leader** if all elements to its right are **smaller than it**.

**Examples**:
```
Input:  [10, 22, 12, 3, 0, 6]
Output: [22, 12, 6]

Why?
- 22: right has [12, 3, 0, 6] all < 22 ✓
- 12: right has [3, 0, 6] all < 12 ✓
- 3: right has [6], but 6 > 3 ✗
- 6: right is empty ✓ (last always leader)

Input:  [10, 17, 5, 3, 5, 2]
Output: [17, 5, 5, 2]
```

---

## 🧠 Core Intuition

### The Key Insight: Work Backward

**Forward approach** (naive):
```cpp
For each element i:
  Check all elements j > i
  If all are smaller, it's a leader
  Time: O(n²)
```

**Backward approach** (optimal):
```cpp
For each element (right to left):
  Is it > maximum seen so far (from right)?
  If yes, it's a leader & update max
  Time: O(n)
```

### Why Backward Works

Think of it like a **right-side championship**:

```
[10, 22, 12, 3, 0, 6]

Starting from right:
6: Nothing to right, so it's a champion ✓
0: Max on right = 6, 0 < 6, not champion ✗
3: Max on right = 6, 3 < 6, not champion ✗
12: Max on right = 6, 12 > 6, IT'S A CHAMPION! ✓
   Update max to 12
22: Max on right = 12, 22 > 12, CHAMPION! ✓
   Update max to 22
10: Max on right = 22, 10 < 22, not champion ✗
```

### Mental Model: Running Maximum

As you traverse right-to-left:
```
Keep track of: "What's the biggest thing I've seen on my right?"

If I'm bigger than the biggest on my right:
  → I'm a leader!
  → I become the new "biggest on the right" for next iteration
```

---

## 💡 How to Remember (Memory Hook)

### "Iterate Backward, Track Max"

**Three Simple Steps**:
1. Start from the **right** (last element)
2. Keep **maximum value** seen so far (from right)
3. If current > maximum, it's a **leader** & update max

```
maxFromRight = INT_MIN
for i from n-1 to 0:
  if arr[i] > maxFromRight:
    arr[i] is a leader
    maxFromRight = arr[i]  // Update
```

---

## 🔍 Approach 1: Brute Force - O(n²)

### Algorithm

For each element, check all elements to its right.

```cpp
vector<int> leaders_Brute(vector<int>& nums) {
    vector<int> ans;
    int n = nums.size();
    
    for(int i = 0; i < n; i++) {
        bool isLeader = true;
        
        // Check all elements to the right
        for(int j = i + 1; j < n; j++) {
            if(nums[j] > nums[i]) {
                isLeader = false;
                break;
            }
        }
        
        if(isLeader) {
            ans.push_back(nums[i]);
        }
    }
    
    return ans;
}
```

### Complexity
- **Time**: O(n²) - nested loops
- **Space**: O(1) excluding output

---

## ⭐ Approach 2: Optimal - O(n)

### Algorithm

Backward iteration with running maximum.

```cpp
vector<int> leaders_Optimal(vector<int>& nums) {
    vector<int> ans;
    int n = nums.size();
    int maxFromRight = INT_MIN;
    
    // Iterate from right to left
    for(int i = n - 1; i >= 0; i--) {
        if(nums[i] > maxFromRight) {
            ans.push_back(nums[i]);
            maxFromRight = nums[i];
        }
    }
    
    // Reverse because we collected in reverse order
    reverse(ans.begin(), ans.end());
    
    return ans;
}
```

### Complexity
- **Time**: **O(n)** - single backward pass
- **Space**: **O(1)** excluding output array

### Key Points
1. Start `maxFromRight` at INT_MIN (or use last element)
2. Traverse from right to left
3. Compare with max, not with all elements
4. Reverse result if you need original order

---

## 🚶 Detailed Walkthrough

### Example Array
```
Input:  [10, 22, 12, 3, 0, 6]
Output: [22, 12, 6]
```

### Step-by-Step

```
Initial:
maxFromRight = INT_MIN
ans = []

─────────────────────────────

i=5, nums[5]=6:
  6 > INT_MIN? YES
  Add 6 to ans: [6]
  maxFromRight = 6

─────────────────────────────

i=4, nums[4]=0:
  0 > 6? NO
  Skip

─────────────────────────────

i=3, nums[3]=3:
  3 > 6? NO
  Skip

─────────────────────────────

i=2, nums[2]=12:
  12 > 6? YES
  Add 12 to ans: [6, 12]
  maxFromRight = 12

─────────────────────────────

i=1, nums[1]=22:
  22 > 12? YES
  Add 22 to ans: [6, 12, 22]
  maxFromRight = 22

─────────────────────────────

i=0, nums[0]=10:
  10 > 22? NO
  Skip

─────────────────────────────

Reverse ans: [6, 12, 22] → [22, 12, 6] ✓
```

---

## 🧪 Code Implementation

### Simple Version (Backward, then Reverse)

```cpp
class Solution {
public:
    vector<int> leaders(vector<int>& arr) {
        vector<int> ans;
        int maxFromRight = INT_MIN;
        int n = arr.size();
        
        // Go backward
        for(int i = n - 1; i >= 0; i--) {
            if(arr[i] > maxFromRight) {
                ans.push_back(arr[i]);
                maxFromRight = arr[i];
            }
        }
        
        // Reverse to get original order
        reverse(ans.begin(), ans.end());
        
        return ans;
    }
};
```

### Optimized Version (Sorted Output)

If the problem asks for sorted leaders:

```cpp
class Solution {
public:
    vector<int> leaders(vector<int>& arr) {
        vector<int> ans;
        int maxFromRight = INT_MIN;
        int n = arr.size();
        
        for(int i = n - 1; i >= 0; i--) {
            if(arr[i] > maxFromRight) {
                ans.push_back(arr[i]);
                maxFromRight = arr[i];
            }
        }
        
        // If sorted output needed, just sort
        // (no need to reverse)
        sort(ans.begin(), ans.end());
        
        return ans;
    }
};
```

---

## 🎯 Edge Cases

| Case | Input | Output | Explanation |
|---|---|---|---|
| All increasing | [1, 2, 3, 4, 5] | [5] | Only last is leader |
| All decreasing | [5, 4, 3, 2, 1] | [5,4,3,2,1] | All are leaders |
| Single element | [7] | [7] | Always a leader |
| All same | [5, 5, 5, 5] | [5] | Last element only |
| Duplicates | [5, 5, 3, 3] | [5, 5] | Handle duplicates |

---

## 🚨 Why Backward Iteration Works

### Mathematical Proof

For each position i, we need to know: "Is `arr[i]` greater than ALL of `arr[i+1..n-1]`?"

**Equivalently**: "Is `arr[i]` greater than `max(arr[i+1..n-1])`?"

**Backward iteration gives us**:
- At position i, `maxFromRight` = `max(arr[i+1..n-1])`
- Single comparison: `arr[i] > maxFromRight`
- Time: O(1) per element = O(n) total

---

## 📊 Comparison: Brute vs Optimal

```
BRUTE FORCE:
┌─────────────────────────┐
│ For each element i:     │
│   Check all j > i       │
│   If all smaller: add   │
└─────────────────────────┘
Time: O(n²)

OPTIMAL:
┌─────────────────────────┐
│ From right to left:     │
│   Is it > max_right?    │
│   If yes: add & update  │
└─────────────────────────┘
Time: O(n)
```

---

## 🔗 Related Problems

- [[Best_Time_Buy_Sell_Stock|Stock Problem]] (Forward tracking)
- [[Max_Subarray_Sum|Max Subarray Sum]] (Different pattern)
- Product of array except self (forward + backward)
- Majority element (tracking)

---

## 💪 Practice Variations

1. **Count of Leaders**: Return count instead of elements
2. **Index of Leaders**: Return indices instead of values
3. **2D Array**: Find leaders in 2D arrays
4. **With Constraints**: Leaders with additional conditions

---

## 🧠 Memorization Checklist

- [ ] Understand definition (greater than all to right)
- [ ] Know why backward works
- [ ] Understand running maximum concept
- [ ] Trace through example yourself
- [ ] Code without reference
- [ ] Know when to reverse vs not reverse

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Going forward instead of backward | ALWAYS go backward from right to left |
| Comparing with all elements on right | Just compare with running max |
| Forgetting to reverse | Reverse if you need original order |
| Starting max at 0 | Use INT_MIN (or last element) |
| Including element itself | Don't include in max calculation |

---

## ⏱️ Complexity Analysis

```
BRUTE FORCE:
- Outer loop: O(n)
- Inner loop: O(n) at worst
- Total: O(n²)

OPTIMAL:
- Single backward loop: O(n)
- Reverse (if needed): O(k) where k = num leaders
- Total: O(n)
```

---

## 📈 Why This Is Optimal

You **cannot do better than O(n)** because:
1. You must look at every element at least once
2. Backward iteration sees `max(right)` naturally
3. No data structure overhead needed

---

**Back to**: [[INDEX_New_Problems|New Problems Index]]
**Related**: [[Best_Time_Buy_Sell_Stock|Stock Problem]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
