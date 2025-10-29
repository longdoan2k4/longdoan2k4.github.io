---
slug: javascript-co-ban-bai-20-21
url: /posts/javascript-co-ban-bai-20-21/
title: "JavaScript Cơ Bản - Bài 20: Null Và Undefined - Từ Cơ Bản Đến Ứng Dụng Thực Tế"
date: 2025-10-21T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu toàn diện về null và undefined: khái niệm, so sánh, ứng dụng thực tế với optional chaining, nullish coalescing và defensive programming"
---

# JavaScript Cơ Bản - Bài 20 - 21: Null Và Undefined - Từ Cơ Bản Đến Ứng Dụng Thực Tế

Null và undefined là hai special values trong JavaScript đại diện cho "không có gì" hoặc "missing values". Mặc dù có vẻ tương tự, chúng có những khác biệt quan trọng và use cases riêng biệt. Hiểu rõ chúng giúp viết code chính xác và tránh bugs phổ biến.

## Video Hướng Dẫn

{{< youtube CeM74bs91Sw >}}

## 1. Null vs Undefined Basics

### Khái niệm cơ bản

```javascript
// undefined: Giá trị mặc định cho uninitialized variables
let notAssigned;
console.log(notAssigned);                   // undefined
console.log(typeof notAssigned);            // "undefined"

// null: Intentional absence of value
let intentionallyEmpty = null;
console.log(intentionallyEmpty);            // null
console.log(typeof intentionallyEmpty);     // "object" (famous JavaScript quirk!)

// So sánh types
console.log(typeof undefined);              // "undefined"
console.log(typeof null);                   // "object"

// Falsy values
console.log(Boolean(undefined));            // false
console.log(Boolean(null));                 // false

// Checking for undefined
console.log(notAssigned === undefined);     // true
console.log(typeof notAssigned === 'undefined'); // true

// Checking for null
console.log(intentionallyEmpty === null);   // true
console.log(intentionallyEmpty == null);    // true
console.log(intentionallyEmpty == undefined); // true (loose equality!)

// Strict vs loose equality
console.log(null === undefined);            // false
console.log(null == undefined);             // true
```

### Khi nào xuất hiện undefined

```javascript
// 1. Uninitialized variables
let x;
console.log(x);                             // undefined

// 2. Missing object properties
const user = { name: 'John' };
console.log(user.age);                      // undefined
console.log(user.address?.street);         // undefined (with optional chaining)

// 3. Missing array elements
const arr = [1, , 3];  // Sparse array
console.log(arr[1]);                        // undefined
console.log(arr[5]);                        // undefined (out of bounds)

// 4. Function parameters not provided
function greet(name, greeting) {
    console.log(`${greeting || 'Hello'}, ${name || 'Anonymous'}!`);
}
greet('John');                              // greeting is undefined

// 5. Functions without explicit return
function noReturn() {
    console.log('This function returns undefined');
}
const result = noReturn();
console.log(result);                        // undefined

// 6. Destructuring with missing values
const [a, b, c] = [1, 2];
console.log(c);                             // undefined

const { name, age, city } = { name: 'John', age: 25 };
console.log(city);                          // undefined

// 7. Delete operator
const obj = { x: 1, y: 2 };
delete obj.x;
console.log(obj.x);                         // undefined
```

### Khi nào sử dụng null

```javascript
// 1. Intentionally empty values
let selectedFile = null;        // No file selected yet
let currentUser = null;         // No user logged in
let lastError = null;          // No error occurred

// 2. Reset values
let data = { items: [1, 2, 3] };
data = null;                   // Clear the data

// 3. API responses thường dùng null
const apiResponse = {
    user: {
        id: 123,
        name: 'John',
        avatar: null,           // User has no avatar
        lastLoginDate: null     // Never logged in
    }
};

// 4. Default values trong functions
function processData(data = null) {
    if (data === null) {
        console.log('No data provided');
        return;
    }
    // Process data
}

// 5. Database-like operations
const users = [
    { id: 1, name: 'John', deletedAt: null },
    { id: 2, name: 'Jane', deletedAt: null },
    { id: 3, name: 'Bob', deletedAt: new Date() }
];

// Find active users (deletedAt is null)
const activeUsers = users.filter(user => user.deletedAt === null);
console.log(activeUsers);

// 6. Configuration values
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retryCount: null,           // No retry
    cache: null                 // No caching
};
```

### Type checking utilities

