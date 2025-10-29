---
slug: javascript-essentials-2-module-6-object-utility-methods
url: /posts/javascript-essentials-2-module-6-object-utility-methods/
title: "JavaScript Essentials 2 - Module 6: Các phương thức tiện ích của đối tượng (Object Utility Methods)"
date: 2025-10-23T11:50:00+07:00
draft: false
categories: ["javascript essentials 2"]
description: "Tìm hiểu các phương thức tiện ích như Object.keys, Object.values, Object.entries, assign, freeze, seal... trong JavaScript."
---

# JavaScript Essentials 2 - Module 6: Các phương thức tiện ích của đối tượng (Object Utility Methods)

Module này giúp bạn nắm vững các phương thức tiện ích thường dùng với đối tượng trong JavaScript.

---

## 1. Object.keys(), Object.values(), Object.entries()
```javascript
const user = { name: "Long", age: 25 };
console.log(Object.keys(user));   // ["name", "age"]
console.log(Object.values(user)); // ["Long", 25]
console.log(Object.entries(user)); // [["name", "Long"], ["age", 25]]
```

## 2. Object.assign()
```javascript
const a = { x: 1 };
const b = { y: 2 };
const c = Object.assign({}, a, b);
console.log(c); // { x: 1, y: 2 }
```

## 3. Object.freeze() và Object.seal()
```javascript
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // Không thay đổi được
console.log(obj.a); // 1

const obj2 = { b: 1 };
Object.seal(obj2);
obj2.b = 2; // Được phép
console.log(obj2.b); // 2
```

## 4. Object.hasOwnProperty()
```javascript
const person = { name: "Long" };
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age"));  // false
```

## 5. Object.create() và Object.getPrototypeOf()
```javascript
const proto = { greet() { return "Hi"; } };
const obj = Object.create(proto);
console.log(obj.greet()); // "Hi"
console.log(Object.getPrototypeOf(obj) === proto); // true
```

## 6. Bài tập gợi ý
1. Viết hàm trả về tất cả key của một object.
2. Sử dụng Object.assign để gộp nhiều object.
3. Đóng băng một object và thử thay đổi thuộc tính của nó.

---

*Bài viết thuộc series **JavaScript Essentials 2**, biên soạn dựa trên nội dung học tập của chương trình **Cisco Networking Academy**.*
