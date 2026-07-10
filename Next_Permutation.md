---
tags: [permutation, lexicographic, threepointer, interview]
topic: Next Permutation
step: "Step 3.2 (continued)"
pattern: Three-Step Algorithm
difficulty: Medium
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🔀 Next Permutation

## 📌 Quick Info

- **Problem**: Find next lexicographically greater permutation
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[INDEX_New_Problems#Pattern 4 Greedy Approach|Three-Step Algorithm]]
- **Key Concept**: Lexicographic ordering
- **Frequency**: ⭐⭐⭐⭐ (Very Common!)

**Related**: [[INDEX_New_Problems|← Back to Index]]

---

## 🎯 Problem Statement

Generate the **next lexicographically greater permutation** of an array.

**Examples**:
```
Input:  [1, 2, 3]
Output: [1, 3, 2]

Input:  [3, 2, 1]
Output: [1, 2, 3] (last permutation wraps to first)

Input:  [1, 1, 5]
Output: [1, 5, 1]

Input:  [1]
Output: [1] (only one permutation)
```

---

## 🧠 Core Intuition

### Understanding Lexicographic Order

**Think of a Dictionary**:
```
aaaa
aaab
aaac
...
zzz

Words with longer common prefix appear consecutively.
```

**For permutations**:
```
[1, 2, 3]  ← Common prefix: all
[1, 3, 2]  ← Common prefix: [1]
[2, 1, 3]  ← Common prefix: nothing (1 changes)
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]
```

### Key Insight: Maximize Prefix Length

To get **next** permutation (not jump ahead):
- **Keep the longest possible prefix the same**
- **Minimize change at that point**
- **Sort the rest in ascending order**

```
[2, 1, 5, 4, 3, 0]
       ↑ 
   Change here (smallest change to keep prefix long)
```

---

## 💡 How to Remember (Memory Hook)

### "Find Break, Swap, Reverse"

**Step 1: Find Break**
- Find rightmost position where value decreases
- Everything after is in descending order

**Step 2: Swap**
- Find smallest element greater than break point
- Swap them

**Step 3: Reverse**
- Reverse everything after break point
- (Was descending, now ascending = smallest)

---

## 🔍 The Three-Step Algorithm

### Step 1: Find the "Break Point" (Index)

**What**: Find rightmost index i where `arr[i] < arr[i+1]`

**Why**: Everything after this point is in descending order (no next permutation possible with longer prefix)

```cpp
int index = -1;
for(int i = n-2; i >= 0; i--) {
    if(arr[i] < arr[i+1]) {
        index = i;
        break;
    }
}

// If index == -1: This is the LAST permutation
// Reverse the entire array and return
if(index == -1) {
    reverse(arr.begin(), arr.end());
    return;
}
```

### Step 2: Find Swap Partner & Swap

**What**: Find the smallest element **greater than arr[index]** on its right

**Why**: This minimizes the change, keeping the permutation "next"

```cpp
// Everything to the right is descending
// Find rightmost element > arr[index]
int swapIdx = -1;
for(int i = n-1; i > index; i--) {
    if(arr[i] > arr[index]) {
        swapIdx = i;
        break;
    }
}

swap(arr[index], arr[swapIdx]);
```

### Step 3: Reverse the Right Portion

**What**: Reverse everything after index

**Why**: Right portion is in descending order. Reverse it to ascending (smallest possible arrangement)

```cpp
reverse(arr.begin() + index + 1, arr.end());
```

---

## 🚶 Detailed Walkthrough

### Example Array
```
Input:  [2, 1, 5, 4, 3, 0]
Output: [2, 3, 0, 1, 4, 5]
```

### Step 1: Find Break Point

```
Array:  [2, 1, 5, 4, 3, 0]
Index:   0  1  2  3  4  5

Check from right (i = n-2 down to 0):
i=4: arr[4]=3, arr[5]=0  → 3 < 0? NO
i=3: arr[3]=4, arr[4]=3  → 4 < 3? NO
i=2: arr[2]=5, arr[3]=4  → 5 < 4? NO
i=1: arr[1]=1, arr[2]=5  → 1 < 5? YES! ✓

Break point found: index = 1 (arr[1] = 1)
Right portion [5, 4, 3, 0] is descending
```

### Step 2: Find Swap Partner

```
Array:        [2, 1, 5, 4, 3, 0]
Break point:       ↑ (index 1, value 1)

Find the rightmost element > arr[1]=1, scanning from the right
(right portion is descending, so the rightmost match is the
smallest value greater than 1):

i=5: arr[5]=0  → 0 > 1? NO
i=4: arr[4]=3  → 3 > 1? YES! Take 3 ✓

swapIdx = 4
```

### Step 3: Swap

```
Before: [2, 1, 5, 4, 3, 0]
            ↑        ↑
           idx=1    swapIdx=4
After:  [2, 3, 5, 4, 1, 0]
```

### Step 4: Reverse Right Portion

```
Array after swap: [2, 3, 5, 4, 1, 0]
Reverse everything after index 1: [5, 4, 1, 0] → [0, 1, 4, 5]

Final: [2, 3, 0, 1, 4, 5] ✓
```

### A Second Example (with duplicates)

```
Input: [1, 3, 3, 2]

Step 1: Find break
i=2: arr[2]=3, arr[3]=2  → 3 < 2? NO
i=1: arr[1]=3, arr[2]=3  → 3 < 3? NO
i=0: arr[0]=1, arr[1]=3  → 1 < 3? YES! ✓
Break index = 0

Step 2: Find swap > arr[0]=1, scanning from right
i=3: arr[3]=2  → 2 > 1? YES! ✓
swapIdx = 3

Step 3: Swap arr[0] and arr[3]: [2, 3, 3, 1]

Step 4: Reverse from index 1 onwards
[3, 3, 1] → [1, 3, 3]

Final: [2, 1, 3, 3] ✓
```

---

## 🧪 Code Implementation

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        
        // STEP 1: Find break point
        int index = -1;
        for(int i = n - 2; i >= 0; i--) {
            if(nums[i] < nums[i + 1]) {
                index = i;
                break;
            }
        }
        
        // STEP 2: If no break point, this is last permutation
        if(index == -1) {
            reverse(nums.begin(), nums.end());
            return;
        }
        
        // STEP 3: Find smallest element > nums[index]
        int swapIdx = -1;
        for(int i = n - 1; i > index; i--) {
            if(nums[i] > nums[index]) {
                swapIdx = i;
                break;
            }
        }
        
        // STEP 4: Swap
        swap(nums[index], nums[swapIdx]);
        
        // STEP 5: Reverse right portion
        reverse(nums.begin() + index + 1, nums.end());
    }
};
```

---

## 📊 Complete Walkthrough Example

### Array: [1, 5, 8, 4, 7, 6, 5, 3, 1]

```
STEP 1: Find break point
─────────────────────────
Checking from right:
i=7: 3 < 1? NO (3 > 1)
i=6: 5 < 3? NO
i=5: 6 < 5? NO
i=4: 7 < 6? NO
i=3: 4 < 7? YES! ✓

