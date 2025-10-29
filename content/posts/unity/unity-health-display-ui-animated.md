---
slug: unity-health-display-ui-animated
url: /posts/unity-health-display-ui-animated/
title: "Unity Game Cơ Bản - Bài 07: Tạo Health Display UI hoạt họa"
date: 2025-10-21T17:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Tạo UI hiển thị máu dạng số với TextMeshPro và hiệu ứng hoạt họa khi bị sát thương trong Unity 2D RPG"
---

# Unity Game Cơ Bản - Bài 07: Tạo Health Display UI hoạt họa

Chào mừng các bạn quay lại series Unity Game cơ bản! Trong bài thứ bảy này, chúng ta sẽ làm UI hiển thị máu dạng số cho player bằng TextMeshPro, kèm hiệu ứng hoạt họa (scale) mỗi khi bị mất máu — giúp game sinh động và dễ đọc trạng thái nguy hiểm.

## Video hướng dẫn

Nguồn: NightRun Studio  
{{< youtube "4ot2shmElAQ" >}}

## Ôn Tập Các Bài Trước

- Bài 01: Thiết lập project, chuyển động cơ bản  
- Bài 02: Animation walk/idle, lật hướng  
- Bài 03: Tilemap và thiết kế map  
- Bài 04: Camera, Cinemachine  
- Bài 05: Enemy AI, di chuyển  
- Bài 06: Hệ thống máu, gây sát thương  
- Bài 07: 🎨 Health Display UI hoạt họa (bài này)

## Chuẩn Bị Trước Khi Bắt Đầu

Yêu cầu:
- Project Unity với hệ Health đã làm ở bài trước
- Player có script `PlayerHealth.cs`
- Có sẵn UI Canvas trong scene (nếu chưa có sẽ tạo mới)

---

## Bước 1: Tạo Health UI Canvas và Image

1) Tạo UI Canvas nếu chưa có:
- Chuột phải trong Hierarchy → UI → Canvas
- Đổi tên Canvas thành `PlayerUI`

2) Thêm Image để làm khung UI máu:
- Chuột phải `PlayerUI` → UI → Image
- Đổi tên thành `HealthUI`
- Chỉnh Anchor lên góc trái trên
- Điều chỉnh vị trí (Pos X/Y) và kích thước (ví dụ 800x400)
- Đổi Sprite Image sang banner phù hợp (có thể dùng từ asset pack)

3) Setup Canvas Scaler:
- Chọn `PlayerUI`
- Canvas Scaler → Mode: `Scale With Screen Size`
- Reference Resolution: `1920 x 1080`
- Đảm bảo UI luôn giữ tỷ lệ tốt trên mọi màn hình

---

## Bước 2: Thêm Text hiển thị HP

- Chuột phải `HealthUI` → UI → `TextMeshPro - Text`
- Nếu chưa có TextMeshPro, cài đặt qua Unity Package Manager
- Đặt tên: `HPText`
- Nội dung mẫu: `HP 100/100`
- Anchor preset → Stretch toàn khung image
- Chỉnh màu, font (gợi ý: Bangers), kích cỡ, căn giữa; có thể thêm bóng (Shadow/Underlay)

---

## Bước 3: Kết nối PlayerHealth.cs với Text

Import TextMeshPro và thêm tham chiếu trong `PlayerHealth.cs`:

```csharp
using TMPro; // Thêm ở đầu file

public class PlayerHealth : MonoBehaviour
{
    [Header("Health Settings")]
    public int currentHealth = 100;
    public int maxHealth = 100;

    [Header("UI References")]
    public TMP_Text healthText; // Kéo thả HPText vào đây trong Inspector

    void Start()
    {
        currentHealth = maxHealth;
        UpdateHealthUI();
    }

    public void ChangeHealth(int amount)
    {
        currentHealth += amount;
        currentHealth = Mathf.Clamp(currentHealth, 0, maxHealth);

        UpdateHealthUI();

        if (currentHealth <= 0)
        {
            Die();
        }
    }

    private void UpdateHealthUI()
    {
        if (healthText != null)
        {
            healthText.text = $"HP {currentHealth}/{maxHealth}";
        }
    }

    private void Die()
    {
        // Logic chết
    }
}
```

