---
slug: unity-multi-level-tilemaps
url: /posts/unity-multi-level-tilemaps/
title: "Unity Game Cơ Bản - Bài 4.1: Multi-level Tilemaps và Elevation System"
date: 2025-10-21T12:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo hệ thống nhiều tầng tilemap để nhân vật có thể leo lên núi và di chuyển trên nhiều độ cao khác nhau"
---

# Unity Game Cơ Bản - Bài 4.1: Multi-level Tilemaps và Elevation System

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ năm này, chúng ta sẽ học cách tạo **hệ thống elevation** phức tạp, cho phép nhân vật leo lên núi, di chuyển trên nhiều tầng địa hình khác nhau bằng cách điều khiển colliders và sorting layers động.

## Video Hướng Dẫn

{{< youtube h-PxKdG1mTI >}}

## Ôn Tập Các Bài Trước

**Bài 01-03:** ✅ Foundation (Movement, Animation, Tilemap)  
**Bài 04:** ✅ Foreground/Background layers và depth illusion  
**Bài 4.1:** 🎯 **Multi-level elevation system với dynamic colliders**

## Mục Tiêu Của Bài Học

### Chúng ta sẽ tạo:
- ✅ **Elevation system** cho phép player leo núi
- ✅ **Dynamic collider management** (bật/tắt theo vùng)
- ✅ **Boundary system** để tránh rơi khỏi map
- ✅ **Sorting order automation** khi thay đổi độ cao
- ✅ **Trigger zones** cho entry/exit points

## Bước 1: Chuẩn Bị Layer System Mở Rộng

### 1.1. Review layer structure hiện tại
```
Ground (Order: -1)
Collision Low (Order: 0)
Non-Collision Low (Order: 0)
Player (Order: 5)
Collision High (Order: 10)  
Non-Collision High (Order: 10)
```

### 1.2. Thêm layers mới cho elevation
```csharp
// Thêm các layers sau:
Elevation Base (Order: -1)     // Nền cỏ trên núi
Mountain Boundary (Order: 0)   // Ranh giới invisible
Entry Triggers (Order: 0)      // Trigger zones
Exit Triggers (Order: 0)       // Exit zones
```

### 1.3. Tổ chức Tilemap hierarchy
```
Tilemaps/
├── Ground Layers/
│   ├── Elevation Base
│   └── Ground
├── Collision Layers/
│   ├── Collision Low
│   ├── Collision High
│   └── Mountain Boundary
├── Decoration Layers/
│   ├── Non-Collision Low
│   └── Non-Collision High
└── Trigger Layers/
    ├── Entry Triggers
    └── Exit Triggers
```

## Bước 2: Thiết Kế Elevation Areas

### 2.1. Xác định khu vực elevation
```
🏔️ Mountain Design:
├── Base Level (Sorting Order: 5)
├── Mid Level (Sorting Order: 15) 
└── Peak Level (Sorting Order: 25)

Entry points: Stairs, ramps, ladders
Exit points: Stairs down, jump points
```

### 2.2. Vẽ elevation base
1. **Chọn Elevation Base layer**
2. **Vẽ nền cỏ/đất** cho khu vực trên núi
3. **Tạo path** kết nối giữa các levels

## Bước 3: Tạo Script ElevationEntry

### 3.1. Tạo ElevationEntry.cs
```csharp
using UnityEngine;

public class ElevationEntry : MonoBehaviour
{
    [Header("Elevation Settings")]
    public int newSortingOrder = 15;
    
    [Header("Colliders to Disable")]
    public Collider2D[] mountainColliders;
    
    [Header("Boundary Colliders to Enable")]
    public Collider2D[] boundaryColliders;
    
    [Header("Audio (Optional)")]
    public AudioClip elevationSound;

    private void Start()
    {
        // Đảm bảo boundary colliders bị tắt ban đầu
        foreach (Collider2D boundary in boundaryColliders)
        {
            boundary.enabled = false;
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            EnterElevation(collision.gameObject);
        }
    }

    private void EnterElevation(GameObject player)
    {
        // Tắt mountain colliders (cho phép đi qua)
        foreach (Collider2D mountain in mountainColliders)
        {
            mountain.enabled = false;
        }

        // Bật boundary colliders (tránh rơi khỏi núi)
        foreach (Collider2D boundary in boundaryColliders)
        {
            boundary.enabled = true;
        }

        // Thay đổi sorting order của player
        SpriteRenderer playerSprite = player.GetComponent<SpriteRenderer>();
        if (playerSprite != null)
        {
            playerSprite.sortingOrder = newSortingOrder;
        }

        // Phát âm thanh (nếu có)
        if (elevationSound != null)
        {
            AudioSource.PlayClipAtPoint(elevationSound, transform.position);
        }

        Debug.Log($"Player entered elevation area. New sorting order: {newSortingOrder}");
    }
}
```

### 3.2. Thiết lập Entry Trigger
1. **Tạo GameObject** trên Entry Triggers layer
2. **Add Component:** Box Collider 2D
3. **Set Is Trigger = true**
4. **Gắn script ElevationEntry**
5. **Configure collider** bao quanh bậc thang/lối lên

## Bước 4: Tạo Mountain Boundary System

### 4.1. Tạo Boundary Tilemap
```
1. Tạo Tilemap mới: "Mountain Boundary"
2. Order in Layer: 0
3. Add Component: Tilemap Collider 2D + Composite Collider 2D
```

### 4.2. Vẽ invisible boundaries
```csharp
// Sử dụng tile bất kỳ để đánh dấu ranh giới
// Ví dụ: đá, nấm, hoặc tile tùy ý

1. Vẽ boundaries xung quanh khu vực elevation
2. Chỉnh Alpha = 0 để ẩn tiles (trong Tilemap Renderer)
3. Hoặc tạo invisible tile riêng
```

