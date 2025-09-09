# JavaScript ES6 Concepts

### 1) Difference between var, let, and const
- `var` is the old way of declaring a variable. You can change its value and even declare it again. It works inside the whole function.
- `let` is a newer way. You can change its value but **cannot declare it again** in the same block. Works inside `{ }`.
- `const` is for constants. You **cannot change its value** or declare it again. Must assign value when you create it.

---

### 2) Difference between map(), forEach(), and filter()
- `forEach()` goes through each item in an array and runs a function. It **does not give back a new array**.
- `map()` goes through each item, changes it, and **returns a new array** with the changed items.
- `filter()` goes through each item and keeps only the items that pass a test. **Returns a new array** with those items.

Example:
# JavaScript Array Methods: forEach, map, filter

This is a simple example showing how `forEach`, `map`, and `filter` work in JavaScript.

```javascript
// Example array
const numbers = [1, 2, 3, 4, 5];

// 1) forEach() - runs a function for each item, does NOT return a new array
console.log("forEach:");
numbers.forEach(num => console.log(num));
// Output:
// 1
// 2
// 3
// 4
// 5

// 2) map() - transforms each item and returns a NEW array
const squares = numbers.map(num => num * num);
console.log("map (squares):", squares);
// Output: [1, 4, 9, 16, 25]

// 3) filter() - keeps only items that pass a test, returns a NEW array
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("filter (even numbers):", evenNumbers);
// Output: [2, 4]


### 3) Arrow Functions in ES6

Arrow functions are a shorter way to write functions in JavaScript.

**Example:**

```javascript
// Old way
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5


### 4) Destructuring Assignment in ES6

Destructuring allows to extract values from arrays or objects into separate variables easily.

**Array Destructuring:**

```javascript
const numbers = [1, 2, 3];
const [a, b] = numbers; // a = 1, b = 2
console.log(a, b); // 1 2



### 5) Template Literals in ES6

Template literals are strings written with backticks (`) that easily include variables and expressions.

**Example:**

```javascript
const name = "Shohan";
const age = 30;

// Using template literal
const message = `My name is ${name} and I am ${age} years old.`;
console.log(message); // My name is Shohan and I am 30 years old.

// Old way using string concatenation
const oldMessage = "My name is " + name + " and I am " + age + " years old.";
console.log(oldMessage); // Same output