```javascript
// Comprehensive type checking utilities
class TypeChecker {
    // Check for undefined
    static isUndefined(value) {
        return typeof value === 'undefined';
    }
    
    // Check for null
    static isNull(value) {
        return value === null;
    }
    
    // Check for null or undefined (nullish)
    static isNullish(value) {
        return value == null; // Uses loose equality to catch both
    }
    
    // More explicit version
    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    
    // Check for defined (not null or undefined)
    static isDefined(value) {
        return value != null;
    }
    
    // Check for existing (truthy but allow 0, false, "")
    static exists(value) {
        return value !== null && value !== undefined;
    }
    
    // Check for empty values
    static isEmpty(value) {
        if (this.isNullish(value)) return true;
        
        if (typeof value === 'string') return value === '';
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        
        return false;
    }
    
    // Check for non-empty values
    static isNotEmpty(value) {
        return !this.isEmpty(value);
    }
    
    // Safe type checking
    static getType(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        
        const type = typeof value;
        
        if (type === 'object') {
            if (Array.isArray(value)) return 'array';
            if (value instanceof Date) return 'date';
            if (value instanceof RegExp) return 'regexp';
        }
        
        return type;
    }
    
    // Debugging helper
    static describe(value) {
        return {
            value,
            type: this.getType(value),
            isNull: this.isNull(value),
            isUndefined: this.isUndefined(value),
            isNullish: this.isNullish(value),
            isEmpty: this.isEmpty(value),
            isTruthy: !!value,
            isFalsy: !value
        };
    }
}

// Test type checker
console.log('Type Checker Tests:');
console.log(TypeChecker.describe(null));
console.log(TypeChecker.describe(undefined));
console.log(TypeChecker.describe(''));
console.log(TypeChecker.describe([]));
console.log(TypeChecker.describe({}));
console.log(TypeChecker.describe(0));
console.log(TypeChecker.describe(false));

// Practical usage
function processUser(user) {
    if (TypeChecker.isNullish(user)) {
        throw new Error('User cannot be null or undefined');
    }
    
    if (TypeChecker.isEmpty(user.name)) {
        throw new Error('User name is required');
    }
    
    // Safe processing
    const profile = {
        id: user.id,
        name: user.name,
        email: user.email || null,
        avatar: user.avatar || null
    };
    
    return profile;
}
```

## 2. Comparison và Equality

### Equality comparisons

```javascript
// Strict equality (===)
console.log('Strict equality:');
console.log(null === null);                 // true
console.log(undefined === undefined);       // true
console.log(null === undefined);            // false
console.log(null === false);                // false
console.log(undefined === false);           // false
console.log(null === 0);                    // false
console.log(undefined === 0);               // false

// Loose equality (==)
console.log('Loose equality:');
console.log(null == null);                  // true
console.log(undefined == undefined);        // true
console.log(null == undefined);             // true (special case!)
console.log(null == false);                 // false
console.log(undefined == false);            // false
console.log(null == 0);                     // false
console.log(undefined == 0);                // false

// Type coercion với other values
console.log('Type coercion:');
console.log(null + 1);                      // 1 (null becomes 0)
console.log(undefined + 1);                 // NaN
console.log(Number(null));                  // 0
console.log(Number(undefined));             // NaN
console.log(String(null));                  // "null"
console.log(String(undefined));             // "undefined"

// Comparison operators
console.log('Comparisons:');
console.log(null > 0);                      // false
console.log(null == 0);                     // false
console.log(null >= 0);                     // true (null becomes 0)
console.log(undefined > 0);                 // false
console.log(undefined >= 0);                // false
console.log(undefined < 0);                 // false

// Safe comparison utilities
class SafeComparison {
    static equals(a, b) {
        return a === b;
    }
    
    static looseEquals(a, b) {
        return a == b;
    }
    
    static bothNullish(a, b) {
        return (a == null) && (b == null);
    }
    
    static eitherNullish(a, b) {
        return (a == null) || (b == null);
    }
    
    static neitherNullish(a, b) {
        return (a != null) && (b != null);
    }
    
    // Safe comparison that handles null/undefined
    static safeCompare(a, b, nullsFirst = true) {
        // Both nullish
        if (a == null && b == null) return 0;
        
        // Only one nullish
        if (a == null) return nullsFirst ? -1 : 1;
        if (b == null) return nullsFirst ? 1 : -1;
        
        // Regular comparison
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
    
    // Deep equality check
    static deepEquals(a, b) {
        if (a === b) return true;
        
        if (a == null || b == null) return false;
        
        if (typeof a !== typeof b) return false;
        
        if (typeof a !== 'object') return false;
        
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        
        if (Array.isArray(a)) {
            if (a.length !== b.length) return false;
            return a.every((item, index) => this.deepEquals(item, b[index]));
        }
        
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        
        if (keysA.length !== keysB.length) return false;
        
        return keysA.every(key => this.deepEquals(a[key], b[key]));
    }
}

// Test comparisons
console.log('Safe Comparison Tests:');
console.log(SafeComparison.bothNullish(null, undefined));     // true
console.log(SafeComparison.safeCompare(null, 5));            // -1 (nulls first)
console.log(SafeComparison.safeCompare(null, 5, false));     // 1 (nulls last)
console.log(SafeComparison.deepEquals({ a: null }, { a: null })); // true
```

### Sorting với null/undefined values

