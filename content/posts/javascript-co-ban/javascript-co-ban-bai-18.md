---
slug: javascript-co-ban-bai-18
url: /posts/javascript-co-ban-bai-18/
title: "JavaScript Cơ Bản - Bài 18: Boolean Ứng Dụng Thực Tế"
date: 2025-10-21T00:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Ứng dụng Boolean trong thực tế: validation, state management, conditional rendering, và các patterns advanced"
---

# JavaScript Cơ Bản - Bài 18: Boolean Ứng Dụng Thực Tế

Boolean không chỉ là `true` và `false` đơn thuần. Trong thực tế, Boolean được sử dụng để kiểm soát flow của ứng dụng, validate dữ liệu, quản lý state, và tạo ra các logic phức tạp. Hôm nay chúng ta sẽ khám phá các ứng dụng thực tế của Boolean.

## Video Hướng Dẫn

{{< youtube 0MADXx8om1M >}}

## 1. Form Validation với Boolean Logic

### Comprehensive Form Validator

```javascript
class FormValidator {
    constructor() {
        this.rules = new Map();
        this.errors = new Map();
        this.isValid = false;
    }
    
    // Thêm validation rules
    addRule(fieldName, validatorFunction, errorMessage) {
        if (!this.rules.has(fieldName)) {
            this.rules.set(fieldName, []);
        }
        this.rules.get(fieldName).push({
            validator: validatorFunction,
            message: errorMessage
        });
        return this;
    }
    
    // Built-in validators
    static validators = {
        required: (value) => {
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
            return value !== null && value !== undefined && value !== '';
        },
        
        minLength: (min) => (value) => {
            return String(value).length >= min;
        },
        
        maxLength: (max) => (value) => {
            return String(value).length <= max;
        },
        
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(String(value));
        },
        
        phone: (value) => {
            const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
            const cleaned = String(value).replace(/\D/g, '');
            return phoneRegex.test(cleaned);
        },
        
        strongPassword: (value) => {
            const password = String(value);
            const hasLower = /[a-z]/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
            const isLongEnough = password.length >= 8;
            
            return hasLower && hasUpper && hasNumber && hasSpecial && isLongEnough;
        },
        
        match: (fieldName) => (value, allFields) => {
            return value === allFields[fieldName];
        },
        
        numeric: (value) => {
            return !isNaN(value) && !isNaN(parseFloat(value));
        },
        
        range: (min, max) => (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && num >= min && num <= max;
        },
        
        url: (value) => {
            try {
                new URL(String(value));
                return true;
            } catch {
                return false;
            }
        },
        
        custom: (validatorFunction) => validatorFunction
    };
    
    // Validate all fields
    validate(formData) {
        this.errors.clear();
        let allValid = true;
        
        // Validate each field
        for (const [fieldName, validators] of this.rules.entries()) {
            const fieldValue = formData[fieldName];
            const fieldErrors = [];
            
            for (const { validator, message } of validators) {
                let isFieldValid;
                
                // Handle special case cho match validator
                if (validator.length > 1) {
                    isFieldValid = validator(fieldValue, formData);
                } else {
                    isFieldValid = validator(fieldValue);
                }
                
                if (!isFieldValid) {
                    fieldErrors.push(message);
                    allValid = false;
                }
            }
            
            if (fieldErrors.length > 0) {
                this.errors.set(fieldName, fieldErrors);
            }
        }
        
        this.isValid = allValid;
        
        return {
            isValid: allValid,
            errors: Object.fromEntries(this.errors),
            hasErrors: this.errors.size > 0,
            errorCount: this.errors.size,
            firstError: this.getFirstError()
        };
    }
    
    getFirstError() {
        for (const [field, errors] of this.errors.entries()) {
            return { field, error: errors[0] };
        }
        return null;
    }
    
    // Validate single field
    validateField(fieldName, value, formData = {}) {
        if (!this.rules.has(fieldName)) return { isValid: true, errors: [] };
        
        const validators = this.rules.get(fieldName);
        const errors = [];
        
        for (const { validator, message } of validators) {
            let isValid;
            
            if (validator.length > 1) {
                isValid = validator(value, { ...formData, [fieldName]: value });
            } else {
                isValid = validator(value);
            }
            
            if (!isValid) {
                errors.push(message);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Tạo validator cho form đăng ký
const registrationValidator = new FormValidator()
    .addRule('firstName', FormValidator.validators.required, 'Tên không được để trống')
    .addRule('firstName', FormValidator.validators.minLength(2), 'Tên phải có ít nhất 2 ký tự')
    .addRule('firstName', FormValidator.validators.maxLength(50), 'Tên không được quá 50 ký tự')
    
    .addRule('lastName', FormValidator.validators.required, 'Họ không được để trống')
    .addRule('lastName', FormValidator.validators.minLength(2), 'Họ phải có ít nhất 2 ký tự')
    
    .addRule('email', FormValidator.validators.required, 'Email không được để trống')
    .addRule('email', FormValidator.validators.email, 'Email không đúng định dạng')
    
    .addRule('phone', FormValidator.validators.required, 'Số điện thoại không được để trống')
    .addRule('phone', FormValidator.validators.phone, 'Số điện thoại không đúng định dạng Việt Nam')
    
    .addRule('password', FormValidator.validators.required, 'Mật khẩu không được để trống')
    .addRule('password', FormValidator.validators.strongPassword, 'Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt')
    
    .addRule('confirmPassword', FormValidator.validators.required, 'Xác nhận mật khẩu không được để trống')
    .addRule('confirmPassword', FormValidator.validators.match('password'), 'Xác nhận mật khẩu không khớp')
    
    .addRule('age', FormValidator.validators.required, 'Tuổi không được để trống')
    .addRule('age', FormValidator.validators.numeric, 'Tuổi phải là số')
    .addRule('age', FormValidator.validators.range(16, 100), 'Tuổi phải từ 16 đến 100');

// Test validation
const formData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '0123456789',
    password: 'MyP@ssw0rd123',
    confirmPassword: 'MyP@ssw0rd123',
    age: '25'
};

const validationResult = registrationValidator.validate(formData);
console.log('Validation result:', validationResult);
```

