---
slug: javascript-co-ban-bai-19
url: /posts/javascript-co-ban-bai-19/
title: "JavaScript Cơ Bản - Bài 19: Symbol - Unique Identifiers và Metadata"
date: 2025-10-21T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Tìm hiểu về Symbol - kiểu dữ liệu primitive tạo unique identifiers, well-known symbols, và ứng dụng trong metaprogramming"
---

# JavaScript Cơ Bản - Bài 19: Symbol - Unique Identifiers và Metadata

Symbol là kiểu dữ liệu primitive được thêm vào ES6, tạo ra các unique identifiers không thể duplicate. Mặc dù ít được sử dụng trong code hàng ngày, Symbol rất mạnh mẽ cho metaprogramming, tạo private properties, và customizing object behavior.

## Video Hướng Dẫn

{{< youtube 0MADXx8om1M >}}

## 1. Symbol Basics

### Tạo và sử dụng Symbol

```javascript
// Tạo Symbol cơ bản
const sym1 = Symbol();
const sym2 = Symbol();

// Mỗi Symbol đều unique, dù không có description
console.log(sym1 === sym2);        // false
console.log(sym1 == sym2);         // false
console.log(typeof sym1);          // "symbol"

// Symbol với description (for debugging)
const userIdSymbol = Symbol('userId');
const userNameSymbol = Symbol('userName');

console.log(userIdSymbol.toString());           // "Symbol(userId)"
console.log(userIdSymbol.description);          // "userId"
console.log(userNameSymbol.description);        // "userName"

// Symbol không thể được convert thành string implicitly
try {
    console.log("User: " + userIdSymbol);       // TypeError!
} catch (error) {
    console.log("Cannot convert Symbol to string implicitly");
}

// Phải convert explicitly
console.log("User: " + userIdSymbol.toString());     // "User: Symbol(userId)"
console.log(`User: ${userIdSymbol.description}`);    // "User: userId"

// Symbol không thể được convert thành number
console.log(Number(userIdSymbol));              // TypeError
console.log(+userIdSymbol);                     // TypeError

// Nhưng có thể convert thành boolean
console.log(Boolean(userIdSymbol));             // true
console.log(!userIdSymbol);                     // false
```

### Symbol properties trong objects

```javascript
// Sử dụng Symbol làm property keys
const id = Symbol('id');
const name = Symbol('name');
const email = Symbol('email');

const user = {
    [id]: 12345,
    [name]: "John Doe",
    [email]: "john@example.com",
    // Cũng có thể có string properties
    publicName: "John",
    age: 30
};

// Truy cập Symbol properties
console.log(user[id]);          // 12345
console.log(user[name]);        // "John Doe"
console.log(user[email]);       // "john@example.com"

// Symbol properties không xuất hiện trong enumeration thông thường
console.log(Object.keys(user));                 // ["publicName", "age"]
console.log(Object.getOwnPropertyNames(user));  // ["publicName", "age"]
console.log(JSON.stringify(user));              // {"publicName":"John","age":30}

// Nhưng có thể access qua getOwnPropertySymbols
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id), Symbol(name), Symbol(email)]

// Hoặc Reflect.ownKeys để get tất cả properties
console.log(Reflect.ownKeys(user));              // ["publicName", "age", Symbol(id), Symbol(name), Symbol(email)]

// Symbol properties vẫn có thể được access nếu có reference
console.log(user[id]);          // 12345

// Nhưng không thể access without reference
const anotherIdSymbol = Symbol('id');
console.log(user[anotherIdSymbol]);             // undefined (khác symbol!)
```

### Private-like properties với Symbol

