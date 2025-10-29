---
slug: javascript-essentials-2-module-1-classless-objects
url: /posts/javascript-essentials-2-module-1-classless-objects/
title: "JavaScript Essentials 2 - Module 1: Đối tượng không lớp (Classless Objects)"
date: 2025-10-23T11:00:00+07:00
draft: false
categories: ["javascript essentials 2"]
description: "Tìm hiểu về đối tượng không lớp trong JavaScript, cách tạo, sử dụng và ứng dụng thực tế."
---

# JavaScript Essentials 2 - Module 1: Đối tượng không lớp (Classless Objects)

Trong module này, bạn sẽ tìm hiểu về khái niệm đối tượng không lớp trong JavaScript, cách tạo và sử dụng object literal, cũng như các ứng dụng thực tế.

---

## 1. Đối tượng không lớp là gì?
- JavaScript là ngôn ngữ hướng đối tượng nhưng không bắt buộc phải dùng class.
- Đối tượng có thể được tạo trực tiếp bằng cú pháp object literal (`{}`) mà không cần định nghĩa class.

### Ví dụ:
```javascript
const person = {
  name: "Long",
  age: 25,
  greet: function() {
    console.log(`Xin chào, tôi là ${this.name}`);
  }
};

person.greet(); // "Xin chào, tôi là Long"
```

## 2. Thêm/xoá/sửa thuộc tính động
```javascript
person.job = "Developer"; // Thêm thuộc tính
person.age = 26;           // Sửa thuộc tính
delete person.job;         // Xoá thuộc tính
```

## 3. Truy cập thuộc tính động
```javascript
const key = "name";
console.log(person[key]); // "Long"
```

## 4. Lặp qua thuộc tính đối tượng
```javascript
for (let prop in person) {
  console.log(prop, person[prop]);
}
```

## 5. Ứng dụng thực tế
- Lưu trữ cấu hình, dữ liệu động, map key-value.
- Truyền dữ liệu giữa các hàm mà không cần định nghĩa class.

## 6. Bài tập gợi ý
1. Tạo một object mô tả một cuốn sách (book) với các thuộc tính: title, author, year, và một phương thức hiển thị thông tin.
2. Viết hàm nhận vào một object bất kỳ và in ra tất cả key-value của nó.
3. Thêm thuộc tính động cho object và kiểm tra kết quả.

---

*Bài viết thuộc series **JavaScript Essentials 2**, biên soạn dựa trên nội dung học tập của chương trình **Cisco Networking Academy** và nguồn video từ Academind.*