### Real-time Field Validation

```javascript
class RealTimeValidator {
    constructor(validator, formElement) {
        this.validator = validator;
        this.form = formElement;
        this.fieldStates = new Map();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Add event listeners cho tất cả form fields
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const fieldName = input.name || input.id;
            if (!fieldName) return;
            
            // Initialize field state
            this.fieldStates.set(fieldName, {
                touched: false,
                dirty: false,
                valid: null,
                errors: []
            });
            
            // Real-time validation events
            input.addEventListener('blur', () => this.validateFieldOnBlur(fieldName));
            input.addEventListener('input', () => this.validateFieldOnInput(fieldName));
            input.addEventListener('focus', () => this.markFieldAsTouched(fieldName));
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
    
    validateFieldOnInput(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"], #${fieldName}`);
        if (!field) return;
        
        this.markFieldAsDirty(fieldName);
        
        // Debounce validation để tránh validate quá nhiều
        clearTimeout(this.debounceTimers?.[fieldName]);
        this.debounceTimers = this.debounceTimers || {};
        
        this.debounceTimers[fieldName] = setTimeout(() => {
            this.validateSingleField(fieldName, field.value);
        }, 300);
    }
    
    validateFieldOnBlur(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"], #${fieldName}`);
        if (!field) return;
        
        this.markFieldAsTouched(fieldName);
        this.validateSingleField(fieldName, field.value);
    }
    
    validateSingleField(fieldName, value) {
        const formData = this.getFormData();
        const result = this.validator.validateField(fieldName, value, formData);
        
        const fieldState = this.fieldStates.get(fieldName);
        fieldState.valid = result.isValid;
        fieldState.errors = result.errors;
        
        this.updateFieldUI(fieldName, fieldState);
        this.updateFormState();
    }
    
    updateFieldUI(fieldName, fieldState) {
        const field = this.form.querySelector(`[name="${fieldName}"], #${fieldName}`);
        const errorContainer = this.form.querySelector(`[data-error-for="${fieldName}"]`);
        
        if (!field) return;
        
        // Update field classes
        field.classList.remove('valid', 'invalid');
        
        if (fieldState.touched || fieldState.dirty) {
            if (fieldState.valid === true) {
                field.classList.add('valid');
            } else if (fieldState.valid === false) {
                field.classList.add('invalid');
            }
        }
        
        // Update error message
        if (errorContainer) {
            if (fieldState.errors.length > 0 && (fieldState.touched || fieldState.dirty)) {
                errorContainer.textContent = fieldState.errors[0];
                errorContainer.style.display = 'block';
            } else {
                errorContainer.textContent = '';
                errorContainer.style.display = 'none';
            }
        }
    }
    
    markFieldAsTouched(fieldName) {
        const fieldState = this.fieldStates.get(fieldName);
        if (fieldState) {
            fieldState.touched = true;
        }
    }
    
    markFieldAsDirty(fieldName) {
        const fieldState = this.fieldStates.get(fieldName);
        if (fieldState) {
            fieldState.dirty = true;
        }
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    updateFormState() {
        const formData = this.getFormData();
        const overallResult = this.validator.validate(formData);
        
        // Update submit button state
        const submitBtn = this.form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = !overallResult.isValid;
        }
        
        // Dispatch custom event
        this.form.dispatchEvent(new CustomEvent('validationChanged', {
            detail: {
                isValid: overallResult.isValid,
                errors: overallResult.errors,
                fieldStates: Object.fromEntries(this.fieldStates)
            }
        }));
    }
    
    handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = this.getFormData();
        const result = this.validator.validate(formData);
        
        if (!result.isValid) {
            // Focus on first invalid field
            const firstError = result.firstError;
            if (firstError) {
                const field = this.form.querySelector(`[name="${firstError.field}"], #${firstError.field}`);
                if (field) {
                    field.focus();
                }
            }
            
            // Mark all fields as touched to show errors
            this.fieldStates.forEach((state, fieldName) => {
                state.touched = true;
                this.updateFieldUI(fieldName, state);
            });
            
            return false;
        }
        
        // Form is valid - submit data
        this.onFormSubmit(formData, result);
        return true;
    }
    
    onFormSubmit(data, validationResult) {
        // Override this method để handle form submission
        console.log('Form submitted with data:', data);
        console.log('Validation result:', validationResult);
    }
}

