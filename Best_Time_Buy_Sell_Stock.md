---
tags: [greedy, tracking, arrays, stocks, interview]
topic: Best Time to Buy and Sell Stock
step: "Step 3.2 (continued)"
pattern: Greedy + Tracking
difficulty: Easy
status: completed
date: 2026-05-28
reorganized: 2026-06-17
---

# 💰 Best Time to Buy and Sell Stock

## 📌 Quick Info

- **Problem**: Find max profit with one buy & sell transaction
- **Difficulty**: Easy ⭐⭐
- **Pattern**: [[INDEX_New_Problems#Pattern 1 Tracking Values|Greedy + Tracking]]
- **Key Concept**: Track minimum price
- **Frequency**: ⭐⭐⭐⭐⭐ (Very Common!)

**Related**: [[INDEX_New_Problems|← Back to Index]]

---

## 🎯 Problem Statement

You are given an array of stock prices. You must:
1. Buy on one day
2. Sell on a later day (after buying)
3. Maximize profit = (sell price - buy price)

**Examples**:
```
prices = [7, 1, 5, 3, 6, 4]
Output: 5 (buy at 1, sell at 6)

prices = [7, 6, 4, 3, 1]
Output: 0 (prices only decrease, no profit)

prices = [2, 4, 1, 7, 5, 11]
Output: 10 (buy at 1, sell at 11)
```

---

## 🧠 Core Intuition

### The Key Insight: Greedy Approach

**Question**: For each selling day, which day should you have bought on?

**Answer**: The day with the **minimum price BEFORE that day**

```
prices = [7, 1, 5, 3, 6, 4]

Day 0 (7):   Can't sell (no past day to buy from)
Day 1 (1):   Can't sell (no profit)
Day 2 (5):   Min so far = 1, profit = 5 - 1 = 4
Day 3 (3):   Min so far = 1, profit = 3 - 1 = 2
Day 4 (6):   Min so far = 1, profit = 6 - 1 = 5 ← MAX!
Day 5 (4):   Min so far = 1, profit = 4 - 1 = 3
```

### Why This Works (The Greedy Principle)

For any selling day, you want to have bought at the **minimum price before it**.

**Proof by contradiction**:
```
Suppose you bought at price B and sold at price S
If there was a lower price before B:
  → You could have bought lower
  → Profit would be higher
  → Contradiction!

Therefore: Always buy at the minimum price seen so far
```

### Mental Model: Single Pass Strategy

Think of it as:
```
"As I walk through prices, I remember:
 1. The lowest price I've seen (best buying opportunity)
 2. The best profit I could make (using that low price)
 
 When I see a new price:
 - Is it a new minimum? Remember it for future sales
 - Can I make a profit with this new price? Track it"
```

---

## 💡 How to Remember (Memory Hook)

### "Remember the Minimum"

**Three Simple Things**:
1. Track the **minimum price** seen so far
2. At each step, calculate **profit** = current - minimum
3. Keep **maximum profit** seen

```
minPrice = first element
maxProfit = 0

For each price in array:
  maxProfit = max(maxProfit, price - minPrice)
  minPrice = min(minPrice, price)
```

**Why this works**: 
- You check profit with best buying opportunity (min)
- You update profit before updating min (order matters!)

---

## 🔍 Approach 1: Brute Force - O(n²)

### Algorithm

Check all possible buy-sell combinations.

```cpp
int maxProfit_Brute(vector<int>& prices) {
    int maxProfit = 0;
    
    for(int i = 0; i < prices.size(); i++) {
        for(int j = i + 1; j < prices.size(); j++) {
            int profit = prices[j] - prices[i];
            maxProfit = max(maxProfit, profit);
        }
    }
    
    return maxProfit;
}
```

### Complexity
- **Time**: O(n²)
- **Space**: O(1)

### Why Inefficient?
Unnecessary comparisons. We're rechecking minimums we've already seen.

---

## ⭐ Approach 2: Greedy - OPTIMAL

### Algorithm

```cpp
int maxProfit_Optimal(vector<int>& prices) {
    int minPrice = prices[0];  // Best price to buy
    int maxProfit = 0;         // Best profit so far
    
    for(int i = 1; i < prices.size(); i++) {
        int profit = prices[i] - minPrice;
        maxProfit = max(maxProfit, profit);
        minPrice = min(minPrice, prices[i]);
    }
    
    return maxProfit;
}
```

### Why It Works

```
prices = [7, 1, 5, 3, 6, 4]

i=0: minPrice=7, maxProfit=0

i=1: price=1
     profit = 1 - 7 = -6
     maxProfit = max(0, -6) = 0
     minPrice = min(7, 1) = 1

i=2: price=5
     profit = 5 - 1 = 4
     maxProfit = max(0, 4) = 4
     minPrice = min(1, 5) = 1

i=3: price=3
     profit = 3 - 1 = 2
     maxProfit = max(4, 2) = 4
     minPrice = min(1, 3) = 1

i=4: price=6
     profit = 6 - 1 = 5
     maxProfit = max(4, 5) = 5 ← Updated!
     minPrice = min(1, 6) = 1

i=5: price=4
     profit = 4 - 1 = 3
     maxProfit = max(5, 3) = 5
     minPrice = min(1, 4) = 1

Final: maxProfit = 5 ✓
```

### Complexity
- **Time**: **O(n)** - single pass
- **Space**: **O(1)** - only two variables

---

## 🚶 Detailed Walkthrough

### Example Array
```
prices = [3, 2, 6, 5, 0, 3]
Expected: 4 (buy at 2, sell at 6)
```

### Step-by-Step

```
Initial:
minPrice = 3 (first element)
maxProfit = 0

─────────────────────────────

i=1, prices[1]=2:
  Current price: 2
  profit = 2 - 3 = -1
  maxProfit = max(0, -1) = 0
  minPrice = min(3, 2) = 2
  Status: Found cheaper price, but no profit yet

─────────────────────────────

i=2, prices[2]=6:
  Current price: 6
  profit = 6 - 2 = 4 ← First profitable transaction!
  maxProfit = max(0, 4) = 4
  minPrice = min(2, 6) = 2
  Status: Good profit with min price 2

─────────────────────────────

i=3, prices[3]=5:
  Current price: 5
  profit = 5 - 2 = 3
  maxProfit = max(4, 3) = 4 (no update)
  minPrice = min(2, 5) = 2
  Status: Could sell, but profit is less

─────────────────────────────

i=4, prices[4]=0:
  Current price: 0
  profit = 0 - 2 = -2
  maxProfit = max(4, -2) = 4
  minPrice = min(2, 0) = 0
  Status: Found new minimum, but we keep max profit

─────────────────────────────

i=5, prices[5]=3:
  Current price: 3
  profit = 3 - 0 = 3
  maxProfit = max(4, 3) = 4
  minPrice = min(0, 3) = 0
  Status: Profit exists but not better

Final: maxProfit = 4 ✓
```

### Key Observation
Notice how we found the minimum at index 4 (value 0), but this doesn't give us the best profit because it comes too late. Our best profit was calculated when we had the earliest minimum (value 2) paired with a good selling price (value 6).

---

## 🧪 Code Implementation

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Edge case: need at least 2 days
        if(prices.size() < 2) return 0;
        
        int minPrice = prices[0];
        int maxProfit = 0;
        
        for(int i = 1; i < prices.size(); i++) {
            // Calculate profit if we sell at current price
            int profit = prices[i] - minPrice;
            
            // Update max profit
            maxProfit = max(maxProfit, profit);
            
            // Update minimum price if needed
            minPrice = min(minPrice, prices[i]);
        }
        
        return maxProfit;
    }
};
```

---

## 🎯 Important Detail: Order of Operations

### ⚠️ CRITICAL: Update profit BEFORE updating minimum!

**WRONG**:
```cpp
minPrice = min(minPrice, prices[i]);  // ❌ Update min first
profit = prices[i] - minPrice;        // Uses new min
```

**CORRECT**:
```cpp
profit = prices[i] - minPrice;        // ✅ Calculate with old min
minPrice = min(minPrice, prices[i]);  // Then update min
```

**Why?** You want to compare current price with minimum **before today**, not after updating.

---

## 📊 Edge Cases

| Case | Input | Output | Explanation |
|---|---|---|---|
| Increasing | [1,2,3,4,5] | 4 | Buy at 1, sell at 5 |
| Decreasing | [5,4,3,2,1] | 0 | Can't profit, return 0 |
| Single peak | [3,2,6,5,0] | 4 | Buy at 2, sell at 6 |
| All same | [5,5,5,5] | 0 | No difference |
| Two elements | [2,7] | 5 | Buy at 2, sell at 7 |
| Two elements | [7,2] | 0 | Can't profit |

---

## 🔗 Related Problems

- [[Leaders_in_Array|Leaders in Array]] (Backward tracking)
- [[Max_Subarray_Sum|Max Subarray Sum]] (Greedy principle)
- Stock with cooldown (variation)
- Stock with fee (variation)
- Multiple transactions (variation)

---

## 💪 Practice Variations

1. **Multiple Transactions**: Buy and sell multiple times
   - Similar greedy approach
   - More complex state tracking

2. **Stock with Cooldown**: Must wait 1 day after selling
   - Requires DP/state machine
   - 3 states: hold, sold, cooldown

3. **Stock with Fee**: Commission on every transaction
   - Subtract fee from profit
   - Still greedy but adjusted

4. **Stock with K Transactions**: Limit to K buy-sell pairs
   - DP approach needed
   - O(nk) or O(n log n)

---

## 🧠 Memorization Checklist

- [ ] Understand greedy principle (buy at min)
- [ ] Know order matters (calculate before updating min)
- [ ] Trace through walkthrough yourself
- [ ] Code without reference
- [ ] Can explain edge cases
- [ ] Understand why O(n) is optimal

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---|---|
| Update minPrice first | Calculate profit FIRST, then update |
| Initialize maxProfit to INT_MIN | Use 0 (can always get 0 profit) |
| Forget edge case of 1 element | Return 0 for size < 2 |
| Allow selling before buying | Start loop from i=1 |

---

## 📈 Complexity Analysis

```
BRUTE FORCE:
- For each buy day: O(n)
  For each sell day: O(n)
  Total: O(n²)

GREEDY (OPTIMAL):
- Single pass: O(n)
- Track two values: O(1) space
- Total: O(n) time, O(1) space
```

---

**Back to**: [[INDEX_New_Problems|New Problems Index]]
**Related**: [[Max_Subarray_Sum#Core Intuition|Greedy Approach]]
**Up**: [[00_Master_Index|Master Index]]

**Last Updated**: May 28, 2026
