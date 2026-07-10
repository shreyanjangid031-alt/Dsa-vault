---
tags: [dsa, arrays, striver, a2z, easy, hashing, two-pointer, xor]
topic: Arrays Easy Problems — Part 3
step: "Step 3.1"
difficulty: Easy
status: completed
date: 2026-05-22
reorganized: 2026-06-18
prerequisite: "[[ARRAY easy part 1]] and [[ARRAY easy part 2]] (Step 3.1)"
---

# 📦 Arrays — Easy Problems Part 3 (Step 3.1)

> **Course**: Striver's A2Z DSA Course
> **Problems Covered**: Maximum Consecutive Ones · Single Number (XOR) · Longest Subarray with Sum K

**Up**: [[00_Master_Index|← Master Index]]
**Prev**: [[ARRAY easy part 1|← Part 1]] · [[ARRAY easy part 2|← Part 2]]

---

## Problem 10 — Maximum Consecutive Ones

### Problem Statement

Given a binary array (containing only 0s and 1s), return the count of maximum consecutive 1s. `[1, 1, 0, 1, 1, 1, 0, 1, 1]` → `3`

> [!note] No Brute → Better → Optimal needed
> The optimal solution is immediately obvious here — one single pass.

### 🟢 Optimal — Single Pass with Counter

**Idea**: Keep a `counter` for current streak of 1s and a `max` to track best streak. Reset counter to 0 whenever you hit a 0.

```
max = 0
counter = 0

for i = 0 to n-1:
    if arr[i] == 1:
        counter++
        max = max(max, counter)
    else:
        counter = 0       ← reset on break

return max
```

#### Dry Run: `[1, 1, 0, 1, 1, 1, 0, 1, 1]`

|i|arr[i]|counter|max|
|---|---|---|---|
|0|1|1|1|
|1|1|2|2|
|2|0|0|2|
|3|1|1|2|
|4|1|2|2|
|5|1|3|**3**|
|6|0|0|3|
|7|1|1|3|
|8|1|2|3|

```cpp
int maxConsecutiveOnes(vector<int>& nums) {
    int maxCount = 0, counter = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] == 1) {
            counter++;
            maxCount = max(maxCount, counter);
        } else {
            counter = 0;
        }
    }
    return maxCount;
}
```

||Complexity|
|---|---|
|Time|**O(n)**|
|Space|**O(1)**|

> [!tip] Key Insight
> 0 = break in consecutiveness → always reset counter to 0. Update max INSIDE the if block (only when incrementing), not after reset.

---

## Problem 11 — Single Number (Find the element that appears once)

### Problem Statement

Given an array where every number appears **exactly twice** except one number which appears **once**, find that number. `[4, 3, 1, 4, 3, 1, 2]` → `2`

---

### 🔴 Brute Force — Linear Search for each element

**Idea**: For every element, count its occurrences with a linear search. If count == 1, that's the answer.

```
for i = 0 to n-1:
    count = 0
    for j = 0 to n-1:
        if arr[j] == arr[i]:
            count++
    if count == 1:
        return arr[i]
```

||Complexity|
|---|---|
|Time|**O(n²)** — nested loops|
|Space|**O(1)**|

---

### 🟡 Better — Hashing

Two variants depending on the input constraints:

#### Variant A — Hash Array (small, non-negative integers)

**Idea**: Create a hash array of size `max_element + 1`. Count frequencies. Return the element with frequency 1.

```cpp
// Step 1: find max element
int maxi = *max_element(arr, arr + n);

// Step 2: create hash array
int hash[maxi + 1] = {0};
for (int i = 0; i < n; i++)
    hash[arr[i]]++;

// Step 3: find element with frequency 1
for (int i = 0; i <= maxi; i++)
    if (hash[i] == 1)
        return i;
```

> [!warning] Limitation of Hash Array
> Fails when array contains: **negatives**, or **very large numbers** (like 10⁹ or 10¹²) — can't create that large an array.

#### Variant B — Hash Map (general case)

**Idea**: Use a `map` or `unordered_map` to count frequencies. Return key with value == 1.

```cpp
unordered_map<int, int> freq;
for (int i = 0; i < n; i++)
    freq[arr[i]]++;

for (auto it : freq)
    if (it.second == 1)
        return it.first;
```

|Map Type|Time|Space|Note|
|---|---|---|---|
|`map` (ordered)|O(n log n)|O(n)|No collision risk|
|`unordered_map`|O(n) avg, O(n²) worst|O(n)|Collision risk on adversarial input|

> [!note] Map stores n/2 + 1 unique keys
> Since every number appears twice (except one), the map has `n/2 + 1` entries, not `n`. Iteration is O(n/2 + 1) ≈ O(n).

---

### 🟢 Optimal — XOR

> [!tip] XOR Properties to Remember
> - `a XOR a = 0` (same numbers cancel)
> - `a XOR 0 = a` (XOR with 0 gives same number)
> - XOR is commutative and associative

