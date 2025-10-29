---
slug: javascript-co-ban-bai-17
url: /posts/javascript-co-ban-bai-17/
title: "JavaScript Cơ Bản - Bài 17: Boolean - Giá Trị Logic Và Conditional Logic"
date: 2025-10-20T21:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về kiểu dữ liệu Boolean trong JavaScript, truthy/falsy values, logical operators và conditional statements"
---

# JavaScript Cơ Bản - Bài 17: Boolean - Giá Trị Logic Và Conditional Logic

Boolean là kiểu dữ liệu đơn giản nhất trong JavaScript với chỉ hai giá trị: `true` và `false`. Nhưng đừng để sự đơn giản này đánh lừa bạn - Boolean là nền tảng của mọi logic programming và decision making trong code.

## Video Hướng Dẫn

{{< youtube 2Uvl-lJ9fBY >}}

## 1. Boolean Cơ Bản

### Khái niệm và khai báo

```javascript
// Literal boolean values
let isActive = true;
let isComplete = false;

console.log(typeof isActive);   // "boolean"
console.log(typeof isComplete); // "boolean"

// Boolean constructor (không khuyến nghị dùng với new)
let boolFromConstructor = Boolean(1);  // true
console.log(typeof boolFromConstructor); // "boolean"

// Tránh dùng new Boolean() - tạo ra object, không phải primitive
let boolObject = new Boolean(false);
console.log(typeof boolObject);     // "object" (!)
console.log(boolObject);           // Boolean {false}
console.log(Boolean(boolObject));  // true (!)

// So sánh primitive vs object
console.log(false === false);        // true
console.log(false === boolObject);   // false (khác type)
console.log(false == boolObject);    // true (type coercion)
```

### Boolean trong các context khác nhau

```javascript
// Boolean trong conditional statements
if (true) {
    console.log("This runs");
}

if (false) {
    console.log("This never runs");
}

// Boolean trong logical operations
let result1 = true && false;   // false
let result2 = true || false;   // true
let result3 = !true;          // false

// Boolean từ comparisons
let isEqual = 5 === 5;        // true
let isGreater = 10 > 5;       // true
let isLess = 3 < 1;          // false

console.log(isEqual, isGreater, isLess);

// Boolean trong ternary operator
let status = true ? "active" : "inactive";  // "active"
let message = false ? "Yes" : "No";         // "No"

console.log(status, message);
```

## 2. Truthy và Falsy Values

### Falsy values - 8 giá trị falsy trong JS

```javascript
// 8 falsy values trong JavaScript:
const falsyValues = [
    false,        // Boolean false
    0,           // Number zero
    -0,          // Negative zero
    0n,          // BigInt zero
    "",          // Empty string
    null,        // null
    undefined,   // undefined
    NaN          // Not a Number
];

// Test tất cả falsy values
falsyValues.forEach((value, index) => {
    console.log(`${index + 1}. ${value} is falsy:`, !value);
});

// Practical examples
function checkFalsy(value) {
    if (!value) {
        console.log(`${value} is falsy`);
    } else {
        console.log(`${value} is truthy`);
    }
}

checkFalsy(false);     // falsy
checkFalsy(0);         // falsy
checkFalsy("");        // falsy
checkFalsy(null);      // falsy
checkFalsy(undefined); // falsy
checkFalsy(NaN);       // falsy

// Edge cases with numbers
checkFalsy(-0);        // falsy (negative zero)
checkFalsy(0n);        // falsy (BigInt zero)
checkFalsy(-1);        // truthy (negative non-zero)
checkFalsy(0.1);       // truthy (decimal)
```

### Truthy values - Mọi thứ khác

