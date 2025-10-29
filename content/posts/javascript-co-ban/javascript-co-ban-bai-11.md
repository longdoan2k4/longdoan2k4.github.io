---
slug: javascript-co-ban-bai-11
url: /posts/javascript-co-ban-bai-11/
title: "JavaScript Cơ Bản - Bài 11: Tổng Hợp Kiến Thức Về Number"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tổng hợp và ôn tập kiến thức về kiểu dữ liệu Number, xử lý lỗi làm tròn, NaN và các ví dụ thực tế"
---

# JavaScript Cơ Bản - Bài 11: Tổng Hợp Kiến Thức Về Number

Sau khi đã tìm hiểu chi tiết về kiểu Number và BigInt, bài học này sẽ giúp bạn tổng hợp và ôn tập toàn bộ kiến thức thông qua các ví dụ thực tế và những lưu ý quan trọng khi làm việc với số trong JavaScript.

## Video Hướng Dẫn

{{< youtube lblsx1A0N1M >}}

## 1. Tổng Quan Kiểu Dữ Liệu Số

### Phân loại số trong JavaScript

```javascript
// 1. Number (kiểu chính)
const regularNumber = 42;
const floatNumber = 3.14159;
const negativeNumber = -25;
const scientificNumber = 1.5e6; // 1,500,000

// 2. Giá trị đặc biệt
const infinityValue = Infinity;
const negativeInfinity = -Infinity;
const notANumber = NaN;

// 3. BigInt (số nguyên lớn)
const bigInteger = 9007199254740992n;

// Kiểm tra kiểu
console.log(typeof regularNumber);    // "number"
console.log(typeof bigInteger);       // "bigint"
console.log(typeof notANumber);       // "number" (!)
```

### Giới hạn của Number

```javascript
// Giá trị lớn nhất và nhỏ nhất
console.log("MAX_VALUE:", Number.MAX_VALUE);           // 1.7976931348623157e+308
console.log("MIN_VALUE:", Number.MIN_VALUE);           // 5e-324
console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log("MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER); // -9007199254740991

// Kiểm tra giới hạn an toàn
function checkSafeInteger(num) {
    console.log(`${num} is safe:`, Number.isSafeInteger(num));
}

checkSafeInteger(9007199254740991);     // true
checkSafeInteger(9007199254740992);     // false - cần dùng BigInt
```

## 2. Vấn Đề Độ Chính Xác Số Thực

### Lỗi làm tròn floating point

```javascript
// Vấn đề nổi tiếng
console.log(0.1 + 0.2);                    // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);           // false (!)

// Nhiều ví dụ khác
console.log(0.1 * 3);                      // 0.30000000000000004
console.log(0.3 - 0.1);                    // 0.19999999999999998
console.log(1.4 - 1.2);                    // 0.19999999999999996

// Tại sao lại như vậy?
// Số thập phân được lưu trữ dưới dạng nhị phân
// Một số thập phân không thể biểu diễn chính xác trong hệ nhị phân
```

### Cách xử lý lỗi precision

```javascript
// Phương pháp 1: Sử dụng toFixed()
function addDecimal(a, b, precision = 2) {
    return +(a + b).toFixed(precision);
}

console.log(addDecimal(0.1, 0.2));         // 0.3

// Phương pháp 2: Sử dụng epsilon
function areEqual(a, b, epsilon = Number.EPSILON) {
    return Math.abs(a - b) < epsilon;
}

console.log(areEqual(0.1 + 0.2, 0.3));     // true

// Phương pháp 3: Nhân với 10^n rồi chia lại
function preciseAdd(a, b, decimals = 2) {
    const multiplier = Math.pow(10, decimals);
    return Math.round((a + b) * multiplier) / multiplier;
}

console.log(preciseAdd(0.1, 0.2));         // 0.3

// Phương pháp 4: Dùng library decimal.js, big.js
// const Decimal = require('decimal.js');
// const result = new Decimal(0.1).plus(0.2).toNumber(); // 0.3
```

### Class xử lý decimal chính xác

