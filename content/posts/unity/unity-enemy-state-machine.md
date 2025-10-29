---
slug: unity-enemy-state-machine
url: /posts/unity-enemy-state-machine/
title: "Unity Game Cơ Bản - Bài 09: Làm Enemy Thông Minh Với State Machine"
date: 2025-10-21T19:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Nâng cấp enemy với State Machine: quản lý nhiều trạng thái (Idle/Chasing), flip sprite và tự động chuyển animation chạy/đứng trong Unity 2D."
---

# Unity Game Cơ Bản - Bài 09: Làm Enemy Thông Minh Với State Machine

Trong bài này, chúng ta sẽ nâng cấp enemy: xây dựng State Machine để quản lý nhiều trạng thái (Idle/Chasing...), đồng thời tích hợp flip sprite và chuyển animation chạy/đứng tự động.

## Video hướng dẫn
Nguồn: NightRun Studio  
{{< youtube "IEadGWvewsA" >}}

---

## Chuẩn Bị Trước Khi Bắt Đầu

**Yêu cầu:**
- Dự án đã có Enemy với script di chuyển và chase cơ bản
- Có Rigidbody2D + Collider2D trên Enemy
- Đã setup Animator với các animation Idle/Run cho Enemy

---

## Bước 1: Xây Dựng State Machine cho Enemy

Tạo enum trạng thái cho Enemy:

```csharp
public enum EnemyState {
    Idle,
    Chasing
    // Mở rộng: Attacking, Fleeing v.v...
}
```

Khai báo biến lưu trạng thái:

```csharp
private EnemyState enemyState;
```

Phương thức chuyển trạng thái:

```csharp
private void ChangeState(EnemyState state)
{
    // Thoát trạng thái cũ
    switch(enemyState)
    {
        case EnemyState.Idle:
            anim.SetBool("Idle", false);
            break;
        case EnemyState.Chasing:
            anim.SetBool("Chasing", false);
            break;
    }
    // Vào trạng thái mới
    enemyState = state;
    switch(enemyState)
    {
        case EnemyState.Idle:
            anim.SetBool("Idle", true);
            break;
        case EnemyState.Chasing:
            anim.SetBool("Chasing", true);
            break;
    }
}
```

Gọi `ChangeState` trong các sự kiện (như trigger, chuyển trạng thái):

```csharp
// Khi player vào phạm vi
private void OnTriggerEnter2D(Collider2D other)
{
    if (other.CompareTag("Player"))
        ChangeState(EnemyState.Chasing);
}
// Khi player rời phạm vi
private void OnTriggerExit2D(Collider2D other)
{
    if (other.CompareTag("Player"))
        ChangeState(EnemyState.Idle);
}
```

---

## Bước 2: Flip Sprite khi Chase Player

Thêm biến facing:

```csharp
private int facingDirection = -1; // -1: trái, 1: phải
```

Kiểm tra phía của player & flip:

```csharp
void Update() {
    if (enemyState == EnemyState.Chasing && player != null)
    {
        if (player.position.x > transform.position.x && facingDirection == -1)
            Flip();
        else if (player.position.x < transform.position.x && facingDirection == 1)
            Flip();
        // Di chuyển theo hướng player
    }
}

void Flip() {
    facingDirection *= -1;
    Vector3 scale = transform.localScale;
    scale.x *= -1;
    transform.localScale = scale;
}
```

---

## Bước 3: Animator - Trạng Thái Idle/Move

- Tạo Animator với các state Idle, Chasing
- Thêm parameter kiểu Bool: "Idle", "Chasing"
- Setup transition điều kiện đúng với `ChangeState` bên trên

---

## Bước 4: Kiểm Tra Trong Game

- Khi player vào phạm vi, Enemy tự động flip, chạy về phía player bằng animation chạy.
- Khi player ra khỏi phạm vi, Enemy idle.

---

## Mở Rộng Với Các State Khác

- Thêm state Attacking/Fleeing/Patrol tùy ý
- Chỉ cần thêm enum và chỉnh logic trong `ChangeState`, dễ mở rộng cho AI phức tạp hơn.

---

## Tổng Kết

- Cải thiện AI Enemy với State Machine pattern
- Quản lý state logic tập trung, dễ mở rộng
- Flip sprite đúng hướng chase
- Tự động chuyển đổi animation theo state

## Bài Tiếp Theo

**Bài 10:** Attack State - Enemy có thể ra đòn và chuyển sang trạng thái tấn công.
