---
tags: [arrays, algorithms, intuition, leetcode, striver, a2z]
topic: Advanced (Medium) Array Problems — Index
step: "Step 3.2"
status: completed
date: 2026-05-28
reorganized: 2026-06-17
companion: "[[INDEX_New_Problems]] (Step 3.2 continued — Greedy/Pattern problems)"
---

# 🧠 Advanced Array Problems - Intuition & Memorization

## 📌 Overview

This collection focuses on **understanding concepts deeply** rather than memorizing code. Each problem includes:

- 🎯 Core intuition
- 🧠 Mental models & memory hooks
- 💻 Complete implementations
- 🚶 Detailed walkthroughs
- 🔗 Related problems

**Tags**: #arrays #algorithms #intuition #leetcode

**Up**: [[00_Master_Index|← Master Index]]
**Companion index**: [[INDEX_New_Problems|New Problems Index →]] (Stock, Rearrange, Next Permutation, Leaders)

---

## 🎯 Master Index

### Level 1: Fundamental Concepts

|Problem|Algorithm|Intuition|Memory Hook|
|---|---|---|---|
|[[Majority_Element\|Majority Element]]|Moore's Voting|Cancellation principle|"Survivors of voting"|
|[[Sort_0_1_2\|Sort 0-1-2s]]|Dutch National Flag|Three-zone placement|"Left-Right-Stay"|
|[[Two_Sum_Complete\|Two Sum]]|Hash/Two Pointer|Complement mathematics|"Pair-finding"|
|[[Max_Subarray_Sum\|Max Subarray Sum]]|Kadane's Algorithm|Greedy prefix tracking|"Carry positive, drop negative"|

---

## 📚 Problem Files

### [[Majority_Element|🔴 Majority Element]]

- **Difficulty**: Medium
- **Key Insight**: Elements appearing >n/2 times survive cancellation
- **Approaches**: Brute (O(n²)) → Hash (O(n)) → **Moore's Voting (O(n) + O(1) space)**
- **Tags**: #mooresvoting #greedy #voting

### [[Sort_0_1_2|🟡 Sort 0-1-2s]]

- **Difficulty**: Medium
- **Key Insight**: Three pointers maintain three zones
- **Approaches**: Counting (O(2n)) → **Dutch Flag (O(n) + O(1) space)**
- **Tags**: #dutchflag #threepointers #inplace

### [[Two_Sum_Complete|🔵 Two Sum]]

- **Difficulty**: Easy (Variety 1), Medium (Variety 2)
- **Key Insight**: Complement is your friend
- **Approaches**: Brute (O(n²)) → Hash (O(n)) → Two Pointer (O(n log n))
- **Tags**: #twopointers #hashing #complement

### [[Max_Subarray_Sum|🟢 Max Subarray Sum]]

- **Difficulty**: Medium
- **Key Insight**: Negative sum only decreases future potential
- **Approaches**: Brute (O(n³)) → Better (O(n²)) → **Kadane's (O(n) + O(1) space)**
- **Tags**: #kadane #dynamicprogramming #greedy

---

## 🧠 Quick Reference

### Memory Hooks (Memorize These!)

**Majority Element**:
```
count = 0
if count == 0: element = num, count = 1
elif num == element: count++
else: count--
```
**Think**: "Voting counter that resets"

**Sort 0-1-2**:
```
if nums[mid] == 0: swap(low, mid), low++, mid++
elif nums[mid] == 1: mid++
else: swap(mid, high), high--
```
**Think**: "0→left, 1→stay, 2→right"

**Two Sum**:
```
complement = target - num
if complement in map: return [map[complement], i]
map[num] = i
```
**Think**: "Ask map: Have I seen my complement?"

**Kadane's**:
```
currentSum += num
maxSum = max(maxSum, currentSum)
if currentSum < 0: currentSum = 0
```
**Think**: "Carry positive, reset on negative"

---

## 🚀 Learning Path

```
Day 1: Understand Majority Element
  ├─ Read [[Majority_Element#Core Intuition|Intuition]]
  ├─ Study [[Majority_Element#How to Remember (Memory Hook)|Memory Hook]]
  ├─ Follow [[Majority_Element#Detailed Walkthrough|Walkthrough]]
  └─ Code without reference

Day 2: Master Dutch National Flag
  ├─ Visualize [[Sort_0_1_2#Core Intuition|Three Zones]]
  ├─ Learn [[Sort_0_1_2#Why This Works|Case Logic]]
  ├─ Trace [[Sort_0_1_2#Detailed Walkthrough|Example]]
  └─ Code from scratch

Day 3: Multiple Approaches for Two Sum
  ├─ Hash approach for [[Two_Sum_Complete#Problem Variations|YES/NO]]
  ├─ Hash approach for [[Two_Sum_Complete#Problem Variations|Indices]]
  ├─ Two pointer [[Two_Sum_Complete#Approach 3 Two Pointer (Sorted) - For Variety 1 Only|Optimization]]
  └─ Compare tradeoffs

Day 4: Kadane's Magic
  ├─ Understand [[Max_Subarray_Sum#Core Intuition|Why greedy works]]
  ├─ Walk through [[Max_Subarray_Sum#Detailed Walkthrough|Dry run]]
  ├─ Learn [[Max_Subarray_Sum#Follow-up: Find the Actual Subarray|Finding indices]]
  └─ Practice edge cases

Day 5: Mixed Practice
  ├─ Solve variations randomly
  ├─ Teach someone
  ├─ Find similar problems
  └─ Depth-test yourself
```

---

## 🔗 Related Topics

### [[Sorting|Sorting Algorithms]] (Step 2.1/2.2)