// Usage example (conceptual - requires HTML form)
/*
const form = document.getElementById('registrationForm');
const realTimeValidator = new RealTimeValidator(registrationValidator, form);

realTimeValidator.onFormSubmit = (data, result) => {
    // Custom submission logic
    console.log('Submitting user registration:', data);
    
    // Call API
    registerUser(data)
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error));
};
*/
```

## 2. State Management với Boolean Flags

### Application State Manager

```javascript
class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.listeners = new Map();
        this.middleware = [];
        this.history = [];
        this.maxHistorySize = 50;
    }
    
    // Subscribe to state changes
    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(key);
            if (callbacks) {
                callbacks.delete(callback);
            }
        };
    }
    
    // Get state value
    getState(key) {
        return key ? this.state[key] : { ...this.state };
    }
    
    // Set state with validation and history
    setState(updates, meta = {}) {
        const previousState = { ...this.state };
        const newState = { ...this.state, ...updates };
        
        // Run middleware
        const action = { type: 'SET_STATE', payload: updates, meta };
        const processedAction = this.runMiddleware(action, previousState, newState);
        
        if (processedAction === false) {
            return false; // Middleware blocked the update
        }
        
        // Update state
        this.state = newState;
        
        // Save to history
        this.saveToHistory(previousState, newState, action);
        
        // Notify listeners
        Object.keys(updates).forEach(key => {
            this.notifyListeners(key, newState[key], previousState[key]);
        });
        
        return true;
    }
    
    // Toggle boolean state
    toggle(key) {
        const currentValue = this.state[key];
        const newValue = !currentValue;
        
        return this.setState({ [key]: newValue }, { action: 'TOGGLE', key });
    }
    
    // Batch updates
    batch(updateFunction) {
        const updates = updateFunction(this.state);
        return this.setState(updates, { action: 'BATCH' });
    }
    
    // Add middleware
    use(middleware) {
        this.middleware.push(middleware);
    }
    
    runMiddleware(action, prevState, nextState) {
        for (const middleware of this.middleware) {
            const result = middleware(action, prevState, nextState);
            if (result === false) {
                return false;
            }
        }
        return action;
    }
    
    saveToHistory(prevState, nextState, action) {
        this.history.push({
            timestamp: Date.now(),
            prevState,
            nextState,
            action
        });
        
        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        }
    }
    
    notifyListeners(key, newValue, oldValue) {
        const callbacks = this.listeners.get(key);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(newValue, oldValue, key);
                } catch (error) {
                    console.error(`Error in state listener for ${key}:`, error);
                }
            });
        }
    }
    
    // Computed properties
    computed(key, computeFunction, dependencies = []) {
        const compute = () => {
            const newValue = computeFunction(this.state);
            this.setState({ [key]: newValue }, { action: 'COMPUTED', key });
        };
        
        // Subscribe to dependencies
        dependencies.forEach(dep => {
            this.subscribe(dep, compute);
        });
        
        // Initial computation
        compute();
    }
    
    // Reset state
    reset(keys) {
        if (Array.isArray(keys)) {
            const updates = {};
            keys.forEach(key => {
                updates[key] = undefined;
            });
            return this.setState(updates, { action: 'RESET' });
        } else {
            this.state = {};
            this.history = [];
            this.notifyListeners('*', this.state, {});
            return true;
        }
    }
    
    // Debug helpers
    getHistory() {
        return [...this.history];
    }
    
    debugState() {
        console.group('State Manager Debug');
        console.log('Current State:', this.state);
        console.log('Listeners:', Object.fromEntries(this.listeners));
        console.log('History Count:', this.history.length);
        console.log('Middleware Count:', this.middleware.length);
        console.groupEnd();
    }
}

