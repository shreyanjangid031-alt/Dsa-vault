---
tags: [sorting, algorithms, striver, a2z]
topic: Sorting Algorithms Complete Guide
step: "Step 2.1 / 2.2"
status: completed
date: 2026-05-28
reorganized: 2026-06-18
---

# 📊 Sorting Algorithms Complete Guide

## 📌 Course Info

- **Source**: StriverA2Z DSA Course - Step 2
- **Topic**: Step 2.1 (Non-recursive) & Step 2.2 (Recursive/Merge Sort)
- **Related**: [[STL#Sort|STL Sorting]]
- **Last Updated**: May 28, 2026

**Up**: [[00_Master_Index|← Master Index]]

---

## 🎯 Learning Path

```
Sorting Algorithms
├── Non-Recursive (Step 2.1)
│   ├── Selection Sort
│   ├── Bubble Sort
│   └── Insertion Sort
│
└── Recursive (Step 2.2)
    ├── Merge Sort (Main)
    ├── Recursive Bubble Sort
    └── Recursive Insertion Sort
```

---

## 📋 Quick Comparison Table

|Algorithm|Best TC|Average TC|Worst TC|Space|Stable|Use Case|
|---|---|---|---|---|---|---|
|Selection Sort|O(n²)|O(n²)|O(n²)|O(1)|❌|Small arrays|
|Bubble Sort|**O(n)**|O(n²)|O(n²)|O(1)|✅|Sorted data|
|Insertion Sort|**O(n)**|O(n²)|O(n²)|O(1)|✅|Nearly sorted|
|Merge Sort|O(n log n)|O(n log n)|O(n log n)|O(n)|✅|**Optimal**|

---

# SECTION 1: Non-Recursive Sorts

---

## 🔍 Selection Sort

### Core Concept

**Remember**: Select **minimums** and place at front

### Algorithm Explanation

**Visual Example**:

```
Original:  [13, 46, 24, 52, 20, 9]
Step 1: Find min (9), swap with arr[0]
        [9, 46, 24, 52, 20, 13]
Step 2: Find min in [46,24,52,20,13] (13), swap with arr[1]
        [9, 13, 24, 52, 20, 46]
Step 3: Find min in [24,52,20,46] (20), swap with arr[2]
        [9, 13, 20, 52, 24, 46]
Step 4: Find min in [52,24,46] (24), swap with arr[3]
        [9, 13, 20, 24, 52, 46]
Step 5: Find min in [52,46] (46), swap with arr[4]
        [9, 13, 20, 24, 46, 52]
Step 6: Single element (52) - already sorted
        [9, 13, 20, 24, 46, 52] ✓
```

### Key Observations

1. **Outer loop**: i = 0 to n-2 (why n-2? Last element will be sorted automatically)
2. **Inner loop**: j = i to n-1 (find minimum in remaining array)
3. **Track**: minIndex (position of minimum)
4. **Action**: Swap arr[i] with arr[minIndex]

### Pseudocode

```cpp
void selectionSort(arr[], n) {
    for(int i = 0; i < n-1; i++) {
        // Find minimum index in arr[i...n-1]
        int minIndex = i;
        for(int j = i; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap arr[i] with arr[minIndex]
        swap(arr[i], arr[minIndex]);
    }
}
```

### Implementation (C++)

```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for(int i = 0; i < n-1; i++) {
        int minIndex = i;
        // Find minimum in remaining array
        for(int j = i+1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap
        swap(arr[i], arr[minIndex]);
    }
}
// Helper swap (if needed)
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}
```

### Complexity Analysis

**Time Complexity**:
- Outer loop: n iterations
- Inner loop: n, n-1, n-2, ..., 2 iterations
- Total: n + (n-1) + (n-2) + ... + 2 = n(n+1)/2 - 1 ≈ **O(n²)**
- Best, Average, Worst: All **O(n²)**
**Space Complexity**: **O(1)** (in-place, only one temporary for swap)

### Why Not Optimal?

- Always O(n²) even if array is sorted
- No early termination possible

---

## 🫧 Bubble Sort

### Core Concept

**Remember**: Push **maximum** to the end by adjacent swapping

### Algorithm Explanation

**Visual Example**:

```
Original: [13, 46, 24, 52, 20, 9]
Pass 1: Adjacent comparisons
13 < 46? Yes, stay  → [13, 46, 24, 52, 20, 9]
46 < 24? No, swap  → [13, 24, 46, 52, 20, 9]
46 < 52? Yes, stay  → [13, 24, 46, 52, 20, 9]
52 < 20? No, swap  → [13, 24, 46, 20, 52, 9]
52 < 9? No, swap   → [13, 24, 46, 20, 9, 52] ✓ (52 at end)
Pass 2: Same for [13, 24, 46, 20, 9]
        → [13, 24, 20, 9, 46, 52] ✓
Pass 3: → [13, 20, 9, 24, 46, 52] ✓
Pass 4: → [13, 9, 20, 24, 46, 52] ✓
Pass 5: → [9, 13, 20, 24, 46, 52] ✓
Result: [9, 13, 20, 24, 46, 52] ✓
```

### Key Observations

1. **Outer loop**: i = n-1 down to 1 (or 0 to n-1 with inner adjustment)
2. **Inner loop**: j = 0 to i-1 (compare adjacent elements)
3. **Comparison**: arr[j] > arr[j+1]?
4. **Action**: Swap if not in order

### Pseudocode

```cpp
void bubbleSort(arr[], n) {
    for(int i = n-1; i > 0; i--) {
        // Compare adjacent elements
        for(int j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
```

### Implementation (C++)

```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for(int i = n-1; i > 0; i--) {
        for(int j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
```

### Optimized Bubble Sort

```cpp
void bubbleSortOptimized(vector<int>& arr) {
    int n = arr.size();
    for(int i = n-1; i > 0; i--) {
        bool didSwap = false;
        for(int j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                didSwap = true;
            }
        }
        // If no swaps, array is sorted
        if(!didSwap) break;
    }
}
```

### Complexity Analysis

**Time Complexity**:
- **Worst Case**: O(n²) - reversed array
- **Average Case**: O(n²)
- **Best Case**: **O(n)** - sorted array with optimization
    - First pass: no swaps detected → break immediately
**Space Complexity**: **O(1)** (in-place)
**Stability**: ✅ YES (equal elements maintain relative order)

### Why Optimization Matters?

```
Sorted Array [1, 2, 3, 4, 5]:
Without optimization: O(n²)
With optimization: O(n) - breaks after first pass
```

---

## ➕ Insertion Sort

### Core Concept

**Remember**: Take element and place it in correct position

### Algorithm Explanation

**Visual Example**:

```
Original: [14, 9, 15, 12, 6]
i=1: Take 9, compare with 14
     9 < 14? Yes, swap → [9, 14, 15, 12, 6]
i=2: Take 15, compare left
     15 < 14? No, stop → [9, 14, 15, 12, 6]
i=3: Take 12, compare left
     12 < 15? Yes, shift  → [9, 14, 12, 15, 6]
     12 < 14? Yes, shift  → [9, 12, 14, 15, 6]
     12 < 9? No, stop
i=4: Take 6, compare left
     6 < 15? Yes, shift  → [9, 12, 14, 6, 15]
     6 < 14? Yes, shift  → [9, 12, 6, 14, 15]
     6 < 12? Yes, shift  → [9, 6, 12, 14, 15]
     6 < 9? Yes, shift   → [6, 9, 12, 14, 15] ✓
     6 < wall? Stop
Result: [6, 9, 12, 14, 15] ✓
```

### Key Observations

1. **First element is always sorted** (size 1 array)
2. **Outer loop**: i = 1 to n-1 (pick element starting from 2nd)
3. **Inner loop**: j = i-1 down to 0 (compare with left side)
4. **Action**: Swap if current < left neighbor, continue left

### Pseudocode

```cpp
void insertionSort(arr[], n) {
    // First element is already sorted
    for(int i = 1; i < n; i++) {
        // Take element at i
        int j = i;
        // Go left and swap while smaller than left neighbor
        while(j > 0 && arr[j] < arr[j-1]) {
            swap(arr[j], arr[j-1]);
            j--;
        }
    }
}
```

### Implementation (C++)

```cpp
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for(int i = 1; i < n; i++) {
        int j = i;
        // Shift left while smaller than left neighbor
        while(j > 0 && arr[j] < arr[j-1]) {
            swap(arr[j], arr[j-1]);
            j--;
        }
    }
}
```

### Alternative: Without Swap (Using Shift)

```cpp
void insertionSortShift(vector<int>& arr) {
    int n = arr.size();
    for(int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Shift elements right
        while(j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        // Insert key at correct position
        arr[j+1] = key;
    }
}
```

### Complexity Analysis

**Time Complexity**:
- **Worst Case**: O(n²) - reversed array (all swaps needed)
- **Average Case**: O(n²)
- **Best Case**: **O(n)** - sorted array (no swaps, just iteration)
**Space Complexity**: **O(1)** (in-place)
**Stability**: ✅ YES

### Why Good for Nearly Sorted Data?

```
Nearly Sorted [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]:
- O(n²) in worst case
- But practical: Very close to O(n) in real data
- Each element moves only when necessary
```

---

# SECTION 2: Recursive Sorts

---

## 🔄 Recursive Bubble Sort

### Concept

Apply bubble sort recursively:
- After each pass, largest element is in place
- Recursively sort remaining n-1 elements

### Pseudocode

```cpp
void recursiveBubbleSort(arr[], n) {
    // Base case: single element or empty
    if(n <= 1) {
        return;
    }
    // One pass of bubble sort
    // Largest element comes to end
    for(int i = 0; i < n-1; i++) {
        if(arr[i] > arr[i+1]) {
            swap(arr[i], arr[i+1]);
        }
    }
    // Recursively sort n-1 elements
    recursiveBubbleSort(arr, n-1);
}
```

### Implementation (C++)

```cpp
void recursiveBubbleSort(vector<int>& arr, int n) {
    // Base case
    if(n <= 1) return;
    // One pass: bubble largest to end
    for(int i = 0; i < n-1; i++) {
        if(arr[i] > arr[i+1]) {
            swap(arr[i], arr[i+1]);
        }
    }
    // Recursive call for n-1 elements
    recursiveBubbleSort(arr, n-1);
}
// Call: recursiveBubbleSort(arr, arr.size());
```

### Dry Run Example

```
Initial: [5, 2, 4, 3, 1], n=5
Call 1: n=5
  Pass: 2 4 3 1 5 (5 at end)
  Recursive call: n=4
Call 2: n=4
  Pass: 2 3 1 4 5 (4 at end)
  Recursive call: n=3
Call 3: n=3
  Pass: 2 1 3 4 5 (3 at end)
  Recursive call: n=2
Call 4: n=2
  Pass: 1 2 3 4 5 (2 at end)
  Recursive call: n=1
Call 5: n=1
  Base case: return
Result: [1, 2, 3, 4, 5] ✓
```

### Complexity

- **Time**: O(n²) (same as iterative)
- **Space**: O(n) (recursion stack depth = n)

### Key Difference from Iterative

- Extra space for recursion stack
- Conceptually cleaner: "sort n-1 elements after one pass"

---

## 🔄 Recursive Insertion Sort

### Concept

Recursively sort first n-1 elements, then insert nth element

### Pseudocode

```cpp
void recursiveInsertionSort(arr[], n) {
    // Base case: single element is sorted
    if(n <= 1) {
        return;
    }
    // Recursively sort first n-1 elements
    recursiveInsertionSort(arr, n-1);
    // Insert nth element at correct position
    int key = arr[n-1];
    int j = n-2;
    while(j >= 0 && arr[j] > key) {
        arr[j+1] = arr[j];
        j--;
    }
    arr[j+1] = key;
}
```

### Implementation (C++)

```cpp
void recursiveInsertionSort(vector<int>& arr, int n) {
    // Base case
    if(n <= 1) return;
    // Sort first n-1 elements
    recursiveInsertionSort(arr, n-1);
    // Insert nth element in correct position
    int key = arr[n-1];
    int j = n-2;
    while(j >= 0 && arr[j] > key) {
        arr[j+1] = arr[j];
        j--;
    }
    arr[j+1] = key;
}
// Call: recursiveInsertionSort(arr, arr.size());
```

### Dry Run Example

```
Initial: [5, 2, 4, 3, 1], n=5
Call 1: n=5
  Recursive call: n=4
Call 2: n=4
  Recursive call: n=3
Call 3: n=3
  Recursive call: n=2
Call 4: n=2
  Recursive call: n=1
Call 5: n=1
  Base case: return
  Back to Call 4: arr=[5, 2]
  Insert 2: Compare with 5, swap → [2, 5]
Back to Call 3: arr=[2, 5, 4]
  Insert 4: Compare with 5, shift; compare with 2, stop
           → [2, 4, 5]
Back to Call 2: arr=[2, 4, 5, 3]
  Insert 3: Shift until position found
           → [2, 3, 4, 5]
Back to Call 1: arr=[2, 3, 4, 5, 1]
  Insert 1: Shift all, place at start
           → [1, 2, 3, 4, 5] ✓
```

### Complexity

- **Time**: O(n²)
- **Space**: O(n) (recursion stack)

### Why Recursive?

Shows elegant recursive thinking:
1. Assume first n-1 elements are sorted
2. Insert nth element properly
3. This breaks down a problem into smaller subproblems

---

# SECTION 3: Merge Sort (Optimal)

---

## 🔀 Merge Sort - Complete Guide

### Core Concept

**Remember**: **Divide** and **Merge**
Two-phase algorithm:
1. **Divide**: Split array into halves recursively until single elements
2. **Merge**: Merge sorted halves back together

### Why Merge Sort?

```
Selection/Bubble/Insertion: O(n²)
Merge Sort: O(n log n) ← Much faster!
For n=1,000,000:
- O(n²) = 10^12 operations
- O(n log n) ≈ 2×10^7 operations ← 50,000x faster!
```

### Algorithm Explanation

**Visual Example** (Complete Process):

```
Original: [38, 27, 43, 3, 9, 82, 10]
DIVIDE PHASE (recursive splitting):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                [38, 27, 43, 3, 9, 82, 10]
               /                           \
         [38, 27, 43, 3]            [9, 82, 10]
         /                \          /          \
      [38, 27]        [43, 3]    [9, 82]    [10]
      /      \        /      \    /    \
   [38]    [27]   [43]    [3] [9] [82]  [10]
MERGE PHASE (merge sorted subarrays):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   [38]    [27]   [43]    [3]  [9]  [82]  [10]
      \      /        \      /     /    \    /
      [27, 38]      [3, 43]    [9, 82]  [10]
           \          /               \    /
          [3, 27, 38, 43]         [9, 10, 82]
                 \                      /
              [3, 9, 10, 27, 38, 43, 82] ✓
```

### Key Concepts

1. **Divide**: Split at middle until single elements
    - mid = (low + high) / 2
    - Left half: [low, mid]
    - Right half: [mid+1, high]
2. **Merge**: Combine two sorted arrays
    - Use two pointers
    - Compare and pick smaller element
    - Handle remaining elements

### Pseudocode

**Main Function**:

```cpp
void mergeSort(arr[], low, high) {
    if(low >= high) {
        return;  // Base case: single element
    }
    int mid = (low + high) / 2;
    // Recursively sort left half
    mergeSort(arr, low, mid);
    // Recursively sort right half
    mergeSort(arr, mid+1, high);
    // Merge sorted halves
    merge(arr, low, mid, high);
}
```

**Merge Function**:

```cpp
void merge(arr[], low, mid, high) {
    vector<int> temp;
    int left = low;
    int right = mid + 1;
    // Compare and merge elements
    while(left <= mid && right <= high) {
        if(arr[left] <= arr[right]) {
            temp.push_back(arr[left]);
            left++;
        } else {
            temp.push_back(arr[right]);
            right++;
        }
    }
    // Add remaining from left
    while(left <= mid) {
        temp.push_back(arr[left]);
        left++;
    }
    // Add remaining from right
    while(right <= high) {
        temp.push_back(arr[right]);
        right++;
    }
    // Copy back to original array
    for(int i = 0; i < temp.size(); i++) {
        arr[low + i] = temp[i];
    }
}
```

### Implementation (C++)

```cpp
void merge(vector<int>& arr, int low, int mid, int high) {
    vector<int> temp;
    int left = low;
    int right = mid + 1;
    // Merge elements
    while(left <= mid && right <= high) {
        if(arr[left] <= arr[right]) {
            temp.push_back(arr[left++]);
        } else {
            temp.push_back(arr[right++]);
        }
    }
    // Copy remaining from left
    while(left <= mid) {
        temp.push_back(arr[left++]);
    }
    // Copy remaining from right
    while(right <= high) {
        temp.push_back(arr[right++]);
    }
    // Copy back to original array
    for(int i = 0; i < temp.size(); i++) {
        arr[low + i] = temp[i];
    }
}
void mergeSort(vector<int>& arr, int low, int high) {
    if(low >= high) return;  // Base case
    int mid = (low + high) / 2;
    // Sort left
    mergeSort(arr, low, mid);
    // Sort right
    mergeSort(arr, mid + 1, high);
    // Merge
    merge(arr, low, mid, high);
}
// Call: mergeSort(arr, 0, arr.size() - 1);
```

### Dry Run Example

```
Initial: [38, 27, 43, 3, 9, 82, 10]
         low=0, high=6
mergeSort(arr, 0, 6):
  mid = 3
  mergeSort(arr, 0, 3):  // [38, 27, 43, 3]
    mid = 1
    mergeSort(arr, 0, 1):  // [38, 27]
      mid = 0
      mergeSort(arr, 0, 0): return (base case)
      mergeSort(arr, 1, 1): return (base case)
      merge: [38], [27] → [27, 38]
    mergeSort(arr, 2, 3):  // [43, 3]
      mid = 2
      mergeSort(arr, 2, 2): return
      mergeSort(arr, 3, 3): return
      merge: [43], [3] → [3, 43]
    merge: [27, 38], [3, 43] → [3, 27, 38, 43]
  mergeSort(arr, 4, 6):  // [9, 82, 10]
    mid = 5
    mergeSort(arr, 4, 5):  // [9, 82]
      ... → [9, 82]
    mergeSort(arr, 6, 6):  // [10]
      ... → [10]
    merge: [9, 82], [10] → [9, 10, 82]
  merge: [3, 27, 38, 43], [9, 10, 82] 
         → [3, 9, 10, 27, 38, 43, 82] ✓
Result: [3, 9, 10, 27, 38, 43, 82]
```

### Complexity Analysis

**Time Complexity**:
- **Divide**: O(log n) levels
- **Merge**: O(n) per level
- **Total**: O(n) × O(log n) = **O(n log n)**
- **Best/Average/Worst**: All **O(n log n)**
**Space Complexity**: **O(n)**
- Temporary array in merge function
- Recursion stack: O(log n)
- Total: O(n) for temporary array
**Stability**: ✅ YES (uses <= in merge, preserves order of equal elements)

### Why O(n log n)?

```
Division levels:
n → n/2, n/2 → n/4, n/4 → ... → 1
This is log₂(n) levels
Work per level:
Level 1: O(n) - merge n elements total
Level 2: O(n) - merge n elements total
Level 3: O(n) - merge n elements total
...
Level log n: O(n)
Total: O(n) × O(log n) = O(n log n)
```

---

## 📊 Merge Example (Detailed)

Let's merge `[27, 38, 43]` and `[3, 9]`:

```
Left:  27  38  43
       ↑
Right:  3   9
        ↑
Step 1: Compare 27 vs 3
        3 < 27, take 3
        Result: [3]
Step 2: Compare 27 vs 9
        9 < 27, take 9
        Result: [3, 9]
Step 3: Right exhausted, take remaining from left
        Result: [3, 9, 27, 38, 43] ✓
```

---

## 🔗 Comparison & Use Cases

### When to Use Each

|Algorithm|Use When|
|---|---|
|**Selection Sort**|Learning/teaching only|
|**Bubble Sort**|Data nearly sorted, space critical|
|**Insertion Sort**|Small arrays, nearly sorted data|
|**Merge Sort**|Need guaranteed O(n log n), stability matters|

### Trade-offs

```
Non-recursive sorts:
✓ O(1) space
✓ Simple implementation
✗ O(n²) time - too slow for large n
Merge Sort:
✓ O(n log n) guaranteed
✓ Stable sort
✗ O(n) extra space
✗ More complex recursion
```

---

## 🚨 Common Mistakes

|Mistake|Fix|
|---|---|
|Bubble sort: Loop j to n instead of i|Loop j < i to avoid out of bounds|
|Insertion: Comparing with wrong element|Use while(j > 0 && arr[j] < arr[j-1])|
|Merge sort: mid calculation|Use mid = (low + high) / 2|
|Merge: Forgetting remaining elements|Add while loops for left and right|
|Merge: Wrong index in copy back|Use arr[low + i] = temp[i]|

---

## 📝 Implementation Checklist

- [ ] Selection Sort: Find min, swap with i
- [ ] Bubble Sort: Adjacent compare, push max right
- [ ] Bubble Sort Optimized: Add didSwap flag
- [ ] Insertion Sort: Shift left, place correctly
- [ ] Recursive Bubble: n-1 recursion after one pass
- [ ] Recursive Insertion: Sort n-1, insert nth
- [ ] Merge Sort: Divide, merge, combine
- [ ] Merge function: Two pointers, handle remaining

---

## 🎯 Next Steps

After mastering these sorts:
1. Learn [[STL]] implementation — especially `sort()` and custom comparators
2. Move on to [[ARRAY easy part 1|Arrays (Step 3.1)]], where sorting shows up as a brute-force baseline for several problems

---

**Last Updated**: May 28, 2026
**Total Algorithms**: 7 (3 basic + 2 recursive + Merge)
**Complexity Range**: O(n) to O(n²) to O(n log n)
Master these and you'll be ready for any sorting interview question! 🚀

**Back to**: [[00_Master_Index|Master Index]]
