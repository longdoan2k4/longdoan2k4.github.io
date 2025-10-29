---
slug: unity-enemy-knockback-stun
url: /posts/unity-enemy-knockback-stun/
title: "Unity Game Cơ Bản - Bài 14: Knockback & Stun cho Enemy"
date: 2025-10-22T18:30:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Bổ sung knockback (đẩy lùi trúng đòn) và stun (choáng ngắn) cho enemy, giúp gameplay action mượt mà, phản hồi va chạm chuẩn RPG hành động trong Unity 2D."
---

# Unity Game Cơ Bản - Bài 14: Knockback & Stun cho Enemy

Chém enemy mà không có hiệu ứng nhìn khá “cứng”. Bài này sẽ bổ sung knockback (đẩy lùi trúng đòn) cùng stun (choáng ngắn), giúp gameplay đã tay, phản hồi va chạm mượt mà và chuẩn RPG hành động.

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "mhtVz0MiEGc" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Enemy đã có hệ State Machine (Idle, Chasing, Attacking,…)
- Có script EnemyHealth, EnemyMovement có Rigidbody2D
- Player có chức năng attack bằng script PlayerCombat

---

## Bước 1: Viết Script Knockback cho Enemy

`EnemyKnockback.cs`

```csharp
using UnityEngine;
public class EnemyKnockback : MonoBehaviour
{
    private Rigidbody2D rb;
    private EnemyMovement movement;
    void Start() {
        rb = GetComponent<Rigidbody2D>();
        movement = GetComponent<EnemyMovement>();
    }

    public void Knockback(Transform hitter, float knockbackForce, float knockbackTime, float stunTime) {
        Vector2 direction = (transform.position - hitter.position).normalized;
        rb.velocity = direction * knockbackForce;
        movement.ChangeState(EnemyState.Knockback);
        StartCoroutine(StunTimer(knockbackTime, stunTime));
    }

    private IEnumerator StunTimer(float knockbackTime, float stunTime) {
        yield return new WaitForSeconds(knockbackTime);
        rb.velocity = Vector2.zero; // hết knockback, dừng lại
        yield return new WaitForSeconds(stunTime);
        movement.ChangeState(EnemyState.Idle);
    }
}
```

State “Knockback” sẽ disable movement, enemy đứng im khi bị đánh bật ngược.

---

## Bước 2: Gọi Knockback Khi Gây Damage

Trong `PlayerCombat.cs` (`DealDamage`):

```csharp
EnemyKnockback knock = enemy.GetComponent<EnemyKnockback>();
if (knock != null)
    knock.Knockback(transform, knockbackForce, knockbackTime, stunTime);
```

Thêm biến `knockbackForce`, `knockbackTime`, `stunTime` cho Player, chỉnh Inspector tuỳ thích.

---

## Bước 3: Quản Lý State Machine Cho Enemy

Trong `EnemyMovement.cs`:

```csharp
public enum EnemyState { Idle, Chasing, Attacking, Knockback }
public void ChangeState(EnemyState state) { ... }
void Update() {
    if (enemyState != EnemyState.Knockback) {
        // di chuyển chase/attack như thường
    }
    // ...còn khi Knockback thì đứng im...
}
```

---

## Bước 4: Tinh Chỉnh & Test

- Sau thời gian knockback -> stun, enemy trở lại idle, sẵn sàng chase tiếp
- Tunstime chỉnh sao cho vừa phải, không khiến enemy bị disable quá lâu hay quá ngắn
- Có thể mở rộng cho hiệu ứng particle, animation rung, flash, v.v.

---

## Tổng Kết

- Knockback làm enemy bị đẩy, cảm giác va chạm thật
- Stun choáng giúp player có “window” phản đòn
- Quản lý state máy – tránh bug di chuyển

## Bài Tiếp Theo

**Bài 15:** Xây dựng stats cho nhân vật: hệ chỉ số, UI và nâng cấp.

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*