```javascript
// Tất cả giá trị khác đều là truthy
const truthyExamples = [
    1,              // Positive number
    -1,             // Negative number
    "hello",        // Non-empty string
    "0",            // String "0" (not number 0)
    "false",        // String "false" (not boolean false)
    [],             // Empty array
    {},             // Empty object
    function() {},  // Function
    new Date(),     // Date object
    /regex/,        // Regex
    Symbol(),       // Symbol
    Infinity,       // Infinity
    -Infinity       // Negative Infinity
];

truthyExamples.forEach(value => {
    console.log(`${value} is truthy:`, Boolean(value));
});

// Surprising truthy values
console.log(Boolean([]));           // true (empty array)
console.log(Boolean({}));           // true (empty object)
console.log(Boolean("0"));          // true (string "0")
console.log(Boolean("false"));      // true (string "false")
console.log(Boolean(new Boolean(false))); // true (Boolean object)

// Practical utility function
function isTruthy(value) {
    return Boolean(value);
}

function isFalsy(value) {
    return !value;
}

// Type-aware checking
function isActuallyTrue(value) {
    return value === true;
}

function isActuallyFalse(value) {
    return value === false;
}

console.log('Tests:');
console.log('isTruthy("0"):', isTruthy("0"));           // true
console.log('isActuallyTrue("0"):', isActuallyTrue("0")); // false
console.log('isFalsy(""):', isFalsy(""));               // true
console.log('isActuallyFalse(""):', isActuallyFalse("")); // false
```

### Type conversion to Boolean

```javascript
// Explicit conversion với Boolean()
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean("hello"));  // true
console.log(Boolean(""));       // false

// Double negation (!!) - common trick
console.log(!!1);        // true
console.log(!!0);        // false
console.log(!!"hello");  // true
console.log(!!"");       // false

// Comparison với type coercion
console.log(1 == true);     // true (1 becomes true)
console.log(0 == false);    // true (0 becomes false)
console.log("1" == true);   // true (both become 1)
console.log("" == false);   // true (both become 0)

// Strict comparison không có type coercion
console.log(1 === true);    // false (different types)
console.log(0 === false);   // false (different types)

// Utility functions cho type conversion
class BooleanConverter {
    static toBoolean(value) {
        return Boolean(value);
    }
    
    static toBooleanStrict(value) {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true';
        }
        if (typeof value === 'number') {
            return value === 1;
        }
        return false;
    }
    
    static toBooleanSmart(value) {
        // Handle common string representations
        if (typeof value === 'string') {
            const lower = value.toLowerCase().trim();
            if (['true', '1', 'yes', 'y', 'on'].includes(lower)) return true;
            if (['false', '0', 'no', 'n', 'off', ''].includes(lower)) return false;
        }
        
        // Handle numbers
        if (typeof value === 'number') {
            return value !== 0 && !isNaN(value);
        }
        
        // Default Boolean conversion
        return Boolean(value);
    }
    
    static describe(value) {
        return {
            value,
            type: typeof value,
            boolean: Boolean(value),
            strict: this.toBooleanStrict(value),
            smart: this.toBooleanSmart(value),
            isTruthy: !!value,
            isFalsy: !value
        };
    }
}

// Test converter
console.log(BooleanConverter.describe("true"));
console.log(BooleanConverter.describe("false"));
console.log(BooleanConverter.describe("1"));
console.log(BooleanConverter.describe("0"));
console.log(BooleanConverter.describe([]));
```

## 3. Logical Operators

### AND operator (&&)

```javascript
// Basic AND logic
console.log(true && true);    // true
console.log(true && false);   // false
console.log(false && true);   // false
console.log(false && false);  // false

// Short-circuit evaluation
console.log("Evaluation examples:");
console.log(false && console.log("This won't run")); // false (second part not evaluated)
console.log(true && console.log("This will run"));   // undefined (both parts evaluated)

// Practical short-circuiting
function expensiveOperation() {
    console.log("Running expensive operation...");
    return "result";
}

let shouldRun = false;
let result = shouldRun && expensiveOperation(); // expensiveOperation not called
console.log(result); // false

shouldRun = true;
result = shouldRun && expensiveOperation(); // expensiveOperation is called
console.log(result); // "result"

// Chaining multiple conditions
let user = { name: "John", age: 25, isActive: true };

if (user && user.name && user.age > 18 && user.isActive) {
    console.log("User is valid adult");
}

// Conditional assignment
let defaultName = user && user.name && user.name.trim();
console.log(defaultName);

// Practical examples
function processUser(user) {
    // Guard clauses với &&
    user && 
    user.email && 
    user.email.includes('@') && 
    console.log(`Processing user: ${user.email}`);
    
    // Safe property access
    let fullName = user && user.profile && user.profile.fullName;
    
    // Conditional execution
    user && user.isAdmin && performAdminAction();
    
    return user && user.isActive;
}

function performAdminAction() {
    console.log("Admin action performed");
}

// Test
processUser({ email: "test@example.com", profile: { fullName: "John Doe" }, isActive: true, isAdmin: true });
```

