---
slug: javascript-co-ban-bai-09
url: /posts/javascript-co-ban-bai-09/
title: "JavaScript Cơ Bản - Bài 09: Thuộc Tính Và Phương Thức Của Số"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về Math Object, các phương thức làm tròn, tạo số ngẫu nhiên và chuyển đổi số sang chuỗi trong JavaScript"
---

# JavaScript Cơ Bản - Bài 09: Thuộc Tính Và Phương Thức Của Số

Sau khi đã làm quen với kiểu dữ liệu Number cơ bản, bây giờ chúng ta sẽ khám phá các phương thức và thuộc tính mạnh mẽ để xử lý số trong JavaScript. Từ việc làm tròn, tạo số ngẫu nhiên đến chuyển đổi định dạng!

## Video Hướng Dẫn

{{< youtube SJT3ySLHFBM >}}

## 1. Math Object - Đối Tượng Toán Học

### Giới thiệu Math

`Math` là một object built-in của JavaScript cung cấp các thuộc tính và phương thức để thực hiện các phép toán toán học.

```javascript
// Math là một object, không phải constructor
console.log(typeof Math);  // "object"

// Một số thuộc tính toán học quan trọng
console.log(Math.PI);      // 3.141592653589793
console.log(Math.E);       // 2.718281828459045 (số e)
console.log(Math.LN2);     // 0.6931471805599453 (ln(2))
console.log(Math.LN10);    // 2.302585092994046 (ln(10))
console.log(Math.SQRT2);   // 1.4142135623730951 (√2)
```

### Các hằng số toán học

```javascript
const constants = {
    pi: Math.PI,           // π ≈ 3.14159
    e: Math.E,             // e ≈ 2.71828
    ln2: Math.LN2,         // ln(2) ≈ 0.69315
    ln10: Math.LN10,       // ln(10) ≈ 2.30259
    log2e: Math.LOG2E,     // log₂(e) ≈ 1.44270
    log10e: Math.LOG10E,   // log₁₀(e) ≈ 0.43429
    sqrt1_2: Math.SQRT1_2, // 1/√2 ≈ 0.70711
    sqrt2: Math.SQRT2      // √2 ≈ 1.41421
};

console.log(constants);
```

## 2. Phương Thức Làm Tròn

### Math.round() - Làm tròn gần nhất

```javascript
console.log(Math.round(4.7));   // 5
console.log(Math.round(4.4));   // 4
console.log(Math.round(4.5));   // 5 (làm tròn lên)
console.log(Math.round(-4.5));  // -4 (làm tròn về phía dương)
console.log(Math.round(-4.6));  // -5

// Ví dụ thực tế: Làm tròn giá tiền
function roundPrice(price) {
    return Math.round(price * 100) / 100; // Làm tròn đến 2 chữ số thập phân
}

console.log(roundPrice(12.345)); // 12.35
console.log(roundPrice(12.344)); // 12.34
```

### Math.floor() - Làm tròn xuống

```javascript
console.log(Math.floor(4.9));   // 4
console.log(Math.floor(4.1));   // 4
console.log(Math.floor(-4.1));  // -5 (xuống phía âm)
console.log(Math.floor(-4.9));  // -5

// Ví dụ: Tính số trang
function calculatePages(totalItems, itemsPerPage) {
    return Math.floor(totalItems / itemsPerPage);
}

console.log(calculatePages(25, 10)); // 2 (25/10 = 2.5 → 2)
```

### Math.ceil() - Làm tròn lên

```javascript
console.log(Math.ceil(4.1));   // 5
console.log(Math.ceil(4.9));   // 5
console.log(Math.ceil(-4.1));  // -4 (lên phía dương)
console.log(Math.ceil(-4.9));  // -4

// Ví dụ: Tính số trang cần thiết
function calculateRequiredPages(totalItems, itemsPerPage) {
    return Math.ceil(totalItems / itemsPerPage);
}

console.log(calculateRequiredPages(25, 10)); // 3 (cần 3 trang cho 25 items)
```

### Math.trunc() - Cắt bỏ phần thập phân

