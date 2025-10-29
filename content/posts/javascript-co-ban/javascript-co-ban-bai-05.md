---
slug: javascript-co-ban-bai-05
url: /posts/javascript-co-ban-bai-05/
title: "JavaScript Cơ Bản - Bài 05: Khởi Tạo Biến Bằng var và let"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu sự khác biệt giữa var và let trong JavaScript - scope, hoisting và best practices"
---

# JavaScript Cơ Bản - Bài 05: Khởi Tạo Biến Bằng var và let

Trong JavaScript, có hai cách chính để khai báo biến: `var` (cách cũ) và `let` (ES6+). Việc hiểu rõ sự khác biệt giữa chúng rất quan trọng để viết code hiệu quả và tránh bugs. Hãy cùng khám phá chi tiết!

## Video Hướng Dẫn

{{< youtube kfibc_7N69o >}}

## Tổng Quan var vs let

| Đặc điểm | var | let |
|----------|-----|-----|
| **ES Version** | ES5 và trước | ES6+ (2015) |
| **Scope** | Function scope | Block scope |
| **Hoisting** | Có (undefined) | Có (Temporal Dead Zone) |
| **Re-declaration** | Có thể | Không thể |
| **Global Object** | Thêm vào window | Không thêm vào window |

## Function Scope vs Block Scope

### var - Function Scope
```javascript
function demonstrateVarScope() {
    console.log("=== VAR FUNCTION SCOPE ===");
    
    if (true) {
        var functionScoped = "Tôi có function scope";
    }
    
    // Có thể truy cập var bên ngoài block
    console.log(functionScoped);  // "Tôi có function scope"
    
    for (var i = 0; i < 3; i++) {
        var loopVar = "Trong vòng lặp " + i;
    }
    
    // Vẫn truy cập được sau vòng lặp
    console.log(i);        // 3
    console.log(loopVar);  // "Trong vòng lặp 2"
}

demonstrateVarScope();
```

### let - Block Scope
```javascript
function demonstrateLetScope() {
    console.log("=== LET BLOCK SCOPE ===");
    
    if (true) {
        let blockScoped = "Tôi có block scope";
        console.log(blockScoped);  // OK trong block
    }
    
    // console.log(blockScoped);  // ReferenceError
    
    for (let j = 0; j < 3; j++) {
        let loopLet = "Trong vòng lặp " + j;
        console.log(loopLet);
    }
    
    // console.log(j);        // ReferenceError
    // console.log(loopLet);  // ReferenceError
}

demonstrateLetScope();
```

## Hoisting Behavior

### var Hoisting
```javascript
console.log("=== VAR HOISTING ===");

// Truy cập trước khi khai báo
console.log(hoistedVar);  // undefined (không lỗi!)

var hoistedVar = "Tôi đã được hoisted";

console.log(hoistedVar);  // "Tôi đã được hoisted"

// Tương đương với:
// var hoistedVar;           // hoisted lên đầu
// console.log(hoistedVar);  // undefined
// hoistedVar = "Tôi đã được hoisted";
```

### let Hoisting và Temporal Dead Zone
```javascript
console.log("=== LET HOISTING & TDZ ===");

// console.log(hoistedLet);  // ReferenceError: Cannot access before initialization

let hoistedLet = "Tôi có Temporal Dead Zone";

console.log(hoistedLet);  // "Tôi có Temporal Dead Zone"

// Temporal Dead Zone: Vùng từ đầu scope đến khi biến được khai báo
function demonstrateTDZ() {
    // TDZ starts here for 'x'
    
    console.log("Before declaration");
    
    // console.log(x);  // ReferenceError
    
    let x = "Now accessible";  // TDZ ends here
    
    console.log(x);  // "Now accessible"
}
```

## Re-declaration

### var cho phép re-declaration
```javascript
console.log("=== VAR RE-DECLARATION ===");

var name = "John";
console.log(name);  // "John"

var name = "Jane";  // Không lỗi
console.log(name);  // "Jane"

var name = "Bob";   // Vẫn không lỗi
console.log(name);  // "Bob"
```

### let không cho phép re-declaration
```javascript
console.log("=== LET RE-DECLARATION ===");

let age = 25;
console.log(age);  // 25

// let age = 30;  // SyntaxError: Identifier 'age' has already been declared

// Nhưng có thể reassign
age = 30;  // OK
console.log(age);  // 30
```