```javascript
class PreciseNumber {
    constructor(value, precision = 2) {
        this.precision = precision;
        this.multiplier = Math.pow(10, precision);
        this.value = Math.round(value * this.multiplier);
    }
    
    add(other) {
        if (other instanceof PreciseNumber) {
            return new PreciseNumber(
                (this.value + other.value) / this.multiplier, 
                this.precision
            );
        }
        return new PreciseNumber(
            this.toNumber() + other, 
            this.precision
        );
    }
    
    subtract(other) {
        if (other instanceof PreciseNumber) {
            return new PreciseNumber(
                (this.value - other.value) / this.multiplier, 
                this.precision
            );
        }
        return new PreciseNumber(
            this.toNumber() - other, 
            this.precision
        );
    }
    
    multiply(other) {
        if (other instanceof PreciseNumber) {
            return new PreciseNumber(
                (this.value * other.value) / (this.multiplier * this.multiplier), 
                this.precision
            );
        }
        return new PreciseNumber(
            this.toNumber() * other, 
            this.precision
        );
    }
    
    toNumber() {
        return this.value / this.multiplier;
    }
    
    toString() {
        return this.toNumber().toFixed(this.precision);
    }
}

// Sử dụng
const a = new PreciseNumber(0.1);
const b = new PreciseNumber(0.2);
const result = a.add(b);

console.log(result.toString());             // "0.30"
console.log(result.toNumber());             // 0.3
```

## 3. Xử Lý NaN (Not a Number)

### Khi nào xuất hiện NaN

```javascript
// Các trường hợp tạo ra NaN
console.log(0 / 0);                    // NaN
console.log(Math.sqrt(-1));            // NaN
console.log(parseInt("hello"));        // NaN
console.log("abc" * 2);               // NaN
console.log(undefined + 1);           // NaN
console.log(Infinity - Infinity);     // NaN

// NaN có tính chất đặc biệt
console.log(NaN === NaN);             // false (!)
console.log(NaN == NaN);              // false (!)
```

### Cách kiểm tra NaN

```javascript
const value = "abc" * 2;

// Cách sai
console.log(value === NaN);           // false (luôn false!)

// Cách đúng
console.log(isNaN(value));            // true
console.log(Number.isNaN(value));     // true (chính xác hơn)

// Sự khác biệt giữa isNaN() và Number.isNaN()
console.log(isNaN("hello"));          // true (ép kiểu trước)
console.log(Number.isNaN("hello"));   // false (kiểm tra chính xác)

console.log(isNaN("123"));            // false ("123" được ép thành 123)
console.log(Number.isNaN("123"));     // false (không phải NaN)
```

### Utility functions cho NaN

```javascript
// Kiểm tra và xử lý NaN
function safeNumber(value, defaultValue = 0) {
    const num = Number(value);
    return Number.isNaN(num) ? defaultValue : num;
}

console.log(safeNumber("123"));       // 123
console.log(safeNumber("abc"));       // 0
console.log(safeNumber("abc", -1));   // -1

// Kiểm tra số hợp lệ
function isValidNumber(value) {
    const num = Number(value);
    return !Number.isNaN(num) && Number.isFinite(num);
}

console.log(isValidNumber("123"));    // true
console.log(isValidNumber("abc"));    // false
console.log(isValidNumber(Infinity)); // false

// Chuyển đổi an toàn
function parseNumber(value, options = {}) {
    const {
        defaultValue = 0,
        allowInfinity = false,
        parseMethod = 'Number'
    } = options;
    
    let num;
    
    switch (parseMethod) {
        case 'parseInt':
            num = parseInt(value);
            break;
        case 'parseFloat':
            num = parseFloat(value);
            break;
        default:
            num = Number(value);
    }
    
    if (Number.isNaN(num)) {
        return defaultValue;
    }
    
    if (!allowInfinity && !Number.isFinite(num)) {
        return defaultValue;
    }
    
    return num;
}

// Test
console.log(parseNumber("123.45"));          // 123.45
console.log(parseNumber("123px", { parseMethod: 'parseInt' })); // 123
console.log(parseNumber("abc", { defaultValue: -1 }));         // -1
```

## 4. Chuyển Đổi Kiểu Và Validation

### Chuyển đổi từ chuỗi sang số