```javascript
// Tạo "private" properties sử dụng Symbol
const _balance = Symbol('balance');
const _transactions = Symbol('transactions');
const _validateAmount = Symbol('validateAmount');

class BankAccount {
    constructor(initialBalance = 0) {
        this[_balance] = initialBalance;
        this[_transactions] = [];
        this.accountNumber = Math.random().toString(36).substring(7);
    }
    
    // Private method
    [_validateAmount](amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid amount');
        }
        if (amount > this[_balance]) {
            throw new Error('Insufficient funds');
        }
        return true;
    }
    
    // Public methods
    deposit(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid deposit amount');
        }
        
        this[_balance] += amount;
        this[_transactions].push({
            type: 'deposit',
            amount,
            balance: this[_balance],
            timestamp: new Date()
        });
        
        return this[_balance];
    }
    
    withdraw(amount) {
        this[_validateAmount](amount);
        
        this[_balance] -= amount;
        this[_transactions].push({
            type: 'withdraw',
            amount,
            balance: this[_balance],
            timestamp: new Date()
        });
        
        return this[_balance];
    }
    
    getBalance() {
        return this[_balance];
    }
    
    getTransactionHistory() {
        // Return copy để prevent modification
        return [...this[_transactions]];
    }
    
    // Debug method (có thể remove trong production)
    _debugInfo() {
        return {
            balance: this[_balance],
            transactions: this[_transactions].length,
            symbols: Object.getOwnPropertySymbols(this)
        };
    }
}

// Test BankAccount
const account = new BankAccount(1000);

console.log(account.getBalance());              // 1000
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance());              // 1300

// "Private" properties không visible trong normal enumeration
console.log(Object.keys(account));              // ["accountNumber"]
console.log(JSON.stringify(account));           // {"accountNumber":"..."}

// Nhưng vẫn có thể access nếu biết symbol (không thực sự private)
console.log(Object.getOwnPropertySymbols(account));

// Thực tế, không thể access mà không có symbol reference
console.log(account._balance);                  // undefined
console.log(account.balance);                   // undefined

// Debug info
console.log(account._debugInfo());
```

## 2. Global Symbol Registry

### Symbol.for() và Symbol.keyFor()

```javascript
// Symbol.for() tạo global symbols
const globalSym1 = Symbol.for('app.userId');
const globalSym2 = Symbol.for('app.userId');

// Global symbols với cùng key thì giống nhau
console.log(globalSym1 === globalSym2);        // true

// Khác với Symbol() thông thường
const localSym1 = Symbol('app.userId');
const localSym2 = Symbol('app.userId');
console.log(localSym1 === localSym2);          // false

// Symbol.keyFor() lấy key của global symbol
console.log(Symbol.keyFor(globalSym1));        // "app.userId"
console.log(Symbol.keyFor(localSym1));         // undefined (not global)

// Practical example: Event system với global symbols
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    // Sử dụng global symbols cho event names
    static getEventSymbol(eventName) {
        return Symbol.for(`event.${eventName}`);
    }
    
    on(eventName, callback) {
        const eventSymbol = EventManager.getEventSymbol(eventName);
        
        if (!this.listeners.has(eventSymbol)) {
            this.listeners.set(eventSymbol, new Set());
        }
        
        this.listeners.get(eventSymbol).add(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(eventSymbol);
            if (callbacks) {
                callbacks.delete(callback);
            }
        };
    }
    
    emit(eventName, ...args) {
        const eventSymbol = EventManager.getEventSymbol(eventName);
        const callbacks = this.listeners.get(eventSymbol);
        
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(`Error in event listener for ${eventName}:`, error);
                }
            });
        }
    }
    
    off(eventName, callback) {
        const eventSymbol = EventManager.getEventSymbol(eventName);
        const callbacks = this.listeners.get(eventSymbol);
        
        if (callbacks) {
            callbacks.delete(callback);
        }
    }
    
    getEventNames() {
        return Array.from(this.listeners.keys())
            .map(sym => Symbol.keyFor(sym))
            .filter(key => key && key.startsWith('event.'))
            .map(key => key.replace('event.', ''));
    }
}

// Test event system
const events = new EventManager();

// Các EventManager instances khác nhau có thể share events
const events2 = new EventManager();

const userLoginHandler = (user) => {
    console.log(`User logged in: ${user.name}`);
};

events.on('user.login', userLoginHandler);
events2.on('user.login', (user) => {
    console.log(`Send welcome email to ${user.email}`);
});

// Emit từ instance khác
events.emit('user.login', { name: 'John', email: 'john@example.com' });
events2.emit('user.login', { name: 'Jane', email: 'jane@example.com' });

console.log('Event names:', events.getEventNames());
```