// Example middleware
const loggerMiddleware = (action, prevState, nextState) => {
    console.group(`State Update: ${action.type}`);
    console.log('Action:', action);
    console.log('Previous State:', prevState);
    console.log('Next State:', nextState);
    console.groupEnd();
    return action;
};

const validationMiddleware = (action, prevState, nextState) => {
    // Example: Prevent setting negative values cho certain keys
    const forbiddenNegative = ['count', 'score', 'progress'];
    
    for (const key of forbiddenNegative) {
        if (nextState[key] < 0) {
            console.warn(`Blocked negative value for ${key}`);
            return false;
        }
    }
    
    return action;
};

// Create application state
const appState = new StateManager({
    isLoading: false,
    isAuthenticated: false,
    showModal: false,
    sidebarOpen: false,
    notifications: [],
    user: null,
    theme: 'light',
    count: 0
});

// Add middleware
appState.use(loggerMiddleware);
appState.use(validationMiddleware);

// Subscribe to specific state changes
appState.subscribe('isAuthenticated', (isAuth, wasAuth) => {
    console.log(`Authentication changed: ${wasAuth} -> ${isAuth}`);
    
    if (isAuth) {
        // User logged in
        appState.setState({ 
            sidebarOpen: true,
            showModal: false 
        });
    } else {
        // User logged out
        appState.setState({
            user: null,
            sidebarOpen: false,
            notifications: []
        });
    }
});

appState.subscribe('theme', (newTheme) => {
    document.body.className = `theme-${newTheme}`;
});

// Computed properties
appState.computed('hasNotifications', (state) => {
    return Array.isArray(state.notifications) && state.notifications.length > 0;
}, ['notifications']);

appState.computed('isDarkMode', (state) => {
    return state.theme === 'dark';
}, ['theme']);

// Test the state manager
console.log('Testing State Manager:');

appState.setState({ isLoading: true });
appState.toggle('showModal');
appState.setState({ 
    isAuthenticated: true, 
    user: { name: 'John Doe', id: 1 }
});

appState.batch(state => ({
    count: state.count + 5,
    theme: state.theme === 'light' ? 'dark' : 'light'
}));

console.log('Final State:', appState.getState());
```

### Feature Flags System

```javascript
class FeatureFlagManager {
    constructor() {
        this.flags = new Map();
        this.conditions = new Map();
        this.listeners = new Map();
        this.context = {};
    }
    
    // Define feature flag
    defineFlag(name, defaultValue = false, description = '') {
        this.flags.set(name, {
            name,
            defaultValue,
            currentValue: defaultValue,
            description,
            enabled: defaultValue,
            conditions: [],
            createdAt: new Date(),
            lastUpdated: new Date()
        });
        
        return this;
    }
    
    // Set flag value
    setFlag(name, value, reason = '') {
        const flag = this.flags.get(name);
        if (!flag) {
            throw new Error(`Feature flag '${name}' not found`);
        }
        
        const oldValue = flag.enabled;
        flag.enabled = Boolean(value);
        flag.currentValue = value;
        flag.lastUpdated = new Date();
        
        this.notifyFlagChange(name, flag.enabled, oldValue, reason);
        
        return this;
    }
    
