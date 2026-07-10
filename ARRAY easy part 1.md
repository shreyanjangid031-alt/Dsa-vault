---
tags: [dsa, arrays, striver, a2z, easy, two-pointer]
topic: Arrays Easy Problems — Part 1
step: "Step 3.1"
difficulty: Easy
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 📦 DSA - Arrays (Step 3.1, Part 1)

## 📌 Course Info

- **Source**: Striver A2Z DSA Course
- **Topic**: Step 3 - Arrays
- **Total Problems in Step**: 41 different problems
- **This note covers**: Problems 1–4
- **Last Updated**: May 28, 2026

**Up**: [[00_Master_Index|← Master Index]]
**Next**: [[ARRAY easy part 2|Part 2 →]] · [[ARRAY easy part 3|Part 3 →]]

---

## 🎯 What is an Array?

### Definition
An **array** is a data structure that contains **similar elements** of the **same data type**.

### Key Point
All elements must be of the same type:
- Can be integers, characters, strings, or even pairs
- **Cannot** mix integers and strings in the same array
- Example: `int arr[]` contains only integers

### Visual Representation
```
Index:  0    1    2    3    4    5
Value: [2]  [3]  [1]  [4]  [7]  [6]
```

Size of array = 6
- **Size** = 6 means indices 0 to 5

---

## 💾 Memory Management

### How Arrays are Stored
- Arrays are stored in **contiguous memory locations**
- If first element is at address **X**:
  - Element at index 0 → Address X
  - Element at index 1 → Address X + 1
  - Element at index 2 → Address X + 2
  - And so on...

### Declaration & Initialization

#### C++
```cpp
// Inside main() - garbage values
int arr[6];  // Random values

// Global scope - initialized to 0
int arr[6];  // All zeros
```

#### Java
```java
int[] arr = new int[6];  // All zeros
```

### Maximum Array Size

| Declaration Type | Max Size |
|---|---|
| Inside `main()` | 10^6 |
| Global scope | 10^7 |

> [!tip] Remember
> Global declaration allows larger arrays!

---

## 🔄 Array Indexing & Access

### Indexing Rules
- **First index**: 0
- **Last index**: n - 1
- Range: **[0, n-1]**

### Accessing Elements
```cpp
// Loop through all elements
for(int i = 0; i < n; i++) {
    cout << arr[i];  // Access element at index i
}
```

First iteration → `arr[0]`
Last iteration → `arr[n-1]`

---

## 🎬 Interview Problem-Solving Approach

### Golden Rule: Drive the Interview!

**DO NOT** give the optimal solution directly in an interview.

**Instead, follow this flow:**
```
Brute Force → Better → Optimal
```

### Why This Flow?
- Shows you can think from scratch
- Demonstrates your optimization skills
- Proves your communication abilities
- Even if you know the answer, this approach impresses

### Pattern for Every Problem
1. **Ask clarifying questions** about test cases
2. **Give the Brute Force solution** (normal, obvious approach)
3. **Optimize to Better** (if exists)
4. **Reach Optimal** (best time/space complexity)

---

## 📋 Array Problems Solved

### Problem 1: Largest Element in Array

#### Problem Statement
Find the largest element in an array.

**Example**: `arr = [2, 3, 1, 4, 7, 6]` → Answer: `7`

#### Approach 1: Brute Force (Sort)
```cpp
sort(arr.begin(), arr.end());
return arr[n-1];  // Last element after sorting
```
- **Time Complexity**: O(n log n) - sorting
- **Space Complexity**: O(1) - ignoring recursive stack
- **Why Brute Force?** Generic, normal approach

#### Approach 2: Optimal (Single Pass)
```cpp
int largest = arr[0];

for(int i = 0; i < n; i++) {
    if(arr[i] > largest) {
        largest = arr[i];
    }
}

return largest;
```

**Logic**:
1. Assume first element is largest
2. Traverse the entire array
3. If any element is greater, update largest
4. Return largest

- **Time Complexity**: O(n) - single pass ✅
- **Space Complexity**: O(1)
- **Why Optimal?** Better than O(n log n)

---

### Problem 2: Second Largest Element (Without Sorting)

#### Problem Statement
Find the second largest element in array. Handle duplicates correctly.

**Example**: `arr = [1, 2, 4, 5, 7, 7]`
- Largest = 7
- Second Largest = 5 (not 7)

#### Key Points
- Largest is 7, but the OTHER 7 is also largest, not second largest
- Second largest is 5

