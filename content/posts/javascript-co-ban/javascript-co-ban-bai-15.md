---
slug: javascript-co-ban-bai-15
url: /posts/javascript-co-ban-bai-15/
title: "JavaScript Cơ Bản - Bài 15: Các Phương Thức Biến Đổi Và Tiện Ích String"
date: 2025-10-20T19:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về split(), replace(), trim(), concat() và các phương thức biến đổi, phân tách chuỗi trong JavaScript"
---

# JavaScript Cơ Bản - Bài 15: Các Phương Thức Biến Đổi Và Tiện Ích String

Các phương thức biến đổi chuỗi là công cụ mạnh mẽ giúp bạn xử lý, làm sạch và chuyển đổi dữ liệu văn bản. Từ việc tách chuỗi thành mảng đến thay thế nội dung, những phương thức này rất quan trọng trong việc xử lý dữ liệu thực tế.

## Video Hướng Dẫn

{{< youtube AXm1IcHtIIE >}}

## 1. split() - Tách Chuỗi Thành Mảng

### Cú pháp cơ bản

```javascript
// Tách theo ký tự cụ thể
let languages = "JavaScript,Python,Java,C++";
let languageArray = languages.split(",");
console.log(languageArray);
// ["JavaScript", "Python", "Java", "C++"]

// Tách theo khoảng trắng
let sentence = "Hello World JavaScript";
let words = sentence.split(" ");
console.log(words);
// ["Hello", "World", "JavaScript"]

// Tách thành từng ký tự
let word = "Hello";
let characters = word.split("");
console.log(characters);
// ["H", "e", "l", "l", "o"]
```

### Tham số limit

```javascript
let text = "a-b-c-d-e-f";

// Không giới hạn
console.log(text.split("-"));
// ["a", "b", "c", "d", "e", "f"]

// Giới hạn 3 phần tử
console.log(text.split("-", 3));
// ["a", "b", "c"]

// Giới hạn 0 (trả về mảng rỗng)
console.log(text.split("-", 0));
// []
```

### Các trường hợp đặc biệt

```javascript
let text = "Hello World";

// Split với chuỗi rỗng
console.log("abc".split(""));        // ["a", "b", "c"]

// Split không tìm thấy separator
console.log(text.split("xyz"));      // ["Hello World"]

// Split với separator ở đầu/cuối
console.log(",a,b,c,".split(","));   // ["", "a", "b", "c", ""]

// Split chuỗi rỗng
console.log("".split(","));          // [""]
console.log("".split(""));           // []
```

### Ứng dụng thực tế với split()

```javascript
// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const data = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        
        return row;
    });
    
    return { headers, data };
}

const csvData = `Name,Age,City
Long,25,Hanoi
Mai,23,HCMC
Nam,27,Danang`;

console.log(parseCSV(csvData));

// Tách họ tên
function splitFullName(fullName) {
    const parts = fullName.trim().split(/\s+/); // Split theo nhiều khoảng trắng
    
    if (parts.length === 1) {
        return { firstName: parts[0], lastName: '', middleName: '' };
    } else if (parts.length === 2) {
        return { 
            firstName: parts[0], 
            lastName: parts[1], 
            middleName: '' 
        };
    } else {
        return {
            firstName: parts[0],
            middleName: parts.slice(1, -1).join(' '),
            lastName: parts[parts.length - 1]
        };
    }
}

console.log(splitFullName("Nguyễn Văn A"));
// { firstName: "Nguyễn", middleName: "Văn", lastName: "A" }

console.log(splitFullName("Trần Thị Bích Ngọc"));
// { firstName: "Trần", middleName: "Thị Bích", lastName: "Ngọc" }

// Parse URL path
function parseURLPath(url) {
    // Loại bỏ protocol và domain
    const pathStart = url.indexOf('/', url.indexOf('://') + 3);
    if (pathStart === -1) return [];
    
    const path = url.substring(pathStart + 1);
    
    // Loại bỏ query string và hash
    const cleanPath = path.split('?')[0].split('#')[0];
    
    return cleanPath ? cleanPath.split('/') : [];
}

console.log(parseURLPath("https://example.com/users/123/profile"));
// ["users", "123", "profile"]

console.log(parseURLPath("https://example.com/search?q=javascript#results"));
// ["search"]
```

