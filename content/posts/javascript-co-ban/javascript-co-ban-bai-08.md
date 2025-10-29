---
slug: javascript-co-ban-bai-08
url: /posts/javascript-co-ban-bai-08/
title: "JavaScript Cơ Bản - Bài 08: Kiểu Dữ Liệu Số (Number)"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về kiểu dữ liệu số trong JavaScript - số nguyên, số thực, Infinity, NaN và các toán tử số học cơ bản"
---

# JavaScript Cơ Bản - Bài 08: Kiểu Dữ Liệu Số (Number)

Số (Number) là một trong những kiểu dữ liệu cơ bản và quan trọng nhất trong JavaScript. Nó được sử dụng trong tất cả các phép toán, xử lý logic và tính toán. Hãy cùng khám phá chi tiết về kiểu dữ liệu này!

## Video Hướng Dẫn

{{< youtube bynuI8B2uho >}}

## 1. Giới Thiệu Về Kiểu Number

### Đặc điểm chung

JavaScript sử dụng một kiểu số duy nhất `Number` để biểu diễn cả số nguyên và số thực (khác với nhiều ngôn ngữ lập trình khác có phân biệt `int`, `float`, `double`).

```javascript
// Tất cả đều là kiểu Number
let integer = 42;           // Số nguyên
let decimal = 3.14159;      // Số thực  
let negative = -25;         // Số âm
let zero = 0;              // Số 0

console.log(typeof integer); // "number"
console.log(typeof decimal); // "number"
console.log(typeof negative); // "number"
```

### Phạm vi giá trị

```javascript
// Giá trị lớn nhất và nhỏ nhất
console.log(Number.MAX_VALUE);        // 1.7976931348623157e+308
console.log(Number.MIN_VALUE);        // 5e-324
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

## 2. Cách Khai Báo Số

### Khai báo cơ bản

```javascript
// Các cách khai báo số
let a = 10;              // Số nguyên dương
let b = -5;              // Số nguyên âm
let c = 3.14;            // Số thực
let d = 0.5;             // Số thực nhỏ hơn 1
let e = 2.5e3;           // Ký hiệu khoa học (2500)
let f = 1.5e-2;          // Ký hiệu khoa học (0.015)
```

### Các hệ số khác nhau

```javascript
// Hệ thập phân (mặc định)
let decimal = 255;

// Hệ nhị phân (bắt đầu với 0b)
let binary = 0b11111111;  // 255 trong hệ nhị phân
console.log(binary);      // 255

// Hệ bát phân (bắt đầu với 0o)
let octal = 0o377;        // 255 trong hệ bát phân
console.log(octal);       // 255

// Hệ thập lục phân (bắt đầu với 0x)
let hex = 0xFF;           // 255 trong hệ thập lục phân
console.log(hex);         // 255
```

## 3. Giá Trị Đặc Biệt

### Infinity (Vô cùng)

```javascript
// Infinity xuất hiện khi:
console.log(1 / 0);           // Infinity
console.log(-1 / 0);          // -Infinity
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity

// Kiểm tra Infinity
let result = 1 / 0;
console.log(isFinite(result));     // false
console.log(result === Infinity);  // true

// Phép toán với Infinity
console.log(Infinity + 1);     // Infinity
console.log(Infinity * 2);     // Infinity
console.log(Infinity / 2);     // Infinity
```

### NaN (Not a Number)

```javascript
// NaN xuất hiện khi phép toán không hợp lệ
console.log("abc" * 2);        // NaN
console.log(0 / 0);            // NaN
console.log(Math.sqrt(-1));    // NaN
console.log(parseInt("hello")); // NaN

// Kiểm tra NaN
let invalidNumber = "abc" * 2;
console.log(isNaN(invalidNumber));        // true
console.log(Number.isNaN(invalidNumber)); // true (chính xác hơn)

// Đặc điểm của NaN
console.log(NaN === NaN);      // false (!)
console.log(NaN == NaN);       // false (!)

// Vì vậy phải dùng hàm kiểm tra
console.log(Number.isNaN(NaN)); // true
```

### So sánh isNaN() và Number.isNaN()

```javascript
// isNaN() - ép kiểu trước khi kiểm tra
console.log(isNaN("123"));     // false (ép thành số 123)
console.log(isNaN("hello"));   // true (ép thành NaN)
console.log(isNaN(true));      // false (ép thành số 1)

