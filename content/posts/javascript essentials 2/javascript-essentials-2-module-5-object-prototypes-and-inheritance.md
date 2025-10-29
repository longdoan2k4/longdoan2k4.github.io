---
slug: javascript-essentials-2-module-5-object-prototypes-and-inheritance
url: /posts/javascript-essentials-2-module-5-object-prototypes-and-inheritance/
title: "JavaScript Essentials 2 - Module 5: Prototype và kế thừa nguyên mẫu (Object Prototypes and Inheritance)"
date: 2025-10-23T11:40:00+07:00
draft: false
categories: ["javascript essentials 2"]
description: "Tìm hiểu về prototype, chuỗi prototype, và cách kế thừa nguyên mẫu trong JavaScript."
---

# JavaScript Essentials 2 - Module 5: Prototype và kế thừa nguyên mẫu (Object Prototypes and Inheritance)

Module này giúp bạn hiểu rõ về prototype, chuỗi prototype, và cách kế thừa nguyên mẫu trong JavaScript.

---

## 1. Prototype là gì?
```javascript
const obj = { a: 1 };
console.log(Object.getPrototypeOf(obj)); // {}
```

## 2. Thêm phương thức vào prototype
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Xin chào, tôi là ${this.name}`);
};
const p = new Person("Long");
p.greet(); // "Xin chào, tôi là Long"
```

## 3. Chuỗi prototype (Prototype chain)
```javascript
console.log(p.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
```

## 4. Kế thừa nguyên mẫu (Prototype inheritance)
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(`${this.name} kêu!`);
};
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
  console.log(`${this.name} sủa!`);
};
const d = new Dog("Milo");
d.speak(); // "Milo sủa!"
```

## 5. Object.create()
```javascript
const animal = {
  speak() {
    console.log("Animal sound");
  }
};
const cat = Object.create(animal);
cat.speak(); // "Animal sound"
```

## 6. Bài tập gợi ý
1. Tạo constructor function Car, thêm phương thức start vào prototype.
2. Tạo chuỗi prototype giữa các đối tượng (ví dụ: Vehicle -> Car -> ElectricCar).
3. Sử dụng Object.create để tạo đối tượng kế thừa từ một prototype khác.

---

*Bài viết thuộc series **JavaScript Essentials 2**, biên soạn dựa trên nội dung học tập của chương trình **Cisco Networking Academy**.*
