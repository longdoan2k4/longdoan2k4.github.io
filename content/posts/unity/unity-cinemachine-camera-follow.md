---
slug: unity-cinemachine-camera-follow
url: /posts/unity-cinemachine-camera-follow/
title: "Unity Game Cơ Bản - Bài 05: Camera Follow với Cinemachine"
date: 2025-10-21T14:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn thiết lập camera đi theo nhân vật sử dụng Cinemachine, tạo camera behaviors mượt mà cho game RPG"
---

# Unity Game Cơ Bản - Bài 05: Camera Follow với Cinemachine

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ bảy này, chúng ta sẽ học cách sử dụng **Cinemachine** - công cụ camera mạnh mẽ của Unity để tạo ra hệ thống camera theo dõi nhân vật mượt mà, chuyên nghiệp như những game RPG kinh điển.

## Video Hướng Dẫn

{{< youtube Wd7nSBLG-ew >}}

## Ôn Tập Các Bài Trước

**Bài 01-04:** ✅ Complete game foundation với movement, animation, tilemap systems  
**Bài 4.1-4.2:** ✅ Advanced systems và animated environment  
**Bài 05:** 🎯 **Professional camera system với Cinemachine**

## Tại Sao Cần Cinemachine?

### Vấn đề với camera truyền thống:
- ❌ **Code phức tạp** cho camera follow smooth
- ❌ **Thiếu features** như look-ahead, framing
- ❌ **Khó maintain** khi game scale up
- ❌ **Không flexible** cho nhiều camera behaviors

### Lợi ích của Cinemachine:
- ✅ **No-code solution** cho camera behaviors phức tạp
- ✅ **Professional tools** được dùng trong AAA games
- ✅ **Highly configurable** với realtime preview
- ✅ **Multiple camera support** và transitions
- ✅ **Built-in optimizations** và best practices

## Bước 1: Cài Đặt Cinemachine

### 1.1. Install Cinemachine Package
```
1. Window → Package Manager
2. Chuyển sang "Unity Registry" 
3. Tìm "Cinemachine"
4. Click "Install"
```

### 1.2. Verify Installation
```
// Sau khi cài đặt, check menu:
GameObject → Cinemachine → Virtual Camera
→ Nếu thấy menu này = cài đặt thành công
```

## Bước 2: Thiết Lập Basic Camera Follow

### 2.1. Tạo Cinemachine Virtual Camera
```
// Cho Unity 2022.3 và cũ hơn:
GameObject → Cinemachine → Virtual Camera

// Cho Unity 6+:
GameObject → Cinemachine → Cinemachine Camera
→ Chọn template "Follow Camera"
```

### 2.2. Cấu hình Camera Settings
```csharp
// Trong Inspector của Virtual Camera:
Follow Target: [Kéo Player GameObject vào đây]
Look At Target: [Có thể để trống hoặc cũng là Player]

Priority: 10 (cao hơn = ưu tiên hơn)
```

### 2.3. Kiểm tra Cinemachine Brain
```
Main Camera sẽ tự động có component:
CinemachineBrain
→ Component này điều khiển việc chuyển đổi giữa cameras
```

## Bước 3: Cấu Hình Camera Body (Following)

### 3.1. Chọn Body algorithm
```csharp
// Trong Virtual Camera Inspector:
Body: Framing Transposer (khuyến nghiệp cho 2D)

// Các options khác:
- Do Nothing: Camera không move
- Hard Look At: Camera snap ngay lập tức  
- Orbital Transposer: Cho 3D orbiting
- Tracked Dolly: Camera theo rail được định nghĩa
```

