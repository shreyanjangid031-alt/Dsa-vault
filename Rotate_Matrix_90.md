---
tags: [matrix, transpose, inplace, arrays, interview]
topic: Rotate Matrix by 90 Degrees
step: "Step 3.2"
pattern: Transpose + Reverse
difficulty: Medium
status: completed
date: 2026-06-18
---

# 🔄 Rotate Matrix by 90 Degrees

## 📌 Quick Info

- **Problem**: Rotate an N×N matrix 90° clockwise, in-place
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Matrix Problems|Transpose + Reverse]]
- **Key Concept**: Transpose, then reverse every row
- **Frequency**: ⭐⭐⭐⭐ (Common — also called "Rotate Image")

**Related**: [[Matrix Problems|← Back to Matrix Index]]

---

## 🎯 Problem Statement

Given an `n x n` matrix, rotate it 90 degrees **clockwise**, ideally without using extra space.

**Example**:
```
Input:               Output:
1  2  3  4            13  9  5  1
5  6  7  8     →       14 10  6  2
9 10 11 12             15 11  7  3
13 14 15 16             16 12  8  4
```

---

## 🧠 Core Intuition

### Mapping Each Cell

If you observe carefully: the **first row** of the input becomes the **last column** of the output, the second row becomes the second-last column, and so on.

In terms of indices, for an `n x n` matrix:
```
mat[i][j]  →  ans[j][n - 1 - i]
```

This direct mapping gives you the brute-force approach immediately — but doing it in-place takes a sharper observation.

### The In-Place Trick: Transpose, Then Reverse

**Step 1 — Transpose** (swap across the main diagonal, i.e. `mat[i][j] ↔ mat[j][i]`):
```
1  2  3  4          1  5  9  13
5  6  7  8    →      2  6 10  14
9 10 11 12           3  7 11  15
13 14 15 16          4  8 12  16
```

Notice: the **first column** of the original (`1, 5, 9, 13`) is now the **first row**.

**Step 2 — Reverse every row**:
```
1  5  9  13          13  9  5  1
2  6 10  14    →     14 10  6  2
3  7 11  15          15 11  7  3
4  8 12  16          16 12  8  4
```

The first row (which used to be the first *column*) is now reversed — and that's exactly what a 90° clockwise rotation does to it: the first column, read top-to-bottom, becomes the first row, read **right-to-left**.

---

## 💡 How to Remember (Memory Hook)

### "Transpose, Then Reverse Each Row"

```
1. Swap mat[i][j] with mat[j][i] for every j > i   (transpose)
2. Reverse every row
```

Two simple, well-known operations chained together — no separate output matrix needed.

---

## 🔍 Approach 1: Brute Force - O(n²)

### Algorithm

Build a brand-new matrix and directly place each element at its rotated position.

```cpp
vector<vector<int>> rotate_Brute(vector<vector<int>>& mat) {
    int n = mat.size();
    vector<vector<int>> ans(n, vector<int>(n));

    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            ans[j][n - 1 - i] = mat[i][j];
        }
    }
    return ans;
}
```

### Complexity
- **Time**: O(n²)
- **Space**: **O(n²)** — for the new answer matrix

This is correct, but the interviewer will almost always ask you to do it **in-place** next.

---

## ⭐ Approach 2: Optimal - Transpose + Reverse (In-Place)

### Algorithm

```cpp
void rotate_Optimal(vector<vector<int>>& mat) {
    int n = mat.size();

    // Step 1: Transpose — only swap the upper triangle with the lower
    for(int i = 0; i < n - 1; i++) {
        for(int j = i + 1; j < n; j++) {
            swap(mat[i][j], mat[j][i]);
        }
    }

    // Step 2: Reverse every row
    for(int i = 0; i < n; i++) {
        reverse(mat[i].begin(), mat[i].end());
    }
}
```

### Why the Transpose Loop Starts at `j = i + 1`

Each pair `(i, j)` and `(j, i)` only needs to be swapped **once**. Starting the inner loop at `i + 1` (instead of `0`) ensures you only ever touch the upper triangle, swapping it into the lower triangle — and never undo a swap you just made by revisiting the same pair from the other side.

### Complexity
- **Time**: **O(n²)** — same as Brute, but...
- **Space**: **O(1)** — no extra matrix at all!

---

## 🚶 Detailed Walkthrough

### Example Matrix
```
1  2  3  4
5  6  7  8
9 10 11 12
13 14 15 16
```

### Step 1: Transpose

```
Swap (0,1)↔(1,0): swap 2 and 5
Swap (0,2)↔(2,0): swap 3 and 9
Swap (0,3)↔(3,0): swap 4 and 13
Swap (1,2)↔(2,1): swap 7 and 10
Swap (1,3)↔(3,1): swap 8 and 14
Swap (2,3)↔(3,2): swap 12 and 15

Result:
1  5  9  13
2  6 10  14
3  7 11  15
4  8 12  16
```

### Step 2: Reverse Every Row

```
Row 0: [1, 5, 9, 13]  → reversed → [13, 9, 5, 1]
Row 1: [2, 6, 10, 14] → reversed → [14, 10, 6, 2]
Row 2: [3, 7, 11, 15] → reversed → [15, 11, 7, 3]
Row 3: [4, 8, 12, 16] → reversed → [16, 12, 8, 4]

Final:
13  9  5  1
14 10  6  2
15 11  7  3
16 12  8  4   ✓ matches the expected rotation
```

---

## 🎯 Edge Cases

| Case | Note |
|---|---|
| 1×1 matrix | Rotation is a no-op |
| 2×2 matrix | Smallest case where transpose actually swaps something |
| Already-rotated matrix | Works exactly the same — the algorithm doesn't know or care about prior state |

---

## 📊 Complexity Comparison

| Approach | Time | Space |
|---|---|---|
| Brute (new matrix) | O(n²) | O(n²) |
| **Optimal (transpose + reverse)** | **O(n²)** | **O(1)** |

> [!note] Why isn't there a "Better" tier here?
> Unlike most problems in this vault, there's no useful middle ground between "build a new matrix" and "do it in place." The transpose + reverse trick is essentially as simple as the brute force, just smarter about where it stores intermediate results — so it goes straight from Brute to Optimal.

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Transposing the *entire* matrix (`j` starting at 0) | This swaps every pair twice, undoing the transpose — start `j` at `i + 1` |
| Reversing columns instead of rows | The trick specifically relies on reversing **rows** after a transpose |
| Forgetting this only works for **square** matrices | For non-square (`n × m`) "rotate," you need a different in-place strategy or extra space |
| Confusing clockwise vs counter-clockwise | Clockwise = transpose + reverse rows. Counter-clockwise = transpose + reverse **columns** (or reverse rows first, then transpose) |

---

## 🔗 Related Problems

- [[Spiral_Matrix|Spiral Matrix]] (another matrix-traversal-by-boundary problem)
- [[Set_Matrix_Zeroes|Set Matrix Zeroes]] (in-place matrix manipulation)
- [[ARRAY easy part 2#Problem 5: Left Rotate Array by One Place|Left Rotate Array]] (same "rotate" family, one dimension simpler)

---

## 🧠 Memorization Checklist

- [ ] Understand why "first column becomes first row" motivates transposing
- [ ] Know why transpose-then-reverse-rows gives clockwise rotation
- [ ] Can explain why the transpose loop starts at `j = i + 1`
- [ ] Trace through the walkthrough yourself
- [ ] Know the counter-clockwise variant

---

**Back to**: [[Matrix Problems|Matrix Problems Index]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: June 18, 2026
