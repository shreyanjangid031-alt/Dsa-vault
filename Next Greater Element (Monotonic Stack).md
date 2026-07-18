**What**  
Given an array `arr`, for each element `arr[i]` find the first element to its right that is strictly greater. If none exists, return `-1`.  

**Why**  
The brute‑force scan (`O(n²)`) is too slow for large inputs. A monotonic stack keeps a decreasing sequence of candidates, enabling each element to be processed once (`O(n)` time) while using only `O(n)` extra space. It is preferred when a single pass with constant amortized work is required.  

**How**  
1. Initialise an empty stack `st` and an answer vector `ans` of size `n`.  
2. Iterate `i` from `n-1` down to `0`:  
   - While `st` is not empty **and** `st.top() <= arr[i]`, pop `st`.  
   - If `st` is empty, `ans[i] = -1`; otherwise `ans[i] = st.top()`.  
   - Push `arr[i]` onto `st`.  
3. Return `ans`.  

The stack always contains a decreasing sequence of elements seen so far; popping removes all elements that cannot be the next greater for any earlier element.  

**Diagram**  
```
Traverse right → left
i: 0  1  2  3  4  5
arr: 6  8  1  3  4  2

Step | stack (top on right) | ans[i]
-----|----------------------|--------
i=5 | [2]                  | ans[5] = -1
i=4 | [4,2]                | ans[4] = -1
i=3 | [4,2] (pop 2) → [4] | ans[3] = 4
i=2 | [1,4]                | ans[2] = 4
i=1 | [8,1,4]              | ans[1] = -1
i=0 | [6,8,1,4]            | ans[0] = 8
```

**Example**  
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> nextGreater(const vector<int>& arr) {
    int n = arr.size();
    vector<int> ans(n, -1);
    stack<int> st;                     // [[STL]]
    for (int i = n - 1; i >= 0; --i) {
        while (!st.empty() && st.top() <= arr[i]) st.pop();
        if (!st.empty()) ans[i] = st.top();
        st.push(arr[i]);
    }
    return ans;
}

int main() {
    vector<int> a = {6, 8, 1, 3, 4, 2};
    vector<int> res = nextGreater(a);
    for (int x : res) cout << x << ' ';   // 8 -1 4 4 -1 -1
}
```

**Comparison Table**

| Approach | Time | Space | Use‑case |
|----------|------|-------|----------|
| Brute Force (nested loops) | `O(n²)` | `O(1)` | Small arrays, educational |
| Monotonic Stack | `O(n)` | `O(n)` | Large inputs, interview standard |

**Links**  
- [[STL]] – stack container used  
- [[ARRAY easy part 1]] – array fundamentals  
- [[Arrays Medium]] – advanced array techniques  
- [[Leaders_in_Array]] – related “next greater to left” concept  

---