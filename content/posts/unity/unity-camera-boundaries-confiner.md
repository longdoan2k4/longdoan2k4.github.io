---
slug: unity-camera-boundaries-confiner
url: /posts/unity-camera-boundaries-confiner/
title: "Unity Game Cơ Bản - Bài 5.1: Camera Boundaries với Cinemachine Confiner"
date: 2025-10-21T15:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn thêm ranh giới camera để không vượt quá bản đồ sử dụng Cinemachine Confiner2D, tương thích Unity 6"
---

# Unity Game Cơ Bản - Bài 5.1: Camera Boundaries với Cinemachine Confiner

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài 5.1 này, chúng ta sẽ học cách thêm **camera boundaries** để ngăn camera di chuyển ra ngoài ranh giới bản đồ bằng **Cinemachine Confiner2D** - một tính năng quan trọng cho mọi game RPG 2D chuyên nghiệp.

## Video Hướng Dẫn

{{< youtube 9HZ-vq2d8S4 >}}

## Ôn Tập Bài Trước

**Bài 05:** ✅ Camera Follow system với Cinemachine cơ bản  
**Bài 5.1:** 🎯 **Camera Boundaries và Confiner system**

## Vấn Đề Cần Giải Quyết

### Hiện tại camera có vấn đề:
- ❌ **Camera theo player vô hạn** ra ngoài map boundaries
- ❌ **Hiển thị vùng trống** bên ngoài tilemap
- ❌ **Không có ranh giới tự nhiên** như game professional
- ❌ **Player có thể đi ra ngoài map** mà camera vẫn theo

### Mục tiêu:
- ✅ **Camera dừng tại ranh giới** map một cách mượt mà
- ✅ **Không hiển thị vùng trống** bên ngoài game world
- ✅ **Flexible boundaries** cho các khu vực khác nhau
- ✅ **Tương thích Unity 6** và các phiên bản cũ

## Bước 1: Tạo Camera Confiner GameObject

### 1.1. Tạo Confiner object
```
1. Right-click trong Hierarchy
2. Create Empty → đặt tên "Camera_Confiner"
3. Position: (0, 0, 0)
4. Organize trong folder "Camera System"
```

### 1.2. Thêm Polygon Collider 2D
```csharp
// Add Component:
Polygon Collider 2D

// Settings:
Is Trigger: ✅ true (không cản player, chỉ limit camera)
Material: None
Used By Effector: false
```

## Bước 2: Thiết Lập Polygon Boundaries

### 2.1. Edit Polygon Collider
```
1. Chọn Camera_Confiner object
2. Click "Edit Collider" button trong Polygon Collider 2D
3. Màn hình sẽ hiện wireframe với các điểm control
```

### 2.2. Tạo boundary shape
```csharp
// Default polygon có 5 điểm, customize như sau:

// Xóa điểm: Ctrl + Left Click (Windows) / Cmd + Left Click (Mac)
// Thêm điểm: Click và kéo trên edge bất kỳ
// Di chuyển điểm: Click và kéo điểm existing

// Recommended shape: Rectangle bao quanh toàn bộ playable area
Top-Left: (-50, 30)
Top-Right: (50, 30)  
Bottom-Right: (50, -30)
Bottom-Left: (-50, -30)
```

### 2.3. Fine-tune boundaries
```
🎯 Best practices:
- Boundary nên lớn hơn visible map một chút
- Tránh tạo polygon quá phức tạp (performance)
- Đảm bảo không có self-intersection
- Test với different screen ratios
```

## Bước 3: Cấu Hình Cinemachine Confiner2D

### 3.1. Thêm Confiner Extension vào Virtual Camera
```
1. Chọn Virtual Camera (Follow Camera) trong Hierarchy
2. Trong Inspector, scroll xuống phần "Extensions"
3. Click "Add Extension" dropdown
4. Chọn "CinemachineConfiner2D"
```

### 3.2. Assign Bounding Shape
```csharp
// Trong CinemachineConfiner2D component:
Bounding Shape 2D: [Kéo Camera_Confiner object vào đây]
Confine Mode: Confine2D
Damping: 5 (smooth transition khi hit boundary)
```

### 3.3. Verify settings
```csharp
// Đảm bảo các settings sau:
✅ Bounding Shape 2D được assign
✅ Camera_Confiner có Polygon Collider 2D
✅ Is Trigger = true trên Polygon Collider
✅ Virtual Camera có CinemachineConfiner2D extension
```

## Bước 4: Testing và Fine-tuning

### 4.1. Test basic functionality
```
1. Click Play
2. Di chuyển Player đến các rìa map
3. Observe:
   ✅ Camera dừng tại boundaries
   ✅ Camera vẫn smooth khi trong boundaries  
   ✅ Không hiển thị vùng trống bên ngoài map
```

### 4.2. Adjust damping cho feel tốt hơn
```csharp
// Trong CinemachineConfiner2D:
Damping values:
- 0: Camera stop ngay lập tức (harsh)
- 5: Smooth transition (recommended)  
- 10+: Rất smooth nhưng có thể lag feeling
```

### 4.3. Handle edge cases
```csharp
// Nếu camera bị "squeeze" ở góc:
1. Kiểm tra Rotation Control = "Do Nothing"
2. Đảm bảo polygon không quá nhỏ cho screen size
3. Test với different aspect ratios (16:9, 4:3, etc.)
```

## Bước 5: Advanced Confiner Techniques

