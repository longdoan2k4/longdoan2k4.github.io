---
slug: javascript-co-ban-bai-02
url: /posts/javascript-co-ban-bai-02/
title: "JavaScript Cơ Bản - Bài 02: Chạy Chương Trình JavaScript Với Node"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Hướng dẫn cách chạy chương trình JavaScript đầu tiên với NodeJS"
---

# JavaScript Cơ Bản - Bài 02: Chạy Chương Trình JavaScript Với Node

Sau khi cài đặt NodeJS thành công, bây giờ chúng ta sẽ học cách chạy chương trình JavaScript đầu tiên. Đây là bước quan trọng để bắt đầu hành trình lập trình JavaScript.

## Video Hướng Dẫn

{{< youtube cbZfmmIlzaU >}}

## Tạo File JavaScript Đầu Tiên

### 1. Tạo thư mục làm việc
```bash
# Tạo thư mục cho project
mkdir javascript-basic
cd javascript-basic
```

### 2. Tạo file JavaScript
Tạo file `hello.js` với nội dung:
```javascript
console.log("Xin chào thế giới JavaScript!");
console.log("Đây là chương trình đầu tiên của tôi");
```

### 3. Chạy chương trình
```bash
node hello.js
```

**Kết quả:**
```
Xin chào thế giới JavaScript!
Đây là chương trình đầu tiên của tôi
```

## Các Cách Chạy JavaScript

### 1. Chạy file trực tiếp
```bash
# Cú pháp: node <tên-file>.js
node hello.js
node app.js
node index.js
```

### 2. Chạy trong Node REPL
```bash
# Khởi động Node REPL (Read-Eval-Print Loop)
node

# Viết JavaScript trực tiếp
> console.log("Hello from REPL");
> 2 + 3
> let name = "JavaScript";
> console.log(name);
```

**Thoát REPL:**
- Gõ `.exit` hoặc `Ctrl + C` (2 lần)

### 3. Chạy với nodemon (auto-restart)
```bash
# Cài đặt nodemon global
npm install -g nodemon

# Chạy với nodemon
nodemon hello.js
```console.log("Đây là chương trình JavaScript đầu tiên của tôi");



## Console.log() - In Kết Quả### 2.2. Chạy file```



### Syntax cơ bản```bash

```javascript

console.log("Hello World");node hello.js**Chạy chương trình:**

console.log(42);

console.log(true);``````bash

```

node hello.js

### In nhiều giá trị

```javascript## 3. Các lệnh cơ bản```

console.log("Tên:", "JavaScript", "Tuổi:", 28);

console.log("Kết quả:", 5 + 3);

```

### 3.1. Console.log**Kết quả:**

### Template literals

```javascript```javascript```

let name = "Node.js";

let version = 18;console.log("Xin chào");Xin chào thế giới!

console.log(`Tôi đang học ${name} phiên bản ${version}`);

```console.log(123);Đây là chương trình JavaScript đầu tiên của tôi



## Ví Dụ Thực Hànhconsole.log(true);```



### Chương trình tính toán```

Tạo file `calculator.js`:

```javascript### 2. Làm việc với Variables (Biến)

// Phép tính cơ bản

let a = 10;### 3.2. Khai báo biến

let b = 5;

```javascriptTạo file `variables.js`:

console.log("Số thứ nhất:", a);

console.log("Số thứ hai:", b);let name = "Long";```javascript



console.log("Cộng:", a + b);let age = 20;// Khai báo biến với let

console.log("Trừ:", a - b);

console.log("Nhân:", a * b);console.log("Tên:", name);let name = "Nguyễn Văn A";

console.log("Chia:", a / b);

```console.log("Tuổi:", age);let age = 25;



### Chương trình thông tin```let isStudent = true;

Tạo file `info.js`:

```javascript

// Hiển thị thông tin hệ thống

console.log("=== THÔNG TIN HỆ THỐNG ===");### 3.3. Phép toán cơ bản// Khai báo hằng số với const

console.log("Node.js version:", process.version);

console.log("Platform:", process.platform);```javascriptconst PI = 3.14159;

console.log("Architecture:", process.arch);

let a = 10;const SCHOOL_NAME = "Đại học Bách Khoa";

console.log("\n=== THÔNG TIN THỜI GIAN ===");

console.log("Thời gian hiện tại:", new Date());let b = 5;

console.log("Timestamp:", Date.now());

```console.log("Cộng:", a + b);// Hiển thị thông tin



## Xử Lý Lỗi Cơ Bảnconsole.log("Trừ:", a - b);console.log("Tên:", name);



### Lỗi syntaxconsole.log("Nhân:", a * b);console.log("Tuổi:", age);

```javascript

