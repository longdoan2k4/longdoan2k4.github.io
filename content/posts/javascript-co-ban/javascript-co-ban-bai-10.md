---
slug: javascript-co-ban-bai-10
url: /posts/javascript-co-ban-bai-10/
title: "JavaScript Cơ Bản - Bài 10: Kiểu Dữ Liệu BigInt"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về kiểu BigInt trong JavaScript - làm việc với số nguyên có kích thước rất lớn, cách khai báo và sử dụng"
---

# JavaScript Cơ Bản - Bài 10: Kiểu Dữ Liệu BigInt

BigInt là kiểu dữ liệu mới được thêm vào JavaScript (ES2020) để xử lý các số nguyên có kích thước rất lớn, vượt quá giới hạn của kiểu Number thông thường. Hãy cùng khám phá kiểu dữ liệu đặc biệt này!

## Video Hướng Dẫn

{{< youtube BTt4NfhAwak >}}

## 1. Giới Thiệu BigInt

### Tại sao cần BigInt?

JavaScript sử dụng số thực 64-bit để lưu trữ tất cả các số, có giới hạn an toàn cho số nguyên là:

```javascript
console.log(Number.MAX_SAFE_INTEGER);    // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);    // -9007199254740991

// Vấn đề với số lớn hơn giới hạn an toàn
console.log(9007199254740991 + 1);       // 9007199254740992 ✓
console.log(9007199254740991 + 2);       // 9007199254740992 ✗ (sai!)
console.log(9007199254740992 === 9007199254740993); // true (!)

// Mất độ chính xác
console.log(Number.isSafeInteger(9007199254740992)); // false
```

### BigInt giải quyết vấn đề

```javascript
// Với BigInt, có thể xử lý số rất lớn chính xác
const bigNum1 = 9007199254740991n;
const bigNum2 = 9007199254740992n;

console.log(bigNum1 + 1n);              // 9007199254740992n ✓
console.log(bigNum1 + 2n);              // 9007199254740993n ✓
console.log(bigNum2 === bigNum2 + 1n);  // false ✓
```

## 2. Cách Khai Báo BigInt

### Sử dụng hậu tố 'n'

```javascript
// Cách 1: Thêm 'n' vào cuối số
const big1 = 123n;
const big2 = 999999999999999999n;
const big3 = -456n;

console.log(typeof big1);    // "bigint"
console.log(big1);          // 123n
console.log(big2);          // 999999999999999999n
```

### Sử dụng BigInt() constructor

```javascript
// Cách 2: Dùng BigInt() function
const big4 = BigInt(123);
const big5 = BigInt("999999999999999999");
const big6 = BigInt(-456);

console.log(big4);          // 123n
console.log(big5);          // 999999999999999999n
console.log(big6);          // -456n

// Từ chuỗi với các hệ số khác
const binaryBig = BigInt("0b1111");     // 15n
const hexBig = BigInt("0xFF");          // 255n
const octalBig = BigInt("0o77");        // 63n
```

### Lưu ý khi tạo BigInt

```javascript
// ✅ Hợp lệ
const valid1 = 123n;
const valid2 = BigInt(123);
const valid3 = BigInt("123");

// ❌ Không hợp lệ
// const invalid1 = BigInt(3.14);    // TypeError!
// const invalid2 = BigInt("3.14");  // SyntaxError!
// const invalid3 = 3.14n;           // SyntaxError!

// BigInt chỉ cho số nguyên
console.log(BigInt(3.0));           // 3n (OK vì 3.0 là số nguyên)
```

## 3. Toán Tử Với BigInt

### Các phép toán cơ bản

```javascript
const a = 10n;
const b = 3n;

// Phép toán số học
console.log(a + b);    // 13n
console.log(a - b);    // 7n
console.log(a * b);    // 30n
console.log(a / b);    // 3n (chia lấy phần nguyên)
console.log(a % b);    // 1n
console.log(a ** b);   // 1000n (lũy thừa)

// Lưu ý: BigInt chia luôn trả về phần nguyên
console.log(10n / 3n);    // 3n (không phải 3.333...)
console.log(10n / 4n);    // 2n (không phải 2.5)
```

### Toán tử so sánh

```javascript
const x = 10n;
const y = 5n;

console.log(x > y);     // true
console.log(x < y);     // false
console.log(x >= 10n);  // true
console.log(x === 10n); // true
console.log(x !== y);   // true

// So sánh với Number (chỉ giá trị, không kiểu)
console.log(10n == 10);   // true (so sánh giá trị)
console.log(10n === 10);  // false (khác kiểu)
console.log(10n < 15);    // true (OK)
console.log(10n > 5);     // true (OK)
```

### Toán tử bitwise

```javascript
const a = 12n;  // 1100 in binary
const b = 5n;   // 0101 in binary

console.log(a & b);   // 4n  (0100 - AND)
console.log(a | b);   // 13n (1101 - OR)
console.log(a ^ b);   // 9n  (1001 - XOR)
console.log(~a);      // -13n (NOT)
console.log(a << 1n); // 24n (shift left)
console.log(a >> 1n); // 6n  (shift right)
```