```javascript
// Các phương pháp chuyển đổi
const str1 = "123";
const str2 = "123.45";
const str3 = "123px";
const str4 = "hello";

console.log("Number():");
console.log(Number(str1));          // 123
console.log(Number(str2));          // 123.45
console.log(Number(str3));          // NaN
console.log(Number(str4));          // NaN

console.log("parseInt():");
console.log(parseInt(str1));        // 123
console.log(parseInt(str2));        // 123 (cắt phần thập phân)
console.log(parseInt(str3));        // 123 (dừng khi gặp ký tự không phải số)
console.log(parseInt(str4));        // NaN

console.log("parseFloat():");
console.log(parseFloat(str1));      // 123
console.log(parseFloat(str2));      // 123.45
console.log(parseFloat(str3));      // 123 (dừng khi gặp ký tự không phải số)
console.log(parseFloat(str4));      // NaN

console.log("Unary + operator:");
console.log(+str1);                 // 123
console.log(+str2);                 // 123.45
console.log(+str3);                 // NaN
console.log(+str4);                 // NaN
```

### Validation nâng cao

```javascript
class NumberValidator {
    static isInteger(value) {
        return Number.isInteger(Number(value));
    }
    
    static isPositive(value) {
        const num = Number(value);
        return !Number.isNaN(num) && num > 0;
    }
    
    static isInRange(value, min, max) {
        const num = Number(value);
        return !Number.isNaN(num) && num >= min && num <= max;
    }
    
    static validateAge(age) {
        const ageNum = Number(age);
        
        if (Number.isNaN(ageNum)) {
            return { valid: false, message: "Tuổi phải là số" };
        }
        
        if (!Number.isInteger(ageNum)) {
            return { valid: false, message: "Tuổi phải là số nguyên" };
        }
        
        if (ageNum < 0 || ageNum > 150) {
            return { valid: false, message: "Tuổi không hợp lệ (0-150)" };
        }
        
        return { valid: true, value: ageNum };
    }
    
    static validatePrice(price) {
        const priceNum = Number(price);
        
        if (Number.isNaN(priceNum)) {
            return { valid: false, message: "Giá phải là số" };
        }
        
        if (priceNum < 0) {
            return { valid: false, message: "Giá không thể âm" };
        }
        
        // Kiểm tra tối đa 2 chữ số thập phân
        const decimalPlaces = (priceNum.toString().split('.')[1] || '').length;
        if (decimalPlaces > 2) {
            return { valid: false, message: "Giá tối đa 2 chữ số thập phân" };
        }
        
        return { valid: true, value: priceNum };
    }
}

// Test validation
console.log(NumberValidator.validateAge("25"));     // { valid: true, value: 25 }
console.log(NumberValidator.validateAge("25.5"));   // { valid: false, message: "Tuổi phải là số nguyên" }
console.log(NumberValidator.validatePrice("99.99")); // { valid: true, value: 99.99 }
console.log(NumberValidator.validatePrice("99.999")); // { valid: false, message: "Giá tối đa 2 chữ số thập phân" }
```

## 5. Xử Lý Số Trong Form và Input

### Input validation

```javascript
function createNumberInput(inputElement, options = {}) {
    const {
        min = -Infinity,
        max = Infinity,
        step = 1,
        precision = 2,
        allowNegative = true,
        onValidChange = null,
        onInvalidChange = null
    } = options;
    
    function validateInput(value) {
        const num = Number(value);
        
        // Kiểm tra NaN
        if (Number.isNaN(num)) {
            return { valid: false, message: "Không phải là số hợp lệ" };
        }
        
        // Kiểm tra số âm
        if (!allowNegative && num < 0) {
            return { valid: false, message: "Không cho phép số âm" };
        }
        
        // Kiểm tra phạm vi
        if (num < min) {
            return { valid: false, message: `Giá trị tối thiểu là ${min}` };
        }
        
        if (num > max) {
            return { valid: false, message: `Giá trị tối đa là ${max}` };
        }
        
        return { valid: true, value: num };
    }
    
    function formatValue(num) {
        return Number(num.toFixed(precision));
    }
    
    inputElement.addEventListener('input', function(e) {
        const validation = validateInput(e.target.value);
        
        if (validation.valid) {
            e.target.classList.remove('error');
            const formattedValue = formatValue(validation.value);
            
            if (onValidChange) {
                onValidChange(formattedValue);
            }
        } else {
            e.target.classList.add('error');
            
            if (onInvalidChange) {
                onInvalidChange(validation.message);
            }
        }
    });
    
    inputElement.addEventListener('blur', function(e) {
        const validation = validateInput(e.target.value);
        
        if (validation.valid) {
            e.target.value = formatValue(validation.value);
        }
    });
}

// Sử dụng (cần HTML element)
// const priceInput = document.getElementById('price');
// createNumberInput(priceInput, {
//     min: 0,
//     max: 1000000,
//     precision: 2,
//     allowNegative: false,
//     onValidChange: (value) => console.log('Valid price:', value),
//     onInvalidChange: (message) => console.log('Error:', message)
// });
```

