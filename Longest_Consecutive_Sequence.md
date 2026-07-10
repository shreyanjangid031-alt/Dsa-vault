---
tags: [hashing, sorting, sets, arrays, interview]
topic: Longest Consecutive Sequence
step: "Step 3.2"
pattern: Hashing / Sorting
difficulty: Medium
status: completed
date: 2026-06-18
---

# 🔗 Longest Consecutive Sequence

## 📌 Quick Info

- **Problem**: Find the length of the longest run of consecutive integers in an array
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Arrays Medium|Hashing / Sorting]]
- **Key Concept**: Only start counting from the *beginning* of a sequence
- **Frequency**: ⭐⭐⭐⭐ (Common)

**Related**: [[Arrays Medium|← Back to Index]]

---

## 🎯 Problem Statement

Given an unsorted array of integers, find the length of the longest sequence of **consecutive integers** (the numbers don't need to be adjacent in the original array — you're free to "rearrange" them mentally).

**Examples**:
```
Input:  [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The consecutive sequence is [1, 2, 3, 4] → length 4

Input:  [1, 2, 0, 1]
Output: 3
Explanation: [0, 1, 2] → length 3 (the duplicate 1 doesn't extend it further)
```

---

## 🧠 Core Intuition

### The Naive Idea

For every element `x`, look for `x+1`, then `x+2`, and so on, for as long as they exist in the array — and track the best run. This works, but doing a linear search for each lookup makes it slow.

### The Key Insight: Don't Start in the Middle

If you sort (or bucket) the numbers, consecutive runs naturally sit together:
```
[100, 4, 200, 1, 3, 2] → sorted → [1, 2, 3, 4, 100, 200]
                                    └──────────┘  
                                    one run of length 4
```

The trick that makes this efficient: **only ever start counting a sequence from its true beginning.** If `x` is part of a sequence, but `x - 1` is *also* in the array, then `x` is NOT the start — counting from `x` again is wasted work you'll repeat when you reach the actual start.

```
Sequence: [1, 2, 3, 4]
At 2: is 1 present? YES → 2 is NOT a starting point, skip
At 1: is 0 present? NO  → 1 IS a starting point, count forward: 1,2,3,4 → length 4
```

### Mental Model

```
"Before I count a run starting at x, I check one thing:
 does x - 1 exist?
   - If yes: someone else already covers this run, walking from x would be duplicate work
   - If no: x is a true starting point, walk forward (x+1, x+2, ...) and measure"
```

---

## 💡 How to Remember (Memory Hook)

### "Start Only From Sequence Beginnings"

```
for each number x:
    if (x - 1) does NOT exist:
        walk forward from x, counting, while (x+1) exists
        track the longest walk
```

This single check (`x - 1` absent) is what turns an O(n²) "try starting everywhere" into an O(n) "try starting only at real beginnings."

---

## 🔍 Approach 1: Brute Force - O(n²)

### Algorithm

For every element, linearly search for the next consecutive value, extending as far as possible.

```cpp
bool linearSearch(vector<int>& nums, int target) {
    for(int num : nums) if(num == target) return true;
    return false;
}

int longestConsecutive_Brute(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;

    int longest = 1;
    for(int i = 0; i < n; i++) {
        int x = nums[i];
        int count = 1;
        while(linearSearch(nums, x + 1)) {
            x = x + 1;
            count++;
        }
        longest = max(longest, count);
    }
    return longest;
}
```

### Complexity
- **Time**: O(n²) — for each of n elements, the inner linear search can run up to n times
- **Space**: O(1)

---

## 🔄 Approach 2: Better - O(n log n)

### Algorithm

Sort the array first — this clubs consecutive elements together — then do a single pass tracking the running streak.

```cpp
int longestConsecutive_Better(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;

    sort(nums.begin(), nums.end());

    int longest = 1;
    int lastSmaller = INT_MIN;
    int count = 0;

    for(int i = 0; i < n; i++) {
        if(nums[i] - 1 == lastSmaller) {
            // extends the current streak
            count++;
            lastSmaller = nums[i];
        }
        else if(nums[i] != lastSmaller) {
            // different number, not a continuation — start fresh
            count = 1;
            lastSmaller = nums[i];
        }
        // if nums[i] == lastSmaller: it's a duplicate, do nothing

        longest = max(longest, count);
    }
    return longest;
}
```

### Why It Works

```
"Whatever streak I'm on, the next number must be exactly
 one more than the last number I accepted into the streak.
 If it's a duplicate of that last number, ignore it.
 If it's anything else, the streak breaks — restart from here."
```

### Complexity
- **Time**: **O(n log n)** — dominated by the sort
- **Space**: **O(1)** extra — but this **sorts (mutates) the original array**, which an interviewer may not want

---

## 🚶 Detailed Walkthrough — Better Approach

### Example Array (with a duplicate)
```
Input:  [100, 4, 200, 1, 3, 2, 1]
Sorted: [1, 1, 2, 3, 4, 100, 200]
Expected: 4
```

