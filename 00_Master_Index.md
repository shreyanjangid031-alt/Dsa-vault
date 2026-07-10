---
tags: [dsa, striver, a2z, index, master]
topic: DSA Vault — Master Index
status: complete
date: 2026-06-18
---

# 🗺️ DSA Vault — Master Index (Striver's A2Z)

This is the top-level map of your vault. Follow the steps in order, top to bottom. All notes below have now been cleaned up, cross-linked, and given consistent frontmatter.

---

## 📚 Step-by-Step Path

### Step 2 — Sorting Algorithms
- [[Sorting]] — Selection, Bubble, Insertion (iterative + recursive), Merge Sort

### Step 2.x — C++ STL
- [[STL]] — Pairs, Vector, List, Deque, Stack, Queue, Priority Queue, Set/Multiset/Unordered Set, Map/Multimap/Unordered Map, sorting & comparators

### Step 3.1 — Arrays: Easy Problems
- [[ARRAY easy part 1]] — Problems 1–4: Largest Element, Second Largest, Check Sorted, Remove Duplicates
- [[ARRAY easy part 2]] — Problems 5–9: Left Rotate by One, Left Rotate by D, Move Zeroes, Linear Search, Union, Intersection
- [[ARRAY easy part 3]] — Problems 10–12: Max Consecutive Ones, Single Number (XOR), Longest Subarray with Sum K

### Step 3.2 — Arrays: Medium Problems (Part A — Core Techniques)
- [[Arrays Medium]] *(index)*
  - [[Majority_Element]] — Moore's Voting
  - [[Sort_0_1_2]] — Dutch National Flag
  - [[Two_Sum_Complete]] — Hashing / Two Pointer
  - [[Max_Subarray_Sum]] — Kadane's Algorithm
  - [[Longest_Consecutive_Sequence]] — Hash Set, "start at beginnings"
  - [[Subarray_Sum_Equals_K]] — Prefix Sum + HashMap

### Step 3.2 — Arrays: Medium Problems (Part B — Greedy / Pattern Problems)
- [[INDEX_New_Problems]] *(index)*
  - [[Best_Time_Buy_Sell_Stock]] — Greedy min-tracking
  - [[Rearrange_Array_by_Sign]] — Even/odd index pattern
  - [[Next_Permutation]] — Three-step lexicographic algorithm
  - [[Leaders_in_Array]] — Backward max-tracking

### Step 3.2 — Arrays: Medium Problems (Part C — Matrix Problems)
- [[Matrix Problems]] *(index)*
  - [[Set_Matrix_Zeroes]] — In-place marking via the matrix's own row 0 / column 0
  - [[Rotate_Matrix_90]] — Transpose + reverse rows
  - [[Spiral_Matrix]] — Four shrinking boundaries

---

## 🔗 What's New (This Round — 5 New Medium Problems)