// Number.isNaN() - kiểm tra chính xác
console.log(Number.isNaN("123"));    // false (không phải NaN)
console.log(Number.isNaN("hello"));  // false (không phải NaN)
console.log(Number.isNaN(NaN));      // true (chỉ NaN mới là NaN)
```

## 4. Toán Tử Số Học

### Toán tử cơ bản

```javascript
let a = 10;
let b = 3;

// Các phép toán cơ bản
console.log(a + b);    // 13 (phép cộng)
console.log(a - b);    // 7  (phép trừ)
console.log(a * b);    // 30 (phép nhân)
console.log(a / b);    // 3.333... (phép chia)
console.log(a % b);    // 1  (chia lấy dư)
console.log(a ** b);   // 1000 (lũy thừa - ES2016)

// Toán tử tăng/giảm
let counter = 5;
console.log(++counter);  // 6 (tăng trước)
console.log(counter++);  // 6 (tăng sau, trả về giá trị cũ)
console.log(counter);    // 7

console.log(--counter);  // 6 (giảm trước)
console.log(counter--);  // 6 (giảm sau, trả về giá trị cũ)
console.log(counter);    // 5
```

### Thứ tự ưu tiên toán tử

```javascript
// Thứ tự ưu tiên: ** > *, /, % > +, -
console.log(2 + 3 * 4);      // 14 (không phải 20)
console.log(2 ** 3 * 4);     // 32 (2^3 * 4 = 8 * 4)
console.log(10 - 5 + 2);     // 7  (từ trái qua phải)

// Sử dụng dấu ngoặc để thay đổi thứ tự
console.log((2 + 3) * 4);    // 20
console.log(2 ** (3 * 4));   // 4096 (2^12)
```

## 5. Chuyển Đổi Kiểu Dữ Liệu

### Chuyển từ chuỗi sang số

```javascript
// Sử dụng Number()
console.log(Number("123"));     // 123
console.log(Number("3.14"));    // 3.14
console.log(Number(""));        // 0
console.log(Number("  42  "));  // 42 (bỏ qua khoảng trắng)
console.log(Number("hello"));   // NaN

// Sử dụng parseInt() - chỉ lấy số nguyên
console.log(parseInt("123"));      // 123
console.log(parseInt("123.45"));   // 123 (bỏ phần thập phân)
console.log(parseInt("123px"));    // 123 (bỏ phần không phải số)
console.log(parseInt("px123"));    // NaN (phải bắt đầu bằng số)

// Sử dụng parseFloat() - lấy số thực
console.log(parseFloat("123.45"));   // 123.45
console.log(parseFloat("123.45px")); // 123.45
console.log(parseFloat("px123.45")); // NaN

// Toán tử + (unary plus)
console.log(+"123");     // 123
console.log(+"3.14");    // 3.14
console.log(+"hello");   // NaN
```

### Chuyển từ boolean sang số

```javascript
console.log(Number(true));   // 1
console.log(Number(false));  // 0
console.log(+true);         // 1
console.log(+false);        // 0
```

### Chuyển từ số sang chuỗi

```javascript
let num = 123;

console.log(num.toString());    // "123"
console.log(String(num));       // "123"
console.log(num + "");          // "123" (nối với chuỗi rỗng)
```

## 6. Precision và Floating Point

### Vấn đề độ chính xác số thực

```javascript
// Vấn đề nổi tiếng của số thực
console.log(0.1 + 0.2);           // 0.30000000000000004 (không phải 0.3!)
console.log(0.1 + 0.2 === 0.3);   // false

// Cách xử lý
console.log((0.1 + 0.2).toFixed(1));  // "0.3"
console.log(+(0.1 + 0.2).toFixed(1)); // 0.3

// Hoặc dùng epsilon để so sánh
function isEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

### Làm tròn số

```javascript
let num = 3.14159;

console.log(num.toFixed(2));      // "3.14" (chuỗi)
console.log(+num.toFixed(2));     // 3.14 (số)
console.log(num.toPrecision(3));  // "3.14" (3 chữ số có nghĩa)
```

