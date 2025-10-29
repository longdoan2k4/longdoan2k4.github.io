---
slug: unity-action-rpg-health-damage-system
url: /posts/unity-action-rpg-health-damage-system/
title: "Unity Game Cơ Bản - Bài 06: Hệ Thống Máu và Gây Sát Thương"
date: 2025-10-21T16:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo hệ thống Health cho player và cơ chế enemy gây sát thương khi va chạm trong Unity 2D RPG"
---

# Unity Game Cơ Bản - Bài 06: Hệ Thống Máu và Gây Sát Thương

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ sáu này, chúng ta sẽ học cách xây dựng **hệ thống máu (Health System)** cho nhân vật và tạo **cơ chế gây sát thương** khi enemy va chạm với player.

## Video Hướng Dẫn

*Nguồn video từ NightRun Studio*  
{{< youtube "cmh73c3cnBo" >}}

## Ôn Tập Các Bài Trước

**Bài 01:** ✅ Thiết lập project và chuyển động cơ bản  
**Bài 02:** ✅ Animation system và sprite flipping  
**Bài 03:** ✅ Tilemap system và level design  
**Bài 04:** ✅ Camera follow và Cinemachine  
**Bài 05:** ✅ Enemy AI và basic movement  
**Bài 06:** 🎯 **Health System và Damage**

## Chuẩn Bị Trước Khi Bắt Đầu

### Yêu cầu:
- Project Unity từ các bài trước
- Player GameObject với movement system
- Enemy GameObject với AI system
- Hiểu biết cơ bản về Collision Detection

### Trong bài này chúng ta sẽ học:

- ✅ Xây dựng hệ thống máu (Health System) cho player
- ✅ Tạo cơ chế enemy gây sát thương khi va chạm  
- ✅ Thiết lập collision detection giữa player và enemy
- ✅ Xử lý trạng thái "chết" của nhân vật

## Bước 1: Thiết lập Enemy trong Unity

### 1.1. Thêm Rigidbody2D cho Enemy
```
1. Select Enemy GameObject
2. Add Component → Physics 2D → Rigidbody 2D
3. Thiết lập các giá trị:
   - Gravity Scale: 0
   - Freeze Position: X ✓, Y ✓
   - Freeze Rotation: Z ✓
```

### 1.2. Thêm Collider cho Enemy
```
1. Add Component → Physics 2D → Capsule Collider 2D
2. Chỉnh Size và Offset cho phù hợp sprite
3. Đảm bảo Is Trigger = false
```

## Bước 2: Tạo Script Health cho Player

### PlayerHealth.cs

```csharp
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    [Header("Health Settings")]
    public int currentHealth = 100;
    public int maxHealth = 100;

    private void Start()
    {
        // Khởi tạo máu đầy khi game bắt đầu
        currentHealth = maxHealth;
    }

    /// <summary>
    /// Thay đổi máu của player
    /// </summary>
    /// <param name="amount">Số lượng máu thay đổi (âm = mất máu, dương = hồi máu)</param>
    public void ChangeHealth(int amount)
    {
        currentHealth += amount;
        
        // Giới hạn máu trong khoảng 0 - maxHealth
        currentHealth = Mathf.Clamp(currentHealth, 0, maxHealth);
        
        // Kiểm tra nếu máu về 0
        if (currentHealth <= 0)
        {
            Die();
        }
        
        // Debug để kiểm tra
        Debug.Log($"Player Health: {currentHealth}/{maxHealth}");
    }
    
    /// <summary>
    /// Xử lý khi player chết
    /// </summary>
    private void Die()
    {
        Debug.Log("Player Died!");
        gameObject.SetActive(false); // Tạm thời tắt player
        
        // Có thể thêm các hiệu ứng chết khác ở đây:
        // - Animation chết
        // - Particle effects
        // - Game Over screen
    }
    
    /// <summary>
    /// Hồi máu cho player
    /// </summary>
    /// <param name="healAmount">Số lượng máu hồi</param>
    public void Heal(int healAmount)
    {
        ChangeHealth(healAmount);
    }
    
    /// <summary>
    /// Nhận sát thương
    /// </summary>
    /// <param name="damageAmount">Số lượng sát thương nhận</param>
    public void TakeDamage(int damageAmount)
    {
        ChangeHealth(-damageAmount);
    }
}
```

## Bước 3: Script Enemy Gây Sát Thương

### EnemyCombat.cs

