---
slug: unity-enemy-attack-state
url: /posts/unity-enemy-attack-state/
title: "Unity Game Cơ Bản - Bài 10: Enemy Attack State và Cơ Chế Tấn Công"
date: 2025-10-21T20:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Nâng cấp enemy với attack state, hoạt hình đánh, cooldown, kiểm tra phạm vi tấn công và gây sát thương chính xác cho player trong Unity 2D."
---

# Unity Game Cơ Bản - Bài 10: Enemy Attack State và Cơ Chế Tấn Công

Trong bài này, chúng ta sẽ nâng cấp enemy: thêm attack state, hoạt hình đánh, cooldown, logic kiểm tra phạm vi tấn công và gây sát thương chính xác cho player. Chuẩn bị nền tảng cho dodge/block về sau.

## Video hướng dẫn
Nguồn: NightRun Studio  
{{< youtube "hlZGeyQjhJI" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

**Yêu cầu:**
- Enemy đã có các trạng thái Idle/Chase
- Setup animation "Attack" cho enemy trong Animator (chưa cần trái/phải - dùng flip sprite)
- Player có script PlayerHealth

---

## Bước 1: Thêm Attack State Vào Enemy

Enum trạng thái nâng cấp:

```csharp
public enum EnemyState {
    Idle,
    Chasing,
    Attacking
}
```

Khai báo biến:

```csharp
public float attackRange = 2f;    // Khoảng cách tấn công
public float attackCooldown = 2f; // Thời gian giữa các lần đánh
private float attackCooldownTimer = 0f;
```

Chuyển `ChangeState` cập nhật trạng thái animation:

```csharp
private void ChangeState(EnemyState state)
{
    // ... Idle, Chasing như cũ ...
    switch (state) {
        case EnemyState.Attacking:
            anim.SetBool("Attacking", true);
            rb.velocity = Vector2.zero;
            break;
        // ... còn lại ...
    }
    enemyState = state;
}
```

---

## Bước 2: Kiểm Tra Khoảng Cách Để Tấn Công

Trong Chase Logic:

```csharp
void Chase()
{
    float dist = Vector2.Distance(player.position, rb.position);
    if (dist < attackRange && attackCooldownTimer <= 0f)
    {
        ChangeState(EnemyState.Attacking);
        attackCooldownTimer = attackCooldown;
    }
    else
    {
        // Di chuyển chase như thường
    }
}
```

Lưu ý: mỗi frame trừ cooldown:

```csharp
void Update()
{
    if (attackCooldownTimer > 0f) attackCooldownTimer -= Time.deltaTime;
    // ... các state như cũ ...
}
```

---

## Bước 3: Thực Hiện Attack Và Gây Damage Chính Xác

Tạo Attack Point và Weapon Range:
- Thêm empty object con của enemy, đặt trước mặt enemy gọi là `attackPoint`

Public biến trong script:

```csharp
public Transform attackPoint;
public float weaponRange = 1f;
public LayerMask playerLayer;
public int damage = 10;
```

Gây damage qua animation event (tại frame trúng player):

```csharp
public void Attack()
{
    Collider2D[] hits = Physics2D.OverlapCircleAll(attackPoint.position, weaponRange, playerLayer);
    foreach (var hit in hits)
    {
        PlayerHealth ph = hit.GetComponent<PlayerHealth>();
        if (ph != null) ph.ChangeHealth(-damage);
    }
}
```

Thêm event `Attack()` vào đúng frame animation swing vũ khí.

---

## Bước 4: Quản Lý State Sau Khi Attack (Idle, Chase, Attack lặp lại)

- Dùng animation event cuối mỗi đòn để gọi chuyển về Idle hoặc kiểm tra lại logic chase nếu player còn trong phạm vi.
- Refactor: dùng check player mỗi frame.

---

## Bước 5: Vẽ Vùng Phát Hiện (Debug Gizmos)

```csharp
void OnDrawGizmosSelected()
{
    Gizmos.color = Color.red;
    Gizmos.DrawWireSphere(attackPoint.position, weaponRange);
}
```

---

## Tích Hợp & Test

- Gán đúng các reference trong Inspector (attackPoint, playerLayer,…)
- Đảm bảo cooldown vận hành chuẩn (không spam đòn)
- Player nhận đúng lượng damage khi enemy đánh trúng.

---

## Tổng Kết

- Thêm attack state vào enemy
- Tấn công bằng hoạt hình, gây damage chuẩn qua Animation Event
- Kiểm tra cooldown, range tấn công
- Chuẩn bị nền tảng cho dodge/block và knockback (bài sau)

## Bài Tiếp Theo

**Bài 11:** Knockback effect - làm hiệu ứng bị đánh bật lùi, dodge/block cho player!

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*