### Symbol registry patterns

```javascript
// Namespace pattern với Symbol.for()
class SymbolNamespace {
    constructor(namespace) {
        this.namespace = namespace;
    }
    
    create(key) {
        return Symbol.for(`${this.namespace}.${key}`);
    }
    
    get(key) {
        return Symbol.for(`${this.namespace}.${key}`);
    }
    
    exists(key) {
        const sym = Symbol.for(`${this.namespace}.${key}`);
        return Symbol.keyFor(sym) !== undefined;
    }
    
    list() {
        // Note: Không có cách nào để list tất cả global symbols
        // Chỉ có thể track những gì chúng ta tạo
        return [];
    }
}

// Application-specific symbols
const AppSymbols = new SymbolNamespace('MyApp');

// User management symbols
const UserSymbols = new SymbolNamespace('User');

// Component symbols
const ComponentSymbols = new SymbolNamespace('Component');

// Usage
const USER_ID = UserSymbols.create('id');
const USER_PERMISSIONS = UserSymbols.create('permissions');
const USER_METADATA = UserSymbols.create('metadata');

const COMPONENT_STATE = ComponentSymbols.create('state');
const COMPONENT_PROPS = ComponentSymbols.create('props');

// Cross-module access
function getUserId(userObject) {
    return userObject[UserSymbols.get('id')];
}

function setUserPermissions(userObject, permissions) {
    userObject[UserSymbols.get('permissions')] = permissions;
}

// Test namespace
const user = {
    name: 'John Doe',
    [USER_ID]: 'user_12345',
    [USER_PERMISSIONS]: ['read', 'write'],
    [USER_METADATA]: { createdAt: new Date() }
};

console.log(getUserId(user));                           // "user_12345"
setUserPermissions(user, ['read', 'write', 'admin']);
console.log(user[USER_PERMISSIONS]);                   // ["read", "write", "admin"]
```

## 3. Well-known Symbols

### Symbol.iterator

```javascript
// Symbol.iterator để tạo iterable objects
class NumberRange {
    constructor(start, end, step = 1) {
        this.start = start;
        this.end = end;
        this.step = step;
    }
    
    // Implement Symbol.iterator
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        const step = this.step;
        
        return {
            next() {
                if (current < end) {
                    const value = current;
                    current += step;
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
    
    // Convenience methods
    toArray() {
        return [...this];
    }
    
    forEach(callback) {
        for (const value of this) {
            callback(value);
        }
    }
    
    map(callback) {
        const results = [];
        for (const value of this) {
            results.push(callback(value));
        }
        return results;
    }
    
    filter(callback) {
        const results = [];
        for (const value of this) {
            if (callback(value)) {
                results.push(value);
            }
        }
        return results;
    }
}

// Test NumberRange
const range = new NumberRange(1, 10, 2);

console.log('For...of loop:');
for (const num of range) {
    console.log(num);                               // 1, 3, 5, 7, 9
}

console.log('Spread operator:', [...range]);        // [1, 3, 5, 7, 9]
console.log('Array.from:', Array.from(range));      // [1, 3, 5, 7, 9]

// Sử dụng array methods
console.log('Squares:', range.map(n => n * n));     // [1, 9, 25, 49, 81]
console.log('Evens:', range.filter(n => n % 2 === 0)); // [] (no evens in odd range)

// Custom iterable object
const fibonacci = {
    [Symbol.iterator]() {
        let prev = 0, curr = 1;
        let count = 0;
        const max = 10;
        
        return {
            next() {
                if (count < max) {
                    count++;
                    const value = prev;
                    [prev, curr] = [curr, prev + curr];
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

console.log('Fibonacci:', [...fibonacci]);           // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Symbol.toPrimitive

```javascript
// Symbol.toPrimitive để customize type conversion
class Money {
    constructor(amount, currency = 'USD') {
        this.amount = amount;
        this.currency = currency;
    }
    
