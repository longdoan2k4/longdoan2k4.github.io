---
slug: unity-action-rpg-exp-slider-bar
url: /posts/unity-action-rpg-exp-slider-bar/
title: "Unity Game Cơ Bản - Bài 18: Hệ Thống Kinh Nghiệm & Level (EXP Slider Bar)"
date: 2025-10-22T19:30:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Tạo thanh slider kinh nghiệm cho UI, code hệ nhận exp, thăng cấp tự động, áp dụng Observer gửi thông điệp khi lên cấp trong Unity Action RPG."
---

# Unity Game Cơ Bản - Bài 18: Hệ Thống Kinh Nghiệm & Level (EXP Slider Bar)

Hệ EXP và lên level là “xương sống” RPG! Bài này hướng dẫn bạn tạo thanh slider kinh nghiệm cho UI, code hệ nhận exp, thăng cấp tự động và áp dụng Observer gửi thông điệp khi lên cấp.

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "l6-nlk3njv4" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Có UI Canvas và hệ StatsManager
- Đã dùng Observer Pattern cho message sự kiện
- EnemyHealth có rewardExp mỗi lần chết

---

## Bước 1: Tạo UI Slider Thanh Kinh Nghiệm

- Hierarchy > Canvas > UI > Slider (đặt tên expSlider)
- Bỏ handle/interactable để chỉ là progress bar
- Đặt TextMeshPro phía trên/giữa slider để hiển thị level hiện tại

---

## Bước 2: Script Experience Manager quản lý EXP & Level

`ExperienceManager.cs`

```csharp
using UnityEngine;
using TMPro;
using UnityEngine.UI;

public class ExperienceManager : MonoBehaviour
{
    public int level = 0;
    public int currentExp = 0;
    public int expToLevel = 10;
    public float expGrowthMultiplier = 1.2f;

    public Slider expSlider;
    public TMP_Text levelText;

    void Start()
    {
        UpdateUI();
    }

    public void GainExp(int amount) {
        currentExp += amount;
        while (currentExp >= expToLevel) {
            currentExp -= expToLevel;
            LevelUp();
        }
        UpdateUI();
    }

    void LevelUp() {
        level++;
        expToLevel = Mathf.RoundToInt(expToLevel * expGrowthMultiplier);
        // Gọi sự kiện, trigger lên cấp animation, particle, v.v.
    }

    void UpdateUI() {
        expSlider.maxValue = expToLevel;
        expSlider.value = currentExp;
        levelText.text = $"Level: {level}";
    }
}
```

- Gán đúng Slider & Text trong Inspector
- Gọi `GainExp` khi nhận exp từ quái/event

---

## Bước 3: Đồng Bộ Nhận Exp Khi Diệt Quái

Trong `EnemyHealth.cs`:

```csharp
public delegate void MonsterDefeated(int rewardExp);
public static event MonsterDefeated OnMonsterDefeated;

void Die() {
    if (OnMonsterDefeated != null)
        OnMonsterDefeated(expReward);
    Destroy(gameObject);
}
```

Trong `ExperienceManager.cs`:

```csharp
void OnEnable() {
    EnemyHealth.OnMonsterDefeated += GainExp;
}
void OnDisable() {
    EnemyHealth.OnMonsterDefeated -= GainExp;
}
```

---

## Tổng Kết

- Quản lý exp, auto lên cấp, thể hiện qua thanh slider
- Áp dụng Observer để gửi sự kiện nhận exp
- Dễ dàng liên kết UI, expand cho reward, quest, talent tree sau này

Cảm ơn các bạn đã theo dõi series này nếu muốn thêm một số chức năng mới hãy theo dõi kênh tôi đã để nhé. Chúc các bạn thành công!

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*