---
slug: javascript-essentials-2-module-3-object-oriented-principles
url: /posts/javascript-essentials-2-module-3-object-oriented-principles/
title: "JavaScript Essentials 2 - Module 3: Nguyên lý lập trình hướng đối tượng (OOP Principles)"
date: 2025-10-23T11:20:00+07:00
draft: false
categories: ["javascript essentials 2"]
description: "Tìm hiểu các nguyên lý OOP: đóng gói, kế thừa, đa hình, trừu tượng trong JavaScript."
---

# JavaScript Essentials 2 - Module 3: Nguyên lý lập trình hướng đối tượng (OOP Principles)

Module này giúp bạn hiểu rõ các nguyên lý cơ bản của lập trình hướng đối tượng (OOP) và cách áp dụng chúng trong JavaScript.

---

## 1. Đóng gói (Encapsulation)
```javascript
class BankAccount {
  #balance = 0; // Thuộc tính private
  constructor(owner) {
    this.owner = owner;
  }
  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
const acc = new BankAccount("Long");
acc.deposit(1000);
console.log(acc.getBalance()); // 1000
```

## 2. Kế thừa (Inheritance)
```javascript
class Animal {
  speak() {
    console.log("Animal sound");
  }
}
class Dog extends Animal {
  speak() {
    console.log("Gâu gâu!");
  }
}
const dog = new Dog();
dog.speak(); // "Gâu gâu!"
```

## 3. Đa hình (Polymorphism)
```javascript
function makeSound(animal) {
  animal.speak();
}
const a = new Animal();
const d = new Dog();
makeSound(a); // "Animal sound"
makeSound(d); // "Gâu gâu!"
```

## 4. Trừu tượng (Abstraction)
- JavaScript không có abstract class như Java/C#, nhưng có thể mô phỏng bằng cách tạo class cha với phương thức chưa triển khai:
```javascript
class Shape {
  area() {
    throw new Error("Phải override method area()");
  }
}
class Square extends Shape {
  constructor(size) {
    super();
    this.size = size;
  }
  area() {
    return this.size * this.size;
  }
}
const sq = new Square(4);
console.log(sq.area()); // 16
```

## 5. Ứng dụng thực tế
- Xây dựng hệ thống phân quyền (User, Admin, Guest...)
- Mô hình hóa các thực thể trong game, phần mềm quản lý...
- Tăng khả năng mở rộng, bảo trì code

## 6. Bài tập gợi ý
1. Viết class Vehicle với phương thức move(), tạo class Car kế thừa Vehicle và override move().
2. Tạo class Employee với thuộc tính private, phương thức getter/setter.
3. Mô phỏng abstract class bằng cách tạo class cha có phương thức chưa triển khai, class con override lại.

---

*Bài viết thuộc series **JavaScript Essentials 2**, biên soạn dựa trên nội dung học tập của chương trình **Cisco Networking Academy**.*
