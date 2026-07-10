---
tags: [stl, cpp, containers, iterators, algorithms]
topic: C++ STL (Standard Template Library)
step: "Step 2.x"
status: completed
date: 2026-05-28
reorganized: 2026-06-18
---

# 📚 C++ STL (Standard Template Library)

## 📌 Course Info

- **Source**: Take You Forward - C++ STL Complete Tutorial
- **Topic**: STL Containers, Iterators, Algorithms
- **Related**: [[ARRAY easy part 1]] · [[Arrays Medium]] · [[INDEX_New_Problems]] (DSA problems using STL)
- **Last Updated**: May 28, 2026

**Up**: [[00_Master_Index|← Master Index]]

---

## 🔧 C++ Skeleton & Basics

### Header Files

```cpp
#include <bits/stdc++.h>  // Includes ALL STL libraries at once
using namespace std;       // No need to write std:: every time
int main() {
    // Your code here
    return 0;
}
```

**Without `using namespace std`**:

```cpp
std::cin >> a;      // Instead of cin >> a;
std::cout << a;     // Instead of cout << a;
```

### Input/Output

```cpp
std::cin >> a;      // Takes input into a
std::cout << a;     // Prints a to screen
```

---

## 🔄 Functions in C++

### Void Function (No Return)

```cpp
void print() {
    cout << "My name is Raj" << endl;
}
int main() {
    print();  // Outputs: My name is Raj
    return 0;
}
```

### Return Type Function

```cpp
int sum(int a, int b) {
    return a + b;
}
int main() {
    int s = sum(1, 5);  // s = 6
    cout << s;          // Outputs: 6
    return 0;
}
```

**Return type can be**: `int`, `double`, `string`, `bool`, etc.

---

## 👥 Pairs

### What is a Pair?

Stores **two elements** of possibly different data types.

### Declaration

```cpp
pair<int, int> p = {1, 3};
// Different data types
pair<int, string> p = {5, "Raj"};
pair<double, double> p = {3.14, 2.71};
```

### Accessing Elements

```cpp
pair<int, int> p = {1, 3};
cout << p.first;   // Outputs: 1
cout << p.second;  // Outputs: 3
```

### Nested Pairs (Storing More Than 2 Elements)

**Storing 3 elements**:

```cpp
pair<int, pair<int, int>> p = {1, {3, 4}};
p.first          // 1
p.second.first   // 3
p.second.second  // 4
```

**Storing 4+ elements**: Continue nesting
**Example**:

```cpp
pair<int, pair<int, pair<int, int>>> p = {1, {2, {3, 4}}};
p.first                    // 1
p.second.first             // 2
p.second.second.first      // 3
p.second.second.second     // 4
```

### Pairs in Arrays

```cpp
pair<int, int> arr[3];
arr[0] = {1, 5};
arr[1] = {2, 10};
arr[2] = {3, 15};
cout << arr[1].second;  // Outputs: 10
```

---

## 📦 Containers Overview

| Container | Use Case | Time Complexity |
|---|---|---|
| Vector | Dynamic array | O(1) push_back, O(n) insert |
| List | Fast front operations | O(1) push_front, O(n) access |
| DQ | Deque - both ends | O(1) push_back/front |
| Stack | LIFO (Last In First Out) | O(1) all ops |
| Queue | FIFO (First In First Out) | O(1) all ops |
| Priority Queue | Max/Min heap | O(log n) push/pop |
| Set | Unique, sorted | O(log n) all ops |
| Multiset | Non-unique, sorted | O(log n) all ops |
| Unordered Set | Unique, unsorted | O(1) avg, O(n) worst |
| Map | Key-value pairs (unique key) | O(log n) all ops |
| Multimap | Key-value pairs (non-unique key) | O(log n) all ops |
| Unordered Map | Key-value pairs, unsorted | O(1) avg, O(n) worst |

---

## 🎁 Vector - Dynamic Array

### Declaration

```cpp
vector<int> v;                    // Empty vector
vector<int> v(5);                 // Size 5, all zeros/garbage
vector<int> v(5, 100);            // Size 5, all 100s
vector<int> v2(v1);               // Copy of v1
vector<pair<int, int>> v;         // Vector of pairs
```