```javascript
// Sorting arrays với null/undefined values
const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: null },
    { name: 'Bob', age: 25 },
    { name: 'Alice', age: undefined },
    { name: 'Charlie', age: 35 }
];

// Problem: Default sort doesn't handle null/undefined well
const badSort = [...data].sort((a, b) => a.age - b.age);
console.log('Bad sort:', badSort); // NaN results

// Solution: Safe sorting
function createSafeSort(keyExtractor, nullsLast = false) {
    return function(a, b) {
        const aVal = keyExtractor(a);
        const bVal = keyExtractor(b);
        
        return SafeComparison.safeCompare(aVal, bVal, !nullsLast);
    };
}

const goodSort = [...data].sort(createSafeSort(item => item.age));
console.log('Good sort (nulls first):', goodSort);

const nullsLastSort = [...data].sort(createSafeSort(item => item.age, true));
console.log('Good sort (nulls last):', nullsLastSort);

// Advanced sorting utility
class AdvancedSort {
    static by(keyExtractor, options = {}) {
        const {
            nullsLast = false,
            descending = false,
            customCompare = null
        } = options;
        
        return function(a, b) {
            const aVal = keyExtractor(a);
            const bVal = keyExtractor(b);
            
            let result;
            
            if (customCompare && aVal != null && bVal != null) {
                result = customCompare(aVal, bVal);
            } else {
                result = SafeComparison.safeCompare(aVal, bVal, !nullsLast);
            }
            
            return descending ? -result : result;
        };
    }
    
    static multipleBy(...sorters) {
        return function(a, b) {
            for (const sorter of sorters) {
                const result = sorter(a, b);
                if (result !== 0) return result;
            }
            return 0;
        };
    }
}

// Test advanced sorting
const multiSort = [...data].sort(
    AdvancedSort.multipleBy(
        AdvancedSort.by(item => item.age == null ? 0 : 1), // Nulls first
        AdvancedSort.by(item => item.age),                  // Then by age
        AdvancedSort.by(item => item.name)                  // Then by name
    )
);

console.log('Multi-column sort:', multiSort);
```

## 3. Default Values và Fallbacks

### Traditional approaches

```javascript
// Old-school approaches (pre-ES6)
function greetOldWay(name) {
    // Problem: "" và 0 cũng được replace
    name = name || 'Anonymous';
    return `Hello, ${name}!`;
}

function greetBetter(name) {
    // Better: Only replace null/undefined
    if (name == null) {
        name = 'Anonymous';
    }
    return `Hello, ${name}!`;
}

function greetExplicit(name) {
    // Most explicit
    if (name === null || name === undefined) {
        name = 'Anonymous';
    }
    return `Hello, ${name}!`;
}

// Test different approaches
console.log(greetOldWay(''));           // "Hello, Anonymous!" (empty string replaced)
console.log(greetOldWay(0));            // "Hello, Anonymous!" (zero replaced)
console.log(greetBetter(''));           // "Hello, !" (empty string kept)
console.log(greetBetter(null));         // "Hello, Anonymous!" (null replaced)
```

### Modern approaches

```javascript
// ES6+ default parameters
function greetModern(name = 'Anonymous') {
    return `Hello, ${name}!`;
}

// Nullish coalescing operator (??) - ES2020
function greetNullish(name) {
    name = name ?? 'Anonymous';
    return `Hello, ${name}!`;
}

// Logical OR với explicit check
function greetLogical(name) {
    name = (name != null) ? name : 'Anonymous';
    return `Hello, ${name}!`;
}

console.log('Modern approaches:');
console.log(greetModern());             // "Hello, Anonymous!"
console.log(greetModern(null));         // "Hello, null!" (null passed through!)
console.log(greetNullish(null));        // "Hello, Anonymous!" (null replaced)
console.log(greetNullish(''));          // "Hello, !" (empty string kept)

// Comprehensive default value utility
class DefaultValue {
    // Replace only null/undefined
    static nullish(value, defaultValue) {
        return value ?? defaultValue;
    }
    
    // Replace falsy values
    static falsy(value, defaultValue) {
        return value || defaultValue;
    }
    
    // Replace empty values (null, undefined, "", [], {})
    static empty(value, defaultValue) {
        if (value == null) return defaultValue;
        
        if (typeof value === 'string' && value === '') return defaultValue;
        if (Array.isArray(value) && value.length === 0) return defaultValue;
        if (typeof value === 'object' && Object.keys(value).length === 0) return defaultValue;
        
        return value;
    }
    
    // Chain multiple fallbacks
    static chain(...values) {
        for (const value of values) {
            if (value != null) return value;
        }
        return null;
    }
    
    // Conditional default
    static when(condition, value, defaultValue) {
        return condition ? value : defaultValue;
    }
    
    // Type-safe defaults
    static typed(value, defaultValue, expectedType) {
        if (value == null) return defaultValue;
        if (typeof value === expectedType) return value;
        return defaultValue;
    }
    
    // Deep default (for objects)
    static deep(obj, defaults) {
        if (obj == null) return { ...defaults };
        
        const result = { ...obj };
        
        for (const [key, defaultVal] of Object.entries(defaults)) {
            if (result[key] == null) {
                result[key] = defaultVal;
            } else if (typeof defaultVal === 'object' && defaultVal !== null && 
                      typeof result[key] === 'object' && result[key] !== null) {
                result[key] = this.deep(result[key], defaultVal);
            }
        }
        
        return result;
    }
}

// Test default values
console.log('Default Value Tests:');
console.log(DefaultValue.nullish(null, 'default'));        // "default"
console.log(DefaultValue.nullish('', 'default'));          // ""
console.log(DefaultValue.falsy('', 'default'));            // "default"
console.log(DefaultValue.empty([], 'default'));            // "default"
console.log(DefaultValue.chain(null, undefined, '', 'found')); // ""
console.log(DefaultValue.typed('123', 456, 'number'));     // 456 (wrong type)

const userDefaults = {
    name: 'Anonymous',
    settings: {
        theme: 'light',
        notifications: true
    }
};

const user = {
    name: 'John',
    settings: {
        theme: 'dark'
        // notifications missing
    }
};

const userWithDefaults = DefaultValue.deep(user, userDefaults);
console.log('User with defaults:', userWithDefaults);
```

