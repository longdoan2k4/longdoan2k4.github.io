---
slug: unity-animated-tiles-tutorial
url: /posts/unity-animated-tiles-tutorial/
title: "Unity Game Cơ Bản - Bài 4.2: Animated Tiles - Sóng Nước và Cây Lắc Lư"
date: 2025-10-21T13:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn tạo và sử dụng Animated Tiles để làm thế giới game sống động với sóng nước, cây lắc lư và đá có bọt biển"
---

# Unity Game Cơ Bản - Bài 4.2: Animated Tiles - Sóng Nước và Cây Lắc Lư

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ sáu này, chúng ta sẽ học cách sử dụng **Animated Tiles** để biến thế giới tĩnh lặng thành một môi trường sống động với sóng nước cuồn cuộn, cây cối lắc lư trong gió và những chi tiết nhỏ khiến game trở nên hấp dẫn hơn.

## Video Hướng Dẫn

{{< youtube XlecVMb9h0U >}}

## Ôn Tập Các Bài Trước

**Bài 01-04:** ✅ Foundation và Layer Systems  
**Bài 4.1:** ✅ Multi-level Tilemaps và Elevation  
**Bài 4.2:** 🎯 **Animated Tiles cho dynamic environment**

## Mục Tiêu Của Bài Học

### Chúng ta sẽ tạo:
- ✅ **Animated water tiles** với sóng nước tự nhiên
- ✅ **Swaying trees** với animation lắc lư
- ✅ **Foamy rocks** với hiệu ứng bọt biển
- ✅ **Optimization** cho performance tốt
- ✅ **Tile Palette** organization hiệu quả

## Bước 1: Chuẩn Bị Sprite Assets

### 1.1. Import và organize sprites
```
Assets/
└── Sprites/
    └── Environment/
        ├── Water/
        │   ├── water_01.png
        │   ├── water_02.png
        │   └── ...
        ├── Trees/
        │   ├── tree_sway_01.png
        │   └── ...
        └── Rocks/
            ├── rock_foam_01.png
            └── ...
```

### 1.2. Cấu hình Sprite Import Settings
```csharp
// Cho tất cả animated sprites:
Sprite Mode: Multiple
Pixels Per Unit: 64
Filter Mode: Point (no filter)
Format: 32-bit
Compression: None (hoặc Low Compression)
```

### 1.3. Slice Sprite Sheets
```
1. Chọn sprite sheet
2. Mở Sprite Editor
3. Slice → Grid by Cell Size
4. Cell Size: 64x64 pixels
5. Apply changes
```

## Bước 2: Tạo Animated Tiles

### 2.1. Tạo Water Animated Tile
```
1. Right-click trong Project
2. Create → 2D → Tiles → Animated Tile
3. Đặt tên: "Water_Animated"
4. Lưu trong folder: Assets/Tiles/Animated/
```

### 2.2. Cấu hình Water Animation
```csharp
// Trong Animated Tile Inspector:
Number of Animated Sprites: 8 (tùy số frame)
Animation Speed: 5.0f
Minimum Speed: 5.0f  
Maximum Speed: 5.0f (cố định cho sync)

// Kéo từng frame vào slots:
Animated Sprites:
├── [0] water_frame_01
├── [1] water_frame_02  
├── [2] water_frame_03
└── ...
```

### 2.3. Tạo Tree Swaying Animated Tile
```csharp
// Tree Animated Tile settings:
Number of Animated Sprites: 4-5 frames
Animation Speed: 2.0f (chậm hơn nước)
Minimum Speed: 1.5f
Maximum Speed: 2.5f (random để tự nhiên)

// Lưu ý: Không lặp frame đầu ở cuối
// 4-5 frames là đủ cho hiệu ứng mượt mà
```

### 2.4. Tạo Foamy Rocks Animated Tile
```csharp
// Rock Foam settings:
Number of Animated Sprites: 6 frames
Animation Speed: 3.0f
Minimum Speed: 2.5f
Maximum Speed: 3.5f (slight randomization)
```

## Bước 3: Organize Tile Palette

### 3.1. Tạo Animated Tile Palette riêng
```
Window → 2D → Tile Palette
Create New Palette: "Animated_Environment"
Grid: Rectangle
Cell Size: Automatic
```

### 3.2. Thêm Animated Tiles vào Palette
```
1. Kéo các Animated Tiles vào Palette
2. Organize theo categories:
   ├── Water section
   ├── Trees section  
   └── Rocks section
```

## Bước 4: Thiết Lập Tilemap Layers Cho Animations

### 4.1. Tạo layers mới cho animated content
```
Hierarchy → 2D Object → Tilemap → Rectangular

Tạo các layers:
├── Water_Animated (Order: -2)
├── Rocks_Animated (Order: 1)  
└── Trees_Animated (Order: 12)
```

### 4.2. Cấu hình layer properties
```csharp
// Water Layer:
Order in Layer: -2 (dưới ground)
Material: None
Color: White (1,1,1,1)

// Rocks Layer:  
Order in Layer: 1 (trên ground, dưới player)
+ Tilemap Collider 2D (nếu cần collision)

// Trees Layer:
Order in Layer: 12 (trên player để che khuất)
No Collider (decoration only)
```

## Bước 5: Painting Animated Environment

### 5.1. Paint Water Areas
```
1. Chọn Water_Animated layer
2. Select Water animated tile từ Palette  
3. Sử dụng Paint Bucket để tô vùng nước lớn
4. Sử dụng Paint Brush cho chi tiết
```

