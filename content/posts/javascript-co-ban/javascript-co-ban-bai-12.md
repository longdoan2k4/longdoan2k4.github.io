---
slug: javascript-co-ban-bai-12
url: /posts/javascript-co-ban-bai-12/
title: "JavaScript Cơ Bản - Bài 12: Kiểu Dữ Liệu Chuỗi (String)"
date: 2025-10-20T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về kiểu dữ liệu chuỗi trong JavaScript - cách khai báo, template literals, các phương thức xử lý chuỗi và ví dụ thực tế"
---

# JavaScript Cơ Bản - Bài 12: Kiểu Dữ Liệu Chuỗi (String)

Chuỗi (String) là kiểu dữ liệu cực kỳ quan trọng trong JavaScript, được sử dụng để lưu trữ và xử lý văn bản. Từ việc hiển thị thông tin cho người dùng đến xử lý dữ liệu phức tạp, chuỗi đóng vai trò không thể thiếu trong lập trình web.

## Video Hướng Dẫn

{{< youtube 45QT4WHXbX8 >}}

## 1. Cách Khai Báo Chuỗi

### Sử dụng dấu nháy đơn và nháy kép

```javascript
// Dấu nháy đơn (single quotes)
let singleQuoted = 'Xin chào Việt Nam';
console.log(singleQuoted);

// Dấu nháy kép (double quotes)  
let doubleQuoted = "JavaScript cơ bản";
console.log(doubleQuoted);

// Cả hai cách đều cho kết quả giống nhau
console.log(typeof singleQuoted);  // "string"
console.log(typeof doubleQuoted);  // "string"

// Lồng nhau
let nested1 = "Anh ấy nói: 'Xin chào!'";
let nested2 = 'Cô ấy nói: "Tạm biệt!"';
console.log(nested1);  // Anh ấy nói: 'Xin chào!'
console.log(nested2);  // Cô ấy nói: "Tạm biệt!"
```

### Template Literals (ES6)

```javascript
// Sử dụng backticks (`)
let name = "Long";
let age = 25;

// Cách cũ - nối chuỗi
let oldWay = "Tôi tên " + name + " và tôi " + age + " tuổi";

// Template literals - hiện đại và dễ đọc hơn
let newWay = `Tôi tên ${name} và tôi ${age} tuổi`;

console.log(oldWay);   // Tôi tên Long và tôi 25 tuổi
console.log(newWay);   // Tôi tên Long và tôi 25 tuổi

// Có thể chứa biểu thức
let price = 50000;
let quantity = 3;
let total = `Tổng cộng: ${price * quantity} VNĐ`;
console.log(total);    // Tổng cộng: 150000 VNĐ
```

### Chuỗi nhiều dòng

```javascript
// Cách cũ - sử dụng \n
let multilineOld = "Dòng 1\nDòng 2\nDòng 3";

// Template literals - tự nhiên hơn
let multilineNew = `Dòng 1
Dòng 2  
Dòng 3`;

console.log(multilineOld);
console.log(multilineNew);

// Ví dụ HTML template
let htmlTemplate = `
<div class="card">
    <h2>${name}</h2>
    <p>Tuổi: ${age}</p>
    <p>Ngày tạo: ${new Date().toLocaleDateString()}</p>
</div>
`;

console.log(htmlTemplate);
```

## 2. Escape Characters (Ký Tự Thoát)

### Các ký tự thoát thường dùng

```javascript
// Dấu nháy trong chuỗi
let quote1 = "Anh ấy nói: \"Xin chào!\"";
let quote2 = 'Cô ấy nói: \'Tạm biệt!\'';

// Xuống dòng
let newline = "Dòng 1\nDòng 2";

// Tab
let tabbed = "Tên:\tLong\nTuổi:\t25";

// Backslash
let path = "C:\\Users\\Documents\\file.txt";

// Carriage return và form feed (ít dùng)
let special = "Before\rAfter\fNext";

