---
slug: javascript-co-ban-bai-06
url: /posts/javascript-co-ban-bai-06/
title: "JavaScript Cơ Bản - Bài 06: Toán Tử Gán Và Toán Tử So Sánh"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về toán tử gán và toán tử so sánh trong JavaScript - cách sử dụng, sự khác biệt giữa == và === và các ví dụ thực tế"
---

# JavaScript Cơ Bản - Bài 06: Toán Tử Gán Và Toán Tử So Sánh

Trong bài học này, chúng ta sẽ tìm hiểu về hai nhóm toán tử quan trọng trong JavaScript: toán tử gán và toán tử so sánh. Đây là những kiến thức cơ bản nhưng cực kỳ quan trọng trong lập trình.

## Video Hướng Dẫn

{{< youtube N2QqCxjz-hY >}}

## 1. Toán Tử Gán (Assignment Operators)

### Khái niệm cơ bản

Toán tử gán `=` được sử dụng để gán giá trị cho biến. Đây là toán tử cơ bản nhất mà chúng ta sử dụng hàng ngày.

```javascript
let a = 5;     // Gán giá trị 5 cho biến a
let b = 10;    // Gán giá trị 10 cho biến b
a = b;         // Giờ a sẽ có giá trị là 10
```

### Gán nhiều biến cùng lúc

JavaScript cho phép gán giá trị cho nhiều biến trong một dòng:

```javascript
let x, y, z;
x = y = z = 20;  // Tất cả đều có giá trị 20

console.log(x);  // 20
console.log(y);  // 20
console.log(z);  // 20
```

## 2. Toán Tử Gán Mở Rộng (Compound Assignment Operators)

Các toán tử gán mở rộng giúp code ngắn gọn và dễ đọc hơn:

### Danh sách toán tử gán mở rộng

| Toán tử | Ý nghĩa | Tương đương |
|---------|---------|-------------|
| `+=` | Cộng và gán | `a = a + 3` |
| `-=` | Trừ và gán | `a = a - 2` |
| `*=` | Nhân và gán | `a = a * 2` |
| `/=` | Chia và gán | `a = a / 2` |
| `%=` | Chia lấy dư và gán | `a = a % 2` |

### Ví dụ minh họa

```javascript
let a = 8;

// Sử dụng toán tử gán mở rộng
a += 5;   // a = a + 5 → a = 13
console.log(a);  // 13

a *= 2;   // a = a * 2 → a = 26
console.log(a);  // 26

a -= 6;   // a = a - 6 → a = 20
console.log(a);  // 20

a /= 4;   // a = a / 4 → a = 5
console.log(a);  // 5

a %= 3;   // a = a % 3 → a = 2
console.log(a);  // 2
```

### Ví dụ với chuỗi

```javascript
let greeting = "Xin chào";
greeting += " các bạn!";  // Nối chuỗi
console.log(greeting);    // "Xin chào các bạn!"

let name = "Long";
name += " Đoàn";
console.log(name);        // "Long Đoàn"
```

## 3. Toán Tử So Sánh (Comparison Operators)

### Khái niệm

Toán tử so sánh được sử dụng để so sánh hai giá trị và trả về kết quả boolean (`true` hoặc `false`).

### Bảng toán tử so sánh

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|--------|---------|
| `==` | Bằng (so sánh giá trị) | `3 == "3"` | `true` |
| `===` | Bằng tuyệt đối (giá trị + kiểu) | `3 === "3"` | `false` |
| `!=` | Không bằng | `3 != 4` | `true` |
| `!==` | Không bằng tuyệt đối | `3 !== "3"` | `true` |
| `>` | Lớn hơn | `5 > 2` | `true` |
| `<` | Nhỏ hơn | `2 < 4` | `true` |
| `>=` | Lớn hơn hoặc bằng | `4 >= 4` | `true` |
| `<=` | Nhỏ hơn hoặc bằng | `2 <= 4` | `true` |

## 4. Sự Khác Biệt Giữa == và ===

### So sánh bằng (==)

Toán tử `==` chỉ so sánh giá trị, không quan tâm đến kiểu dữ liệu:

```javascript
console.log(6 == "6");     // true (số 6 bằng chuỗi "6")
console.log(true == 1);    // true (true được chuyển thành 1)
console.log(false == 0);   // true (false được chuyển thành 0)
console.log(null == undefined); // true
```

### So sánh bằng tuyệt đối (===)

Toán tử `===` so sánh cả giá trị và kiểu dữ liệu:

```javascript
console.log(6 === "6");    // false (số khác chuỗi)
console.log(true === 1);   // false (boolean khác number)
console.log(false === 0);  // false (boolean khác number)
console.log(null === undefined); // false
```

### Ví dụ chi tiết

```javascript
// So sánh số và chuỗi
let num = 10;
let str = "10";

console.log(num == str);   // true (chuyển đổi kiểu)
console.log(num === str);  // false (khác kiểu)

// So sánh với null và undefined
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// So sánh với boolean
console.log(0 == false);   // true
console.log(0 === false);  // false
```

## 5. Toán Tử Không Bằng

### Không bằng (!=)

```javascript
console.log(3 != 4);       // true
console.log(3 != "3");     // false (chuyển đổi kiểu)
console.log(0 != false);   // false (chuyển đổi kiểu)
```

### Không bằng tuyệt đối (!==)

```javascript
console.log(3 !== "3");    // true (khác kiểu)
console.log(0 !== false);  // true (khác kiểu)
console.log(5 !== 5);      // false (cùng giá trị và kiểu)
```

