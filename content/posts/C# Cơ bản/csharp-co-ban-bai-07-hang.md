---
slug: cs-constant
url: /posts/cs-constant/
title: "C# Cơ Bản - Bài 07: Hằng"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Tìm hiểu khái niệm Hằng, cách khai báo và sử dụng Hằng (constant), ứng dụng, phân loại, ý nghĩa và ví dụ minh hoạ trong C#. Bám sát nội dung video Kteam."
---

# C# Cơ Bản - Bài 07: Hằng

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube 13NRSYgKh0o >}}

---

## 1. Hằng là gì?
- Hằng là một biến có giá trị không thay đổi xuyên suốt toàn bộ chương trình.
- Phải khởi tạo giá trị ngay khi khai báo, giá trị này không bao giờ thay đổi.
- Dùng để bảo vệ các giá trị "bất biến" quan trọng (số pi, điểm số cố định, cài đặt hệ thống...).

---

## 2. Tại sao phải dùng Hằng?
- Giúp bảo vệ giá trị quan trọng tránh bị thay đổi ngoài ý muốn (tự động, do người khác sửa code).
- Làm chương trình dễ đọc hơn, dễ sửa hơn, hạn chế lỗi, dễ nâng cấp.
- Đặt tên Hằng tăng ý nghĩa (không dùng số "magic number" mà đặt tên dễ hiểu).

---

## 3. Phân loại & cú pháp khai báo Hằng
**Khai báo hằng số:**
```csharp
const int MAX_SCORE = 100;
const double PI = 3.14159;
```
- Hằng phải khởi tạo ngay khi khai báo.
- Hằng có thể là số, chuỗi ký tự, kiểu dữ liệu bất kỳ, miễn giá trị không bị đổi.

---

## 4. Một số ví dụ sử dụng hằng
```csharp
const int SPEED_LIMIT = 60;
Console.WriteLine("Giới hạn tốc độ là: " + SPEED_LIMIT);

// Thử thay đổi sẽ báo lỗi
// SPEED_LIMIT = 80; // lỗi: Không thể gán lại giá trị cho Hằng!
```

---

## 5. Lưu ý khi dùng Hằng
- Không được gán giá trị của biến cho Hằng (phải là giá trị tĩnh, tính toán tại compile-time).
- Nếu muốn tạo hằng mà giá trị chỉ khởi tạo 1 lần nhưng có thể nhận từ constructor/class, dùng từ khoá `readonly` (bài sau sẽ nói chi tiết hơn).
- Hằng dùng `const` nằm trong class sẽ là hằng tĩnh (static) mặc định.
- Không dùng từ khoá `static` cùng với `const`.

---

## Tổng kết
- Hiểu bản chất Hằng, ứng dụng Hằng đúng cách – chương trình an toàn, rõ ràng và dễ bảo trì hơn.
- Luyện tập áp dụng hằng số thực tế thay cho các giá trị bất biến/cố định trong dự án!

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 7: Hằng | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