### Insertion

```cpp
vector<int> v;
v.push_back(1);          // Add 1 at end → [1]
v.push_back(2);          // Add 2 at end → [1, 2]
v.emplace_back(3);       // Add 3 at end (faster) → [1, 2, 3]
// Pair vector
vector<pair<int, int>> v;
v.push_back({1, 2});     // Need curly braces
v.emplace_back(3, 4);    // No curly braces needed (auto-creates pair)
```

**Why `emplace_back` is faster**: Constructs in-place vs copy

### Access Elements

```cpp
vector<int> v = {20, 10, 15, 5, 7};
// Array-style access
cout << v[0];        // 20
cout << v[3];        // 5
// At function (similar)
cout << v.at(0);     // 20
// First and Last
cout << v.back();    // 7 (last element)
```

### Iterators

**Iterator**: Points to memory address of element

```cpp
vector<int> v = {20, 10, 15, 5, 7};
//               [0] [1] [2] [3] [4]
// Declare iterator
vector<int>::iterator it = v.begin();
// Access element at iterator
cout << *it;         // 20 (dereference with *)
// Move iterator
it++;                // Points to 10
cout << *it;         // 10
it += 2;             // Points to 5
cout << *it;         // 5
```

### Iterator Types

| Iterator | Pointer | Direction |
|---|---|---|
| `v.begin()` | First element | Forward |
| `v.end()` | **After** last element | Forward |
| `v.rbegin()` | Last element | Backward |
| `v.rend()` | **Before** first element | Backward |
**Important**: `end()` points **after** the last element, not at it!

### Auto Keyword

```cpp
// Without auto (verbose)
vector<int>::iterator it = v.begin();
// With auto (automatic type deduction)
auto it = v.begin();     // Automatically vector<int>::iterator
// In for loops
for(auto it = v.begin(); it != v.end(); it++) {
    cout << *it;
}
```

### For-Each Loop

```cpp
vector<int> v = {20, 10, 15, 5, 7};
// For each element in vector
for(auto element : v) {
    cout << element << " ";  // Outputs: 20 10 15 5 7
}
// With reference (can modify)
for(auto &element : v) {
    element *= 2;  // Doubles each element
}
```

### Printing Vector

**Method 1: Index Loop**

```cpp
for(int i = 0; i < v.size(); i++) {
    cout << v[i];
}
```

**Method 2: Iterator Loop**

```cpp
for(auto it = v.begin(); it != v.end(); it++) {
    cout << *it;
}
```

**Method 3: For-Each Loop**

```cpp
for(auto element : v) {
    cout << element;
}
```

### Erase (Delete)

**Erase Single Element**:

```cpp
vector<int> v = {10, 20, 12, 23};
v.erase(v.begin() + 1);  // Delete element at index 1 (20)
// Result: {10, 12, 23}
```

**Erase Range**:

```cpp
vector<int> v = {10, 20, 30, 40, 50};
v.erase(v.begin() + 1, v.begin() + 3);  // Delete from index 1 to 2
// Result: {10, 40, 50}
// Note: Start included, end NOT included [start, end)
```

### Insert

**Insert Single Element**:

```cpp
vector<int> v = {300, 100, 100};
v.insert(v.begin(), 500);  // Insert 500 at beginning
// Result: {500, 300, 100, 100}
```

**Insert Multiple Elements**:

```cpp
vector<int> v = {300, 100, 100};
v.insert(v.begin() + 1, 2, 10);  // Insert 2 instances of 10 at index 1
// Result: {300, 10, 10, 100, 100}
```

**Insert Another Vector**:

```cpp
vector<int> v1 = {300, 100, 100};
vector<int> v2 = {50, 50};
v1.insert(v1.begin() + 1, v2.begin(), v2.end());
// Result: {300, 50, 50, 100, 100}
```

### Other Functions

```cpp
vector<int> v = {10, 20, 30, 40, 50};
v.size();        // Number of elements → 5
v.pop_back();    // Remove last element → {10, 20, 30, 40}
v.back();        // Last element → 50
v.empty();       // Is empty? → true/false
v.clear();       // Remove all elements → {}
v.swap(v2);      // Swap two vectors
```