### Configuration management

```javascript
// Configuration system với null/undefined handling
class Configuration {
    constructor(config = {}) {
        this.config = new Map();
        this.defaults = new Map();
        this.validators = new Map();
        
        this.loadConfig(config);
    }
    
    setDefault(key, value) {
        this.defaults.set(key, value);
        return this;
    }
    
    setValidator(key, validator) {
        this.validators.set(key, validator);
        return this;
    }
    
    set(key, value) {
        // Validate if validator exists
        const validator = this.validators.get(key);
        if (validator && value != null && !validator(value)) {
            throw new Error(`Invalid value for ${key}: ${value}`);
        }
        
        this.config.set(key, value);
        return this;
    }
    
    get(key, fallback = undefined) {
        // Priority: explicit value > default > fallback
        if (this.config.has(key)) {
            const value = this.config.get(key);
            if (value !== null && value !== undefined) {
                return value;
            }
        }
        
        if (this.defaults.has(key)) {
            return this.defaults.get(key);
        }
        
        return fallback;
    }
    
    has(key) {
        return this.config.has(key) || this.defaults.has(key);
    }
    
    remove(key) {
        this.config.delete(key);
        return this;
    }
    
    clear() {
        this.config.clear();
        return this;
    }
    
    loadConfig(config) {
        for (const [key, value] of Object.entries(config)) {
            this.set(key, value);
        }
        return this;
    }
    
    toObject() {
        const result = {};
        
        // Add all defaults
        for (const [key, value] of this.defaults) {
            result[key] = value;
        }
        
        // Override with actual values
        for (const [key, value] of this.config) {
            if (value !== null && value !== undefined) {
                result[key] = value;
            }
        }
        
        return result;
    }
    
    // Get only explicitly set values (no defaults)
    getExplicit() {
        const result = {};
        for (const [key, value] of this.config) {
            if (value !== null && value !== undefined) {
                result[key] = value;
            }
        }
        return result;
    }
    
    // Get values that differ from defaults
    getOverrides() {
        const result = {};
        for (const [key, value] of this.config) {
            const defaultValue = this.defaults.get(key);
            if (value !== null && value !== undefined && value !== defaultValue) {
                result[key] = value;
            }
        }
        return result;
    }
    
    // Merge another configuration
    merge(otherConfig) {
        if (otherConfig instanceof Configuration) {
            for (const [key, value] of otherConfig.config) {
                this.set(key, value);
            }
        } else {
            this.loadConfig(otherConfig);
        }
        return this;
    }
    
    // Clone configuration
    clone() {
        const clone = new Configuration();
        
        for (const [key, value] of this.defaults) {
            clone.setDefault(key, value);
        }
        
        for (const [key, validator] of this.validators) {
            clone.setValidator(key, validator);
        }
        
        for (const [key, value] of this.config) {
            clone.set(key, value);
        }
        
        return clone;
    }
}

// Test configuration system
const appConfig = new Configuration()
    .setDefault('theme', 'light')
    .setDefault('language', 'en')
    .setDefault('timeout', 5000)
    .setDefault('retries', 3)
    .setValidator('timeout', val => typeof val === 'number' && val > 0)
    .setValidator('theme', val => ['light', 'dark'].includes(val));

// Load user preferences
appConfig.loadConfig({
    theme: 'dark',
    timeout: null,          // Will use default
    customSetting: 'value'
});

console.log('App config:');
console.log('Theme:', appConfig.get('theme'));              // "dark"
console.log('Timeout:', appConfig.get('timeout'));          // 5000 (default)
console.log('Language:', appConfig.get('language'));        // "en" (default)
console.log('Custom:', appConfig.get('customSetting'));     // "value"

console.log('Full config:', appConfig.toObject());
console.log('Overrides only:', appConfig.getOverrides());
```

## 4. Error Handling với Null/Undefined

### Defensive programming

