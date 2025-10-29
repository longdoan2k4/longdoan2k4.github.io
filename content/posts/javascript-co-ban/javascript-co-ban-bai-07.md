---
slug: javascript-co-ban-bai-07
url: /posts/javascript-co-ban-bai-07/
title: "JavaScript Cơ Bản - Bài 07: Bài Tập Về Biến"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Củng cố kiến thức về biến trong JavaScript qua các bài tập thực tế về var, let, const và phạm vi biến"
---

# JavaScript Cơ Bản - Bài 07: Bài Tập Về Biến

Bài học này sẽ giúp bạn tổng kết và củng cố kiến thức về biến trong JavaScript thông qua các bài tập thực tế từ kênh Kteam. Chúng ta sẽ cùng nhau phân tích và giải quyết các tình huống phổ biến khi làm việc với biến.

## Video Hướng Dẫn

{{< youtube 3NV9-FnjS94 >}}

## 1. Giới Thiệu

Sau khi đã học về các khái niệm cơ bản về biến (`var`, `let`, `const`), phạm vi biến (scope), và các toán tử, đã đến lúc chúng ta áp dụng những kiến thức này vào thực tế thông qua các bài tập cụ thể.

Các bài tập này sẽ giúp bạn:
- Hiểu rõ hơn về phạm vi biến (scope)
- Phân biệt được sự khác nhau giữa `var`, `let`, và `const`
- Nắm vững cách hoạt động của biến trong các tình huống thực tế
- Vận dụng các toán tử so sánh một cách chính xác

## 2. Bài Tập 1: Phạm Vi Và Giá Trị Biến

### Đề bài

Cho đoạn code sau sử dụng biến `t` và `u` với từ khóa `var` trong một khối code. Hãy dự đoán kết quả khi in ra console trước và sau khi thay đổi giá trị biến trong khối đó.

```javascript
var t = 10;
var u = 20;

console.log("Trước khối code:");
console.log("t =", t);  // ?
console.log("u =", u);  // ?

{
    t = 15;
    u = 25;
    console.log("Trong khối code:");
    console.log("t =", t);  // ?
    console.log("u =", u);  // ?
}

console.log("Sau khối code:");
console.log("t =", t);  // ?
console.log("u =", u);  // ?
```

### Phân tích và đáp án

**Phân tích:**
- Biến `var` có function scope (phạm vi hàm), không có block scope
- Khi thay đổi giá trị trong khối code `{}`, giá trị của biến toàn cục bị ghi đè
- Biến `var` được hoisting (kéo lên đầu) và có thể truy cập từ bất kỳ đâu trong function

**Kết quả:**
```javascript
// Trước khối code:
// t = 10
// u = 20

// Trong khối code:
// t = 15
// u = 25

// Sau khối code:
// t = 15  (giá trị đã bị thay đổi)
// u = 25  (giá trị đã bị thay đổi)
```

### Ví dụ mở rộng

```javascript
var globalVar = "Tôi là biến toàn cục";

function testScope() {
    console.log("1. Đầu function:", globalVar);
    
    {
        globalVar = "Giá trị đã thay đổi";
        console.log("2. Trong block:", globalVar);
    }
    
    console.log("3. Cuối function:", globalVar);
}

testScope();
console.log("4. Ngoài function:", globalVar);

// Kết quả:
// 1. Đầu function: Tôi là biến toàn cục
// 2. Trong block: Giá trị đã thay đổi
// 3. Cuối function: Giá trị đã thay đổi
// 4. Ngoài function: Giá trị đã thay đổi
```

## 3. Bài Tập 2: Phân Biệt Biến Cục Bộ, Toàn Cục Và Hằng Số

### Khái niệm ôn tập

| Loại biến | Từ khóa | Phạm vi | Có thể thay đổi? | Có thể khai báo lại? |
|-----------|---------|---------|-------------------|----------------------|
| **Biến toàn cục** | `var` | Function scope | ✅ | ✅ |
| **Biến cục bộ** | `let` | Block scope | ✅ | ❌ |
| **Hằng số** | `const` | Block scope | ❌ | ❌ |

