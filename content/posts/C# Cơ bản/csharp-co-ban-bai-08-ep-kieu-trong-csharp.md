---
slug: cs-casting
url: /posts/cs-casting/
title: "C# Cơ Bản - Bài 08: Ép kiểu trong C#"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Tìm hiểu chi tiết về ép kiểu trong C#: khái niệm, phân loại, cú pháp, ví dụ thực tế, lưu ý và video nguồn từ Kteam."
---

# C# Cơ Bản - Bài 08: Ép kiểu trong C#

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube YmF2kTg0ajU >}}

---

## 1. Ép kiểu là gì? Tại sao phải ép kiểu?
- Ép kiểu là biến đổi dữ liệu từ kiểu này sang kiểu khác.
- Thường dùng khi cần chuyển kiểu dữ liệu nhập vào (thường là string) thành số, float, hoặc các kiểu mong muốn, phục vụ tính toán/chuyển định dạng.

---

## 2. Phân loại ép kiểu trong C#
### Chuyển đổi ngầm định (implicit casting)
- Chuyển từ kiểu nhỏ sang lớn (int sang long, float sang double).
```csharp
int a = 10;
long l = a; // Tự động chuyển, không cần thao tác
```

### Chuyển đổi tường minh (explicit casting)
- Dùng cú pháp `((<Kiểu dữ liệu>)<biến>)`
```csharp
double d = 9.5;
int i = (int)d; // Kết quả là 9, phần thập phân bị loại bỏ
```

### Dùng phương thức hỗ trợ: Parse, TryParse, Convert
```csharp
int k = int.Parse("10");
double dd;
bool success = double.TryParse("10.5", out dd);
int kk = Convert.ToInt32("9");
```

### Người dùng tự định nghĩa kiểu chuyển đổi
- Thường áp dụng khi lập trình nâng cao với class, sẽ học trong bài object/class.

---

## 3. Ví dụ sử dụng ép kiểu
### Chuyển đổi giữa kiểu giá trị
```csharp
int x = 300;
byte y = (byte)x; // Giá trị bị cắt (chỉ còn phần vừa với kiểu byte, ví dụ 300 -> 44)
```

### Chuyển string sang số dùng Parse/TryParse
```csharp
string s = "12";
int num = int.Parse(s); // num = 12
double d; 
bool parseOk = double.TryParse("4.5", out d); // d = 4.5 nếu thành công
```

### Chuyển kiểu khi tính toán
```csharp
int a = 5, b = 2;
double c = (double)a / b; // c = 2.5 nhờ ép kiểu
```

---

## 4. Một số lưu ý
- Sai kiểu (ví dụ ép kiểu base khi string không đúng định dạng) sẽ sinh lỗi, nên dùng TryParse để an toàn cho chương trình thực tế.
- Khi cần chuyển kiểu dữ liệu nhập vào từ bàn phím thành số để tính toán luôn phải ép kiểu.
- Cẩn thận khi chuyển kiểu nhỏ sang kiểu lớn (OK), nhưng chuyển lớn sang nhỏ thì giá trị có thể bị mất.

---

## Tổng kết
- Hiểu rõ về 4 loại ép kiểu: ngầm định, tường minh, dùng phương thức hỗ trợ, tự định nghĩa kiểu chuyển đổi.
- Nắm cú pháp, ví dụ và ứng dụng thực tế cho bài toán thực hành Console Application.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 8: Ép kiểu trong C# | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