```javascript
// Defensive programming patterns
class SafeOperations {
    // Safe property access
    static safeGet(obj, path, defaultValue = null) {
        if (obj == null) return defaultValue;
        
        const keys = Array.isArray(path) ? path : path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current == null || !(key in current)) {
                return defaultValue;
            }
            current = current[key];
        }
        
        return current;
    }
    
    // Safe method call
    static safeCall(obj, methodName, ...args) {
        if (obj == null || typeof obj[methodName] !== 'function') {
            return null;
        }
        
        try {
            return obj[methodName](...args);
        } catch (error) {
            console.warn(`Error calling ${methodName}:`, error);
            return null;
        }
    }
    
    // Safe array operations
    static safeMap(array, mapper, defaultValue = []) {
        if (!Array.isArray(array)) return defaultValue;
        
        try {
            return array.map(mapper);
        } catch (error) {
            console.warn('Error in safeMap:', error);
            return defaultValue;
        }
    }
    
    static safeFilter(array, predicate, defaultValue = []) {
        if (!Array.isArray(array)) return defaultValue;
        
        try {
            return array.filter(predicate);
        } catch (error) {
            console.warn('Error in safeFilter:', error);
            return defaultValue;
        }
    }
    
    // Safe string operations
    static safeString(value, defaultValue = '') {
        if (value == null) return defaultValue;
        return String(value);
    }
    
    static safeNumber(value, defaultValue = 0) {
        if (value == null) return defaultValue;
        const num = Number(value);
        return isNaN(num) ? defaultValue : num;
    }
    
    // Safe object operations
    static safeKeys(obj) {
        return obj == null ? [] : Object.keys(obj);
    }
    
    static safeValues(obj) {
        return obj == null ? [] : Object.values(obj);
    }
    
    static safeEntries(obj) {
        return obj == null ? [] : Object.entries(obj);
    }
}

// Test safe operations
const testData = {
    user: {
        name: 'John',
        profile: {
            email: 'john@example.com',
            preferences: null
        }
    },
    items: [1, 2, 3],
    getValue: function() { return 'test'; }
};

console.log('Safe Operations Tests:');
console.log(SafeOperations.safeGet(testData, 'user.name'));                    // "John"
console.log(SafeOperations.safeGet(testData, 'user.profile.preferences'));     // null
console.log(SafeOperations.safeGet(testData, 'user.nonexistent', 'default')); // "default"
console.log(SafeOperations.safeGet(null, 'any.path', 'default'));            // "default"

console.log(SafeOperations.safeCall(testData, 'getValue'));                   // "test"
console.log(SafeOperations.safeCall(null, 'getValue'));                       // null

console.log(SafeOperations.safeMap(testData.items, x => x * 2));              // [2, 4, 6]
console.log(SafeOperations.safeMap(null, x => x * 2));                        // []
```

### Error boundary patterns

```javascript
// Error boundary for null/undefined handling
class ErrorBoundary {
    static try(fn, fallback = null, context = 'unknown') {
        try {
            const result = fn();
            return result ?? fallback;
        } catch (error) {
            console.warn(`Error in ${context}:`, error);
            return fallback;
        }
    }
    
    static tryAsync(asyncFn, fallback = null, context = 'unknown') {
        return asyncFn()
            .then(result => result ?? fallback)
            .catch(error => {
                console.warn(`Async error in ${context}:`, error);
                return fallback;
            });
    }
    
    static chain(...functions) {
        for (const fn of functions) {
            try {
                const result = fn();
                if (result != null) return result;
            } catch (error) {
                console.warn('Function in chain failed:', error);
            }
        }
        return null;
    }
    
    static guard(value, validator, fallback = null) {
        if (value == null) return fallback;
        
        try {
            return validator(value) ? value : fallback;
        } catch (error) {
            console.warn('Validator error:', error);
            return fallback;
        }
    }
}

// Usage examples
const riskyOperation = () => {
    const data = Math.random() > 0.5 ? { value: 42 } : null;
    return data.value; // Might throw
};

const safeResult = ErrorBoundary.try(
    riskyOperation,
    'default',
    'riskyOperation'
);

console.log('Safe result:', safeResult);

// Chain fallbacks
const getValue = () => {
    return ErrorBoundary.chain(
        () => localStorage.getItem('cached') && JSON.parse(localStorage.getItem('cached')),
        () => sessionStorage.getItem('temp'),
        () => 'hardcoded-fallback'
    );
};

// Guard with validation
const userAge = ErrorBoundary.guard(
    user?.age,
    age => typeof age === 'number' && age >= 0 && age <= 150,
    18 // Default age
);
```

## 5. Tóm Tắt

### Null vs Undefined summary:

| Aspect | null | undefined |
|--------|------|-----------|
| **Meaning** | Intentional absence | Uninitialized/missing |
| **Type** | `"object"` (quirk) | `"undefined"` |
| **Usage** | Explicit empty value | Default for missing |
| **API Response** | Common | Less common |
| **Assignment** | `let x = null` | `let x` (implicit) |

### Best practices:

1. **🎯 Use null for intentional empty values**
   ```javascript
   // ✅ Explicit intent
   let selectedFile = null;  // No file selected
   let lastError = null;     // No error occurred
   
   // ❌ Confusing
   let selectedFile = undefined;
   ```

2. **🔍 Check for both with nullish operator**
   ```javascript
   // ✅ Modern approach
   const name = user.name ?? 'Anonymous';
   
   // ✅ Explicit check
   if (user.name != null) { /* handle */ }
   
   // ❌ Loose check catches other falsy values
   if (user.name) { /* might miss "" or 0 */ }
   ```

3. **🛡️ Use optional chaining for safe access**
   ```javascript
   // ✅ Safe property access
   const email = user?.profile?.email;
   
   // ✅ Safe method calls
   const result = api?.getData?.();
   ```

4. **⚡ Handle gracefully in functions**
   ```javascript
   // ✅ Clear handling
   function processUser(user) {
       if (user == null) {
           throw new Error('User is required');
       }
       // Process user
   }
   ```

5. **🧹 Consistent API design**
   ```javascript
   // ✅ Consistent nulls in API responses
   const apiResponse = {
       user: {
           id: 123,
           avatar: null,        // No avatar
           lastLogin: null      // Never logged in
       }
   };
   ```

