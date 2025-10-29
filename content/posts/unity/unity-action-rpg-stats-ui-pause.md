---
slug: unity-action-rpg-stats-ui-pause
url: /posts/unity-action-rpg-stats-ui-pause/
title: "Unity Game Cơ Bản - Bài 17: Kết Nối UI, Pause & Cập Nhật Stats Runtime"
date: 2025-10-22T19:20:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn kết nối UI stats với StatsManager, pause game bằng menu, cập nhật chỉ số runtime cho Unity Action RPG."
---

# Unity Game Cơ Bản - Bài 17: Kết Nối UI, Pause & Cập Nhật Stats Runtime

Tiếp nối hệ stats với UI, bài này giúp bạn hoàn thiện logic update stats tự động, pause game bằng menu, và cho phép chỉnh chỉ số ngay khi đang chơi.

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "8ojGRMOzXrQ" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Có StatsManager và UI hiển thị stats từ các bài trước
- Canvas chứa các slot stats, cài TextMeshPro đầy đủ

---

## Bước 1: Script Kết Nối UI & StatsManager

`StatsUI.cs` (mở rộng)

```csharp
using UnityEngine;
using TMPro;

public class StatsUI : MonoBehaviour
{
    public GameObject[] statSlots;
    public CanvasGroup statsCanvas;
    private bool statsOpen = false;

    void Start() {
        UpdateAllStats();
    }

    void Update() {
        if (Input.GetButtonDown("ToggleStats")) {
            if (statsOpen) {
                statsCanvas.alpha = 0f;
                statsOpen = false;
                Time.timeScale = 1f;
            } else {
                statsCanvas.alpha = 1f;
                statsOpen = true;
                Time.timeScale = 0f;
                UpdateAllStats();
            }
        }
    }

    public void UpdateDamage() {
        statSlots[0].GetComponentInChildren<TMP_Text>().text = $"Damage: {StatsManager.instance.damage}";
    }
    public void UpdateSpeed() {
        statSlots[1].GetComponentInChildren<TMP_Text>().text = $"Speed: {StatsManager.instance.speed}";
    }
    public void UpdateAllStats() {
        UpdateDamage();
        UpdateSpeed();
        // Thêm các chỉ số khác nếu cần
    }
}
```

- Gán CanvasGroup cho `statsCanvas` trong Inspector, mặc định alpha = 0 (ẩn bảng stats).

---

## Bước 2: Thêm Input ToggleStats

- Vào Project Settings > Input Manager
- Tạo Input mới: “ToggleStats”, gán phím Escape hoặc Tab làm nút bật/tắt menu stats.
- Thông qua check Input trong Update để mở menu + pause, đóng thì unpause.

---

## Bước 3: Tự Động Cập Nhật Stats Khi Thay Đổi

Khi script khác đổi stats, chỉ cần gọi:

```csharp
FindObjectOfType<StatsUI>().UpdateAllStats();
```

Ví dụ: player tăng damage khi dùng item, mỗi lần đổi vũ khí, v.v.

---

## Bước 4: Pause Khi Mở Menu Stats

- Khi mở menu, set `Time.timeScale = 0f;` để pause game, enemy ngừng di chuyển, mọi va chạm dừng lại.
- Khi đóng menu, trả về `Time.timeScale = 1f;` game chạy lại bình thường.

---

## Tổng Kết

- Stats UI tự động cập nhật chỉ số khi đổi
- Pause game dễ dàng bằng bật/tắt menu
- Tạo nền tảng cho các menu nâng cấp, chỉnh stats runtime
- Code gọn gàng, chia tách manager và UI rõ ràng

## Bài Tiếp Theo

**Bài 18:** Hệ thống tích lũy kinh nghiệm (EXP) và lên cấp, thanh kinh nghiệm slider!

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*