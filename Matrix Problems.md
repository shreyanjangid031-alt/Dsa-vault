---
tags: [matrix, arrays, algorithms, intuition, striver]
topic: Matrix Problems — Index
step: "Step 3.2 (continued)"
status: completed
date: 2026-06-18
companion: "[[Arrays Medium]] and [[INDEX_New_Problems]] (the other two parts of Step 3.2)"
---

# 🧩 Matrix Problems

## 📌 Overview

These three problems round out **Step 3.2 (Medium Arrays)** — they shift from 1D arrays to 2D matrices, but the underlying skills (in-place manipulation, careful boundary tracking, marking-before-converting) are direct extensions of everything else in this step.

**Up**: [[00_Master_Index|← Master Index]]
**Companion indexes**: [[Arrays Medium|Arrays Medium →]] · [[INDEX_New_Problems|New Problems →]]

---

## 🎯 Master Index

| Problem | Pattern | Key Insight | Memory Hook |
|---|---|---|---|
| [[Set_Matrix_Zeroes\|Set Matrix Zeroes]] | In-place Marking | Mark first, convert later | "Mark first, convert later" |
| [[Rotate_Matrix_90\|Rotate Matrix by 90°]] | Transpose + Reverse | First column becomes first row | "Transpose, then reverse each row" |
| [[Spiral_Matrix\|Spiral Matrix]] | Four-Pointer Boundary Traversal | Shrink four boundaries inward | "Right, bottom (if), left (if), top — then shrink" |

---

## 📚 Quick Navigation

### 1️⃣ [[Set_Matrix_Zeroes|Set Matrix Zeroes]]
- **Difficulty**: Medium ⭐⭐⭐
- **Approaches**: Brute (mark with -1, O(n·m·(n+m))) → Better (row/col arrays, O(n·m)/O(n+m)) → **Optimal (matrix's own first row/col as markers, O(n·m)/O(1))**

### 2️⃣ [[Rotate_Matrix_90|Rotate Matrix by 90°]]
- **Difficulty**: Medium ⭐⭐⭐
- **Approaches**: Brute (new matrix, O(n²)/O(n²)) → **Optimal (transpose + reverse rows, O(n²)/O(1))**

### 3️⃣ [[Spiral_Matrix|Spiral Matrix]]
- **Difficulty**: Medium ⭐⭐⭐
- **Approach**: Single implementation-focused solution — four shrinking boundaries, O(n·m)

---

## 💡 Common Threads

### Pattern: In-Place Manipulation
- [[Set_Matrix_Zeroes|Set Matrix Zeroes]] — reuses the matrix's own first row/column as scratch space
- [[Rotate_Matrix_90|Rotate Matrix]] — transposes and reverses without any second matrix

### Pattern: Careful Boundary Tracking
- [[Spiral_Matrix|Spiral Matrix]] — four boundaries (top/bottom/left/right) that shrink inward
- [[Rotate_Matrix_90|Rotate Matrix]] — the transpose loop's `j = i + 1` boundary prevents double-swapping

### Pattern: Two-Phase Thinking ("Decide, Then Act")
- [[Set_Matrix_Zeroes|Set Matrix Zeroes]] — never convert while still scanning for originals

---

## 🎯 Memory Hooks (Print & Memorize!)

```
SET MATRIX ZEROES:
"Mark first, convert later"
→ Never overwrite while you're still reading

ROTATE MATRIX:
"Transpose, then reverse each row"
→ First column becomes first row, naturally

SPIRAL MATRIX:
"Right, bottom (if), left (if), top — then shrink"
→ The two `if` guards prevent re-printing on thin matrices
```

---

## 🔗 Related Topics

- [[Arrays Medium]] — Step 3.2, Part A (hashing/sorting core techniques)
- [[INDEX_New_Problems]] — Step 3.2, Part B (greedy/pattern problems)
- [[STL]] — `vector<vector<int>>`, `swap()`, `reverse()` used throughout
- [[ARRAY easy part 1]] · [[ARRAY easy part 2]] · [[ARRAY easy part 3]] — Step 3.1 (1D array prerequisites)

---

**Tags**: #matrix #arrays #interview #dsa #striver

**Last Updated**: June 18, 2026

**Back to**: [[00_Master_Index|Master Index]]
