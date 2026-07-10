---
tags: [arrays, patterns, indexing, interview]
topic: Rearrange Array Elements by Sign
step: "Step 3.2 (continued)"
pattern: Index Manipulation
difficulty: Easy to Medium
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🔄 Rearrange Array Elements by Sign

## 📌 Quick Info

- **Problem**: Arrange array alternating positive and negative
- **Difficulty**: Easy to Medium ⭐⭐⭐
- **Pattern**: [[INDEX_New_Problems#Pattern 3 Index Manipulation|Index Manipulation]]
- **Key Concept**: Even/Odd index placement
- **Frequency**: ⭐⭐⭐⭐ (Common)

**Related**: [[INDEX_New_Problems|← Back to Index]]

---

## 🎯 Problem Statement

### Variety 1: Equal Positives & Negatives

Rearrange array with equal positive and negative numbers in alternating order.

```
Input:  [3, 1, -2, -5, 2, -4]
Output: [3, -2, 1, -5, 2, -4]
        (alternating: pos, neg, pos, neg, pos, neg)

Input:  [1, 2, -4, -5]
Output: [1, -4, 2, -5]
```

### Variety 2: Unequal Counts

If counts differ, append remaining elements at end.

```
Input:  [3, 1, -2, -3]  (2 pos, 2 neg)
Output: [3, -2, 1, -3]

Input:  [4, -1, 0, 3, -2]  (3 pos, 2 neg)
Output: [4, -1, 3, -2, 0]
```

---

## 🧠 Core Intuition

### The Key Pattern: Index Mapping

**Observation 1**: In alternating array, where do elements go?

```
Array: [pos, neg, pos, neg, pos, neg]
Index:  0    1    2    3    4    5

Positives at: 0, 2, 4 (even indices)
Negatives at: 1, 3, 5 (odd indices)
```

**Observation 2**: Can use this pattern directly!

```
Positive 0 → Index 0
Positive 1 → Index 2
Positive 2 → Index 4

Negative 0 → Index 1
Negative 1 → Index 3
Negative 2 → Index 5

Pattern: Positive[i] → Index[2*i]
Pattern: Negative[i] → Index[2*i + 1]
```

### Mental Model: Two Separate Streams

Think of it like two queues:
```
Positives queue: [3, 1, 2]
Negatives queue: [-2, -5, -4]

Interleave them:
Take from Pos: 3 → put at index 0
Take from Neg: -2 → put at index 1
Take from Pos: 1 → put at index 2
Take from Neg: -5 → put at index 3
... and so on
```

---

## 💡 How to Remember (Memory Hook)

### "Positive→Even, Negative→Odd"

**Visual**:
```
Even indices (0, 2, 4, ...):   Positives go here
Odd indices (1, 3, 5, ...):    Negatives go here

OR vice versa (problem dependent)
```

**Mnemonic**: 
- **E**ven → **P**ositive (both start with same letter concept)
- **O**dd → **N**egative (odd & negative)

---

## 🔍 Approach 1: Brute Force - O(2n)

### Algorithm

1. Separate positives and negatives
2. Place them at alternating indices

```cpp
vector<int> rearrange_Brute(vector<int>& nums) {
    vector<int> pos, neg;
    
    // Step 1: Separate
    for(int num : nums) {
        if(num > 0) pos.push_back(num);
        else neg.push_back(num);
    }
    
    // Step 2: Interleave
    vector<int> ans(nums.size());
    for(int i = 0; i < pos.size(); i++) {
        ans[2*i] = pos[i];
        ans[2*i + 1] = neg[i];
    }
    
    return ans;
}
```

### Complexity
- **Time**: O(n) + O(n) = O(2n) → **O(n)**
- **Space**: O(n) for pos/neg arrays

### Advantages
- Very clear logic
- Easy to understand and code
- Works for both varieties with modification

---

## ⭐ Approach 2: Optimal (Variety 1 Only) - O(n)

### Algorithm

Single pass with two pointers for indices.

```cpp
vector<int> rearrange_Optimal(vector<int>& nums) {
    vector<int> ans(nums.size());
    int posIdx = 0, negIdx = 1;
    
    for(int num : nums) {
        if(num > 0) {
            ans[posIdx] = num;
            posIdx += 2;
        } else {
            ans[negIdx] = num;
            negIdx += 2;
        }
    }
    
    return ans;
}
```

### Why It Works

```
posIdx starts at 0: 0, 2, 4, 6, ... (all even)
negIdx starts at 1: 1, 3, 5, 7, ... (all odd)

As we iterate:
- If positive: place at posIdx, then posIdx += 2
- If negative: place at negIdx, then negIdx += 2
```

### Complexity
- **Time**: **O(n)** - single pass
- **Space**: **O(n)** for output (unavoidable)

### Key Insight
We don't need separate arrays. We can directly place elements at their target indices!

---

## 🚶 Detailed Walkthrough - Variety 1

### Example Array
```
Input:  [3, 1, -2, -5, 2, -4]
Output: [3, -2, 1, -5, 2, -4]
```

### Step-by-Step (Optimal Approach)

```
Initial:
ans = [0, 0, 0, 0, 0, 0]
posIdx = 0, negIdx = 1

─────────────────────────────

num=3 (positive):
  ans[0] = 3
  posIdx = 0 + 2 = 2
  ans = [3, 0, 0, 0, 0, 0]

─────────────────────────────

num=1 (positive):
  ans[2] = 1
  posIdx = 2 + 2 = 4
  ans = [3, 0, 1, 0, 0, 0]

─────────────────────────────

num=-2 (negative):
  ans[1] = -2
  negIdx = 1 + 2 = 3
  ans = [3, -2, 1, 0, 0, 0]

─────────────────────────────

num=-5 (negative):
  ans[3] = -5
  negIdx = 3 + 2 = 5
  ans = [3, -2, 1, -5, 0, 0]

─────────────────────────────

num=2 (positive):
  ans[4] = 2
  posIdx = 4 + 2 = 6
  ans = [3, -2, 1, -5, 2, 0]

─────────────────────────────

num=-4 (negative):
  ans[5] = -4
  negIdx = 5 + 2 = 7
  ans = [3, -2, 1, -5, 2, -4] ✓

Final: [3, -2, 1, -5, 2, -4] ✓
```

---

## 🧪 Code Implementation - Both Varieties

### Variety 1: Equal Counts

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        vector<int> ans(nums.size());
        int posIdx = 0, negIdx = 1;
        
        for(int num : nums) {
            if(num > 0) {
                ans[posIdx] = num;
                posIdx += 2;
            } else {
                ans[negIdx] = num;
                negIdx += 2;
            }
        }
        
        return ans;
    }
};
```

### Variety 2: Unequal Counts

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        vector<int> pos, neg;
        
        // Separate positives and negatives
        for(int num : nums) {
            if(num > 0) pos.push_back(num);
            else neg.push_back(num);
        }
        
        vector<int> ans(nums.size());
        int idx = 0;
        
        // Interleave minimum of both
        int minLen = min(pos.size(), neg.size());
        for(int i = 0; i < minLen; i++) {
            ans[idx++] = pos[i];
            ans[idx++] = neg[i];
        }
        
        // Add remaining elements
        if(pos.size() > neg.size()) {
            for(int i = minLen; i < pos.size(); i++) {
                ans[idx++] = pos[i];
            }
        } else {
            for(int i = minLen; i < neg.size(); i++) {
                ans[idx++] = neg[i];
            }
        }
        
        return ans;
    }
};
```

