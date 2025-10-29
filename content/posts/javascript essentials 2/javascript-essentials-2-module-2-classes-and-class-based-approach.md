---
slug: javascript-essentials-2-module-2-classes-and-class-based-approach
url: /posts/javascript-essentials-2-module-2-classes-and-class-based-approach/
title: "JavaScript Essentials 2 - Module 2: Lớp và phương pháp dựa trên lớp (Classes and Class-Based Approach)"
date: 2025-10-23T11:10:00+07:00
draft: false
categories: ["javascript essentials 2"]
description: "Tìm hiểu về class, constructor, phương thức, kế thừa và ứng dụng class trong JavaScript hiện đại."
---

# JavaScript Essentials 2 - Module 2: Lớp và phương pháp dựa trên lớp (Classes and Class-Based Approach)

Module này giúp bạn hiểu về cú pháp class trong JavaScript, cách tạo đối tượng bằng class, kế thừa, và ứng dụng thực tế.



## 1. Định nghĩa class và constructor
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Xin chào, tôi là ${this.name}`);
  }
}

const long = new Person("Long", 25);
long.greet(); // "Xin chào, tôi là Long"
```

## 2. Kế thừa (Inheritance)
```javascript
class Student extends Person {
  constructor(name, age, studentId) {
    super(name, age);
    this.studentId = studentId;
  }
  showId() {
    console.log(`Mã SV: ${this.studentId}`);
  }
}

const sv = new Student("Minh", 20, "SV001");
sv.greet();   // "Xin chào, tôi là Minh"
sv.showId();  // "Mã SV: SV001"
```

## 3. Phương thức tĩnh (static)
```javascript
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtil.add(2, 3)); // 5
```

## 4. Getter/Setter
```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get area() {
    return this.width * this.height;
  }
}
const rect = new Rectangle(4, 5);
console.log(rect.area); // 20
```

## 5. Ứng dụng thực tế
- Xây dựng mô hình dữ liệu phức tạp (User, Product, Order...)
- Tái sử dụng code qua kế thừa
- Tổ chức code rõ ràng, dễ bảo trì

## 6. Bài tập gợi ý
1. Tạo class Book với các thuộc tính title, author, year và phương thức showInfo().
2. Tạo class Animal và class Dog kế thừa Animal, thêm phương thức sủa.
3. Viết class Calculator với các phương thức cộng, trừ, nhân, chia (dùng static).

---

*Bài viết thuộc series **JavaScript Essentials 2**, biên soạn dựa trên nội dung học tập của chương trình **Cisco Networking Academy** và nguồn video từ freeCodeCamp.org.*
