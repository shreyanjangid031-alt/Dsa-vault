**What**  
Generate every subset (power set) of a given set or string by treating each subset as a binary mask of length *n*.

**Why**  
* Enumerates all 2ⁿ subsets in deterministic order.  
* No recursion stack, constant auxiliary space.  
* Simple to implement and fast for small *n* (common interview size).  
* Directly maps to bit‑operations, useful when learning bit tricks.

**How**  
1. Let *n* be the length of the input (string or array).  
2. For each integer `mask` from `0` to `(1 << n) - 1` (inclusive):  
   1. Initialise an empty result container (`string` or `vector`).  
   2. For each bit position `i` from `0` to `n-1`:  
      * If `(mask & (1 << i)) != 0`, include element `arr[i]` (or `s[i]`).  
   3. Output or store the constructed subset.  
3. All subsets are produced; the empty subset corresponds to `mask == 0`.

**Diagram**  
```
Input string:  "abc"   (n = 3)
Indices:        0 1 2
Masks (binary)  000 001 010 011 100 101 110 111
Subsets         {}  {a} {b} {ab} {c} {ac} {bc} {abc}
```
Each bit `i` indicates whether element `i` is present.

**Example**  
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<string> powerSet(const string& s) {
    int n = s.size();
    vector<string> res;
    for (int mask = 0; mask < (1 << n); ++mask) {
        string subset;
        for (int i = 0; i < n; ++i)
            if (mask & (1 << i))
                subset += s[i];
        res.push_back(subset);
    }
    return res;
}

int main() {
    string s = "abc";
    auto subsets = powerSet(s);
    for (const auto& sub : subsets)
        cout << (sub.empty() ? "{}" : sub) << '\n';
}
```
Output:
```
{}
a
b
ab
c
ac
bc
abc
```

**Comparison: Recursion vs Bit Manipulation**

| Feature | Recursive DFS | Bit Manipulation |
|---------|---------------|------------------|
| **Space** | O(n) recursion stack | O(1) auxiliary (besides output) |
| **Time** | O(2ⁿ · n) (each subset built by copying) | O(2ⁿ · n) (same, but often faster constant) |
| **Code Simplicity** | Slightly longer, needs helper | Very short, single loop |
| **Order of Subsets** | Depends on recursion order | Deterministic binary order |
| **Use‑case** | Easier to extend to other combinatorial problems | Ideal for interview “power set” question |

**Related Notes**  
- [[ARRAY easy part 1]] – basic array handling.  
- [[Arrays Medium]] – advanced array techniques.  

---

**Auto-suggested links:** [[ARRAY easy part 1]]