---
tags: [dutchflag, threepointers, inplace, arrays, interview]
topic: Sort Array of 0s, 1s, and 2s — Dutch National Flag
step: "Step 3.2"
pattern: Three-Pointer Technique
difficulty: Medium
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🟡 Sort Array of 0s, 1s, and 2s - Dutch National Flag

## 📌 Quick Info

- **Problem**: Sort array containing only 0, 1, 2
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Arrays Medium|Three-Pointer Technique]]
- **Key Algorithm**: Dutch National Flag
- **Frequency**: ⭐⭐⭐⭐ (Very Common)

**Related**: [[Arrays Medium|← Back to Index]]

---

## 🎯 Problem Statement

Sort array containing **only 0, 1, and 2** in ascending order, with **O(n) time and O(1) space**.

**Examples**:
```
Input:  [1, 2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 1, 2, 2]

Input:  [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
```

---

## 🧠 Core Intuition

### The Mental Model: Dutch Flag Zones

Imagine the array is a **Dutch flag** with three colored zones:

```
[RED  | WHITE | UNKNOWN | BLUE]
[0s   | 1s    | ?????   | 2s  ]
 ↑           ↑         ↑      ↑
 0         low       mid     high
                               n-1

Region 1: 0 to (low-1)   = all 0s (sorted)
Region 2: low to (mid-1) = all 1s (sorted)
Region 3: mid to high    = unknown (what we're sorting)
Region 4: (high+1) to n-1 = all 2s (sorted)
```

### Key Insight: Three Pointers

Why three pointers? Because:
- **low**: Maintains boundary of 0s zone
- **mid**: Current exploring pointer
- **high**: Maintains boundary of 2s zone

Each pointer ensures its respective region stays sorted!

---

## 💡 How to Remember (Memory Hook)

### "0 Goes Left, 1 Stays, 2 Goes Right"

**The Decision Tree**:

```
See a 0? → Move it to the left (low zone)
          ↓
          Swap with low, move both low and mid

See a 1? → It's already correct
          ↓
          Just move mid

See a 2? → Move it to the right (high zone)
          ↓
          Swap with high, move only high
```

### Why Different Moves?

This is the tricky part. Let me explain:

```
When you swap 0 with low:
- Position at low gets a 0 (correct!)
- What was at low goes to mid
- What was at low? Probably ≥ 1, so safe to move mid

When you don't move mid for 1:
- 1 is already in correct region
- mid is in [low, high) which is for 1s
- Safe to just move mid

When you swap 2 with high:
- Position at high gets a 2 (correct!)
- What was at high comes to mid
- What was at high? Could be 0, 1, or 2!
- DON'T move mid, check again next iteration
```

---

## 🔍 Approach 1: Counting Sort - O(2n)

### Algorithm

Count each element, then overwrite array.

```cpp
void sortColors_Counting(vector<int>& nums) {
    int count0 = 0, count1 = 0, count2 = 0;
    
    // Count each value
    for(int num : nums) {
        if(num == 0) count0++;
        else if(num == 1) count1++;
        else count2++;
    }
    
    // Overwrite array
    int idx = 0;
    for(int i = 0; i < count0; i++) nums[idx++] = 0;
    for(int i = 0; i < count1; i++) nums[idx++] = 1;
    for(int i = 0; i < count2; i++) nums[idx++] = 2;
}
```

### Complexity
- **Time**: O(n) + O(n) = O(2n) → **O(n)**
- **Space**: **O(1)**

### Why Not Optimal?

While O(n) time and O(1) space, it requires **two passes**. Dutch National Flag does it in **one pass**.

---

## ⭐ Approach 2: Dutch National Flag - OPTIMAL

### The Algorithm

```cpp
void sortColors_Optimal(vector<int>& nums) {
    int low = 0;
    int mid = 0;
    int high = nums.size() - 1;
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            // 0 should be at left
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        }
        else if(nums[mid] == 1) {
            // 1 is already correct
            mid++;
        }
        else {  // nums[mid] == 2
            // 2 should be at right
            swap(nums[mid], nums[high]);
            high--;
            // Note: mid stays, don't increment!
        }
    }
}
```

### Why This Works

**Invariant (Always True)**:
```
[0, 0, 0, ... | 1, 1, 1, ... | ?, ?, ? | ..., 2, 2, 2]
 0 to low-1     low to mid-1   mid to high   high+1 to n-1
```

At each step, we maintain this invariant by:
1. Moving 0 to left region
2. Keeping 1 in middle region
3. Moving 2 to right region

### Complexity
- **Time**: **O(n)** - single pass
- **Space**: **O(1)** - in-place

---

## 🚶 Detailed Walkthrough

