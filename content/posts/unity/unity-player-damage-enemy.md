---
slug: unity-player-damage-enemy
url: /posts/unity-player-damage-enemy/
title: "Unity Game Cơ Bản - Bài 13: Gây Damage Lên Enemy"
date: 2025-10-22T18:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Player gây sát thương lên enemy: hoàn thiện hệ máu cho enemy, chém trúng gây damage chuẩn ở đúng frame, debug vùng range hit trong Unity 2D RPG."
---

# Unity Game Cơ Bản - Bài 13: Gây Damage Lên Enemy

Tiếp nối bài trước, lần này player đã thực sự gây sát thương lên enemy! Ta sẽ hoàn thiện: hệ máu cho enemy, chém trúng gây damage chuẩn ở đúng frame, kèm cách vẽ vùng range hit cho debug.

## Video hướng dẫn
Nguồn: [Night Run Studio](https://www.youtube.com/@NightRunStudio)  
{{< youtube "6WyQEhXq57I" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

- Enemy có Animator, script di chuyển, collider và tag/layer riêng
- Player đã setup chức năng attack (Slash animation, cooldown,…)

---

## Bước 1: Script Health Cho Enemy

`EnemyHealth.cs`

```csharp
using UnityEngine;
public class EnemyHealth : MonoBehaviour
{
    public int currentHealth;
    public int maxHealth = 3;

    void Start()    { currentHealth = maxHealth; }

    public void ChangeHealth(int amount) {
        currentHealth += amount;
        if (currentHealth > maxHealth) currentHealth = maxHealth;
        else if (currentHealth <= 0) Die();
    }

    private void Die() { Destroy(gameObject); }
}
```

Gắn script cho Enemy, set Max Health tuỳ ý trong Inspector.

---

## Bước 2: Gây Damage Khi Player Chém

Trong `PlayerCombat.cs`  
Khi thực hiện attack (frame chém đúng thời điểm):

```csharp
public Transform attackPoint;
public float weaponRange = 1f;
public LayerMask enemyLayer;
public int damage = 1;

// Gọi khi chém tới frame damage (animation event)
public void DealDamage() {
    Collider2D[] enemies = Physics2D.OverlapCircleAll(attackPoint.position, weaponRange, enemyLayer);
    foreach (Collider2D enemy in enemies) {
        if (enemy.isTrigger) continue; // Fix lỗi gây damage khi va chạm trigger collider (aggro zone)
        EnemyHealth health = enemy.GetComponent<EnemyHealth>();
        if (health != null) health.ChangeHealth(-damage);
        break; // Chỉ đánh trúng enemy đầu tiên!
    }
}
```

Đảm bảo animation Slash gọi `DealDamage` đúng khung chém trúng, không phải ngay đầu chuyển state!

---

## Bước 3: Setup Collider, Layer, Attack Point

- Enemy: Đặt layer “Enemy”, Collider không phải trigger cho nhận damage
- Player: Tạo GameObject `attackPoint` phía trước mặt, kéo vào trường `attackPoint` bên `PlayerCombat.cs`
- LayerMask: Trong Inspector, chọn đúng “Enemy” cho `enemyLayer`

---

## Bước 4: Debug Gizmo - Vẽ Vùng Đánh

Trong `PlayerCombat.cs`

```csharp
void OnDrawGizmosSelected() {
    Gizmos.color = Color.red;
    Gizmos.DrawWireSphere(attackPoint.position, weaponRange);
}
```

Giúp test, kiểm tra vùng đánh thật chính xác.

---

## Tổng Kết

- Tạo `EnemyHealth` script cho quái
- Player chém trúng gây damage lên enemy đúng lúc
- Chỉ đánh đúng enemy trúng vùng, không dính collider trigger
- Debug gizmo hỗ trợ chỉnh range hit mượt

## Bài Tiếp Theo

**Bài 14:** Knockback and stun khi địch bị đánh! Tăng cảm giác "impact" cho đòn chém.

*Video nguồn [NightRun Studio](https://www.youtube.com/@NightRunStudio) - cảm ơn đã theo dõi series!*