### Format số cho hiển thị

```javascript
class NumberFormatter {
    static currency(amount, currency = 'VND', locale = 'vi-VN') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    static percentage(value, precision = 2) {
        return `${(value * 100).toFixed(precision)}%`;
    }
    
    static thousands(value) {
        return value.toLocaleString('vi-VN');
    }
    
    static fileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Bytes';
        
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    static duration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// Test formatter
console.log(NumberFormatter.currency(1000000));     // "1.000.000 ₫"
console.log(NumberFormatter.percentage(0.15, 1));   // "15.0%"
console.log(NumberFormatter.thousands(1234567));    // "1.234.567"
console.log(NumberFormatter.fileSize(1234567));     // "1.18 MB"
console.log(NumberFormatter.duration(3665));        // "01:01:05"
```

## 6. Ví Dụ Thực Tế Tổng Hợp

### Shopping cart calculator

```javascript
class ShoppingCart {
    constructor() {
        this.items = [];
        this.taxRate = 0.1; // 10%
        this.discountRate = 0;
    }
    
    addItem(name, price, quantity = 1) {
        // Validate input
        const priceNum = Number(price);
        const quantityNum = Number(quantity);
        
        if (Number.isNaN(priceNum) || priceNum < 0) {
            throw new Error("Giá không hợp lệ");
        }
        
        if (Number.isNaN(quantityNum) || quantityNum < 1 || !Number.isInteger(quantityNum)) {
            throw new Error("Số lượng không hợp lệ");
        }
        
        this.items.push({
            name,
            price: this.roundCurrency(priceNum),
            quantity: quantityNum
        });
    }
    
    roundCurrency(amount) {
        return Math.round(amount * 100) / 100;
    }
    
    getSubtotal() {
        const subtotal = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        return this.roundCurrency(subtotal);
    }
    
    getDiscount() {
        const subtotal = this.getSubtotal();
        const discount = subtotal * this.discountRate;
        return this.roundCurrency(discount);
    }
    
    getTax() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * this.taxRate;
        return this.roundCurrency(tax);
    }
    
    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscount();
        const tax = this.getTax();
        const total = subtotal - discount + tax;
        return this.roundCurrency(total);
    }
    
    applyDiscount(rate) {
        if (Number.isNaN(Number(rate)) || rate < 0 || rate > 1) {
            throw new Error("Tỷ lệ giảm giá không hợp lệ (0-1)");
        }
        this.discountRate = Number(rate);
    }
    
    getSummary() {
        return {
            items: this.items,
            subtotal: this.getSubtotal(),
            discount: this.getDiscount(),
            tax: this.getTax(),
            total: this.getTotal(),
            formattedTotal: NumberFormatter.currency(this.getTotal())
        };
    }
}

// Test shopping cart
const cart = new ShoppingCart();

try {
    cart.addItem("Laptop", 15000000, 1);
    cart.addItem("Mouse", 500000, 2);
    cart.applyDiscount(0.05); // 5% discount
    
    console.log(cart.getSummary());
} catch (error) {
    console.error("Error:", error.message);
}
```

### Grade calculator với statistical analysis

