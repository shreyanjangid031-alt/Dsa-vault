**What**  
Pascal's Triangle is a triangular array of binomial coefficients where each entry is the sum of the two directly above it. The element at row *r* and column *c* (1‑based) equals the binomial coefficient \(\binom{r-1}{c-1}\).

**Why**  
- Provides quick access to combinatorial values without pre‑computing factorials.  
- Useful in dynamic programming, probability, and combinatorics problems.  
- Generates all binomial coefficients for a given *n* in linear time per row, avoiding expensive factorial calculations.

**How**  

1. **Element (r, c)**  
   - Use the multiplicative formula:  
     \[
     \binom{n}{k} = \prod_{i=1}^{k}\frac{n-k+i}{i}
     \]
     where \(n=r-1,\; k=c-1\).  
   - Iterate `i` from 1 to `k`, multiply result by `(n-k+i)` then divide by `i`.  
   - Use `long long` to avoid overflow.

2. **Single Row (n)**  
   - Start with `value = 1` (first element).  
   - For `i` from 1 to `n-1`:  
     `value = value * (n - i) / i`  
     – this gives the next binomial coefficient.  
   - Append each `value` to the row.

3. **Full Triangle (n)**  
   - For each row `r` from 1 to `n`:  
     - Generate the row using the method above.  
     - Store the row in a vector of vectors.

**Diagram**  

```
          1
        1   1
      1   2   1
    1   3   3   1
  1   4   6   4   1
1   5  10  10   5   1
```

**Comparison: Naïve Factorial vs. Multiplicative**  

| Approach | Time Complexity | Space | Notes |
|----------|-----------------|-------|-------|
| Factorial (`n! / k! / (n-k)!`) | O(n) per factorial → O(n) overall | O(1) | Requires large intermediate values; risk of overflow. |
| Multiplicative (`∏ (n-k+i)/i`) | O(k) per coefficient | O(1) | Uses only necessary multiplications/divisions; numerically stable. |

**Example (C++)**  

```cpp
#include <bits/stdc++.h>
using namespace std;

// Element at (r, c)
long long binom(int r, int c) {
    int n = r - 1, k = c - 1;
    if (k > n - k) k = n - k;          // symmetry
    long long res = 1;
    for (int i = 1; i <= k; ++i) {
        res = res * (n - k + i) / i;   // multiply then divide
    }
    return res;
}

// Single row
vector<long long> nthRow(int n) {
    vector<long long> row;
    long long val = 1;
    row.push_back(val);
    for (int i = 1; i < n; ++i) {
        val = val * (n - i) / i;
        row.push_back(val);
    }
    return row;
}

// Full triangle
vector<vector<long long>> pascalTriangle(int n) {
    vector<vector<long long>> tri;
    for (int r = 1; r <= n; ++r) {
        tri.push_back(nthRow(r));
    }
    return tri;
}

int main() {
    int r = 5, c = 3;
    cout << "Element (" << r << "," << c << ") = " << binom(r, c) << '\n';

    int n = 6;
    cout << "Row " << n << ": ";
    for (auto x : nthRow(n)) cout << x << ' ';
    cout << '\n';

    cout << "Triangle up to row " << n << ":\n";
    for (auto &row : pascalTriangle(n)) {
        for (auto x : row) cout << x << ' ';
        cout << '\n';
    }
    return 0;
}
```

*Links to related notes:*  
- [[ARRAY easy part 1]]  
- [[Arrays Medium]]  
- [[Sorting]]  

This concise guide covers the core concepts, efficient algorithms, and practical code for working with Pascal's Triangle in interview and competitive programming contexts.