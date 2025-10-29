---
slug: cs-basic-command-structure
url: /posts/cs-basic-command-structure/
title: "C# Cơ Bản - Bài 02: Cấu Trúc Lệnh Cơ Bản"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Hướng dẫn đầy đủ về cấu trúc lệnh cơ bản trong C#, lấy nội dung, ví dụ code và video nguồn từ Kteam. Bạn sẽ hiểu rõ, dễ thực hành, và áp dụng cho quá trình học lập trình."
---

# C# Cơ Bản - Bài 02: Cấu Trúc Lệnh Cơ Bản

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube FhAIc0tlyaQ >}}

---

## Giới thiệu
Chào mừng bạn quay lại series khóa học lập trình C# cơ bản cùng Kteam! Bài này giúp bạn nắm chắc cấu trúc lệnh cơ bản—bước nền đầu tiên cho các chủ đề nâng cao sau này.

---

## Khái niệm & thành phần cấu trúc lệnh
Cấu trúc lệnh là quy tắc bắt buộc trong mọi chương trình C#, gồm: khai báo biến, câu lệnh điều kiện, vòng lặp, xuất/nhập dữ liệu. Mỗi câu lệnh kết thúc bằng dấu `;`.

**Lưu ý:** đặt tên biến phân biệt hoa/thường và nên thêm chú thích trong mã nguồn.

---

## Biến, kiểu dữ liệu, khởi tạo giá trị
```csharp
int tuoi = 20;
string ten = "An";
double diem = 9.5;
```

---

## Lệnh nhập xuất cơ bản
**Xuất dữ liệu:**
```csharp
Console.WriteLine("Hello World");
```
**Nhập dữ liệu từ bàn phím:**
```csharp
string hoTen = Console.ReadLine();
```

---

## Lệnh điều kiện: if/else
```csharp
int tuoi = 20;
if (tuoi >= 18)
{
    Console.WriteLine("Đã đủ tuổi trưởng thành");
}
else
{
    Console.WriteLine("Chưa đủ tuổi trưởng thành");
}
```

---

## Vòng lặp: for/while/do-while
```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Lần lặp thứ {i}");
}

// while
int i = 1;
while (i <= 5)
{
    Console.WriteLine($"Lần lặp thứ {i}");
    i++;
}

// do-while
i = 1;
do
{
    Console.WriteLine($"Lần lặp thứ {i}");
    i++;
} while (i <= 5);
```

---

## Chú thích mã nguồn
```csharp
// Đây là chú thích 1 dòng

/* Đây là
   chú thích nhiều dòng */
```

---

## Tổng kết
Nắm chắc về khai báo biến, nhập xuất, if/else, for-while-do, viết chú thích trong code.

Đây là nền móng cho các chương trình phức tạp hơn.

**Khuyến khích:** Xem lại video, tự thực hành code để hiểu sâu hơn.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 2: Cấu trúc lệnh cơ bản | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