```javascript
class GradeCalculator {
    constructor() {
        this.scores = [];
    }
    
    addScore(score, weight = 1) {
        const scoreNum = Number(score);
        const weightNum = Number(weight);
        
        if (Number.isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
            throw new Error("Điểm phải từ 0-10");
        }
        
        if (Number.isNaN(weightNum) || weightNum <= 0) {
            throw new Error("Trọng số phải > 0");
        }
        
        this.scores.push({
            score: this.roundScore(scoreNum),
            weight: weightNum
        });
    }
    
    roundScore(score) {
        return Math.round(score * 100) / 100;
    }
    
    getWeightedAverage() {
        if (this.scores.length === 0) return 0;
        
        const totalWeightedScore = this.scores.reduce((sum, item) => {
            return sum + (item.score * item.weight);
        }, 0);
        
        const totalWeight = this.scores.reduce((sum, item) => {
            return sum + item.weight;
        }, 0);
        
        return this.roundScore(totalWeightedScore / totalWeight);
    }
    
    getSimpleAverage() {
        if (this.scores.length === 0) return 0;
        
        const sum = this.scores.reduce((sum, item) => sum + item.score, 0);
        return this.roundScore(sum / this.scores.length);
    }
    
    getMedian() {
        if (this.scores.length === 0) return 0;
        
        const sortedScores = [...this.scores].map(item => item.score).sort((a, b) => a - b);
        const middle = Math.floor(sortedScores.length / 2);
        
        if (sortedScores.length % 2 === 0) {
            return this.roundScore((sortedScores[middle - 1] + sortedScores[middle]) / 2);
        } else {
            return sortedScores[middle];
        }
    }
    
    getMode() {
        if (this.scores.length === 0) return null;
        
        const frequency = {};
        this.scores.forEach(item => {
            const score = item.score;
            frequency[score] = (frequency[score] || 0) + 1;
        });
        
        let maxFreq = 0;
        let mode = null;
        
        for (const score in frequency) {
            if (frequency[score] > maxFreq) {
                maxFreq = frequency[score];
                mode = Number(score);
            }
        }
        
        return maxFreq > 1 ? mode : null;
    }
    
    getStandardDeviation() {
        if (this.scores.length < 2) return 0;
        
        const avg = this.getSimpleAverage();
        const variance = this.scores.reduce((sum, item) => {
            return sum + Math.pow(item.score - avg, 2);
        }, 0) / (this.scores.length - 1);
        
        return this.roundScore(Math.sqrt(variance));
    }
    
    getGrade(average) {
        if (average >= 9) return "Xuất sắc";
        if (average >= 8) return "Giỏi";
        if (average >= 6.5) return "Khá";
        if (average >= 5) return "Trung bình";
        return "Yếu";
    }
    
    getStatistics() {
        const weightedAvg = this.getWeightedAverage();
        const simpleAvg = this.getSimpleAverage();
        
        return {
            count: this.scores.length,
            weightedAverage: weightedAvg,
            simpleAverage: simpleAvg,
            median: this.getMedian(),
            mode: this.getMode(),
            standardDeviation: this.getStandardDeviation(),
            min: Math.min(...this.scores.map(item => item.score)),
            max: Math.max(...this.scores.map(item => item.score)),
            weightedGrade: this.getGrade(weightedAvg),
            simpleGrade: this.getGrade(simpleAvg)
        };
    }
}

// Test grade calculator
const grades = new GradeCalculator();

try {
    grades.addScore(8.5, 2);    // Kiểm tra giữa kỳ (trọng số 2)
    grades.addScore(7.0, 1);    // Bài tập (trọng số 1)  
    grades.addScore(9.0, 3);    // Thi cuối kỳ (trọng số 3)
    grades.addScore(8.0, 1);    // Thuyết trình
    
    console.log(grades.getStatistics());
} catch (error) {
    console.error("Error:", error.message);
}
```

## 7. Performance và Optimization

### Benchmark các phương pháp

