---
slug: cs-basic-input-output
url: /posts/cs-basic-input-output/
title: "C# Cơ Bản - Bài 03: Nhập Xuất Cơ Bản"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Bài học hướng dẫn chi tiết về lệnh nhập xuất trong C# Console Application, gồm các lệnh, cú pháp và ví dụ thực tế giúp bạn nắm vững nền tảng nhập xuất dữ liệu, thực hiện từ bàn phím và in ra màn hình."
---

# C# Cơ Bản - Bài 03: Nhập Xuất Cơ Bản

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube BAscPWPtCD8 >}}

---

## Giới thiệu
Chào bạn trở lại với series lập trình C# cơ bản! Bài này giúp bạn nắm chắc cách nhập – xuất dữ liệu trong Console Application.

---

## Cấu trúc và cú pháp các lệnh nhập xuất
**Xuất dữ liệu ra màn hình:**
- `Console.Write("...");` – In không xuống dòng
- `Console.WriteLine("...");` – In xong tự động xuống dòng

Có thể sử dụng chuỗi hoặc biến số, có thể cộng dồn, nối chuỗi với nhau.

```csharp
Console.WriteLine("Hello World");
int a = 5;
Console.WriteLine("a = " + a);
```

**Nhập dữ liệu từ bàn phím:**
- `Console.ReadLine();` – Đọc 1 dòng nhập từ bàn phím (kiểu string)
- `Console.Read();` – Đọc 1 ký tự (kiểu số nguyên mã ASCII)
- `Console.ReadKey();` – Đọc 1 phím nhấn, trả về thông tin phím và không trả về chuỗi nhập dài

Để lấy giá trị nhập, thường dùng biến gán:
```csharp
string hoten = Console.ReadLine();
```

---

## Một số ví dụ nhập xuất thực tế
```csharp
// Ví dụ xuất dữ liệu
Console.WriteLine("Nhập tên của bạn:");
string ten = Console.ReadLine();
Console.WriteLine("Tên của bạn là: " + ten);

// Xuất nhiều giá trị, nối chuỗi
int tuoi = 20;
Console.WriteLine("Bạn " + ten + " năm nay " + tuoi + " tuổi.");

// Đọc kí tự
Console.WriteLine("Nhấn một phím bất kỳ:");
var key = Console.ReadKey();
Console.WriteLine("\nPhím vừa nhập: " + key.KeyChar);
```

---

## Tổng kết
Phân biệt Write/WriteLine, các kiểu lệnh nhập xuất, sử dụng biến nhận dữ liệu từ bàn phím và in ra màn hình.

Hiểu được quy tắc nhập giá trị từ bàn phím, in ra các kiểu dữ liệu và ghép chuỗi linh hoạt.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 3: Nhập xuất cơ bản | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