## 6. So Sánh Số

### Ví dụ với các toán tử so sánh số

```javascript
let a = 15;
let b = 10;
let c = 15;

console.log(a > b);    // true
console.log(a < b);    // false
console.log(a >= c);   // true
console.log(b <= a);   // true

// So sánh với số âm
let x = -5;
let y = -10;
console.log(x > y);    // true (-5 lớn hơn -10)
```

### So sánh với số thập phân

```javascript
let price1 = 19.99;
let price2 = 20.00;

console.log(price1 < price2);   // true
console.log(price1 === 19.99);  // true
console.log(price2 === 20);     // true
```

## 7. Ứng Dụng Thực Tế

### Ví dụ 1: Kiểm tra mật khẩu

```javascript
let password = "abc123";
let inputPassword = "abc123";

if (password === inputPassword) {
    console.log("Đăng nhập thành công!");
} else {
    console.log("Sai mật khẩu!");
}
```

### Ví dụ 2: Kiểm tra tuổi

```javascript
let age = 18;

if (age >= 18) {
    console.log("Bạn đã đủ tuổi trưởng thành");
} else {
    console.log("Bạn chưa đủ tuổi trưởng thành");
}
```

### Ví dụ 3: So sánh điểm số

```javascript
let score1 = 85;
let score2 = 90;

if (score1 > score2) {
    console.log("Điểm số 1 cao hơn");
} else if (score1 < score2) {
    console.log("Điểm số 2 cao hơn");
} else {
    console.log("Hai điểm số bằng nhau");
}
```

### Ví dụ 4: Validation form

```javascript
let username = "admin";
let email = "admin@example.com";

// Kiểm tra username không rỗng
if (username !== "") {
    console.log("Username hợp lệ");
}

// Kiểm tra email có chứa @ không
if (email.includes("@")) {
    console.log("Email có định dạng hợp lệ");
}
```

## 8. Best Practices (Thực Hành Tốt)

### 1. Ưu tiên sử dụng === thay vì ==

```javascript
// Không nên
if (value == "10") {
    // code
}

// Nên
if (value === "10") {
    // code
}
```

### 2. Kiểm tra kiểu dữ liệu trước khi so sánh

```javascript
let userInput = "25";
let targetAge = 25;

// Chuyển đổi kiểu trước khi so sánh
if (Number(userInput) === targetAge) {
    console.log("Tuổi đúng!");
}
```

### 3. Sử dụng toán tử gán mở rộng

```javascript
// Không nên
counter = counter + 1;
total = total + price;

// Nên
counter += 1;
total += price;
```

## 9. Bẫy Phổ Biến (Common Pitfalls)

### 1. Nhầm lẫn giữa = và ==

```javascript
let x = 5;

// Sai: gán giá trị thay vì so sánh
if (x = 10) {  // Luôn trả về true
    console.log("Này sẽ luôn chạy!");
}

// Đúng: so sánh
if (x == 10) {  // Trả về false
    console.log("Này sẽ không chạy");
}
```

### 2. So sánh với null và undefined

```javascript
let data = null;

// Cẩn thận với ==
console.log(data == undefined);  // true
console.log(data === undefined); // false

// Kiểm tra an toàn
if (data !== null && data !== undefined) {
    // Xử lý data
}
```

### 3. So sánh chuỗi và số

```javascript
let userAge = "25";  // Từ input form

// Có thể gây nhầm lẫn
if (userAge > 18) {  // So sánh chuỗi!
    console.log("Có thể không như mong đợi");
}

// Nên chuyển đổi kiểu
if (Number(userAge) > 18) {
    console.log("Đúng cách");
}
```

## 10. Bài Tập Thực Hành

### Bài tập 1: Calculator đơn giản

```javascript
let a = 10;
let b = 3;

// Sử dụng toán tử gán mở rộng
console.log("a ban đầu:", a);
a += b;
console.log("a += b:", a);
a -= b;
console.log("a -= b:", a);
a *= b;
console.log("a *= b:", a);
a /= b;
console.log("a /= b:", a);
```

### Bài tập 2: So sánh giá trị

```javascript
function compareValues(val1, val2) {
    console.log(`${val1} == ${val2}:`, val1 == val2);
    console.log(`${val1} === ${val2}:`, val1 === val2);
    console.log(`${val1} != ${val2}:`, val1 != val2);
    console.log(`${val1} !== ${val2}:`, val1 !== val2);
}

// Test với các giá trị khác nhau
compareValues(5, "5");
compareValues(true, 1);
compareValues(null, undefined);
```

## Tóm Tắt

### Toán tử gán:
- `=`: Gán giá trị cơ bản
- `+=`, `-=`, `*=`, `/=`, `%=`: Gán mở rộng giúp code ngắn gọn

### Toán tử so sánh:
- `==`: So sánh giá trị (có chuyển đổi kiểu)
- `===`: So sánh giá trị và kiểu (chặt chẽ)
- `!=`, `!==`: Phủ định của == và ===
- `>`, `<`, `>=`, `<=`: So sánh số học

### Lời khuyên:
- Ưu tiên sử dụng `===` thay vì `==`
- Sử dụng toán tử gán mở rộng để code ngắn gọn
- Cẩn thận với việc chuyển đổi kiểu tự động

Hiểu rõ các toán tử này sẽ giúp bạn viết code JavaScript hiệu quả và tránh được nhiều lỗi phổ biến!
