---
slug: javascript-co-ban-bai-13
url: /posts/javascript-co-ban-bai-13/
title: "JavaScript Cơ Bản - Bài 13: Template Literals Và Chuyển Đổi Number-String"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về Template Literals với backticks, nhúng biến và biểu thức động, cùng với cách chuyển đổi giữa Number và String trong JavaScript"
---

# JavaScript Cơ Bản - Bài 13: Template Literals Và Chuyển Đổi Number-String

Template literals là một tính năng mạnh mẽ của ES6 giúp tối ưu hóa việc nối chuỗi và nhúng biến. Cùng với đó, việc hiểu rõ cách chuyển đổi giữa số và chuỗi sẽ giúp bạn xử lý dữ liệu hiệu quả hơn trong JavaScript.

## Video Hướng Dẫn

{{< youtube hiFBsPtFgOg >}}

## 1. Template Literals Cơ Bản

### Cú pháp với backticks

```javascript
// Cách cũ - nối chuỗi với +
let name = "Long";
let age = 25;
let oldWay = "Xin chào, tôi là " + name + " và tôi " + age + " tuổi";

// Template literals - dễ đọc và hiệu quả hơn
let newWay = `Xin chào, tôi là ${name} và tôi ${age} tuổi`;

console.log(oldWay);  // "Xin chào, tôi là Long và tôi 25 tuổi"
console.log(newWay);  // "Xin chào, tôi là Long và tôi 25 tuổi"
```

### Ưu điểm của Template Literals

```javascript
// 1. Code dễ đọc hơn
let product = "iPhone";
let price = 25000000;
let currency = "VNĐ";

// Cách cũ - khó đọc và dễ lỗi
let message1 = "Sản phẩm: " + product + "\nGiá: " + price + " " + currency + "\nTrạng thái: Còn hàng";

// Template literals - rõ ràng hơn
let message2 = `Sản phẩm: ${product}
Giá: ${price} ${currency}
Trạng thái: Còn hàng`;

console.log(message2);
```

## 2. Nhúng Biểu Thức Trong Template Literals

### Tính toán trong ${}

```javascript
let a = 10;
let b = 5;

// Nhúng phép tính
console.log(`${a} + ${b} = ${a + b}`);         // "10 + 5 = 15"
console.log(`${a} * ${b} = ${a * b}`);         // "10 * 5 = 50"
console.log(`${a} > ${b} = ${a > b}`);         // "10 > 5 = true"

// Biểu thức phức tạp
let radius = 5;
console.log(`Diện tích hình tròn: ${Math.PI * radius ** 2}`);
// "Diện tích hình tròn: 78.53981633974483"
```

### Gọi hàm trong template literals

```javascript
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN');
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
}

let salary = 15000000;
let userName = "Long";

let welcomeMessage = `${getGreeting()}, ${userName}!
Lương của bạn tháng này: ${formatCurrency(salary)} VNĐ
Thuế phải nộp: ${formatCurrency(salary * 0.1)} VNĐ`;

console.log(welcomeMessage);
```

### Conditional expressions

```javascript
let user = { name: "Long", isAdmin: true, points: 150 };

let userInfo = `Người dùng: ${user.name}
Quyền: ${user.isAdmin ? 'Quản trị viên' : 'Người dùng thường'}
Hạng: ${user.points >= 100 ? 'VIP' : 'Thường'}
Điểm thưởng: ${user.points} ${user.points > 1 ? 'điểm' : 'điểm'}`;

console.log(userInfo);
```

## 3. Multiline Strings

### So sánh cách viết chuỗi nhiều dòng

```javascript
// Cách cũ - sử dụng \n và +
let htmlOld = "<div class=\"card\">\n" +
              "  <h2>Tiêu đề</h2>\n" +
              "  <p>Nội dung</p>\n" +
              "</div>";

// Template literals - tự nhiên hơn
let htmlNew = `<div class="card">
  <h2>Tiêu đề</h2>
  <p>Nội dung</p>
</div>`;

console.log(htmlNew);
```

### HTML Template động

