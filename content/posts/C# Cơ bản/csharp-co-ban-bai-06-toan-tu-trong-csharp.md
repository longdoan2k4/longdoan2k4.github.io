---
slug: cs-operators
url: /posts/cs-operators/
title: "C# Cơ Bản - Bài 06: Toán tử trong C#"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Giới thiệu đầy đủ về toán tử trong C#, gồm các loại toán tử số học, logic, so sánh, gán, toán tử ba ngôi, toán tử trên bit, cú pháp, độ ưu tiên và ví dụ thực tế. Bám sát nội dung bài giảng HowKteam."
---

# C# Cơ Bản - Bài 06: Toán tử trong C#

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube niz7Gg8uB-k >}}

---

## 1. Toán tử là gì?
Toán tử là ký hiệu thao tác với dữ liệu. Là biểu diễn cho một phép toán hoặc thao tác cụ thể lên biến, dữ liệu.

---

## 2. Các loại toán tử trong C#
### Toán tử số học: `+`, `-`, `*`, `/`, `%`, `++`, `--`
```csharp
int a = 10, b = 9;
Console.WriteLine(a + b); // 19
Console.WriteLine(a % b); // 1 dư (10 % 9 = 1)
a++; // Tăng giá trị lên 1
b--; // Giảm giá trị đi 1
```

### Toán tử quan hệ: `==`, `!=`, `<`, `>`, `<=`, `>=`
```csharp
int x = 7;
bool check = (x == 7); // true
```

### Toán tử logic: `&&`, `||`, `!`
```csharp
bool A = true, B = false;
bool result = A && B; // false
```

### Toán tử gán: `=`, `+=`, `-=`, `*=`, `/=`
```csharp
int c = 5;
c += 3; // c = 8
```

### Toán tử ba ngôi: `?:` (ternary)
Cho phép rẽ nhánh nhanh:
```csharp
string result = (c % 2 == 0) ? "Số chẵn" : "Số lẻ";
```

### Toán tử trên bit: `&`, `|`, `^`, `<<`, `>>`
```csharp
int d = 5 << 1; // Dịch trái 1 bit, d = 10
```

### Một số toán tử khác: `sizeof`, `typeof`, `is`, `as`, `,`

---

## 3. Độ ưu tiên toán tử
- Độ ưu tiên xác định toán tử thực hiện trước khi có nhiều toán tử cùng xuất hiện.
- Ngoặc tròn `()` luôn ưu tiên thực hiện trước.
- Các toán tử nhân/chia/modulo (`*`, `/`, `%`) ưu tiên hơn cộng/trừ, các phép so sánh, logic...

**Bảng độ ưu tiên toán tử phổ biến:**
| Độ ưu tiên | Toán tử |
|------------|---------|
| Cao nhất   | ()      |
|            | ++, --  |
|            | *, /, % |
|            | +, -    |
|            | <, >, <=, >= |
|            | ==, !=  |
|            | &&      |
|            | ||      |
| Thấp nhất  | =, +=, -=, *=, /= |

---

## 4. Ví dụ minh hoạ
```csharp
int a = 10, b = 2;
int tong = a + b;         // 12
int tich = a * b;         // 20
int hieu = a - b;         // 8
int thuong = a / b;       // 5
bool laChan = (a % 2 == 0); // true

// Toán tử ba ngôi cho kiểm tra chẵn/lẻ
string info = (b % 2 == 0) ? "Số chẵn" : "Số lẻ";
```

---

## 5. Một số lưu ý khi dùng toán tử
- Không chia cho 0 (sẽ gây lỗi runtime).
- Toán tử ++/-- có thể dùng trước hoặc sau biến (prefix/postfix).
- Toán tử logic &&, || là short-circuit (nếu vế trái đủ điều kiện, vế phải không cần kiểm tra).
- Toán tử trên bit thường dùng cho xử lý nhị phân, bitmask.

---

## Tổng kết
- Hiểu, sử dụng đúng từng loại toán tử, cú pháp, độ ưu tiên trong xử lý giá trị và dữ liệu trên C#.
- Thực hành các ví dụ thực tế với phép toán số, logic, gán... để nắm chắc khái niệm và tính chất toán tử.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 6: Toán tử trong C# | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
