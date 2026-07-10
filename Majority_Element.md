---
tags: [mooresvoting, greedy, voting, arrays, interview]
topic: Majority Element — Moore's Voting Algorithm
step: "Step 3.2"
pattern: Greedy Approach
difficulty: Medium
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 🔴 Majority Element - Moore's Voting Algorithm

## 📌 Quick Info

- **Problem**: Find element appearing **> n/2** times
- **Difficulty**: Medium ⭐⭐⭐
- **Pattern**: [[Arrays Medium|Greedy Approach]]
- **Key Algorithm**: Moore's Voting
- **Frequency**: ⭐⭐⭐⭐ (Very Common)

**Related**: [[Arrays Medium|← Back to Index]]

---

## 🎯 Problem Statement

Given an array of size `n`, find the element that appears **more than n/2 times**.

**Examples**:
```
Array: [3, 2, 3, 2, 3, 2, 3]  (n=7)
More than 3.5 times → Answer: 3 (appears 4 times)

Array: [2, 2, 1, 1, 1, 2, 2]  (n=7)
More than 3.5 times → Answer: 2 (appears 4 times)

Array: [2, 5, 6, 8, 11]  (n=5)
More than 2.5 times → No element appears that many times
```

---

## 🧠 Core Intuition

### The Mental Model: Voting Game

Imagine each element is a "voter" trying to elect itself as majority.

**Key Insight**: 
- If an element appears **more than n/2 times**
- It appears more than all other elements **combined**
- So no matter how many oppose it, it can't be fully defeated

**Visual**:
```
Array: [7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 5, 5, 5, 5]
Total: 16 elements
7 appears: 7 times
5 appears: 9 times  ← MAJORITY (> 8)

Even if all 7s (7 votes) attack all 5s (9 votes):
5 cancels 5 of its votes with 5 of 7's votes
5 has 4 votes left, 7 has 2 left
5 wins!
```

### Why Moore's Voting Works

```
BEFORE: [pair of 7s] [pair of 5s] [1] [5s continue...]
         7 7         5 5         1   5 5 5 5 5

CANCELLATION PRINCIPLE:
- When we see different elements, they cancel each other
- 7 + 5 = cancel (7 loses 1 vote, 5 loses 1 vote)
- But 5 appears MORE than 7
- So after all cancellations, 5 survives with remaining votes
```

### The Algorithm Intuition

```
count = 0 (votes for current candidate)
element = undefined

For each number:
  If count == 0:
    Start new candidate (they have 1 vote)
  Else if number matches candidate:
    Candidate gets a vote (count++)
  Else:
    Candidate loses a vote (count--)

At end: Survivor is the majority!
```

---

## 💡 How to Remember (Memory Hook)

### "The Voting Counter That Resets"

**Think of it as**:
```
count = 0 means: "No one is winning right now, pick someone"
count++ means: "My candidate got a vote!"
count-- means: "Someone voted against my candidate"
count == 0 means: "Votes are tied, switch candidates"
```

### Why Reset at Zero?

If you have equal votes, you might as well pick a new element because the current one clearly isn't the majority.

**Wrong intuition**: "Why reset? Why not keep trying?"  
**Right intuition**: "If my candidate is tied with opponents combined, they can't be majority. Start fresh."

---

## 🔍 Approach 1: Brute Force - O(n²)

### Algorithm

For each element, count all occurrences.

```cpp
int majorityElement_Brute(vector<int>& nums) {
    int n = nums.size();
    
    for(int i = 0; i < n; i++) {
        int count = 0;
        for(int j = 0; j < n; j++) {
            if(nums[j] == nums[i]) count++;
        }
        if(count > n/2) return nums[i];
    }
    return -1;
}
```

### Complexity
- **Time**: O(n²)
- **Space**: O(1)

---

## 🔄 Approach 2: Hash Map - O(n)

### Algorithm

Count all elements, find one with count > n/2.

```cpp
int majorityElement_Hash(vector<int>& nums) {
    unordered_map<int, int> freq;
    int n = nums.size();
    
    // Count frequencies
    for(int num : nums) {
        freq[num]++;
    }
    
    // Find element with count > n/2
    for(auto& p : freq) {
        if(p.second > n/2) {
            return p.first;
        }
    }
    return -1;
}
```

### Complexity
- **Time**: O(n) for counting + O(n) for finding = O(n)
- **Space**: O(n) for hash map

---

## ⭐ Approach 3: Moore's Voting - OPTIMAL

### The Trick

Instead of counting, use cancellation!