    // Add condition-based flag
    addCondition(flagName, conditionName, conditionFunction) {
        const flag = this.flags.get(flagName);
        if (!flag) {
            throw new Error(`Feature flag '${flagName}' not found`);
        }
        
        this.conditions.set(`${flagName}:${conditionName}`, conditionFunction);
        flag.conditions.push(conditionName);
        
        return this;
    }
    
    // Check if flag is enabled
    isEnabled(name, context = {}) {
        const flag = this.flags.get(name);
        if (!flag) {
            console.warn(`Feature flag '${name}' not found, returning false`);
            return false;
        }
        
        // Start với base flag value
        let enabled = flag.enabled;
        
        // Apply conditions
        for (const conditionName of flag.conditions) {
            const conditionKey = `${name}:${conditionName}`;
            const condition = this.conditions.get(conditionKey);
            
            if (condition) {
                const conditionResult = condition({ ...this.context, ...context });
                enabled = enabled && conditionResult;
            }
        }
        
        return enabled;
    }
    
    // Bulk check multiple flags
    areEnabled(flagNames, context = {}) {
        const results = {};
        flagNames.forEach(name => {
            results[name] = this.isEnabled(name, context);
        });
        return results;
    }
    
    // Set global context
    setContext(context) {
        this.context = { ...this.context, ...context };
        
        // Re-evaluate all flags with conditions
        for (const [name, flag] of this.flags.entries()) {
            if (flag.conditions.length > 0) {
                const newEnabled = this.isEnabled(name);
                if (newEnabled !== flag.enabled) {
                    const oldValue = flag.enabled;
                    flag.enabled = newEnabled;
                    this.notifyFlagChange(name, newEnabled, oldValue, 'Context changed');
                }
            }
        }
        
        return this;
    }
    
    // Subscribe to flag changes
    onFlagChange(flagName, callback) {
        if (!this.listeners.has(flagName)) {
            this.listeners.set(flagName, new Set());
        }
        
        this.listeners.get(flagName).add(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(flagName);
            if (callbacks) {
                callbacks.delete(callback);
            }
        };
    }
    
    notifyFlagChange(flagName, newValue, oldValue, reason) {
        const callbacks = this.listeners.get(flagName);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(newValue, oldValue, flagName, reason);
                } catch (error) {
                    console.error(`Error in flag change listener for ${flagName}:`, error);
                }
            });
        }
    }
    
    // A/B Testing support
    setupABTest(flagName, variants = ['A', 'B'], distribution = [50, 50]) {
        this.defineFlag(flagName, false, `A/B Test: ${variants.join(' vs ')}`);
        
        this.addCondition(flagName, 'abtest', (context) => {
            const userId = context.userId || context.sessionId || 'anonymous';
            const hash = this.hashString(userId + flagName);
            const bucket = hash % 100;
            
            let threshold = 0;
            for (let i = 0; i < variants.length; i++) {
                threshold += distribution[i];
                if (bucket < threshold) {
                    context.variant = variants[i];
                    return i === 1; // Return true for variant B (index 1)
                }
            }
            
            return false;
        });
        
        return this;
    }
    
    // Simple hash function
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    
    // Export/Import flags configuration
    exportFlags() {
        const exported = {};
        for (const [name, flag] of this.flags.entries()) {
            exported[name] = {
                enabled: flag.enabled,
                description: flag.description,
                conditions: flag.conditions
            };
        }
        return exported;
    }
    
    importFlags(flagsConfig) {
        for (const [name, config] of Object.entries(flagsConfig)) {
            if (this.flags.has(name)) {
                this.setFlag(name, config.enabled, 'Imported from config');
            } else {
                this.defineFlag(name, config.enabled, config.description);
            }
        }
        return this;
    }
    
    // Debug helpers
    listFlags() {
        const flags = [];
        for (const [name, flag] of this.flags.entries()) {
            flags.push({
                name,
                enabled: flag.enabled,
                description: flag.description,
                conditions: flag.conditions,
                lastUpdated: flag.lastUpdated
            });
        }
        return flags;
    }
    
    debugFlag(name, context = {}) {
        const flag = this.flags.get(name);
        if (!flag) return null;
        
        console.group(`Feature Flag Debug: ${name}`);
        console.log('Base Flag:', flag);
        console.log('Context:', { ...this.context, ...context });
        console.log('Final Enabled:', this.isEnabled(name, context));
        
        for (const conditionName of flag.conditions) {
            const conditionKey = `${name}:${conditionName}`;
            const condition = this.conditions.get(conditionKey);
            if (condition) {
                console.log(`Condition ${conditionName}:`, condition({ ...this.context, ...context }));
            }
        }
        
        console.groupEnd();
    }
}