    [Symbol.toPrimitive](hint) {
        console.log(`Converting to ${hint}`);
        
        switch (hint) {
            case 'number':
                return this.amount;
                
            case 'string':
                return `${this.amount} ${this.currency}`;
                
            case 'default':
                // Called khi context không rõ ràng (==, +)
                return this.amount;
                
            default:
                throw new Error(`Unknown hint: ${hint}`);
        }
    }
    
    // Convenience methods
    toString() {
        return this[Symbol.toPrimitive]('string');
    }
    
    valueOf() {
        return this[Symbol.toPrimitive]('number');
    }
    
    // Math operations
    add(other) {
        if (other instanceof Money && other.currency === this.currency) {
            return new Money(this.amount + other.amount, this.currency);
        }
        throw new Error('Currency mismatch or invalid operand');
    }
    
    multiply(factor) {
        return new Money(this.amount * factor, this.currency);
    }
}

// Test Money class
const price = new Money(100, 'USD');
const tax = new Money(8.5, 'USD');

console.log('String conversion:', String(price));       // "100 USD"
console.log('Number conversion:', Number(price));       // 100
console.log('Default conversion:', price + 0);          // 100
console.log('Comparison:', price > 50);                 // true

// Template literals use string conversion
console.log(`Total price: ${price}`);                   // "Total price: 100 USD"

// Math operations
const total = price.add(tax);
console.log(`Total with tax: ${total}`);                // "Total with tax: 108.5 USD"

const doubled = price.multiply(2);
console.log(`Doubled: ${doubled}`);                     // "Doubled: 200 USD"

// Comparison operations
const anotherPrice = new Money(100, 'USD');
console.log('Equal amounts:', price == anotherPrice);   // true (uses toPrimitive)
console.log('Same object:', price === anotherPrice);    // false (different objects)
```

### Symbol.toStringTag

```javascript
// Symbol.toStringTag để customize Object.prototype.toString
class CustomArray {
    constructor(...items) {
        this.items = items;
        this.length = items.length;
    }
    
    get [Symbol.toStringTag]() {
        return 'CustomArray';
    }
    
    push(item) {
        this.items.push(item);
        this.length = this.items.length;
        return this.length;
    }
    
    pop() {
        const result = this.items.pop();
        this.length = this.items.length;
        return result;
    }
    
    toString() {
        return `CustomArray[${this.items.join(', ')}]`;
    }
}

// Test CustomArray
const customArr = new CustomArray(1, 2, 3);

console.log(Object.prototype.toString.call(customArr)); // "[object CustomArray]"
console.log(customArr.toString());                      // "CustomArray[1, 2, 3]"

// So sánh với regular array
const regularArr = [1, 2, 3];
console.log(Object.prototype.toString.call(regularArr)); // "[object Array]"

// More examples
class DataProcessor {
    constructor(name) {
        this.name = name;
    }
    
    get [Symbol.toStringTag]() {
        return `DataProcessor(${this.name})`;
    }
}

const processor = new DataProcessor('CSV');
console.log(Object.prototype.toString.call(processor)); // "[object DataProcessor(CSV)]"

// Useful cho debugging và type checking
function getObjectType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log(getObjectType(customArr));                  // "CustomArray"
console.log(getObjectType(processor));                  // "DataProcessor(CSV)"
console.log(getObjectType([]));                         // "Array"
console.log(getObjectType({}));                         // "Object"
console.log(getObjectType(new Date()));                 // "Date"
```

### Symbol.hasInstance

```javascript
// Symbol.hasInstance để customize instanceof behavior
class SmartArray {
    static [Symbol.hasInstance](instance) {
        // Custom logic cho instanceof
        return Array.isArray(instance) || 
               (instance && typeof instance.length === 'number' && 
                typeof instance.push === 'function');
    }
    
    constructor(...items) {
        this.items = items;
        this.length = items.length;
    }
    
