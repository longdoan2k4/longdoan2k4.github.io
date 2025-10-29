---
slug: unity-action-rpg-enemy-aggro-chase
url: /posts/unity-action-rpg-enemy-aggro-chase/
title: "Unity Game Cơ Bản - Bài 08: Enemy Chase và Phạm Vi Aggro"
date: 2025-10-21T18:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo cơ chế enemy đuổi theo player khi vào phạm vi aggro (tầm phát hiện) trong Unity 2D RPG. Enemy chủ động chase, dừng lại khi player rời khỏi aggro range."
---

# Unity Game Cơ Bản - Bài 08: Enemy Chase và Phạm Vi Aggro

Chào mừng bạn quay lại series Unity Game cơ bản! Trong bài này, chúng ta sẽ giúp enemy trở nên nguy hiểm hơn bằng cách đuổi theo player khi vào phạm vi aggro (zone phát hiện), và dừng lại khi player ra xa.

## Video hướng dẫn

Nguồn: NightRun Studio  
{{< youtube "2Aajc8WX2aU" >}}

## Chuẩn Bị Trước Khi Bắt Đầu

**Yêu cầu:**
- Project Unity với các bước trước
- Enemy GameObject có Rigidbody2D, Collider2D, tag riêng
- Player có tag "Player"

---

## Bước 1: Tạo Script Đuổi Theo Player

Tạo file `EnemyChase.cs`:

```csharp
using UnityEngine;

public class EnemyChase : MonoBehaviour
{
    [Header("Chase Settings")]
    public float speed = 3f;
    
    private Rigidbody2D rb;
    private Transform player;
    private bool isChasing = false;

    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        if (isChasing && player != null)
        {
            // Tính toán hướng từ enemy đến player
            Vector2 direction = ((Vector2)player.position - rb.position).normalized;
            
            // Di chuyển enemy theo hướng đó
            rb.velocity = direction * speed;
        }
    }

    /// <summary>
    /// Khi player vào phạm vi aggro
    /// </summary>
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isChasing = true;
            player = other.transform;
            Debug.Log("Enemy detected player - Starting chase!");
        }
    }

    /// <summary>
    /// Khi player rời khỏi phạm vi aggro
    /// </summary>
    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isChasing = false;
            player = null;
            rb.velocity = Vector2.zero; // Dừng lại khi out khỏi aggro
            Debug.Log("Player left aggro range - Stopping chase!");
        }
    }
}
```

**Giải thích:**
- Khi player vào phạm vi aggro, enemy lấy `transform` của player và bắt đầu chase
- Khi player ra khỏi zone, enemy dừng lại
- Sử dụng `normalized` để đảm bảo tốc độ ổn định

---

## Bước 2: Thêm Aggro Range Cho Enemy

### 2.1. Thêm Trigger Collider
1. Chọn Enemy GameObject
2. Thêm **Circle Collider 2D** dùng làm aggro detector
3. Set **"Is Trigger" = true**
4. Điều chỉnh **Radius** để tạo phạm vi phát hiện phù hợp (thường 3-5 units)
5. Có thể di chuyển **Offset** để collider lệch về phía trước enemy

### 2.2. Phân biệt 2 Collider
```
Enemy GameObject:
├── Capsule Collider 2D (Is Trigger = false) → Va chạm vật lý
└── Circle Collider 2D (Is Trigger = true)   → Phát hiện aggro
```

**Lưu ý:** Đảm bảo Trigger Collider không bị va chạm vật lý (chỉ phát hiện)

---

## Bước 3: Tag Player

1. Chọn **Player GameObject**
2. Đặt tag là **"Player"** (bắt buộc để enemy nhận biết đúng đối tượng)

Nếu chưa có tag "Player":
- **Inspector → Tag → Add Tag... → Create New Tag → "Player"**

---

## Bước 4: Tích Hợp & Kiểm Tra

