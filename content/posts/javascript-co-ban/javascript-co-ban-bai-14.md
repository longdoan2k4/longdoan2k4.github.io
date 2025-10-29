---
slug: javascript-co-ban-bai-14
url: /posts/javascript-co-ban-bai-14/
title: "JavaScript Cơ Bản - Bài 14: Các Phương Thức Tìm Kiếm Và Xác Định Trong String"
date: 2025-10-20T18:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về indexOf(), lastIndexOf(), includes(), startsWith(), endsWith() và các phương thức tìm kiếm, xác định trong chuỗi JavaScript"
---

# JavaScript Cơ Bản - Bài 14: Các Phương Thức Tìm Kiếm Và Xác Định Trong String

Các phương thức tìm kiếm và xác định trong chuỗi là công cụ không thể thiếu khi xử lý văn bản. Từ việc tìm vị trí ký tự đến kiểm tra sự tồn tại của chuỗi con, những phương thức này giúp bạn phân tích và xử lý dữ liệu text một cách hiệu quả.

## Video Hướng Dẫn

{{< youtube HVf788L7E9U >}}

## 1. indexOf() - Tìm Vị Trí Đầu Tiên

### Cú pháp và cách sử dụng

```javascript
let text = "JavaScript là ngôn ngữ lập trình JavaScript mạnh mẽ";

// Tìm vị trí đầu tiên của chuỗi con
console.log(text.indexOf("JavaScript"));    // 0 (vị trí đầu tiên)
console.log(text.indexOf("ngôn ngữ"));      // 14
console.log(text.indexOf("Python"));        // -1 (không tìm thấy)

// Tìm từ vị trí cụ thể
console.log(text.indexOf("JavaScript", 5)); // 37 (tìm từ index 5)
console.log(text.indexOf("a"));             // 1 (ký tự 'a' đầu tiên)
console.log(text.indexOf("a", 2));          // 8 (ký tự 'a' từ vị trí 2)
```

### Ứng dụng với indexOf()

```javascript
// Kiểm tra email có hợp lệ cơ bản
function isValidEmail(email) {
    const atIndex = email.indexOf("@");
    const dotIndex = email.indexOf(".");
    
    return atIndex > 0 && 
           dotIndex > atIndex && 
           dotIndex < email.length - 1;
}

console.log(isValidEmail("test@gmail.com"));  // true
console.log(isValidEmail("invalid.email"));   // false
console.log(isValidEmail("@invalid.com"));    // false

// Tách domain từ email
function extractDomain(email) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return null;
    
    return email.substring(atIndex + 1);
}

console.log(extractDomain("user@gmail.com"));    // "gmail.com"
console.log(extractDomain("admin@company.vn"));  // "company.vn"

// Đếm số lần xuất hiện
function countOccurrences(text, searchString) {
    let count = 0;
    let position = 0;
    
    while (true) {
        const found = text.indexOf(searchString, position);
        if (found === -1) break;
        
        count++;
        position = found + 1;
    }
    
    return count;
}

console.log(countOccurrences("hello world hello", "hello")); // 2
console.log(countOccurrences("abababab", "ab"));            // 4
```

## 2. lastIndexOf() - Tìm Vị Trí Cuối Cùng

### Cơ bản về lastIndexOf()

```javascript
let filename = "document.backup.final.pdf";

// Tìm vị trí cuối cùng
console.log(filename.lastIndexOf("."));        // 19 (dấu chấm cuối)
console.log(filename.indexOf("."));            // 8 (dấu chấm đầu tiên)

console.log(filename.lastIndexOf("a"));        // 6 (chữ 'a' cuối cùng)
console.log(filename.lastIndexOf("z"));        // -1 (không có)

// Tìm từ vị trí cụ thể (tìm ngược)
console.log(filename.lastIndexOf(".", 15));    // 14 (tìm từ vị trí 15 trở về trước)
```

### Ứng dụng thực tế

