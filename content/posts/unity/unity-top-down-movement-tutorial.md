---
slug: unity-top-down-movement-tutorial
url: /posts/unity-top-down-movement-tutorial/
title: "Unity Game Cơ Bản - Bài 01: Tạo Chuyển Động Top-down"
date: 2025-10-21T08:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn thiết lập dự án Unity và tạo chuyển động nhân vật theo cơ chế top-down cho game Action RPG"
---

# Unity Game Cơ Bản - Bài 01: Tạo Chuyển Động Top-down

Chào mừng các bạn đến với series Unity Game cơ bản! Trong bài đầu tiên này, chúng ta sẽ học cách thiết lập dự án Unity và tạo chuyển động nhân vật theo cơ chế top-down - kiểu chuyển động phổ biến trong các game RPG như Zelda.

## Video Hướng Dẫn

{{< youtube xZe8m2ujoig >}}

## Chuẩn Bị Trước Khi Bắt Đầu

### Yêu cầu hệ thống:
- **Unity Hub** (phiên bản mới nhất)
- **Unity Editor** (khuyến nghị Unity 2022.3 LTS trở lên)
- **Visual Studio** hoặc **VS Code** để viết code C#

### Tài nguyên cần thiết:
- Asset **PixelFrog "Tiny Swords"** (miễn phí): https://pixelfrog-assets.itch.io/tiny-swords

## Bước 1: Tạo Dự Án Unity Mới

### 1.1. Khởi tạo project
```
1. Mở Unity Hub
2. Click "New Project"
3. Chọn template "2D Built-in Render Pipeline"
4. Đặt tên project: "RPG_Tutorial"
5. Click "Create"
```

### 1.2. Tổ chức thư mục
```
Assets/
├── Scenes/
├── Sprites/
├── Scripts/
└── Prefabs/
```

## Bước 2: Import và Chuẩn Bị Sprite

### 2.1. Thêm asset vào project
1. Tải asset **Tiny Swords** từ link trên
2. Kéo file **Warrior Blue.png** vào thư mục **Assets/Sprites**
3. Chọn sprite trong Project panel

### 2.2. Cấu hình sprite settings
```
Sprite Mode: Multiple
Pixels Per Unit: 100
Filter Mode: Point (no filter)
Format: 32-bit
```

### 2.3. Cắt sprite sheet
1. Click **Sprite Editor**
2. Chọn **Slice → Grid by Cell Size**
3. Nhập kích thước: **92x92 pixels**
4. Click **Slice** và **Apply**

## Bước 3: Thiết Lập Nhân Vật

### 3.1. Tạo Player GameObject
1. Kéo sprite đầu tiên vào **Scene**
2. Đặt tên: **Player**
3. Đặt position: **(0, 0, 0)**

### 3.2. Thêm Physics Components
```csharp
// Thêm các component sau vào Player:
- Rigidbody2D
- Capsule Collider 2D
```

### 3.3. Cấu hình Rigidbody2D
```
Gravity Scale: 0
Freeze Rotation: Z = true
```

## Bước 4: Viết Script Di Chuyển

### 4.1. Tạo script PlayerMovement
Tạo file **PlayerMovement.cs** trong thư mục **Scripts**:

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour 
{
    [Header("Movement Settings")]
    public float speed = 5f;
    
    private Rigidbody2D rb;
    private Vector2 movement;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        // Đọc input từ bàn phím
        movement.x = Input.GetAxis("Horizontal");
        movement.y = Input.GetAxis("Vertical");
    }

    void FixedUpdate()
    {
        // Di chuyển nhân vật
        rb.velocity = movement * speed;
    }
}
```

### 4.2. Gắn script vào Player
1. Chọn **Player** trong Hierarchy
2. Kéo script **PlayerMovement** vào Player
3. Đặt **Speed = 5**

## Bước 5: Kiểm Tra và Tinh Chỉnh

### 5.1. Test chuyển động
1. Click **Play** trong Unity
2. Sử dụng phím **WASD** hoặc **Arrow Keys** để di chuyển
3. Nhân vật sẽ di chuyển mượt mà theo 8 hướng

### 5.2. Troubleshooting
Nếu gặp lỗi Input System:
```
File → Build Settings → Player Settings
→ Configuration → Active Input Handling
→ Chọn "Input Manager (Old)"
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Thiết lập project Unity 2D**  
✅ **Import và cấu hình sprite assets**  
✅ **Sử dụng Sprite Editor**  
✅ **Thêm Physics components**  
✅ **Viết script C# cơ bản**  
✅ **Sử dụng Input System**  
✅ **Khái niệm FixedUpdate vs Update**  

## Bài Tập Thực Hành

1. **Thử nghiệm tốc độ:** Thay đổi giá trị `speed` và quan sát sự khác biệt
2. **Giới hạn vùng di chuyển:** Thêm code để nhân vật không di chuyển ra ngoài màn hình
3. **Smooth movement:** Thử sử dụng `Vector2.Lerp()` để tạo chuyển động mượt mà hơn

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 02**, chúng ta sẽ học:
- Tạo **Animation** cho nhân vật
- Thiết lập **Animator Controller**
- Chuyển đổi giữa các trạng thái **Idle** và **Walk**

## Lưu Ý Quan Trọng

> **Unity 6+:** Nếu bạn sử dụng Unity 6 trở lên, thay `rb.velocity` bằng `rb.linearVelocity`

> **Performance:** Luôn sử dụng `FixedUpdate()` cho physics và `Update()` cho input

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*