## 4. Hạn Chế Của BigInt

### Không thể trộn với Number

```javascript
const bigNum = 10n;
const regularNum = 5;

// ❌ Lỗi - không thể trộn BigInt với Number
// console.log(bigNum + regularNum);     // TypeError!
// console.log(bigNum * regularNum);     // TypeError!

// ✅ Phải chuyển đổi kiểu
console.log(bigNum + BigInt(regularNum)); // 15n
console.log(Number(bigNum) + regularNum); // 15
```

### Không dùng được với Math

```javascript
const big = 16n;

// ❌ Math object không hỗ trợ BigInt
// console.log(Math.sqrt(big));      // TypeError!
// console.log(Math.max(1n, 2n));   // TypeError!

// ✅ Phải chuyển về Number (nếu an toàn)
console.log(Math.sqrt(Number(big))); // 4

// Hoặc tự implement
function bigIntMax(...values) {
    let max = values[0];
    for (let i = 1; i < values.length; i++) {
        if (values[i] > max) {
            max = values[i];
        }
    }
    return max;
}

console.log(bigIntMax(1n, 5n, 3n)); // 5n
```

### JSON không hỗ trợ BigInt

```javascript
const data = { big: 123n };

// ❌ JSON.stringify không hỗ trợ BigInt
// console.log(JSON.stringify(data)); // TypeError!

// ✅ Cần custom serializer
const jsonData = JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() + 'n' : value
);

console.log(jsonData); // '{"big":"123n"}'

// Parse lại
const parsed = JSON.parse(jsonData, (key, value) =>
    typeof value === 'string' && value.endsWith('n') 
        ? BigInt(value.slice(0, -1)) 
        : value
);

console.log(parsed.big); // 123n
```

## 5. Chuyển Đổi Kiểu

### BigInt sang Number

```javascript
const big = 123n;

// Chuyển về Number
console.log(Number(big));           // 123
console.log(parseInt(big.toString())); // 123

// Cảnh báo: Mất độ chính xác với số lớn
const hugeBig = 9007199254740992n;
console.log(Number(hugeBig));       // 9007199254740992 (có thể mất độ chính xác)
console.log(Number.isSafeInteger(Number(hugeBig))); // false
```

### Number sang BigInt

```javascript
const num = 123;

console.log(BigInt(num));           // 123n
console.log(BigInt(Math.floor(num))); // 123n (đảm bảo là số nguyên)

// Kiểm tra an toàn trước khi chuyển
function safeBigInt(num) {
    if (!Number.isInteger(num)) {
        throw new Error("Must be an integer");
    }
    return BigInt(num);
}

console.log(safeBigInt(123));       // 123n
// safeBigInt(123.45);              // Error!
```

### Chuyển sang chuỗi

```javascript
const big = 123456789012345678901234567890n;

console.log(big.toString());        // "123456789012345678901234567890"
console.log(String(big));           // "123456789012345678901234567890"
console.log(`${big}`);              // "123456789012345678901234567890"

// Chuyển sang hệ số khác
console.log(big.toString(16));      // hex
console.log(big.toString(2));       // binary
console.log(big.toString(8));       // octal
```

## 6. Kiểm Tra Kiểu BigInt

### Các cách kiểm tra

```javascript
const big = 123n;
const num = 123;

// Kiểm tra kiểu
console.log(typeof big);            // "bigint"
console.log(typeof num);            // "number"

// Function kiểm tra
function isBigInt(value) {
    return typeof value === 'bigint';
}

console.log(isBigInt(big));         // true
console.log(isBigInt(num));         // false

// Kiểm tra có thể chuyển thành BigInt không
function canBeBigInt(value) {
    try {
        BigInt(value);
        return true;
    } catch {
        return false;
    }
}

console.log(canBeBigInt(123));      // true
console.log(canBeBigInt("123"));    // true
console.log(canBeBigInt(3.14));     // false
```

## 7. Ví Dụ Thực Tế

### Tính giai thừa số lớn

```javascript
function bigFactorial(n) {
    if (typeof n !== 'bigint') {
        n = BigInt(n);
    }
    
    if (n < 0n) {
        throw new Error("Factorial không xác định cho số âm");
    }
    
    if (n === 0n || n === 1n) {
        return 1n;
    }
    
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

console.log(bigFactorial(20));  // 2432902008176640000n
console.log(bigFactorial(50));  // Số rất lớn mà Number không thể xử lý chính xác
```

### Fibonacci với số lớn

```javascript
function bigFibonacci(n) {
    if (typeof n !== 'bigint') {
        n = BigInt(n);
    }
    
    if (n < 0n) return 0n;
    if (n === 0n || n === 1n) return n;
    
    let a = 0n;
    let b = 1n;
    
    for (let i = 2n; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    
    return b;
}

console.log(bigFibonacci(100)); // 354224848179261915075n
console.log(bigFibonacci(1000)); // Số Fibonacci rất lớn
```

### Xử lý ID lớn