### Example Array
```
Input: [1, 2, 0, 2, 1, 1, 0]
Goal:  [0, 0, 1, 1, 1, 2, 2]
```

### Step-by-Step Trace

```
Initial: low=0, mid=0, high=6
Array:   [1, 2, 0, 2, 1, 1, 0]

Iteration 1: mid=0, nums[0]=1
  Case: nums[mid]==1? Yes
  Action: mid++
  Result: [1, 2, 0, 2, 1, 1, 0]
  State: low=0, mid=1, high=6

Iteration 2: mid=1, nums[1]=2
  Case: nums[mid]==2? Yes
  Action: swap(mid, high) → swap(1, 0)
  Result: [1, 0, 0, 2, 1, 1, 2]
  State: low=0, mid=1, high=5
  (mid stays because we don't know what came from high!)

Iteration 3: mid=1, nums[1]=0
  Case: nums[mid]==0? Yes
  Action: swap(low, mid) → swap(0, 0)
  Result: [0, 1, 0, 2, 1, 1, 2]
  State: low=1, mid=2, high=5

Iteration 4: mid=2, nums[2]=0
  Case: nums[mid]==0? Yes
  Action: swap(low, mid) → swap(1, 0)
  Result: [0, 0, 1, 2, 1, 1, 2]
  State: low=2, mid=3, high=5

Iteration 5: mid=3, nums[3]=2
  Case: nums[mid]==2? Yes
  Action: swap(mid, high) → swap(2, 2)
  Result: [0, 0, 1, 2, 1, 1, 2]
  State: low=2, mid=3, high=4
  (Nothing changes, but pointers move)

Iteration 6: mid=3, nums[3]=2
  Case: nums[mid]==2? Yes
  Action: swap(mid, high) → swap(2, 1)
  Result: [0, 0, 1, 1, 1, 2, 2]
  State: low=2, mid=3, high=3

Iteration 7: mid=3, nums[3]=1
  Case: nums[mid]==1? Yes
  Action: mid++
  Result: [0, 0, 1, 1, 1, 2, 2]
  State: low=2, mid=4, high=3

Condition Check: mid (4) <= high (3)? NO
→ EXIT LOOP

Final Result: [0, 0, 1, 1, 1, 2, 2] ✓
```

### Key Observation

Notice how at iteration 2, we swap with high but don't move mid. This is because we don't know what value comes from position `high`. It could be 0, 1, or 2!

---

## 🧪 Code Implementation

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        
        while(mid <= high) {
            if(nums[mid] == 0) {
                // Swap with low boundary
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            }
            else if(nums[mid] == 1) {
                // Already in correct position
                mid++;
            }
            else {  // nums[mid] == 2
                // Swap with high boundary
                swap(nums[mid], nums[high]);
                high--;
                // DON'T increment mid!
            }
        }
    }
};
```

---

## 🎯 Visual Understanding

### Zone Diagram

```
[0s] | [1s] | [unknown] | [2s]

Start:
[?] | [?] | [1,2,0,2,1,1,0] | [?]
 0    1    2              5     6

Each iteration moves elements between zones
until unknown zone is empty
```

### Why mid Doesn't Move for 2

```
Before:        After swap:
[..., mid]  →  [..., mid] (contains what was at high)
[..., high]     [..., 2]   (2 is now in correct zone)

We don't know what came from high, so reprocess mid!
```

---

## 💪 Practice Variations

1. **K different values** (0, 1, 2, 3, ...)
   - Use same approach with K+1 zones

2. **Count operations** 
   - Minimize number of swaps

3. **Preserve relative order**
   - Stable sort requirement

4. **In-place with limited space**
   - Verify O(1) space guarantee

---

## 🔗 Related Problems

- [[Majority_Element|Majority Element]] (Similar traversal)
- [[Two_Sum_Complete|Two Sum]] (Two-pointer variation)
- [[Max_Subarray_Sum|Max Subarray Sum]] (Single pass pattern)
- [[Rearrange_Array_by_Sign|Rearrange by Sign]] (Similar zone/index concept)

---

## 🧠 Memorization Checklist

- [ ] Understand three zones concept
- [ ] Know why mid doesn't move for 2
- [ ] Memorize: "0→left, 1→stay, 2→right"
- [ ] Trace through example yourself
- [ ] Code without reference
- [ ] Can explain why O(n) single pass works

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Moving mid after swapping with high | Don't! Check same mid next iteration |
| Using low++ without also mid++ on 0 | Both must move since mid is at low |
| Not initializing mid = 0 | mid always starts at beginning |
| Condition is `mid < high` | Use `mid <= high` |

---

**Back to**: [[Arrays Medium|Advanced Problems Index]]
**Related**: [[Sort_0_1_2#Core Intuition|Intuition Explained]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