// Setup feature flags
const featureFlags = new FeatureFlagManager();

// Define các feature flags
featureFlags
    .defineFlag('newDashboard', false, 'New dashboard design')
    .defineFlag('betaFeatures', false, 'Beta features access')
    .defineFlag('darkMode', true, 'Dark mode support')
    .defineFlag('advancedAnalytics', false, 'Advanced analytics dashboard')
    .setupABTest('newCheckoutFlow', ['old', 'new'], [70, 30]);

// Add conditions
featureFlags.addCondition('betaFeatures', 'isPremiumUser', (context) => {
    return context.userPlan === 'premium' || context.userPlan === 'enterprise';
});

featureFlags.addCondition('advancedAnalytics', 'isAdmin', (context) => {
    return context.userRole === 'admin' || context.userRole === 'analyst';
});

featureFlags.addCondition('newDashboard', 'rollout', (context) => {
    // Gradual rollout: 20% của users
    const hash = featureFlags.hashString(context.userId || 'anonymous');
    return (hash % 100) < 20;
});

// Subscribe to changes
featureFlags.onFlagChange('darkMode', (enabled, wasEnabled) => {
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('darkMode', enabled);
});

// Set user context
featureFlags.setContext({
    userId: '12345',
    userRole: 'admin',
    userPlan: 'premium'
});

// Test flags
console.log('Feature Flags Test:');
console.log('New Dashboard:', featureFlags.isEnabled('newDashboard'));
console.log('Beta Features:', featureFlags.isEnabled('betaFeatures'));
console.log('Advanced Analytics:', featureFlags.isEnabled('advancedAnalytics'));

// Bulk check
console.log('All flags:', featureFlags.areEnabled([
    'newDashboard', 
    'betaFeatures', 
    'darkMode', 
    'advancedAnalytics'
]));
```

## 3. UI State và Conditional Rendering

### UI Component State Manager

```javascript
class UIComponentState {
    constructor(element) {
        this.element = element;
        this.state = {
            visible: true,
            enabled: true,
            loading: false,
            selected: false,
            expanded: false,
            focused: false,
            dirty: false,
            valid: null
        };
        this.animations = new Map();
        this.observers = new Set();
    }
    
    // Update state và trigger UI changes
    setState(newState, options = {}) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        // Apply visual changes
        this.updateClasses(oldState);
        this.updateAttributes(oldState);
        this.updateStyles(oldState);
        
        // Trigger animations if specified
        if (options.animate) {
            this.animate(options.animate, oldState);
        }
        
        // Notify observers
        this.notifyObservers(oldState, this.state);
        
