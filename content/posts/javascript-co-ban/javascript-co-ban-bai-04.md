---
slug: javascript-co-ban-bai-04
url: /posts/javascript-co-ban-bai-04/
title: "JavaScript Cơ Bản - Bài 04: Biến và Hằng Số"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Học về Variables và Constants trong JavaScript - cách khai báo, sử dụng và phân biệt giữa let, const và var"
---

# JavaScript Cơ Bản - Bài 04: Biến và Hằng Số

Biến (Variables) và hằng số (Constants) là những khái niệm cốt lõi trong JavaScript. Chúng cho phép lưu trữ và thao tác với dữ liệu. Trong bài này, chúng ta sẽ học cách khai báo, sử dụng và phân biệt các loại biến.

## Video Hướng Dẫn

{{< youtube 5S2UOHZE5M0 >}}

## Variables (Biến) Là Gì?

**Biến** là "container" để lưu trữ dữ liệu. Giá trị của biến có thể thay đổi trong quá trình chương trình chạy.

### Analogy (Ví dụ tương tự)
```javascript
// Biến giống như chiếc hộp có nhãn
let box = "apple";     // Hộp chứa "apple"
box = "orange";        // Thay đổi thành "orange"
box = "banana";        // Thay đổi thành "banana"
```

## Constants (Hằng Số) Là Gì?

**Hằng số** là giá trị không thể thay đổi sau khi được khởi tạo. Sử dụng từ khóa `const` để khai báo.

### Ví dụ cơ bản
```javascript
// Hằng số - không thể thay đổi
const PI = 3.14159;
const COMPANY_NAME = "TechCorp";
const MAX_USERS = 100;

// PI = 3.14;  // ❌ TypeError: Assignment to constant variable
```

## Cách Khai Báo Biến

### 1. Sử dụng `let` (ES6+)
```javascript
// Khai báo biến với let
let userName;              // Khai báo, chưa gán giá trị
let age = 25;             // Khai báo và gán giá trị
let isStudent = true;     // Boolean variable
let score = 85.5;         // Number variable
```

### 2. Sử dụng `var` (Cũ, không khuyến khích)
```javascript
// Khai báo với var (legacy)
var oldStyle = "Cách cũ";
var counter = 0;
```

### 3. Sử dụng `const` (Hằng số)
```javascript
// Khai báo hằng số
const API_URL = "https://api.example.com";
const TAX_RATE = 0.1;
const COLORS = ["red", "green", "blue"];
```

## Quy Tắc Đặt Tên

### ✅ Hợp lệ
```javascript
// Camel case (khuyến khích)
let firstName = "John";
let lastName = "Doe";
let userAge = 30;

// Snake case
let user_name = "Jane";
let phone_number = "123456789";

// Với số và ký tự đặc biệt
let user1 = "First user";
let $element = document.getElementById("box");
let _private = "Internal use";
```

### ❌ Không hợp lệ
```javascript
let 123name = "Error";        // Không bắt đầu bằng số
let my-name = "Error";        // Không có dấu gạch ngang
let my name = "Error";        // Không có khoảng trắng
let class = "Error";          // Không dùng keyword
```

### Naming Conventions
```javascript
// Constants - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = "https://api.com";

// Variables - camelCase
let currentUser = null;
let isLoggedIn = false;
let shoppingCart = [];

// Boolean variables - is/has/can prefix
let isActive = true;
let hasPermission = false;
let canEdit = true;
```

## Khởi Tạo Biến

### 1. Khai báo và gán cùng lúc
```javascript
let name = "JavaScript";      // String
let version = 2023;          // Number
let isModern = true;         // Boolean
let features = ["ES6", "ES2023"];  // Array
```

### 2. Khai báo trước, gán sau
```javascript
let result;              // undefined
let userInput;           // undefined

// Gán giá trị sau
result = calculateSum(10, 20);
userInput = prompt("Nhập tên của bạn:");
```