```javascript
function createUserCard(user) {
    return `
    <div class="user-card ${user.isActive ? 'active' : 'inactive'}">
        <div class="avatar">
            <img src="${user.avatar || '/default-avatar.png'}" alt="${user.name}">
        </div>
        <div class="info">
            <h3>${user.name}</h3>
            <p class="email">${user.email}</p>
            <p class="role">${user.role || 'Người dùng'}</p>
            <div class="stats">
                <span>Đăng ký: ${new Date(user.joinDate).toLocaleDateString('vi-VN')}</span>
                <span>Điểm: ${user.points || 0}</span>
            </div>
        </div>
        ${user.isAdmin ? '<div class="admin-badge">Admin</div>' : ''}
    </div>`;
}

const user = {
    name: "Đoàn Đức Long",
    email: "long@example.com",
    role: "Developer",
    avatar: "/avatar.jpg",
    isActive: true,
    isAdmin: true,
    joinDate: "2023-01-15",
    points: 1250
};

console.log(createUserCard(user));
```

## 4. Chuyển Đổi Number Sang String

### Các phương pháp chuyển đổi

```javascript
let number = 123.456;

// 1. toString() method
console.log(number.toString());           // "123.456"
console.log(number.toString(2));          // "1111011.011101..." (nhị phân)
console.log(number.toString(16));         // "7b.74bc6a7ef9db..." (hex)

// 2. String() constructor
console.log(String(number));              // "123.456"

// 3. Template literals
console.log(`${number}`);                 // "123.456"

// 4. Nối với chuỗi rỗng
console.log(number + "");                 // "123.456"

// 5. JSON.stringify() (cho các trường hợp đặc biệt)
console.log(JSON.stringify(number));      // "123.456"
```

### Format số khi chuyển thành chuỗi

```javascript
let price = 1234567.89;

// Sử dụng toFixed() cho số thập phân cố định
console.log(price.toFixed(2));            // "1234567.89"
console.log(price.toFixed(0));            // "1234568"

// Sử dụng toPrecision() cho số chữ số có nghĩa
console.log(price.toPrecision(5));        // "1.2346e+6"

// Sử dụng toLocaleString() cho format địa phương
console.log(price.toLocaleString('vi-VN')); // "1.234.567,89"
console.log(price.toLocaleString('en-US')); // "1,234,567.89"

// Format tiền tệ
console.log(price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
})); // "1.234.568 ₫"
```

## 5. Chuyển Đổi String Sang Number

### Các phương pháp chuyển đổi

```javascript
let stringNumber = "123.456";
let stringInt = "789";

// 1. Number() constructor - khuyến nghị
console.log(Number(stringNumber));        // 123.456
console.log(Number(stringInt));           // 789
console.log(Number(""));                  // 0
console.log(Number("  42  "));            // 42 (tự động trim)
console.log(Number("abc"));               // NaN

// 2. parseInt() - chỉ lấy phần số nguyên
console.log(parseInt(stringNumber));      // 123
console.log(parseInt("123px"));           // 123
console.log(parseInt("px123"));           // NaN

// 3. parseFloat() - lấy số thực
console.log(parseFloat(stringNumber));    // 123.456
console.log(parseFloat("123.456px"));     // 123.456

// 4. Unary plus operator (+)
console.log(+stringNumber);               // 123.456
console.log(+stringInt);                  // 789
console.log(+"abc");                      // NaN

// 5. Math methods (tự động chuyển đổi)
console.log(Math.floor("123.456"));       // 123
console.log(Math.round("123.456"));       // 123
```

### Validation khi chuyển đổi

```javascript
function safeNumberConversion(value, defaultValue = 0) {
    const result = Number(value);
    
    if (Number.isNaN(result)) {
        console.warn(`Không thể chuyển "${value}" thành số, sử dụng giá trị mặc định: ${defaultValue}`);
        return defaultValue;
    }
    
    return result;
}

// Test
console.log(safeNumberConversion("123"));      // 123
console.log(safeNumberConversion("abc"));      // 0 (với warning)
console.log(safeNumberConversion("xyz", -1));  // -1 (với warning)

// Kiểm tra số hợp lệ
function isValidNumber(value) {
    return !Number.isNaN(Number(value)) && value.toString().trim() !== "";
}

console.log(isValidNumber("123"));    // true
console.log(isValidNumber("123.45")); // true
console.log(isValidNumber("abc"));    // false
console.log(isValidNumber(""));       // false
console.log(isValidNumber("  "));     // false
```

## 6. Ứng Dụng Thực Tế

### Form calculator với template literals