### 5.2. Paint Trees với kỹ thuật layering
```csharp
// Cây phức tạp cần 2 layers:

// Collision Low layer:
└── Tree trunk (static sprite + collider)

// Trees_Animated layer:  
└── Tree canopy (animated swaying leaves)

// Kết quả: Player bị chặn bởi thân, che khuất bởi tán
```

### 5.3. Paint Foamy Rocks
```
1. Chọn Rocks_Animated layer
2. Paint rocks gần vùng nước
3. Tạo hiệu ứng bọt tự nhiên
4. Mix với static rocks để đa dạng
```

## Bước 6: Advanced Animation Techniques

### 6.1. Tạo Tile Animation Rules
```csharp
// Sử dụng Rule Tiles (cần package 2D Tilemap Extras)
// Để tạo transitions mượt mà giữa animated/static tiles

1. Install 2D Tilemap Extras package
2. Create → 2D → Tiles → Rule Tile  
3. Setup rules cho water edges
4. Combine với Animated Tiles
```

### 6.2. Synchronization vs Randomization
```csharp
// Water: Sync animation (cùng speed)
Animation Speed: 5.0f (fixed)
→ Tất cả water tiles cùng nhịp

// Trees: Random animation (khác speed)  
Min Speed: 1.5f, Max Speed: 2.5f
→ Mỗi tree có nhịp riêng, tự nhiên hơn

// Rocks: Slight randomization
Min Speed: 2.5f, Max Speed: 3.5f
→ Vừa đồng bộ vừa đa dạng
```

## Bước 7: Performance Optimization

### 7.1. Tilemap Renderer Settings
```csharp
// Cho các Animated Tilemaps:
Mode: Chunk
Chunk Size: 16x16 (nhỏ hơn cho animated)
Detect Chunk Culling Bounds: Enable

// Lý do: Animated tiles tốn performance hơn
```

### 7.2. Animation Optimization
```csharp
// Best practices:
✅ Ít frames hơn = performance tốt hơn (4-8 frames max)
✅ Reuse animations cho similar objects  
✅ Sử dụng compression cho sprite sheets
✅ Limit số lượng animated tiles trên screen
```

### 7.3. LOD cho Animated Tiles
```csharp
public class AnimatedTileLOD : MonoBehaviour
{
    public Tilemap animatedTilemap;
    public float disableDistance = 20f;
    
    private Transform player;
    
    void Update()
    {
        float distance = Vector3.Distance(player.position, transform.position);
        
        // Tắt animation khi player xa
        animatedTilemap.enabled = distance < disableDistance;
    }
}
```

## Bước 8: Advanced Features

### 8.1. Seasonal Animation Changes
```csharp
public class SeasonalAnimatedTiles : MonoBehaviour
{
    [System.Serializable]
    public class SeasonTiles
    {
        public TileBase[] springTiles;
        public TileBase[] summerTiles;
        public TileBase[] autumnTiles;
        public TileBase[] winterTiles;
    }
    
    public SeasonTiles seasonTiles;
    public Tilemap targetTilemap;
    
    public void ChangeSeason(int season)
    {
        TileBase[] tilesToUse = season switch
        {
            0 => seasonTiles.springTiles,
            1 => seasonTiles.summerTiles,
            2 => seasonTiles.autumnTiles,
            3 => seasonTiles.winterTiles,
            _ => seasonTiles.summerTiles
        };
        
        // Replace tiles logic here...
    }
}
```

### 8.2. Interactive Animated Tiles
```csharp
public class InteractiveWater : MonoBehaviour
{
    public Tilemap waterTilemap;
    public TileBase calmWater;
    public TileBase roughWater;
    
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // Thay đổi animation khi player vào nước
            Vector3Int cellPosition = waterTilemap.WorldToCell(other.transform.position);
            waterTilemap.SetTile(cellPosition, roughWater);
        }
    }
}
```

## Troubleshooting

### Lỗi thường gặp:
```
❌ Animation bị giật
→ Kiểm tra frame count và loại bỏ frame duplicate

❌ Performance lag với nhiều animated tiles
→ Giảm Chunk Size và sử dụng LOD system

❌ Animations không sync
→ Đặt cùng Animation Speed cho tiles muốn sync

❌ Tiles biến mất
→ Kiểm tra Tilemap Renderer bounds và culling settings
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Tạo và cấu hình Animated Tiles** từ sprite sheets  
✅ **Organization** tile palettes cho workflow hiệu quả  
✅ **Layering strategy** cho animated environment  
✅ **Performance optimization** cho animated content  
✅ **Animation synchronization** vs randomization  
✅ **Advanced techniques** như Rule Tiles integration  
✅ **Interactive animations** với scripting  

## Bài Tập Thực Hành

1. **Tạo animated campfire** với lửa nhảy múa
2. **Design animated flowers** với hiệu ứng nở/tàn
3. **Create weather effects** với animated rain/snow tiles
4. **Build animated waterfalls** với multiple layers

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 05**, chúng ta sẽ học:
- **Camera Follow system** với Cinemachine
- **Advanced camera behaviors** cho gameplay smooth
- **Camera transitions** giữa các areas
- **Cinematic sequences** cơ bản

## Lưu Ý Quan Trọng

> **Performance First:** Luôn optimize animated tiles cho mobile/low-end devices

> **Natural Feel:** Sử dụng random speeds cho organic animations như trees

> **Layer Organization:** Animated content cần layer riêng để dễ quản lý

> **Frame Economy:** 4-6 frames thường đủ cho most animations, không cần quá nhiều

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*