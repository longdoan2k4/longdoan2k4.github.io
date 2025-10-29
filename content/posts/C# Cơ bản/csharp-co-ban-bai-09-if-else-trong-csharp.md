---
slug: cs-if-else
url: /posts/cs-if-else/
title: "C# Cơ Bản - Bài 09: If else trong C#"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Hướng dẫn chi tiết về câu lệnh rẽ nhánh if else trong C#: cú pháp, dạng thiếu và đủ, cách lồng ghép, ví dụ thực tiễn, so sánh với toán tử ba ngôi, các lưu ý khi dùng. Bám sát nội dung video Kteam."
---

# C# Cơ Bản - Bài 09: If else trong C#

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube O3ijcGpEgSY >}}

---

## 1. Cấu trúc rẽ nhánh là gì? Khi nào dùng if else?
- Cấu trúc rẽ nhánh (if else) là công cụ quyết định luồng thực thi dựa trên điều kiện đúng/sai.
- Dùng khi chương trình cần chọn lựa, kiểm tra điều kiện, quyết định nhánh code thực hiện.

---

## 2. Cú pháp if else dạng thiếu (if đơn)
```csharp
if (biểu_thức_điều_kiện)
{
    // Khối lệnh thực thi khi điều kiện đúng
}
```
Nếu điều kiện đúng, khối lệnh trong ngoặc được thực hiện. Nếu sai, trong dạng thiếu sẽ bỏ qua.

---

## 3. Cú pháp if else dạng đủ (if...else)
```csharp
if (biểu_thức_điều_kiện)
{
    // Thực hiện khi điều kiện đúng
}
else
{
    // Thực hiện khi điều kiện sai
}
```

---

## 4. Lồng ghép nhiều if else
Có thể lồng nhiều if else hoặc dùng else if để kiểm tra nhiều trường hợp liên tiếp:
```csharp
if (a > 0)
{
    Console.WriteLine("a là số dương");
}
else if (a < 0)
{
    Console.WriteLine("a là số âm");
}
else
{
    Console.WriteLine("a = 0");
}
```

---

## 5. So sánh toán tử ba ngôi với if else
Nếu chỉ có 2 ngả đơn giản, có thể dùng toán tử ba ngôi để rút gọn cú pháp:
```csharp
string kq = (a % 2 == 0) ? "Chẵn" : "Lẻ";
```
Nếu cần nhiều nhánh, thực hiện nhiều lệnh hoặc điều kiện phức tạp, nên dùng if else cho trực quan, rõ ràng.

---

## 6. Một số ví dụ thực tế
Giải phương trình bậc nhất ax+b=0 dùng if else kiểm tra:
```csharp
if (a == 0)
{
    if (b == 0)
        Console.WriteLine("Phương trình vô số nghiệm");
    else
        Console.WriteLine("Phương trình vô nghiệm");
}
else
{
    double x = -b / a;
    Console.WriteLine("Nghiệm của phương trình là x = " + x);
}
```

---

## Tổng kết
- Hiểu bản chất, nắm vững cú pháp, thực hành nhiều dạng nhánh if else giúp xử lý mọi điều kiện rẽ nhánh trong C#.
- So sánh và phân biệt khi nào nên dùng if else khi nào dùng toán tử ba ngôi giúp code rõ ràng, ngắn gọn hơn.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 9: If else trong C# | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
