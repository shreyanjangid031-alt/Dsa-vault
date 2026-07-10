---
tags: [matrix, hashing, inplace, arrays, interview]
topic: Set Matrix Zeroes
step: "Step 3.2"
pattern: In-place Marking
difficulty: Medium
status: completed
date: 2026-06-18
---

# 🧮 Set Matrix Zeroes

## 📌 Quick Info

- **Problem**: For every 0 in a matrix, zero out its entire row and column
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Matrix Problems|In-place Marking]]
- **Key Concept**: Mark first, convert later — never overwrite before you've finished reading
- **Frequency**: ⭐⭐⭐⭐ (Common)

**Related**: [[Matrix Problems|← Back to Matrix Index]]

---

## 🎯 Problem Statement

Given an `n x m` binary matrix, if a cell contains a 0, set its **entire row and entire column** to 0 — but **only** using the positions of the *original* zeroes, not zeroes you create along the way.

**Example**:
```
Input:
1 1 1
1 0 1
1 1 1

Output:
1 0 1
0 0 0
1 0 1
```

---

## 🧠 Core Intuition

### The Trap: Don't Zero As You Go

The naive instinct is: "find a 0, immediately zero its row and column." But if you do that in-place while still scanning the matrix, your *newly created* zeroes get mistaken for *original* zeroes on a later iteration — and they cascade, wrongly zeroing out cells that should have stayed untouched.

```
Original:        After wrongly zeroing
1 1 1            1 0 1
1 0 1     ❌→     0 0 0   ← so far so good...
1 1 1            1 0 1   ← but now this 0 (just created) gets
                            "discovered" on the next scan pass
                            and starts zeroing its OWN row/column —
                            which was never supposed to happen!
```

**The fix**: separate the *marking* phase from the *converting* phase. Decide what should become zero first, without touching anything, then apply it all at once.

### Why a Cell Becomes Zero

A cell `(i, j)` ends up zero if and only if:
```
its row i contains at least one ORIGINAL zero
        OR
its column j contains at least one ORIGINAL zero
```

This single rule is what every approach below is built around — only the bookkeeping mechanism changes.

---

## 💡 How to Remember (Memory Hook)

### "Mark First, Convert Later"

```
1. Scan the matrix once. For every original 0 found, remember its row and column.
2. Scan again. Zero out any cell whose row OR column was remembered.
```

---

## 🔍 Approach 1: Brute Force - O(n × m × (n + m))

### Algorithm

