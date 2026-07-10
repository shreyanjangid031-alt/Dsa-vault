---
tags: [twosum, hashing, twopointers, complement, arrays, interview]
topic: Two Sum — Complete Guide
step: "Step 3.2"
pattern: Hashing/Two Pointers
difficulty: Easy (Variety 1), Medium (Variety 2)
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🔵 Two Sum - Complete Guide

## 📌 Quick Info

- **Problem**: Find two elements that sum to target
- **Difficulty**: Easy (variety 1), Medium (variety 2) ⭐⭐
- **Pattern**: [[Arrays Medium|Hashing/Two Pointers]]
- **Key Algorithms**: Hash Map, Two Pointer
- **Frequency**: ⭐⭐⭐⭐⭐ (Most Common!)

**Related**: [[Arrays Medium|← Back to Index]]

---

## 🎯 Problem Variations

### Variety 1: YES/NO Question
```
Input: nums = [2, 5, 6, 8, 11], target = 14
Output: true (because 6 + 8 = 14)

Input: nums = [2, 5, 6, 8, 11], target = 15
Output: false (no pair sums to 15)
```

### Variety 2: Return Indices
```
Input: nums = [2, 5, 6, 8, 11], target = 14
Output: [2, 3] (nums[2]=6, nums[3]=8, 6+8=14)

Input: nums = [2, 5, 6, 8, 11], target = 15
Output: [] (no pair found)
```

---

## 🧠 Core Intuition

### The Complement Principle

**Central Idea**: For each element, ask "What do I need to reach the target?"

```
Target = 14
See element 8?
  → I need: 14 - 8 = 6
  → Have I seen 6 before?
  → If YES: Found the pair!
```

### Why This Works

**Instead of checking all pairs** (O(n²)):
```
❌ For each num1, check all other num2s
   [2,5,6,8,11] - Check 2 with 5, 6, 8, 11
                - Check 5 with 2, 6, 8, 11
                - etc. → O(n²)
```

**Use complement arithmetic** (O(n)):
```
✅ For each num:
   Calculate complement = target - num
   Check: "Have I seen this complement?"
   If yes: FOUND! → O(1) lookup
```

---

## 💡 How to Remember (Memory Hook)

### "Complement First, Element Second"

**The Mental Mantra**:
```
Before adding this element to seen set:
  1. Ask: "Do I have my complement?"
  2. If yes: Return answer
  3. If no: "Remember me for future"
```

### Why This Order?

Think about it:
```
Array: [2, 5, 6, 8, 11], target = 14

i=0, num=2:
  complement = 14 - 2 = 12
  seen = {}, have 12? No
  Add 2: seen = {2}

i=1, num=5:
  complement = 14 - 5 = 9
  seen = {2}, have 9? No
  Add 5: seen = {2, 5}

i=2, num=6:
  complement = 14 - 6 = 8
  seen = {2, 5}, have 8? No
  Add 6: seen = {2, 5, 6}

i=3, num=8:
  complement = 14 - 8 = 6
  seen = {2, 5, 6}, have 6? YES! ✓
  Return [index_of_6, 3]
```

**Key**: We find 6 before we see 6 as current element!

---

## 🔍 Approach 1: Brute Force - O(n²)

### Algorithm

Check all pairs.

```cpp
// Variety 1: YES/NO
bool twoSum_Brute(vector<int>& nums, int target) {
    int n = nums.size();
    
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            if(nums[i] + nums[j] == target) {
                return true;
            }
        }
    }
    return false;
}

// Variety 2: Return indices
vector<int> twoSum_Brute2(vector<int>& nums, int target) {
    int n = nums.size();
    
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            if(nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}
```

### Complexity
- **Time**: O(n²)
- **Space**: O(1)

---

## ⭐ Approach 2: Hash Map - OPTIMAL for Variety 2

### The Trick

Store each element in a map as you go, checking for complement first.

```cpp
// Variety 1: YES/NO
bool twoSum_Hash1(vector<int>& nums, int target) {
    unordered_set<int> seen;
    
    for(int num : nums) {
        int complement = target - num;
        
        if(seen.find(complement) != seen.end()) {
            return true;  // Found!
        }
        
        seen.insert(num);  // Remember this number
    }
    
    return false;  // Not found
}

// Variety 2: Return indices
vector<int> twoSum_Hash2(vector<int>& nums, int target) {
    unordered_map<int, int> seen;  // value → index
    
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if(seen.find(complement) != seen.end()) {
            return {seen[complement], i};  // Found!
        }
        
        seen[nums[i]] = i;  // Remember with index
    }
    
    return {};  // Not found
}
```

### Why unordered_set vs unordered_map?

```
Variety 1 (YES/NO):
  Only care: "Have I seen this number?"
  Use: unordered_set<int>
  
Variety 2 (Indices):
  Need: "Which index had this number?"
  Use: unordered_map<int, int>
```