// Lỗi: thiếu dấu ngoặcconsole.log("Chia:", a / b);console.log("Là học sinh:", isStudent);

console.log("Hello World";  // SyntaxError

```console.log("Số PI:", PI);

// Đúng:

console.log("Hello World");console.log("Trường:", SCHOOL_NAME);

```

## 4. Interactive Mode

### Lỗi file không tồn tại

```bash// Thay đổi giá trị biến

# Chạy file không tồn tại

node notfound.js### 4.1. REPL (Read-Eval-Print Loop)age = 26;

# Error: Cannot find module

``````bashconsole.log("Tuổi mới:", age);



### Lỗi runtimenode

```javascript

// Lỗi: biến chưa khai báo```// Template strings (ES6)

console.log(undefinedVariable);  // ReferenceError

console.log(`Xin chào, tôi là ${name}, ${age} tuổi`);

// Lỗi: chia cho 0

console.log(10 / 0);  // Infinity (không lỗi nhưng cần chú ý)Sau đó có thể gõ JavaScript trực tiếp:```

```

```javascript

## Arguments và Process

> console.log("Hello")### 3. Các kiểu dữ liệu cơ bản

### Nhận arguments từ command line

Tạo file `args.js`:Hello

```javascript

// Lấy arguments từ command line> 2 + 3Tạo file `data-types.js`:

console.log("Arguments:", process.argv);

5```javascript

// Lấy arguments tùy chỉnh (bỏ qua node và tên file)

let userArgs = process.argv.slice(2);> let x = 10// Number (Số)

console.log("User arguments:", userArgs);

undefinedlet score = 95;

// Sử dụng arguments

if (userArgs.length > 0) {> x * 2let price = 299.99;

    console.log("Tên bạn là:", userArgs[0]);

} else {20let temperature = -5;

    console.log("Vui lòng nhập tên của bạn!");

}```

```

console.log("Điểm số:", score);

**Chạy với arguments:**

```bash### 4.2. Thoát REPLconsole.log("Giá:", price);

node args.js "Doan Duc Long"

# Output: Tên bạn là: Doan Duc Long```javascriptconsole.log("Nhiệt độ:", temperature);

```

> .exit

## Best Practices

```// String (Chuỗi)

### 1. Đặt tên file rõ ràng

```hoặc `Ctrl + C` hai lầnlet firstName = "Đức";

✅ calculator.js

✅ user-info.jslet lastName = "Long";

✅ hello-world.js

## 5. Cấu trúc projectlet fullName = firstName + " " + lastName;

❌ test.js

❌ abc.js

❌ 123.js

```### 5.1. Tạo thư mục projectconsole.log("Họ tên:", fullName);



### 2. Sử dụng console.log() hiệu quả```bash

```javascript

// Thêm labels rõ ràngmkdir javascript-basics// Boolean (Logic)

console.log("=== KẾT QUẢ TÍNH TOÁN ===");

console.log("Input:", input);cd javascript-basicslet isPassed = true;

console.log("Output:", result);

```let isRaining = false;

// Sử dụng template literals

console.log(`Kết quả: ${a} + ${b} = ${a + b}`);

```

### 5.2. Tạo file chínhconsole.log("Đã qua môn:", isPassed);

### 3. Tổ chức code

```javascript```javascriptconsole.log("Trời mưa:", isRaining);

// Khai báo biến ở đầu

let name = "JavaScript";// index.js

let version = "ES6";

console.log("=== JAVASCRIPT CƠ BẢN ===");// Array (Mảng)

// Logic chính

console.log("Ngôn ngữ:", name);let fruits = ["táo", "cam", "xoài", "chuối"];

console.log("Phiên bản:", version);

// Biến và kiểu dữ liệulet numbers = [1, 2, 3, 4, 5];

// Kết quả cuối

console.log("Hoàn thành chương trình!");let message = "Học JavaScript cùng K Team";

```

let number = 42;console.log("Trái cây:", fruits);

## Debugging Cơ Bản

let isActive = true;console.log("Số đầu tiên:", numbers[0]);

### 1. Sử dụng console.log()

```javascriptconsole.log("Số cuối cùng:", numbers[numbers.length - 1]);

let x = 5;

console.log("Giá trị x:", x);  // Debug pointconsole.log("Message:", message);



let result = x * 2;console.log("Number:", number);// Object (Đối tượng)

console.log("Kết quả:", result);  // Debug point

```console.log("Boolean:", isActive);let student = {



### 2. Hiển thị type của biến    name: "Trần Thị B",

```javascript

let value = 42;// Function đơn giản    age: 20,

console.log("Value:", value);

console.log("Type:", typeof value);function greet(name) {    major: "Công nghệ thông tin",

```

    return "Xin chào " + name + "!";    gpa: 3.8

## Shortcuts Hữu Ích

}};

