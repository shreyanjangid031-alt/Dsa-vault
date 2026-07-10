---
tags: [dsa, arrays, striver, a2z, easy, two-pointer, rotation]
topic: Arrays Easy Problems — Part 2
step: "Step 3.1"
difficulty: Easy
status: completed
date: 2026-05-28
reorganized: 2026-06-18
prerequisite: "[[ARRAY easy part 1]] (Step 3.1)"
---

# 📦 DSA - Arrays (Step 3.1, Part 2)

## 📌 Course Info

- **Source**: StriverA2Z DSA Course
- **Topic**: Step 3 - Arrays (Part 2)
- **Problems Covered**: 5, 5.1, 6, 7, 8, 9
- **Related**: [[ARRAY easy part 1|Previous Array Problems (1-4)]]
- **Last Updated**: May 28, 2026

**Up**: [[00_Master_Index|← Master Index]]
**Prev**: [[ARRAY easy part 1|← Part 1]]
**Next**: [[ARRAY easy part 3|Part 3 →]]

---

## 🎬 Interview Strategy Reminder

> **Always follow**: Brute → Better → Optimal  
> Show your thought process to the interviewer. Drive the interview!

---

## 📋 Problem 5: Left Rotate Array by One Place

### Problem Statement

Rotate array left by one position. First element moves to end, all others shift left.
**Example**:

```
Input:  [1, 2, 3, 4, 5]
Output: [2, 3, 4, 5, 1]
```

### Key Constraint

- **In-place modification** (no extra array)

### Approach: Optimal (Single Pass)

Since it's a simple rotation by 1, we can go directly to optimal.

```cpp
void leftRotateByOne(int arr[], int n) {
    int temp = arr[0];  // Store first element
    // Shift all elements one place left
    for(int i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    // Place first element at end
    arr[n - 1] = temp;
}
```

**Logic**:
1. Store first element in `temp`
2. Shift all elements one position left (arr[i] = arr[i+1])
3. Place temp at last index

### Complexity Analysis

- **Time**: O(n) - single pass through array
- **Space**: O(1) - temporary variable only

### Space Complexity Clarification

> In interviews, distinguish between:
> - **Extra space** = O(1) ✅ (just temp variable)
> - **Space used in algorithm** = O(n) (using the array)
>
> Be specific: *"Sir, the extra space is O(1), but I'm using the given array to solve it."*

---

## 📋 Problem 5.1: Left Rotate Array by D Places (Follow-up)

### Problem Statement

Rotate array left by **D** positions. General solution for any D.
**Example** (D = 2):

```
Input:  [1, 2, 3, 4, 5, 6, 7], D = 2
Output: [3, 4, 5, 6, 7, 1, 2]
```

### Key Insights

#### Cyclic Nature

- Rotating by **n** positions = back to original (n = array size)
- Rotating by **8** in size 7 = rotating by **1** (8 % 7 = 1)
- **D % n** gives the actual rotations needed

```
If D = 15 and n = 7:
15 = (7 × 2) + 1
So rotate by 1 (the remainder)
```

#### Brute Force: O(n log n) - Sort-based

```cpp
sort(arr.begin(), arr.end());
// Then rearrange (not practical for this)
```

**Time**: O(n log n) - Not recommended

---

### Approach 1: Better (Using Temporary Array) - O(n) Time, O(D) Space

```cpp
void leftRotateByD(int arr[], int n, int d) {
    d = d % n;  // Handle D > n
    // Step 1: Store first D elements in temporary
    vector<int> temp;
    for(int i = 0; i < d; i++) {
        temp.push_back(arr[i]);
    }
    // Step 2: Shift elements
    //  arr[0..n-d-1] = arr[d..n-1]
    for(int i = 0; i < n - d; i++) {
        arr[i] = arr[i + d];
    }
    // Step 3: Put temp elements at end
    int idx = 0;
    for(int i = n - d; i < n; i++) {
        arr[i] = temp[idx++];
    }
}
```

**Visual Example** (D = 3, n = 7):