### OR operator (||)

```javascript
// Basic OR logic
console.log(true || true);    // true
console.log(true || false);   // true
console.log(false || true);   // true
console.log(false || false);  // false

// Short-circuit evaluation với ||
console.log(true || console.log("This won't run")); // true (second part not evaluated)
console.log(false || console.log("This will run")); // undefined (both parts evaluated)

// Default values với ||
function greet(name) {
    name = name || "Guest";  // Default value if name is falsy
    return `Hello, ${name}!`;
}

console.log(greet("John"));    // "Hello, John!"
console.log(greet(""));        // "Hello, Guest!"
console.log(greet(null));      // "Hello, Guest!"
console.log(greet(undefined)); // "Hello, Guest!"

// Multiple fallbacks
function getConfig() {
    let config = 
        localStorage.getItem('config') ||
        sessionStorage.getItem('config') ||
        getDefaultConfig() ||
        {};
    
    return config;
}

function getDefaultConfig() {
    return { theme: 'light', lang: 'en' };
}

// Chaining với ||
let displayName = 
    user.displayName ||
    user.fullName ||
    user.firstName + " " + user.lastName ||
    user.email ||
    "Unknown User";

// Function parameter defaults (pre-ES6 style)
function calculateArea(width, height) {
    width = width || 0;
    height = height || 0;
    return width * height;
}

console.log(calculateArea(5, 3)); // 15
console.log(calculateArea(5));    // 0 (height defaults to 0)
console.log(calculateArea());     // 0 (both default to 0)

// Modern ES6+ alternative
function calculateAreaES6(width = 0, height = 0) {
    return width * height;
}

// Practical utility
class DefaultValueProvider {
    static getValue(value, defaultValue) {
        return value || defaultValue;
    }
    
    static getStringValue(value, defaultValue = "") {
        return (typeof value === 'string' && value.trim()) || defaultValue;
    }
    
    static getNumberValue(value, defaultValue = 0) {
        const num = Number(value);
        return (!isNaN(num) && num) || defaultValue;
    }
    
    static getArrayValue(value, defaultValue = []) {
        return (Array.isArray(value) && value.length > 0 && value) || defaultValue;
    }
    
    static getObjectValue(value, defaultValue = {}) {
        return (typeof value === 'object' && value !== null && Object.keys(value).length > 0 && value) || defaultValue;
    }
}

// Test default value provider
console.log(DefaultValueProvider.getValue(null, "default"));        // "default"
console.log(DefaultValueProvider.getStringValue("  ", "fallback")); // "fallback"
console.log(DefaultValueProvider.getNumberValue("abc", 42));        // 42
console.log(DefaultValueProvider.getArrayValue([], [1, 2, 3]));     // [1, 2, 3]
```

### NOT operator (!)

```javascript
// Basic NOT logic
console.log(!true);   // false
console.log(!false);  // true

// Double NOT (!!) for boolean conversion
console.log(!!1);        // true
console.log(!!0);        // false
console.log(!!"hello");  // true
console.log(!!"");       // false

// NOT with falsy values
console.log(!null);      // true
console.log(!undefined); // true
console.log(!NaN);       // true
console.log(![]);        // false (array is truthy)
console.log(![].length); // true (0 length is falsy)

// Practical uses của NOT
function isEmpty(value) {
    return !value;
}

function isNotEmpty(value) {
    return !!value;
}

function isEmptyArray(arr) {
    return Array.isArray(arr) && !arr.length;
}

function isNotEmptyArray(arr) {
    return Array.isArray(arr) && !!arr.length;
}

function isEmptyObject(obj) {
    return typeof obj === 'object' && obj !== null && !Object.keys(obj).length;
}

// Toggle functions
function toggleBoolean(value) {
    return !value;
}

function toggleState(currentState) {
    return {
        isActive: !currentState.isActive,
        isVisible: !currentState.isVisible,
        isEnabled: !currentState.isEnabled
    };
}

// Validation functions
function isInvalid(value) {
    return !value || 
           (typeof value === 'string' && !value.trim()) ||
           (Array.isArray(value) && !value.length) ||
           (typeof value === 'object' && !Object.keys(value).length);
}

function isValid(value) {
    return !isInvalid(value);
}

// Test functions
console.log("isEmpty tests:");
console.log(isEmpty(""));        // true
console.log(isEmpty("hello"));   // false
console.log(isEmpty(0));         // true
console.log(isEmpty(1));         // false

console.log("isEmptyArray tests:");
console.log(isEmptyArray([]));     // true
console.log(isEmptyArray([1]));    // false
console.log(isEmptyArray(""));     // false

console.log("Toggle tests:");
console.log(toggleBoolean(true));  // false
console.log(toggleState({ isActive: true, isVisible: false, isEnabled: true }));
```