### 3. Khai báo nhiều biến
```javascript
// Cách 1: Từng dòng
let x = 10;
let y = 20;
let z = 30;

// Cách 2: Cùng một dòng
let a = 1, b = 2, c = 3;

// Cách 3: Nhiều dòng, cùng từ khóa
let firstName = "John",
    lastName = "Doe",
    age = 25;
```

## Data Types (Kiểu Dữ Liệu)

### 1. Primitive Types
```javascript
// String
let message = "Hello World";
let template = `Welcome ${message}`;

// Number
let integer = 42;
let decimal = 3.14;
let negative = -10;

// Boolean
let isTrue = true;
let isFalse = false;

// Undefined
let notAssigned;
console.log(notAssigned);  // undefined

// Null
let emptyValue = null;

// Symbol (ES6)
let symbol = Symbol('id');
```

### 2. Reference Types
```javascript
// Array
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

// Object
let person = {
    name: "John",
    age: 30,
    isEmployed: true
};

// Function
let greet = function(name) {
    return `Hello, ${name}!`;
};
```

## Type Checking
```javascript
let value = 42;

console.log(typeof value);        // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (quirk!)
console.log(typeof [1, 2, 3]);    // "object"
console.log(typeof {a: 1});       // "object"
```

## Const với Objects và Arrays

### Objects với const
```javascript
const person = {
    name: "John",
    age: 30
};

// ✅ Có thể thay đổi properties
person.name = "Jane";
person.age = 25;
person.city = "New York";

console.log(person);  // {name: "Jane", age: 25, city: "New York"}

// ❌ Không thể reassign
// person = {};  // TypeError
```

### Arrays với const
```javascript
const colors = ["red", "green", "blue"];

// ✅ Có thể thay đổi elements
colors[0] = "yellow";
colors.push("purple");
colors.pop();

console.log(colors);  // ["yellow", "green", "blue"]

// ❌ Không thể reassign
// colors = [];  // TypeError
```

## Scope (Phạm Vi)

### Global Scope
```javascript
// Global variables
let globalVar = "Truy cập được ở mọi nơi";
const GLOBAL_CONSTANT = "Hằng số global";

function showGlobal() {
    console.log(globalVar);        // OK
    console.log(GLOBAL_CONSTANT);  // OK
}
```

### Function Scope
```javascript
function demonstrateScope() {
    let functionVar = "Chỉ trong function";
    const FUNCTION_CONST = "Hằng số function";
    
    console.log(functionVar);      // OK
    console.log(FUNCTION_CONST);   // OK
}

// console.log(functionVar);      // ReferenceError
// console.log(FUNCTION_CONST);   // ReferenceError
```

### Block Scope
```javascript
{
    let blockVar = "Chỉ trong block";
    const BLOCK_CONST = "Hằng số block";
    
    console.log(blockVar);      // OK
    console.log(BLOCK_CONST);   // OK
}

// console.log(blockVar);      // ReferenceError
// console.log(BLOCK_CONST);   // ReferenceError
```

## Hoisting

### Let và Const
```javascript
// ❌ ReferenceError - Temporal Dead Zone
console.log(x);  // Cannot access 'x' before initialization
let x = 5;

console.log(y);  // Cannot access 'y' before initialization
const y = 10;
```

### Var (Legacy behavior)
```javascript
// Hoisting với var
console.log(z);  // undefined (not error)
var z = 15;

// Tương đương với:
// var z;
// console.log(z);  // undefined
// z = 15;
```

## Best Practices

### 1. Ưu tiên const, sau đó let
```javascript
// ✅ Tốt - sử dụng const khi có thể
const PI = 3.14159;
const users = [];
const config = {
    timeout: 5000,
    retries: 3
};

// Chỉ dùng let khi cần thay đổi
let counter = 0;
let currentPage = 1;
```