```javascript
class Calculator {
    constructor() {
        this.history = [];
    }
    
    calculate(a, b, operator) {
        const numA = Number(a);
        const numB = Number(b);
        
        // Validation
        if (Number.isNaN(numA) || Number.isNaN(numB)) {
            return `Lỗi: Vui lòng nhập số hợp lệ`;
        }
        
        let result;
        let operation;
        
        switch (operator) {
            case '+':
                result = numA + numB;
                operation = `${numA} + ${numB}`;
                break;
            case '-':
                result = numA - numB;
                operation = `${numA} - ${numB}`;
                break;
            case '*':
                result = numA * numB;
                operation = `${numA} × ${numB}`;
                break;
            case '/':
                if (numB === 0) {
                    return `Lỗi: Không thể chia cho 0`;
                }
                result = numA / numB;
                operation = `${numA} ÷ ${numB}`;
                break;
            default:
                return `Lỗi: Phép tính không hợp lệ`;
        }
        
        // Lưu lịch sử
        const calculation = {
            operation: operation,
            result: result,
            timestamp: new Date()
        };
        
        this.history.push(calculation);
        
        return `${operation} = ${result}`;
    }
    
    getHistory() {
        if (this.history.length === 0) {
            return "Chưa có phép tính nào được thực hiện.";
        }
        
        return `Lịch sử tính toán:
${this.history.map((calc, index) => 
    `${index + 1}. ${calc.operation} = ${calc.result}`
).join('\n')}`;
    }
    
    generateReport() {
        const total = this.history.length;
        const lastOperation = this.history[total - 1];
        
        return `📊 Báo cáo Calculator
━━━━━━━━━━━━━━━━━━━━━
📈 Tổng số phép tính: ${total}
🕐 Phép tính cuối: ${lastOperation ? lastOperation.operation + ' = ' + lastOperation.result : 'Chưa có'}
📅 Thời gian: ${lastOperation ? lastOperation.timestamp.toLocaleString('vi-VN') : 'N/A'}`;
    }
}

// Sử dụng calculator
const calc = new Calculator();

console.log(calc.calculate("10", "5", "+"));    // "10 + 5 = 15"
console.log(calc.calculate("20", "4", "/"));    // "20 ÷ 4 = 5"
console.log(calc.calculate("abc", "5", "*"));   // "Lỗi: Vui lòng nhập số hợp lệ"
console.log(calc.generateReport());
```

### Dynamic content generation

```javascript
function generateProductCard(product) {
    const {
        name,
        price,
        originalPrice,
        discount,
        rating,
        reviews,
        inStock,
        image,
        category
    } = product;
    
    // Tính toán giảm giá
    const discountPercent = originalPrice ? 
        Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    
    // Format giá
    const formattedPrice = Number(price).toLocaleString('vi-VN');
    const formattedOriginalPrice = originalPrice ? 
        Number(originalPrice).toLocaleString('vi-VN') : null;
    
    return `
    🛍️ **${name}**
    ━━━━━━━━━━━━━━━━━━━━━
    💰 Giá: ${formattedPrice} VNĐ ${formattedOriginalPrice ? `(Giá gốc: ${formattedOriginalPrice} VNĐ)` : ''}
    ${discountPercent > 0 ? `🔥 Giảm ${discountPercent}%` : ''}
    ⭐ Đánh giá: ${rating}/5 (${reviews} đánh giá)
    📦 Trạng thái: ${inStock ? '✅ Còn hàng' : '❌ Hết hàng'}
    🏷️ Danh mục: ${category}
    ${inStock ? 
        `\n🚀 Đặt hàng ngay để nhận ưu đãi!` : 
        `\n📧 Đăng ký nhận thông báo khi có hàng`
    }`;
}

const product = {
    name: "iPhone 15 Pro Max",
    price: 29990000,
    originalPrice: 34990000,
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    category: "Điện thoại"
};

console.log(generateProductCard(product));
```

### URL và query string builder