### Nullish Coalescing Operator (??) - ES2020

```javascript
// Nullish coalescing (??) vs OR (||)
let value1 = null;
let value2 = undefined;
let value3 = 0;
let value4 = "";
let value5 = false;

console.log("OR (||) operator:");
console.log(value1 || "default");  // "default"
console.log(value2 || "default");  // "default"
console.log(value3 || "default");  // "default" (0 is falsy)
console.log(value4 || "default");  // "default" ("" is falsy)
console.log(value5 || "default");  // "default" (false is falsy)

console.log("Nullish coalescing (??) operator:");
console.log(value1 ?? "default");  // "default"
console.log(value2 ?? "default");  // "default"
console.log(value3 ?? "default");  // 0 (not null/undefined)
console.log(value4 ?? "default");  // "" (not null/undefined)
console.log(value5 ?? "default");  // false (not null/undefined)

// Practical use cases
function processConfig(config) {
    return {
        // OR: replaces all falsy values
        theme: config.theme || 'light',
        debug: config.debug || false,
        timeout: config.timeout || 5000,
        
        // Nullish coalescing: only replaces null/undefined
        maxRetries: config.maxRetries ?? 3,      // 0 retries is valid
        showWarnings: config.showWarnings ?? true, // false is valid setting
        port: config.port ?? 8080                 // port 0 might be valid
    };
}

// Test với các config khác nhau
console.log(processConfig({}));
console.log(processConfig({ 
    theme: '', 
    debug: false, 
    timeout: 0,
    maxRetries: 0,
    showWarnings: false,
    port: 0
}));

// Chaining nullish coalescing
function getUserName(user) {
    return user?.firstName ?? user?.username ?? user?.email ?? 'Anonymous';
}

// Optional chaining với nullish coalescing
function getNestedValue(obj) {
    return obj?.config?.settings?.value ?? 'default';
}

// Utility function
class NullishHandler {
    static coalesce(...values) {
        for (const value of values) {
            if (value !== null && value !== undefined) {
                return value;
            }
        }
        return undefined;
    }
    
    static coalesceWithValidator(validator, ...values) {
        for (const value of values) {
            if (value !== null && value !== undefined && validator(value)) {
                return value;
            }
        }
        return undefined;
    }
}

// Test utility
console.log(NullishHandler.coalesce(null, undefined, 0, "hello")); // 0
console.log(NullishHandler.coalesceWithValidator(
    x => typeof x === 'string' && x.length > 0,
    null, undefined, "", "hello"
)); // "hello"
```

## 4. Comparison Operators và Equality

### Equality operators