---

## 📋 List - Doubly Linked List

```cpp
list<int> l;
l.push_back(1);      // Add at end
l.emplace_back(2);   // Add at end (faster)
l.push_front(0);     // Add at front (cheap!)
l.emplace_front(-1); // Add at front (faster)
l.pop_back();        // Remove from end
l.pop_front();       // Remove from front
```

**Key Difference from Vector**:
- `push_front` is **O(1)** (vector needs O(n) using insert)
- Iterator access is slower than vector
- Internal structure: **Doubly Linked List** vs Vector's **Contiguous Array**
**All other functions**: Same as vector (begin, end, erase, insert, etc.)

---

## 🚗 DQ (Double-Ended Queue)

```cpp
deque<int> dq;
dq.push_back(1);     // Add at end
dq.push_front(0);    // Add at front
dq.pop_back();       // Remove from end
dq.pop_front();      // Remove from front
dq.back();           // Last element
dq.front();          // First element
```

**Similar to List** but supports random access like vector.

---

## 📚 Stack (LIFO)

**LIFO**: Last In First Out - Last element in is first out

```cpp
stack<int> st;
st.push(1);     // Stack: [1]
st.push(2);     // Stack: [1, 2]
st.push(3);     // Stack: [1, 2, 3]
st.top();       // 3 (last element, NOT removed)
st.pop();       // Remove 3 → Stack: [1, 2]
st.top();       // 2
st.size();      // 2 elements
st.empty();     // false
st.swap(st2);   // Swap stacks
```

**Key Points**:
- No indexing: Can't do `st[0]`
- Only 3 main operations: `push`, `pop`, `top`
- All operations: **O(1)** time

---

## 🚦 Queue (FIFO)

**FIFO**: First In First Out - First element in is first out

```cpp
queue<int> q;
q.push(1);      // Queue: [1]
q.push(2);      // Queue: [1, 2]
q.push(3);      // Queue: [1, 2, 3]
q.front();      // 1 (first element, NOT removed)
q.back();       // 3 (last element)
q.pop();        // Remove 1 → Queue: [2, 3]
q.front();      // 2
q.size();       // 2
q.empty();      // false
```

**Similar to Stack** but FIFO instead of LIFO

---

## 🏆 Priority Queue

**Max Heap** (by default - largest element on top):

```cpp
priority_queue<int> pq;
pq.push(5);     // pq: [5]
pq.push(2);     // pq: [5, 2]
pq.push(8);     // pq: [8, 5, 2]
pq.push(10);    // pq: [10, 8, 5, 2]
pq.push(3);     // pq: [10, 8, 5, 3, 2]
pq.top();       // 10 (maximum element)
pq.pop();       // Remove 10 → [8, 5, 3, 2]
pq.top();       // 8
pq.size();      // 4
```

**Min Heap** (smallest element on top):

```cpp
priority_queue<int, vector<int>, greater<int>> pq;
pq.push(5);     // pq: [5]
pq.push(2);     // pq: [2, 5]
pq.push(8);     // pq: [2, 5, 8]
pq.push(10);    // pq: [2, 5, 8, 10]
pq.push(3);     // pq: [2, 3, 5, 8, 10]
pq.top();       // 2 (minimum element)
pq.pop();       // Remove 2
pq.top();       // 3
```

**Internal Structure**: Binary Heap (tree maintained inside)
**Complexity**:
- `push`: O(log n)
- `top`: O(1)
- `pop`: O(log n)

---

## 🎯 Set - Unique & Sorted

**Properties**:
- Stores unique elements only
- Automatically sorted
- No duplicates allowed

```cpp
set<int> s;
s.insert(1);       // s: {1}
s.insert(2);       // s: {1, 2}
s.insert(2);       // No change (already exists) → {1, 2}
s.insert(4);       // s: {1, 2, 4}
s.insert(3);       // s: {1, 2, 3, 4} (auto-sorted!)
s.find(3);         // Returns iterator to 3
s.find(5);         // Returns s.end() (not found)
s.erase(2);        // Remove 2 → {1, 3, 4}
s.erase(s.find(4)); // Remove element pointed by iterator
s.count(3);        // 1 (exists) or 0 (doesn't exist)
s.size();          // Number of elements
s.empty();         // true/false
```