        return this;
    }
    
    updateClasses(oldState) {
        const element = this.element;
        
        // Visibility
        if (this.state.visible !== oldState.visible) {
            element.classList.toggle('hidden', !this.state.visible);
            element.classList.toggle('visible', this.state.visible);
        }
        
        // Enabled/Disabled
        if (this.state.enabled !== oldState.enabled) {
            element.classList.toggle('disabled', !this.state.enabled);
            element.classList.toggle('enabled', this.state.enabled);
        }
        
        // Loading state
        if (this.state.loading !== oldState.loading) {
            element.classList.toggle('loading', this.state.loading);
        }
        
        // Selection state
        if (this.state.selected !== oldState.selected) {
            element.classList.toggle('selected', this.state.selected);
        }
        
        // Expanded state
        if (this.state.expanded !== oldState.expanded) {
            element.classList.toggle('expanded', this.state.expanded);
            element.classList.toggle('collapsed', !this.state.expanded);
        }
        
        // Focus state
        if (this.state.focused !== oldState.focused) {
            element.classList.toggle('focused', this.state.focused);
        }
        
        // Validation state
        if (this.state.valid !== oldState.valid) {
            element.classList.remove('valid', 'invalid');
            if (this.state.valid === true) {
                element.classList.add('valid');
            } else if (this.state.valid === false) {
                element.classList.add('invalid');
            }
        }
        
        // Dirty state
        if (this.state.dirty !== oldState.dirty) {
            element.classList.toggle('dirty', this.state.dirty);
        }
    }
    
    updateAttributes(oldState) {
        const element = this.element;
        
        // ARIA attributes
        if (this.state.visible !== oldState.visible) {
            element.setAttribute('aria-hidden', !this.state.visible);
        }
        
        if (this.state.enabled !== oldState.enabled) {
            element.setAttribute('aria-disabled', !this.state.enabled);
            if (element.tagName === 'BUTTON' || element.tagName === 'INPUT') {
                element.disabled = !this.state.enabled;
            }
        }
        
        if (this.state.selected !== oldState.selected) {
            element.setAttribute('aria-selected', this.state.selected);
        }
        
        if (this.state.expanded !== oldState.expanded) {
            element.setAttribute('aria-expanded', this.state.expanded);
        }
        
        if (this.state.valid !== oldState.valid) {
            if (this.state.valid !== null) {
                element.setAttribute('aria-invalid', !this.state.valid);
            } else {
                element.removeAttribute('aria-invalid');
            }
        }
    }
    
    updateStyles(oldState) {
        const element = this.element;
        
        // Visibility với transition
        if (this.state.visible !== oldState.visible) {
            if (this.state.visible) {
                element.style.display = '';
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                });
            } else {
                element.style.opacity = '0';
                setTimeout(() => {
                    if (!this.state.visible) {
                        element.style.display = 'none';
                    }
                }, 300);
            }
        }
        
        // Loading cursor
        if (this.state.loading !== oldState.loading) {
            element.style.cursor = this.state.loading ? 'wait' : '';
        }
    }
    
    animate(animationType, oldState) {
        // Cancel previous animations
        if (this.animations.has(animationType)) {
            this.animations.get(animationType).cancel();
        }
        
        let animation;
        
        switch (animationType) {
            case 'fadeIn':
                animation = this.element.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], { duration: 300, easing: 'ease-out' });
                break;
                
            case 'fadeOut':
                animation = this.element.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], { duration: 300, easing: 'ease-in' });
                break;
                
            case 'slideDown':
                const height = this.element.scrollHeight;
                animation = this.element.animate([
                    { height: '0px', overflow: 'hidden' },
                    { height: `${height}px`, overflow: 'hidden' }
                ], { duration: 400, easing: 'ease-out' });
                break;
                
            case 'slideUp':
                animation = this.element.animate([
                    { height: `${this.element.scrollHeight}px`, overflow: 'hidden' },
                    { height: '0px', overflow: 'hidden' }
                ], { duration: 400, easing: 'ease-in' });
                break;
                
            case 'pulse':
                animation = this.element.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.05)' },
                    { transform: 'scale(1)' }
                ], { duration: 600, easing: 'ease-in-out' });
                break;
        }
        
        if (animation) {
            this.animations.set(animationType, animation);
            animation.onfinish = () => {
                this.animations.delete(animationType);
            };
        }
    }
    
    // Observer pattern
    addObserver(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }
    
    notifyObservers(oldState, newState) {
        this.observers.forEach(callback => {
            try {
                callback(newState, oldState, this.element);
            } catch (error) {
                console.error('Observer error:', error);
            }
        });
    }
    
    // Convenience methods
    show(animate = false) {
        return this.setState({ visible: true }, { 
            animate: animate ? 'fadeIn' : null 
        });
    }
    
    hide(animate = false) {
        return this.setState({ visible: false }, { 
            animate: animate ? 'fadeOut' : null 
        });
    }
    
    enable() {
        return this.setState({ enabled: true });
    }
    
    disable() {
        return this.setState({ enabled: false });
    }
    
    startLoading() {
        return this.setState({ loading: true });
    }
    
    stopLoading() {
        return this.setState({ loading: false });
    }
    
    select() {
        return this.setState({ selected: true });
    }
    
    deselect() {
        return this.setState({ selected: false });
    }
    
    expand(animate = false) {
        return this.setState({ expanded: true }, {
            animate: animate ? 'slideDown' : null
        });
    }
    
    collapse(animate = false) {
        return this.setState({ expanded: false }, {
            animate: animate ? 'slideUp' : null
        });
    }
    
    toggle(property = 'visible', animate = false) {
        const newState = { [property]: !this.state[property] };
        
        let animationType = null;
        if (animate && property === 'visible') {
            animationType = newState[property] ? 'fadeIn' : 'fadeOut';
        } else if (animate && property === 'expanded') {
            animationType = newState[property] ? 'slideDown' : 'slideUp';
        }
        
        return this.setState(newState, { animate: animationType });
    }
    
    setValid(isValid) {
        return this.setState({ valid: isValid });
    }
    
    markDirty() {
        return this.setState({ dirty: true });
    }
    
    markClean() {
        return this.setState({ dirty: false });
    }
    
    // Batch state updates
    batch(updates, options = {}) {
        return this.setState(updates, options);
    }
    
    // Get current state
    getState(key) {
        return key ? this.state[key] : { ...this.state };
    }
    
    // Check state conditions
    is(property) {
        return Boolean(this.state[property]);
    }
    
    isNot(property) {
        return !Boolean(this.state[property]);
    }
    
    // State queries
    isVisible() { return this.state.visible; }
    isEnabled() { return this.state.enabled; }
    isLoading() { return this.state.loading; }
    isSelected() { return this.state.selected; }
    isExpanded() { return this.state.expanded; }
    isFocused() { return this.state.focused; }
    isDirty() { return this.state.dirty; }
    isValid() { return this.state.valid === true; }
    isInvalid() { return this.state.valid === false; }
}