```javascript
class BigIntID {
    constructor(id) {
        this.id = typeof id === 'bigint' ? id : BigInt(id);
    }
    
    toString() {
        return this.id.toString();
    }
    
    equals(other) {
        return this.id === (other instanceof BigIntID ? other.id : BigInt(other));
    }
    
    increment() {
        return new BigIntID(this.id + 1n);
    }
    
    toJSON() {
        return this.id.toString();
    }
    
    static fromString(str) {
        return new BigIntID(BigInt(str));
    }
}

// Sử dụng
const userId = new BigIntID("9007199254740992");
console.log(userId.toString());         // "9007199254740992"
console.log(userId.increment().toString()); // "9007199254740993"
```

### Cryptocurrency calculations

```javascript
// Tính toán với đơn vị nhỏ (như satoshi cho Bitcoin)
const SATOSHI_PER_BTC = 100000000n; // 1 BTC = 100,000,000 satoshi

class BitcoinAmount {
    constructor(satoshi) {
        this.satoshi = typeof satoshi === 'bigint' ? satoshi : BigInt(satoshi);
    }
    
    static fromBTC(btc) {
        // Chuyển từ BTC sang satoshi
        const btcBigInt = BigInt(Math.floor(btc * 100000000));
        return new BitcoinAmount(btcBigInt);
    }
    
    toBTC() {
        // Chuyển từ satoshi sang BTC
        return Number(this.satoshi) / Number(SATOSHI_PER_BTC);
    }
    
    add(other) {
        return new BitcoinAmount(this.satoshi + other.satoshi);
    }
    
    subtract(other) {
        return new BitcoinAmount(this.satoshi - other.satoshi);
    }
    
    toString() {
        return `${this.satoshi.toString()} satoshi`;
    }
}

// Sử dụng
const amount1 = BitcoinAmount.fromBTC(0.5);
const amount2 = new BitcoinAmount(25000000n); // 0.25 BTC

const total = amount1.add(amount2);
console.log(total.toString());        // "75000000 satoshi"
console.log(total.toBTC());           // 0.75
```

## 8. Performance và Giới Hạn

### So sánh hiệu suất

```javascript
// Benchmark BigInt vs Number
console.time("Number calculation");
let numResult = 0;
for (let i = 0; i < 1000000; i++) {
    numResult += i;
}
console.timeEnd("Number calculation");

console.time("BigInt calculation");
let bigResult = 0n;
for (let i = 0n; i < 1000000n; i++) {
    bigResult += i;
}
console.timeEnd("BigInt calculation");

// Number nhanh hơn đáng kể, chỉ dùng BigInt khi thật cần thiết
```

### Khi nào nên dùng BigInt

```javascript
// ✅ Nên dùng BigInt khi:
// - Xử lý ID lớn từ database
// - Tính toán cryptography
// - Làm việc với timestamp microsecond
// - Tính toán số học chính xác với số rất lớn

// ❌ Không nên dùng BigInt khi:
// - Số trong phạm vi safe integer
// - Cần hiệu suất cao cho phép toán đơn giản
// - Làm việc với Math object
// - Cần serialize JSON thường xuyên
```

## 9. Browser Support và Polyfill

### Kiểm tra hỗ trợ

```javascript
function supportsBigInt() {
    return typeof BigInt !== 'undefined';
}

if (supportsBigInt()) {
    console.log("Browser hỗ trợ BigInt");
    const big = 123n;
} else {
    console.log("Browser không hỗ trợ BigInt");
    // Dùng polyfill hoặc fallback
}
```

### Fallback cho môi trường cũ

```javascript
function createLargeNumber(value) {
    if (typeof BigInt !== 'undefined') {
        return BigInt(value);
    } else {
        // Fallback: dùng string hoặc library như big.js
        console.warn("BigInt not supported, using string representation");
        return value.toString();
    }
}

// Hoặc dùng library như big.js, decimal.js
// const Big = require('big.js');
// const big = new Big(value);
```

## 10. Tóm Tắt

### Đặc điểm chính của BigInt:

1. **Mục đích:** Xử lý số nguyên lớn hơn `Number.MAX_SAFE_INTEGER`

2. **Khai báo:** 
   - Hậu tố `n`: `123n`
   - Constructor: `BigInt(123)`

3. **Toán tử:** Hỗ trợ đầy đủ `+`, `-`, `*`, `/`, `%`, `**`, bitwise

4. **Hạn chế:**
   - Không trộn được với Number
   - Không dùng với Math object
   - JSON không hỗ trợ native

5. **Chuyển đổi:**
   - `Number(bigint)` - cẩn thận mất độ chính xác
   - `bigint.toString()` - chuyển sang chuỗi

### Khi nào sử dụng:

- ✅ ID lớn, timestamp microsecond, cryptography
- ✅ Tính toán số học chính xác với số rất lớn
- ❌ Phép toán thông thường trong phạm vi safe integer
- ❌ Khi cần hiệu suất cao cho phép toán đơn giản

BigInt là công cụ mạnh mẽ cho các tình huống đặc biệt, không phải thay thế cho Number trong mọi trường hợp!