### Iterating Over Set

```cpp
set<int> s = {1, 2, 3, 4};
// Iterator loop
for(auto it = s.begin(); it != s.end(); it++) {
    cout << *it << " ";  // 1 2 3 4
}
// For-each loop
for(auto element : s) {
    cout << element << " ";  // 1 2 3 4
}
```

### Erase Range

```cpp
set<int> s = {1, 2, 3, 4, 5};
s.erase(s.find(2), s.find(4));  // Erase [2, 4)
// Result: {1, 4, 5}
// Note: Start included, end NOT included
```

**Complexity**: All operations **O(log n)**

---

## 📝 Multiset - Unique Sorted with Duplicates

```cpp
multiset<int> ms;
ms.insert(1);     // {1}
ms.insert(2);     // {1, 2}
ms.insert(2);     // {1, 2, 2} (duplicates allowed!)
ms.insert(3);     // {1, 2, 2, 3}
ms.count(2);      // 2 (appears twice)
ms.count(5);      // 0 (doesn't exist)
ms.erase(2);      // Removes ALL 2s → {1, 3}
// Remove only one occurrence
auto it = ms.find(2);
ms.erase(it);     // Remove iterator (single element)
```

**Difference from Set**: Allows duplicate values

---

## 🌀 Unordered Set - Unique, Unsorted

```cpp
unordered_set<int> us;
us.insert(5);     // {5}
us.insert(2);     // {5, 2} or {2, 5} (random order!)
us.insert(2);     // No change (unique)
us.insert(8);     // {5, 2, 8} or any order
us.find(2);       // Returns iterator to 2
us.count(5);      // 1 or 0
us.erase(2);      // Remove 2
us.size();        // Number of elements
us.empty();       // true/false
```

**Difference from Set**:
- No sorted order (random/hashed)
- **Average** operations: O(1) constant
- **Worst case**: O(n) linear (rare)
- `lower_bound` and `upper_bound` don't work here

---

## 🗺️ Map - Key-Value Pairs

**Like a dictionary**: key → value

```cpp
map<int, string> m;
m[1] = "Raj";      // Key 1 → Value "Raj"
m[2] = "Rohan";    // Key 2 → Value "Rohan"
m[3] = "Ravi";     // Key 3 → Value "Ravi"
m[1];              // "Raj"
m[2];              // "Rohan"
m[5];              // "" (empty, doesn't exist)
// Using insert/emplace
m.insert({4, "Ram"});
m.emplace(5, "Rani");
```

### Iterating Over Map

```cpp
map<int, string> m = {{1, "Raj"}, {2, "Rohan"}, {3, "Ravi"}};
for(auto it = m.begin(); it != m.end(); it++) {
    cout << it->first << " → " << it->second << endl;
    // 1 → Raj
    // 2 → Rohan
    // 3 → Ravi
}
// For-each with pair
for(auto p : m) {
    cout << p.first << " → " << p.second << endl;
}
```

### Finding & Erasing

```cpp
map<int, string> m = {{1, "Raj"}, {2, "Rohan"}, {3, "Ravi"}};
m.find(2);         // Returns iterator to key 2
m.find(5);         // Returns m.end() (not found)
m.erase(2);        // Erase key 2
m.erase(m.find(1)); // Erase by iterator
// Erase range
m.erase(m.find(1), m.find(3));  // Erase [1, 3)
```

**Properties**:
- Keys must be unique
- Stored in sorted order of keys
- **Complexity**: All operations O(log n)

### Complex Maps

```cpp
// Map with pair key
map<pair<int, int>, int> m;
m[{1, 2}] = 100;
m[{3, 4}] = 200;
// Map with pair value
map<int, pair<int, int>> m;
m[1] = {10, 20};
m[2] = {30, 40};
```

---

## 🔀 Multimap - Map with Non-Unique Keys

```cpp
multimap<int, string> mm;
mm.insert({1, "Raj"});
mm.insert({1, "Rohan"});     // Same key allowed!
mm.insert({2, "Ravi"});
mm.count(1);                 // 2 (two entries)
// Find and erase specific entry
auto it = mm.find(1);
mm.erase(it);                // Erase one occurrence
// Erase all with key 1
mm.erase(1);                 // All occurrences gone
```

