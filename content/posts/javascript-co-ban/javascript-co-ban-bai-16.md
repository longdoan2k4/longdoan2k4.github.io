---
slug: javascript-co-ban-bai-16
url: /posts/javascript-co-ban-bai-16/
title: "JavaScript Cơ Bản - Bài 16: Tổng Hợp String - Ứng Dụng Thực Tế"
date: 2025-10-20T20:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tổng hợp kiến thức String qua các ví dụ thực tế: validation, text processing, template engine, và nhiều ứng dụng khác"
---

# JavaScript Cơ Bản - Bài 16: Tổng Hợp String - Ứng Dụng Thực Tế

Sau khi đã học về các phương thức String cơ bản, hôm nay chúng ta sẽ kết hợp tất cả lại để tạo ra các ứng dụng thực tế. Từ validation form đến xây dựng template engine đơn giản, bài này sẽ giúp bạn thấy được sức mạnh của String manipulation.

## Video Hướng Dẫn

{{< youtube 45QT4WHXbX8 >}}

## 1. Text Validator - Hệ Thống Validation

### Email và Password Validator

```javascript
class TextValidator {
    // Email validation với regex chi tiết
    static validateEmail(email) {
        const trimmedEmail = email.trim().toLowerCase();
        
        // Basic checks
        if (!trimmedEmail) return { valid: false, error: "Email không được để trống" };
        if (trimmedEmail.length > 254) return { valid: false, error: "Email quá dài" };
        
        // Regex pattern cho email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(trimmedEmail)) {
            return { valid: false, error: "Format email không đúng" };
        }
        
        // Kiểm tra domain phổ biến
        const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
        const domain = trimmedEmail.split('@')[1];
        
        // Kiểm tra typos trong domain phổ biến
        const possibleTypos = this.findTypos(domain, commonDomains);
        if (possibleTypos.length > 0) {
            return {
                valid: true,
                warning: `Bạn có ý muốn dùng: ${possibleTypos.join(', ')}?`,
                email: trimmedEmail
            };
        }
        
        return { valid: true, email: trimmedEmail };
    }
    
    // Password strength validation
    static validatePassword(password) {
        const errors = [];
        
        if (password.length < 8) {
            errors.push("Mật khẩu phải có ít nhất 8 ký tự");
        }
        
        if (!/[a-z]/.test(password)) {
            errors.push("Mật khẩu phải có ít nhất 1 chữ thường");
        }
        
        if (!/[A-Z]/.test(password)) {
            errors.push("Mật khẩu phải có ít nhất 1 chữ hoa");
        }
        
        if (!/\d/.test(password)) {
            errors.push("Mật khẩu phải có ít nhất 1 số");
        }
        
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push("Mật khẩu phải có ít nhất 1 ký tự đặc biệt");
        }
        
        // Kiểm tra patterns phổ biến
        const commonPatterns = [
            /(.)\1{2,}/,           // 3 ký tự giống nhau liên tiếp
            /123456|abcdef|qwerty/i, // Patterns phổ biến
            /password|admin|user/i   // Từ khóa nguy hiểm
        ];
        
        for (const pattern of commonPatterns) {
            if (pattern.test(password)) {
                errors.push("Mật khẩu chứa pattern không an toàn");
                break;
            }
        }
        
        const strength = this.calculatePasswordStrength(password);
        
        return {
            valid: errors.length === 0,
            errors,
            strength: strength,
            strengthText: this.getStrengthText(strength)
        };
    }
    
    // Tính điểm mạnh mật khẩu
    static calculatePasswordStrength(password) {
        let score = 0;
        
        // Length bonus
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // Character variety
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
        
        // Bonus for mixed case and numbers
        if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) {
            score += 1;
        }
        
        return Math.min(score, 5); // Max 5 points
    }
    
    static getStrengthText(strength) {
        const levels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
        return levels[strength] || 'Yếu';
    }
    
    // Tìm typos bằng Levenshtein distance
    static findTypos(input, candidates, threshold = 2) {
        return candidates.filter(candidate => 
            this.levenshteinDistance(input, candidate) <= threshold &&
            input !== candidate
        );
    }
    
    static levenshteinDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
        
        for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
        
        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                if (str1[i - 1] === str2[j - 1]) {
                    matrix[j][i] = matrix[j - 1][i - 1];
                } else {
                    matrix[j][i] = Math.min(
                        matrix[j - 1][i - 1] + 1, // substitution
                        matrix[j][i - 1] + 1,     // insertion
                        matrix[j - 1][i] + 1      // deletion
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
    
    // Phone number validation (Việt Nam)
    static validatePhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        
        // Vietnam phone patterns
        const patterns = [
            /^(03|05|07|08|09)\d{8}$/,  // Mobile
            /^(02[4-9])\d{8}$/,         // Landline
            /^(1800|1900)\d{4}$/        // Hotline
        ];
        
        if (!patterns.some(pattern => pattern.test(cleaned))) {
            return { valid: false, error: "Số điện thoại không đúng định dạng Việt Nam" };
        }
        
        // Format number
        let formatted = cleaned;
        if (cleaned.length === 10) {
            formatted = cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else if (cleaned.length === 11) {
            formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
        }
        
        return { 
            valid: true, 
            phone: formatted,
            raw: cleaned,
            type: this.getPhoneType(cleaned)
        };
    }
    
    static getPhoneType(cleaned) {
        if (/^(03|05|07|08|09)/.test(cleaned)) return 'mobile';
        if (/^(02[4-9])/.test(cleaned)) return 'landline';
        if (/^(1800|1900)/.test(cleaned)) return 'hotline';
        return 'unknown';
    }
}

// Test validation
console.log(TextValidator.validateEmail("user@gmai.com")); // Typo warning
console.log(TextValidator.validatePassword("MyP@ssw0rd123"));
console.log(TextValidator.validatePhoneNumber("0123456789"));
```