## 8. Ứng Dụng Thực Tế Nâng Cao

Phần này sẽ khám phá các ứng dụng thực tế của null và undefined trong production applications. Từ xử lý API responses đến tạo ra defensive programming patterns.

### API Response Handling

```javascript
class APIResponseHandler {
    constructor(options = {}) {
        this.defaultTimeout = options.timeout || 10000;
        this.retryCount = options.retryCount || 3;
        this.retryDelay = options.retryDelay || 1000;
    }
    
    // Safe API call với comprehensive error handling
    async safeCall(url, options = {}) {
        const {
            method = 'GET',
            body = null,
            headers = {},
            timeout = this.defaultTimeout,
            retries = this.retryCount
        } = options;
        
        let lastError;
        
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await this.makeRequest(url, {
                    method,
                    body,
                    headers,
                    timeout
                });
                
                return this.processResponse(response);
                
            } catch (error) {
                lastError = error;
                
                if (attempt < retries) {
                    console.warn(`API call attempt ${attempt + 1} failed, retrying...`);
                    await this.delay(this.retryDelay * (attempt + 1));
                } else {
                    console.error(`API call failed after ${retries + 1} attempts:`, error);
                }
            }
        }
        
        // Return safe error response
        return {
            success: false,
            data: null,
            error: lastError?.message || 'Unknown error',
            meta: {
                attempts: retries + 1,
                lastError
            }
        };
    }
    
    async makeRequest(url, options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body ? JSON.stringify(options.body) : null
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
            
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    async processResponse(response) {
        try {
            const contentType = response.headers.get('content-type');
            let data = null;
            
            if (contentType && contentType.includes('application/json')) {
                const text = await response.text();
                data = text ? JSON.parse(text) : null;
            } else {
                data = await response.text();
            }
            
            return {
                success: true,
                data: this.sanitizeData(data),
                meta: {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                }
            };
            
        } catch (error) {
            return {
                success: false,
                data: null,
                error: 'Failed to parse response',
                meta: { parseError: error.message }
            };
        }
    }
    
    // Sanitize API data để handle null/undefined consistently
    sanitizeData(data) {
        if (data === null || data === undefined) {
            return null;
        }
        
        if (Array.isArray(data)) {
            return data.map(item => this.sanitizeData(item));
        }
        
        if (typeof data === 'object') {
            const sanitized = {};
            for (const [key, value] of Object.entries(data)) {
                sanitized[key] = this.sanitizeData(value);
            }
            return sanitized;
        }
        
        return data;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Specific API method helpers
    async getUser(userId) {
        const response = await this.safeCall(`/api/users/${userId}`);
        
        if (!response.success) {
            return {
                user: null,
                error: response.error
            };
        }
        
        const userData = response.data;
        
        // Normalize user data với defaults
        return {
            user: {
                id: userData?.id ?? null,
                name: userData?.name ?? 'Unknown User',
                email: userData?.email ?? null,
                avatar: userData?.avatar ?? null,
                profile: {
                    bio: userData?.profile?.bio ?? null,
                    location: userData?.profile?.location ?? null,
                    website: userData?.profile?.website ?? null
                },
                preferences: {
                    theme: userData?.preferences?.theme ?? 'light',
                    language: userData?.preferences?.language ?? 'en',
                    notifications: userData?.preferences?.notifications ?? true
                },
                createdAt: userData?.createdAt ? new Date(userData.createdAt) : null,
                lastLoginAt: userData?.lastLoginAt ? new Date(userData.lastLoginAt) : null
            },
            error: null
        };
    }
}

// Usage example
const apiHandler = new APIResponseHandler({
    timeout: 15000,
    retryCount: 2
});

async function loadUserProfile(userId) {
    if (!userId) {
        console.error('User ID is required');
        return;
    }
    
    console.log('Loading user profile...');
    
    const result = await apiHandler.getUser(userId);
    
    if (result.error) {
        console.error('Failed to load user:', result.error);
        return;
    }
    
    const { user } = result;
    
    console.log('User loaded:', {
        name: user.name,
        email: user.email ?? 'No email provided',
        hasAvatar: user.avatar !== null,
        memberSince: user.createdAt ? user.createdAt.getFullYear() : 'Unknown'
    });
    
    return user;
}
```

### Advanced Optional Chaining Patterns