```javascript
// Trích xuất extension file
function getFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) return "";
    
    return filename.substring(lastDotIndex + 1);
}

console.log(getFileExtension("document.pdf"));     // "pdf"
console.log(getFileExtension("archive.tar.gz"));   // "gz"
console.log(getFileExtension("README"));           // ""

// Trích xuất tên file không có extension
function getFileName(fullPath) {
    const lastSlashIndex = Math.max(
        fullPath.lastIndexOf("/"),
        fullPath.lastIndexOf("\\")
    );
    
    const filename = fullPath.substring(lastSlashIndex + 1);
    const lastDotIndex = filename.lastIndexOf(".");
    
    if (lastDotIndex === -1) return filename;
    return filename.substring(0, lastDotIndex);
}

console.log(getFileName("/path/to/document.pdf"));      // "document"
console.log(getFileName("C:\\Users\\file.backup.txt")); // "file.backup"

// Tìm từ cuối cùng trong câu
function getLastWord(sentence) {
    const trimmed = sentence.trim();
    const lastSpaceIndex = trimmed.lastIndexOf(" ");
    
    if (lastSpaceIndex === -1) return trimmed;
    return trimmed.substring(lastSpaceIndex + 1);
}

console.log(getLastWord("Hello World JavaScript"));  // "JavaScript"
console.log(getLastWord("OneWord"));                // "OneWord"
console.log(getLastWord("  Spaced  "));             // "Spaced"
```

## 3. includes() - Kiểm Tra Sự Tồn Tại

### ES6 includes() method

```javascript
let text = "JavaScript ES6 features are awesome";

// Kiểm tra có chứa chuỗi con không
console.log(text.includes("JavaScript"));   // true
console.log(text.includes("Python"));       // false
console.log(text.includes("ES6"));          // true

// Phân biệt chữ hoa/thường
console.log(text.includes("javascript"));   // false (khác case)
console.log(text.includes("FEATURES"));     // false (khác case)

// Kiểm tra từ vị trí cụ thể
console.log(text.includes("Script", 4));    // true (tìm từ vị trí 4)
console.log(text.includes("Java", 5));      // false (không tìm thấy từ vị trí 5)
```

### So sánh includes() vs indexOf()

```javascript
let email = "user@gmail.com";

// Cách cũ với indexOf()
if (email.indexOf("@") !== -1) {
    console.log("Email hợp lệ (có @)");
}

// Cách mới với includes() - rõ ràng hơn
if (email.includes("@")) {
    console.log("Email hợp lệ (có @)");
}

// Performance: includes() có thể tối ưu hơn vì chỉ cần true/false
// indexOf() phải tìm chính xác vị trí
```

### Ứng dụng với includes()

```javascript
// Kiểm tra từ khóa cấm
function containsBadWords(text) {
    const badWords = ["spam", "scam", "fake", "virus"];
    const lowerText = text.toLowerCase();
    
    return badWords.some(word => lowerText.includes(word));
}

console.log(containsBadWords("This is a spam email"));     // true
console.log(containsBadWords("Hello world"));              // false

// Lọc danh sách theo từ khóa
function filterByKeyword(items, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    return items.filter(item => 
        item.toLowerCase().includes(lowerKeyword)
    );
}

const products = [
    "iPhone 15 Pro",
    "Samsung Galaxy S23",
    "iPad Pro",
    "MacBook Pro",
    "Surface Pro"
];

console.log(filterByKeyword(products, "pro"));
// ["iPhone 15 Pro", "iPad Pro", "MacBook Pro", "Surface Pro"]

// Kiểm tra quyền truy cập
function hasPermission(userRoles, requiredPermission) {
    return userRoles.some(role => 
        role.toLowerCase().includes(requiredPermission.toLowerCase())
    );
}

const userRoles = ["user", "editor", "content-manager"];
console.log(hasPermission(userRoles, "editor"));  // true
console.log(hasPermission(userRoles, "admin"));   // false
```

## 4. startsWith() và endsWith() - Kiểm Tra Đầu/Cuối

### startsWith() - Kiểm tra bắt đầu

```javascript
let url = "https://www.example.com/path";
let filename = "image.jpg";

// Kiểm tra bắt đầu bằng chuỗi
console.log(url.startsWith("https://"));      // true
console.log(url.startsWith("http://"));       // false
console.log(url.startsWith("www", 8));        // true (từ vị trí 8)

console.log(filename.startsWith("image"));    // true
console.log(filename.startsWith("photo"));    // false

// Case sensitive
console.log(url.startsWith("HTTPS://"));      // false
```

### endsWith() - Kiểm tra kết thúc