#### Approach 1: Brute Force (Sort)
```cpp
sort(arr.begin(), arr.end());
// arr = [1, 2, 4, 5, 7, 7]

for(int i = n-2; i >= 0; i--) {
    if(arr[i] != largest) {
        second_largest = arr[i];
        break;
    }
}
```
- **Time Complexity**: O(n log n) - sorting + O(n) - search = O(n log n)
- **Space Complexity**: O(1)

#### Approach 2: Better (Two Passes)
```cpp
// First pass: Find largest
int largest = arr[0];
for(int i = 0; i < n; i++) {
    if(arr[i] > largest) {
        largest = arr[i];
    }
}

// Second pass: Find second largest
int second_largest = -1;
for(int i = 0; i < n; i++) {
    if(arr[i] > second_largest && arr[i] != largest) {
        second_largest = arr[i];
    }
}
```
- **Time Complexity**: O(2n) = O(n) - but technically two passes
- **Space Complexity**: O(1)

#### Approach 3: Optimal (One Pass, Two Pointers)
```cpp
int largest = arr[0];
int second_largest = -1;

for(int i = 1; i < n; i++) {
    if(arr[i] > largest) {
        second_largest = largest;  // Old largest becomes second
        largest = arr[i];
    }
    else if(arr[i] > second_largest && arr[i] != largest) {
        second_largest = arr[i];
    }
}
```

**Logic**:
1. If element is greater than largest:
   - Current largest moves to second_largest
   - Element becomes new largest
2. Else if element is between largest and second_largest:
   - Update second_largest
3. Skip if equal to largest (avoid duplicates)

- **Time Complexity**: O(n) - single pass ✅
- **Space Complexity**: O(1)

#### Edge Case Handling
- Array has minimum size 2
- All elements are unique and non-negative
- Every array guaranteed to have second largest

> [!warning] Important Notes
> - Update second_largest BEFORE updating largest
> - Use `!=` to avoid duplicate largest values
> - For negative numbers: Use `INT_MIN` instead of `-1`

---

### Problem 3: Check if Array is Sorted

#### Problem Statement
Check if array is sorted in **non-descending order** (increasing or equal allowed).

**Valid sorted arrays**:
- `[1, 2, 2, 3, 4]` ✅ (2 equals 2 is allowed)
- `[1, 2, 3, 4]` ✅

**Not sorted**:
- `[1, 2, 1, 3]` ❌ (2 > 1, order breaks)

#### Approach: Single Pass
```cpp
for(int i = 1; i < n; i++) {
    if(arr[i] < arr[i-1]) {
        return false;  // Order breaks
    }
}
return true;  // Completed entire array
```

**Logic**:
1. Start from index 1 (second element)
2. Check if current element >= previous element
3. If any element breaks this: return false
4. If entire array passes: return true

- **Time Complexity**: O(n) - single pass
- **Space Complexity**: O(1)
- **Why no Brute/Better/Optimal?** Straightforward problem, no optimization possible

---

### Problem 4: Remove Duplicates from Sorted Array

#### Problem Statement
Remove duplicate elements **in-place** from sorted array and return count of unique elements.

**Important**:
- Cannot create new array
- Modify the given array itself
- First k positions should contain unique elements (where k = count of unique)
- Return k (number of unique elements)

**Example**:
```
Input: [1, 1, 1, 2, 2, 3, 3, 3]
Output: k = 3
Modified Array: [1, 2, 3, _, _, _, _, _]
(Remaining positions don't matter)
```

#### Approach 1: Brute Force (Using Set)
```cpp
unordered_set<int> unique_set;

// Insert all elements into set
for(int i = 0; i < n; i++) {
    unique_set.insert(arr[i]);
}

// Set stores only unique elements in sorted order
// Copy back to array
int idx = 0;
for(int element : unique_set) {
    arr[idx] = element;
    idx++;
}

return idx;  // Count of unique elements
```

**Logic**:
1. Use set (stores unique, sorted elements)
2. Insert all array elements
3. Copy set back to array from index 0
4. Return final index

- **Time Complexity**: O(n log n) - insertion into set
- **Space Complexity**: O(n) - extra space for set
- **Why Brute Force?** Uses extra data structure

#### Approach 2: Optimal (Two Pointer Technique)
```cpp
int i = 0;  // Points to position for next unique element

for(int j = 1; j < n; j++) {
    if(arr[j] != arr[i]) {  // Found a different element
        i++;
        arr[i] = arr[j];
    }
}

return i + 1;  // Count of unique elements
```