**Idea**: XOR all elements. Every number that appears twice cancels to 0. The single number is left over.

```
xorResult = 0
for i = 0 to n-1:
    xorResult = xorResult XOR arr[i]
return xorResult
```

**Why it works**: `1⊕1⊕2⊕3⊕3⊕4⊕4 = (1⊕1)⊕(3⊕3)⊕(4⊕4)⊕2 = 0⊕0⊕0⊕2 = 2`

```cpp
int singleNumber(vector<int>& arr) {
    int xorVal = 0;
    for (int x : arr)
        xorVal ^= x;
    return xorVal;
}
```

||Complexity|
|---|---|
|Time|**O(n)**|
|Space|**O(1)**|

---

### 📊 Comparison Table

|Approach|Time|Space|Works for negatives?|Works for large numbers?|
|---|---|---|---|---|
|Brute (linear search)|O(n²)|O(1)|✅|✅|
|Hash Array|O(n)|O(max)|❌|❌|
|Hash Map|O(n log n) / O(n)|O(n)|✅|✅|
|**XOR**|**O(n)**|**O(1)**|✅|✅|

---

## Problem 12 — Longest Subarray with Sum K

### Problem Statement

Find the length of the longest subarray whose elements sum to K.

> [!note] Sub-array definition
> A **subarray** is a **contiguous** part of the array. `[1,2,3]` from `[4,1,2,3,5]` is a subarray. Picking non-adjacent elements is a **subsequence**, NOT a subarray.

Two versions:
- **Version A**: Array has only **positives** (and possibly zeros)
- **Version B**: Array has **positives, negatives, and zeros**

---

### 🔴 Brute Force — Generate All Subarrays

**Idea**: Fix start `i`, extend end `j`, compute sum on the fly. If sum == K, update max length.

```
maxLen = 0

for i = 0 to n-1:
    sum = 0
    for j = i to n-1:
        sum += arr[j]
        if sum == K:
            maxLen = max(maxLen, j - i + 1)

return maxLen
```

> [!note] Optimized from O(n³) to O(n²)
> The naive approach uses a 3rd inner loop to sum arr[i..j] each time — that's O(n³). By keeping a running sum as j moves, we cut it to O(n²).

||Complexity|
|---|---|
|Time|**O(n²)**|
|Space|**O(1)**|

---

### 🟡 Better — Prefix Sum + HashMap (works for ALL inputs)

**Core Idea — Reverse Mathematics**:
- Let prefix sum till index `i` = `X`
- If there was a prefix sum of `X - K` at some earlier index `prev`
- Then subarray from `prev+1` to `i` has sum = `X - (X-K) = K`

```
prefixSum = 0
maxLen = 0
map = {0: -1}    ← handles case when subarray starts from index 0

for i = 0 to n-1:
    prefixSum += arr[i]

    if prefixSum == K:                   ← entire prefix is the subarray
        maxLen = max(maxLen, i + 1)

    remainder = prefixSum - K
    if remainder in map:
        maxLen = max(maxLen, i - map[remainder])

    if prefixSum NOT in map:             ← only store FIRST occurrence
        map[prefixSum] = i               ← critical for longest subarray
```

#### Dry Run: `[1, 2, 3, 1, 1, 1, 3]`, K = 3

|i|arr[i]|prefixSum|sum==K?|remainder|in map?|maxLen|map|
|---|---|---|---|---|---|---|---|
|-|-|0|-|-|-|0|{0:-1}|
|0|1|1|No|-2|No|0|{0:-1, 1:0}|
|1|2|3|**Yes**|0|Yes→-1|max(0,2)=**2**|{0:-1,1:0,3:1}|
|2|3|6|No|3|Yes→1|max(2,2-1)=2|{0:-1,1:0,3:1,6:2}|
|3|1|7|No|4|No|2|+{7:3}|
|4|1|8|No|5|No|2|+{8:4}|
|5|1|9|No|6|Yes→2|max(2,5-2)=**3**|+{9:5}|
|6|3|12|No|9|Yes→5|max(3,6-5)=3|+{12:6}|

**Answer: 3** ✅

```cpp
int longestSubarrayWithSumK(vector<long long>& a, long long K) {
    map<long long, int> preMap;
    long long sum = 0;
    int maxLen = 0;
    preMap[0] = -1;   // base case

    for (int i = 0; i < a.size(); i++) {
        sum += a[i];

        if (sum == K)
            maxLen = max(maxLen, i + 1);

        long long rem = sum - K;
        if (preMap.find(rem) != preMap.end())
            maxLen = max(maxLen, i - preMap[rem]);

        if (preMap.find(sum) == preMap.end())
            preMap[sum] = i;   // store FIRST occurrence only
    }
    return maxLen;
}
```