```javascript
console.log(Math.trunc(4.9));   // 4
console.log(Math.trunc(4.1));   // 4
console.log(Math.trunc(-4.9));  // -4 (chỉ cắt, không làm tròn)
console.log(Math.trunc(-4.1));  // -4

// So sánh với Math.floor()
console.log("trunc(-4.9):", Math.trunc(-4.9)); // -4
console.log("floor(-4.9):", Math.floor(-4.9));  // -5
```

### Làm tròn đến n chữ số thập phân

```javascript
function roundToDecimals(num, decimals) {
    const multiplier = Math.pow(10, decimals);
    return Math.round(num * multiplier) / multiplier;
}

console.log(roundToDecimals(3.14159, 2)); // 3.14
console.log(roundToDecimals(3.14159, 3)); // 3.142
console.log(roundToDecimals(1234.5678, 1)); // 1234.6

// Cách khác sử dụng toFixed() và Number()
function roundToFixed(num, decimals) {
    return Number(num.toFixed(decimals));
}

console.log(roundToFixed(3.14159, 2)); // 3.14
```

## 3. Số Ngẫu Nhiên

### Math.random() - Số ngẫu nhiên cơ bản

```javascript
// Math.random() trả về số từ 0 (bao gồm) đến 1 (không bao gồm)
console.log(Math.random()); // VD: 0.7834521098765432

// Tạo số ngẫu nhiên trong khoảng [0, n)
function randomUpTo(max) {
    return Math.random() * max;
}

console.log(randomUpTo(10)); // VD: 7.234...
```

### Số ngẫu nhiên trong khoảng

```javascript
// Số ngẫu nhiên từ min đến max (không bao gồm max)
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

console.log(randomBetween(5, 15)); // VD: 8.234...

// Số nguyên ngẫu nhiên từ min đến max (bao gồm cả hai)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6));   // Như tung xúc xắc: 1-6
console.log(randomInt(1, 100)); // Số từ 1 đến 100
```

### Ví dụ thực tế với random

```javascript
// Tạo ID ngẫu nhiên đơn giản
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

console.log(generateId()); // VD: "k7j3m9n2p"

// Chọn phần tử ngẫu nhiên từ mảng
function randomChoice(array) {
    const randomIndex = randomInt(0, array.length - 1);
    return array[randomIndex];
}

const colors = ["red", "green", "blue", "yellow"];
console.log(randomChoice(colors)); // VD: "green"

// Tạo màu RGB ngẫu nhiên
function randomColor() {
    const r = randomInt(0, 255);
    const g = randomInt(0, 255);
    const b = randomInt(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}

console.log(randomColor()); // VD: "rgb(123, 45, 200)"
```

## 4. Giá Trị Lớn Nhất Và Nhỏ Nhất

### Math.max() và Math.min()

```javascript
// Tìm giá trị lớn nhất
console.log(Math.max(1, 3, 2));           // 3
console.log(Math.max(-1, -3, -2));        // -1
console.log(Math.max());                  // -Infinity (không có tham số)

// Tìm giá trị nhỏ nhất
console.log(Math.min(1, 3, 2));           // 1
console.log(Math.min(-1, -3, -2));        // -3
console.log(Math.min());                  // Infinity (không có tham số)

// Với mảng, sử dụng spread operator
const numbers = [5, 2, 8, 1, 9];
console.log(Math.max(...numbers));        // 9
console.log(Math.min(...numbers));        // 1
```

### Ứng dụng thực tế

```javascript
// Giới hạn giá trị trong khoảng
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

console.log(clamp(15, 0, 10));  // 10 (giới hạn tối đa)
console.log(clamp(-5, 0, 10));  // 0  (giới hạn tối thiểu)
console.log(clamp(5, 0, 10));   // 5  (trong khoảng cho phép)

// Tìm độ chênh lệch lớn nhất trong mảng
function maxDifference(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    return max - min;
}

console.log(maxDifference([1, 5, 3, 9, 2])); // 8 (9-1)
```

## 5. Căn Bậc Và Lũy Thừa

### Math.sqrt() - Căn bậc hai

```javascript
console.log(Math.sqrt(16));     // 4
console.log(Math.sqrt(2));      // 1.4142135623730951
console.log(Math.sqrt(-1));     // NaN (không có căn bậc hai của số âm)
console.log(Math.sqrt(0));      // 0

// Ví dụ: Tính khoảng cách giữa hai điểm
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

console.log(distance(0, 0, 3, 4)); // 5 (tam giác vuông 3-4-5)
```

