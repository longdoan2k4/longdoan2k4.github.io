---
slug: javascript-co-ban-bai-03
url: /posts/javascript-co-ban-bai-03/
title: "JavaScript Cơ Bản - Bài 03: Chú Thích, Keywords và Khối Lệnh"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Học về comments, từ khóa dành riêng và cách tổ chức code bằng khối lệnh trong JavaScript"
---

# JavaScript Cơ Bản - Bài 03: Chú Thích, Keywords và Khối Lệnh

Trong bài này, chúng ta sẽ học những kiến thức nền tảng quan trọng: cách viết chú thích, hiểu về từ khóa dành riêng và tổ chức code bằng khối lệnh. Đây là những kỹ năng cần thiết cho mọi JavaScript developer.

## Video Hướng Dẫn

{{< youtube iKKLyNxapP8 >}}

## Comments (Chú Thích)

Comments là những dòng text giải thích code, không được thực thi bởi JavaScript engine. Chúng rất quan trọng để code dễ hiểu và bảo trì.

### 1. Single-line Comments (// )
```javascript
// Đây là comment một dòng
console.log("Hello World");  // Comment ở cuối dòng

// Dùng để giải thích code
let age = 25;  // Tuổi của người dùng
```

### 2. Multi-line Comments (/* */)
```javascript
/*
Đây là comment nhiều dòng
Có thể viết mô tả dài
Thông tin về tác giả, ngày tạo, v.v.
*/
console.log("JavaScript cơ bản");

/*
Hàm tính tổng hai số
Input: a, b (numbers)
Output: tổng của a và b
*/
function sum(a, b) {
    return a + b;
}
```

### 3. JSDoc Comments
```javascript
/**
 * Tính diện tích hình chữ nhật
 * @param {number} width - Chiều rộng
 * @param {number} height - Chiều cao
 * @returns {number} Diện tích hình chữ nhật
 */
function calculateArea(width, height) {
    return width * height;
}
```

## Best Practices cho Comments

### ✅ Comments tốt
```javascript
// Kiểm tra user đã đăng nhập chưa
if (user.isLoggedIn) {
    // Hiển thị dashboard
    showDashboard();
}

// Constants cho API endpoints
const API_BASE_URL = "https://api.example.com";  // Base URL cho tất cả API calls

/*
Thuật toán sắp xếp bubble sort
Time complexity: O(n²)
Space complexity: O(1)
*/
function bubbleSort(arr) {
    // Implementation here
}
```

### ❌ Comments không tốt
```javascript
// Khai báo biến a
let a = 5;  // a bằng 5

// In ra màn hình
console.log(a);  // console.log a

// Cộng 1 vào a
a = a + 1;  // a cộng 1
```

## Keywords (Từ Khóa Dành Riêng)

JavaScript có những từ khóa dành riêng không thể dùng làm tên biến, hàm, hay identifier.

### Reserved Keywords ES6+
```javascript
// Các từ khóa cơ bản
break       case        catch       class       const
continue    debugger    default     delete      do
else        export      extends     finally     for
function    if          import      in          instanceof
let         new         return      super       switch
this        throw       try         typeof      var
void        while       with        yield

// Các từ khóa strict mode
implements  interface   package     private     protected
public      static

// Literals
true        false       null        undefined
```

### Ví dụ lỗi khi dùng keywords
```javascript
// ❌ Sai - dùng từ khóa làm tên biến
let if = 5;           // SyntaxError
let class = "JS";     // SyntaxError
let function = true;  // SyntaxError

// ✅ Đúng - dùng tên hợp lệ
let condition = 5;
let className = "JS";
let isFunction = true;
```

### Tên biến hợp lệ
```javascript
// ✅ Hợp lệ
let userName;
let _private;
let $element;
let myAge2023;
let firstName;

// ❌ Không hợp lệ
let 123abc;      // Không bắt đầu bằng số
let my-name;     // Có dấu gạch ngang
let my name;     // Có space
let @username;   // Ký tự đặc biệt không cho phép
```

## Khối Lệnh (Code Blocks)

Khối lệnh là nhóm các statements được bao quanh bởi dấu ngoặc nhọn `{}`.

### 1. Basic Blocks
```javascript
{
    // Đây là một khối lệnh
    let message = "Hello";
    console.log(message);
}

{
    // Khối lệnh khác
    let number = 42;
    console.log(number);
}
```

### 2. Function Blocks
```javascript
function greet() {
    // Khối lệnh của function
    let greeting = "Xin chào!";
    console.log(greeting);
    return greeting;
}
```

### 3. Conditional Blocks
```javascript
let age = 18;

if (age >= 18) {
    // Khối lệnh if
    console.log("Bạn đã đủ tuổi");
    console.log("Có thể tham gia");
} else {
    // Khối lệnh else
    console.log("Bạn chưa đủ tuổi");
    console.log("Vui lòng chờ");
}
```