console.log(quote1);   // Anh ấy nói: "Xin chào!"
console.log(quote2);   // Cô ấy nói: 'Tạm biệt!'
console.log(newline);
console.log(tabbed);
console.log(path);
```

## 3. Thuộc Tính Và Phương Thức Cơ Bản

### Độ dài chuỗi

```javascript
let text = "JavaScript";
console.log(text.length);        // 10

let vietnamese = "Xin chào";
console.log(vietnamese.length);  // 9

let emoji = "😀😃😄";
console.log(emoji.length);       // 6 (mỗi emoji = 2 units)

// Chuỗi rỗng
let empty = "";
console.log(empty.length);       // 0
```

### Truy cập ký tự

```javascript
let str = "Hello World";

// Sử dụng bracket notation
console.log(str[0]);          // "H"
console.log(str[6]);          // "W"
console.log(str[str.length - 1]); // "d" (ký tự cuối)

// Sử dụng charAt()
console.log(str.charAt(0));   // "H"
console.log(str.charAt(100)); // "" (rỗng nếu index không tồn tại)

// charCodeAt() - lấy mã ASCII/Unicode
console.log(str.charCodeAt(0)); // 72 (mã của 'H')
console.log(str.charCodeAt(1)); // 101 (mã của 'e')
```

## 4. Nối Chuỗi (String Concatenation)

### Các cách nối chuỗi

```javascript
let firstName = "Đoàn";
let lastName = "Long";

// Phép cộng (+)
let fullName1 = firstName + " " + lastName;
console.log(fullName1); // "Đoàn Long"

// Template literals
let fullName2 = `${firstName} ${lastName}`;
console.log(fullName2); // "Đoàn Long"

// concat() method
let fullName3 = firstName.concat(" ", lastName);
console.log(fullName3); // "Đoàn Long"

// Nối nhiều chuỗi
let greeting = "Xin chào, " + "tôi là " + firstName + " " + lastName + "!";
let greetingTemplate = `Xin chào, tôi là ${firstName} ${lastName}!`;

console.log(greeting);
console.log(greetingTemplate);
```

## 5. Phương Thức Tìm Kiếm

### indexOf() và lastIndexOf()

```javascript
let text = "JavaScript là ngôn ngữ lập trình JavaScript";

// Tìm vị trí đầu tiên
console.log(text.indexOf("JavaScript"));     // 0
console.log(text.indexOf("ngôn ngữ"));       // 14  
console.log(text.indexOf("Python"));         // -1 (không tìm thấy)

// Tìm từ vị trí cụ thể
console.log(text.indexOf("JavaScript", 5));  // 37 (tìm từ index 5)

// Tìm vị trí cuối cùng
console.log(text.lastIndexOf("JavaScript")); // 37
console.log(text.lastIndexOf("a"));          // 40
```

### includes(), startsWith(), endsWith() (ES6)

```javascript
let email = "long@gmail.com";
let url = "https://www.example.com";
let filename = "document.pdf";

// Kiểm tra chứa chuỗi con
console.log(email.includes("@"));        // true
console.log(email.includes("yahoo"));    // false

// Kiểm tra bắt đầu bằng
console.log(url.startsWith("https"));    // true
console.log(url.startsWith("http"));     // true  
console.log(url.startsWith("ftp"));      // false

// Kiểm tra kết thúc bằng
console.log(filename.endsWith(".pdf"));  // true
console.log(filename.endsWith(".doc"));  // false
console.log(email.endsWith(".com"));     // true
```

## 6. Phương Thức Cắt Chuỗi

### substring(), slice()

```javascript
let str = "JavaScript Programming";

// substring(start, end) - không bao gồm end
console.log(str.substring(0, 10));    // "JavaScript"
console.log(str.substring(4, 10));    // "Script"
console.log(str.substring(4));        // "Script Programming" (từ 4 đến cuối)