### 3.2. Cấu hình Framing Transposer
```csharp
// Core settings:
Follow Offset: (0, 0, -10)  // Z = -10 cho 2D
Lookahead Time: 0.2f        // Camera predict player movement
Lookahead Smoothing: 5f     // Smooth prediction
Lookahead Ignore Y: false   // Có theo Y axis không

// Dead Zone settings:  
Dead Zone Width: 0.1f       // Vùng player có thể di chuyển không làm camera move
Dead Zone Height: 0.1f
Dead Zone Depth: 0f         // Không cần cho 2D

// Soft Zone settings:
Soft Zone Width: 0.8f       // Vùng camera bắt đầu theo dõi
Soft Zone Height: 0.8f  
Bias X: 0f                  // Camera offset sang trái/phải
Bias Y: 0f                  // Camera offset lên/xuống
```

## Bước 4: Cấu Hình Camera Aim (Looking)

### 4.1. Chọn Aim algorithm
```csharp
// Aim options:
Aim: Do Nothing (thường dùng cho 2D top-down)

// Hoặc có thể dùng:
- Composer: Frame target trong screen
- Group Composer: Frame multiple targets
- POV: Manual control như FPS
```

### 4.2. Alternative: Sử dụng Composer cho framing
```csharp
// Nếu muốn player không ở center màn hình:
Aim: Composer

Settings:
- Tracked Object Offset: (0, 1, 0)  // Offset player lên trên một chút
- Lookahead Time: 0.2f
- Lookahead Smoothing: 5f
- Horizontal Damping: 1f
- Vertical Damping: 1f
```

## Bước 5: Fine-tuning Camera Behavior

### 5.1. Damping Settings để mượt mà
```csharp
// Trong Body → Framing Transposer:
X Damping: 1f     // Giảm = camera responsive hơn
Y Damping: 1f     // Tăng = camera mượt hơn nhưng chậm hơn
Z Damping: 1f

// Recommended values cho 2D RPG:
X Damping: 0.8f - 1.2f
Y Damping: 0.8f - 1.2f
```

### 5.2. Screen bounds để tránh show vùng trống
```csharp
// Thêm extension: CinemachineConfiner2D
1. Add Component → CinemachineConfiner2D
2. Tạo Polygon Collider 2D để define camera bounds
3. Assign vào Bounding Shape 2D
```

### 5.3. Noise cho camera shake
```csharp
// Trong Virtual Camera:
Noise: Basic Multi Channel Perlin

Settings cho subtle shake:
- Amplitude Gain: 0.1f
- Frequency Gain: 0.3f  
```

## Bước 6: Advanced Camera Features

### 6.1. Multiple Virtual Cameras
```csharp
// Tạo camera cho different areas:
1. Dungeon Camera (Priority: 15)
2. Overworld Camera (Priority: 10)  
3. Cutscene Camera (Priority: 20)

// Camera với Priority cao hơn sẽ active
// Cinemachine tự động blend giữa cameras
```

### 6.2. Camera Triggers để switch cameras
```csharp
using Cinemachine;

public class CameraTrigger : MonoBehaviour
{
    public CinemachineVirtualCamera targetCamera;
    public int newPriority = 15;
    private int originalPriority;
    
    void Start()
    {
        originalPriority = targetCamera.Priority;
    }
    
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            targetCamera.Priority = newPriority;
        }
    }
    
    void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            targetCamera.Priority = originalPriority;
        }
    }
}
```

### 6.3. Dynamic Follow Offset
```csharp
using Cinemachine;

public class DynamicCameraOffset : MonoBehaviour
{
    public CinemachineVirtualCamera vcam;
    private CinemachineFramingTransposer transposer;
    
    void Start()
    {
        transposer = vcam.GetCinemachineComponent<CinemachineFramingTransposer>();
    }
    
    public void SetCameraOffset(Vector3 newOffset)
    {
        transposer.m_TrackedObjectOffset = newOffset;
    }
    
    // Ví dụ: offset theo hướng player nhìn
    void Update()
    {
        PlayerMovement player = FindObjectOfType<PlayerMovement>();
        if (player != null)
        {
            float lookDirection = player.facingDirection;
            Vector3 offset = new Vector3(lookDirection * 2f, 1f, 0f);
            transposer.m_TrackedObjectOffset = Vector3.Lerp(
                transposer.m_TrackedObjectOffset, 
                offset, 
                Time.deltaTime * 2f
            );
        }
    }
}
```