---

## 📊 Comparison: Variety 1 vs Variety 2

| Aspect | Variety 1 | Variety 2 |
|---|---|---|
| Equal counts | ✅ Yes | ❌ No |
| Optimal method | Single pass | Two-pass |
| Extra space | Only output | pos/neg arrays |
| Complexity | O(n) / O(n) | O(n) / O(n) |
| Interview focus | Better solution | More practical |

---

## 🎯 Why Variety 2 Needs Two-Pass Approach

In Variety 2, we **can't guarantee alternation**:

```
Input:  [4, -1, 0, 3, -2]  (3 pos, 2 neg)

If we tried single-pass:
posIdx: 0, 2, 4, 6, ...
negIdx: 1, 3, 5, 7, ...

We'd run out of negatives after position 3!
Then we have extra positives (0) leftover.

Solution: Collect both separately, then decide how to place.
```

---

## 🔗 Related Problems

- [[Best_Time_Buy_Sell_Stock|Stock Problem]] (Different pattern)
- [[Next_Permutation|Next Permutation]] (Index manipulation)
- [[Sort_0_1_2|Sort 0-1-2]] (Similar even/odd/zone concept)

---

## 💪 Practice Variations

1. **Different starting preference**
   - Negative first, positive second
   - Just swap even/odd roles

2. **Multiple types** (0, 1, 2, ...)
   - More complex indexing
   - Different pattern rules

3. **Maintain relative order within sign**
   - Already handled by separate arrays
   - Natural with two-pass approach

4. **In-place rearrangement**
   - Much harder!
   - Requires cycle sorting or complex swaps

---

## 🧠 Memorization Checklist

- [ ] Understand even/odd index pattern
- [ ] Know difference between varieties
- [ ] Trace optimal approach yourself
- [ ] Code both varieties from scratch
- [ ] Understand why variety 2 needs two passes
- [ ] Can explain index increment logic

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| posIdx/negIdx increment by 1 | Increment by 2 (to maintain even/odd) |
| Forget to initialize both indices | Start posIdx=0, negIdx=1 |
| Mix up which goes where | Even→Positive, Odd→Negative (or vice versa) |
| Not handling variety 2 | Check problem requirements carefully |

---

## 📈 Index Pattern Reference

```
Even indices:  0, 2, 4, 6, 8, ...
               formula: 2*i

Odd indices:   1, 3, 5, 7, 9, ...
               formula: 2*i + 1

Increment pattern:
i=0: even=0, odd=1
i=1: even=2, odd=3
i=2: even=4, odd=5
```

---

**Back to**: [[INDEX_New_Problems|New Problems Index]]
**Related**: [[Next_Permutation|Next Permutation]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