```javascript
class URLBuilder {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.params = new Map();
    }
    
    addParam(key, value) {
        // Chuyển tất cả về string để xử lý
        this.params.set(String(key), String(value));
        return this; // Method chaining
    }
    
    addParams(paramsObject) {
        Object.entries(paramsObject).forEach(([key, value]) => {
            this.addParam(key, value);
        });
        return this;
    }
    
    build() {
        if (this.params.size === 0) {
            return this.baseUrl;
        }
        
        const queryString = Array.from(this.params.entries())
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        
        return `${this.baseUrl}?${queryString}`;
    }
    
    toString() {
        return this.build();
    }
    
    // Template literal tag function
    static url(strings, ...values) {
        let result = strings[0];
        
        for (let i = 0; i < values.length; i++) {
            result += encodeURIComponent(String(values[i])) + strings[i + 1];
        }
        
        return result;
    }
}

// Sử dụng URL Builder
const apiUrl = new URLBuilder('https://api.example.com/search')
    .addParam('q', 'javascript tutorial')
    .addParam('page', 1)
    .addParam('limit', 20)
    .addParams({
        sort: 'date',
        category: 'programming',
        lang: 'vi'
    });

console.log(`API URL: ${apiUrl}`);
// "API URL: https://api.example.com/search?q=javascript%20tutorial&page=1&limit=20&sort=date&category=programming&lang=vi"

// Sử dụng tagged template
const userId = 123;
const action = 'profile/edit';
const adminUrl = URLBuilder.url`https://admin.example.com/user/${userId}/${action}`;
console.log(adminUrl);
```

## 7. Best Practices

### Template literals vs string concatenation

```javascript
// ❌ Tránh - khó đọc và maintain
function createMessage(user, order) {
    return "Xin chào " + user.name + "!\n" +
           "Đơn hàng #" + order.id + " của bạn đã được xác nhận.\n" +
           "Tổng tiền: " + order.total.toLocaleString() + " VNĐ\n" +
           "Thời gian giao hàng dự kiến: " + order.deliveryDate;
}

// ✅ Nên dùng - rõ ràng và dễ maintain
function createMessageImproved(user, order) {
    return `Xin chào ${user.name}!
Đơn hàng #${order.id} của bạn đã được xác nhận.
Tổng tiền: ${order.total.toLocaleString()} VNĐ
Thời gian giao hàng dự kiến: ${order.deliveryDate}`;
}
```

### Safe type conversion

```javascript
class TypeConverter {
    static toNumber(value, fallback = 0) {
        if (value === null || value === undefined) {
            return fallback;
        }
        
        const converted = Number(value);
        return Number.isNaN(converted) ? fallback : converted;
    }
    
    static toString(value, fallback = '') {
        if (value === null || value === undefined) {
            return fallback;
        }
        
        return String(value);
    }
    
    static formatNumber(value, options = {}) {
        const {
            decimals = 0,
            locale = 'vi-VN',
            currency = false,
            currencyCode = 'VND'
        } = options;
        
        const num = this.toNumber(value);
        
        if (currency) {
            return num.toLocaleString(locale, {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        }
        
        return num.toLocaleString(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }
}

// Test type converter
console.log(TypeConverter.toNumber("123.45"));        // 123.45
console.log(TypeConverter.toNumber("abc", -1));       // -1
console.log(TypeConverter.toString(123));             // "123"
console.log(TypeConverter.formatNumber(1234567.89, {
    decimals: 2,
    currency: true
})); // "1.234.567,89 ₫"
```

## 8. Tóm Tắt

### Template Literals:

1. **Cú pháp:** Sử dụng backticks `` ` ` `` thay vì quotes
2. **Interpolation:** `${variable}` để nhúng biến và biểu thức
3. **Multiline:** Hỗ trợ xuống dòng tự nhiên
4. **Expression:** Có thể chứa bất kỳ biểu thức JavaScript nào

### Number ↔ String Conversion:

| Chuyển đổi | Phương pháp | Ghi chú |
|------------|-------------|---------|
| **Number → String** | `String(num)`, `num.toString()`, `` `${num}` ``, `num + ""` | `toString()` hỗ trợ hệ số |
| **String → Number** | `Number(str)`, `parseInt(str)`, `parseFloat(str)`, `+str` | Cần validation |

### Lưu ý quan trọng:

- ✅ **Template literals** dễ đọc và maintain hơn string concatenation
- ✅ **Luôn validate** khi chuyển đổi kiểu dữ liệu
- ✅ **Sử dụng fallback values** cho các trường hợp lỗi
- ✅ **Format số** phù hợp với locale khi hiển thị
- ❌ **Tránh** chuyển đổi kiểu không an toàn

Template literals và type conversion là những kỹ năng cơ bản nhưng cực kỳ quan trọng trong JavaScript hiện đại!