---

## 🔗 Unordered Map - Unsorted, Unique Keys

```cpp
unordered_map<int, string> um;
um[1] = "Raj";
um[2] = "Rohan";
um[3] = "Ravi";
um[1];           // "Raj"
um.find(2);      // Iterator to key 2
um.count(5);     // 0 or 1
um.erase(2);     // Remove key 2
// All operations: O(1) average, O(n) worst
```

**Difference from Map**:
- Unsorted (hashed)
- **Average**: O(1), **Worst**: O(n)
- No `lower_bound`/`upper_bound`

---

## 🔧 Algorithms

### Sort

**Ascending**:

```cpp
int arr[] = {5, 2, 1, 3};
sort(arr, arr + 4);  // {1, 2, 3, 5}
vector<int> v = {5, 2, 1, 3};
sort(v.begin(), v.end());  // {1, 2, 3, 5}
```

**Descending**:

```cpp
sort(arr, arr + 4, greater<int>());  // {5, 3, 2, 1}
sort(v.begin(), v.end(), greater<int>());
```

**Partial Sort** (only specific range):

```cpp
int arr[] = {5, 2, 1, 3};
sort(arr + 1, arr + 3);  // Sort only [2, 1] → {5, 1, 2, 3}
```

### Custom Comparator

**Problem**: Sort pairs by second element (ascending), then by first element (descending) if second is same.

```
Pairs: {1, 2}, {4, 1}, {2, 1}, {3, 2}
Expected: {4, 1}, {2, 1}, {3, 2}, {1, 2}
           (1st pair)  (1st, by 1st↓)  (2nd pair)
```

**Write Comparator**:

```cpp
bool comparator(pair<int, int> p1, pair<int, int> p2) {
    // If second elements different, sort by second (ascending)
    if(p1.second != p2.second) {
        return p1.second < p2.second;
    }
    // If second elements same, sort by first (descending)
    return p1.first > p2.first;
}
// Use in sort
sort(arr, arr + n, comparator);
```

**How Comparator Works**:
- Returns `true` if p1 should come before p2
- Returns `false` if p1 should not come before p2 (will swap)
- Think of it as: "Is this pair in correct order?"

---

### __builtin_popcount - Count Set Bits

Counts number of '1' bits in binary representation.

```cpp
int n = 7;          // Binary: 111 (3 ones)
__builtin_popcount(7);       // Returns 3
int n = 6;          // Binary: 110 (2 ones)
__builtin_popcount(6);       // Returns 2
// For long long
long long n = 1000000000;
__builtin_popcountll(n);     // Use 'll' suffix
```

**Applications**:
- Count number of set bits
- Check if power of 2 (popcount = 1)
- Hamming distance

---

### next_permutation - Generate Permutations

Generates next lexicographically greater permutation.

```cpp
string s = "123";
cout << s << endl;           // 123
next_permutation(s.begin(), s.end());
cout << s << endl;           // 132
next_permutation(s.begin(), s.end());
cout << s << endl;           // 213
// Continue until no more permutations
while(next_permutation(s.begin(), s.end())) {
    cout << s << endl;       // 213, 231, 312, 321
}
// Returns false when no more permutations
```

**All Permutations of "123"**:

```
123 → 132 → 213 → 231 → 312 → 321 → (false, stop)
```

**Important**: Start from **sorted string** to get all permutations!

```cpp
string s = "321";  // NOT sorted
next_permutation(s.begin(), s.end());
// Will only give: None (already at last permutation)
// Correct way:
sort(s.begin(), s.end());  // "123"
do {
    cout << s << endl;
} while(next_permutation(s.begin(), s.end()));
// Prints all 6 permutations
```

---

### max_element & min_element

```cpp
int arr[] = {1, 5, 3, 6, 2};
auto maxIt = max_element(arr, arr + 5);
cout << *maxIt;              // 6
auto minIt = min_element(arr, arr + 5);
cout << *minIt;              // 1
vector<int> v = {1, 5, 3, 6, 2};
cout << *max_element(v.begin(), v.end());  // 6
cout << *min_element(v.begin(), v.end());  // 1
```