### Ví dụ thực tế

```javascript
// Biến toàn cục
var globalName = "Đoàn Đức Long";

// Hằng số
const PI = 3.14159;

function demonstrateVariables() {
    console.log("Global name:", globalName);  // Có thể truy cập
    
    // Biến cục bộ trong function
    let localAge = 25;
    
    {
        // Biến cục bộ trong block
        let blockVariable = "Tôi chỉ tồn tại trong block này";
        console.log("Trong block:", blockVariable);
        
        // Có thể truy cập biến từ scope ngoài
        console.log("Local age từ block:", localAge);
        console.log("PI từ block:", PI);
    }
    
    // console.log(blockVariable); // Lỗi! Không thể truy cập
    console.log("Local age:", localAge);  // OK
}

demonstrateVariables();
```

### Bài tập thực hành

```javascript
// Hãy dự đoán kết quả của đoạn code này:
const MAX_USERS = 100;
var currentUsers = 0;

function addUser() {
    let newUserName = "User" + (currentUsers + 1);
    currentUsers++;
    
    if (currentUsers <= MAX_USERS) {
        console.log("Đã thêm:", newUserName);
        console.log("Tổng users:", currentUsers);
    } else {
        console.log("Đã đạt giới hạn tối đa!");
    }
}

// Test
addUser();  // ?
addUser();  // ?
console.log("Users bên ngoài:", currentUsers);  // ?
// console.log("User name:", newUserName);  // Lỗi hay không?
```

## 4. Bài Tập 3: Khai Báo Lại Biến Trong Khối Code

### Đề bài

Ứng dụng khai báo biến `u` và `v` ngoài khối code bằng `var`, sau đó vào trong khối code khai báo lại bằng `let` rồi in ra.

```javascript
var u = "Biến toàn cục u";
var v = "Biến toàn cục v";

console.log("Trước khối code:");
console.log("u:", u);  // ?
console.log("v:", v);  // ?

{
    let u = "Biến cục bộ u";
    let v = "Biến cục bộ v";
    
    console.log("Trong khối code:");
    console.log("u:", u);  // ?
    console.log("v:", v);  // ?
}

console.log("Sau khối code:");
console.log("u:", u);  // ?
console.log("v:", v);  // ?
```

### Phân tích và đáp án

**Phân tích:**
- Trong khối code, biến được khai báo lại bằng `let` tạo ra biến cục bộ mới
- Biến cục bộ này "che" (shadow) biến toàn cục trong phạm vi block
- Ra khỏi khối code, biến toàn cục vẫn giữ nguyên giá trị ban đầu

**Kết quả:**
```javascript
// Trước khối code:
// u: Biến toàn cục u
// v: Biến toàn cục v

// Trong khối code:
// u: Biến cục bộ u
// v: Biến cục bộ v

// Sau khối code:
// u: Biến toàn cục u  (không thay đổi)
// v: Biến toàn cục v  (không thay đổi)
```

### Ví dụ nâng cao

```javascript
var name = "Global Name";
var age = 30;

function demonstrateShadowing() {
    console.log("1. Đầu function:", name, age);
    
    // Khai báo biến local cùng tên
    let name = "Local Name";
    
    console.log("2. Sau khai báo local:", name, age);
    
    {
        let name = "Block Name";
        let age = 25;  // Shadow biến global
        
        console.log("3. Trong block:", name, age);
    }
    
    console.log("4. Sau block:", name, age);
}

demonstrateShadowing();
console.log("5. Global scope:", name, age);

// Kết quả:
// 1. Đầu function: Global Name 30
// 2. Sau khai báo local: Local Name 30
// 3. Trong block: Block Name 25
// 4. Sau block: Local Name 30
// 5. Global scope: Global Name 30
```

## 5. Bài Tập 4: Lưu Ý Về Khai Báo Lại Biến

### Quy tắc khai báo biến

