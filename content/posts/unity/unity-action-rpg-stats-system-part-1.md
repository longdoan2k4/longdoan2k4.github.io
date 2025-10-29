---
slug: unity-action-rpg-stats-system-part-1
url: /posts/unity-action-rpg-stats-system-part-1/
title: "Unity Game Cơ Bản - Bài 15: Xây Dựng Stats System (Phần I - Coding)"
date: 2025-10-22T19:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo central stats manager cho Action RPG: lưu trữ chỉ số (damage, range, speed, health, cooldown…), áp dụng Singleton pattern, giúp code dễ quản lý, mở rộng sau này."
---

# Unity Game Cơ Bản - Bài 15: Xây Dựng Stats System (Phần I - Coding)

Đã đến lúc nâng cấp hệ chỉ số của game: damage, range, speed, health, cooldown... cần đưa về 1 chỗ để dễ tổ chức, tinh chỉnh và mở rộng! Bài này hướng dẫn bạn tạo StatsManager dùng Singleton pattern cho dự án Unity Action RPG.

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "AheSE2wlavk" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Dự án đã có các scripts tách biệt cho Health, Movement, Combat,...
- Đã có các biến chỉ số rải rác nhiều script

---

## Bước 1: Tạo StatsManager Script Dùng Singleton

Tạo Empty GameObject tên “StatsManager” trong Hierarchy

Tạo Script `StatsManager.cs`

```csharp
using UnityEngine;

public class StatsManager : MonoBehaviour
{
    // Singleton Instance
    public static StatsManager instance;
    void Awake() {
        if (instance == null)
            instance = this;
        else Destroy(gameObject);
    }

    [Header("Combat Stats")]
    public int damage;
    public float weaponRange;
    public float knockbackForce;
    public float knockbackTime;
    public float stunTime;

    [Header("Movement Stats")]
    public int speed;

    [Header("Health Stats")]
    public int maxHealth;
    public int currentHealth;

    // Thêm các stats khác tuỳ game...
}
```

Chú ý: Dùng `[Header]` chia nhóm rõ trong Inspector, dễ quản lý khi project lớn.

---

## Bước 2: Truy Cập StatsManager Ở Script Khác

Xoá biến địa phương, sửa lại như sau:

```csharp
// Đổi: int damage = 2;
// Thành: int damage = StatsManager.instance.damage;
```

Ví dụ trong PlayerCombat, PlayerMovement, PlayerHealth,...

---

## Bước 3: Tìm & Thay Thế Toàn Bộ Stats ở Script

- Truy cập qua `StatsManager.instance.<stat>` thay vì biến cục bộ
- Update script cho player, enemy dùng đúng stats từ Manager

---

## Bước 4: Điều Chỉnh Trực Tiếp Stats Trong Inspector

- Khi game đang chạy, chỉnh số trong StatsManager Inspector sẽ hiệu lực ngay
- Giúp test nhanh, cân bằng giá trị chỉ số cho gameplay

---

## Tổng Kết

- Chuẩn hoá chỉ số game về 1 hệ thống tập trung
- Quản lý, mở rộng, chỉnh sửa stats dễ dàng và mượt
- Applic Singleton pattern cho dự án Unity

## Bài Tiếp Theo

**Bài 16:** Tạo UI hiển thị stats, liên kết code và UI cho hệ thống stats!

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*