### Step-by-Step

```
Initial: lastSmaller = INT_MIN, count = 0, longest = 1

i=0, num=1:
  1 - 1 == INT_MIN? No.  1 == INT_MIN? No.
  → New streak: count=1, lastSmaller=1
  longest = max(1, 1) = 1

i=1, num=1:
  1 == lastSmaller(1)? Yes → duplicate, do nothing
  longest stays 1

i=2, num=2:
  2 - 1 == 1? Yes → extend: count=2, lastSmaller=2
  longest = max(1, 2) = 2

i=3, num=3:
  3 - 1 == 2? Yes → extend: count=3, lastSmaller=3
  longest = max(2, 3) = 3

i=4, num=4:
  4 - 1 == 3? Yes → extend: count=4, lastSmaller=4
  longest = max(3, 4) = 4 ← ANSWER!

i=5, num=100:
  100 - 1 == 4? No.  100 == 4? No.
  → New streak: count=1, lastSmaller=100
  longest stays 4

i=6, num=200:
  200 - 1 == 100? No.  200 == 100? No.
  → New streak: count=1, lastSmaller=200
  longest stays 4

Final: longest = 4 ✓
```

---

## ⭐ Approach 3: Optimal - O(n)

### The Trick: Hash Set + "Only Start at Beginnings"

```cpp
int longestConsecutive_Optimal(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;

    unordered_set<int> st;
    for(int num : nums) st.insert(num);

    int longest = 1;

    for(int num : st) {
        // Only count forward from a TRUE starting point
        if(st.find(num - 1) == st.end()) {
            int count = 1;
            int x = num;
            while(st.find(x + 1) != st.end()) {
                x++;
                count++;
            }
            longest = max(longest, count);
        }
    }
    return longest;
}
```

### Why This Is O(n) and Not O(n²)

It looks like the `while` loop inside the `for` loop should give O(n²), but it doesn't — because the inner loop **only ever runs for true starting points**. Across the whole array, the total number of steps taken by all the inner loops combined can never exceed n (every element gets "walked over" at most once, by whichever sequence it truly belongs to).

```
Set: {100, 4, 200, 1, 3, 2}

100 → is 99 in set? No → START. Walk: 100(✓) → 101? No. Length 1.
  4 → is 3 in set? Yes → skip (not a start)
200 → is 199 in set? No → START. Walk: 200(✓) → 201? No. Length 1.
  1 → is 0 in set? No → START. Walk: 1,2,3,4(all✓) → 5? No. Length 4. ← longest!
  3 → is 2 in set? Yes → skip
  2 → is 1 in set? Yes → skip

Total "walk steps" across everything: 1 + 1 + 4 = 6, not 6×6=36
```

### Complexity
- **Time**: **O(n)** on average (amortized — each element visited a constant number of times)
- **Space**: **O(n)** for the hash set

---

## 📊 Complexity Comparison

| Approach | Time | Space | Mutates input? |
|---|---|---|---|
| Brute | O(n²) | O(1) | No |
| Better | O(n log n) | O(1) extra | **Yes** (sorts in place) |
| **Optimal** | **O(n)** | **O(n)** | No |

---

## 🎯 Edge Cases

| Case | Input | Output | Explanation |
|---|---|---|---|
| Empty array | [] | 0 | No elements at all |
| Single element | [5] | 1 | One element is its own streak of 1 |
| All duplicates | [3, 3, 3] | 1 | Duplicates collapse to a single value |
| All consecutive | [5, 4, 3, 2, 1] | 5 | Order in the input doesn't matter |
| Disjoint pairs | [1, 3, 5, 7] | 1 | No two are actually consecutive |

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Starting the walk from *every* element | Only start when `x - 1` is absent — this is the entire optimization |
| Forgetting duplicates in the Better approach | Explicitly check `nums[i] == lastSmaller` and skip |
| Using a `vector`/linear search instead of a hash set | Use `unordered_set` for O(1) average lookups |
| Assuming sorted output order matters | The problem only asks for the *length*, not the actual sequence |

---

## 🔗 Related Problems

- [[Two_Sum_Complete|Two Sum]] (same hashing mindset — "have I seen this before?")
- [[Majority_Element|Majority Element]] (single-pass tracking)
- [[ARRAY easy part 1#Problem 4: Remove Duplicates from Sorted Array|Remove Duplicates]] (sorting-based duplicate handling)
- [[STL#Set - Unique & Sorted|unordered_set reference]]

---

## 🧠 Memorization Checklist

- [ ] Understand why sorting "clubs" consecutive runs together
- [ ] Know the "only start at beginnings" trick cold
- [ ] Can explain why the optimal approach is O(n) despite the nested-looking loops
- [ ] Trace through the walkthrough yourself
- [ ] Code all three approaches without reference

---

**Back to**: [[Arrays Medium|Advanced Problems Index]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: June 18, 2026