### 5.1. Multiple Boundaries cho different areas
```csharp
public class AreaCameraConfiner : MonoBehaviour
{
    [System.Serializable]
    public class CameraArea
    {
        public string areaName;
        public Collider2D boundaryCollider;
        public Vector3 cameraOffset;
    }
    
    public CameraArea[] cameraAreas;
    public CinemachineConfiner2D confiner;
    
    public void SwitchToArea(string areaName)
    {
        CameraArea targetArea = System.Array.Find(cameraAreas, 
            area => area.areaName == areaName);
            
        if (targetArea != null)
        {
            confiner.m_BoundingShape2D = targetArea.boundaryCollider;
            // Optionally adjust camera offset for different areas
        }
    }
}
```

### 5.2. Dynamic boundary adjustment
```csharp
using Cinemachine;
using UnityEngine;

public class DynamicBoundary : MonoBehaviour
{
    public PolygonCollider2D boundaryCollider;
    public Transform[] boundaryPoints;
    
    void Update()
    {
        // Dynamically adjust boundary based on game state
        if (boundaryPoints.Length >= 3)
        {
            Vector2[] points = new Vector2[boundaryPoints.Length];
            for (int i = 0; i < boundaryPoints.Length; i++)
            {
                points[i] = transform.InverseTransformPoint(boundaryPoints[i].position);
            }
            boundaryCollider.points = points;
        }
    }
}
```

### 5.3. Smooth area transitions
```csharp
using System.Collections;
using Cinemachine;
using UnityEngine;

public class SmoothAreaTransition : MonoBehaviour
{
    public CinemachineConfiner2D confiner;
    public float transitionDuration = 1f;
    
    public void TransitionToNewBoundary(Collider2D newBoundary)
    {
        StartCoroutine(SmoothTransition(newBoundary));
    }
    
    private IEnumerator SmoothTransition(Collider2D newBoundary)
    {
        // Temporarily disable confiner
        confiner.enabled = false;
        yield return new WaitForSeconds(0.1f);
        
        // Switch boundary
        confiner.m_BoundingShape2D = newBoundary;
        
        // Re-enable with smooth transition
        confiner.enabled = true;
        yield return new WaitForSeconds(transitionDuration);
    }
}
```

## Bước 6: Optimization và Best Practices

### 6.1. Performance optimization
```csharp
// Cho maps lớn:
- Sử dụng simple rectangle thay vì complex polygon
- Combine multiple simple shapes thay vì một shape phức tạp
- Cache boundary calculations
- Sử dụng LOD cho confiner complexity
```

### 6.2. Multi-resolution support
```csharp
public class ResponsiveBoundary : MonoBehaviour
{
    public Vector2 referenceResolution = new Vector2(1920, 1080);
    public PolygonCollider2D boundaryCollider;
    
    void Start()
    {
        AdjustBoundaryForResolution();
    }
    
    void AdjustBoundaryForResolution()
    {
        float aspectRatio = (float)Screen.width / Screen.height;
        float referenceAspect = referenceResolution.x / referenceResolution.y;
        
        if (aspectRatio != referenceAspect)
        {
            // Adjust boundary points based on aspect ratio
            Vector2[] points = boundaryCollider.points;
            float scaleFactor = aspectRatio / referenceAspect;
            
            for (int i = 0; i < points.Length; i++)
            {
                points[i] = new Vector2(points[i].x * scaleFactor, points[i].y);
            }
            
            boundaryCollider.points = points;
        }
    }
}
```

## Troubleshooting

### Lỗi thường gặp:
```
❌ Camera vẫn vượt boundaries
→ Kiểm tra Is Trigger = true trên Polygon Collider
→ Verify CinemachineConfiner2D được add vào Virtual Camera

❌ Camera bị "squeeze" ở góc maps
→ Đảm bảo boundaries đủ lớn cho camera viewport  
→ Check Rotation Control = "Do Nothing"

❌ Performance lag với complex boundaries
→ Simplify polygon shape
→ Sử dụng multiple simple boundaries thay vì một complex

❌ Player đi ra ngoài map nhưng camera dừng đúng
→ Thêm separate colliders cho player physics
→ Map boundaries ≠ Camera boundaries
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Thiết lập Polygon Collider 2D** cho camera boundaries  
✅ **Cấu hình CinemachineConfiner2D** extension  
✅ **Edit polygon shapes** hiệu quả trong Scene view  
✅ **Multiple area boundaries** với dynamic switching  
✅ **Performance optimization** cho complex boundaries  
✅ **Responsive design** cho different screen ratios  
✅ **Smooth transitions** giữa camera areas  

## Bài Tập Thực Hành

1. **Tạo multiple camera areas** cho Town và Forest với boundaries riêng biệt
2. **Implement area transition triggers** để tự động switch boundaries
3. **Create dynamic boundaries** thay đổi theo game progression  
4. **Setup different boundaries** cho different camera modes (normal/combat)

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 06**, chúng ta sẽ học:
- **Combat System** cơ bản với attack animations
- **Health và Damage** mechanics
- **Enemy AI** đơn giản với state machines
- **Weapon systems** và collision detection

## Lưu Ý Quan Trọng

> **Unity 6 Compatibility:** CinemachineConfiner2D hoạt động tương thích hoàn toàn với Unity 6

> **Performance:** Sử dụng simple shapes cho boundaries để tối ưu performance

> **Design Rule:** Camera boundaries nên lớn hơn player movement boundaries

> **Testing:** Luôn test với different aspect ratios để đảm bảo responsive

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*