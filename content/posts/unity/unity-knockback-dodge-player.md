---
slug: unity-knockback-dodge-player
url: /posts/unity-knockback-dodge-player/
title: "Unity Game Cơ Bản - Bài 11: Knockback & Dodge cho Player"
date: 2025-10-21T21:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo hiệu ứng knockback khi player bị enemy tấn công, stun tạm thời, và cơ chế dodge né đòn trong Unity 2D RPG."
---

# Unity Game Cơ Bản - Bài 11: Knockback & Dodge cho Player

Bài này hướng dẫn cách tạo hiệu ứng knockback khi player bị enemy tấn công: lùi lại có lực, "stun" tạm thời, và cơ chế dodge né đòn nếu timing chuẩn. Giúp gameplay action cảm giác mượt và đúng chất RPG hành động.

## Video hướng dẫn
Nguồn: [NightRun Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "b-CtXKTALqs" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Dự án đã có Enemy dùng hệ attack state
- Player dùng Rigidbody2D, có script di chuyển
- Enemy có script tấn công (gọi player bị knockback khi bị đòn)

---

## Bước 1: Viết Hàm Knockback Cho Player

Trong `PlayerMovement.cs`:

```csharp
public void Knockback(Transform enemyTransform, float force, float stunTime)
{
    isKnockedBack = true; // Ngăn di chuyển
    Vector2 direction = (transform.position - enemyTransform.position).normalized;
    rb.velocity = direction * force;
    StartCoroutine(KnockbackCounter(stunTime));
}

private IEnumerator KnockbackCounter(float stunTime)
{
    yield return new WaitForSeconds(stunTime);
    isKnockedBack = false;
    rb.velocity = Vector2.zero; // Dừng lại khi hết stun
}
```

Thêm biến `isKnockedBack` ở đầu script, dùng để kiểm tra trong `Update` chỉ cho di chuyển nếu không bị knockback.

---

## Bước 2: Trigger Knockback Từ Enemy

Trong `EnemyCombat.cs` (hoặc `EnemyAttack.cs`):

```csharp
// Khi attack trúng player:
PlayerMovement pm = playerHit.GetComponent<PlayerMovement>();
if (pm != null)
{
    pm.Knockback(transform, knockbackForce, stunTime); 
}
```

Thêm `knockbackForce` và `stunTime` là `public float` có thể chỉnh Inspector (ví dụ force 10, stun 0.3)

Gọi đúng hàm khi player bị attack, pass qua transform của enemy làm tham số.

---

## Bước 3: Tinh Chỉnh Logic & Fix "Double Damage"

- Xóa hoặc sửa code `OnCollisionEnter` gây damage vì giờ damage chủ yếu xảy ra khi đồng bộ với attack logic, tránh trùng 2 lần.
- Đảm bảo mỗi lần attack chỉ gây đúng 1 knockback và damage.

---

## Bước 4: Tăng Dodge/Né Đòn

- Khi player đang knockback (`isKnockedBack = true`) không nhận thêm knockback từ enemy nữa.
- Có thể mở rộng bằng cách thêm animation dodge/trượt cho player và window không thể nhận damage khi dodge.

---

## Tổng Kết

- Tạo hiệu ứng knockback thật cho đòn đánh (bị đẩy lùi có stun)
- Cho phép tùy chỉnh lực và thời gian stun
- Tránh double damage và va chạm lặp lại
- Mở rộng dễ cho các hiệu ứng skill, dodge

## Bài Tiếp Theo

**Bài 12:** Player tấn công Enemy! Thêm hoạt hình, cooldown cho đòn đánh.

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*