## 2. replace() - Thay Thế Nội Dung

### Replace cơ bản

```javascript
let text = "JavaScript is awesome. JavaScript is powerful.";

// Replace lần đầu tiên
console.log(text.replace("JavaScript", "JS"));
// "JS is awesome. JavaScript is powerful."

// Replace tất cả với global flag
console.log(text.replace(/JavaScript/g, "JS"));
// "JS is awesome. JS is powerful."

// Replace case insensitive
console.log(text.replace(/javascript/gi, "JS"));
// "JS is awesome. JS is powerful."
```

### Replace với function callback

```javascript
let text = "The price is $100 and $200";

// Replace với function
let result = text.replace(/\$(\d+)/g, function(match, number) {
    return `${parseInt(number) * 1000} VNĐ`;
});

console.log(result);
// "The price is 100000 VNĐ and 200000 VNĐ"

// Arrow function version
let result2 = text.replace(/\$(\d+)/g, (match, number) => 
    `${parseInt(number) * 23000} VNĐ`
);

console.log(result2);
// "The price is 2300000 VNĐ and 4600000 VNĐ"
```

### replaceAll() (ES2021)

```javascript
let text = "apple apple banana apple";

// Cách cũ với global regex
console.log(text.replace(/apple/g, "orange"));
// "orange orange banana orange"

// ES2021 replaceAll()
console.log(text.replaceAll("apple", "orange"));
// "orange orange banana orange"

// replaceAll với regex (phải có global flag)
console.log(text.replaceAll(/apple/g, "orange"));
// "orange orange banana orange"
```

### Ứng dụng thực tế với replace

```javascript
// Làm sạch input
class TextCleaner {
    static cleanInput(input) {
        return input
            .replace(/\s+/g, ' ')           // Nhiều space thành 1
            .replace(/[<>]/g, '')           // Xóa < >
            .replace(/javascript:/gi, '')    // Xóa javascript: (XSS)
            .trim();
    }
    
    static removeHTMLTags(html) {
        return html.replace(/<[^>]*>/g, '');
    }
    
    static maskSensitiveInfo(text) {
        return text
            .replace(/\d{4}-\d{4}-\d{4}-\d{4}/g, '**** **** **** ****') // Credit card
            .replace(/\d{3}-\d{2}-\d{4}/g, '***-**-****')              // SSN
            .replace(/(\w+)@(\w+)\.(\w+)/g, '$1***@$2.$3');            // Email
    }
    
    static formatPhoneNumber(phone) {
        // Chỉ giữ lại số
        const cleaned = phone.replace(/\D/g, '');
        
        // Format theo pattern Việt Nam
        if (cleaned.length === 10 && cleaned.startsWith('0')) {
            return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        
        return phone; // Trả về nguyên bản nếu không match
    }
    
    static createSlug(text) {
        return text
            .toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')   // Chỉ giữ chữ, số, space, dash
            .replace(/\s+/g, '-')           // Space thành dash
            .replace(/-+/g, '-')            // Nhiều dash thành 1
            .replace(/^-|-$/g, '');         // Xóa dash đầu/cuối
    }
}

// Test text cleaner
console.log(TextCleaner.cleanInput("  Hello   World  <script>  "));
console.log(TextCleaner.removeHTMLTags("<p>Hello <b>World</b></p>"));
console.log(TextCleaner.maskSensitiveInfo("Card: 1234-5678-9012-3456, Email: user@gmail.com"));
console.log(TextCleaner.formatPhoneNumber("0123456789"));
console.log(TextCleaner.createSlug("Học JavaScript Cơ Bản!"));
```

## 3. trim() - Loại Bỏ Khoảng Trắng

### Trim methods

