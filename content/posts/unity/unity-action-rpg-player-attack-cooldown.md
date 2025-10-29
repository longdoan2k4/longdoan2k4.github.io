---
slug: unity-action-rpg-player-attack-cooldown
url: /posts/unity-action-rpg-player-attack-cooldown/
title: "Unity Game Cơ Bản - Bài 12: Player Attack - Animation & Cooldown"
date: 2025-10-22T17:30:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn thêm tấn công cho player: hoạt hình chém, đồng bộ animator, cooldown, chống spam, chuẩn bị cho logic gây damage ở bài tiếp theo trong Unity Action RPG 2D."
---

# Unity Game Cơ Bản - Bài 12: Player Attack - Animation & Cooldown

Đến lúc player đáp trả kẻ địch! Bài này hướng dẫn bạn tạo chức năng chém (slash): setup animation, liên kết code và animator, cooldown thời gian giữa các lần tấn công để chống spam phím chém. Bài sau sẽ thêm cơ chế gây damage!

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "MUO7_CaHHbc" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Player đã có animator idle/move
- Có thư mục Animations với asset Sprite chém (slash)
- Cấu trúc project tách biệt script movement, health, combat

---

## Bước 1: Thêm Animation Chém Cho Player

Tạo clip animation "Slash":
- Kéo Sprite frames chém vào Animator window, tạo animation mới (Animations/Slash.anim)
- Kéo dãn cho mượt, frame cuối nên để lại ~4 frame
- Mở Animator, tạo Bool parameter tên "isAttacking"

---

## Bước 2: Setup Animator Controller

- Transition từ entry/idle/move vào slash (isAttacking=true)
- Transition ngược lại khi isAttacking=false
- Tắt "Has Exit Time" và để duration=0 cho transitions

---

## Bước 3: Script PlayerCombat Gọi Hoạt Hình Attack

`PlayerCombat.cs`:

```csharp
using UnityEngine;
public class PlayerCombat : MonoBehaviour
{
    public Animator anim;
    public float attackCooldown = 2f;
    private float cooldownTimer;

    public void Attack() {
        if (cooldownTimer <= 0f) {
            anim.SetBool("isAttacking", true);
            cooldownTimer = attackCooldown;
        }
    }

    void Update() {
        if (cooldownTimer > 0f) cooldownTimer -= Time.deltaTime;
    }

    // Called via Animation Event cuối animation
    public void FinishAttacking() {
        anim.SetBool("isAttacking", false);
    }
}
```

Chú ý: animation event cuối frame gọi `FinishAttacking`.

---

## Bước 4: Liên Kết Giao Diện (Input Attack)

- Trong script movement, thêm biến tham chiếu `PlayerCombat`
- Trong `Update`:

```csharp
if (Input.GetButtonDown("Slash")) playerCombat.Attack();
```

- Tạo Input mới ("Slash") trong Input Manager (có thể là phím K hoặc chuột)

---

## Bước 5: Test & Fix Logic Không Spam

- Kiểm tra: ấn K thì player chém và bị cooldown, không spam được
- Hết anim -> `FinishAttacking`, tự trở lại idle/move

---

## Tổng Kết

- Tạo animation chém cho player
- Liên kết Animator và code
- Dùng cooldown chống spam
- Sẵn sàng bổ sung logic gây damage cho enemy bài sau

## Bài Tiếp Theo

**Bài 13:** Player gây damage lên enemy! Trigger va chạm, tích hợp damage cho hệ quái vật.

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*