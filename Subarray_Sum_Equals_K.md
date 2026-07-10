---
tags: [prefixsum, hashing, arrays, interview]
topic: Count Subarrays with Sum Equal to K
step: "Step 3.2"
pattern: Prefix Sum + HashMap
difficulty: Medium
status: completed
date: 2026-06-18
---

# 🔢 Subarray Sum Equals K (Count, Not Longest)

## 📌 Quick Info

- **Problem**: Count how many subarrays sum to exactly K (array may contain negatives)
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Arrays Medium|Prefix Sum + HashMap]]
- **Key Concept**: Reverse-engineer what prefix you'd need to *remove* to leave exactly K
- **Frequency**: ⭐⭐⭐⭐⭐ (Very Common!)

**Related**: [[Arrays Medium|← Back to Index]]

> [!warning] Don't confuse this with "Longest Subarray with Sum K"
> [[ARRAY easy part 3#Problem 12 — Longest Subarray with Sum K|Problem 12 in ARRAY easy part 3]] asks for the **length** of the longest subarray summing to K, and has a two-pointer optimal solution **only when the array has no negatives**. This problem asks for the **count** of all subarrays summing to K, the array **can contain negatives**, and there is no two-pointer variant here — prefix sum + hashmap is the optimal approach for both versions, but they solve different questions. Keep them mentally separate.

---

## 🎯 Problem Statement

Given an array of integers (which may include negative numbers and zeros) and an integer `K`, find the **total number of contiguous subarrays** whose sum equals `K`.

**Examples**:
```
Input:  nums = [1, 2, 3, -3, 1], k = 3
Output: 4
Explanation: [1,2], [3], [1,2,3,-3], [2,3,-3,1] all sum to 3

Input:  nums = [1, 1, 1], k = 2
Output: 2
Explanation: [1,1] (indices 0-1), [1,1] (indices 1-2)
```

---

## 🧠 Core Intuition

### The Reverse-Engineering Trick

Let `prefixSum[i]` be the sum of everything from the start of the array up to index `i`.

If a subarray ending at index `i` sums to `K`, then:
```
prefixSum[i] - prefixSum[j] = K        (for some earlier index j)
   ⟺
prefixSum[j] = prefixSum[i] - K
```

So instead of asking *"is there a subarray ending here that sums to K?"*, you ask the equivalent, easier question: *"has some earlier prefix sum equalled `prefixSum[i] - K`?"* If a particular value occurred multiple times as a prefix sum, **each occurrence is a separate valid subarray** — which is exactly why you need to store *counts*, not just presence.

```
Running sum so far: 6
Looking for K = 3
Need to "remove" a prefix that summed to 6 - 3 = 3
→ However many times a prefix sum of 3 occurred earlier,
  that many subarrays ending here sum to exactly 3
```

### Why You Must Store `{0: 1}` From the Start

A subarray that starts right at index 0 doesn't have anything to "remove" — its required earlier prefix is 0 (the empty prefix). Without seeding the map with `prefixSum = 0` occurring once, you'd silently miss every valid subarray that starts at the very beginning of the array.

---

## 💡 How to Remember (Memory Hook)

### "What Prefix Would I Need to Remove?"

```
runningSum = 0
map = {0: 1}     ← the empty prefix, for subarrays starting at index 0
count = 0

for each number:
    runningSum += number
    need = runningSum - K
    count += map[need]        (if it exists, else 0)
    map[runningSum]++
```

---

## 🔍 Approach 1: Brute Force - O(n³)

### Algorithm

Generate every subarray and sum it from scratch.

```cpp
int subarraySum_Brute(vector<int>& nums, int k) {
    int n = nums.size();
    int count = 0;

    for(int i = 0; i < n; i++) {
        for(int j = i; j < n; j++) {
            int sum = 0;
            for(int idx = i; idx <= j; idx++) {
                sum += nums[idx];
            }
            if(sum == k) count++;
        }
    }
    return count;
}
```

### Complexity
- **Time**: O(n³)
- **Space**: O(1)

---

## 🔄 Approach 2: Better - O(n²)

### Algorithm

Eliminate the innermost loop by keeping a running sum as `j` extends, instead of resumming from scratch every time.

```cpp
int subarraySum_Better(vector<int>& nums, int k) {
    int n = nums.size();
    int count = 0;

    for(int i = 0; i < n; i++) {
        int sum = 0;
        for(int j = i; j < n; j++) {
            sum += nums[j];      // incrementally extend
            if(sum == k) count++;
        }
    }
    return count;
}
```

### Complexity
- **Time**: **O(n²)**
- **Space**: **O(1)**

---

## ⭐ Approach 3: Optimal - Prefix Sum + HashMap

### Algorithm

```cpp
int subarraySum_Optimal(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;   // empty prefix, for subarrays starting at index 0

    int sum = 0, count = 0;
    for(int num : nums) {
        sum += num;

        int need = sum - k;
        if(prefixCount.find(need) != prefixCount.end()) {
            count += prefixCount[need];
        }

        prefixCount[sum]++;
    }
    return count;
}
```

### Complexity
- **Time**: **O(n)** average (using `unordered_map`); O(n log n) with an ordered `map`
- **Space**: **O(n)** for the hashmap of prefix sums

---

## 🚶 Detailed Walkthrough

### Example Array
```
nums = [1, 2, 3, -3, 1], k = 3
Expected: 4
```

### Step-by-Step

```
Initial: prefixCount = {0: 1}, sum = 0, count = 0

num=1:
  sum = 0 + 1 = 1
  need = 1 - 3 = -2 → not in map → count stays 0
  prefixCount[1]++ → {0:1, 1:1}

num=2:
  sum = 1 + 2 = 3
  need = 3 - 3 = 0 → map[0] = 1 → count = 0 + 1 = 1
  prefixCount[3]++ → {0:1, 1:1, 3:1}

num=3:
  sum = 3 + 3 = 6
  need = 6 - 3 = 3 → map[3] = 1 → count = 1 + 1 = 2
  prefixCount[6]++ → {0:1, 1:1, 3:1, 6:1}

num=-3:
  sum = 6 + (-3) = 3
  need = 3 - 3 = 0 → map[0] = 1 → count = 2 + 1 = 3
  prefixCount[3]++ → {0:1, 1:1, 3:2, 6:1}

num=1:
  sum = 3 + 1 = 4
  need = 4 - 3 = 1 → map[1] = 1 → count = 3 + 1 = 4
  prefixCount[4]++ → {0:1, 1:1, 3:2, 4:1, 6:1}

Final: count = 4 ✓
```

### Verifying by Hand

```
All subarrays of [1, 2, 3, -3, 1] that sum to 3:
[1, 2]            → 3 ✓
[1, 2, 3, -3]     → 3 ✓
[2, 3, -3, 1]     → 3 ✓
[3]               → 3 ✓
Total: 4 ✓ matches!
```

---

## 🎯 Why `count += map[need]` and Not `count++`

If a particular prefix sum occurred **twice** earlier, that means there are **two different starting points** that would each produce a valid subarray ending at the current index. You have to add the full count, not just check existence — this is the detail people most often get wrong when adapting Two Sum's hashing pattern to this problem.

---

## 📊 Complexity Comparison

| Approach | Time | Space | Handles negatives? |
|---|---|---|---|
| Brute | O(n³) | O(1) | ✅ |
| Better | O(n²) | O(1) | ✅ |
| **Prefix Sum + HashMap (Optimal)** | **O(n)** | **O(n)** | ✅ |

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Forgetting to seed `map[0] = 1` | You'll silently miss subarrays starting at index 0 |
| Using `count++` instead of `count += map[need]` | Undercounts when a prefix sum repeats |
| Trying to use two pointers because of [[ARRAY easy part 3#Problem 12 — Longest Subarray with Sum K\|the similarly-named problem]] | Two pointers only works for the *longest-length, non-negative* variant — not this one |
| Updating the map before computing `need` | Order matters: check first, then insert the *current* sum |

---

## 🔗 Related Problems

- [[ARRAY easy part 3#Problem 12 — Longest Subarray with Sum K|Longest Subarray with Sum K]] (sibling problem — different question, same prefix-sum family)
- [[Two_Sum_Complete|Two Sum]] (same "store and look up the complement" hashing pattern)
- [[Max_Subarray_Sum|Max Subarray Sum]] (different — tracks running sum without a hashmap)
- [[STL#Map - Key-Value Pairs|map / unordered_map reference]]

---

## 🧠 Memorization Checklist

- [ ] Understand the `prefixSum[j] = prefixSum[i] - K` reverse-engineering step
- [ ] Know why `map[0] = 1` must be seeded upfront
- [ ] Can explain why you add the count, not just check existence
- [ ] Can clearly distinguish this from the "longest subarray" sibling problem
- [ ] Trace through the walkthrough and verify by hand

---

**Back to**: [[Arrays Medium|Advanced Problems Index]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: June 18, 2026