### Math.pow() - Lũy thừa

```javascript
console.log(Math.pow(2, 3));    // 8 (2^3)
console.log(Math.pow(4, 0.5));  // 2 (căn bậc hai của 4)
console.log(Math.pow(2, -1));   // 0.5 (1/2)

// ES2016: Toán tử **
console.log(2 ** 3);            // 8
console.log(4 ** 0.5);          // 2
console.log(2 ** -1);           // 0.5

// Ví dụ: Tính lãi kép
function compoundInterest(principal, rate, time) {
    return principal * Math.pow(1 + rate, time);
}

console.log(compoundInterest(1000, 0.05, 10)); // ~1628.89
```

### Math.cbrt() - Căn bậc ba

```javascript
console.log(Math.cbrt(8));      // 2
console.log(Math.cbrt(27));     // 3
console.log(Math.cbrt(-8));     // -2 (căn bậc ba của số âm)
```

## 6. Logarithm Và Hàm Mũ

### Logarithm

```javascript
console.log(Math.log(Math.E));     // 1 (ln(e))
console.log(Math.log10(100));      // 2 (log₁₀(100))
console.log(Math.log2(8));         // 3 (log₂(8))

// Logarithm cơ số bất kỳ
function logBase(number, base) {
    return Math.log(number) / Math.log(base);
}

console.log(logBase(125, 5));      // 3 (log₅(125))
```

### Hàm mũ

```javascript
console.log(Math.exp(1));          // 2.718... (e^1)
console.log(Math.exp(0));          // 1 (e^0)

// Ví dụ: Phân rã phóng xạ
function radioactiveDecay(initialAmount, decayConstant, time) {
    return initialAmount * Math.exp(-decayConstant * time);
}
```

## 7. Chuyển Đổi Số Sang Chuỗi

### toString() - Chuyển sang chuỗi

```javascript
let num = 123;

console.log(num.toString());       // "123"
console.log(num.toString(2));      // "1111011" (hệ nhị phân)
console.log(num.toString(8));      // "173" (hệ bát phân)
console.log(num.toString(16));     // "7b" (hệ thập lục phân)

// Số thực
let pi = 3.14159;
console.log(pi.toString());        // "3.14159"
```

### toFixed() - Định dạng số chữ số thập phân

```javascript
let num = 3.14159;

console.log(num.toFixed());        // "3" (mặc định 0 chữ số)
console.log(num.toFixed(2));       // "3.14"
console.log(num.toFixed(4));       // "3.1416" (làm tròn)

// Lưu ý: toFixed() trả về chuỗi
console.log(typeof num.toFixed(2)); // "string"

// Chuyển về số
console.log(+num.toFixed(2));      // 3.14 (number)
```

### toPrecision() - Định dạng số chữ số có nghĩa

```javascript
let num = 123.456;

console.log(num.toPrecision());    // "123.456" (mặc định)
console.log(num.toPrecision(3));   // "123"
console.log(num.toPrecision(5));   // "123.46"
console.log(num.toPrecision(1));   // "1e+2" (ký hiệu khoa học)

let small = 0.000123;
console.log(small.toPrecision(3)); // "0.000123" → "0.000123"
```

### toExponential() - Ký hiệu khoa học

```javascript
let num = 123456;

console.log(num.toExponential());     // "1.23456e+5"
console.log(num.toExponential(2));    // "1.23e+5"
console.log(num.toExponential(4));    // "1.2346e+5"

let small = 0.000123;
console.log(small.toExponential(2));  // "1.23e-4"
```

## 8. Ví Dụ Thực Tế Tổng Hợp

### Máy tính đơn giản

```javascript
const Calculator = {
    // Các phép toán cơ bản
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : NaN,
    
    // Làm tròn
    round: (num, decimals = 0) => {
        const multiplier = Math.pow(10, decimals);
        return Math.round(num * multiplier) / multiplier;
    },
    
    // Phần trăm
    percentage: (value, total) => (value / total) * 100,
    
    // Căn bậc hai
    sqrt: Math.sqrt,
    
    // Lũy thừa
    power: Math.pow,
    
    // Giá trị tuyệt đối
    abs: Math.abs
};

// Test máy tính
console.log(Calculator.add(10, 5));           // 15
console.log(Calculator.round(3.14159, 2));    // 3.14
console.log(Calculator.percentage(25, 100));   // 25
```