```javascript
// ✅ Được phép
var x = 1;
var x = 2;  // OK với var

// ❌ Không được phép trong cùng scope
let y = 1;
// let y = 2;  // SyntaxError!

// ✅ Được phép trong scope khác nhau
let z = 1;
{
    let z = 2;  // OK - scope khác
    console.log(z);  // 2
}
console.log(z);  // 1
```

### Ví dụ thực tế

```javascript
function demonstrateDeclarationRules() {
    // Case 1: var có thể khai báo lại
    var message = "Tin nhắn 1";
    console.log("Message 1:", message);
    
    var message = "Tin nhắn 2";  // OK
    console.log("Message 2:", message);
    
    // Case 2: let không thể khai báo lại trong cùng scope
    let count = 1;
    console.log("Count:", count);
    
    // let count = 2;  // Lỗi!
    
    // Case 3: Nhưng có thể trong block khác
    {
        let count = 10;  // OK - scope khác
        console.log("Count trong block:", count);
        
        {
            let count = 20;  // OK - scope khác nữa
            console.log("Count trong nested block:", count);
        }
    }
    
    console.log("Count cuối:", count);
}

demonstrateDeclarationRules();
```

### Temporal Dead Zone

```javascript
function demonstrateTemporalDeadZone() {
    console.log("Bắt đầu function");
    
    // console.log(varVariable);  // undefined (hoisting)
    // console.log(letVariable);  // ReferenceError! (TDZ)
    
    var varVariable = "Var value";
    let letVariable = "Let value";
    
    console.log("Var:", varVariable);
    console.log("Let:", letVariable);
}

demonstrateTemporalDeadZone();
```

## 6. Bài Tập 5: Toán Tử So Sánh

### Đề bài

Xác định phép so sánh nào trả về `true` và giải thích kết quả:

```javascript
// Hãy dự đoán kết quả true/false
console.log(5 > 3);          // ?
console.log(5 >= 5);         // ?
console.log("5" == 5);       // ?
console.log("5" === 5);      // ?
console.log(0 == false);     // ?
console.log(0 === false);    // ?
console.log(null == undefined);    // ?
console.log(null === undefined);   // ?
console.log("abc" != "def");       // ?
console.log(10 !== "10");          // ?
```

### Phân tích và đáp án

```javascript
console.log(5 > 3);          // true - 5 lớn hơn 3
console.log(5 >= 5);         // true - 5 bằng 5
console.log("5" == 5);       // true - so sánh giá trị (type coercion)
console.log("5" === 5);      // false - khác kiểu (string vs number)
console.log(0 == false);     // true - false chuyển thành 0
console.log(0 === false);    // false - khác kiểu (number vs boolean)
console.log(null == undefined);    // true - đặc biệt trong JS
console.log(null === undefined);   // false - khác kiểu
console.log("abc" != "def");       // true - khác giá trị
console.log(10 !== "10");          // true - khác kiểu
```

### Bài tập nâng cao về so sánh

```javascript
function compareValues() {
    let testCases = [
        [1, "1"],
        [true, 1],
        [false, 0],
        [[], 0],
        ["", 0],
        [null, 0],
        [undefined, NaN]
    ];
    
    testCases.forEach(([a, b]) => {
        console.log(`${a} == ${b}:`, a == b);
        console.log(`${a} === ${b}:`, a === b);
        console.log("---");
    });
}

compareValues();
```

## 7. Bài Tập Tổng Hợp

### Bài tập 1: Quản lý điểm số

```javascript
// Tạo hệ thống quản lý điểm số đơn giản
const MAX_SCORE = 10;
var studentName = "Nguyễn Văn A";

function calculateGrade() {
    let mathScore = 8.5;
    let literatureScore = 7.0;
    
    {
        let average = (mathScore + literatureScore) / 2;
        
        if (average >= 8) {
            console.log(studentName + " đạt loại Giỏi");
        } else if (average >= 6.5) {
            console.log(studentName + " đạt loại Khá");
        } else {
            console.log(studentName + " cần cố gắng thêm");
        }
        
        // Kiểm tra điểm có hợp lệ không
        if (mathScore <= MAX_SCORE && literatureScore <= MAX_SCORE) {
            console.log("Điểm hợp lệ");
        }
    }
    
    // console.log(average);  // Lỗi - biến cục bộ
    console.log("Học sinh:", studentName);  // OK - biến global
}

calculateGrade();
```