```
Original: [1, 2, 3, 4, 5, 6, 7]
Step 1 - Store temp: temp = [1, 2, 3]
Step 2 - Shift (i from 0 to 3):
  arr[0] = arr[3] = 4
  arr[1] = arr[4] = 5
  arr[2] = arr[5] = 6
  arr[3] = arr[6] = 7
Result: [4, 5, 6, 7, ?, ?, ?]
Step 3 - Put back:
  arr[4] = 1
  arr[5] = 2
  arr[6] = 3
Result: [4, 5, 6, 7, 1, 2, 3]
```

**Complexity**:
- **Time**: O(d) + O(n-d) + O(d) = O(n + d) ≈ O(n)
- **Space**: O(d) for temporary array

---

### Approach 2: Optimal (Reversal Technique) - O(n) Time, O(1) Space

**Key Observation**: Reverse the array parts to achieve rotation!
**Strategy**:
1. Reverse first D elements
2. Reverse remaining (n-d) elements
3. Reverse entire array

```cpp
void reverse(int arr[], int start, int end) {
    while(start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}
void leftRotateByD(int arr[], int n, int d) {
    d = d % n;
    // Reverse first D elements
    reverse(arr, 0, d - 1);
    // Reverse remaining elements
    reverse(arr, d, n - 1);
    // Reverse entire array
    reverse(arr, 0, n - 1);
}
```

**Visual Example** (D = 3):

```
Original: [1, 2, 3, 4, 5, 6, 7]
Step 1 - Reverse [0, 2]: [3, 2, 1, 4, 5, 6, 7]
Step 2 - Reverse [3, 6]: [3, 2, 1, 7, 6, 5, 4]
Step 3 - Reverse [0, 6]: [4, 5, 6, 7, 1, 2, 3]
```

**Why does this work?**
- First part: [1, 2, 3] → [3, 2, 1]
- Second part: [4, 5, 6, 7] → [7, 6, 5, 4]
- Reverse entire: [7, 6, 5, 4, 3, 2, 1] → [4, 5, 6, 7, 1, 2, 3] ✓
**Complexity**:
- **Time**: O(d) + O(n-d) + O(n) = O(2n) ≈ O(n) ✅
- **Space**: O(1) - no extra space ✅
**Why Optimal?**
- Same O(n) time as better approach
- **But**: O(1) space instead of O(d)
- Uses elegant mathematical property

### C++ STL Version

```cpp
void leftRotateByD(vector<int> &arr, int d) {
    int n = arr.size();
    d = d % n;
    reverse(arr.begin(), arr.begin() + d);
    reverse(arr.begin() + d, arr.end());
    reverse(arr.begin(), arr.end());
}
```

### Assignment

**Right Rotate by D Places**: Using the same reversal technique, can you solve right rotation?

---

## 📋 Problem 6: Move Zeros to End

### Problem Statement

Move all zeros to the end while maintaining relative order of non-zero elements.
**Example**:

```
Input:  [1, 0, 2, 3, 0, 4, 0, 5]
Output: [1, 2, 3, 4, 5, 0, 0, 0]
```

**Key**: Must maintain relative order of non-zero elements

### Approach 1: Brute Force - O(n) Time, O(n) Space

```cpp
void moveZerosToEnd(int arr[], int n) {
    vector<int> temp;
    // Step 1: Collect all non-zero elements
    for(int i = 0; i < n; i++) {
        if(arr[i] != 0) {
            temp.push_back(arr[i]);
        }
    }
    // Step 2: Put non-zero elements at front
    for(int i = 0; i < temp.size(); i++) {
        arr[i] = temp[i];
    }
    // Step 3: Fill remaining with zeros
    for(int i = temp.size(); i < n; i++) {
        arr[i] = 0;
    }
}
```

**Steps**:
1. Store all non-zero in temporary → O(n)
2. Copy back to front → O(k), where k = non-zero count
3. Fill rest with zeros → O(n-k)
**Complexity**:
- **Time**: O(n)
- **Space**: O(n) - temporary array

---

### Approach 2: Optimal - O(n) Time, O(1) Space ✅