### Trò chơi đoán số

```javascript
function createGuessingGame() {
    const secretNumber = randomInt(1, 100);
    let attempts = 0;
    
    return {
        guess: function(number) {
            attempts++;
            
            if (number === secretNumber) {
                return {
                    success: true,
                    message: `Chúc mừng! Bạn đã đoán đúng sau ${attempts} lần thử.`,
                    attempts: attempts
                };
            } else if (number < secretNumber) {
                return {
                    success: false,
                    message: "Số bạn đoán nhỏ hơn số bí mật.",
                    attempts: attempts
                };
            } else {
                return {
                    success: false,
                    message: "Số bạn đoán lớn hơn số bí mật.",
                    attempts: attempts
                };
            }
        },
        
        getHint: function() {
            const range = Math.floor(secretNumber / 10) * 10;
            return `Số bí mật nằm trong khoảng ${range}-${range + 9}`;
        }
    };
}

// Sử dụng game
const game = createGuessingGame();
console.log(game.guess(50));
console.log(game.getHint());
```

### Utility functions cho số

```javascript
const NumberUtils = {
    // Kiểm tra số chẵn
    isEven: (num) => num % 2 === 0,
    
    // Kiểm tra số lẻ
    isOdd: (num) => num % 2 !== 0,
    
    // Kiểm tra số nguyên tố (đơn giản)
    isPrime: (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    },
    
    // Tính giai thừa
    factorial: (n) => {
        if (n <= 1) return 1;
        return n * NumberUtils.factorial(n - 1);
    },
    
    // Tạo dãy số
    range: (start, end, step = 1) => {
        const result = [];
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    },
    
    // Tính trung bình
    average: (numbers) => {
        const sum = numbers.reduce((a, b) => a + b, 0);
        return sum / numbers.length;
    }
};

// Test utilities
console.log(NumberUtils.isEven(4));        // true
console.log(NumberUtils.isPrime(17));      // true
console.log(NumberUtils.factorial(5));     // 120
console.log(NumberUtils.range(1, 10, 2));  // [1, 3, 5, 7, 9]
console.log(NumberUtils.average([1,2,3,4,5])); // 3
```

## 9. Performance Tips

### So sánh hiệu suất

```javascript
// Math.floor vs parseInt cho số dương
console.time("Math.floor");
for (let i = 0; i < 1000000; i++) {
    Math.floor(Math.random() * 100);
}
console.timeEnd("Math.floor");

console.time("parseInt");
for (let i = 0; i < 1000000; i++) {
    parseInt(Math.random() * 100);
}
console.timeEnd("parseInt");

// Math.floor thường nhanh hơn cho số dương
```

### Tối ưu hóa phép toán

```javascript
// Thay vì Math.pow(x, 2)
const square = x => x * x;

// Thay vì Math.pow(x, 3)
const cube = x => x * x * x;

// Cache các giá trị thường dùng
const MATH_CONSTANTS = {
    PI: Math.PI,
    TWO_PI: Math.PI * 2,
    HALF_PI: Math.PI / 2,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI
};
```

## 10. Tóm Tắt

### Math Object:
- **Hằng số:** `Math.PI`, `Math.E`, `Math.SQRT2`
- **Làm tròn:** `Math.round()`, `Math.floor()`, `Math.ceil()`, `Math.trunc()`
- **Ngẫu nhiên:** `Math.random()` + các hàm tạo số ngẫu nhiên
- **Min/Max:** `Math.max()`, `Math.min()`
- **Căn & Lũy thừa:** `Math.sqrt()`, `Math.pow()`, `Math.cbrt()`

### Number methods:
- **Chuyển chuỗi:** `toString()`, `toFixed()`, `toPrecision()`, `toExponential()`
- **Làm tròn:** Kết hợp Math methods với multiplication/division

### Best Practices:
- Sử dụng `Math.floor()` cho số nguyên từ số thực
- `Math.random()` cần xử lý thêm cho khoảng mong muốn  
- `toFixed()` trả về string, cần convert về number nếu cần
- Cache các hằng số toán học thường dùng

Nắm vững các phương thức này sẽ giúp bạn xử lý số học một cách hiệu quả và chính xác trong JavaScript!
