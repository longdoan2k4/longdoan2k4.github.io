---
slug: unity-animation-walk-idle-tutorial
url: /posts/unity-animation-walk-idle-tutorial/
title: "Unity Game Cơ Bản - Bài 02: Animation Walk, Idle và Lật Hướng"
date: 2025-10-21T09:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo animation cho nhân vật, thiết lập Animator Controller và xử lý logic lật sprite khi di chuyển"
---

# Unity Game Cơ Bản - Bài 02: Animation Walk, Idle và Lật Hướng

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ hai này, chúng ta sẽ học cách tạo animation cho nhân vật, thiết lập system chuyển đổi trạng thái, và xử lý logic lật sprite khi nhân vật quay đầu.

## Video Hướng Dẫn

{{< youtube swCFvAxYKBE >}}

## Ôn Tập Bài Trước

Trong **Bài 01**, chúng ta đã:
- ✅ Thiết lập project Unity 2D
- ✅ Import sprite assets
- ✅ Tạo chuyển động cơ bản cho Player
- ✅ Viết script PlayerMovement

## Bước 1: Tạo Animation Idle

### 1.1. Mở Animation Window
```
Window → Animation → Animation
```

### 1.2. Tạo animation Idle
1. **Chọn Player GameObject** trong Hierarchy
2. **Click Create** trong Animation window
3. **Đặt tên:** `Player_Idle.anim`
4. **Lưu vào thư mục:** `Assets/Animations/`

### 1.3. Thiết lập keyframes cho Idle
```
Timeline: 0:00 - 1:30 (khoảng 30 frames)
Sprites: Sử dụng 6 frame đầu từ sprite sheet (tư thế đứng yên)
```

**Các bước thực hiện:**
1. Kéo **6 sprites đầu** (idle frames) vào timeline
2. **Kéo giãn frames** để tạo animation mượt mà
3. **Thêm frame đầu vào cuối** để tạo loop hoàn hảo

## Bước 2: Tạo Animation Walk

### 2.1. Tạo animation mới
1. Trong Animation window, click **dropdown** bên cạnh tên animation
2. Chọn **Create New Clip**
3. Đặt tên: `Player_Walk.anim`

### 2.2. Thiết lập keyframes cho Walk
```
Timeline: 0:00 - 1:00 (khoảng 20 frames)
Sprites: Sử dụng 6 frame tiếp theo (animation đi bộ)
```

**Tip quan trọng:**
> Luôn thêm frame đầu vào cuối animation để tránh hiện tượng giật khi loop

## Bước 3: Thiết Lập Animator Controller

### 3.1. Mở Animator Window
```
Window → Animation → Animator
```

### 3.2. Cấu hình States
- **Idle State:** Màu cam (default state)
- **Walk State:** Màu xám

### 3.3. Tạo Parameters
Thêm các parameters sau:
```csharp
// Float parameters
horizontal (Float) = 0
vertical (Float) = 0
```

### 3.4. Thiết lập Transitions

#### Transition: Idle → Walk
```
Conditions:
- horizontal > 0.1 OR vertical > 0.1

Settings:
- Has Exit Time: false
- Transition Duration: 0
```

#### Transition: Walk → Idle
```
Conditions:
- horizontal < 0.1 AND vertical < 0.1

Settings:
- Has Exit Time: false
- Transition Duration: 0
```

## Bước 4: Cập Nhật Script PlayerMovement

### 4.1. Thêm Animator reference
```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour 
{
    [Header("Movement Settings")]
    public float speed = 5f;
    
    [Header("Animation")]
    public Animator anim;
    
    private Rigidbody2D rb;
    private Vector2 movement;
    private int facingDirection = 1; // 1 = phải, -1 = trái

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        if (anim == null)
            anim = GetComponent<Animator>();
    }
```

### 4.2. Cập nhật hàm Update và FixedUpdate
```csharp
    void Update()
    {
        // Đọc input
        movement.x = Input.GetAxis("Horizontal");
        movement.y = Input.GetAxis("Vertical");
        
        // Cập nhật animation parameters
        anim.SetFloat("horizontal", Mathf.Abs(movement.x));
        anim.SetFloat("vertical", Mathf.Abs(movement.y));
        
        // Xử lý lật sprite
        HandleSpriteFlip();
    }

    void FixedUpdate()
    {
        // Di chuyển nhân vật
        rb.velocity = movement * speed;
    }
```

## Bước 5: Xử Lý Lật Sprite

### 5.1. Thêm hàm HandleSpriteFlip
```csharp
    void HandleSpriteFlip()
    {
        // Kiểm tra hướng di chuyển theo trục X
        if ((movement.x > 0 && transform.localScale.x < 0) || 
            (movement.x < 0 && transform.localScale.x > 0))
        {
            Flip();
        }
    }
```

### 5.2. Thêm hàm Flip
```csharp
    void Flip()
    {
        // Đổi hướng
        facingDirection *= -1;
        
        // Lật sprite bằng cách thay đổi scale
        Vector3 scale = transform.localScale;
        scale.x *= -1;
        transform.localScale = scale;
    }
```

## Bước 6: Gắn Components và Test

### 6.1. Gắn Animator vào script
1. Chọn **Player** trong Hierarchy
2. Trong **PlayerMovement component**, kéo **Animator** vào field **Anim**

### 6.2. Kiểm tra hoạt động
1. **Click Play**
2. **Di chuyển bằng WASD:**
   - Đứng yên → **Idle animation**
   - Di chuyển → **Walk animation**
   - Sang trái/phải → **Sprite lật hướng**

## Troubleshooting

### Lỗi thường gặp:
```
❌ Animation không chuyển đổi
→ Kiểm tra Has Exit Time = false

❌ Sprite lật liên tục
→ Đảm bảo logic trong HandleSpriteFlip() chính xác

❌ Animation bị lag
→ Đặt Transition Duration = 0
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Tạo Animation clips** cho Idle và Walk  
✅ **Sử dụng Animation Window** hiệu quả  
✅ **Thiết lập Animator Controller** với states và transitions  
✅ **Tạo Parameters** và điều kiện chuyển đổi  
✅ **Cập nhật script** để điều khiển animation  
✅ **Xử lý lật sprite** khi thay đổi hướng  
✅ **Khái niệm facingDirection** cho các tính năng sau  

## Bài Tập Thực Hành

1. **Thêm animation Attack:** Tạo animation tấn công đơn giản
2. **Smooth transition:** Thử điều chỉnh Transition Duration để tạo hiệu ứng mượt mà
3. **Animation speed:** Thay đổi tốc độ animation dựa trên tốc độ di chuyển

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 03**, chúng ta sẽ học:
- Thiết lập **Tilemap** cho bản đồ game
- Tạo **collision layers** 
- Xây dựng **level design** đầu tiên

## Lưu Ý Quan Trọng

> **Performance tip:** Sử dụng `Mathf.Abs()` để đảm bảo giá trị parameters luôn dương

> **Animation loop:** Luôn thêm frame đầu vào cuối để tạo loop mượt mà

> **FacingDirection:** Biến này sẽ được sử dụng nhiều ở các bài sau (combat, interaction)

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*