```cpp
int majorityElement_Optimal(vector<int>& nums) {
    int candidate = 0;
    int count = 0;
    
    // STEP 1: Find potential candidate via voting
    for(int num : nums) {
        if(count == 0) {
            candidate = num;
            count = 1;
        }
        else if(num == candidate) {
            count++;
        }
        else {
            count--;
        }
    }
    
    // STEP 2: Verify (required if array might not have majority)
    count = 0;
    for(int num : nums) {
        if(num == candidate) count++;
    }
    
    if(count > nums.size()/2) {
        return candidate;
    }
    return -1;
}
```

### Why Two Passes?

**Pass 1**: Find candidate (assuming majority exists)  
**Pass 2**: Verify candidate is actually majority (if problem allows no majority)

If problem guarantees majority exists, you can skip Pass 2!

### Complexity
- **Time**: O(n) for voting + O(n) for verification = O(n)
- **Space**: **O(1)** ← Better than hash!

---

## 🚶 Detailed Walkthrough

### Example Array
```
[7, 7, 5, 7, 5, 1, 5, 7, 5, 5, 7, 7, 5, 5, 5, 5]

7 appears 7 times
5 appears 9 times ← MAJORITY (9 > 8)

Expected: 5
```

### Step-by-Step Trace

```
Index 0:  num=7, count=0
  → count==0? Yes
  → candidate=7, count=1

Index 1:  num=7, count=1
  → num==7? Yes
  → count++ → count=2

Index 2:  num=5, count=2
  → num==5? No
  → count-- → count=1

Index 3:  num=7, count=1
  → num==7? Yes
  → count++ → count=2

Index 4:  num=5, count=2
  → num==5? No
  → count-- → count=1

Index 5:  num=1, count=1
  → num==1? No
  → count-- → count=0
  ⚠️ NOW WE RESET!

Index 6:  num=5, count=0
  → count==0? Yes
  → candidate=5, count=1  ← NEW CANDIDATE!

Index 7:  num=7, count=1
  → num==7? No
  → count-- → count=0

Index 8:  num=5, count=0
  → count==0? Yes
  → candidate=5, count=1

Index 9:  num=5, count=1
  → num==5? Yes
  → count++ → count=2

Index 10: num=7, count=2
  → num==7? No
  → count-- → count=1

Index 11: num=7, count=1
  → num==7? No
  → count-- → count=0

Index 12: num=5, count=0
  → count==0? Yes
  → candidate=5, count=1

Index 13: num=5, count=1
  → num==5? Yes
  → count++ → count=2

Index 14: num=5, count=2
  → num==5? Yes
  → count++ → count=3

Index 15: num=5, count=3
  → num==5? Yes
  → count++ → count=4

CANDIDATE = 5
Verify: 5 appears 9 times > 8? YES ✓
ANSWER: 5
```

### Key Observations

1. **When count reaches 0**, we switch candidates (element 5 took over from element 7)
2. **Survivor** (element 5) is the answer
3. **Verification** confirms it actually appears > n/2 times

---

## 🧪 Code Implementation

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0;
        int count = 0;
        
        // Find potential candidate
        for(int num : nums) {
            if(count == 0) {
                candidate = num;
                count = 1;
            }
            else if(num == candidate) {
                count++;
            }
            else {
                count--;
            }
        }
        
        // Verify (optional if guarantee majority exists)
        count = 0;
        for(int num : nums) {
            if(num == candidate) count++;
        }
        
        return (count > nums.size() / 2) ? candidate : -1;
    }
};
```

---

## 🎯 When to Use Each Approach

| Approach | Time | Space | When |
|---|---|---|---|
| Brute | O(n²) | O(1) | Teaching/Learning |
| Hash | O(n) | O(n) | Interview (simple to explain) |
| **Moore's** | **O(n)** | **O(1)** | **Optimal answer** |

---

## 🔗 Related Problems

- [[ARRAY easy part 3#Problem 6 — Single Number (Find the element that appears once)|Single Number]] (Similar XOR trick, different mechanism)
- [[Sort_0_1_2|Sort 0-1-2]] (Similar traversal pattern)
- [[Two_Sum_Complete|Two Sum]] (Hash map variation)

---

## 💪 Practice Variations

1. **Find top K majority elements** (appears > n/3 times)
2. **Find all majority elements** (appears > n/4 times)
3. **Print minority element** instead of majority
4. **Time-weighted majority** (recent votes count more)

---

## 🧠 Memorization Checklist

- [ ] Understand the cancellation principle
- [ ] Can explain why greedy works
- [ ] Memorize: "count=0 means reset"
- [ ] Trace through example yourself
- [ ] Code without reference
- [ ] Explain to someone else

---

**Back to**: [[Arrays Medium|Advanced Problems Index]]
**Related**: [[Majority_Element#Core Intuition|Intuition Explained]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