### Terminal/Command Prompt

- `Ctrl + C`: Dừng chương trình đang chạy

- `↑ ↓`: Di chuyển qua lịch sử commands

- `Tab`: Auto-complete tên fileconsole.log(greet("Developer"));console.log("Thông tin sinh viên:", student);



### Node REPL```console.log("Tên:", student.name);

- `.help`: Hiển thị help

- `.exit`: Thoát REPLconsole.log("Ngành học:", student.major);

- `.clear`: Xóa context

- `.save filename`: Lưu session## 6. Tips và lưu ý```



## Bài Tập Thực Hành



### Bài 1: Chương trình chào hỏi### 6.1. Extension file## Làm việc với Functions (Hàm)

Tạo chương trình nhận tên từ command line và in lời chào.

- Luôn sử dụng `.js` cho file JavaScript

### Bài 2: Máy tính đơn giản

Tạo chương trình tính toán với 2 số được truyền vào.- Tên file không có khoảng trắng, dùng `-` hoặc `_`Tạo file `functions.js`:



### Bài 3: Thông tin hệ thống```javascript

Hiển thị thông tin chi tiết về NodeJS và hệ điều hành.

### 6.2. Encoding// Function declaration (Khai báo hàm)

## Kết Luận

- Sử dụng UTF-8 để hiển thị tiếng Việt đúngfunction sayHello(name) {

🎉 **Chúc mừng!** Bạn đã học được cách:

- ✅ Chạy file JavaScript với Node- Lưu file với encoding UTF-8    return `Xin chào ${name}!`;

- ✅ Sử dụng console.log() để in kết quả

- ✅ Làm việc với Node REPL}

- ✅ Xử lý arguments từ command line

- ✅ Debug cơ bản với console.log()### 6.3. Comments



**Bước tiếp theo**: Học về comments, keywords và khối lệnh trong JavaScript!```javascript// Function expression (Biểu thức hàm)



---// Comment một dòngconst calculateSum = function(a, b) {



*Hãy xem video hướng dẫn để hiểu rõ hơn cách chạy JavaScript với Node. Thực hành nhiều để thành thạo!*console.log("Hello");    return a + b;

};

/*

Comment nhiều dòng// Arrow function (Hàm mũi tên - ES6)

Có thể viết ghi chú dàiconst calculateProduct = (a, b) => a * b;

*/

```// Sử dụng các hàm

console.log(sayHello("Đức Long"));

## Tổng kếtconsole.log("Tổng:", calculateSum(10, 5));

console.log("Tích:", calculateProduct(4, 3));

Đã học cách:

- Cài đặt Node.js// Hàm với nhiều tham số

- Chạy file JavaScript với nodefunction introduce(name, age, city) {

- Sử dụng console.log    return `Tôi là ${name}, ${age} tuổi, sống ở ${city}`;

- Tạo biến và function cơ bản}

- Sử dụng REPL mode

console.log(introduce("An", 22, "Hà Nội"));

## Bài tiếp theo

// Hàm với giá trị mặc định

Bài 03: Chú thích - keywords - khối lệnh trong JavaScriptfunction greet(name = "Bạn", time = "ngày") {
    return `Chào ${name}, chúc ${time} tốt lành!`;
}

console.log(greet());
console.log(greet("Mai"));
console.log(greet("Hùng", "buổi sáng"));
```

## Làm việc với Input từ người dùng

### Sử dụng readline module

Tạo file `input.js`:
```javascript
// Import readline module
const readline = require('readline');

// Tạo interface để đọc input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hàm hỏi tên
function askName() {
    rl.question('Tên của bạn là gì? ', (name) => {
        console.log(`Xin chào ${name}!`);
        askAge(name);
    });
}

// Hàm hỏi tuổi
function askAge(name) {
    rl.question('Bạn bao nhiêu tuổi? ', (age) => {
        const nextYear = parseInt(age) + 1;
        console.log(`${name}, năm sau bạn sẽ ${nextYear} tuổi!`);
        
        // Đóng interface
        rl.close();
    });
}