## Bước 7: Camera Shake System

### 7.1. Tạo Camera Shake Manager
```csharp
using Cinemachine;
using UnityEngine;

public class CameraShakeManager : MonoBehaviour
{
    public static CameraShakeManager Instance;
    
    private CinemachineVirtualCamera vcam;
    private CinemachineBasicMultiChannelPerlin noise;
    
    void Awake()
    {
        Instance = this;
        vcam = GetComponent<CinemachineVirtualCamera>();
        noise = vcam.GetCinemachineComponent<CinemachineBasicMultiChannelPerlin>();
    }
    
    public void ShakeCamera(float intensity, float duration)
    {
        noise.m_AmplitudeGain = intensity;
        StartCoroutine(ResetShake(duration));
    }
    
    private IEnumerator ResetShake(float duration)
    {
        yield return new WaitForSeconds(duration);
        noise.m_AmplitudeGain = 0f;
    }
}

// Sử dụng:
// CameraShakeManager.Instance.ShakeCamera(2f, 0.3f);
```

## Bước 8: Performance Optimization

### 8.1. Culling Optimization
```csharp
// Trong CinemachineBrain (Main Camera):
Update Method: Fixed Update    // Cho consistent performance
Blend Update Method: Late Update
Default Blend: Cut (0 seconds) // Hoặc Easy In Out (0.5s)
```

### 8.2. LOD cho Multiple Cameras
```csharp
public class CameraLOD : MonoBehaviour
{
    public CinemachineVirtualCamera[] cameras;
    public float updateInterval = 0.1f;
    
    void Start()
    {
        InvokeRepeating(nameof(UpdateCameraLOD), 0f, updateInterval);
    }
    
    void UpdateCameraLOD()
    {
        // Chỉ update camera active để save performance
        foreach (var cam in cameras)
        {
            cam.enabled = cam.Priority >= 10; // Threshold
        }
    }
}
```

## Troubleshooting

### Lỗi thường gặp:
```
❌ Camera không follow player
→ Check Follow Target có được assign chưa
→ Verify Position Control = "Follow"

❌ Camera jerky/giật
→ Tăng Damping values
→ Check Fixed Timestep settings

❌ Camera shows empty areas
→ Sử dụng CinemachineConfiner2D với bounds

❌ Performance issues với nhiều cameras
→ Sử dụng Camera LOD system
→ Optimize Update Methods
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Cài đặt và cấu hình Cinemachine** từ cơ bản đến nâng cao  
✅ **Camera Follow behaviors** với Framing Transposer  
✅ **Dead Zone và Soft Zone** cho camera responsive  
✅ **Look-ahead system** để predict player movement  
✅ **Multiple camera management** với Priority system  
✅ **Camera Shake** và dynamic effects  
✅ **Performance optimization** cho camera system  

## Bài Tập Thực Hành

1. **Tạo Boss Battle camera** với dynamic framing
2. **Setup Interior/Exterior** camera transitions
3. **Implement Cutscene camera** với timeline
4. **Create Parallax effect** kết hợp với camera movement

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 5.1**, chúng ta sẽ học:
- **Camera Boundaries** với Cinemachine Confiner2D
- **Polygon Collider** setup cho map boundaries
- **Multiple area boundaries** và transitions
- **Performance optimization** cho camera systems

## Lưu Ý Quan Trọng

> **Unity Version:** Cinemachine syntax khác nhau giữa Unity 2022 và Unity 6+

> **Performance:** Sử dụng Fixed Update cho camera brain để consistent framerate

> **Design:** Dead Zone nhỏ cho responsive feel, lớn cho relaxed feel

> **Mobile:** Test camera settings trên different screen ratios và resolutions

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*