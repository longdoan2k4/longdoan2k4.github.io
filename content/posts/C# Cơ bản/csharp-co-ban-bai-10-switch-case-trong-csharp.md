---
slug: cs-switch-case
url: /posts/cs-switch-case/
title: "C# Cơ Bản - Bài 10: Switch case trong C#"
date: 2025-10-22T18:00:00+07:00
lastmod: 2025-10-23T12:00:00+07:00
draft: false
categories: ["c# cơ bản"]
description: "Giải thích chi tiết về cấu trúc nhánh switch case trong C#: cú pháp, phân loại, so sánh với if else, ví dụ thực tế, lưu ý khi sử dụng, chương trình minh hoạ, bám sát video Kteam."
---

# C# Cơ Bản - Bài 10: Switch case trong C#

## Video hướng dẫn
Nguồn: Kteam  
{{< youtube 0NYj4QkJx4U >}}

---

## 1. Switch case là gì?
- switch case là cấu trúc rẽ nhánh cho phép kiểm tra giá trị của một biểu thức với nhiều giá trị khác nhau.
- Giúp lựa chọn thực hiện các khối lệnh dựa vào từng giá trị cụ thể, làm code sáng rõ hơn thay vì nhiều if...else nối tiếp.

---

## 2. Cú pháp switch case
```csharp
switch (biểu_thức)
{
    case giá_trị_1:
        // Thực hiện nếu biểu_thức == giá_trị_1
        break;
    case giá_trị_2:
        // Thực hiện nếu biểu_thức == giá_trị_2
        break;
    ...
    default:
        // Thực hiện nếu không trùng bất kỳ giá trị nào ở trên
        break;
}
```

---

## 3. Lưu ý khi dùng switch case
- Biểu thức phải là kiểu số nguyên, ký tự (char), chuỗi (string), kiểu enum hoặc bool.
- Các trường hợp (case) phải có kiểu dữ liệu giống với biểu thức.
- Nên dùng lệnh break ở cuối mỗi case để kết thúc nhánh (tránh rơi qua case khác).
- Nếu không có trường hợp nào thỏa, block default sẽ được thực thi.

---

## 4. Ví dụ thực tế
```csharp
int k = 10;
switch (k)
{
    case 3:
        Console.WriteLine("How Kteam");
        break;
    case 9:
        Console.WriteLine("Kteam");
        break;
    case 10:
        Console.WriteLine("Free Education");
        break;
    default:
        Console.WriteLine("Không có giá trị phù hợp!");
        break;
}
```

---

## 5. Ứng dụng nâng cao - Ví dụ tính năm âm lịch từ năm dương lịch
Tính can chi dùng switch case để lấy phần dư của năm dương lịch chia cho 10 và 12, lặp ghép thành năm âm lịch.

---

## Tổng kết
- Switch case giúp code sáng rõ, giảm soạn nhiều if...else khi cần kiểm tra nhiều giá trị.
- Hiểu rõ cú pháp, ứng dụng và lưu ý để không bị lỗi trong chương trình thực tế.

---

**Nguồn:**  
Video Khóa học lập trình C# Cơ bản - Bài 10: Switch case trong C# | [Kênh Kteam](https://www.youtube.com/@KTeam)  
Website: [www.howkteam.com](https://www.howkteam.com)
