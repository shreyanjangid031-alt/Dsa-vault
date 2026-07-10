---
tags: [arrays, algorithms, intuition, leetcode, striver]
topic: New Problems — Intuition & Memorization Guide
step: "Step 3.2 (continued)"
status: completed
date: 2026-05-28
reorganized: 2026-06-17
companion: "[[Arrays Medium]] (Step 3.2 — Majority, Sort 0-1-2, Two Sum, Kadane's)"
---

# 📖 New Problems - Intuition & Memorization Guide

## 📌 Overview

**4 Comprehensive Problems** with deep intuition, memory hooks, and complete walkthroughs.

**Tags**: #arrays #algorithms #intuition #leetcode #striver

**Up**: [[00_Master_Index|← Master Index]]
**Companion index**: [[Arrays Medium|Advanced Array Problems Index →]] (Majority Element, Sort 0-1-2, Two Sum, Kadane's)

---

## 🎯 Master Index

### Level: Intermediate to Advanced

| Problem | Algorithm | Intuition | Memory Hook | Status |
|---|---|---|---|---|
| [[Best_Time_Buy_Sell_Stock\|Best Time to Buy & Sell Stock]] | Greedy + DP | Track min price | "Remember the minimum" | ✅ |
| [[Rearrange_Array_by_Sign\|Rearrange Array by Sign]] | Alternating Pattern | Even/Odd indexing | "Positive→Even, Negative→Odd" | ✅ |
| [[Next_Permutation\|Next Permutation]] | Three-Step Algorithm | Lexicographic order | "Longest prefix, swap, reverse" | ✅ |
| [[Leaders_in_Array\|Leaders in Array]] | Backward Iteration | Right maximum tracking | "Greater than all on right" | ✅ |

---

## 📚 Quick Navigation

### 1️⃣ [[Best_Time_Buy_Sell_Stock|Best Time to Buy & Sell Stock]]
- **Difficulty**: Easy ⭐⭐
- **Pattern**: Greedy/DP
- **Key Insight**: Track minimum price seen so far
- **Memory Hook**: "Remember the minimum"
- **Time**: O(n) | **Space**: O(1)

### 2️⃣ [[Rearrange_Array_by_Sign|Rearrange Array by Sign]]
- **Difficulty**: Easy ⭐⭐
- **Pattern**: Two-Pointer/Indexing
- **Key Insight**: Positives at even indices, negatives at odd
- **Memory Hook**: "Positive→Even, Negative→Odd"
- **Time**: O(n) | **Space**: O(n) for output

### 3️⃣ [[Next_Permutation|Next Permutation]]
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: Three-Step Algorithm
- **Key Insight**: Maintain longest prefix, find next greater, arrange rest
- **Memory Hook**: "Find break, swap, reverse"
- **Time**: O(n) | **Space**: O(1)

### 4️⃣ [[Leaders_in_Array|Leaders in Array]]
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: Backward Iteration
- **Key Insight**: Track maximum from right, compare
- **Memory Hook**: "Iterate backward, track max"
- **Time**: O(n) | **Space**: O(1) (excluding output)

---

## 🧠 Learning Strategy

### **Day-by-Day Plan**

```
Day 1: Best Time to Buy & Sell Stock
├─ Read intuition (greedy principle)
├─ Understand why min tracking works
├─ Follow walkthrough
└─ Code without reference

Day 2: Rearrange Array by Sign
├─ Understand alternating pattern
├─ Learn two varieties
├─ Trace examples
└─ Code from scratch

Day 3: Next Permutation
├─ Grasp lexicographic ordering
├─ Learn three-step algorithm
├─ Detailed walkthrough
└─ Code all three steps

Day 4: Leaders in Array
├─ Understand "greater than all on right"
├─ Learn backward iteration
├─ Trace with examples
└─ Code the solution

Day 5: Mixed Practice & Review
├─ Solve variations
├─ Teach someone
├─ Compare problem patterns
└─ Self-test without notes
```

---

## 💡 Common Threads

### **Pattern 1: Tracking Values**
- [[Best_Time_Buy_Sell_Stock#Core Intuition|Stock Problems]] → Track minimum
- [[Leaders_in_Array#Core Intuition|Leaders]] → Track maximum

### **Pattern 2: Iteration Direction**
- [[Best_Time_Buy_Sell_Stock|Stock]] → Forward iteration
- [[Leaders_in_Array|Leaders]] → Backward iteration

### **Pattern 3: Index Manipulation**
- [[Rearrange_Array_by_Sign|Rearrange]] → Even/Odd indices
- [[Next_Permutation|Next Permutation]] → Index-based swapping

### **Pattern 4: Greedy Approach**
- [[Best_Time_Buy_Sell_Stock|Stock]] → Best minimum at each step
- [[Next_Permutation|Next Perm]] → Smallest next permutation

---

## 🔗 Relationship Map

```
┌──────────────────────────────────────┐
│ TRACKING VALUES (Greedy)             │
├──────────────────────────────────────┤
│ ├─ Stock (forward → min)             │
│ └─ Leaders (backward → max)          │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ INDEX/PATTERN MANIPULATION           │
├──────────────────────────────────────┤
│ ├─ Rearrange (even/odd pattern)      │
│ └─ Next Perm (index swapping)        │
└──────────────────────────────────────┘
```

---

## 📊 Complexity Comparison

| Problem | Time | Space | Optimal? |
|---|---|---|---|
| Stock | O(n) | O(1) | ✅ YES |
| Rearrange | O(n) | O(n)* | ✅ YES |
| Next Perm | O(n) | O(1)* | ✅ YES |
| Leaders | O(n) | O(1)* | ✅ YES |

*Space for output (unavoidable)

---

## 🎯 Memory Hooks (Print & Memorize!)

```
STOCK PROBLEM:
"Remember the minimum"
→ Track min price, max profit at each step

REARRANGE:
"Positive→Even, Negative→Odd"
→ Use alternating indices

NEXT PERMUTATION:
"Find break, swap, reverse"
→ Three-step algorithm

LEADERS:
"Iterate backward, track max"
→ Compare with running maximum
```

---

## 🧩 Problem Patterns Across All 4

### ✅ What They Have in Common
1. **All solvable in O(n) time**
2. **All use greedy/optimal principles**
3. **All have clear intuitions**
4. **All benefit from understanding over memorization**

### ⚠️ What's Different
1. **Iteration direction** (forward vs backward)
2. **What to track** (min vs max vs pattern)
3. **Complexity** (Easy vs Medium)
4. **Follow-up variations** (different for each)

---

## 📝 Your Complete Package Now

### **Combined Total**

```
✅ ADVANCED ARRAY PROBLEMS (4 problems) — see [[Arrays Medium]]
   - Majority Element (Moore's Voting)
   - Sort 0-1-2 (Dutch National Flag)
   - Two Sum (Hash/Two Pointer)
   - Max Subarray Sum (Kadane's)

✅ NEW PROBLEMS (4 problems) — this index
   - Stock Buy & Sell (Greedy)
   - Rearrange by Sign (Pattern)
   - Next Permutation (Lexicographic)
   - Leaders in Array (Tracking)

TOTAL: 18+ Problems with Deep Intuition!
```

---

## 🚀 Quick Start

1. **Start with [[Best_Time_Buy_Sell_Stock|Stock Problem]]** (easiest)
2. **Move to [[Rearrange_Array_by_Sign|Rearrange]]** (pattern learning)
3. **Learn [[Next_Permutation|Next Permutation]]** (most complex)
4. **Finish with [[Leaders_in_Array|Leaders]]** (backward iteration)

---

## 📌 Important Notes

### **Before You Start**

- [ ] Read intuition BEFORE code
- [ ] Memorize the memory hook
- [ ] Trace through walkthroughs yourself
- [ ] Code without looking at solution
- [ ] Test edge cases

### **Study Tips**

1. **Don't just read** - Write down each step
2. **Predict before reading** - Try to guess next step
3. **Code from memory** - After understanding
4. **Teach someone** - Best way to verify understanding
5. **Find variations** - Extend your knowledge

---

## 🔗 Related Concepts

- [[Sorting|Sorting Fundamentals]] — Step 2.1/2.2
- [[Arrays Medium|Advanced Array Problems]] — Step 3.2 (companion index)
- [[ARRAY easy part 1|Basic Array Problems]] — Step 3.1
- [[STL|C++ STL Reference]]

---

## 💪 Challenge Yourself

After mastering these 4 problems:

1. **Stock Problem Variations**
   - Buy and sell with cooldown
   - Multiple transactions
   - Best time with fee

2. **Rearrange Variations**
   - More than 2 types (0, 1, 2, ...)
   - Unequal counts
   - Preserve ordering

3. **Next Permutation Variations**
   - Previous permutation
   - K-th permutation
   - All permutations

4. **Leaders Variations**
   - Find count
   - 2D array leaders
   - Find leaders with constraint

---

**Tags**: #greedy #patterns #tracking #iteration #arrays #interview

**Start Here**: [[Best_Time_Buy_Sell_Stock|Best Time to Buy & Sell Stock →]]

**Last Updated**: May 28, 2026

**Back to**: [[00_Master_Index|Master Index]]