### Bài tập 2: Kiểm tra độ tuổi

```javascript
function checkAge() {
    const ADULT_AGE = 18;
    const SENIOR_AGE = 60;
    
    var currentYear = 2025;
    
    function getAgeGroup(birthYear) {
        let age = currentYear - birthYear;
        let category;
        
        if (age < ADULT_AGE) {
            category = "Trẻ em/Thiếu niên";
        } else if (age < SENIOR_AGE) {
            category = "Người trưởng thành";
        } else {
            category = "Người cao tuổi";
        }
        
        return {
            age: age,
            category: category,
            canVote: age >= 18,
            canRetire: age >= 60
        };
    }
    
    // Test với một số năm sinh
    let birthYears = [2010, 1990, 1960];
    
    birthYears.forEach(year => {
        let result = getAgeGroup(year);
        console.log(`Năm sinh ${year}:`, result);
    });
}

checkAge();
```

## 8. Thử Thách Bản Thân

### Challenge 1: Debug đoạn code

Tìm và sửa lỗi trong đoạn code sau:

```javascript
const PI = 3.14;

function calculateCircle() {
    var radius = 5;
    
    {
        let area = PI * radius * radius;
        PI = 3.14159;  // Lỗi gì?
        console.log("Diện tích:", area);
    }
    
    console.log("Chu vi:", 2 * PI * radius);
    console.log("Area từ ngoài:", area);  // Lỗi gì?
}

calculateCircle();
```

### Challenge 2: Tối ưu code

Cải thiện đoạn code sau:

```javascript
// Code gốc - có thể tối ưu
var name = "Long";
var name = "Đức Long";
var age = 25;

function info() {
    if (age >= 18) {
        var status = "Trưởng thành";
    } else {
        var status = "Chưa trưởng thành";
    }
    
    console.log(name + " - " + status);
}
```

**Gợi ý cải thiện:**
- Sử dụng `const`/`let` thay vì `var`
- Tối ưu scope của biến
- Sử dụng template literals

## 9. Tóm Tắt Kiến Thức

### Các điểm chính cần nhớ:

1. **Phạm vi biến (Scope):**
   - `var`: Function scope
   - `let`/`const`: Block scope
   - Biến cục bộ "che" biến toàn cục

2. **Khai báo biến:**
   - `var` có thể khai báo lại
   - `let`/`const` không thể khai báo lại trong cùng scope
   - `const` không thể thay đổi giá trị

3. **Toán tử so sánh:**
   - `==`: So sánh giá trị (có chuyển đổi kiểu)
   - `===`: So sánh chặt chẽ (giá trị + kiểu)
   - Nên ưu tiên sử dụng `===`

4. **Best Practices:**
   - Ưu tiên `const` → `let` → `var`
   - Sử dụng scope hẹp nhất có thể
   - Đặt tên biến có ý nghĩa
   - Sử dụng `===` thay vì `==`

## 10. Tài Liệu Tham Khảo

- **Website Kteam:** [howkteam.vn/course/khoa-hoc-javascript-co-ban/bai-tap-ve-bien-trong-javascript-4346](https://howkteam.vn/course/khoa-hoc-javascript-co-ban/bai-tap-ve-bien-trong-javascript-4346)
- **Video bài học:** Nhiều ví dụ thực hành chi tiết
- **Lời khuyên:** Hãy dừng video để tự giải trước khi xem đáp án!

Thực hành nhiều với các bài tập này sẽ giúp bạn nắm vững kiến thức về biến trong JavaScript và tránh được những lỗi phổ biến khi lập trình!