### 2. Đặt tên có ý nghĩa
```javascript
// ❌ Tên không rõ nghĩa
let d = new Date();
let u = users.length;
let x = price * 0.1;

// ✅ Tên rõ nghĩa
let currentDate = new Date();
let userCount = users.length;
let taxAmount = price * TAX_RATE;
```

### 3. Nhóm khai báo
```javascript
// ✅ Nhóm theo logic
// API Configuration
const API_BASE_URL = "https://api.example.com";
const API_TIMEOUT = 5000;
const API_KEY = "your-api-key";

// User Interface
let isLoading = false;
let currentTab = "home";
let selectedItems = [];

// Calculations
let subtotal = 0;
let taxAmount = 0;
let totalAmount = 0;
```

## Ví Dụ Thực Tế

### 1. Shopping Cart
```javascript
// Shopping cart constants
const TAX_RATE = 0.08;
const SHIPPING_COST = 10;
const FREE_SHIPPING_THRESHOLD = 50;

// Shopping cart variables
let items = [];
let subtotal = 0;
let tax = 0;
let shipping = 0;
let total = 0;

// Add item function
function addItem(name, price, quantity) {
    const item = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity
    };
    
    items.push(item);
    calculateTotal();
}

function calculateTotal() {
    // Calculate subtotal
    subtotal = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    // Calculate tax
    tax = subtotal * TAX_RATE;
    
    // Calculate shipping
    shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    
    // Calculate total
    total = subtotal + tax + shipping;
    
    displayCart();
}

function displayCart() {
    console.log("=== SHOPPING CART ===");
    console.log(`Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`Tax: $${tax.toFixed(2)}`);
    console.log(`Shipping: $${shipping.toFixed(2)}`);
    console.log(`Total: $${total.toFixed(2)}`);
}
```

### 2. User Management
```javascript
// User constants
const MIN_PASSWORD_LENGTH = 8;
const MAX_LOGIN_ATTEMPTS = 3;
const SESSION_TIMEOUT = 30; // minutes

// User variables
let currentUser = null;
let isLoggedIn = false;
let loginAttempts = 0;
let lastActivity = null;

// User object
const createUser = (username, email, password) => {
    return {
        id: Date.now(),
        username: username,
        email: email,
        password: password, // In reality, this should be hashed
        createdAt: new Date(),
        isActive: true,
        loginCount: 0
    };
};
```

## Bài Tập Thực Hành

### Bài 1: Temperature Converter
Tạo chương trình chuyển đổi nhiệt độ với constants và variables.

### Bài 2: Personal Information
Tạo object chứa thông tin cá nhân và functions để cập nhật.

### Bài 3: Calculator
Tạo calculator đơn giản với constants cho operations.

## Common Mistakes

### 1. Reassigning const
```javascript
// ❌ Lỗi
const name = "John";
name = "Jane";  // TypeError

// ✅ Đúng
let name = "John";
name = "Jane";  // OK
```

### 2. Using var instead of let/const
```javascript
// ❌ Không khuyến khích
var counter = 0;
var message = "Hello";

// ✅ Modern approach
let counter = 0;
const message = "Hello";
```

### 3. Undefined variables
```javascript
// ❌ Lỗi
console.log(undefinedVar);  // ReferenceError

// ✅ Đúng
let definedVar = "value";
console.log(definedVar);    // "value"
```

## Kết Luận

🎉 **Bạn đã học được:**
- ✅ Cách khai báo biến với `let`, `const`, và `var`
- ✅ Phân biệt Variables và Constants
- ✅ Quy tắc đặt tên và naming conventions
- ✅ Data types và type checking
- ✅ Scope và hoisting
- ✅ Best practices và common mistakes

**Bước tiếp theo**: Tìm hiểu sâu hơn về sự khác biệt giữa `var` và `let`!

---

*Variables và Constants là nền tảng của mọi chương trình JavaScript. Hãy thực hành nhiều để thành thạo!*