// slice(start, end) - tương tự substring nhưng hỗ trợ số âm
console.log(str.slice(0, 10));        // "JavaScript"
console.log(str.slice(-11));          // "Programming" (11 ký tự cuối)
console.log(str.slice(-11, -6));      // "Progr" (từ cuối lên)
```

## 7. Phương Thức Thay Thế

### replace() và replaceAll()

```javascript
let text = "JavaScript là tuyệt vời. JavaScript dễ học.";

// replace() - chỉ thay thế lần đầu tiên
console.log(text.replace("JavaScript", "JS"));
// "JS là tuyệt vời. JavaScript dễ học."

// replace() với RegEx để thay thế tất cả
console.log(text.replace(/JavaScript/g, "JS"));
// "JS là tuyệt vời. JS dễ học."

// replaceAll() (ES2021) - thay thế tất cả
console.log(text.replaceAll("JavaScript", "JS"));
// "JS là tuyệt vời. JS dễ học."
```

## 8. Phương Thức Chuyển Đổi Case

### Chuyển đổi chữ hoa/thường

```javascript
let text = "JavaScript Programming";

// Chuyển thành chữ thường
console.log(text.toLowerCase());     // "javascript programming"

// Chuyển thành chữ hoa
console.log(text.toUpperCase());     // "JAVASCRIPT PROGRAMMING"

// Chuyển đổi tiếng Việt
let vietnamese = "TIẾNG VIỆT";
console.log(vietnamese.toLowerCase());       // "tiếng việt"
```

### Capitalize first letter

```javascript
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(capitalize("javascript"));       // "Javascript"
console.log(capitalize("PROGRAMMING"));      // "Programming"

// Title Case (viết hoa đầu mỗi từ)
function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

console.log(toTitleCase("javascript programming")); // "Javascript Programming"
console.log(toTitleCase("hello world"));           // "Hello World"
```

## 9. Phương Thức Trim

### Loại bỏ khoảng trắng

```javascript
let text = "   Hello World   ";

// Loại bỏ khoảng trắng đầu và cuối
console.log(text.trim());           // "Hello World"
console.log(text.trim().length);    // 11

// Loại bỏ khoảng trắng đầu (ES2019)
console.log(text.trimStart());      // "Hello World   "

// Loại bỏ khoảng trắng cuối (ES2019)
console.log(text.trimEnd());        // "   Hello World"

// Original string không thay đổi
console.log(text);                  // "   Hello World   "
```

## 10. Split Và Join

### Tách chuỗi thành mảng

```javascript
let sentence = "JavaScript,Python,Java,C++";

// Tách theo dấu phay
console.log(sentence.split(","));
// ["JavaScript", "Python", "Java", "C++"]

// Tách theo khoảng trắng
let words = "Hello World Programming";
console.log(words.split(" "));
// ["Hello", "World", "Programming"]

// Giới hạn số phần tử
console.log(sentence.split(",", 2));
// ["JavaScript", "Python"]

// Tách thành từng ký tự
console.log("Hello".split(""));
// ["H", "e", "l", "l", "o"]
```

### Nối mảng thành chuỗi

```javascript
let fruits = ["táo", "cam", "chuối", "xoài"];

// Nối với dấu phay
console.log(fruits.join(", "));
// "táo, cam, chuối, xoài"

// Nối với " và "
console.log(fruits.join(" và "));
// "táo và cam và chuối và xoài"

// Nối không có separator
console.log(fruits.join(""));
// "táocamchuốixoài"
```

## 11. Chuyển Đổi Số Sang Chuỗi

### Các cách chuyển đổi

```javascript
let number = 123;

// Sử dụng toString()
console.log(number.toString());    // "123"

// Sử dụng String()
console.log(String(number));       // "123"

// Nối với chuỗi rỗng
console.log(number + "");          // "123"

// Template literals
console.log(`${number}`);          // "123"

// Chuyển sang hệ số khác
console.log(number.toString(2));   // "1111011" (nhị phân)
console.log(number.toString(16));  // "7b" (thập lục phân)
```

## 12. Ví Dụ Thực Tế

### Validate email đơn giản

```javascript
function isValidEmail(email) {
    // Kiểm tra cơ bản
    return email.includes("@") && 
           email.includes(".") && 
           email.indexOf("@") > 0 && 
           email.lastIndexOf(".") > email.indexOf("@");
}