### Form Validator tổng hợp

```javascript
class ComprehensiveFormValidator {
    constructor() {
        this.rules = {};
        this.errors = {};
        this.sanitizers = {};
    }
    
    // Thêm rule validation
    addRule(field, validator) {
        if (!this.rules[field]) {
            this.rules[field] = [];
        }
        this.rules[field].push(validator);
        return this;
    }
    
    // Thêm sanitizer
    addSanitizer(field, sanitizer) {
        this.sanitizers[field] = sanitizer;
        return this;
    }
    
    // Built-in validators
    required(message = 'Field is required') {
        return (value) => {
            const trimmed = String(value).trim();
            return trimmed ? null : message;
        };
    }
    
    minLength(min, message) {
        return (value) => {
            return String(value).length >= min ? null : 
                message || `Minimum length is ${min}`;
        };
    }
    
    maxLength(max, message) {
        return (value) => {
            return String(value).length <= max ? null : 
                message || `Maximum length is ${max}`;
        };
    }
    
    pattern(regex, message) {
        return (value) => {
            return regex.test(String(value)) ? null : 
                message || 'Invalid format';
        };
    }
    
    custom(validator, message) {
        return (value) => {
            return validator(value) ? null : message;
        };
    }
    
    // Built-in sanitizers
    static sanitizers = {
        trim: (value) => String(value).trim(),
        lowercase: (value) => String(value).toLowerCase(),
        uppercase: (value) => String(value).toUpperCase(),
        removeSpaces: (value) => String(value).replace(/\s/g, ''),
        normalizeSpaces: (value) => String(value).replace(/\s+/g, ' ').trim(),
        removeHTML: (value) => String(value).replace(/<[^>]*>/g, ''),
        alphanumeric: (value) => String(value).replace(/[^a-zA-Z0-9]/g, ''),
        numbersOnly: (value) => String(value).replace(/\D/g, ''),
        slug: (value) => String(value)
            .toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
    };
    
    // Validate form data
    validate(data) {
        this.errors = {};
        const sanitizedData = {};
        
        // First, sanitize all data
        for (const [field, value] of Object.entries(data)) {
            if (this.sanitizers[field]) {
                sanitizedData[field] = this.sanitizers[field](value);
            } else {
                sanitizedData[field] = value;
            }
        }
        
        // Then validate
        for (const [field, validators] of Object.entries(this.rules)) {
            const value = sanitizedData[field];
            const fieldErrors = [];
            
            for (const validator of validators) {
                const error = validator(value);
                if (error) {
                    fieldErrors.push(error);
                }
            }
            
            if (fieldErrors.length > 0) {
                this.errors[field] = fieldErrors;
            }
        }
        
        return {
            isValid: Object.keys(this.errors).length === 0,
            errors: this.errors,
            sanitizedData
        };
    }
}

// Sử dụng form validator
const formValidator = new ComprehensiveFormValidator()
    .addSanitizer('name', ComprehensiveFormValidator.sanitizers.normalizeSpaces)
    .addSanitizer('email', ComprehensiveFormValidator.sanitizers.lowercase)
    .addSanitizer('phone', ComprehensiveFormValidator.sanitizers.numbersOnly)
    .addSanitizer('slug', ComprehensiveFormValidator.sanitizers.slug)
    
    .addRule('name', formValidator.required('Tên không được để trống'))
    .addRule('name', formValidator.minLength(2, 'Tên phải có ít nhất 2 ký tự'))
    .addRule('name', formValidator.maxLength(50, 'Tên không được quá 50 ký tự'))
    
    .addRule('email', formValidator.required('Email không được để trống'))
    .addRule('email', formValidator.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không đúng định dạng'))
    
    .addRule('phone', formValidator.required('Số điện thoại không được để trống'))
    .addRule('phone', formValidator.pattern(/^(03|05|07|08|09)\d{8}$/, 'Số điện thoại không đúng định dạng'))
    
    .addRule('slug', formValidator.required('Slug không được để trống'))
    .addRule('slug', formValidator.pattern(/^[a-z0-9-]+$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'));

// Test validation
const formData = {
    name: "  Nguyễn Văn A  ",
    email: "  USER@GMAIL.COM  ",
    phone: "0123 456 789",
    slug: "Học JavaScript Cơ Bản!"
};

const result = formValidator.validate(formData);
console.log(result);
```