```javascript
let filename2 = "document.pdf";
let email2 = "user@gmail.com";

// Kiểm tra kết thúc bằng chuỗi
console.log(filename2.endsWith(".pdf"));      // true
console.log(filename2.endsWith(".doc"));      // false

console.log(email2.endsWith(".com"));         // true
console.log(email2.endsWith("gmail.com"));    // true
console.log(email2.endsWith(".org"));         // false

// Với length parameter
console.log("Hello World".endsWith("Hello", 5)); // true (chỉ xét 5 ký tự đầu)
```

### Ứng dụng thực tế với startsWith/endsWith

```javascript
// Phân loại file theo extension
class FileClassifier {
    static getFileType(filename) {
        const lower = filename.toLowerCase();
        
        if (this.isImage(lower)) return "image";
        if (this.isDocument(lower)) return "document";
        if (this.isVideo(lower)) return "video";
        if (this.isAudio(lower)) return "audio";
        if (this.isArchive(lower)) return "archive";
        
        return "unknown";
    }
    
    static isImage(filename) {
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
        return imageExtensions.some(ext => filename.endsWith(ext));
    }
    
    static isDocument(filename) {
        const docExtensions = [".pdf", ".doc", ".docx", ".txt", ".rtf"];
        return docExtensions.some(ext => filename.endsWith(ext));
    }
    
    static isVideo(filename) {
        const videoExtensions = [".mp4", ".avi", ".mkv", ".mov", ".wmv"];
        return videoExtensions.some(ext => filename.endsWith(ext));
    }
    
    static isAudio(filename) {
        const audioExtensions = [".mp3", ".wav", ".flac", ".aac"];
        return audioExtensions.some(ext => filename.endsWith(ext));
    }
    
    static isArchive(filename) {
        const archiveExtensions = [".zip", ".rar", ".7z", ".tar", ".gz"];
        return archiveExtensions.some(ext => filename.endsWith(ext));
    }
}

// Test
console.log(FileClassifier.getFileType("photo.jpg"));      // "image"
console.log(FileClassifier.getFileType("document.pdf"));   // "document"
console.log(FileClassifier.getFileType("movie.mp4"));      // "video"

// URL validation và routing
class URLValidator {
    static isSecure(url) {
        return url.startsWith("https://");
    }
    
    static isAPI(url) {
        return url.includes("/api/") || url.startsWith("/api");
    }
    
    static isStaticAsset(url) {
        const staticExtensions = [".css", ".js", ".png", ".jpg", ".gif", ".ico"];
        return staticExtensions.some(ext => url.endsWith(ext));
    }
    
    static getRouteType(path) {
        if (path.startsWith("/admin")) return "admin";
        if (path.startsWith("/api")) return "api";
        if (path.startsWith("/user")) return "user";
        if (path === "/" || path.startsWith("/home")) return "home";
        
        return "public";
    }
}

console.log(URLValidator.isSecure("https://example.com"));     // true
console.log(URLValidator.isAPI("/api/users"));                // true
console.log(URLValidator.isStaticAsset("style.css"));         // true
console.log(URLValidator.getRouteType("/admin/dashboard"));   // "admin"
```

## 5. search() với Regular Expressions

### Cơ bản về search()

```javascript
let text = "Tôi sinh năm 1990 tại Hà Nội";

// Tìm pattern với regex
console.log(text.search(/\d+/));          // 13 (vị trí của "1990")
console.log(text.search(/[A-Z]/));        // 0 (vị trí của "T")
console.log(text.search(/xyz/));          // -1 (không tìm thấy)

// Case insensitive
console.log(text.search(/hà nội/i));      // 22 (tìm "Hà Nội")

// Tìm email pattern
let contact = "Liên hệ: admin@example.com hoặc support@test.org";
console.log(contact.search(/@\w+\.\w+/)); // 10 (vị trí email đầu tiên)
```

### Pattern matching nâng cao