```javascript
// Loose equality (==) với type coercion
console.log("Loose equality (==):");
console.log(1 == "1");        // true
console.log(true == 1);       // true
console.log(false == 0);      // true
console.log(null == undefined); // true
console.log(0 == false);      // true
console.log("" == false);     // true

// Strict equality (===) không có type coercion
console.log("Strict equality (===):");
console.log(1 === "1");       // false
console.log(true === 1);      // false
console.log(false === 0);     // false
console.log(null === undefined); // false
console.log(0 === false);     // false
console.log("" === false);    // false

// Inequality operators
console.log("Inequality:");
console.log(1 != "2");        // true
console.log(1 !== "1");       // true
console.log("hello" != "world"); // true

// Comparison với type coercion
console.log("Comparisons:");
console.log("2" > 1);         // true (string "2" becomes number 2)
console.log("2" > "10");      // true (string comparison: "2" > "1")
console.log(2 > "10");        // false (both become numbers: 2 > 10)
console.log(null > 0);        // false (null becomes 0)
console.log(null >= 0);       // true (null becomes 0)
console.log(null == 0);       // false (special rule for null == 0)

// Safer comparison utility
class SafeComparison {
    static strictEquals(a, b) {
        return a === b;
    }
    
    static deepEquals(a, b) {
        if (a === b) return true;
        
        if (a == null || b == null) return false;
        
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            return a.every((item, index) => this.deepEquals(item, b[index]));
        }
        
        if (typeof a === 'object' && typeof b === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            
            if (keysA.length !== keysB.length) return false;
            
            return keysA.every(key => this.deepEquals(a[key], b[key]));
        }
        
        return false;
    }
    
    static safeCompare(a, b, operator = '===') {
        try {
            switch (operator) {
                case '===': return a === b;
                case '==': return a == b;
                case '>': return a > b;
                case '<': return a < b;
                case '>=': return a >= b;
                case '<=': return a <= b;
                case '!=': return a != b;
                case '!==': return a !== b;
                default: return false;
            }
        } catch (error) {
            console.warn('Comparison error:', error);
            return false;
        }
    }
}

// Test comparisons
console.log(SafeComparison.deepEquals([1, 2, 3], [1, 2, 3])); // true
console.log(SafeComparison.deepEquals({a: 1}, {a: 1}));        // true
console.log(SafeComparison.safeCompare("10", 10, '=='));       // true
console.log(SafeComparison.safeCompare("10", 10, '==='));      // false
```

### Object.is() method

```javascript
// Object.is() - more precise than === for some edge cases
console.log("Object.is() examples:");
console.log(Object.is(NaN, NaN));        // true (=== gives false)
console.log(Object.is(+0, -0));          // false (=== gives true)
console.log(Object.is(null, null));      // true
console.log(Object.is(undefined, undefined)); // true

console.log("Compare với ===:");
console.log(NaN === NaN);                // false
console.log(+0 === -0);                  // true

// Utility wrapper
function isPreciselyEqual(a, b) {
    return Object.is(a, b);
}

function isApproximatelyEqual(a, b, epsilon = Number.EPSILON) {
    if (Object.is(a, b)) return true;
    
    if (typeof a === 'number' && typeof b === 'number') {
        return Math.abs(a - b) < epsilon;
    }
    
    return false;
}

// Test precise equality
console.log(isPreciselyEqual(0.1 + 0.2, 0.3));              // false
console.log(isApproximatelyEqual(0.1 + 0.2, 0.3));          // true
console.log(isApproximatelyEqual(NaN, NaN));                 // true
```

## 5. Conditional Statements

### If statements

```javascript
// Basic if statements
let score = 85;

if (score >= 90) {
    console.log("Grade A");
} else if (score >= 80) {
    console.log("Grade B");
} else if (score >= 70) {
    console.log("Grade C");
} else if (score >= 60) {
    console.log("Grade D");
} else {
    console.log("Grade F");
}

// Multiple conditions
let user = { 
    age: 25, 
    isActive: true, 
    role: 'admin',
    permissions: ['read', 'write', 'delete']
};

if (user.age >= 18 && user.isActive && user.role === 'admin') {
    console.log("User has admin access");
}

if (user.permissions.includes('write') || user.permissions.includes('delete')) {
    console.log("User can modify content");
}

// Guard clauses pattern
function processPayment(amount, account) {
    // Early returns với guard clauses
    if (!amount) {
        throw new Error("Amount is required");
    }
    
    if (amount <= 0) {
        throw new Error("Amount must be positive");
    }
    
    if (!account) {
        throw new Error("Account is required");
    }
    
    if (account.balance < amount) {
        throw new Error("Insufficient funds");
    }
    
    if (!account.isActive) {
        throw new Error("Account is inactive");
    }
    
    // Main logic only if all conditions pass
    account.balance -= amount;
    return { success: true, newBalance: account.balance };
}

// Complex condition với helper functions
function canAccessFeature(user, feature) {
    const isAuthenticated = user && user.isLoggedIn;
    const hasPermission = user && user.permissions && user.permissions.includes(feature);
    const isActiveAccount = user && user.status === 'active';
    const isPaidUser = user && (user.plan === 'premium' || user.plan === 'pro');
    
    return isAuthenticated && hasPermission && isActiveAccount && 
           (feature !== 'advanced' || isPaidUser);
}

// Test complex conditions
const testUser = {
    isLoggedIn: true,
    permissions: ['read', 'write', 'advanced'],
    status: 'active',
    plan: 'premium'
};

console.log(canAccessFeature(testUser, 'read'));     // true
console.log(canAccessFeature(testUser, 'advanced')); // true
```