```javascript
class SafeAccessor {
    // Safe deep property access with path array
    static getPath(obj, path, defaultValue = null) {
        if (obj == null) return defaultValue;
        
        let current = obj;
        for (const key of path) {
            if (current == null || !(key in current)) {
                return defaultValue;
            }
            current = current[key];
        }
        
        return current ?? defaultValue;
    }
    
    // Safe method execution
    static callMethod(obj, methodPath, args = [], defaultValue = null) {
        const method = this.getPath(obj, methodPath);
        
        if (typeof method !== 'function') {
            return defaultValue;
        }
        
        try {
            return method.apply(obj, args);
        } catch (error) {
            console.warn('Method call failed:', error);
            return defaultValue;
        }
    }
    
    // Safe array access with bounds checking
    static getArrayItem(array, index, defaultValue = null) {
        if (!Array.isArray(array) || index < 0 || index >= array.length) {
            return defaultValue;
        }
        return array[index] ?? defaultValue;
    }
    
    // Multiple fallback paths
    static getFirstAvailable(obj, ...paths) {
        for (const path of paths) {
            const value = this.getPath(obj, path);
            if (value != null) return value;
        }
        return null;
    }
}

// User profile component với safe access
class UserProfileComponent {
    constructor(userData) {
        this.user = userData;
    }
    
    getDisplayName() {
        return SafeAccessor.getFirstAvailable(
            this.user,
            ['profile', 'displayName'],
            ['profile', 'fullName'],
            ['firstName'],
            ['name'],
            ['username'],
            ['email']
        ) ?? 'Anonymous User';
    }
    
    getAvatar() {
        // Try multiple avatar sources
        const avatarUrl = SafeAccessor.getFirstAvailable(
            this.user,
            ['profile', 'avatar', 'url'],
            ['profile', 'profilePicture'],
            ['avatar'],
            ['picture']
        );
        
        // Fallback to generated avatar
        if (!avatarUrl) {
            const name = this.getDisplayName();
            return this.generateAvatar(name);
        }
        
        return avatarUrl;
    }
    
    getContactInfo() {
        const profile = this.user?.profile ?? {};
        
        return {
            email: SafeAccessor.getPath(this.user, ['email']) || 
                   SafeAccessor.getPath(this.user, ['profile', 'email']),
            phone: SafeAccessor.getPath(profile, ['phone']) || 
                   SafeAccessor.getPath(profile, ['mobile']),
            website: SafeAccessor.getPath(profile, ['website']) || 
                     SafeAccessor.getPath(profile, ['blog']),
            social: {
                twitter: profile.social?.twitter ?? null,
                linkedin: profile.social?.linkedin ?? null,
                github: profile.social?.github ?? null
            }
        };
    }
    
    generateAvatar(name) {
        const initials = name
            .split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
        
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&format=svg`;
    }
}
```

### Configuration Management với Nullish Coalescing

```javascript
class ConfigurationManager {
    constructor(sources = {}) {
        this.sources = {
            environment: sources.environment || process?.env || {},
            localStorage: sources.localStorage || (typeof localStorage !== 'undefined' ? localStorage : {}),
            defaults: sources.defaults || {},
            runtime: sources.runtime || {}
        };
    }
    
    // Get configuration với fallback chain
    get(key, defaultValue = null) {
        // Priority: runtime > localStorage > environment > defaults > provided default
        return this.sources.runtime[key] ??
               this.getFromLocalStorage(key) ??
               this.sources.environment[key] ??
               this.sources.defaults[key] ??
               defaultValue;
    }
    
    getFromLocalStorage(key) {
        try {
            const value = this.sources.localStorage.getItem?.(key);
            if (value === null || value === undefined) return null;
            
            // Try to parse JSON values
            try {
                return JSON.parse(value);
            } catch {
                return value; // Return as string if not JSON
            }
        } catch {
            return null;
        }
    }
    
    // Get với type coercion
    getString(key, defaultValue = '') {
        const value = this.get(key, defaultValue);
        return value != null ? String(value) : defaultValue;
    }
    
    getNumber(key, defaultValue = 0) {
        const value = this.get(key, defaultValue);
        if (value == null) return defaultValue;
        
        const num = Number(value);
        return !isNaN(num) ? num : defaultValue;
    }
    
    getBoolean(key, defaultValue = false) {
        const value = this.get(key, defaultValue);
        if (value == null) return defaultValue;
        
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
            const lower = value.toLowerCase();
            return ['true', '1', 'yes', 'on'].includes(lower);
        }
        
        return Boolean(value);
    }
    
    // Multi-key fallback
    getFirstAvailable(...keys) {
        for (const key of keys) {
            const value = this.get(key);
            if (value != null) return value;
        }
        return null;
    }
    
    // Nested configuration with dot notation
    getNested(path, defaultValue = null) {
        const keys = path.split('.');
        let current = null;
        
        // Try to get from each source
        for (const source of Object.values(this.sources)) {
            current = source;
            for (const key of keys) {
                if (current == null || typeof current !== 'object') {
                    current = null;
                    break;
                }
                current = current[key];
            }
            if (current != null) break;
        }
        
        return current ?? defaultValue;
    }
}

// Usage example
const appConfig = new ConfigurationManager({
    environment: {
        NODE_ENV: 'development',
        API_URL: 'https://api.example.com',
        DEBUG: 'true'
    },
    defaults: {
        theme: 'light',
        language: 'en',
        timeout: 5000,
        features: {
            analytics: false,
            beta: false
        }
    }
});

// Get values với fallbacks
console.log('API URL:', appConfig.getString('API_URL', 'http://localhost:3000'));
console.log('Debug mode:', appConfig.getBoolean('DEBUG'));
console.log('Analytics enabled:', appConfig.getNested('features.analytics', false));
```

### Defensive Programming Framework

```javascript
class RobustErrorHandler {
    constructor(options = {}) {
        this.logErrors = options.logErrors ?? true;
        this.throwOnCritical = options.throwOnCritical ?? true;
        this.maxRetries = options.maxRetries ?? 3;
    }
    