```csharp
using UnityEngine;

public class EnemyCombat : MonoBehaviour
{
    [Header("Combat Settings")]
    public int damage = 1;
    
    [Header("Damage Cooldown")]
    public float damageInterval = 1f; // Thời gian giữa các lần gây sát thương
    private float lastDamageTime;

    /// <summary>
    /// Xử lý va chạm với player
    /// </summary>
    /// <param name="collision">Collision info</param>
    private void OnCollisionEnter2D(Collision2D collision)
    {
        // Kiểm tra xem có phải player không
        PlayerHealth playerHealth = collision.gameObject.GetComponent<PlayerHealth>();
        if (playerHealth != null)
        {
            DealDamage(playerHealth);
        }
    }
    
    /// <summary>
    /// Xử lý va chạm liên tục (khi enemy và player tiếp tục chạm nhau)
    /// </summary>
    /// <param name="collision">Collision info</param>
    private void OnCollisionStay2D(Collision2D collision)
    {
        // Gây sát thương liên tục nhưng có cooldown
        PlayerHealth playerHealth = collision.gameObject.GetComponent<PlayerHealth>();
        if (playerHealth != null && Time.time >= lastDamageTime + damageInterval)
        {
            DealDamage(playerHealth);
        }
    }
    
    /// <summary>
    /// Gây sát thương cho player
    /// </summary>
    /// <param name="playerHealth">PlayerHealth component của player</param>
    private void DealDamage(PlayerHealth playerHealth)
    {
        playerHealth.TakeDamage(damage);
        lastDamageTime = Time.time;
        
        // Debug để kiểm tra
        Debug.Log($"Enemy dealt {damage} damage to player");
        
        // Có thể thêm các hiệu ứng khi gây sát thương:
        // - Particle effects
        // - Screen shake
        // - Sound effects
    }
}
```

## Bước 4: Tích Hợp & Kiểm Tra

### 4.1. Gắn Scripts vào GameObjects
```
Cho Player:
1. Select Player GameObject
2. Add Component → PlayerHealth
3. Thiết lập Max Health = 100 trong Inspector

Cho Enemy:
1. Select Enemy GameObject  
2. Add Component → EnemyCombat
3. Thiết lập Damage = 10 trong Inspector
```

### 4.2. Kiểm tra Collision Detection
```
Đảm bảo cả Player và Enemy có:
- Rigidbody2D component
- Collider2D component (Is Trigger = false)
- Cùng layer hoặc layer tương tác được
```

## Cách Hệ Thống Hoạt Động

1. **Khi Enemy va chạm Player:**
   - `OnCollisionEnter2D` được gọi
   - Enemy gây `damage` sát thương cho Player
   - Player mất máu tương ứng

2. **Khi Player hết máu:**
   - `currentHealth <= 0`
   - Gọi hàm `Die()`
   - Player GameObject bị tắt (tạm thời)

3. **Damage Cooldown:**
   - Tránh spam damage khi enemy và player tiếp tục chạm nhau
   - Sử dụng `damageInterval` để kiểm soát tần suất gây sát thương

## Bước 5: Mở Rộng Hệ Thống

### 5.1. UI Health Bar

```csharp
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    public Slider healthSlider;
    public PlayerHealth playerHealth;
    
    private void Update()
    {
        if (playerHealth != null && healthSlider != null)
        {
            healthSlider.value = (float)playerHealth.currentHealth / playerHealth.maxHealth;
        }
    }
}
```

### 5.2. Hệ Thống Hồi Máu

```csharp
public class HealthPotion : MonoBehaviour
{
    public int healAmount = 25;
    
    private void OnTriggerEnter2D(Collider2D other)
    {
        PlayerHealth playerHealth = other.GetComponent<PlayerHealth>();
        if (playerHealth != null)
        {
            playerHealth.Heal(healAmount);
            Destroy(gameObject); // Xóa potion sau khi sử dụng
        }
    }
}
```

### 5.3. Invincibility Frames

```csharp
public class PlayerHealth : MonoBehaviour
{
    [Header("Invincibility")]
    public float invincibilityDuration = 1f;
    private bool isInvincible = false;
    
    public void TakeDamage(int damageAmount)
    {
        if (isInvincible) return; // Không nhận sát thương khi bất tử
        
        ChangeHealth(-damageAmount);
        StartCoroutine(InvincibilityCoroutine());
    }
    
    private IEnumerator InvincibilityCoroutine()
    {
        isInvincible = true;
        yield return new WaitForSeconds(invincibilityDuration);
        isInvincible = false;
    }
}
```

## Tổng Kết

Trong bài học này, chúng ta đã học được:

- ✅ **Thiết lập Enemy** với Rigidbody2D và Collider
- ✅ **Tạo PlayerHealth script** với hệ thống máu hoàn chỉnh  
- ✅ **Xây dựng EnemyCombat script** với collision detection
- ✅ **Xử lý damage cooldown** để tránh spam sát thương
- ✅ **Tích hợp hệ thống** trong Unity Inspector
- ✅ **Mở rộng với UI** health bar và invincibility frames

## Bài Tiếp Theo

**Bài 07:** Animation System nâng cao và Combat Effects

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về:
- Combat animations cho player và enemy
- Particle effects khi gây sát thương
- Sound system cho game

---

**📚 Series Unity Game Cơ Bản:**
- [Bài 01: Thiết lập project và chuyển động cơ bản](#)
- [Bài 02: Animation Walk, Idle và lật hướng](#)  
- [Bài 03: Sử dụng Tilemap để tạo bản đồ](#)
- [Bài 04: Camera Follow và Cinemachine](#)
- [Bài 05: Enemy AI và Basic Movement](#)
- **Bài 06: Hệ thống máu và gây sát thương** ← *Hiện tại*

*Video nguồn từ NightRun Studio - Cảm ơn bạn đã theo dõi series! 🎮*