### Switch statements

```javascript
// Basic switch statement
function getDayName(dayNumber) {
    switch (dayNumber) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Invalid day";
    }
}

// Switch với fall-through (intentional)
function getSeasonFromMonth(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "Winter";
        case 3:
        case 4:
        case 5:
            return "Spring";
        case 6:
        case 7:
        case 8:
            return "Summer";
        case 9:
        case 10:
        case 11:
            return "Fall";
        default:
            return "Invalid month";
    }
}

// Switch với complex logic
function processUserAction(action, data) {
    switch (action.type) {
        case 'LOGIN':
            validateCredentials(action.payload);
            updateLoginStatus(true);
            redirectToHome();
            break;
            
        case 'LOGOUT':
            clearUserData();
            updateLoginStatus(false);
            redirectToLogin();
            break;
            
        case 'UPDATE_PROFILE':
            if (validateProfileData(action.payload)) {
                updateUserProfile(action.payload);
                showSuccessMessage("Profile updated");
            } else {
                showErrorMessage("Invalid profile data");
            }
            break;
            
        case 'DELETE_ACCOUNT':
            if (confirmDeletion()) {
                deleteUserAccount();
                clearAllData();
                redirectToGoodbye();
            }
            break;
            
        default:
            console.warn(`Unknown action: ${action.type}`);
            showErrorMessage("Action not supported");
    }
}

// Modern alternative: Object lookup
const actionHandlers = {
    LOGIN: (payload) => {
        validateCredentials(payload);
        updateLoginStatus(true);
        redirectToHome();
    },
    
    LOGOUT: () => {
        clearUserData();
        updateLoginStatus(false);
        redirectToLogin();
    },
    
    UPDATE_PROFILE: (payload) => {
        if (validateProfileData(payload)) {
            updateUserProfile(payload);
            showSuccessMessage("Profile updated");
        } else {
            showErrorMessage("Invalid profile data");
        }
    },
    
    DELETE_ACCOUNT: () => {
        if (confirmDeletion()) {
            deleteUserAccount();
            clearAllData();
            redirectToGoodbye();
        }
    }
};

function processUserActionModern(action) {
    const handler = actionHandlers[action.type];
    if (handler) {
        handler(action.payload);
    } else {
        console.warn(`Unknown action: ${action.type}`);
        showErrorMessage("Action not supported");
    }
}

// Helper functions (mock implementations)
function validateCredentials(payload) { return true; }
function updateLoginStatus(status) { console.log(`Login status: ${status}`); }
function redirectToHome() { console.log("Redirecting to home"); }
function clearUserData() { console.log("Clearing user data"); }
function redirectToLogin() { console.log("Redirecting to login"); }
function validateProfileData(data) { return true; }
function updateUserProfile(data) { console.log("Updating profile"); }
function showSuccessMessage(msg) { console.log(`Success: ${msg}`); }
function showErrorMessage(msg) { console.log(`Error: ${msg}`); }
function confirmDeletion() { return true; }
function deleteUserAccount() { console.log("Deleting account"); }
function clearAllData() { console.log("Clearing all data"); }
function redirectToGoodbye() { console.log("Redirecting to goodbye"); }

// Test
console.log(getDayName(1));           // "Monday"
console.log(getSeasonFromMonth(12));  // "Winter"
```