Use a placeholder value (`-1`) to mark cells that *will* become zero, being careful not to touch cells that are *already* zero (so they don't get mistaken for non-original zeroes later).

```cpp
void markRow(vector<vector<int>>& matrix, int i, int m) {
    for(int j = 0; j < m; j++) {
        if(matrix[i][j] != 0) matrix[i][j] = -1;
    }
}

void markCol(vector<vector<int>>& matrix, int j, int n) {
    for(int i = 0; i < n; i++) {
        if(matrix[i][j] != 0) matrix[i][j] = -1;
    }
}

void setZeroes_Brute(vector<vector<int>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();

    // Phase 1: mark
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            if(matrix[i][j] == 0) {
                markRow(matrix, i, m);
                markCol(matrix, j, n);
            }
        }
    }

    // Phase 2: convert
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            if(matrix[i][j] == -1) matrix[i][j] = 0;
        }
    }
}
```

### Complexity
- **Time**: O(n × m × (n + m)) — for every original zero, you sweep a full row and column
- **Space**: O(1) extra (the matrix itself is reused as scratch space, no separate structure)

---

## 🔄 Approach 2: Better - O(n × m)

### Algorithm

Instead of immediately sweeping rows/columns for every zero found, just record **which** rows and columns need zeroing, using two small marker arrays.

```cpp
void setZeroes_Better(vector<vector<int>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();
    vector<int> row(n, 0), col(m, 0);

    // Phase 1: record which rows/columns must be zeroed
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            if(matrix[i][j] == 0) {
                row[i] = 1;
                col[j] = 1;
            }
        }
    }

    // Phase 2: apply
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            if(row[i] == 1 || col[j] == 1) {
                matrix[i][j] = 0;
            }
        }
    }
}
```

### Complexity
- **Time**: **O(n × m)** — two clean passes, no row/column sweeps per zero
- **Space**: **O(n + m)** for the two marker arrays

---

## ⭐ Approach 3: Optimal - O(1) Extra Space

### The Trick: Use the Matrix's Own First Row and Column as Markers

Instead of allocating separate `row[]` and `col[]` arrays, reuse `matrix[i][0]` (first column) as the row-marker array and `matrix[0][j]` (first row) as the column-marker array. The only snag: `matrix[0][0]` is shared by both, so a separate `col0` variable is needed to disambiguate it.

```cpp
void setZeroes_Optimal(vector<vector<int>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();
    int col0 = 1;   // tracks whether the FIRST COLUMN needs zeroing

    // Phase 1: use row 0 and column 0 as marker arrays
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            if(matrix[i][j] == 0) {
                matrix[i][0] = 0;             // mark this row
                if(j != 0) {
                    matrix[0][j] = 0;         // mark this column
                } else {
                    col0 = 0;                 // collision at (0,0) — use col0 instead
                }
            }
        }
    }

    // Phase 2: convert everything EXCEPT the first row/column
    for(int i = 1; i < n; i++) {
        for(int j = 1; j < m; j++) {
            if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // Phase 3: handle the first row itself
    if(matrix[0][0] == 0) {
        for(int j = 0; j < m; j++) matrix[0][j] = 0;
    }

    // Phase 4: handle the first column itself
    if(col0 == 0) {
        for(int i = 0; i < n; i++) matrix[i][0] = 0;
    }
}
```

### Why the Order of Phases Matters

> [!warning] Solve the inner matrix BEFORE the first row/column
> The inner cells `(i ≥ 1, j ≥ 1)` depend on `matrix[i][0]` and `matrix[0][j]` *still holding their marker values*. If you zero out the first row or column too early, you destroy the very markers the inner cells need to check. So: **inner cells first, then first row, then first column** — never the reverse.

### Complexity
- **Time**: **O(n × m)**
- **Space**: **O(1)** — only one extra variable (`col0`), the matrix itself does the rest

---

## 🚶 Detailed Walkthrough — Optimal Approach

### Example Matrix
```
1 1 1
1 0 1
1 1 1
```

### Phase 1: Mark using row 0 / column 0

```
Scanning, we find matrix[1][1] == 0:
  → mark matrix[1][0] = 0   (row marker)
  → j != 0, so mark matrix[0][1] = 0   (column marker)

Matrix now (markers placed):
1 0 1
0 0 1
1 1 1

col0 stays 1 (no zero appeared in column 0 itself)
```

### Phase 2: Convert inner cells (i ≥ 1, j ≥ 1)

```
matrix[1][1]: matrix[1][0]==0 → set to 0 (already was)
matrix[1][2]: matrix[1][0]==0 → set to 0
matrix[2][1]: matrix[0][1]==0 → set to 0
matrix[2][2]: matrix[2][0]!=0 and matrix[0][2]!=0 → stays 1

Matrix now:
1 0 1
0 0 0
1 0 1
```

### Phase 3 & 4: First row / column

```
matrix[0][0] == 1, not 0 → skip first-row wipe
col0 == 1 → skip first-column wipe

Final:
1 0 1
0 0 0
1 0 1   ✓ matches expected output
```

---

## 🧪 Edge Cases

| Case | Note |
|---|---|
| Zero in row 0 or column 0 | This is exactly why `col0` exists — without it, `(0,0)` can't tell row-zero and column-zero apart |
| Entire matrix is zero | Every row and column gets marked; everything stays zero |
| No zeroes at all | Nothing gets marked; matrix is returned unchanged |
| 1×1 matrix | Trivial — if it's 0, it stays 0 |

---

## 📊 Complexity Comparison

| Approach | Time | Space |
|---|---|---|
| Brute (mark with -1) | O(n·m·(n+m)) | O(1) extra |
| Better (row/col arrays) | O(n·m) | O(n + m) |
| **Optimal (in-matrix markers)** | **O(n·m)** | **O(1)** |

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Zeroing cells while still scanning for original zeroes | Always separate the marking phase from the converting phase |
| Processing the first row/column before the inner cells in the optimal approach | Inner cells depend on the markers — convert them first |
| Forgetting the `col0` variable | `(0,0)` is shared between the row-0 and column-0 marker roles — needs its own flag |
| Treating placeholder `-1`s (Brute approach) as real data | Only the final conversion pass should touch them |

---

## 🔗 Related Problems

- [[Rotate_Matrix_90|Rotate Matrix by 90°]] (another in-place matrix manipulation)
- [[Spiral_Matrix|Spiral Matrix]] (matrix traversal with boundary tracking)
- [[Two_Sum_Complete|Two Sum]] (same "mark, then act" two-phase mindset)

---

## 🧠 Memorization Checklist

- [ ] Understand why marking-while-scanning breaks correctness
- [ ] Know the row[]/col[] Better approach cold
- [ ] Understand exactly why `col0` is necessary in the Optimal approach
- [ ] Know the phase order: inner cells → first row → first column
- [ ] Trace through the walkthrough yourself

---

**Back to**: [[Matrix Problems|Matrix Problems Index]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: June 18, 2026