```javascript
class PatternMatcher {
    // Tìm số điện thoại Việt Nam
    static findPhoneNumber(text) {
        const phonePattern = /(0|\+84)[1-9]\d{8,9}/;
        const index = text.search(phonePattern);
        
        if (index === -1) return null;
        
        const match = text.match(phonePattern);
        return {
            position: index,
            number: match[0]
        };
    }
    
    // Tìm URL
    static findURL(text) {
        const urlPattern = /https?:\/\/[^\s]+/;
        const index = text.search(urlPattern);
        
        if (index === -1) return null;
        
        const match = text.match(urlPattern);
        return {
            position: index,
            url: match[0]
        };
    }
    
    // Tìm hashtag
    static findHashtag(text) {
        const hashtagPattern = /#\w+/;
        return text.search(hashtagPattern);
    }
    
    // Kiểm tra có chứa ký tự đặc biệt không
    static hasSpecialChars(text) {
        return text.search(/[!@#$%^&*(),.?":{}|<>]/) !== -1;
    }
}

// Test pattern matching
const message = "Liên hệ 0123456789 hoặc visit https://example.com #javascript";

console.log(PatternMatcher.findPhoneNumber(message));
// { position: 8, number: "0123456789" }

console.log(PatternMatcher.findURL(message));
// { position: 28, url: "https://example.com" }

console.log(PatternMatcher.findHashtag(message)); // 47

console.log(PatternMatcher.hasSpecialChars("Hello@World")); // true
```

## 6. Kết Hợp Các Phương Thức

### Email validator hoàn chỉnh

```javascript
class EmailValidator {
    static validate(email) {
        const errors = [];
        
        // Kiểm tra cơ bản
        if (!email || email.trim() === "") {
            errors.push("Email không được để trống");
            return { valid: false, errors };
        }
        
        email = email.trim();
        
        // Kiểm tra có @ không
        if (!email.includes("@")) {
            errors.push("Email phải chứa ký tự @");
        }
        
        // Kiểm tra @ duy nhất
        if (email.indexOf("@") !== email.lastIndexOf("@")) {
            errors.push("Email chỉ được chứa một ký tự @");
        }
        
        // Kiểm tra vị trí @
        const atIndex = email.indexOf("@");
        if (atIndex === 0) {
            errors.push("Email không được bắt đầu bằng @");
        }
        if (atIndex === email.length - 1) {
            errors.push("Email không được kết thúc bằng @");
        }
        
        // Kiểm tra domain
        if (atIndex > 0) {
            const domain = email.substring(atIndex + 1);
            
            if (!domain.includes(".")) {
                errors.push("Domain phải chứa dấu chấm");
            }
            
            if (domain.startsWith(".") || domain.endsWith(".")) {
                errors.push("Domain không được bắt đầu hoặc kết thúc bằng dấu chấm");
            }
            
            // Kiểm tra domain phổ biến
            const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
            const isCommonDomain = commonDomains.some(d => domain.toLowerCase() === d);
            
            if (isCommonDomain) {
                // Valid common domain
            } else if (!domain.includes(".")) {
                errors.push("Domain không hợp lệ");
            }
        }
        
        // Kiểm tra ký tự không hợp lệ
        if (email.search(/[<>()[\]\\,;:\s@"]/) !== -1) {
            errors.push("Email chứa ký tự không hợp lệ");
        }
        
        return {
            valid: errors.length === 0,
            errors,
            email: email.toLowerCase()
        };
    }
    
    static getDomainType(email) {
        if (!email.includes("@")) return "invalid";
        
        const domain = email.substring(email.indexOf("@") + 1).toLowerCase();
        
        if (domain.endsWith(".edu") || domain.endsWith(".edu.vn")) {
            return "education";
        }
        if (domain.endsWith(".gov") || domain.endsWith(".gov.vn")) {
            return "government";
        }
        if (domain.endsWith(".com") || domain.endsWith(".com.vn")) {
            return "commercial";
        }
        if (domain.endsWith(".org")) {
            return "organization";
        }
        
        return "other";
    }
}

// Test email validator
console.log(EmailValidator.validate("user@gmail.com"));
console.log(EmailValidator.validate("invalid.email"));
console.log(EmailValidator.validate("user@@domain.com"));
console.log(EmailValidator.getDomainType("student@university.edu.vn")); // "education"
```

### Text search engine đơn giản

