---
slug: javascript-essentials-2-module-4-advanced-class-features
url: /posts/javascript-essentials-2-module-4-advanced-class-features/
title: "JavaScript Essentials 2 - Module 4: Các tính năng nâng cao của class (Advanced Class Features)"
date: 2025-10-23T11:30:00+07:00
draft: false
categories: ["javascript essentials 2"]
description: "Khám phá các tính năng nâng cao của class trong JavaScript: private, protected, static, getter/setter, mixin, và hơn thế nữa."
---

# JavaScript Essentials 2 - Module 4: Các tính năng nâng cao của class (Advanced Class Features)

Module này giúp bạn hiểu và áp dụng các tính năng nâng cao của class trong JavaScript hiện đại.

---

## 1. Thuộc tính và phương thức private
```javascript
class Counter {
  #count = 0; // Thuộc tính private
  increment() {
    this.#count++;
  }
  get value() {
    return this.#count;
  }
}
const c = new Counter();
c.increment();
console.log(c.value); // 1
```

## 2. Getter và Setter
```javascript
class User {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    if (newName.length > 0) this._name = newName;
  }
}
const u = new User("Long");
u.name = "Minh";
console.log(u.name); // "Minh"
```

## 3. Static property và method
```javascript
class MathHelper {
  static PI = 3.14159;
  static square(x) {
    return x * x;
  }
}
console.log(MathHelper.PI); // 3.14159
console.log(MathHelper.square(5)); // 25
```

## 4. Mixin pattern
```javascript
let sayHi = {
  sayHi() {
    console.log("Hi!");
  }
};
let sayBye = {
  sayBye() {
    console.log("Bye!");
  }
};
class Person {}
Object.assign(Person.prototype, sayHi, sayBye);
const p = new Person();
p.sayHi(); // "Hi!"
p.sayBye(); // "Bye!"
```

## 5. Class Expression & Anonymous Class
```javascript
const MyClass = class {
  hello() {
    return "Hello from anonymous class!";
  }
};
const obj = new MyClass();
console.log(obj.hello());
```

## 6. Bài tập gợi ý
1. Viết class Product với thuộc tính private, getter/setter cho giá.
2. Tạo class Shape với phương thức static tính diện tích hình tròn.
3. Áp dụng mixin để thêm phương thức mới cho class.

---

*Bài viết thuộc series **JavaScript Essentials 2**, biên soạn dựa trên nội dung học tập của chương trình **Cisco Networking Academy**.*