    push(item) {
        this.items.push(item);
        this.length = this.items.length;
        return this.length;
    }
}

// Test instanceof behavior
const smartArr = new SmartArray(1, 2, 3);
const regularArr = [1, 2, 3];
const arrayLike = { length: 3, push: function() {} };
const notArrayLike = { length: 3 };

console.log(smartArr instanceof SmartArray);            // true
console.log(regularArr instanceof SmartArray);          // true (custom logic!)
console.log(arrayLike instanceof SmartArray);           // true (has length and push)
console.log(notArrayLike instanceof SmartArray);        // false (missing push)
console.log("string" instanceof SmartArray);            // false

// Practical example: Type checking utility
class Validator {
    static [Symbol.hasInstance](value) {
        // Always return false - này là utility class, không dành cho instances
        return false;
    }
    
    static isEmail(value) {
        return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    
    static isPhone(value) {
        return typeof value === 'string' && /^[\d\s\-\+\(\)]+$/.test(value.replace(/\s/g, ''));
    }
    
    static isArrayLike(value) {
        return value && typeof value.length === 'number' && value.length >= 0;
    }
}

// Test Validator
console.log("test@example.com" instanceof Validator);   // false (always)
console.log(new Validator() instanceof Validator);      // false (always)

console.log(Validator.isEmail("test@example.com"));     // true
console.log(Validator.isPhone("123-456-7890"));         // true
console.log(Validator.isArrayLike([1, 2, 3]));          // true
console.log(Validator.isArrayLike("hello"));            // true (strings are array-like)
```

## 4. Advanced Symbol Patterns

### Symbol-based Registry System

```javascript
// Advanced registry system sử dụng symbols
class ComponentRegistry {
    constructor() {
        // Private storage sử dụng symbols
        this[Symbol.for('components')] = new Map();
        this[Symbol.for('metadata')] = new Map();
        this[Symbol.for('hooks')] = new Map();
    }
    
    // Register component với unique symbol key
    register(name, component, metadata = {}) {
        const componentSymbol = Symbol.for(`component.${name}`);
        const components = this[Symbol.for('components')];
        const metadataStore = this[Symbol.for('metadata')];
        
        if (components.has(componentSymbol)) {
            throw new Error(`Component '${name}' already registered`);
        }
        
        components.set(componentSymbol, component);
        metadataStore.set(componentSymbol, {
            name,
            registeredAt: new Date(),
            ...metadata
        });
        
        // Trigger registration hooks
        this.triggerHooks('register', { name, component, metadata });
        
        return componentSymbol;
    }
    
    // Get component by name
    get(name) {
        const componentSymbol = Symbol.for(`component.${name}`);
        const components = this[Symbol.for('components')];
        return components.get(componentSymbol);
    }
    
    // Get component metadata
    getMetadata(name) {
        const componentSymbol = Symbol.for(`component.${name}`);
        const metadataStore = this[Symbol.for('metadata')];
        return metadataStore.get(componentSymbol);
    }
    
    // List all registered components
    list() {
        const components = this[Symbol.for('components')];
        const results = [];
        
        for (const [symbol, component] of components) {
            const key = Symbol.keyFor(symbol);
            if (key && key.startsWith('component.')) {
                const name = key.replace('component.', '');
                results.push({
                    name,
                    component,
                    metadata: this.getMetadata(name)
                });
            }
        }
        
        return results;
    }
    
    // Unregister component
    unregister(name) {
        const componentSymbol = Symbol.for(`component.${name}`);
        const components = this[Symbol.for('components')];
        const metadataStore = this[Symbol.for('metadata')];
        
        const component = components.get(componentSymbol);
        if (!component) {
            return false;
        }
        
        components.delete(componentSymbol);
        metadataStore.delete(componentSymbol);
        
        this.triggerHooks('unregister', { name, component });
        
        return true;
    }
    
    // Hook system
    onRegister(callback) {
        this.addHook('register', callback);
    }
    
    onUnregister(callback) {
        this.addHook('unregister', callback);
    }
    