console.log(isValidEmail("test@gmail.com"));  // true
console.log(isValidEmail("invalid-email"));   // false
```

### Format tên người dùng

```javascript
function formatName(fullName) {
    return fullName
        .trim()
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

console.log(formatName("  nguyễn văn   a  ")); // "Nguyễn Văn A"
```

### Tạo slug từ tiêu đề

```javascript
function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')     // Xóa ký tự đặc biệt
        .replace(/[\s_-]+/g, '-')     // Thay space thành dash
        .replace(/^-+|-+$/g, '');     // Xóa dash ở đầu/cuối
}

console.log(createSlug("Học JavaScript Cơ Bản!")); // "hoc-javascript-co-ban"
```

### Đếm số từ

```javascript
function countWords(text) {
    return text.trim()
               .split(/\s+/)
               .filter(word => word.length > 0)
               .length;
}

console.log(countWords("Hello World JavaScript"));   // 3
console.log(countWords("  Hello    World  "));       // 2
console.log(countWords(""));                         // 0
```

### Ẩn thông tin nhạy cảm

```javascript
function maskEmail(email) {
    let atIndex = email.indexOf('@');
    if (atIndex <= 1) return email;
    
    let username = email.slice(0, atIndex);
    let domain = email.slice(atIndex);
    let maskedUsername = username[0] + '*'.repeat(username.length - 2) + username.slice(-1);
    
    return maskedUsername + domain;
}

console.log(maskEmail("long@gmail.com"));    // "l**g@gmail.com"

function maskPhoneNumber(phone) {
    if (phone.length < 4) return phone;
    
    let visibleDigits = 2;
    let masked = phone.slice(0, visibleDigits) + 
                '*'.repeat(phone.length - visibleDigits * 2) + 
                phone.slice(-visibleDigits);
    
    return masked;
}

console.log(maskPhoneNumber("0123456789")); // "01******89"
```

## 13. Template Literals Nâng Cao

### Multiline strings với indentation

```javascript
let name = "Long";
let skills = ["JavaScript", "HTML", "CSS"];

// Template literals với expression phức tạp
let profile = `
Thông tin cá nhân:
==================
Tên: ${name}
Kỹ năng: 
${skills.map(skill => `  - ${skill}`).join('\n')}
Tổng số kỹ năng: ${skills.length}
Ngày cập nhật: ${new Date().toLocaleDateString('vi-VN')}
`;

console.log(profile);
```

### HTML template generation

```javascript
function createUserCard(user) {
    return `
    <div class="user-card">
        <img src="${user.avatar || '/default-avatar.png'}" alt="Avatar">
        <h3>${user.name}</h3>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone || 'Chưa cập nhật'}</p>
        <div class="skills">
            ${user.skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('')}
        </div>
    </div>
    `;
}

const user = {
    name: "Đoàn Đức Long",
    email: "long@gmail.com",
    phone: "0123456789",
    avatar: "/avatar.jpg",
    skills: ["JavaScript", "React", "Node.js"]
};

console.log(createUserCard(user));
```

## 14. Utility Functions Hữu Ích

### Text processing utilities

```javascript
class StringUtils {
    // Kiểm tra chuỗi rỗng hoặc chỉ chứa khoảng trắng
    static isEmpty(str) {
        return !str || str.trim().length === 0;
    }
    
    // Cắt chuỗi và thêm "..."
    static truncate(str, length, suffix = '...') {
        if (str.length <= length) return str;
        return str.slice(0, length - suffix.length) + suffix;
    }
    
    // Chuyển snake_case thành camelCase
    static toCamelCase(str) {
        return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    }
    