```javascript
function benchmark() {
    const iterations = 1000000;
    const testValue = "123.45";
    
    console.time("Number()");
    for (let i = 0; i < iterations; i++) {
        Number(testValue);
    }
    console.timeEnd("Number()");
    
    console.time("parseFloat()");
    for (let i = 0; i < iterations; i++) {
        parseFloat(testValue);
    }
    console.timeEnd("parseFloat()");
    
    console.time("Unary +");
    for (let i = 0; i < iterations; i++) {
        +testValue;
    }
    console.timeEnd("Unary +");
    
    // So sánh làm tròn
    const testNum = 3.14159;
    
    console.time("toFixed + Number");
    for (let i = 0; i < iterations; i++) {
        Number(testNum.toFixed(2));
    }
    console.timeEnd("toFixed + Number");
    
    console.time("Math.round * 100 / 100");
    for (let i = 0; i < iterations; i++) {
        Math.round(testNum * 100) / 100;
    }
    console.timeEnd("Math.round * 100 / 100");
}

// benchmark(); // Uncomment để chạy test
```

### Tips tối ưu hiệu suất

```javascript
// Cache các phép toán thường dùng
const MATH_CACHE = {
    multipliers: {},
    getMultiplier(n) {
        if (!this.multipliers[n]) {
            this.multipliers[n] = Math.pow(10, n);
        }
        return this.multipliers[n];
    }
};

// Hàm làm tròn tối ưu
function fastRound(num, decimals) {
    const multiplier = MATH_CACHE.getMultiplier(decimals);
    return Math.round(num * multiplier) / multiplier;
}

// Kiểm tra số nguyên nhanh
function isFastInteger(num) {
    return (num | 0) === num;  // Bitwise OR trick
}

// Chuyển đổi nhanh cho số dương
function fastParseInt(str) {
    return str | 0;  // Chỉ dùng cho số dương nhỏ
}

console.log(isFastInteger(42));     // true
console.log(isFastInteger(42.5));   // false
console.log(fastParseInt("123"));   // 123
```

## 8. Tóm Tắt Best Practices

### Checklist làm việc với số

```javascript
const NumberBestPractices = {
    // ✅ Những điều nên làm
    guidelines: [
        "Luôn validate input trước khi xử lý",
        "Sử dụng Number.isNaN() thay vì isNaN()",
        "Kiểm tra Number.isFinite() cho số hữu hạn",
        "Cẩn thận với phép so sánh số thực",
        "Sử dụng BigInt cho số nguyên rất lớn",
        "Format số để hiển thị cho user",
        "Cache các phép toán phức tạp",
        "Sử dụng const cho các hằng số toán học"
    ],
    
    // ❌ Những điều tránh làm
    antiPatterns: [
        "Không so sánh trực tiếp với NaN",
        "Không dùng == để so sánh số thực",
        "Không bỏ qua validation input",
        "Không trộn BigInt với Number",
        "Không dùng parseFloat cho validation",
        "Không quên xử lý edge cases (0, âm, Infinity)"
    ],
    
    // Utility functions cần thiết
    essentialUtils: {
        isValidNumber: (value) => {
            const num = Number(value);
            return !Number.isNaN(num) && Number.isFinite(num);
        },
        
        safeNumber: (value, fallback = 0) => {
            const num = Number(value);
            return Number.isNaN(num) ? fallback : num;
        },
        
        roundToPrecision: (num, precision = 2) => {
            const multiplier = Math.pow(10, precision);
            return Math.round(num * multiplier) / multiplier;
        },
        
        clamp: (value, min, max) => {
            return Math.min(Math.max(value, min), max);
        }
    }
};
```

## 9. Kết Luận

Kiểu dữ liệu Number trong JavaScript có nhiều đặc điểm cần lưu ý:

### 📋 **Tóm tắt kiến thức:**

1. **Precision Issues:** Số thực có thể có sai số - cần xử lý cẩn thận
2. **NaN Handling:** Sử dụng `Number.isNaN()`, không so sánh trực tiếp
3. **Validation:** Luôn validate input trước khi xử lý
4. **BigInt:** Dùng cho số nguyên lớn hơn safe integer limit
5. **Performance:** Cache phép toán, chọn method phù hợp với use case

### 🛠️ **Tools cần thiết:**

- Validation utilities
- Formatting functions  
- Precision handling
- Error handling cho edge cases

### 🎯 **Áp dụng thực tế:**

- Form validation
- Financial calculations
- Statistical analysis
- Gaming (scores, physics)
- Data processing

Nắm vững những kiến thức này sẽ giúp bạn tránh được các lỗi phổ biến và xử lý số một cách chính xác trong JavaScript!