Prerequisite fundamentals before tackling array-specific sorting variants like [[Sort_0_1_2|Sort 0-1-2]].

### Easy Array Problems (Step 3.1)

- [[ARRAY easy part 1|Part 1]] — Largest Element, Second Largest, Check Sorted, Remove Duplicates
- [[ARRAY easy part 2|Part 2]] — Rotate Array, Move Zeroes, Linear Search, Union & Intersection
- [[ARRAY easy part 3|Part 3]] — Max Consecutive Ones, Single Number (XOR), Longest Subarray with Sum K

### [[STL|C++ STL Reference]]

Reference for `map`, `unordered_map`, `set`, and `sort` used throughout these solutions.

### [[INDEX_New_Problems|New / Greedy Pattern Problems]]

Continuation of Step 3.2: Best Time to Buy & Sell Stock, Rearrange by Sign, Next Permutation, Leaders in Array.

---

## 💡 Why These Notes Are Different

### ❌ What Most Tutorials Do
- Present the code
- Explain complexity
- Say "That's optimal!"
- No intuition

### ✅ What These Notes Do
- **Intuition first**: Why does it work?
- **Mental models**: How do I think about it?
- **Memory hooks**: What's the memorable phrase?
- **Reconstruction**: Can I code it from first principles?
- **Variations**: What are follow-ups?
- **Comparisons**: When do I use each approach?

---

## 🎯 Study Tips

### Tip 1: Read Intuition Section First
- Don't skip to code
- Understand the concept deeply
- Ask yourself "Why?"

### Tip 2: Use Memory Hooks
- Memorize the short phrase
- Create your own analogy
- Teach it to someone

### Tip 3: Trace Walkthroughs
- Don't just read, write down steps
- Predict next step before reading
- Find patterns

### Tip 4: Code Without Reference
- After reading, close the file
- Reconstruct from memory
- Check against solution

### Tip 5: Find Variations
- Solve similar problems
- Add constraints
- Optimize further

---

## 📊 Problem Comparison Matrix

|Problem|Time|Space|Difficulty|Frequency|
|---|---|---|---|---|
|[[Majority_Element\|Majority]]|O(n)|O(1)|Medium|⭐⭐⭐⭐|
|[[Sort_0_1_2\|Sort 0-1-2]]|O(n)|O(1)|Medium|⭐⭐⭐⭐|
|[[Two_Sum_Complete\|Two Sum]]|O(n)|O(n)|Easy|⭐⭐⭐⭐⭐|
|[[Max_Subarray_Sum\|Max Subarray]]|O(n)|O(1)|Medium|⭐⭐⭐⭐⭐|

---

## 🔄 Interconnections

```
┌─────────────────────────────────────────┐
│  Fundamental Concept: Two Pointers       │
├─────────────────────────────────────────┤
│  ├─ Sort 0-1-2 (Dutch National Flag)     │
│  └─ Two Sum (Two Pointer variant)        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Fundamental Concept: Greedy            │
├─────────────────────────────────────────┤
│  ├─ Majority Element (Moore's Voting)   │
│  └─ Max Subarray Sum (Kadane's Algo)    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Fundamental Concept: Hashing           │
├─────────────────────────────────────────┤
│  └─ Two Sum (Hash Map variant)          │
└─────────────────────────────────────────┘
```

> [!note] On the diagram above
> These three groupings (Two Pointers / Greedy / Hashing) are concept labels, not separate notes — there's no standalone page for each. The links above all point into [[Majority_Element]], [[Sort_0_1_2]], [[Two_Sum_Complete]], and [[Max_Subarray_Sum]] directly, since that's where the actual content lives.

---

## 📝 Your Study Checklist

- [ ] Read all 4 intuition sections
- [ ] Memorize all 4 memory hooks
- [ ] Trace through all 4 walkthroughs
- [ ] Code each algorithm once from scratch
- [ ] Code each algorithm twice more
- [ ] Teach one problem to someone
- [ ] Solve 5 variations of each
- [ ] Can you explain without notes?

---

## 🎓 What You'll Learn

After completing this:

✅ **Deep Understanding**: Why algorithms work, not just how
✅ **Reconstruction Skills**: Code from first principles
✅ **Memory Techniques**: Never forget these tricks
✅ **Problem Solving**: Apply patterns to similar problems
✅ **Interview Ready**: Explain intuition to interviewer

---

## 📌 Quick Navigation

- **Need intuition?** → Jump to each problem's "Core Intuition" section
- **Need memory aid?** → See "How to Remember" sections
- **Need code?** → Find "Implementation" sections
- **Need example?** → Check "Detailed Walkthrough" sections
- **Need comparison?** → See "When to Use" sections

---

## 🚀 Last Words

> "The goal is not to memorize solutions, but to understand the thinking behind them.
> When you understand WHY, you never forget HOW."

Start with [[Majority_Element|Majority Element]] → Work your way through all 4 → You'll be unstoppable!

---

## 🔗 Related Notes

- [[ARRAY easy part 1]] · [[ARRAY easy part 2]] · [[ARRAY easy part 3]] — Step 3.1 (prerequisite easy problems)
- [[Sorting]] — Step 2.1/2.2 (prerequisite)
- [[STL]] — C++ STL reference used throughout
- [[INDEX_New_Problems]] — Step 3.2 continued (Stock, Rearrange, Next Permutation, Leaders)

**Tags**: #arrays #algorithms #intuition #interview #dsa #striver #memorization

**Last Updated**: May 28, 2026
**Total Coverage**: 4 problems with complete intuition

**Back to**: [[00_Master_Index|Master Index]]