> [!warning] Critical Edge Case — Why store FIRST occurrence only?
> Array: `[2, 0, 0, 3]`, K = 3
>
> PrefixSum = 2 appears at index 0, 1, and 2 (because zeros don't change the sum). If you update the map to the latest index (2), then when prefixSum = 5 at index 3, remainder = 2, you'd find index 2 → length = 1. But the real longest subarray is `[0, 0, 3]` (indices 1–3) → length 3, found using index 0.
>
> **Always store the FIRST (leftmost) occurrence to maximize subarray length.**

|Map Type|Time|Space|
|---|---|---|
|`map` (ordered)|O(n log n)|O(n)|
|`unordered_map`|O(n) avg|O(n)|

> [!tip] This is also the OPTIMAL for arrays with negatives + zeros + positives
> The two-pointer approach below fails for negatives/zeros. HashMap is the best you can do in that case.

---

### 🟢 Optimal — Two Pointer / Sliding Window (Positives & Zeros ONLY)

> [!warning] Only works when array has NO negatives
> Adding more elements always increases (or keeps same) the sum → shrinking from left always decreases it. This monotonic property is required for two pointer to work.

**Idea**: Expand right pointer to add elements. When sum exceeds K, shrink from left until sum ≤ K. Update maxLen whenever sum == K.

```
left = 0, right = 0
sum = arr[0]
maxLen = 0

while right < n:
    while sum > K and left <= right:
        sum -= arr[left]
        left++

    if sum == K:
        maxLen = max(maxLen, right - left + 1)

    right++
    if right < n:
        sum += arr[right]

return maxLen
```

#### Dry Run: `[1, 2, 3, 1, 1, 1, 3]`, K = 6

```
[1] sum=1 < 6 → expand
[1,2] sum=3 < 6 → expand
[1,2,3] sum=6 == 6 → maxLen=3, expand
[1,2,3,1] sum=7 > 6 → shrink: remove 1 → [2,3,1] sum=6 == 6 → maxLen=3
[2,3,1,1] sum=7 > 6 → shrink: remove 2 → [3,1,1] sum=5, expand
[3,1,1,1] sum=6 == 6 → maxLen=4 ✅
[3,1,1,1,3] sum=9 > 6 → shrink: remove 3,1,1 → [1,3] sum=4, expand
Done. maxLen = 4
```

```cpp
int longestSubarrayPositives(vector<int>& a, long long K) {
    long long sum = a[0];
    int left = 0, right = 0, maxLen = 0;
    int n = a.size();

    while (right < n) {
        while (sum > K && left <= right) {
            sum -= a[left];
            left++;
        }
        if (sum == K)
            maxLen = max(maxLen, right - left + 1);
        right++;
        if (right < n) sum += a[right];
    }
    return maxLen;
}
```

||Complexity|
|---|---|
|Time|**O(2n)** — right moves n times, left moves at most n times total|
|Space|**O(1)**|

> [!note] Why O(2n) not O(n²)?
> The inner while loop doesn't reset — `left` only moves forward. Total moves of `left` across ALL outer iterations = at most n. So: n (right) + n (left) = 2n.

---

### 📊 Full Comparison — Problem 12

|Approach|Time|Space|Works for negatives?|Works for zeros?|
|---|---|---|---|---|
|Brute|O(n²)|O(1)|✅|✅|
|HashMap (Better)|O(n log n)|O(n)|✅|✅|
|**Two Pointer (Optimal)**|**O(2n)**|**O(1)**|❌|✅|

> [!tip] Interview Strategy for Problem 12
> 1. Give brute force O(n²)
> 2. Optimize to HashMap O(n log n) — mention edge case of zeros and first-occurrence-only
> 3. Mention: "For positives+zeros only, I can further optimize to O(2n) O(1) using two pointer"
> 4. This shows you know ALL three approaches and the trade-offs

---

## 📊 Step 3.1 Summary (This Note)

|#|Problem|Key Technique|Time|Space|
|---|---|---|---|---|
|10|Max Consecutive Ones|Counter + reset|O(n)|O(1)|
|11|Single Number|XOR|O(n)|O(1)|
|12|Longest Subarray Sum K|Two Pointer / HashMap|O(n)–O(n log n)|O(1)–O(n)|

> [!note] Full Step 3.1 picture
> Combined with [[ARRAY easy part 1]] (Problems 1–4: Largest Element, Second Largest, Check Sorted, Remove Duplicates) and [[ARRAY easy part 2]] (Problems 5–9: Left Rotate by One, Left Rotate by D, Move Zeroes, Linear Search, Union, Intersection), Step 3.1 covers all 12 of the foundational easy array problems before moving to [[Arrays Medium|Step 3.2]].

---

## 🔗 Related Notes

- [[ARRAY easy part 1]] — Step 3.1 (Problems 1–4)
- [[ARRAY easy part 2]] — Step 3.1 (Problems 5–9)
- [[Arrays Medium]] — Step 3.2 (next)
- [[Sorting]] — Step 2.1/2.2

**Back to**: [[00_Master_Index|Master Index]]