**Returns**: Iterator to element (dereference with `*`)

---

## 📊 Container Complexity Cheat Sheet

| Operation | Vector | List | Stack | Queue | Set | Map |
|---|---|---|---|---|---|---|
| Insert at end | O(1) | O(1) | O(1) | - | - | - |
| Insert at front | O(n) | O(1) | - | O(1) | - | - |
| Access element | O(1) | O(n) | - | - | - | - |
| Search | O(n) | O(n) | - | - | O(log n) | O(log n) |
| Insert/Delete | O(n) | O(1) | O(1) | O(1) | O(log n) | O(log n) |

---

## 🎯 When to Use Which Container

| Use Case | Container |
|---|---|
| Need dynamic array with random access | **Vector** |
| Frequent insertions at front | **List** |
| Need both ends operations | **Deque** |
| LIFO (Undo functionality) | **Stack** |
| FIFO (BFS, scheduling) | **Queue** |
| Max/Min element always needed | **Priority Queue** |
| Need unique, sorted elements | **Set** |
| Need multiple occurrences, sorted | **Multiset** |
| Need fast unique elements | **Unordered Set** |
| Key-value pairs with unique keys | **Map** |
| Key-value pairs with duplicate keys | **Multimap** |
| Fast key-value lookup | **Unordered Map** |

---

## 💡 Tips & Tricks

### 1. Use `emplace_back` Over `push_back`

```cpp
v.push_back({1, 2});      // Creates pair, then copies
v.emplace_back(1, 2);     // Creates pair in-place (faster)
```

### 2. Use `auto` for Iterators

```cpp
// Verbose
vector<int>::iterator it = v.begin();
// Simple
auto it = v.begin();
```

### 3. Use For-Each Loop

```cpp
// More readable than iterator loop
for(auto element : v) {
    cout << element;
}
```

### 4. Remember `end()` Points After Last Element

```cpp
vector<int> v = {1, 2, 3};
//                    v.end()
// Iterator range: [v.begin(), v.end())
```

### 5. Comparator for Custom Sorting

```cpp
// Instead of manual sort logic
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // Descending
});
```

---

## 🚀 Common Mistakes

| Mistake | Fix |
|---|---|
| Using `st[0]` on stack/queue | Use `st.top()` or `q.front()` |
| Forgetting `*` when using iterator | `cout << *it;` not `cout << it;` |
| Assuming `set` has duplicates | Use `multiset` for duplicates |
| Forgetting to sort before `next_permutation` | Always `sort()` first |
| Comparing iterators wrongly | Use `it != v.end()` not `it < v.end()` |
| Using `find()` in vector (O(n)) | Use `find()` in set/map (O(log n)) |

---

## 🔗 Related Files

- [[Sorting]] — Step 2.1/2.2 (prerequisite)
- [[ARRAY easy part 1]] · [[ARRAY easy part 2]] · [[ARRAY easy part 3]] — Step 3.1
- [[Arrays Medium]] · [[INDEX_New_Problems]] — Step 3.2

**Up**: [[00_Master_Index|Master Index]]

---

## 📝 Quick Reference Card

### Vector Essentials

```cpp
vector<int> v;
v.push_back(x);
v.size();
v[i];
for(auto e : v) { }
sort(v.begin(), v.end());
```

### Set Essentials

```cpp
set<int> s;
s.insert(x);
s.erase(x);
s.count(x);  // 0 or 1
for(auto e : s) { }
```

### Map Essentials

```cpp
map<int, int> m;
m[key] = value;
m.find(key);
m.erase(key);
for(auto p : m) { p.first; p.second; }
```

### Stack/Queue Essentials

```cpp
stack<int> st;
st.push(x);
st.top();
st.pop();
queue<int> q;
q.push(x);
q.front();
q.pop();
```

---

**Last Updated**: May 28, 2026  
**Total Concepts Covered**: 50+ STL concepts
**Difficulty**: Beginner to Intermediate
Remember: STL is your friend in DSA. Master these containers and algorithms, and half your DSA battle is won! 🚀