## Loop Examples

### Vấn đề với var trong loops
```javascript
console.log("=== VAR TRONG LOOPS ===");

// Problem với var
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("var i:", i);  // In ra: 3, 3, 3 (không phải 0, 1, 2)
    }, 100);
}

// Tại sao? Vì var có function scope, chỉ có 1 biến i
// Khi setTimeout chạy, vòng lặp đã kết thúc và i = 3
```

### Giải pháp với let
```javascript
console.log("=== LET TRONG LOOPS ===");

// Solution với let
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("let j:", j);  // In ra: 0, 1, 2 (đúng như mong đợi)
    }, 200);
}

// Tại sao? Vì let có block scope, mỗi iteration có biến j riêng
```

### IIFE Workaround cho var
```javascript
console.log("=== IIFE WORKAROUND CHO VAR ===");

// Cách giải quyết cũ với IIFE (Immediately Invoked Function Expression)
for (var k = 0; k < 3; k++) {
    (function(index) {
        setTimeout(() => {
            console.log("IIFE k:", index);  // 0, 1, 2
        }, 300);
    })(k);
}
```

## Global Object Behavior

### var thêm vào global object
```javascript
console.log("=== VAR VÀ GLOBAL OBJECT ===");

var globalVar = "Tôi là global var";

// Trong browser
// console.log(window.globalVar);  // "Tôi là global var"

// Trong Node.js
console.log(global.globalVar);  // "Tôi là global var"
```

### let không thêm vào global object
```javascript
console.log("=== LET VÀ GLOBAL OBJECT ===");

let globalLet = "Tôi là global let";

// Trong browser
// console.log(window.globalLet);  // undefined

// Trong Node.js
console.log(global.globalLet);  // undefined

console.log(globalLet);  // "Tôi là global let" (vẫn truy cập được)
```

## Practical Examples

### 1. Event Listeners với var vs let
```javascript
// Vấn đề với var
function createButtonsWithVar() {
    const buttons = [];
    
    for (var i = 0; i < 3; i++) {
        const button = {
            id: i,
            click: function() {
                console.log("Button", i, "clicked");  // Luôn in "Button 3 clicked"
            }
        };
        buttons.push(button);
    }
    
    return buttons;
}

// Giải pháp với let
function createButtonsWithLet() {
    const buttons = [];
    
    for (let i = 0; i < 3; i++) {
        const button = {
            id: i,
            click: function() {
                console.log("Button", i, "clicked");  // In đúng "Button 0", "Button 1", "Button 2"
            }
        };
        buttons.push(button);
    }
    
    return buttons;
}

// Test
const varButtons = createButtonsWithVar();
const letButtons = createButtonsWithLet();

console.log("=== TESTING BUTTONS ===");
varButtons.forEach(btn => btn.click());  // Button 3 clicked × 3
letButtons.forEach(btn => btn.click());  // Button 0, 1, 2 clicked
```

### 2. Module Pattern
```javascript
// Module với var (cách cũ)
var CounterModule = (function() {
    var count = 0;  // Private variable
    
    return {
        increment: function() {
            count++;
        },
        decrement: function() {
            count--;
        },
        getCount: function() {
            return count;
        }
    };
})();

// Module với let (modern)
const createCounter = () => {
    let count = 0;  // Private variable
    
    return {
        increment() {
            count++;
        },
        decrement() {
            count--;
        },
        getCount() {
            return count;
        }
    };
};

const counter = createCounter();
```

### 3. Configuration Management
```javascript
// Bad practice với var
var config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

function updateConfig() {
    var config = {  // Accidentally shadowing global config
        apiUrl: "https://api-dev.example.com",
        timeout: 3000
    };
    
    // Logic here...
}

// Good practice với let/const
let appConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

function updateAppConfig() {
    // let appConfig = {  // SyntaxError: Identifier 'appConfig' has already been declared
    
    // Instead, modify existing config
    appConfig.apiUrl = "https://api-dev.example.com";
    appConfig.timeout = 3000;
}
```

## Performance Considerations