### Complexity
- **Time**: **O(n)** - single pass with O(1) lookup
- **Space**: **O(n)** - hash storage

---

## 🔄 Approach 3: Two Pointer (Sorted) - For Variety 1 Only

### Algorithm

Sort array, then use two pointers.

```cpp
bool twoSum_TwoPointer(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int sum = nums[left] + nums[right];
        
        if(sum == target) {
            return true;
        }
        else if(sum < target) {
            left++;      // Need larger sum
        }
        else {
            right--;     // Need smaller sum
        }
    }
    
    return false;
}
```

### Why This Works

```
Sorted array: [2, 5, 6, 8, 11], target = 14

left=0(2)    right=4(11)  sum=13 (< 14) → left++
left=1(5)    right=4(11)  sum=16 (> 14) → right--
left=1(5)    right=3(8)   sum=13 (< 14) → left++
left=2(6)    right=3(8)   sum=14 (==14) → FOUND! ✓
```

### Complexity
- **Time**: O(n log n) for sort + O(n) for search = **O(n log n)**
- **Space**: **O(1)** if we can modify, O(n) for sorting space

---

## 🚶 Detailed Walkthrough - Hash Map Variety 2

### Example
```
nums = [2, 5, 6, 8, 11]
target = 14
Expected: [2, 3]
```

### Step-by-Step

```
Initial: seen = {}, complement logic

i=0, nums[0]=2:
  complement = 14 - 2 = 12
  Is 12 in seen? {}
  No, not found
  Add 2: seen = {2: 0}

i=1, nums[1]=5:
  complement = 14 - 5 = 9
  Is 9 in seen? {2: 0}
  No, not found
  Add 5: seen = {2: 0, 5: 1}

i=2, nums[2]=6:
  complement = 14 - 6 = 8
  Is 8 in seen? {2: 0, 5: 1, 6: 2}
  No, not found
  Add 6: seen = {2: 0, 5: 1, 6: 2}

i=3, nums[3]=8:
  complement = 14 - 8 = 6
  Is 6 in seen? {2: 0, 5: 1, 6: 2}
  YES! Found at index 2
  Return [2, 3] ✓
```

---

## 🧪 Code Implementation

```cpp
class Solution {
public:
    // Variety 1: Return indices (most common)
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;  // value → index
        
        for(int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            // Check if complement exists
            if(seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            
            // Add current number for future lookups
            seen[nums[i]] = i;
        }
        
        return {};  // No pair found
    }
};
```

---

## 🎯 When to Use Each Approach

| Approach | Time | Space | Variety 1 | Variety 2 | Interview |
|---|---|---|---|---|---|
| Brute | O(n²) | O(1) | ✓ | ✓ | Baseline |
| Hash | O(n) | O(n) | ✓ | ✓ | **Best** |
| Two Pointer | O(n log n) | O(1) | ✓ | ❌ | When space matters |

---

## 🔗 Related Problems

- [[Majority_Element|Majority Element]] (Single element focus)
- [[Sort_0_1_2|Sort 0-1-2]] (Three-pointer technique)
- [[Max_Subarray_Sum|Max Subarray Sum]] (Prefix tracking)

---

## 💪 Practice Variations

1. **Three Sum**: Find three elements that sum to target
   - Use Two Sum as subroutine

2. **Four Sum**: Find four elements that sum to target
   - Use Two Sum inside nested loop

3. **Pair with Given Difference**: Find pair with specific difference
   - Same hash approach, `complement = num ± diff`

4. **Pair with Given Product**: Find pair with target product
   - Similar logic: `complement = target / num`

5. **All Pairs**: Return all pairs, not just one
   - Collect all matches instead of returning first

---

## 🧠 Memorization Checklist

- [ ] Understand complement concept
- [ ] Know why we check BEFORE adding
- [ ] Memorize: "Complement first, element second"
- [ ] Trace through example yourself
- [ ] Code without reference
- [ ] Distinguish variety 1 vs variety 2
- [ ] Can explain all three approaches

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Adding element BEFORE checking complement | Check first, add after! |
| Using set when you need indices | Use map instead! |
| Same element twice (num+num=target) | Check i != j or use different indices |
| Forgot to return empty vector if not found | Return {} at end |

---

## 📊 Quick Reference

```
VARIETY 1 (YES/NO):
- Use unordered_set
- For each num, check if (target - num) exists
- Return true if found, false at end

VARIETY 2 (Indices):
- Use unordered_map
- Store value → index
- Return {map[complement], i} when found

TWO POINTER (Variety 1 only):
- Sort first
- left at start, right at end
- If sum < target: left++
- If sum > target: right--
```

---

**Back to**: [[Arrays Medium|Advanced Problems Index]]
**Related**: [[Two_Sum_Complete#Core Intuition|Intuition Explained]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