### 4.3. Cấu hình Boundary Colliders
```csharp
// Trong ElevationEntry script:
// Kéo Composite Collider 2D của Mountain Boundary 
// vào array boundaryColliders

boundaryColliders[0] = mountainBoundaryCompositeCollider;
```

## Bước 5: Tạo Script ElevationExit

### 5.1. Tạo ElevationExit.cs
```csharp
using UnityEngine;

public class ElevationExit : MonoBehaviour
{
    [Header("Elevation Settings")]
    public int originalSortingOrder = 5;
    
    [Header("Colliders to Re-enable")]
    public Collider2D[] mountainColliders;
    
    [Header("Boundary Colliders to Disable")]
    public Collider2D[] boundaryColliders;
    
    [Header("Audio (Optional)")]
    public AudioClip exitSound;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            ExitElevation(collision.gameObject);
        }
    }

    private void ExitElevation(GameObject player)
    {
        // Bật lại mountain colliders
        foreach (Collider2D mountain in mountainColliders)
        {
            mountain.enabled = true;
        }

        // Tắt boundary colliders
        foreach (Collider2D boundary in boundaryColliders)
        {
            boundary.enabled = false;
        }

        // Khôi phục sorting order gốc
        SpriteRenderer playerSprite = player.GetComponent<SpriteRenderer>();
        if (playerSprite != null)
        {
            playerSprite.sortingOrder = originalSortingOrder;
        }

        // Phát âm thanh (nếu có)
        if (exitSound != null)
        {
            AudioSource.PlayClipAtPoint(exitSound, transform.position);
        }

        Debug.Log($"Player exited elevation area. Restored sorting order: {originalSortingOrder}");
    }
}
```

### 5.2. Thiết lập Exit Trigger
1. **Đặt ở chân núi** hoặc cuối bậc thang
2. **Box Collider 2D** với Is Trigger = true
3. **Gắn script ElevationExit**

## Bước 6: Tối Ưu Multi-Level System

### 6.1. Manager Script cho nhiều levels
```csharp
using UnityEngine;

public class ElevationManager : MonoBehaviour
{
    [System.Serializable]
    public class ElevationLevel
    {
        public string levelName;
        public int sortingOrder;
        public Collider2D[] activeColliders;
        public Collider2D[] inactiveColliders;
    }

    public ElevationLevel[] elevationLevels;
    private int currentLevel = 0;

    public void SetElevationLevel(int levelIndex)
    {
        if (levelIndex < 0 || levelIndex >= elevationLevels.Length) return;

        // Tắt level hiện tại
        DisableLevel(currentLevel);
        
        // Bật level mới
        EnableLevel(levelIndex);
        
        currentLevel = levelIndex;
    }

    private void EnableLevel(int levelIndex)
    {
        ElevationLevel level = elevationLevels[levelIndex];
        
        foreach (Collider2D col in level.activeColliders)
            col.enabled = true;
            
        foreach (Collider2D col in level.inactiveColliders)
            col.enabled = false;
    }

    private void DisableLevel(int levelIndex)
    {
        ElevationLevel level = elevationLevels[levelIndex];
        
        foreach (Collider2D col in level.activeColliders)
            col.enabled = false;
    }
}
```

## Bước 7: Testing và Debugging

### 7.1. Test scenarios
```
✅ Player enters elevation area
   → Mountain colliders disabled
   → Boundary colliders enabled  
   → Sorting order changed

✅ Player exits elevation area
   → Mountain colliders enabled
   → Boundary colliders disabled
   → Sorting order restored

✅ Player cannot fall off mountain
   → Boundary colliders work properly

✅ Visual layering correct
   → Player appears above/below correctly
```

### 7.2. Debug visualization
```csharp
// Thêm vào ElevationEntry/Exit scripts:
private void OnDrawGizmos()
{
    // Hiển thị trigger area trong Scene view
    Gizmos.color = Color.green;
    Gizmos.DrawWireCube(transform.position, GetComponent<Collider2D>().bounds.size);
}
```

## Troubleshooting

### Lỗi thường gặp:
```
❌ Player không thể leo núi
→ Kiểm tra mountainColliders có được assign đúng không

❌ Player rơi khỏi núi  
→ Đảm bảo boundaryColliders được bật khi enter elevation

❌ Sorting order không đúng
→ Verify newSortingOrder values trong scripts

❌ Triggers không hoạt động
→ Kiểm tra Player có tag "Player" và Collider2D setup
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Dynamic Collider Management** với scripts  
✅ **Elevation system** cho multi-level gameplay  
✅ **Boundary system** để tránh bugs  
✅ **Sorting Order automation** theo elevation  
✅ **Trigger system** cho seamless transitions  
✅ **Manager pattern** cho hệ thống phức tạp  
✅ **Debug visualization** trong Scene view  

## Bài Tập Thực Hành

1. **Tạo 3-level mountain** với Entry/Exit points riêng biệt
2. **Thêm audio effects** cho elevation changes
3. **Tạo moving platforms** giữa các levels
4. **Implement elevator system** với animations

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 4.2**, chúng ta sẽ học:
- **Animated Tiles** cho sóng nước và cây lắc
- **Dynamic environment** với weather effects
- **Particle systems** cho atmosphere
- **Advanced tilemap animations**

## Lưu Ý Quan Trọng

> **Performance:** Sử dụng Composite Collider cho boundaries lớn

> **Design:** Luôn có Exit point cho mọi Entry point

> **Testing:** Test từ nhiều góc độ để đảm bảo không có bugs

> **Scalability:** Sử dụng Manager pattern cho hệ thống lớn hơn

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*