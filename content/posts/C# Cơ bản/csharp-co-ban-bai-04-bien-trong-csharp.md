---
slug: cs-basic-variable
url: /posts/cs-basic-variable/
title: "C# Cơ Bản - Bài 04: Biến trong C#"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Bài học chi tiết về biến trong C#: khái niệm, cú pháp khai báo, quy tắc đặt tên, ví dụ minh hoạ và video nguồn từ Kteam."
---

# C# Cơ Bản - Bài 04: Biến trong C#

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube IEz7uMSHitM >}}

---

## 1. Biến là gì?
Biến là một giá trị dữ liệu có thể thay đổi trong quá trình chạy chương trình.

Là tên gọi tham chiếu đến vùng nhớ trong bộ nhớ máy tính.

Giúp lưu trữ cũng như tái sử dụng dữ liệu, thao tác linh hoạt hơn trong chương trình.

---

## 2. Khai báo và sử dụng biến
**Cú pháp khai báo:**
```csharp
<Kiểu dữ liệu> <Tên biến>;
<Kiểu dữ liệu> <Tên biến> = <Giá trị khởi tạo>;
```
**Ví dụ:**
```csharp
int a = 5;
string name = "Howkteam";
double diem = 9.5;
bool isPassed = true;
char kytu = 'C';
```
Để sử dụng biến, chỉ cần gọi tên biến đúng nơi khai báo.

Có thể gán lại giá trị mới cho biến sau khi đã khai báo.

---

## 3. Quy tắc đặt tên biến
- Tên biến phải là một chuỗi ký tự liên kết (không dấu cách, không ký tự đặc biệt).
- Không được đặt tên biến bằng tiếng Việt có dấu.
- Không bắt đầu bằng số, không trùng tên với từ khóa của C#.
- Có thể sử dụng quy tắc camelCase hoặc PascalCase tùy trường hợp.
- Nên đặt tên ngắn gọn, dễ hiểu, thể hiện rõ mục đích sử dụng.

---

## 4. Một số lưu ý khi làm việc với biến
- C# phân biệt chữ hoa - chữ thường đối với tên biến.
- Khuyến nghị dùng tên có ý nghĩa để đọc code dễ hiểu, dễ bảo trì.
- Không cần khai báo biến nếu không dùng tới để tránh lãng phí bộ nhớ.

---

## 5. Ví dụ minh hoạ
```csharp
int aNumber = 6;
int bNumber = 9;
int cNumber = aNumber + bNumber;
Console.WriteLine(aNumber + " + " + bNumber + " = " + cNumber); // 6 + 9 = 15
```

---

## Tổng kết
Nắm vững: Khái niệm biến, cú pháp khai báo, cách sử dụng và quy tắc đặt tên biến trong C#.

Đặt tên biến hợp lý giúp chương trình rõ ràng và dễ triển khai, bảo trì.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 4: Biến trong C# | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