### Ternary operator

```javascript
// Basic ternary
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Nested ternary (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade); // "B"

// Better readable version
function getGrade(score) {
    return score >= 90 ? "A" :
           score >= 80 ? "B" :
           score >= 70 ? "C" :
           score >= 60 ? "D" : "F";
}

// Ternary với expressions
let users = [
    { name: "John", isActive: true },
    { name: "Jane", isActive: false }
];

let activeUsers = users.filter(user => user.isActive ? true : false);
// Simplified: users.filter(user => user.isActive)

// Conditional assignment
let theme = localStorage.getItem('theme') || 'light';
let isDarkTheme = theme === 'dark' ? true : false;
// Simplified: let isDarkTheme = theme === 'dark';

// Complex ternary với function calls
function formatCurrency(amount, currency = 'USD') {
    return amount !== null && amount !== undefined ?
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount) :
        'N/A';
}

// Ternary trong JSX-like templates (conceptual)
function createUserCard(user) {
    return `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p>Status: ${user.isActive ? 'Active' : 'Inactive'}</p>
            <p>Role: ${user.role || 'User'}</p>
            ${user.avatar ? `<img src="${user.avatar}" alt="Avatar">` : ''}
            <button ${user.isActive ? '' : 'disabled'}>
                ${user.isActive ? 'Send Message' : 'User Offline'}
            </button>
        </div>
    `;
}

// Utility functions với ternary
class ConditionalUtils {
    static ifElse(condition, trueValue, falseValue) {
        return condition ? trueValue : falseValue;
    }
    
    static ifElseFunc(condition, trueFunc, falseFunc) {
        return condition ? trueFunc() : falseFunc();
    }
    
    static switch(value, cases, defaultCase) {
        return cases[value] !== undefined ? cases[value] : defaultCase;
    }
    
    static clamp(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }
    
    static defaultValue(value, defaultVal) {
        return value !== null && value !== undefined ? value : defaultVal;
    }
}

// Test utilities
console.log(ConditionalUtils.ifElse(5 > 3, "yes", "no")); // "yes"
console.log(ConditionalUtils.switch("red", { red: "#FF0000", green: "#00FF00" }, "#000000")); // "#FF0000"
console.log(ConditionalUtils.clamp(15, 1, 10)); // 10
console.log(ConditionalUtils.defaultValue(null, "default")); // "default"
```

## 6. Tóm Tắt

### Boolean fundamentals:

| Concept | True | False | Notes |
|---------|------|-------|-------|
| **Literal** | `true` | `false` | Primitive boolean values |
| **Falsy** | - | `false, 0, "", null, undefined, NaN, -0, 0n` | 8 falsy values |
| **Truthy** | Everything else | - | `[], {}, "0", "false", etc.` |

### Logical operators:

| Operator | Purpose | Short-circuit | Use case |
|----------|---------|---------------|----------|
| **&&** | AND logic | Left to right | Guard clauses, conditional execution |
| **\|\|** | OR logic | Left to right | Default values, fallbacks |
| **!** | NOT logic | - | Negation, boolean conversion |
| **??** | Nullish coalescing | Left to right | Handle null/undefined only |

### Best practices:

1. **🎯 Use strict equality (`===`)**
   ```javascript
   // ✅ Explicit and predictable
   if (value === true) { }
   
   // ❌ Can cause confusion
   if (value == true) { }
   ```

2. **🔒 Guard clauses pattern**
   ```javascript
   // ✅ Early returns make code cleaner
   if (!user) return;
   if (!user.isActive) return;
   // main logic here
   ```

3. **⚡ Leverage short-circuiting**
   ```javascript
   // ✅ Safe property access
   user && user.profile && user.profile.name
   
   // ✅ Default values
   const name = user.name || 'Anonymous';
   ```

4. **🧹 Explicit boolean conversion**
   ```javascript
   // ✅ Clear intent
   const isValid = Boolean(value);
   const isValid = !!value;
   
   // ❌ Unclear
   const isValid = value ? true : false;
   ```

Boolean logic là nền tảng của programming - nắm vững các concepts này sẽ giúp bạn viết code logic rõ ràng và hiệu quả!