### 4. Loop Blocks
```javascript
for (let i = 0; i < 3; i++) {
    // Khối lệnh vòng lặp
    console.log("Lần thứ:", i + 1);
    console.log("Giá trị i:", i);
}
```

## Block Scope

Từ ES6, các biến khai báo với `let` và `const` có block scope.

### Let và Block Scope
```javascript
{
    let blockVariable = "Trong block";
    console.log(blockVariable);  // OK
}

console.log(blockVariable);  // ReferenceError: blockVariable is not defined
```

### Var vs Let
```javascript
// Var không có block scope
{
    var varVariable = "Var variable";
}
console.log(varVariable);  // OK - có thể truy cập

// Let có block scope
{
    let letVariable = "Let variable";
}
console.log(letVariable);  // Error - không thể truy cập
```

### Practical Example
```javascript
function demonstrateScope() {
    console.log("=== DEMO BLOCK SCOPE ===");
    
    // Global scope trong function
    let globalInFunction = "Global trong function";
    
    if (true) {
        // Block scope
        let blockScoped = "Chỉ có trong block";
        console.log(globalInFunction);  // OK
        console.log(blockScoped);       // OK
    }
    
    console.log(globalInFunction);  // OK
    // console.log(blockScoped);    // Error nếu uncomment
}
```

## Nested Blocks (Khối Lệnh Lồng Nhau)

```javascript
function processUser(user) {
    // Outer block
    console.log("Xử lý user:", user.name);
    
    if (user.age >= 18) {
        // Nested block level 1
        console.log("User đã trưởng thành");
        
        if (user.hasLicense) {
            // Nested block level 2
            console.log("Có thể lái xe");
            
            if (user.hasInsurance) {
                // Nested block level 3
                console.log("Đã có bảo hiểm");
                console.log("Hoàn tất kiểm tra");
            }
        }
    } else {
        // Alternative block
        console.log("User chưa đủ tuổi");
    }
}
```

## Code Organization Best Practices

### 1. Indentation (Thụt lề)
```javascript
// ✅ Tốt - thụt lề nhất quán
function calculateTotal(items) {
    let total = 0;
    
    for (let item of items) {
        if (item.price > 0) {
            total += item.price;
        }
    }
    
    return total;
}

// ❌ Xấu - không có thụt lề
function calculateTotal(items) {
let total = 0;
for (let item of items) {
if (item.price > 0) {
total += item.price;
}
}
return total;
}
```

### 2. Spacing và Line Breaks
```javascript
// ✅ Tốt - có khoảng cách hợp lý
function processOrder(order) {
    // Validate input
    if (!order || !order.items) {
        throw new Error("Invalid order");
    }
    
    // Calculate total
    let total = 0;
    for (let item of order.items) {
        total += item.price * item.quantity;
    }
    
    // Apply discount
    if (order.discountCode) {
        total *= 0.9;  // 10% discount
    }
    
    return total;
}
```

### 3. Comments và Documentation
```javascript
/**
 * User management utilities
 * Author: Doan Duc Long
 * Created: 2025-10-20
 */

class UserManager {
    /**
     * Tạo user mới
     * @param {string} name - Tên user
     * @param {number} age - Tuổi user
     * @returns {Object} User object
     */
    createUser(name, age) {
        // Validate input parameters
        if (!name || age < 0) {
            throw new Error("Invalid parameters");
        }
        
        // Create user object
        return {
            name: name,
            age: age,
            createdAt: new Date(),
            isActive: true
        };
    }
}
```

## Common Mistakes (Lỗi Thường Gặp)

### 1. Thiếu dấu ngoặc nhọn
```javascript
// ❌ Dễ gây lỗi
if (condition)
    console.log("True");
    console.log("This always runs!");  // Luôn chạy

// ✅ An toàn hơn
if (condition) {
    console.log("True");
    console.log("Only runs when true");
}
```

### 2. Nested quá sâu
```javascript
// ❌ Quá nhiều level
if (user) {
    if (user.isActive) {
        if (user.hasPermission) {
            if (user.subscription) {
                // Code here
            }
        }
    }
}

// ✅ Early return pattern
if (!user || !user.isActive) return;
if (!user.hasPermission) return;
if (!user.subscription) return;

// Code here
```

## Bài Tập Thực Hành

### Bài 1: Comments
Viết chương trình tính BMI với comments đầy đủ.

### Bài 2: Block Scope
Tạo ví dụ về sự khác biệt giữa var và let trong blocks.

### Bài 3: Code Organization
Refactor một đoạn code không có comments và indentation.

## Kết Luận

🎉 **Bạn đã học được:**
- ✅ Cách viết comments hiệu quả
- ✅ Keywords và cách đặt tên hợp lệ
- ✅ Block scope và organization
- ✅ Best practices cho clean code
- ✅ Tránh các lỗi thường gặp

**Bước tiếp theo**: Học về biến và hằng số trong JavaScript!

---

*Comments tốt và code tổ chức rõ ràng là nền tảng của lập trình professional. Hãy thực hành thường xuyên!*