```javascript
let text = "   Hello World   ";

// trim() - loại bỏ đầu và cuối
console.log(`"${text.trim()}"`);           // "Hello World"

// trimStart() / trimLeft() - chỉ loại bỏ đầu
console.log(`"${text.trimStart()}"`);      // "Hello World   "

// trimEnd() / trimRight() - chỉ loại bỏ cuối  
console.log(`"${text.trimEnd()}"`);        // "   Hello World"

// Original không thay đổi
console.log(`"${text}"`);                  // "   Hello World   "
```

### Trim với các ký tự khác

```javascript
// Custom trim function
function customTrim(str, chars = ' \t\n\r') {
    const escapeRegex = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^[${escapeRegex}]+|[${escapeRegex}]+$`, 'g');
    return str.replace(regex, '');
}

// Loại bỏ dấu chấm
console.log(customTrim("...Hello World...", "."));
// "Hello World"

// Loại bỏ nhiều ký tự
console.log(customTrim("***---Hello World---***", "*-"));
// "Hello World"

// Normalize whitespace
function normalizeWhitespace(str) {
    return str
        .trim()                          // Xóa đầu cuối
        .replace(/\s+/g, ' ');          // Nhiều space thành 1
}

console.log(normalizeWhitespace("  Hello    World  \n\t  "));
// "Hello World"
```

### Ứng dụng với form processing

```javascript
class FormProcessor {
    static processInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .trim()                                    // Xóa space đầu cuối
            .replace(/\s+/g, ' ')                     // Normalize space
            .replace(/^\w/, char => char.toUpperCase()); // Capitalize
    }
    
    static processForm(formData) {
        const processed = {};
        
        for (const [key, value] of Object.entries(formData)) {
            if (typeof value === 'string') {
                processed[key] = this.processInput(value);
                
                // Validation after processing
                if (key === 'email') {
                    processed[key] = value.toLowerCase().trim();
                }
                
                if (key === 'phone') {
                    processed[key] = value.replace(/\D/g, ''); // Chỉ giữ số
                }
                
                // Kiểm tra empty sau khi trim
                if (processed[key] === '') {
                    processed[key] = null;
                }
            } else {
                processed[key] = value;
            }
        }
        
        return processed;
    }
    
    static validateRequired(data, requiredFields) {
        const errors = {};
        
        requiredFields.forEach(field => {
            if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
                errors[field] = `${field} is required`;
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

// Test form processor
const rawFormData = {
    name: "  nguyễn văn a  ",
    email: "  USER@GMAIL.COM  ",
    phone: "  0123-456-789  ",
    address: "",
    notes: "   Hello    world   "
};

const processedData = FormProcessor.processForm(rawFormData);
console.log(processedData);

const validation = FormProcessor.validateRequired(processedData, ['name', 'email']);
console.log(validation);
```

## 4. concat() - Nối Chuỗi

### Cú pháp concat()

```javascript
let str1 = "Hello";
let str2 = " ";
let str3 = "World";

// Sử dụng concat()
let result1 = str1.concat(str2, str3);
console.log(result1); // "Hello World"

// Concat với nhiều tham số
let result2 = "".concat("A", " ", "B", " ", "C");
console.log(result2); // "A B C"

// So sánh với các cách khác
let result3 = str1 + str2 + str3;           // Toán tử +
let result4 = `${str1}${str2}${str3}`;      // Template literals
let result5 = [str1, str2, str3].join("");  // Array join

console.log(result1 === result3); // true
console.log(result1 === result4); // true
console.log(result1 === result5); // true
```

### Performance comparison

```javascript
// Benchmark các phương pháp nối chuỗi
function benchmarkStringConcat() {
    const iterations = 100000;
    const testStrings = ["Hello", " ", "beautiful", " ", "World"];
    
    console.time("concat()");
    for (let i = 0; i < iterations; i++) {
        "".concat(...testStrings);
    }
    console.timeEnd("concat()");
    
    console.time("+ operator");
    for (let i = 0; i < iterations; i++) {
        testStrings[0] + testStrings[1] + testStrings[2] + testStrings[3] + testStrings[4];
    }
    console.timeEnd("+ operator");
    
    console.time("template literals");
    for (let i = 0; i < iterations; i++) {
        `${testStrings[0]}${testStrings[1]}${testStrings[2]}${testStrings[3]}${testStrings[4]}`;
    }
    console.timeEnd("template literals");
    
    console.time("array join");
    for (let i = 0; i < iterations; i++) {
        testStrings.join("");
    }
    console.timeEnd("array join");
}

// benchmarkStringConcat(); // Uncomment để test
```

### StringBuilder pattern

```javascript
class StringBuilder {
    constructor() {
        this.parts = [];
    }
    
    append(str) {
        this.parts.push(String(str));
        return this; // Method chaining
    }
    
    appendLine(str = '') {
        this.parts.push(String(str), '\n');
        return this;
    }
    
    insert(index, str) {
        this.parts.splice(index, 0, String(str));
        return this;
    }
    
    clear() {
        this.parts = [];
        return this;
    }
    
    toString() {
        return this.parts.join('');
    }
    
    get length() {
        return this.toString().length;
    }
    
    // Conditional append
    appendIf(condition, str) {
        if (condition) {
            this.append(str);
        }
        return this;
    }
    
    // Format append
    appendFormat(template, ...args) {
        let formatted = template;
        args.forEach((arg, index) => {
            formatted = formatted.replace(`{${index}}`, String(arg));
        });
        this.append(formatted);
        return this;
    }
}

// Sử dụng StringBuilder
const html = new StringBuilder()
    .append('<div class="container">')
    .appendLine()
    .append('  <h1>Title</h1>')
    .appendLine()
    .appendIf(true, '  <p>Conditional content</p>')
    .appendLine()
    .appendFormat('  <p>Hello {0}, you have {1} messages</p>', 'User', 5)
    .appendLine()
    .append('</div>')
    .toString();

console.log(html);
```

## 5. Kết Hợp Các Phương Thức

### Text processor hoàn chỉnh

```javascript
class AdvancedTextProcessor {
    constructor(text) {
        this.original = text;
        this.current = text;
        this.history = [text];
    }
    
    // Method chaining pattern
    trim() {
        this.current = this.current.trim();
        this.history.push(this.current);
        return this;
    }
    
    normalize() {
        this.current = this.current.replace(/\s+/g, ' ');
        this.history.push(this.current);
        return this;
    }
    
    replace(searchValue, replaceValue) {
        if (searchValue instanceof RegExp) {
            this.current = this.current.replace(searchValue, replaceValue);
        } else {
            this.current = this.current.split(searchValue).join(replaceValue);
        }
        this.history.push(this.current);
        return this;
    }
    
    split(separator) {
        return this.current.split(separator);
    }
    
    titleCase() {
        this.current = this.current
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        this.history.push(this.current);
        return this;
    }
    
    removeExtraSpaces() {
        this.current = this.current
            .replace(/^\s+|\s+$/g, '')    // Trim
            .replace(/\s+/g, ' ');        // Normalize
        this.history.push(this.current);
        return this;
    }
    
    mask(pattern, maskChar = '*') {
        this.current = this.current.replace(pattern, match => 
            maskChar.repeat(match.length)
        );
        this.history.push(this.current);
        return this;
    }
    
    // Utility methods
    toString() {
        return this.current;
    }
    
    getHistory() {
        return [...this.history];
    }
    
    undo() {
        if (this.history.length > 1) {
            this.history.pop();
            this.current = this.history[this.history.length - 1];
        }
        return this;
    }
    
    reset() {
        this.current = this.original;
        this.history = [this.original];
        return this;
    }
    
    // Static methods
    static process(text) {
        return new AdvancedTextProcessor(text);
    }
    
    static clean(text) {
        return text
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[^\w\s\-_.@]/g, '');
    }
}

// Sử dụng processor
const processor = AdvancedTextProcessor
    .process("  HELLO   WORLD  JavaScript  Programming  ")
    .trim()
    .normalize()
    .titleCase()
    .replace("Javascript", "JS");

console.log(processor.toString());
// "Hello World JS Programming"

// Chain processing
const emailProcessor = AdvancedTextProcessor
    .process("  USER@DOMAIN.COM  ")
    .trim()
    .replace(/(.+)@(.+)/, (match, user, domain) => 
        `${user.toLowerCase()}@${domain.toLowerCase()}`
    );

console.log(emailProcessor.toString()); // "user@domain.com"
```

### URL và path processor

```javascript
class URLProcessor {
    static cleanPath(path) {
        return path
            .split('/')
            .filter(segment => segment && segment !== '.')
            .reduce((acc, segment) => {
                if (segment === '..') {
                    acc.pop();
                } else {
                    acc.push(segment);
                }
                return acc;
            }, [])
            .join('/');
    }
    
    static extractParams(url) {
        const paramString = url.split('?')[1];
        if (!paramString) return {};
        
        return paramString
            .split('&')
            .reduce((params, pair) => {
                const [key, value] = pair.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                return params;
            }, {});
    }
    
    static buildURL(base, path = '', params = {}) {
        let url = base.replace(/\/$/, ''); // Remove trailing slash
        
        if (path) {
            const cleanedPath = path.replace(/^\//, ''); // Remove leading slash
            url += '/' + cleanedPath;
        }
        
        const paramString = Object.entries(params)
            .filter(([key, value]) => value !== null && value !== undefined)
            .map(([key, value]) => 
                `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
            )
            .join('&');
        
        if (paramString) {
            url += '?' + paramString;
        }
        
        return url;
    }
    
    static parseURL(url) {
        const [baseAndPath, hash] = url.split('#');
        const [fullPath, queryString] = baseAndPath.split('?');
        
        // Extract protocol, domain, and path
        const protocolMatch = fullPath.match(/^(\w+):\/\//);
        const protocol = protocolMatch ? protocolMatch[1] : null;
        
        let remaining = protocolMatch ? fullPath.substring(protocolMatch[0].length) : fullPath;
        const firstSlash = remaining.indexOf('/');
        
        let domain, path;
        if (firstSlash === -1) {
            domain = remaining;
            path = '';
        } else {
            domain = remaining.substring(0, firstSlash);
            path = remaining.substring(firstSlash + 1);
        }
        
        return {
            protocol,
            domain,
            path: path ? path.split('/') : [],
            params: queryString ? this.extractParams('?' + queryString) : {},
            hash: hash || null,
            full: url
        };
    }
}

// Test URL processor
console.log(URLProcessor.cleanPath('/users/../admin/./dashboard/')); // "admin/dashboard"
console.log(URLProcessor.extractParams('?name=John&age=25&city=NY'));
console.log(URLProcessor.buildURL('https://api.com', 'users/123', { active: true, limit: 10 }));
console.log(URLProcessor.parseURL('https://example.com/users/123?active=true#profile'));
```

## 6. Tóm Tắt

### Các phương thức biến đổi chính:

| Method | Mục đích | Trả về | Ghi chú |
|--------|----------|---------|---------|
| **split()** | Tách chuỗi thành mảng | Array | Có thể giới hạn số phần tử |
| **replace()** | Thay thế nội dung | String | Chỉ thay thế lần đầu (trừ khi dùng RegEx) |
| **replaceAll()** | Thay thế tất cả | String | ES2021, thay thế toàn bộ |
| **trim()** | Loại bỏ khoảng trắng | String | trimStart(), trimEnd() |
| **concat()** | Nối chuỗi | String | Ít dùng, thay bằng template literals |

### Best Practices:

- ✅ **Sử dụng split()** để parse CSV, URL params, paths
- ✅ **Kết hợp trim() với replace()** để làm sạch input
- ✅ **Sử dụng replaceAll()** cho replace toàn bộ (ES2021+)
- ✅ **Method chaining** cho xử lý phức tạp
- ✅ **Validate input** trước khi xử lý
- ❌ **Tránh concat()** - dùng template literals thay thế

### Patterns hữu ích:

1. **Input cleaning**: `trim()` → `replace()` → `normalize()`
2. **Data parsing**: `split()` → `map()` → `filter()`
3. **URL processing**: `split()` → custom logic → `join()`
4. **Text formatting**: `replace()` → case conversion → `trim()`

Những phương thức này là công cụ cơ bản để xây dựng các tính năng xử lý text mạnh mẽ!
