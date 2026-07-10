---
tags: [matrix, traversal, boundaries, arrays, interview]
topic: Spiral Matrix Traversal
step: "Step 3.2"
pattern: Four-Pointer Boundary Traversal
difficulty: Medium
status: completed
date: 2026-06-18
---

# 🌀 Spiral Matrix

## 📌 Quick Info

- **Problem**: Print/return all elements of a matrix in spiral order
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Matrix Problems|Four-Pointer Boundary Traversal]]
- **Key Concept**: Track four shrinking boundaries — top, bottom, left, right
- **Frequency**: ⭐⭐⭐⭐ (Common — pure implementation skill)

**Related**: [[Matrix Problems|← Back to Matrix Index]]

> [!note] There's only one real solution here
> Unlike most problems in this vault, Spiral Matrix doesn't really have a brute-force-to-optimal progression — it's purely an **implementation** question. The interviewer is testing whether you can carefully manage four moving boundaries and the edge cases around them, not your ability to optimize a time complexity.

---

## 🎯 Problem Statement

Given an `n x m` matrix, return all of its elements visited in spiral order — starting at the top-left, going right, then down, then left, then up, spiraling inward.

**Example**:
```
Input:
 1  2  3
 4  5  6
 7  8  9

Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
```

---

## 🧠 Core Intuition

### The Pattern: Right → Bottom → Left → Top, Shrinking Inward

Every "layer" of the spiral follows the exact same four-step pattern:

```
1. Walk along the TOP row, left to right
2. Walk down the RIGHT column, top to bottom
3. Walk along the BOTTOM row, right to left
4. Walk up the LEFT column, bottom to top
```

After each of these four walks, the corresponding boundary shrinks inward — the top boundary moves down, the right boundary moves left, and so on. Repeat the whole four-step pattern on the new, smaller rectangle until the boundaries cross.

### Visualizing the Boundaries

```
Row indices:    0  1  2  3  4  5
Column indices: 0  1  2  3  4  5

top = 0, bottom = n-1, left = 0, right = m-1

┌─────────────────────────┐
│ →  →  →  →  →  →  ↓     │  ← walk TOP row left→right, then top++
│ ↑              ↓  ↓     │
│ ↑     (inner)  ↓  ↓     │
│ ↑              ↓  ↓     │
│ ↑  ←  ←  ←  ←  ←  ↓     │  ← walk BOTTOM row right→left, then bottom--
└─────────────────────────┘
```

### Why Two of the Four Walks Need an `if` Check

Once you've walked the top row and the right column, you might be left with **no remaining bottom row** or **no remaining left column** to walk (this happens whenever the matrix degenerates to a single row or single column mid-spiral). Walking them anyway would **re-print elements you've already printed**. So:

```
- Always walk: top row, then right column (these always have something left to give)
- Conditionally walk: bottom row (only if top <= bottom), left column (only if left <= right)
```

---

## 💡 How to Remember (Memory Hook)

### "Right, Bottom (if), Left (if), Top — Then Shrink"

```
while top <= bottom and left <= right:
    walk top row, left→right;       top++
    walk right column, top→bottom;  right--
    if top <= bottom:
        walk bottom row, right→left; bottom--
    if left <= right:
        walk left column, bottom→top; left++
```

---

## 🧪 Code Implementation

```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> ans;
    int n = matrix.size();
    int m = matrix[0].size();

    int top = 0, bottom = n - 1;
    int left = 0, right = m - 1;

    while(top <= bottom && left <= right) {

        // 1. Top row, left → right
        for(int i = left; i <= right; i++) {
            ans.push_back(matrix[top][i]);
        }
        top++;

        // 2. Right column, top → bottom
        for(int i = top; i <= bottom; i++) {
            ans.push_back(matrix[i][right]);
        }
        right--;

        // 3. Bottom row, right → left (only if a bottom row still exists)
        if(top <= bottom) {
            for(int i = right; i >= left; i--) {
                ans.push_back(matrix[bottom][i]);
            }
            bottom--;
        }

        // 4. Left column, bottom → top (only if a left column still exists)
        if(left <= right) {
            for(int i = bottom; i >= top; i--) {
                ans.push_back(matrix[i][left]);
            }
            left++;
        }
    }

    return ans;
}
```

---

## 🚶 Detailed Walkthrough

### Example Matrix
```
 1  2  3  4
 5  6  7  8
 9 10 11 12
13 14 15 16
```

### Step-by-Step

```
Initial: top=0, bottom=3, left=0, right=3

── Layer 1 ──
1. Top row (left→right):    1, 2, 3, 4         → top = 1
2. Right column (top→bottom): 8, 12, 16        → right = 2
3. Bottom row (right→left): 15, 14, 13         → bottom = 2
4. Left column (bottom→top): 9, 5              → left = 1

── Layer 2 (top=1, bottom=2, left=1, right=2) ──
1. Top row (left→right):    6, 7               → top = 2
2. Right column (top→bottom): 11               → right = 1
3. Bottom row (right→left): 10                 → bottom = 1
4. Check: left(1) <= right(1)? Yes → walk left column (bottom→top): nothing new (bottom < top now) → left = 2

Check loop condition: top(2) <= bottom(1)? NO → STOP

Final order: 1,2,3,4, 8,12,16, 15,14,13, 9,5, 6,7, 11, 10
```

### Why the Single-Row Edge Case Works Automatically

Imagine a matrix that's just one row: `[1, 2, 3]`. After walking the top row (`1, 2, 3`) and incrementing `top`, the `top` pointer now sits **below** `bottom`. The very next step — walking the right column `top → bottom` — naturally does nothing (the range is empty), and the `if(top <= bottom)` check before the bottom-row walk correctly skips it. **No special-casing needed** — the boundary math handles it for you.

---

## ⏱️ Complexity

| Metric | Value |
|---|---|
| **Time** | O(n × m) — every element visited exactly once |
| **Space** | O(n × m) for the output array (O(1) extra otherwise) |

---

## 🎯 Edge Cases

| Case | Why It's Tricky |
|---|---|
| Single row | Without the `if(top <= bottom)` guard, the bottom-row walk would re-print the same row |
| Single column | Without the `if(left <= right)` guard, the left-column walk would re-print the same column |
| 1×1 matrix | Top row walk alone handles it; all other walks are empty ranges |
| Non-square (`n ≠ m`) | The algorithm doesn't care — boundaries shrink independently in each direction |

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Forgetting the `if` guards on bottom row / left column | Leads to duplicate elements on single-row/column matrices |
| Decrementing `bottom`/`right` or incrementing `top`/`left` at the wrong point | Update boundaries immediately after finishing each walk, not before |
| Using `<` instead of `<=` in the outer while condition | `<=` is required — a matrix can validly have `top == bottom` (one row left) |
| Re-deriving `n`/`m` incorrectly for non-square matrices | `n = matrix.size()`, `m = matrix[0].size()` — don't swap them |

---

## 🔗 Related Problems

- [[Rotate_Matrix_90|Rotate Matrix by 90°]] (another pure-implementation matrix problem)
- [[Set_Matrix_Zeroes|Set Matrix Zeroes]] (matrix manipulation, different traversal style)

---

## 🧠 Memorization Checklist

- [ ] Can recite the four-step pattern (top → right → bottom → left) from memory
- [ ] Understand exactly why the bottom-row and left-column walks need `if` guards
- [ ] Understand why single-row/column cases resolve themselves without special-casing
- [ ] Trace through a non-square example yourself
- [ ] Code it without reference

---

**Back to**: [[Matrix Problems|Matrix Problems Index]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: June 18, 2026