### 4.1. Gắn Script
1. Gắn script `EnemyChase` vào **Enemy GameObject**
2. Điều chỉnh **speed** trong Inspector cho phù hợp (thường 2-4)

### 4.2. Test Gameplay
- Vào **Play Mode**
- Di chuyển player vào gần enemy (trong phạm vi Circle Collider trigger)
- → Enemy bắt đầu chạy đuổi theo
- Chạy ra khỏi phạm vi → Enemy dừng lại

---

## Cách Hệ Thống Hoạt Động

1. **Detection Phase:** Enemy chỉ chase khi player lọt vào aggro range
2. **Chase Phase:** Enemy tự động tìm hướng và di chuyển về phía player
3. **Stop Phase:** Khi player rời khỏi aggro, enemy dừng ngay lập tức

### Tips thiết kế:
- Có thể di chuyển **Trigger Collider** lệch về phía trước để tạo hiệu ứng **field of view**
- Player tiếp cận từ sau sẽ bị phát hiện trễ hơn
- Enemy tự động tìm player khi trigger, không cần gán transform thủ công

---

## Bước 5: Mở Rộng Hệ Thống

### 5.1. Return to Original Position

```csharp
public class EnemyChase : MonoBehaviour
{
    [Header("Chase Settings")]
    public float speed = 3f;
    public float returnSpeed = 2f;
    
    private Vector2 originalPosition;
    private bool returningHome = false;
    
    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        originalPosition = transform.position; // Lưu vị trí ban đầu
    }
    
    private void Update()
    {
        if (isChasing && player != null)
        {
            ChasePlayer();
        }
        else if (returningHome)
        {
            ReturnToOriginalPosition();
        }
    }
    
    private void ChasePlayer()
    {
        Vector2 direction = ((Vector2)player.position - rb.position).normalized;
        rb.velocity = direction * speed;
    }
    
    private void ReturnToOriginalPosition()
    {
        Vector2 direction = (originalPosition - rb.position).normalized;
        rb.velocity = direction * returnSpeed;
        
        // Kiểm tra khi đã về gần vị trí ban đầu
        if (Vector2.Distance(rb.position, originalPosition) < 0.5f)
        {
            returningHome = false;
            rb.velocity = Vector2.zero;
            transform.position = originalPosition; // Snap về đúng vị trí
        }
    }
    
    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            isChasing = false;
            player = null;
            returningHome = true; // Bắt đầu quay về
        }
    }
}
```

### 5.2. Visual Indicators

```csharp
private void OnDrawGizmosSelected()
{
    // Hiển thị aggro range trong Scene View
    Gizmos.color = Color.red;
    Gizmos.DrawWireSphere(transform.position, GetComponent<CircleCollider2D>().radius);
}
```

### 5.3. Animation Integration

```csharp
[Header("Animation")]
public Animator animator;

private void Update()
{
    if (isChasing && player != null)
    {
        ChasePlayer();
        animator.SetBool("isChasing", true);
    }
    else
    {
        animator.SetBool("isChasing", false);
    }
}
```

---

## Tổng Kết

Trong bài này chúng ta đã học:

✅ **Tạo enemy chase chủ động** với phạm vi phát hiện  
✅ **Kiểm soát tốc độ** và zone phát hiện  
✅ **Dừng lại** khi player ngoài vùng aggro  
✅ **Mở rộng** với return home và visual indicators  

## Bài Tiếp Theo

**Bài 09:** Làm enemy thông minh hơn, tích hợp animation state chase/idle

---

**📚 Series Unity Game Cơ Bản:**
- Bài 01: Di chuyển cơ bản
- Bài 02: Animation walk/idle  
- Bài 03: Tilemap/map
- Bài 04: Camera & Cinemachine
- Bài 05: Enemy AI
- Bài 06: Health & Damage
- Bài 07: Health UI hoạt họa
- **Bài 08: Enemy Chase và Aggro** ← Hiện tại

*Video nguồn từ NightRun Studio - Cảm ơn bạn đã theo dõi series! 🎮*