```javascript
class TextSearchEngine {
    constructor(documents) {
        this.documents = documents.map((doc, index) => ({
            id: index,
            content: doc,
            lowercaseContent: doc.toLowerCase()
        }));
    }
    
    search(query, options = {}) {
        const {
            caseSensitive = false,
            wholeWord = false,
            startsWith = false,
            endsWith = false
        } = options;
        
        const searchQuery = caseSensitive ? query : query.toLowerCase();
        const results = [];
        
        this.documents.forEach(doc => {
            const content = caseSensitive ? doc.content : doc.lowercaseContent;
            let isMatch = false;
            let positions = [];
            
            if (startsWith) {
                isMatch = content.startsWith(searchQuery);
                if (isMatch) positions.push(0);
            } else if (endsWith) {
                isMatch = content.endsWith(searchQuery);
                if (isMatch) positions.push(content.length - searchQuery.length);
            } else if (wholeWord) {
                // Tìm whole word
                const regex = new RegExp(`\\b${searchQuery}\\b`, caseSensitive ? 'g' : 'gi');
                const matches = [...content.matchAll(regex)];
                isMatch = matches.length > 0;
                positions = matches.map(match => match.index);
            } else {
                // Tìm thông thường
                if (content.includes(searchQuery)) {
                    isMatch = true;
                    let position = 0;
                    
                    while (true) {
                        const found = content.indexOf(searchQuery, position);
                        if (found === -1) break;
                        positions.push(found);
                        position = found + 1;
                    }
                }
            }
            
            if (isMatch) {
                results.push({
                    id: doc.id,
                    content: doc.content,
                    matches: positions.length,
                    positions: positions,
                    relevance: this.calculateRelevance(doc.content, query, positions)
                });
            }
        });
        
        // Sắp xếp theo độ liên quan
        return results.sort((a, b) => b.relevance - a.relevance);
    }
    
    calculateRelevance(content, query, positions) {
        const queryLength = query.length;
        const contentLength = content.length;
        const matchCount = positions.length;
        
        // Tính điểm dựa trên số lần xuất hiện và vị trí
        let score = matchCount * 10;
        
        // Bonus nếu match ở đầu
        if (positions.includes(0)) score += 5;
        
        // Bonus cho tỷ lệ match/content length
        score += (matchCount * queryLength / contentLength) * 100;
        
        return score;
    }
    
    highlight(text, query, caseSensitive = false) {
        if (!caseSensitive) {
            const regex = new RegExp(query, 'gi');
            return text.replace(regex, match => `**${match}**`);
        } else {
            return text.split(query).join(`**${query}**`);
        }
    }
}

// Test search engine
const documents = [
    "JavaScript is a programming language",
    "Java is different from JavaScript",
    "Learn JavaScript programming step by step",
    "JavaScript ES6 features are awesome",
    "Python vs JavaScript comparison"
];

const searchEngine = new TextSearchEngine(documents);

const results = searchEngine.search("JavaScript", { wholeWord: true });
console.log(results);

// Highlight results
results.forEach(result => {
    console.log(`Document ${result.id}: ${searchEngine.highlight(result.content, "JavaScript")}`);
});
```

## 7. Tóm Tắt

### Các phương thức tìm kiếm chính:

| Method | Mục đích | Trả về | ES Version |
|--------|----------|---------|------------|
| **indexOf()** | Tìm vị trí đầu tiên | number (-1 nếu không tìm thấy) | ES1 |
| **lastIndexOf()** | Tìm vị trí cuối cùng | number (-1 nếu không tìm thấy) | ES1 |
| **includes()** | Kiểm tra tồn tại | boolean | ES6 |
| **startsWith()** | Kiểm tra bắt đầu | boolean | ES6 |
| **endsWith()** | Kiểm tra kết thúc | boolean | ES6 |
| **search()** | Tìm với RegEx | number (-1 nếu không tìm thấy) | ES1 |

### Best practices:

- ✅ **Sử dụng `includes()`** thay vì `indexOf() !== -1` để kiểm tra tồn tại
- ✅ **Sử dụng `startsWith()`/`endsWith()`** cho việc kiểm tra đầu/cuối chuỗi
- ✅ **Kết hợp nhiều phương thức** để validation phức tạp
- ✅ **Cẩn thận với case sensitivity** - sử dụng `toLowerCase()` khi cần
- ✅ **Validate input** trước khi search để tránh lỗi
- ❌ **Tránh** sử dụng search() cho các trường hợp đơn giản

Những phương thức này là nền tảng để xây dựng các tính năng search, validation và text processing mạnh mẽ!