// Bắt đầu chương trình
console.log("=== CHƯƠNG TRÌNH THÔNG TIN CÁ NHÂN ===");
askName();
```

**Chạy và tương tác:**
```bash
node input.js
```

## Xử lý điều kiện và vòng lặp

Tạo file `control-flow.js`:
```javascript
// If-else statements
let score = 85;

if (score >= 90) {
    console.log("Hạng A - Xuất sắc");
} else if (score >= 80) {
    console.log("Hạng B - Giỏi");
} else if (score >= 70) {
    console.log("Hạng C - Khá");
} else if (score >= 60) {
    console.log("Hạng D - Trung bình");
} else {
    console.log("Hạng F - Yếu");
}

// Switch statement
let day = "thứ hai";

switch (day) {
    case "thứ hai":
        console.log("Bắt đầu tuần mới!");
        break;
    case "thứ sáu":
        console.log("Sắp đến cuối tuần!");
        break;
    case "chủ nhật":
        console.log("Ngày nghỉ!");
        break;
    default:
        console.log("Ngày thường trong tuần");
}

// For loop
console.log("Đếm từ 1 đến 5:");
for (let i = 1; i <= 5; i++) {
    console.log(`Số ${i}`);
}

// While loop
console.log("Đếm ngược từ 5:");
let count = 5;
while (count > 0) {
    console.log(count);
    count--;
}

// For...of loop với array
let colors = ["đỏ", "xanh", "vàng", "tím"];
console.log("Các màu sắc:");
for (let color of colors) {
    console.log(`- ${color}`);
}
```

## Chương trình thực tế: Calculator đơn giản

Tạo file `calculator.js`:
```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculator() {
    console.log("=== MÁY TÍNH ĐơN GIẢN ===");
    console.log("Các phép toán: +, -, *, /");
    
    rl.question('Nhập số thứ nhất: ', (num1) => {
        rl.question('Nhập phép toán (+, -, *, /): ', (operator) => {
            rl.question('Nhập số thứ hai: ', (num2) => {
                
                const a = parseFloat(num1);
                const b = parseFloat(num2);
                let result;
                
                switch (operator) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        if (b !== 0) {
                            result = a / b;
                        } else {
                            console.log("Lỗi: Không thể chia cho 0!");
                            rl.close();
                            return;
                        }
                        break;
                    default:
                        console.log("Phép toán không hợp lệ!");
                        rl.close();
                        return;
                }
                
                console.log(`Kết quả: ${a} ${operator} ${b} = ${result}`);
                
                rl.question('Bạn muốn tính tiếp? (y/n): ', (answer) => {
                    if (answer.toLowerCase() === 'y') {
                        calculator();
                    } else {
                        console.log("Cảm ơn bạn đã sử dụng!");
                        rl.close();
                    }
                });
            });
        });
    });
}

// Khởi chạy máy tính
calculator();
```

## Debugging và Error Handling

Tạo file `error-handling.js`:
```javascript
// Try-catch để xử lý lỗi
function divideNumbers(a, b) {
    try {
        if (b === 0) {
            throw new Error("Không thể chia cho 0!");
        }
        return a / b;
    } catch (error) {
        console.log("Lỗi:", error.message);
        return null;
    }
}

console.log("10 / 2 =", divideNumbers(10, 2));
console.log("10 / 0 =", divideNumbers(10, 0));

// Console methods để debug
console.log("Thông tin thường");
console.warn("Cảnh báo");
console.error("Lỗi");

// Console.table cho dữ liệu dạng bảng
let students = [
    { name: "An", score: 85 },
    { name: "Bình", score: 92 },
    { name: "Cường", score: 78 }
];

console.table(students);
```

## Tổng kết

Trong bài này, chúng ta đã học:

✅ **Chạy JavaScript với Node** - Hello World
✅ **Variables và Constants** - let, const
✅ **Kiểu dữ liệu cơ bản** - number, string, boolean, array, object
✅ **Functions** - declaration, expression, arrow functions
✅ **Input/Output** - readline module
✅ **Control Flow** - if/else, switch, loops
✅ **Chương trình thực tế** - Calculator
✅ **Error Handling** - try/catch

## Bài tập thực hành

1. **Viết chương trình** tính điểm trung bình của 3 môn học
2. **Tạo game đoán số** từ 1-100
3. **Xây dựng todolist** đơn giản với array
4. **Viết hàm** kiểm tra số nguyên tố

## Bài tiếp theo

**Bài 03**: Làm việc với Objects và Arrays nâng cao trong JavaScript

---

*Hãy thực hành các ví dụ trên và làm bài tập để củng cố kiến thức. JavaScript cơ bản là nền tảng quan trọng!*