- **Added [[Longest_Consecutive_Sequence]]** to [[Arrays Medium]] (Part A) — Brute (O(n²)) → Better (sort, O(n log n)) → Optimal (hash set, O(n)).
- **Added [[Subarray_Sum_Equals_K]]** to [[Arrays Medium]] (Part A) — Brute (O(n³)) → Better (O(n²)) → Optimal (prefix sum + hashmap, O(n)). Cross-linked with a disambiguation callout against [[ARRAY easy part 3#Problem 12 — Longest Subarray with Sum K|Problem 12]], since the two are easy to confuse but solve different questions (count vs. longest length).
- **New companion index created: [[Matrix Problems]]** (Step 3.2, Part C) — the first 2D-matrix notes in the vault, containing:
  - [[Set_Matrix_Zeroes]] — Brute (mark with -1) → Better (row/col arrays) → Optimal (matrix's own first row/column as markers, O(1) extra space)
  - [[Rotate_Matrix_90]] — Brute (new matrix) → Optimal (transpose + reverse rows, O(1) extra space)
  - [[Spiral_Matrix]] — single implementation-focused optimal solution, four shrinking boundaries
- All three Step 3.2 indexes ([[Arrays Medium]], [[INDEX_New_Problems]], [[Matrix Problems]]) now cross-link to each other as companions, confirmed complete by the source material itself ("this wraps up the medium section of arrays").

---

## 🔗 What Was Fixed (This Round — Sorting, STL, ARRAY easy part 2)

- **Formatting**: `Sorting.md`, `STL.md`, and `ARRAY_easy_part_2.md` all had a blank line inserted after literally every single line (an export artifact) — roughly cut their line counts in half by re-flowing them into normal markdown spacing, without touching any code block contents.
- **The numbering collision is resolved**: `ARRAY easy part 2` genuinely covers problems 5–9 (Left Rotate ×2, Move Zeroes, Linear Search, Union, Intersection), confirmed by its own closing line ("Next: Problems 10–14..."). `ARRAY easy part 3`'s problems have been renumbered from 5–7 to **10–12** to continue correctly, and the provisional warning callout that was in that note has been removed.
- **Dead links fixed**: `STL.md` and `ARRAY_easy_part_2.md` both referenced a non-existent `DSA_Arrays_Notes` note (for "previous array problems" and STL cross-refs) — now point to [[ARRAY easy part 1]] and the rest of the array notes directly.
- **Dead link fixed**: `Sorting.md` linked to `CPP_STL_Complete_Guide#Sort` — now correctly points to [[STL#Sort]].
- **Broken table links fixed**: `ARRAY easy part 2`'s "Linked Concepts" table pointed at `DSA_Arrays_Notes#Problem X` for three different problems — all now point to the matching sections in [[ARRAY easy part 1]].
- **Malformed link syntax fixed**: STL's "Related Files" section had a stray space inside `[[Sorting ]]` and a broken indented bullet `-[[ARRAY easy part 2]]` — cleaned up and expanded to link the whole vault.
- **Consistent YAML frontmatter** added to all three notes, matching the rest of the vault.
- [[ARRAY easy part 1]]'s "Next Problems to Solve" list updated to reflect what Part 2 actually contains (it previously only loosely guessed at this).

---

## 🔗 What Was Fixed (Previous Round — Arrays Medium, New Problems, and the 8 problem notes)

- **Dead links fixed**: `Majority_Element`, `Sort_0_1_2`, `Two_Sum_Complete`, and `Max_Subarray_Sum` all pointed to a non-existent `INDEX_Advanced_Problems` — now correctly point to [[Arrays Medium]].
- **Dead links fixed**: `Arrays Medium` and `INDEX_New_Problems` pointed to `Sorting_Algorithms_Complete`, `Array_Problems_Advanced`, and `CPP_STL_Complete_Guide` — now point to [[Sorting]], the [[ARRAY easy part 1|ARRAY easy parts]], and [[STL]] respectively.
- **Broken example fixed**: `Next_Permutation`'s walkthrough had a visible mid-note self-correction with an incorrect expected output — replaced with a fully worked, correct walkthrough.
- **Ghost-file links fixed**: links to nonexistent `Single_Number` and `Longest_Subarray_Sum` notes now point to the actual subsections inside [[ARRAY easy part 3]].
- **Self-referencing link removed** from `Rearrange_Array_by_Sign`.
- **Consistent YAML frontmatter** added to every note.
- **Two-way navigation** added throughout (Up/Prev/Next links).

---

## 📊 Coverage at a Glance

| Step | Topic | Status |
|---|---|---|
| 2.1–2.2 | Sorting | ✅ Cleaned |
| 2.x | STL | ✅ Cleaned |
| 3.1 | Arrays Easy Part 1 | ✅ Cleaned |
| 3.1 | Arrays Easy Part 2 | ✅ Cleaned |
| 3.1 | Arrays Easy Part 3 | ✅ Cleaned (renumbered 10–12) |
| 3.2 | Arrays Medium, Part A (6 problems) | ✅ Complete |
| 3.2 | Arrays Medium, Part B — New/Greedy (4 problems) | ✅ Complete |
| 3.2 | Arrays Medium, Part C — Matrix (3 problems) | ✅ Complete |
| 3.3 | Arrays Hard | ⏳ Coming next |

Everything in the vault is now cross-linked and consistent. Total: **12 easy array problems + 13 medium array problems + sorting + STL** all mapped from this one index.

> [!note] Step 3.3 (Hard Arrays) is next
> Once those transcripts come in, they'll slot in as a new **Step 3.3** section below Part C, with their own index following the same Brute → Better → Optimal structure as everything else here.