    // Wrap functions với error handling
    wrap(fn, options = {}) {
        const {
            fallback = null,
            retries = 0,
            context = 'unknown',
            critical = false
        } = options;
        
        return async (...args) => {
            let lastError;
            
            for (let attempt = 0; attempt <= retries; attempt++) {
                try {
                    const result = await fn(...args);
                    return result ?? fallback;
                    
                } catch (error) {
                    lastError = error;
                    
                    if (this.logErrors) {
                        console.warn(`Error in ${context} (attempt ${attempt + 1}):`, error);
                    }
                    
                    if (attempt < retries) {
                        await this.delay(1000 * (attempt + 1));
                    }
                }
            }
            
            // All attempts failed
            if (critical && this.throwOnCritical) {
                throw new Error(`Critical operation failed in ${context}: ${lastError.message}`);
            }
            
            return fallback;
        };
    }
    
    // Safe property access chain
    safeChain(obj, ...operations) {
        let current = obj;
        
        try {
            for (const operation of operations) {
                if (current == null) return null;
                
                if (typeof operation === 'string') {
                    // Property access
                    current = current[operation];
                } else if (typeof operation === 'function') {
                    // Method call or transformer
                    current = operation(current);
                } else if (Array.isArray(operation)) {
                    // Method call với arguments
                    const [method, ...args] = operation;
                    if (typeof current[method] === 'function') {
                        current = current[method](...args);
                    } else {
                        return null;
                    }
                }
            }
            
            return current;
            
        } catch (error) {
            if (this.logErrors) {
                console.warn('Safe chain error:', error);
            }
            return null;
        }
    }
    
    // Graceful degradation
    withFallback(primaryFn, fallbackFn, options = {}) {
        const { timeout = 10000, context = 'operation' } = options;
        
        return async (...args) => {
            try {
                // Try primary function với timeout
                const result = await Promise.race([
                    primaryFn(...args),
                    this.timeoutPromise(timeout)
                ]);
                
                return result ?? (await fallbackFn(...args));
                
            } catch (error) {
                if (this.logErrors) {
                    console.warn(`Primary ${context} failed, using fallback:`, error);
                }
                
                try {
                    return await fallbackFn(...args);
                } catch (fallbackError) {
                    if (this.logErrors) {
                        console.error(`Fallback ${context} also failed:`, fallbackError);
                    }
                    throw fallbackError;
                }
            }
        };
    }
    
    timeoutPromise(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms);
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Usage examples
const errorHandler = new RobustErrorHandler({
    logErrors: true,
    maxRetries: 2
});

// Wrap risky API calls
const safeApiCall = errorHandler.wrap(
    async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },
    {
        fallback: { error: 'API unavailable' },
        retries: 2,
        context: 'API call'
    }
);

// Safe property access
function getUserInfo(user) {
    return {
        name: errorHandler.safeChain(user, 'profile', 'name') ?? 'Unknown',
        email: errorHandler.safeChain(user, 'contact', 'email') ?? null,
        avatar: errorHandler.safeChain(
            user, 
            'profile', 
            'avatar', 
            ['resize', 100, 100]
        ) ?? '/default-avatar.png'
    };
}
```

## 9. Tóm Tắt Toàn Diện

### Null/Undefined Comparison Table:

| Aspect | null | undefined |
|--------|------|-----------|
| **Type** | object | undefined |
| **Meaning** | Intentional absence | Uninitialized/missing |
| **Assignment** | Explicit | Automatic |
| **JSON** | Serializes to null | Omitted from JSON |
| **Equality** | null == undefined ✅ | null === undefined ❌ |

### Modern JavaScript Features:

| Feature | Syntax | Use Case |
|---------|--------|----------|
| **Optional Chaining** | `obj?.prop` | Safe property access |
| **Nullish Coalescing** | `value ?? fallback` | Default values |
| **Logical Assignment** | `x ??= y` | Conditional assignment |

### Best Practices Summary:

1. **🎯 Use null for intentional empty values**
   ```javascript
   // ✅ Clear intention
   const user = { avatar: null, lastLogin: null };
   ```

2. **🔍 Use strict comparison for precise checking**
   ```javascript
   // ✅ Precise checking
   if (user.name != null) { /* handle */ }
   ```

3. **🛡️ Use optional chaining for safe access**
   ```javascript
   // ✅ Safe deep access
   const email = user?.profile?.contact?.email;
   ```

4. **⚡ Use nullish coalescing for defaults**
   ```javascript
   // ✅ Preserve falsy values
   const theme = userPrefs?.theme ?? 'light';
   ```

5. **🧹 Implement defensive programming**
   ```javascript
   // ✅ Comprehensive error handling
   const safeProcessData = errorHandler.wrap(processData, {
       fallback: null,
       retries: 2
   });
   ```

Null và undefined handling đúng cách là foundation của robust JavaScript applications. Master các patterns này - từ basic concepts đến advanced applications - sẽ giúp bạn tạo ra code resilient, maintainable và user-friendly! 🎉

---

**🎊 Chúc mừng!** Bạn đã hoàn thành series **JavaScript Cơ Bản** về các kiểu dữ liệu! Từ Number, String, Boolean đến Symbol và null/undefined - bạn đã có foundation vững chắc để build amazing JavaScript applications! 🚀