    // Chuyển camelCase thành snake_case
    static toSnakeCase(str) {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    
    // Đảo ngược chuỗi
    static reverse(str) {
        return str.split('').reverse().join('');
    }
    
    // Kiểm tra palindrome
    static isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }
    
    // Đếm số lần xuất hiện của substring
    static countOccurrences(str, substring) {
        return (str.match(new RegExp(substring, 'g')) || []).length;
    }
    
    // Xóa dấu tiếng Việt
    static removeVietnameseTones(str) {
        const toneMap = {
            'àáạảãâầấậẩẫăằắặẳẵ': 'a',
            'èéẹẻẽêềếệểễ': 'e',
            'ìíịỉĩ': 'i',
            'òóọỏõôồốộổỗơờớợởỡ': 'o',
            'ùúụủũưừứựửữ': 'u',
            'ỳýỵỷỹ': 'y',
            'đ': 'd',
            'ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ': 'A',
            'ÈÉẸẺẼÊỀẾỆỂỄ': 'E',
            'ÌÍỊỈĨ': 'I',
            'ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ': 'O',
            'ÙÚỤỦŨƯỪỨỰỬỮ': 'U',
            'ỲÝỴỶỸ': 'Y',
            'Đ': 'D'
        };
        
        for (const [accented, plain] of Object.entries(toneMap)) {
            for (const char of accented) {
                str = str.replace(new RegExp(char, 'g'), plain);
            }
        }
        
        return str;
    }
}

// Test utilities
console.log(StringUtils.isEmpty("   "));           // true
console.log(StringUtils.truncate("Hello World", 8)); // "Hello..."
console.log(StringUtils.toCamelCase("user_name"));   // "userName"
console.log(StringUtils.toSnakeCase("userName"));    // "user_name"
console.log(StringUtils.reverse("Hello"));           // "olleH"
console.log(StringUtils.isPalindrome("A man a plan a canal Panama")); // true
console.log(StringUtils.countOccurrences("hello world hello", "hello")); // 2
console.log(StringUtils.removeVietnameseTones("Tiếng Việt")); // "Tieng Viet"
```

## 15. Tóm Tắt

### Kiến thức cốt lõi về String:

1. **Khai báo:** Single quotes `''`, double quotes `""`, template literals `` ` ` ``
2. **Template literals:** `${}` syntax cho string interpolation
3. **Immutability:** String methods không thay đổi string gốc
4. **Indexing:** Zero-based indexing với `[]` hoặc `charAt()`
5. **Length:** Sử dụng `.length` property

### Phương thức quan trọng:

| Nhóm | Methods | Mô tả |
|------|---------|-------|
| **Tìm kiếm** | `indexOf()`, `includes()`, `startsWith()`, `endsWith()` | Tìm vị trí và kiểm tra |
| **Cắt chuỗi** | `slice()`, `substring()` | Trích xuất phần chuỗi |
| **Thay thế** | `replace()`, `replaceAll()` | Thay thế nội dung |
| **Case** | `toLowerCase()`, `toUpperCase()` | Chuyển đổi chữ hoa/thường |
| **Trim** | `trim()`, `trimStart()`, `trimEnd()` | Loại bỏ khoảng trắng |
| **Split/Join** | `split()`, Array's `join()` | Tách/nối chuỗi |

### Best Practices:

- ✅ **Ưu tiên template literals** cho string interpolation
- ✅ **Sử dụng `includes()`** thay vì `indexOf() !== -1`
- ✅ **Validate user input** trước khi xử lý
- ✅ **Sử dụng const** cho string không thay đổi
- ✅ **Cache string operations** khi xử lý nhiều lần
- ✅ **Sử dụng utility functions** để tái sử dụng code

### Lưu ý quan trọng:

- String trong JavaScript là **immutable** (không thể thay đổi)
- Mọi operation đều tạo ra string mới
- Template literals hỗ trợ multiline và expression
- Cẩn thận với Unicode và emoji (có thể chiếm 2 code units)

Nắm vững kiến thức về String sẽ giúp bạn xử lý văn bản hiệu quả trong JavaScript!