**Logic**:
```
Initial: [1, 1, 1, 2, 2, 3, 3, 3]
         i

j=1: arr[1]=1 == arr[0]=1 → skip
j=2: arr[2]=1 == arr[0]=1 → skip
j=3: arr[3]=2 != arr[0]=1 → i++, arr[1]=2
     [1, 2, 1, 2, 2, 3, 3, 3]
        i
j=4: arr[4]=2 == arr[1]=2 → skip
j=5: arr[5]=3 != arr[1]=2 → i++, arr[2]=3
     [1, 2, 3, 2, 2, 3, 3, 3]
           i
j=6,7: arr[6]=3, arr[7]=3 == arr[2]=3 → skip

Return i+1 = 3
```

- **Time Complexity**: O(n) - single pass ✅
- **Space Complexity**: O(1) - in-place modification ✅
- **Why Optimal?** No extra space, single pass

> [!warning] Key Points
> - **First unique element always stays at position 0** - no need to change
> - **i tracks the position** where next unique element should go
> - Only when `arr[j] != arr[i]`, we move i and place element
> - Array is sorted, so all duplicates are adjacent

---

## 🔑 Key Concepts & Gotchas

### Two Pointer Technique
Used when:
- Array is sorted
- Need in-place modification
- Need to compare adjacent or separated elements

**Pattern**:
```
i = some position
j = some other position (usually i+1 or i-1)

while(j < n) {
    if(condition) {
        update i
    }
    j++
}
```

### Common Mistakes

| Mistake | Fix |
|---|---|
| Updating largest before saving to second_largest | Always: `second = largest` before `largest = new` |
| Comparing `arr[i] > second` without checking `!= largest` | Always check both conditions for second element |
| Forgetting base case in loops | Always start loop from appropriate index |
| Using `-1` when array has negatives | Use `INT_MIN` for negative arrays |
| Creating new array when problem asks in-place | Modify existing array only |

---

## 📊 Complexity Cheat Sheet

### Time Complexity Comparison

| Operation | Brute Force | Better | Optimal |
|---|---|---|---|
| Largest Element | O(n log n) | - | **O(n)** |
| Second Largest | O(n log n) | O(2n) | **O(n)** |
| Check Sorted | - | - | **O(n)** |
| Remove Duplicates | O(n log n) | O(n) | **O(n)** |

### Space Complexity

| Approach | Space |
|---|---|
| Using Set | O(n) |
| Two Pointers | **O(1)** |
| Sorting | O(1) |

---

## 🎓 Study Tips

### For Each Problem
- [ ] Understand problem statement clearly
- [ ] Ask clarifying questions (mentally)
- [ ] Write brute force (even if obvious)
- [ ] Optimize step by step
- [ ] Code in online compiler
- [ ] Test with edge cases

### Edge Cases to Test
- Single element array
- All duplicate elements
- Already sorted array
- Reverse sorted array
- Negative numbers
- Very large numbers

### Interview Checklist
- [ ] Explain approach before coding
- [ ] Walk through with example
- [ ] Code with proper variable names
- [ ] Handle edge cases
- [ ] Discuss time/space complexity
- [ ] Ask if can optimize further

---

## 🔗 Related Notes

- [[ARRAY easy part 2|Part 2 →]] — Problems 5–8 (Rotate Array, Move Zeroes, Linear Search, Union & Intersection)
- [[ARRAY easy part 3|Part 3 →]] — Max Consecutive Ones, Single Number, Longest Subarray with Sum K
- [[Arrays Medium]] — Step 3.2 (Medium array problems)
- [[Sorting]] — Step 2.1/2.2 prerequisite

---

## 📝 Next Problems to Solve

- Problem 5: Left Rotate Array by One Place
- Problem 5.1: Left Rotate Array by D Places
- Problem 6: Move Zeros to End
- Problem 7: Linear Search
- Problem 8: Union of Two Sorted Arrays
- Problem 9: Intersection of Two Sorted Arrays
- Problems 10–12: Max Consecutive Ones, Single Number, Longest Subarray with Sum K (see [[ARRAY easy part 3]])
- And more after that...

---

**Note**: This is Part 1 of Step 3 (Arrays). Total 41 problems in this step.

**Back to**: [[00_Master_Index|Master Index]]