## 2. Template Engine Đơn Giản

### Mini Template System

```javascript
class MiniTemplate {
    constructor(template) {
        this.template = template;
        this.filters = new Map();
        this.helpers = new Map();
        
        // Built-in filters
        this.addFilter('uppercase', str => String(str).toUpperCase());
        this.addFilter('lowercase', str => String(str).toLowerCase());
        this.addFilter('capitalize', str => {
            return String(str).charAt(0).toUpperCase() + String(str).slice(1).toLowerCase();
        });
        this.addFilter('truncate', (str, length = 50) => {
            const text = String(str);
            return text.length > length ? text.substring(0, length) + '...' : text;
        });
        this.addFilter('slugify', str => {
            return String(str)
                .toLowerCase()
                .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                .replace(/[ìíịỉĩ]/g, 'i')
                .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                .replace(/[ùúụủũưừứựửữ]/g, 'u')
                .replace(/[ỳýỵỷỹ]/g, 'y')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        });
        this.addFilter('currency', (num, currency = 'VNĐ') => {
            return new Intl.NumberFormat('vi-VN').format(Number(num)) + ' ' + currency;
        });
        this.addFilter('date', (date, format = 'dd/MM/yyyy') => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            
            return format
                .replace('dd', day)
                .replace('MM', month)
                .replace('yyyy', year);
        });
        
        // Built-in helpers
        this.addHelper('if', (condition, trueValue, falseValue = '') => {
            return condition ? trueValue : falseValue;
        });
        this.addHelper('unless', (condition, trueValue, falseValue = '') => {
            return !condition ? trueValue : falseValue;
        });
        this.addHelper('repeat', (text, times) => {
            return String(text).repeat(Number(times));
        });
    }
    
    addFilter(name, fn) {
        this.filters.set(name, fn);
        return this;
    }
    
    addHelper(name, fn) {
        this.helpers.set(name, fn);
        return this;
    }
    
    render(data = {}) {
        let result = this.template;
        
        // Process helpers first: {{#helper args}}
        result = result.replace(/\{\{#(\w+)\s+([^}]+)\}\}/g, (match, helperName, args) => {
            const helper = this.helpers.get(helperName);
            if (!helper) return match;
            
            try {
                const parsedArgs = this.parseArgs(args, data);
                return helper(...parsedArgs);
            } catch (error) {
                console.warn(`Helper error: ${helperName}`, error);
                return match;
            }
        });
        
        // Process variables with filters: {{variable | filter1 | filter2}}
        result = result.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
            try {
                return this.processExpression(expression.trim(), data);
            } catch (error) {
                console.warn(`Template error: ${expression}`, error);
                return match;
            }
        });
        
        return result;
    }
    
    processExpression(expression, data) {
        const parts = expression.split('|').map(part => part.trim());
        let value = this.getValue(parts[0], data);
        
        // Apply filters
        for (let i = 1; i < parts.length; i++) {
            const filterPart = parts[i];
            const [filterName, ...args] = filterPart.split(/\s+/);
            const filter = this.filters.get(filterName);
            
            if (filter) {
                const parsedArgs = args.map(arg => this.parseValue(arg, data));
                value = filter(value, ...parsedArgs);
            }
        }
        
        return value;
    }
    
    getValue(path, data) {
        if (path.includes('.')) {
            return path.split('.').reduce((obj, key) => obj && obj[key], data);
        }
        return data[path];
    }
    
    parseValue(value, data) {
        // Number
        if (/^\d+(\.\d+)?$/.test(value)) {
            return parseFloat(value);
        }
        
        // String literal
        if (value.startsWith('"') && value.endsWith('"')) {
            return value.slice(1, -1);
        }
        
        if (value.startsWith("'") && value.endsWith("'")) {
            return value.slice(1, -1);
        }
        
        // Boolean
        if (value === 'true') return true;
        if (value === 'false') return false;
        
        // Variable
        return this.getValue(value, data);
    }
    
    parseArgs(argsString, data) {
        // Simple argument parsing (can be improved)
        return argsString
            .split(/\s+/)
            .map(arg => this.parseValue(arg, data));
    }
}

// Test template system
const template = new MiniTemplate(`
<div class="user-card">
    <h2>{{name | capitalize}}</h2>
    <p>Email: {{email | lowercase}}</p>
    <p>Bio: {{bio | truncate 100}}</p>
    <p>Salary: {{salary | currency}}</p>
    <p>Joined: {{joinDate | date "dd/MM/yyyy"}}</p>
    <p>Profile: {{#if isActive "Active" "Inactive"}}</p>
    <p>Stars: {{#repeat "⭐" rating}}</p>
</div>
`);

const userData = {
    name: "NGUYỄN VĂN A",
    email: "USER@GMAIL.COM",
    bio: "Tôi là một lập trình viên JavaScript với nhiều năm kinh nghiệm trong việc phát triển web applications và mobile apps sử dụng React Native.",
    salary: 15000000,
    joinDate: "2023-01-15",
    isActive: true,
    rating: 5
};

console.log(template.render(userData));
```

### Advanced Template với loops và conditions

```javascript
class AdvancedTemplate extends MiniTemplate {
    constructor(template) {
        super(template);
        
        // Add loop helpers
        this.addHelper('each', (array, itemTemplate) => {
            if (!Array.isArray(array)) return '';
            return array.map((item, index) => {
                return this.renderSubTemplate(itemTemplate, { ...item, $index: index, $first: index === 0, $last: index === array.length - 1 });
            }).join('');
        });
        
        this.addHelper('range', (start, end, template) => {
            const result = [];
            for (let i = start; i <= end; i++) {
                result.push(this.renderSubTemplate(template, { $value: i, $index: i - start }));
            }
            return result.join('');
        });
    }
    
    render(data = {}) {
        let result = this.template;
        
        // Process each loops: {{#each items}}...{{/each}}
        result = result.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, 
            (match, arrayName, itemTemplate) => {
                const array = this.getValue(arrayName, data);
                if (!Array.isArray(array)) return '';
                
                return array.map((item, index) => {
                    const itemData = typeof item === 'object' ? 
                        { ...data, ...item, $index: index, $first: index === 0, $last: index === array.length - 1 } :
                        { ...data, $item: item, $index: index, $first: index === 0, $last: index === array.length - 1 };
                    
                    return this.renderSubTemplate(itemTemplate, itemData);
                }).join('');
            }
        );
        
        // Process if blocks: {{#if condition}}...{{else}}...{{/if}}
        result = result.replace(/\{\{#if\s+([^}]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g,
            (match, condition, trueBlock, falseBlock = '') => {
                const conditionResult = this.evaluateCondition(condition, data);
                return conditionResult ? 
                    this.renderSubTemplate(trueBlock, data) : 
                    this.renderSubTemplate(falseBlock, data);
            }
        );
        
        // Process unless blocks
        result = result.replace(/\{\{#unless\s+([^}]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/unless\}\}/g,
            (match, condition, trueBlock, falseBlock = '') => {
                const conditionResult = this.evaluateCondition(condition, data);
                return !conditionResult ? 
                    this.renderSubTemplate(trueBlock, data) : 
                    this.renderSubTemplate(falseBlock, data);
            }
        );
        
        return super.render(data);
    }
    
    renderSubTemplate(template, data) {
        const subTemplate = new AdvancedTemplate(template);
        // Copy filters and helpers
        subTemplate.filters = this.filters;
        subTemplate.helpers = this.helpers;
        return subTemplate.render(data);
    }
    
    evaluateCondition(condition, data) {
        // Simple condition evaluation
        const trimmed = condition.trim();
        
        // Boolean values
        if (trimmed === 'true') return true;
        if (trimmed === 'false') return false;
        
        // Variable existence and truthiness
        const value = this.getValue(trimmed, data);
        return Boolean(value);
    }
}

// Test advanced template
const advancedTemplate = new AdvancedTemplate(`
<div class="blog">
    <h1>{{title | capitalize}}</h1>
    
    {{#if posts}}
    <div class="posts">
        {{#each posts}}
        <article class="post {{#if $first}}first{{/if}} {{#if $last}}last{{/if}}">
            <h2>{{title}}</h2>
            <p class="meta">Bài {{$index}} - {{author}} - {{date | date "dd/MM/yyyy"}}</p>
            <p>{{excerpt | truncate 150}}</p>
            
            {{#if tags}}
            <div class="tags">
                {{#each tags}}
                <span class="tag">{{$item | lowercase}}</span>
                {{/each}}
            </div>
            {{/if}}
        </article>
        {{/each}}
    </div>
    {{else}}
    <p>Chưa có bài viết nào.</p>
    {{/if}}
</div>
`);

const blogData = {
    title: "javascript cơ bản",
    posts: [
        {
            title: "Giới thiệu về JavaScript",
            author: "Long Đoàn",
            date: "2024-01-15",
            excerpt: "JavaScript là ngôn ngữ lập trình được sử dụng rộng rãi để phát triển web. Trong bài viết này, chúng ta sẽ tìm hiểu về những khái niệm cơ bản của JavaScript và cách sử dụng chúng trong thực tế.",
            tags: ["JavaScript", "Cơ Bản", "Web Development"]
        },
        {
            title: "Các kiểu dữ liệu trong JavaScript",
            author: "Long Đoàn", 
            date: "2024-01-20",
            excerpt: "JavaScript có nhiều kiểu dữ liệu khác nhau như String, Number, Boolean, Object, Array. Mỗi kiểu có những đặc điểm và cách sử dụng riêng biệt.",
            tags: ["JavaScript", "Data Types", "Programming"]
        }
    ]
};

console.log(advancedTemplate.render(blogData));
```

## 3. Text Analytics và Processing

### Content Analysis Tool

```javascript
class ContentAnalyzer {
    constructor(text) {
        this.original = text;
        this.cleaned = this.cleanText(text);
        this.words = this.extractWords(this.cleaned);
        this.sentences = this.extractSentences(text);
        this.paragraphs = this.extractParagraphs(text);
    }
    
    cleanText(text) {
        return text
            .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, ' ') // Keep Vietnamese chars
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }
    
    extractWords(text) {
        return text
            .split(/\s+/)
            .filter(word => word.length > 0);
    }
    
    extractSentences(text) {
        return text
            .split(/[.!?]+/)
            .map(sentence => sentence.trim())
            .filter(sentence => sentence.length > 0);
    }
    
    extractParagraphs(text) {
        return text
            .split(/\n\s*\n/)
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph.length > 0);
    }
    
    // Basic statistics
    getStats() {
        const wordCount = this.words.length;
        const charCount = this.original.length;
        const charCountNoSpaces = this.original.replace(/\s/g, '').length;
        const sentenceCount = this.sentences.length;
        const paragraphCount = this.paragraphs.length;
        
        return {
            words: wordCount,
            characters: charCount,
            charactersNoSpaces: charCountNoSpaces,
            sentences: sentenceCount,
            paragraphs: paragraphCount,
            averageWordsPerSentence: sentenceCount > 0 ? Math.round(wordCount / sentenceCount * 10) / 10 : 0,
            averageCharsPerWord: wordCount > 0 ? Math.round(charCountNoSpaces / wordCount * 10) / 10 : 0,
            readingTime: Math.ceil(wordCount / 200) // 200 words per minute
        };
    }
    
    // Word frequency analysis
    getWordFrequency(minLength = 3) {
        const frequency = {};
        
        this.words
            .filter(word => word.length >= minLength)
            .forEach(word => {
                frequency[word] = (frequency[word] || 0) + 1;
            });
        
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([word, count]) => ({ word, count, percentage: Math.round(count / this.words.length * 100 * 100) / 100 }));
    }
    
    // Language detection heuristics
    detectLanguage() {
        const text = this.cleaned.substring(0, 1000); // Sample first 1000 chars
        
        // Vietnamese indicators
        const vietnameseChars = (text.match(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g) || []).length;
        const vietnameseWords = ['và', 'của', 'trong', 'với', 'để', 'các', 'một', 'có', 'được', 'là'].filter(word => text.includes(word)).length;
        
        // English indicators  
        const englishWords = ['the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but'].filter(word => text.includes(word)).length;
        
        const vietnameseScore = vietnameseChars * 2 + vietnameseWords;
        const englishScore = englishWords;
        
        if (vietnameseScore > englishScore && vietnameseScore > 5) return 'vi';
        if (englishScore > 5) return 'en';
        return 'unknown';
    }
    
    // Readability analysis (simplified)
    getReadabilityScore() {
        const stats = this.getStats();
        
        // Simplified formula based on average word and sentence length
        const avgWordsPerSentence = stats.averageWordsPerSentence;
        const avgCharsPerWord = stats.averageCharsPerWord;
        
        // Lower score = easier to read
        let score = (avgWordsPerSentence * 0.39) + (avgCharsPerWord * 11.8) - 15.59;
        
        let level;
        if (score <= 30) level = 'Rất dễ đọc';
        else if (score <= 50) level = 'Dễ đọc';
        else if (score <= 60) level = 'Trung bình';
        else if (score <= 70) level = 'Hơi khó';
        else level = 'Khó đọc';
        
        return {
            score: Math.round(score),
            level,
            language: this.detectLanguage()
        };
    }
    
    // Extract keywords
    getKeywords() {
        // Common stop words (Vietnamese and English)
        const stopWords = new Set([
            'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with',
            'và', 'của', 'trong', 'với', 'để', 'các', 'một', 'có', 'được', 'là', 'tại', 'từ', 'này', 'đó', 'sẽ', 'đã', 'cho', 'về', 'như', 'khi', 'nếu', 'vì', 'mà'
        ]);
        
        return this.words
            .filter(word => word.length > 3 && !stopWords.has(word))
            .reduce((acc, word) => {
                acc[word] = (acc[word] || 0) + 1;
                return acc;
            }, {});
    }
    
    // Sentiment analysis (very basic)
    getSentiment() {
        const positiveWords = ['tốt', 'hay', 'tuyệt', 'xuất sắc', 'tuyệt vời', 'good', 'great', 'excellent', 'amazing', 'awesome', 'love', 'best'];
        const negativeWords = ['xấu', 'tệ', 'dở', 'không tốt', 'bad', 'terrible', 'awful', 'hate', 'worst', 'horrible'];
        
        let positiveScore = 0;
        let negativeScore = 0;
        
        this.words.forEach(word => {
            if (positiveWords.includes(word)) positiveScore++;
            if (negativeWords.includes(word)) negativeScore++;
        });
        
        const total = positiveScore + negativeScore;
        if (total === 0) return { sentiment: 'neutral', confidence: 0 };
        
        const confidence = Math.round((Math.abs(positiveScore - negativeScore) / total) * 100);
        
        if (positiveScore > negativeScore) return { sentiment: 'positive', confidence };
        if (negativeScore > positiveScore) return { sentiment: 'negative', confidence };
        return { sentiment: 'neutral', confidence };
    }
    
    // Generate summary
    generateReport() {
        const stats = this.getStats();
        const readability = this.getReadabilityScore();
        const wordFreq = this.getWordFrequency();
        const sentiment = this.getSentiment();
        
        return {
            statistics: stats,
            readability,
            sentiment,
            topWords: wordFreq.slice(0, 10),
            language: readability.language,
            summary: this.generateSummary(stats, readability)
        };
    }
    
    generateSummary(stats, readability) {
        const parts = [];
        
        parts.push(`Văn bản có ${stats.words} từ, ${stats.sentences} câu, ${stats.paragraphs} đoạn văn.`);
        parts.push(`Thời gian đọc ước tính: ${stats.readingTime} phút.`);
        parts.push(`Độ khó đọc: ${readability.level}.`);
        
        if (readability.language === 'vi') {
            parts.push('Ngôn ngữ: Tiếng Việt.');
        } else if (readability.language === 'en') {
            parts.push('Ngôn ngữ: Tiếng Anh.');
        }
        
        return parts.join(' ');
    }
}

// Test content analyzer
const sampleText = `
JavaScript là một ngôn ngữ lập trình mạnh mẽ và linh hoạt. Nó được sử dụng rộng rãi trong phát triển web, từ frontend đến backend.

Với JavaScript, bạn có thể tạo ra các ứng dụng web tương tác, mobile apps, và thậm chí cả desktop applications. Ngôn ngữ này có cú pháp đơn giản và dễ học.

JavaScript hỗ trợ nhiều paradigm lập trình khác nhau như object-oriented programming, functional programming. Điều này làm cho nó trở thành một công cụ tuyệt vời cho developers.
`;

const analyzer = new ContentAnalyzer(sampleText);
console.log(analyzer.generateReport());
```

## 4. URL và Query String Processor

### URL Manager hoàn chỉnh

```javascript
class URLManager {
    constructor(url = '') {
        this.original = url;
        this.parsed = this.parseURL(url);
    }
    
    parseURL(url) {
        try {
            const urlObj = new URL(url);
            return {
                protocol: urlObj.protocol,
                hostname: urlObj.hostname,
                port: urlObj.port,
                pathname: urlObj.pathname,
                search: urlObj.search,
                hash: urlObj.hash,
                params: this.parseParams(urlObj.search),
                pathSegments: urlObj.pathname.split('/').filter(segment => segment)
            };
        } catch (error) {
            // Fallback manual parsing
            return this.manualParseURL(url);
        }
    }
    
    manualParseURL(url) {
        const result = {
            protocol: '',
            hostname: '',
            port: '',
            pathname: '',
            search: '',
            hash: '',
            params: {},
            pathSegments: []
        };
        
        // Extract hash
        const [urlWithoutHash, hash] = url.split('#');
        result.hash = hash ? '#' + hash : '';
        
        // Extract query string
        const [urlWithoutQuery, query] = urlWithoutHash.split('?');
        result.search = query ? '?' + query : '';
        result.params = query ? this.parseParams('?' + query) : {};
        
        // Extract protocol
        const protocolMatch = urlWithoutQuery.match(/^(\w+):\/\//);
        if (protocolMatch) {
            result.protocol = protocolMatch[1] + ':';
            const remaining = urlWithoutQuery.substring(protocolMatch[0].length);
            
            // Extract hostname, port, and path
            const firstSlash = remaining.indexOf('/');
            if (firstSlash === -1) {
                result.hostname = remaining;
                result.pathname = '/';
            } else {
                const hostAndPort = remaining.substring(0, firstSlash);
                result.pathname = remaining.substring(firstSlash);
                
                const [hostname, port] = hostAndPort.split(':');
                result.hostname = hostname;
                result.port = port || '';
            }
        } else {
            result.pathname = urlWithoutQuery;
        }
        
        result.pathSegments = result.pathname.split('/').filter(segment => segment);
        
        return result;
    }
    
    parseParams(queryString) {
        const params = {};
        if (!queryString || queryString === '?') return params;
        
        const paramString = queryString.startsWith('?') ? queryString.substring(1) : queryString;
        
        paramString.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                const decodedKey = decodeURIComponent(key);
                const decodedValue = value ? decodeURIComponent(value) : '';
                
                // Handle array parameters (key[])
                if (decodedKey.endsWith('[]')) {
                    const arrayKey = decodedKey.slice(0, -2);
                    if (!params[arrayKey]) params[arrayKey] = [];
                    params[arrayKey].push(decodedValue);
                } else {
                    params[decodedKey] = decodedValue;
                }
            }
        });
        
        return params;
    }
    
    // Update parameters
    setParam(key, value) {
        if (Array.isArray(value)) {
            this.parsed.params[key] = [...value];
        } else {
            this.parsed.params[key] = String(value);
        }
        this.updateSearchString();
        return this;
    }
    
    addParam(key, value) {
        if (!this.parsed.params[key]) {
            this.parsed.params[key] = [];
        } else if (!Array.isArray(this.parsed.params[key])) {
            this.parsed.params[key] = [this.parsed.params[key]];
        }
        this.parsed.params[key].push(String(value));
        this.updateSearchString();
        return this;
    }
    
    removeParam(key) {
        delete this.parsed.params[key];
        this.updateSearchString();
        return this;
    }
    
    clearParams() {
        this.parsed.params = {};
        this.parsed.search = '';
        return this;
    }
    
    updateSearchString() {
        const paramStrings = [];
        
        for (const [key, value] of Object.entries(this.parsed.params)) {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    paramStrings.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`);
                });
            } else {
                paramStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
        
        this.parsed.search = paramStrings.length > 0 ? '?' + paramStrings.join('&') : '';
        return this;
    }
    
    // Path operations
    setPath(path) {
        this.parsed.pathname = path.startsWith('/') ? path : '/' + path;
        this.parsed.pathSegments = this.parsed.pathname.split('/').filter(segment => segment);
        return this;
    }
    
    addPathSegment(segment) {
        this.parsed.pathSegments.push(String(segment));
        this.parsed.pathname = '/' + this.parsed.pathSegments.join('/');
        return this;
    }
    
    removeLastPathSegment() {
        this.parsed.pathSegments.pop();
        this.parsed.pathname = '/' + this.parsed.pathSegments.join('/');
        return this;
    }
    
    // Build final URL
    build() {
        let url = '';
        
        if (this.parsed.protocol && this.parsed.hostname) {
            url += this.parsed.protocol + '//' + this.parsed.hostname;
            if (this.parsed.port) url += ':' + this.parsed.port;
        }
        
        url += this.parsed.pathname || '/';
        url += this.parsed.search || '';
        url += this.parsed.hash || '';
        
        return url;
    }
    
    toString() {
        return this.build();
    }
    
    // Utility methods
    clone() {
        return new URLManager(this.build());
    }
    
    getParam(key) {
        return this.parsed.params[key];
    }
    
    hasParam(key) {
        return key in this.parsed.params;
    }
    
    getPathSegment(index) {
        return this.parsed.pathSegments[index];
    }
    
    // Static utility methods
    static join(...parts) {
        return parts
            .map((part, index) => {
                if (index === 0) return part.replace(/\/$/, '');
                return part.replace(/^\//, '').replace(/\/$/, '');
            })
            .filter(part => part)
            .join('/');
    }
    
    static normalize(url) {
        return new URLManager(url).build();
    }
    
    static compare(url1, url2) {
        const parsed1 = new URLManager(url1).parsed;
        const parsed2 = new URLManager(url2).parsed;
        
        return (
            parsed1.protocol === parsed2.protocol &&
            parsed1.hostname === parsed2.hostname &&
            parsed1.port === parsed2.port &&
            parsed1.pathname === parsed2.pathname &&
            JSON.stringify(parsed1.params) === JSON.stringify(parsed2.params)
        );
    }
}

// Test URL Manager
const urlManager = new URLManager('https://example.com/api/users?page=1&limit=10#results')
    .setParam('page', 2)
    .addParam('filter', 'active')
    .addParam('sort', 'name')
    .addPathSegment('profiles')
    .setParam('include', ['avatar', 'bio']);

console.log(urlManager.toString());
// https://example.com/api/users/profiles?page=2&limit=10&filter=active&sort=name&include[]=avatar&include[]=bio#results

console.log('Path segments:', urlManager.parsed.pathSegments);
console.log('Parameters:', urlManager.parsed.params);
```

## 5. Tóm Tắt và Best Practices

### Kiến thức tổng hợp về String:

| Chức năng | Phương thức chính | Ứng dụng thực tế |
|-----------|------------------|------------------|
| **Validation** | match(), test(), includes() | Form validation, input sanitization |
| **Transformation** | replace(), split(), join() | Data cleaning, format conversion |
| **Search & Extract** | indexOf(), slice(), substring() | Parsing, content extraction |
| **Template** | Template literals, replace() | Dynamic content generation |
| **Analysis** | length, split(), regex | Content analytics, SEO tools |

### Best Practices tổng hợp:

1. **🔍 Input Validation**
   ```javascript
   // ✅ Luôn validate và sanitize input
   const cleanInput = input.trim().replace(/[<>]/g, '');
   
   // ✅ Sử dụng type-safe operations
   const safeString = String(input);
   ```

2. **🚀 Performance Optimization**
   ```javascript
   // ✅ Template literals thay vì concat
   const message = `Hello ${name}!`;
   
   // ✅ Array join cho nhiều strings
   const result = parts.join('');
   
   // ✅ Regex với flag 'g' cho replace all
   text.replace(/pattern/g, 'replacement');
   ```

3. **🔧 Method Chaining**
   ```javascript
   // ✅ Chain methods cho code clean
   const result = text
       .trim()
       .toLowerCase() 
       .replace(/\s+/g, '-')
       .replace(/[^a-z0-9-]/g, '');
   ```

4. **⚡ Error Handling**
   ```javascript
   // ✅ Handle edge cases
   function safeProcess(text) {
       if (typeof text !== 'string') return '';
       return text.trim() || 'default';
   }
   ```

5. **🎯 Immutability**
   ```javascript
   // ✅ String methods không mutate original
   const original = "Hello";
   const modified = original.toUpperCase(); // original vẫn là "Hello"
   ```

String manipulation là kỹ năng cốt lõi trong JavaScript. Việc nắm vững các phương thức và patterns này sẽ giúp bạn xử lý dữ liệu text một cách hiệu quả và professional!