Break point: index = 3 (value = 4)
Right of break: [7, 6, 5, 3, 1] (descending)

STEP 2: Find swap partner
──────────────────────────
Find smallest element > 4 from right:
i=8: 1 > 4? NO
i=7: 3 > 4? NO
i=6: 5 > 4? YES! ✓

Take the FIRST (rightmost) match: 5

STEP 3: Swap
────────────
Before: [1, 5, 8, 4, 7, 6, 5, 3, 1]
                  ↑           ↑
After:  [1, 5, 8, 5, 7, 6, 4, 3, 1]

STEP 4: Reverse right portion
───────────────────────────────
From index 4 onwards: [7, 6, 4, 3, 1]
Reverse to: [1, 3, 4, 6, 7]

FINAL: [1, 5, 8, 5, 1, 3, 4, 6, 7] ✓
```

---

## 🎯 Edge Cases

| Case | Input | Output | Explanation |
|---|---|---|---|
| Last perm | [3, 2, 1] | [1, 2, 3] | Wrap around |
| Single element | [5] | [5] | Only one perm |
| Two elements | [1, 2] | [2, 1] | Simple swap |
| All same | [5, 5, 5] | [5, 5, 5] | Only one perm |
| Duplicates | [1, 3, 2] | [2, 1, 3] | Handles duplicates |

---

## 🔗 Related Problems

- [[Best_Time_Buy_Sell_Stock|Stock Problem]] (Different pattern)
- Previous permutation (reverse logic)
- K-th permutation (more complex)
- All permutations (brute force)

---

## 💪 Practice Variations

1. **Previous Permutation**: Similar 3-step but reverse operations
2. **K-th Permutation**: Given K, find K-th permutation
3. **All Permutations**: Generate all permutations
4. **Permutations with Duplicates**: Handle duplicate elements

---

## 🧠 Memorization Checklist

- [ ] Understand lexicographic ordering
- [ ] Know the three steps (find break, swap, reverse)
- [ ] Understand why descending portion exists
- [ ] Trace through multiple examples
- [ ] Code without reference
- [ ] Can explain edge case (last permutation)

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Start from wrong position | Start loop from n-2 going backward |
| Include break point in reversal | Reverse from index+1, not index |
| Find largest instead of smallest > | Find smallest element GREATER than break |
| Forget edge case (index=-1) | Reverse entire array when index=-1 |

---

## ⏱️ Complexity Analysis

- **Time**: O(n) - worst case all three steps are O(n)
- **Space**: O(1) - only doing swaps and reverses in-place

---

**Back to**: [[INDEX_New_Problems|New Problems Index]]
**Related**: [[Rearrange_Array_by_Sign|Rearrange by Sign]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
