---
slug: cs-basic-data-types
url: /posts/cs-basic-data-types/
title: "C# Cơ Bản - Bài 05: Kiểu dữ liệu trong C#"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Bài học chi tiết về kiểu dữ liệu trong C#: khái niệm, phân loại, bảng minh hoạ, ví dụ thực tế, lỗi thường gặp và video nguồn từ Kteam."
---

# C# Cơ Bản - Bài 05: Kiểu dữ liệu trong C#

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube yrH7Qe8FXqE >}}

---

## 1. Kiểu dữ liệu là gì? Tại sao phải có kiểu dữ liệu?
- Kiểu dữ liệu là tập hợp các nhóm dữ liệu có cùng đặc tính, cách lưu trữ và thao tác xử lý.
- Quy định kích thước vùng nhớ, khả năng quản lý dữ liệu cho biến.
- Là thành phần cốt lõi của mọi ngôn ngữ lập trình – giúp phân loại, kiểm soát và bảo mật dữ liệu.

**Ví dụ:**
```csharp
int tuoi = 20; // int: số nguyên
string ten = "Kteam"; // string: chuỗi ký tự
```

---

## 2. Phân loại kiểu dữ liệu trong C#
- **Kiểu dữ liệu dựng sẵn:** int, long, float, string, bool, char, double, byte, short...
- **Kiểu dữ liệu do người dùng định nghĩa:** struct, enum, object, dynamic, class...

### Phân loại theo cách lưu trữ:
- **Kiểu giá trị (value type):** chứa giá trị trực tiếp – lưu trên stack. (int, float, double, bool, char, struct, enum)
- **Kiểu tham chiếu (reference type):** lưu địa chỉ trên stack, dữ liệu thực trên heap. (string, object, class, array, dynamic)

**Bảng phân biệt:**
| Kiểu dữ liệu | Value/Reference | Miền giá trị | Kích thước (byte) |
|-------------|----------------|--------------|-------------------|
| byte        | Value          | 0 – 255      | 1                 |
| int         | Value          | -2^31 – 2^31-1 | 4               |
| long        | Value          | rất lớn      | 8                 |
| float       | Value          | ~±1.5e−45 – ±3.4e38 | 4         |
| double      | Value          | ~±5e−324 – ±1.7e308 | 8         |
| decimal     | Value          | ~±1.0 × 10^−28 – ±7.9 × 10^28 | 16 |
| char        | Value          | Unicode      | 2                 |
| bool        | Value          | true/false   | 1                 |
| string      | Reference      | Chuỗi ký tự  | tuỳ độ dài        |
| object      | Reference      | Mọi kiểu     | tuỳ đối tượng     |

---

## 3. Ý nghĩa từng kiểu dữ liệu và bảng minh hoạ
- **Số nguyên:** byte, short, int, long (dùng cho số nguyên, tuỳ kích thước)
- **Số thực:** float, double, decimal (dùng cho số có phần thập phân, decimal cho độ chính xác cao)
- **Ký tự:** char (lưu 1 ký tự Unicode)
- **Logic:** bool (true/false)
- **Chuỗi:** string (chuỗi ký tự)

**Ví dụ minh hoạ:**
```csharp
byte aByte = 10;        // Kiểu số nguyên nhỏ
int anInt = 200;        // Kiểu số nguyên chuẩn
float aFloat = 6.9f;    // Kiểu số thực, hậu tố 'f'
double aDouble = 9.5;   // Số thực lớn
char aChar = 'A';       // Ký tự
string aStr = "Hello"; // Chuỗi ký tự
bool isPassed = true;   // Logic đúng/sai
decimal aDec = 14.5m;   // Số thực chính xác, hậu tố 'm'
```

---

## 4. Một số lưu ý khi sử dụng kiểu dữ liệu
- Giá trị kiểu char: nằm trong dấu nháy đơn, string thì nháy kép.
- Giá trị float/decimal phải có hậu tố (f/m).
- Các biến kiểu giá trị (int, byte, short…) có miền giá trị lớn hơn sẽ chứa được kiểu nhỏ hơn.
- Kiểu tham chiếu (string, object, dynamic…) lưu địa chỉ trên stack, đối tượng trên heap.
- Các biến cần khai báo và gán giá trị trước khi sử dụng.
- C# phân biệt chữ hoa – thường.

**Ví dụ lỗi thường gặp:**
```csharp
int x = "abc"; // Sai kiểu dữ liệu
float y = 5.5;  // Thiếu hậu tố 'f'
char c = "A";   // Sai dấu nháy
```

---

## 5. Minh hoạ lỗi thường gặp với kiểu dữ liệu
- Gán sai vùng giá trị cho kiểu dữ liệu (vượt phạm vi lưu trữ).
- Sử dụng giá trị kiểu dữ liệu không đúng với cú pháp: thiếu dấu nháy, thiếu hậu tố, chưa khởi tạo giá trị...
- Gán null cho kiểu giá trị mà không cho phép.

**Ví dụ:**
```csharp
byte b = 300; // Lỗi: vượt phạm vi byte (0-255)
int i;
Console.WriteLine(i); // Lỗi: chưa khởi tạo giá trị
```

---

## 6. So sánh value type và reference type
| Đặc điểm | Value Type | Reference Type |
|----------|------------|---------------|
| Lưu trữ  | Stack      | Stack (địa chỉ), Heap (dữ liệu) |
| Gán biến | Sao chép giá trị | Sao chép địa chỉ |
| Null     | Không cho phép (trừ nullable) | Cho phép |
| Ví dụ    | int, float, bool | string, object, array |

**Ví dụ minh hoạ:**
```csharp
int a = 5;
int b = a;
b = 10;
Console.WriteLine(a); // 5 (value type: a không đổi)

string s1 = "abc";
string s2 = s1;
s2 = "xyz";
Console.WriteLine(s1); // "abc" (reference type: s1 không đổi, nhưng cả hai trỏ cùng vùng nhớ ban đầu)
```

---

## 7. Tổng kết
- Nắm rõ các kiểu dữ liệu, phân loại value/reference.
- Biết quy tắc khai báo, khởi tạo giá trị, vùng nhớ stack/heap, các lỗi cơ bản trong thực tế.
- Thực hành nhiều với các kiểu dữ liệu để chọn đúng kiểu phù hợp bài toán.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 5: Kiểu dữ liệu trong C# | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