    addHook(eventName, callback) {
        const hooks = this[Symbol.for('hooks')];
        const eventSymbol = Symbol.for(`hook.${eventName}`);
        
        if (!hooks.has(eventSymbol)) {
            hooks.set(eventSymbol, new Set());
        }
        
        hooks.get(eventSymbol).add(callback);
    }
    
    triggerHooks(eventName, data) {
        const hooks = this[Symbol.for('hooks')];
        const eventSymbol = Symbol.for(`hook.${eventName}`);
        const eventHooks = hooks.get(eventSymbol);
        
        if (eventHooks) {
            eventHooks.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Hook error for ${eventName}:`, error);
                }
            });
        }
    }
    
    // Debug helpers
    debugInfo() {
        return {
            componentCount: this[Symbol.for('components')].size,
            metadataCount: this[Symbol.for('metadata')].size,
            hookCount: this[Symbol.for('hooks')].size,
            components: this.list().map(c => c.name)
        };
    }
    
    // Clear all (for testing)
    clear() {
        this[Symbol.for('components')].clear();
        this[Symbol.for('metadata')].clear();
        this[Symbol.for('hooks')].clear();
    }
}

// Test registry system
const registry = new ComponentRegistry();

// Register hooks
registry.onRegister((data) => {
    console.log(`Component registered: ${data.name}`);
});

registry.onUnregister((data) => {
    console.log(`Component unregistered: ${data.name}`);
});

// Register some components
class Button {
    render() { return '<button>Click me</button>'; }
}

class Modal {
    render() { return '<div class="modal">Modal content</div>'; }
}

class Form {
    render() { return '<form>Form content</form>'; }
}

registry.register('Button', Button, { category: 'input', version: '1.0' });
registry.register('Modal', Modal, { category: 'overlay', version: '2.1' });
registry.register('Form', Form, { category: 'input', version: '1.5' });

// Use registry
const ButtonComponent = registry.get('Button');
const buttonInstance = new ButtonComponent();
console.log(buttonInstance.render());

console.log('Registry info:', registry.debugInfo());
console.log('All components:', registry.list());

// Test metadata
console.log('Button metadata:', registry.getMetadata('Button'));
```

### Symbol-based Plugin System

```javascript
// Plugin system với Symbol-based architecture
class PluginManager {
    constructor() {
        // Core symbols
        this.PLUGIN_SYMBOL = Symbol.for('plugin');
        this.HOOKS_SYMBOL = Symbol.for('hooks');
        this.CONFIG_SYMBOL = Symbol.for('config');
        
        // Internal storage
        this[this.PLUGIN_SYMBOL] = new Map();
        this[this.HOOKS_SYMBOL] = new Map();
        this[this.CONFIG_SYMBOL] = {};
        
        // Plugin lifecycle hooks
        this.defineHook('beforeLoad');
        this.defineHook('afterLoad');
        this.defineHook('beforeUnload');
        this.defineHook('afterUnload');
        this.defineHook('error');
    }
    
    defineHook(name) {
        const hookSymbol = Symbol.for(`hook.${name}`);
        this[this.HOOKS_SYMBOL].set(hookSymbol, new Set());
    }
    
    addHook(hookName, callback) {
        const hookSymbol = Symbol.for(`hook.${hookName}`);
        const hooks = this[this.HOOKS_SYMBOL].get(hookSymbol);
        
        if (hooks) {
            hooks.add(callback);
            return () => hooks.delete(callback); // Unsubscribe function
        }
        
        throw new Error(`Hook '${hookName}' not defined`);
    }
    
    triggerHook(hookName, ...args) {
        const hookSymbol = Symbol.for(`hook.${hookName}`);
        const hooks = this[this.HOOKS_SYMBOL].get(hookSymbol);
        
        if (hooks) {
            const promises = [];
            for (const callback of hooks) {
                try {
                    const result = callback(...args);
                    if (result instanceof Promise) {
                        promises.push(result);
                    }
                } catch (error) {
                    this.triggerHook('error', error, hookName, args);
                }
            }
            
            if (promises.length > 0) {
                return Promise.all(promises);
            }
        }
    }
    
    async loadPlugin(name, plugin, config = {}) {
        const pluginSymbol = Symbol.for(`plugin.${name}`);
        const plugins = this[this.PLUGIN_SYMBOL];
        
        if (plugins.has(pluginSymbol)) {
            throw new Error(`Plugin '${name}' already loaded`);
        }
        
        try {
            // Trigger beforeLoad hook
            await this.triggerHook('beforeLoad', name, plugin, config);
            
            // Validate plugin
            if (!plugin || typeof plugin.init !== 'function') {
                throw new Error(`Plugin '${name}' must have an init method`);
            }
            
            // Initialize plugin
            const pluginInstance = {
                name,
                plugin,
                config: { ...config },
                loadedAt: new Date(),
                active: false
            };
            
            // Call plugin init
            if (typeof plugin.init === 'function') {
                await plugin.init(config, this);
            }
            
            pluginInstance.active = true;
            plugins.set(pluginSymbol, pluginInstance);
            
            // Trigger afterLoad hook
            await this.triggerHook('afterLoad', name, pluginInstance);
            
            return pluginInstance;
            
        } catch (error) {
            this.triggerHook('error', error, 'loadPlugin', { name, config });
            throw error;
        }
    }
    
    async unloadPlugin(name) {
        const pluginSymbol = Symbol.for(`plugin.${name}`);
        const plugins = this[this.PLUGIN_SYMBOL];
        const pluginInstance = plugins.get(pluginSymbol);
        
        if (!pluginInstance) {
            return false;
        }
        
        try {
            await this.triggerHook('beforeUnload', name, pluginInstance);
            
            // Call plugin cleanup if available
            if (typeof pluginInstance.plugin.cleanup === 'function') {
                await pluginInstance.plugin.cleanup();
            }
            
            pluginInstance.active = false;
            plugins.delete(pluginSymbol);
            
            await this.triggerHook('afterUnload', name, pluginInstance);
            
            return true;
            
        } catch (error) {
            this.triggerHook('error', error, 'unloadPlugin', { name });
            throw error;
        }
    }
    
    getPlugin(name) {
        const pluginSymbol = Symbol.for(`plugin.${name}`);
        return this[this.PLUGIN_SYMBOL].get(pluginSymbol);
    }
    
    listPlugins() {
        const plugins = [];
        for (const [symbol, instance] of this[this.PLUGIN_SYMBOL]) {
            const key = Symbol.keyFor(symbol);
            if (key && key.startsWith('plugin.')) {
                plugins.push(instance);
            }
        }
        return plugins;
    }
    
    isLoaded(name) {
        const pluginSymbol = Symbol.for(`plugin.${name}`);
        const instance = this[this.PLUGIN_SYMBOL].get(pluginSymbol);
        return instance && instance.active;
    }
    
    // Plugin communication
    setConfig(key, value) {
        this[this.CONFIG_SYMBOL][key] = value;
    }
    
    getConfig(key) {
        return this[this.CONFIG_SYMBOL][key];
    }
    
    // Plugin API helpers
    createPluginAPI(pluginName) {
        return {
            getName: () => pluginName,
            getConfig: (key) => this.getPlugin(pluginName)?.config[key],
            setConfig: (key, value) => {
                const instance = this.getPlugin(pluginName);
                if (instance) {
                    instance.config[key] = value;
                }
            },
            addHook: (hookName, callback) => this.addHook(hookName, callback),
            triggerHook: (hookName, ...args) => this.triggerHook(hookName, ...args),
            getGlobalConfig: (key) => this.getConfig(key),
            setGlobalConfig: (key, value) => this.setConfig(key, value),
            log: (message, ...args) => console.log(`[${pluginName}]`, message, ...args)
        };
    }
}

// Example plugins
const analyticsPlugin = {
    async init(config, manager) {
        console.log('Analytics plugin initialized');
        this.config = config;
        this.manager = manager;
        
        // Add analytics hooks
        manager.addHook('afterLoad', (name) => {
            console.log(`Analytics: Plugin ${name} loaded`);
        });
    },
    
    async cleanup() {
        console.log('Analytics plugin cleaned up');
    },
    
    track(event, data) {
        console.log('Analytics event:', event, data);
    }
};

const loggingPlugin = {
    async init(config, manager) {
        console.log('Logging plugin initialized');
        
        // Add logging to all hooks
        ['beforeLoad', 'afterLoad', 'beforeUnload', 'afterUnload', 'error'].forEach(hookName => {
            manager.addHook(hookName, (...args) => {
                console.log(`[LOG] ${hookName}:`, ...args);
            });
        });
    },
    
    async cleanup() {
        console.log('Logging plugin cleaned up');
    }
};

// Test plugin system
const pluginManager = new PluginManager();

// Setup error handling
pluginManager.addHook('error', (error, context) => {
    console.error('Plugin system error:', error, 'Context:', context);
});

// Load plugins
async function testPluginSystem() {
    try {
        await pluginManager.loadPlugin('analytics', analyticsPlugin, {
            apiKey: 'test-key',
            enabled: true
        });
        
        await pluginManager.loadPlugin('logging', loggingPlugin, {
            level: 'debug'
        });
        
        console.log('Loaded plugins:', pluginManager.listPlugins());
        
        // Test plugin functionality
        const analytics = pluginManager.getPlugin('analytics');
        if (analytics) {
            analytics.plugin.track('page_view', { path: '/' });
        }
        
        // Unload plugin
        await pluginManager.unloadPlugin('analytics');
        
        console.log('Remaining plugins:', pluginManager.listPlugins());
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testPluginSystem();
```

## 5. Tóm Tắt

### Symbol fundamentals:

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Symbol()** | Create unique identifier | Private properties, unique keys |
| **Symbol.for()** | Global symbol registry | Cross-module communication |
| **Symbol.keyFor()** | Get global symbol key | Debugging, introspection |
| **Well-known symbols** | Built-in behavior customization | Iterator, toPrimitive, etc. |

### Well-known symbols chính:

| Symbol | Purpose | Implementation |
|--------|---------|---------------|
| **Symbol.iterator** | Make object iterable | `[Symbol.iterator]() { return iterator; }` |
| **Symbol.toPrimitive** | Custom type conversion | `[Symbol.toPrimitive](hint) { ... }` |
| **Symbol.toStringTag** | Custom toString behavior | `get [Symbol.toStringTag]() { return 'Type'; }` |
| **Symbol.hasInstance** | Custom instanceof | `static [Symbol.hasInstance](obj) { ... }` |

### Best practices:

1. **🔒 Use Symbols for private-like properties**
   ```javascript
   const _private = Symbol('private');
   class MyClass {
       constructor() {
           this[_private] = 'hidden';
       }
   }
   ```

2. **🌐 Use Symbol.for() for cross-module communication**
   ```javascript
   // Module A
   const EVENT_KEY = Symbol.for('app.event.user.login');
   
   // Module B - same symbol
   const SAME_EVENT_KEY = Symbol.for('app.event.user.login');
   ```

3. **⚙️ Implement well-known symbols for custom behavior**
   ```javascript
   class CustomCollection {
       [Symbol.iterator]() { /* make iterable */ }
       [Symbol.toPrimitive](hint) { /* custom conversion */ }
   }
   ```

4. **📋 Use descriptive descriptions for debugging**
   ```javascript
   const userId = Symbol('user.id');
   const userPermissions = Symbol('user.permissions');
   ```

5. **🔍 Remember Symbol properties aren't enumerable**
   ```javascript
   // Won't show in Object.keys(), for...in, JSON.stringify
   // Use Object.getOwnPropertySymbols() hoặc Reflect.ownKeys()
   ```

Symbol mở ra possibilities cho metaprogramming và tạo APIs mạnh mẽ. Mặc dù không phổ biến trong daily coding, chúng rất hữu ích cho libraries và frameworks!