## 7. Kiểm Tra Kiểu Số

### Các phương thức kiểm tra

```javascript
// Kiểm tra có phải số không
console.log(typeof 123);          // "number"
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(123.45)); // false

// Kiểm tra số hữu hạn
console.log(Number.isFinite(123));     // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN));     // false

// Kiểm tra số an toàn (safe integer)
console.log(Number.isSafeInteger(123)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false
```

## 8. Ví Dụ Thực Tế

### Tính toán cơ bản

```javascript
// Tính diện tích hình tròn
function calculateCircleArea(radius) {
    if (!Number.isFinite(radius) || radius <= 0) {
        return NaN;
    }
    return Math.PI * radius ** 2;
}

console.log(calculateCircleArea(5));     // 78.54
console.log(calculateCircleArea(-1));    // NaN
console.log(calculateCircleArea("abc")); // NaN
```

### Xử lý tiền tệ

```javascript
function formatCurrency(amount) {
    if (!Number.isFinite(amount)) {
        return "Invalid amount";
    }
    
    return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}

console.log(formatCurrency(1000000));  // "1.000.000 ₫"
console.log(formatCurrency(NaN));      // "Invalid amount"
```

### Validation đầu vào

```javascript
function validateAge(input) {
    // Chuyển đổi đầu vào thành số
    let age = Number(input);
    
    // Kiểm tra tính hợp lệ
    if (Number.isNaN(age)) {
        return { valid: false, message: "Tuổi phải là số" };
    }
    
    if (!Number.isInteger(age)) {
        return { valid: false, message: "Tuổi phải là số nguyên" };
    }
    
    if (age < 0 || age > 150) {
        return { valid: false, message: "Tuổi không hợp lệ" };
    }
    
    return { valid: true, age: age };
}

// Test
console.log(validateAge("25"));     // { valid: true, age: 25 }
console.log(validateAge("25.5"));   // { valid: false, message: "Tuổi phải là số nguyên" }
console.log(validateAge("abc"));    // { valid: false, message: "Tuổi phải là số" }
```

## 9. Lưu Ý Quan Trọng

### 1. So sánh số thực

```javascript
// Sai cách
console.log(0.1 + 0.2 === 0.3); // false

// Đúng cách
function almostEqual(a, b, epsilon = Number.EPSILON) {
    return Math.abs(a - b) < epsilon;
}

console.log(almostEqual(0.1 + 0.2, 0.3)); // true
```

### 2. Kiểm tra NaN

```javascript
// Sai cách
console.log(NaN === NaN); // false

// Đúng cách  
console.log(Number.isNaN(NaN)); // true
```

### 3. Chuyển đổi kiểu an toàn

```javascript
function safeNumber(value) {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : num;
}

console.log(safeNumber("123"));   // 123
console.log(safeNumber("abc"));   // 0
console.log(safeNumber(null));    // 0
```

## 10. Tóm Tắt

### Điểm chính cần nhớ:

1. **JavaScript chỉ có một kiểu số:** `Number` (bao gồm cả số nguyên và số thực)

2. **Giá trị đặc biệt:**
   - `Infinity`: Kết quả chia cho 0 hoặc số quá lớn
   - `NaN`: Kết quả phép toán không hợp lệ

3. **Toán tử số học:** `+`, `-`, `*`, `/`, `%`, `**`

4. **Chuyển đổi kiểu:**
   - `Number()`, `parseInt()`, `parseFloat()`
   - `toString()`, `String()`

5. **Kiểm tra giá trị:**
   - `Number.isNaN()`, `Number.isFinite()`
   - `Number.isInteger()`, `Number.isSafeInteger()`

6. **Vấn đề độ chính xác:** Số thực có thể có sai số, cần xử lý cẩn thận

### Best Practices:

- Sử dụng `Number.isNaN()` thay vì `isNaN()`
- Kiểm tra input trước khi thực hiện phép toán
- Cẩn thận với phép so sánh số thực
- Sử dụng `Number.isFinite()` để kiểm tra số hợp lệ

Hiểu rõ về kiểu dữ liệu Number sẽ giúp bạn tránh được nhiều lỗi phổ biến và xử lý dữ liệu số một cách chính xác trong JavaScript!
