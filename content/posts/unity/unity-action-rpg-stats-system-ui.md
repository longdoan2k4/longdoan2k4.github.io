---
slug: unity-action-rpg-stats-system-ui
url: /posts/unity-action-rpg-stats-system-ui/
title: "Unity Game Cơ Bản - Bài 16: Tạo UI hiển thị Stats"
date: 2025-10-22T19:10:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo UI hiển thị trực quan các chỉ số stats (damage, health, speed...) cho nhân vật trong Unity Action RPG. Liên kết code với UI để cập nhật tự động khi stats đổi."
---

# Unity Game Cơ Bản - Bài 16: Tạo UI hiển thị Stats

Stats đã tổ chức tốt, nhưng game phải hiển thị lên màn hình để người chơi thấy, theo dõi, biết mình mạnh yếu thế nào! Bài này hướng dẫn cách tạo giao diện UI đẹp, tự động cập nhật stats qua code, chuẩn bị cho phần nâng cấp stats sau này.

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "VCTOC6-P_yk" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Đã có hệ StatsManager từ bài trước
- Đã setup Canvas UI cơ bản trong scene
- Có cài đặt TextMeshPro cho Unity project

---

## Bước 1: Thiết Kế UI Stats

- Hierarchy > Canvas > Create Panel
- Đặt tên “StatsPanel”. Chỉnh anchor bottom hoặc bên góc tuỳ ý.
- Thêm các ô TextMeshPro cho từng stat:
  - Chuột phải StatsPanel > UI > TextMeshPro
  - Đặt tên theo từng chỉ số: “DamageText”, “SpeedText”, “MaxHealthText”...
  - Format font, màu, size tuỳ ý cho dễ nhìn.
  - Căn lề, chia cột nếu có nhiều stats.

---

## Bước 2: Script Kết Nối StatsManager với UI

`StatsUI.cs`

```csharp
using UnityEngine;
using TMPro;
public class StatsUI : MonoBehaviour
{
    public TMP_Text damageText;
    public TMP_Text speedText;
    public TMP_Text maxHealthText;

    void Start()
    {
        UpdateStatsUI();
    }
    public void UpdateStatsUI()
    {
        damageText.text = $"Damage: {StatsManager.instance.damage}";
        speedText.text = $"Speed: {StatsManager.instance.speed}";
        maxHealthText.text = $"Max Health: {StatsManager.instance.maxHealth}";
        // Thêm các chỉ số khác nếu có thêm
    }
}
```

Gán đúng các trường TMP_Text trong Inspector.

---

## Bước 3: Tự Động Cập Nhật Stats Khi Thay Đổi

Khi stats thay đổi qua code (người chơi lên cấp, dùng item...), gọi `UpdateStatsUI()` để cập nhật lên màn hình.

Ví dụ:

```csharp
StatsManager.instance.damage += 1;
FindObjectOfType<StatsUI>().UpdateStatsUI();
```

---

## Bước 4: Tinh Chỉnh UI

- Sắp xếp stats đẹp, phân nhóm rõ ràng
- Thêm biểu tượng từng chỉ số (icon), màu cho chỉ số tăng/giảm
- Cho phép thu gọn, mở rộng panel UI khi cần

---

## Tổng Kết

- Stats hiển thị rõ ràng trên giao diện UI
- Code kết nối tự động, luôn đồng bộ
- Chuẩn bị cho các tính năng nâng cấp, phát triển về sau

## Bài Tiếp Theo

**Bài 17:** Kết nối UI và StatsManager để pause game, điều chỉnh stats runtime!

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*