**Key Idea**: Two-pointer technique like [[ARRAY easy part 1#Problem 4: Remove Duplicates from Sorted Array|remove duplicates problem]]

```cpp
void moveZerosToEnd(int arr[], int n) {
    int j = -1;  // Position of first zero
    // Find first zero
    for(int i = 0; i < n; i++) {
        if(arr[i] == 0) {
            j = i;
            break;
        }
    }
    // If no zeros, return
    if(j == -1) return;
    // Move non-zeros forward, zeros backward
    for(int i = j + 1; i < n; i++) {
        if(arr[i] != 0) {
            swap(arr[i], arr[j]);
            j++;
        }
    }
}
```

**Visual Example**:

```
Initial: [1, 0, 2, 3, 0, 4, 0, 5]
         j tracks first zero at index 1
i=2, arr[2]=2 (non-zero): swap with j=1
Result: [1, 2, 0, 3, 0, 4, 0, 5]
j moves to 2
i=3, arr[3]=3 (non-zero): swap with j=2
Result: [1, 2, 3, 0, 0, 4, 0, 5]
j moves to 3
i=4, arr[4]=0 (zero): skip, j stays
i=5, arr[5]=4 (non-zero): swap with j=3
Result: [1, 2, 3, 4, 0, 0, 0, 5]
j moves to 4
i=6, arr[6]=0: skip
i=7, arr[7]=5 (non-zero): swap with j=4
Result: [1, 2, 3, 4, 5, 0, 0, 0] ✓
```

**Complexity**:
- **Time**: O(n) - single pass
- **Space**: O(1) - only swapping ✅

---

## 📋 Problem 7: Linear Search

### Problem Statement

Find the **first occurrence** of a target element in an array.
**Example**:

```
Input:  arr = [1, 2, 3, 4, 5, 3, 6], target = 3
Output: 3 (0-indexed position)
Input:  arr = [1, 2, 3, 4, 5], target = 10
Output: -1 (not found)
```

### Solution: Single Pass

```cpp
int linearSearch(int arr[], int n, int target) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            return i;  // First occurrence
        }
    }
    return -1;  // Not found
}
```

**Variations**:

```cpp
// Last occurrence
int lastOccurrence(int arr[], int n, int target) {
    for(int i = n - 1; i >= 0; i--) {
        if(arr[i] == target) return i;
    }
    return -1;
}
// All occurrences
vector<int> allOccurrences(int arr[], int n, int target) {
    vector<int> positions;
    for(int i = 0; i < n; i++) {
        if(arr[i] == target) {
            positions.push_back(i);
        }
    }
    return positions;
}
```

**Complexity**:
- **Time**: O(n) - worst case (element at end or not found)
- **Space**: O(1)
**Note**: No optimization possible for unsorted array. Use binary search for sorted arrays.

---

## 📋 Problem 8: Union of Two Sorted Arrays

### Problem Statement

Find union of two sorted arrays (all unique elements from both).
**Example**:

```
Input:  arr1 = [1, 2, 3, 4], arr2 = [2, 3, 4, 5, 6]
Output: [1, 2, 3, 4, 5, 6]  // All unique elements
```

**Definition**: Union = all elements present in either array (no duplicates)

---

### Approach 1: Brute Force - Using Set

```cpp
vector<int> unionArrays(int arr1[], int n1, int arr2[], int n2) {
    set<int> st;  // Use set to store unique elements
    // Insert all elements from arr1
    for(int i = 0; i < n1; i++) {
        st.insert(arr1[i]);
    }
    // Insert all elements from arr2
    for(int i = 0; i < n2; i++) {
        st.insert(arr2[i]);
    }
    // Convert set to vector (sorted automatically)
    vector<int> result(st.begin(), st.end());
    return result;
}
```

**Why Brute Force?**
- Uses extra data structure (set)
- Doesn't leverage "sorted" property
**Complexity**:
- **Time**: O(n1 log n1) + O(n2 log n2) - insertion into set
- **Space**: O(n1 + n2) for set + result array

---

### Approach 2: Optimal - Two Pointer Technique ✅

Since both arrays are **sorted**, we can use two pointers!

```cpp
vector<int> unionArrays(int arr1[], int n1, int arr2[], int n2) {
    vector<int> result;
    int i = 0, j = 0;
    while(i < n1 && j < n2) {
        if(arr1[i] < arr2[j]) {
            // Element from arr1 is smaller
            if(result.empty() || result.back() != arr1[i]) {
                result.push_back(arr1[i]);
            }
            i++;
        }
        else if(arr1[i] > arr2[j]) {
            // Element from arr2 is smaller
            if(result.empty() || result.back() != arr2[j]) {
                result.push_back(arr2[j]);
            }
            j++;
        }
        else {
            // Elements are equal
            if(result.empty() || result.back() != arr1[i]) {
                result.push_back(arr1[i]);
            }
            i++;
            j++;
        }
    }
    // Add remaining elements from arr1
    while(i < n1) {
        if(result.empty() || result.back() != arr1[i]) {
            result.push_back(arr1[i]);
        }
        i++;
    }
    // Add remaining elements from arr2
    while(j < n2) {
        if(result.empty() || result.back() != arr2[j]) {
            result.push_back(arr2[j]);
        }
        j++;
    }
    return result;
}
```

**Visual Example**:

```
arr1 = [1, 2, 3, 4], arr2 = [2, 3, 4, 5, 6]
i=0, j=0
Step 1: 1 < 2, add 1, move i
Result: [1]
Step 2: 2 == 2, add 2, move both
Result: [1, 2]
Step 3: 3 == 3, add 3, move both
Result: [1, 2, 3]
Step 4: 4 == 4, add 4, move both
Result: [1, 2, 3, 4]
Step 5: i exhausted, j=3 (arr2[3]=5)
Add remaining: 5, 6
Result: [1, 2, 3, 4, 5, 6] ✓
```

**Key Point**: `result.back() != arr[i]` prevents duplicates
**Complexity**:
- **Time**: O(n1 + n2) - single pass through both ✅
- **Space**: O(n1 + n2) for result (required for output)

---

## 📋 Problem 9: Intersection of Two Sorted Arrays

### Problem Statement

Find intersection of two sorted arrays (elements present in **both**).
**Example**:

```
Input:  arr1 = [1, 2, 2, 3, 4, 5], arr2 = [2, 3, 3, 4, 6]
Output: [2, 3, 4]  // Elements in both (duplicates allowed)
```

**Definition**: Intersection = elements present in both arrays (respect duplicates)

---

### Approach 1: Brute Force - Visited Array

```cpp
vector<int> intersection(int arr1[], int n1, int arr2[], int n2) {
    vector<bool> visited(n2, false);  // Track which elements used
    vector<int> result;
    // For each element in arr1
    for(int i = 0; i < n1; i++) {
        // Find matching element in arr2
        for(int j = 0; j < n2; j++) {
            if(arr1[i] == arr2[j] && !visited[j]) {
                result.push_back(arr1[i]);
                visited[j] = true;
                break;  // Found match, stop looking
            }
            // Early termination if arr2 exceeds arr1 (sorted)
            if(arr2[j] > arr1[i]) break;
        }
    }
    return result;
}
```

**Logic**:
1. For each element in arr1, search in arr2
2. Use visited array to avoid reusing elements
3. Break when arr2 element > arr1 element (sorted property)
**Complexity**:
- **Time**: O(n1 × n2) worst case
- **Space**: O(n2) for visited array

---

### Approach 2: Optimal - Two Pointer ✅

```cpp
vector<int> intersection(int arr1[], int n1, int arr2[], int n2) {
    vector<int> result;
    int i = 0, j = 0;
    while(i < n1 && j < n2) {
        if(arr1[i] < arr2[j]) {
            i++;  // arr1 element has no match
        }
        else if(arr1[i] > arr2[j]) {
            j++;  // arr2 element has no match
        }
        else {
            // Match found
            result.push_back(arr1[i]);
            i++;
            j++;
        }
    }
    return result;
}
```

**Visual Example**:

```
arr1 = [1, 2, 2, 3, 4, 5]
arr2 = [2, 3, 3, 4, 6]
i=0, j=0
1 < 2: move i (1 has no match)
2 == 2: add 2, move both
Result: [2]
2 < 3: move i (second 2 in arr1)
3 == 3: add 3, move both
Result: [2, 3]
3 < 4: move i
Wait, arr1[i]=4, so 4 == 3? No, 3 < 4
4 == 4: add 4, move both
Result: [2, 3, 4]
i exhausted, loop ends ✓
```

**Why This Works**:
- If arr1[i] < arr2[j]: arr1[i] cannot match anything further (sorted)
- If arr1[i] > arr2[j]: arr2[j] cannot match anything further (sorted)
- If equal: Found intersection element

**Complexity**:
- **Time**: O(n1 + n2) - single pass ✅
- **Space**: O(1) extra (excluding result array) ✅

---

## 🔗 Linked Concepts

| Problem | Related Concepts |
|---|---|
| Left Rotate by D | [[ARRAY easy part 1#Problem 3: Check if Array is Sorted\|Two Pointer Technique]], Cyclic Property |
| Move Zeros | [[ARRAY easy part 1#Problem 4: Remove Duplicates from Sorted Array\|Two Pointer Technique]] |
| Linear Search | [[ARRAY easy part 1#Problem 1: Largest Element in Array\|Basic Array Iteration]] |
| Union | Set Data Structure, Sorted Array Property — see [[STL#Set - Unique & Sorted|Set]] |
| Intersection | [[ARRAY easy part 1#Problem 4: Remove Duplicates from Sorted Array\|Two Pointer Technique]] |

---

## 📊 Comparison Table

| Problem | Brute TC | Better TC | Optimal TC | Optimal SC | Technique |
|---|---|---|---|---|---|
| Left Rotate D | - | O(n+d) | **O(n)** | **O(1)** | Reversal |
| Move Zeros | O(n) | O(n) | **O(n)** | **O(1)** | Two Pointer |
| Linear Search | - | - | **O(n)** | **O(1)** | Iteration |
| Union | O(n log n) | - | **O(n)** | **O(n)** | Two Pointer |
| Intersection | O(n²) | - | **O(n)** | **O(1)** | Two Pointer |

---

## 🎯 Key Patterns to Remember

### 1. Leveraging Sorted Property

- Union/Intersection use two pointers because arrays are sorted
- No comparison needed for unsorted arrays

### 2. Reversing Technique

- Powerful for rotation problems
- 3 reversals = one rotation

### 3. Two Pointer Pattern

```
Pattern 1: [i..........j] (opposite directions)
Pattern 2: [i.......j] (same direction)
```

### 4. Avoiding Duplicates

```cpp
// Check before adding
if(result.empty() || result.back() != element) {
    result.push_back(element);
}
```

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Forget D % n | Always reduce D to actual rotations needed |
| Not checking for empty result | Use `result.empty()` before `result.back()` |
| Moving only one pointer in two-pointer | Move accordingly based on condition |
| Using unordered_set for union | Use `set` to maintain sorted order |
| Not handling exhausted array cases | Add while loops for remaining elements |

---

## 📝 Practice Exercises

1. **Right Rotate by D**: Mirror of left rotate
2. **Move Non-Zeros to Start**: Reverse of move zeros
3. **Find Element Appearing Once**: Among elements appearing twice
4. **Duplicate Elements**: Find which elements repeat in sorted array
5. **Majority Element**: Element appearing > n/2 times

---

## 🔗 Related Files

- [[ARRAY easy part 1]] — Step 3.1, Problems 1–4
- [[ARRAY easy part 3]] — Step 3.1, Problems 10–12
- [[Arrays Medium]] — Step 3.2
- [[STL]] — `set` used in Problem 8's brute force

---

**Note**: This completes Problems 5–9. Total 9 problems solved from the 41 in Step 3 (Arrays).
Next: [[ARRAY easy part 3]] — Problems 10–12 (Max Consecutive Ones, Single Number, Longest Subarray with Sum K)

**Back to**: [[00_Master_Index|Master Index]]