// Factory function để create UI state managers
function createUIState(element) {
    return new UIComponentState(element);
}

// Example usage (conceptual - requires DOM elements)
/*
// Create button state manager
const button = document.querySelector('#myButton');
const buttonState = createUIState(button);

// Setup state observers
buttonState.addObserver((newState, oldState) => {
    console.log('Button state changed:', { old: oldState, new: newState });
});

// Control button state
buttonState.startLoading();
setTimeout(() => {
    buttonState.stopLoading();
    buttonState.setValid(true);
}, 2000);

// Toggle with animation
buttonState.toggle('expanded', true);

// Batch updates
buttonState.batch({
    visible: true,
    enabled: true,
    selected: true
}, { animate: 'pulse' });
*/
```

## 4. Tóm Tắt

### Boolean Applications trong thực tế:

| Use Case | Key Patterns | Benefits |
|----------|-------------|----------|
| **Form Validation** | Guard clauses, early returns | Clear error handling, better UX |
| **State Management** | Flags, toggles, computed properties | Predictable state changes |
| **Feature Flags** | Conditional logic, A/B testing | Safe deployments, gradual rollouts |
| **UI State** | Class toggling, attribute management | Responsive, accessible interfaces |

### Best Practices tổng hợp:

1. **🎯 Use meaningful boolean names**
   ```javascript
   // ✅ Clear intent
   const isUserLoggedIn = checkAuthStatus();
   const hasPermission = user.permissions.includes('admin');
   
   // ❌ Unclear
   const flag = true;
   const check = user.something;
   ```

2. **🔒 Implement proper validation**
   ```javascript
   // ✅ Comprehensive validation
   function validateForm(data) {
       const errors = [];
       
       if (!data.email?.trim()) errors.push('Email required');
       if (!isValidEmail(data.email)) errors.push('Invalid email');
       
       return { isValid: errors.length === 0, errors };
   }
   ```

3. **⚡ Use feature flags for safe deployments**
   ```javascript
   // ✅ Safe feature rollout
   if (featureFlags.isEnabled('newFeature', { userId })) {
       return renderNewVersion();
   }
   return renderOldVersion();
   ```

4. **🎨 Manage UI state effectively**
   ```javascript
   // ✅ Centralized UI state management
   const modal = createUIState(modalElement);
   modal.show(true); // with animation
   modal.addObserver(trackModalUsage);
   ```

5. **🧹 Keep boolean logic simple**
   ```javascript
   // ✅ Easy to understand
   const canEdit = isOwner && isActive && !isArchived;
   
   // ❌ Too complex
   const canEdit = ((user.id === item.ownerId && user.status === 'active') || user.role === 'admin') && item.status !== 'archived' && !item.locked;
   ```

Boolean applications là core của interactive applications. Master các patterns này sẽ giúp bạn build các ứng dụng robust và user-friendly!