Trong Inspector, kéo `HPText` vào trường `healthText` của `PlayerHealth`.

---

## Bước 4: Tạo Animation khi bị sát thương

Tạo animation cho `HPText` bằng cửa sổ Animation:

1) Chọn `HPText` → `Window → Animation` → `Create Animation...`
- Đặt tên: `TextUpdate.anim` (lưu vào thư mục `Animations/`)

2) Keyframes scale:
- Frame 0: `scale = (1, 1, 1)`
- Frame 5: `scale = (1.3, 1.3, 1)`
- Frame 10: `scale = (1, 1, 1)`

3) Bỏ chọn `Loop Time` để clip chỉ chạy 1 lần mỗi khi phát

4) Tạo `Animator Controller` cho `HPText` nếu chưa có, gồm 2 state:
- `Idle` (default)
- `TextUpdate` (gán clip vừa tạo)

5) Tạo transition `TextUpdate → Idle` để tự trở về sau khi anim xong.

---

## Bước 5: Trigger Animation khi đổi máu

Thêm biến `Animator` và phát clip trong `ChangeHealth`:

```csharp
using TMPro;
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    [Header("Health Settings")]
    public int currentHealth = 100;
    public int maxHealth = 100;

    [Header("UI References")]
    public TMP_Text healthText;
    public Animator healthTextAnim; // Kéo Animator của HPText vào đây

    void Start()
    {
        currentHealth = maxHealth;
        UpdateHealthUI();
    }

    public void ChangeHealth(int amount)
    {
        currentHealth += amount;
        currentHealth = Mathf.Clamp(currentHealth, 0, maxHealth);

        UpdateHealthUI();

        // Phát animation mỗi lần HP thay đổi
        if (healthTextAnim != null)
        {
            healthTextAnim.Play("TextUpdate", 0, 0f);
        }

        if (currentHealth <= 0)
        {
            Die();
        }
    }

    private void UpdateHealthUI()
    {
        if (healthText != null)
        {
            healthText.text = $"HP {currentHealth}/{maxHealth}";
        }
    }

    private void Die()
    {
        Debug.Log("Player Died!");
        gameObject.SetActive(false);
    }
}
```

Lưu ý: Tên state `"TextUpdate"` phải khớp với state trong Animator của `HPText`.

Trong Inspector, kéo thả `Animator` của `HPText` vào trường `healthTextAnim`.

---

## Tích Hợp & Kiểm Tra

- Đảm bảo TextMeshPro đã import, `HPText` và `Animator` đã gắn đúng vào `PlayerHealth`
- Vào Play Mode: mỗi lần player mất máu, số HP giảm và Text co giãn mượt mà

---

## Tổng Kết

- Tạo UI thanh máu số rõ nét và đẹp với TextMeshPro  
- Tích hợp động với hệ máu đã xây dựng  
- Bổ sung hiệu ứng hoạt họa cho text, giúp game sinh động  
- Dễ dàng mở rộng sang các dạng khác: slider, hearts...

## Bài Tiếp Theo

Bài 08: Hệ thống Enemy Chase và phạm vi phát hiện Player (Aggro)
- Cho enemy phát hiện, đuổi theo player theo phạm vi  
- Ứng dụng trong gameplay và AI nâng cao

---

**📚 Series Unity Game Cơ Bản:**
- Bài 01: Thiết lập project và chuyển động cơ bản
- Bài 02: Animation Walk, Idle và lật hướng
- Bài 03: Sử dụng Tilemap để tạo bản đồ
- Bài 04: Camera Follow và Cinemachine
- Bài 05: Enemy AI và Basic Movement
- Bài 06: Hệ thống máu và gây sát thương
- **Bài 07: Health Display UI hoạt họa** ← Hiện tại