### Memory Leaks với var
```javascript
// Potential memory leak với var
function demonstrateMemoryLeak() {
    var largeArray = new Array(1000000).fill("data");
    
    for (var i = 0; i < 10; i++) {
        setTimeout(() => {
            // largeArray vẫn trong memory vì var có function scope
            console.log("Array length:", largeArray.length);
        }, 1000);
    }
}

// Better với let
function betterMemoryManagement() {
    let largeArray = new Array(1000000).fill("data");
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            // Each iteration has its own scope
            if (i === 0) {
                console.log("Array length:", largeArray.length);
            }
        }, 1000);
    }
    
    // largeArray có thể được garbage collected sau function
}
```

## Best Practices

### 1. Ưu tiên let và const
```javascript
// ✅ Modern approach
const PI = 3.14159;        // Hằng số
let radius = 5;            // Biến có thể thay đổi
let area = PI * radius * radius;

// ❌ Legacy approach
var PI_OLD = 3.14159;
var radius_old = 5;
var area_old = PI_OLD * radius_old * radius_old;
```

### 2. Block scope cho clarity
```javascript
// ✅ Clear scope boundaries
function processItems(items) {
    const results = [];
    
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let processed = processItem(item);
        results.push(processed);
    }
    
    // i và item không accessible ở đây
    return results;
}

// ❌ Unclear scope
function processItemsOld(items) {
    var results = [];
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var processed = processItem(item);
        results.push(processed);
    }
    
    // i và item vẫn accessible ở đây (confusing)
    return results;
}
```

### 3. Avoid global pollution
```javascript
// ❌ Global pollution với var
var userName = "john";
var userAge = 30;
var userEmail = "john@example.com";

// ✅ Organized với let/const
const user = {
    name: "john",
    age: 30,
    email: "john@example.com"
};

// Hoặc sử dụng modules
const userModule = (() => {
    let name = "john";
    let age = 30;
    let email = "john@example.com";
    
    return {
        getName: () => name,
        getAge: () => age,
        getEmail: () => email,
        setName: (newName) => name = newName
    };
})();
```

## Migration Guide

### Từ var sang let/const
```javascript
// Before (var)
function oldCode() {
    var isValid = false;
    var message = "";
    var attempts = 0;
    
    if (condition) {
        var result = processData();
        isValid = result.success;
        message = result.message;
    }
    
    for (var i = 0; i < attempts; i++) {
        var status = retry();
        if (status.success) break;
    }
    
    return { isValid, message };
}

// After (let/const)
function modernCode() {
    let isValid = false;
    let message = "";
    const maxAttempts = 3;
    
    if (condition) {
        const result = processData();
        isValid = result.success;
        message = result.message;
    }
    
    for (let i = 0; i < maxAttempts; i++) {
        const status = retry();
        if (status.success) break;
    }
    
    return { isValid, message };
}
```

## Common Mistakes

### 1. Mixing var và let
```javascript
// ❌ Inconsistent
var name = "John";
let age = 30;
var city = "New York";
let country = "USA";

// ✅ Consistent
const name = "John";
let age = 30;
const city = "New York";
const country = "USA";
```

### 2. Loop counter leaks
```javascript
// ❌ Counter leak
for (var i = 0; i < 10; i++) {
    // do something
}
console.log(i);  // 10 (leaked!)

// ✅ Proper scoping
for (let j = 0; j < 10; j++) {
    // do something
}
// console.log(j);  // ReferenceError (good!)
```

## Browser Compatibility

### Support
- **var**: Tất cả browsers (ES1)
- **let**: IE11+, Chrome 41+, Firefox 44+, Safari 10+
- **const**: IE11+, Chrome 21+, Firefox 36+, Safari 5.1+

### Polyfills và Transpiling
```javascript
// ES6+ code
let x = 10;
const y = 20;

// Transpiled to ES5 (Babel)
var x = 10;
var y = 20;
```

## Kết Luận

🎉 **Bạn đã học được:**
- ✅ Sự khác biệt giữa `var` và `let`
- ✅ Function scope vs Block scope
- ✅ Hoisting và Temporal Dead Zone
- ✅ Re-declaration behaviors
- ✅ Global object interactions
- ✅ Best practices và migration strategies
- ✅ Common mistakes cần tránh

### Recommendation
**Sử dụng theo thứ tự ưu tiên:**
1. `const` - cho values không thay đổi
2. `let` - cho variables cần reassign
3. `var` - chỉ khi cần legacy support

**Bước tiếp theo**: Học về Data Types và Type Conversion!

---

*Understanding var vs let là crucial để viết JavaScript modern và tránh bugs. Practice makes perfect!*
