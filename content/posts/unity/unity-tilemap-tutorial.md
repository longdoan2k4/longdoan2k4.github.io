---
slug: unity-tilemap-tutorial
url: /posts/unity-tilemap-tutorial/
title: "Unity Game Cơ Bản - Bài 03: Sử Dụng Tilemap Để Tạo Bản Đồ"
date: 2025-10-21T10:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn sử dụng hệ thống Tilemap để xây dựng bản đồ 2D, quản lý layers và tạo collision cho game RPG"
---

# Unity Game Cơ Bản - Bài 03: Sử Dụng Tilemap Để Tạo Bản Đồ

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ ba này, chúng ta sẽ học cách sử dụng hệ thống **Tilemap** để xây dựng bản đồ 2D chuyên nghiệp, quản lý nhiều layers và tạo collision system hoàn chỉnh.

## Video Hướng Dẫn

{{< youtube XMIZoMVi2Zg >}}

## Ôn Tập Các Bài Trước

**Bài 01:** ✅ Thiết lập project và chuyển động cơ bản  
**Bài 02:** ✅ Animation system và sprite flipping  
**Bài 03:** 🎯 **Tilemap system và level design**

## Chuẩn Bị Trước Khi Bắt Đầu

### Yêu cầu:
- **2D Package** đã được cài đặt
- **Sprite assets** từ PixelFrog Tiny Swords
- Project từ các bài trước

### Kiểm tra 2D Package:
```
Window → Package Manager → Unity Registry → 2D
→ Đảm bảo "2D Tilemap Extras" đã được Install
```

## Bước 1: Chuẩn Bị Sprite Assets

### 1.1. Import Tilemap Sprites
1. Tải thêm **Environment sprites** từ Tiny Swords asset
2. Kéo các file `.png` vào thư mục `Assets/Sprites/Environment/`

### 1.2. Cấu hình Sprite Settings
```
Sprite Mode: Multiple
Pixels Per Unit: 64 (thường dùng cho tiles)
Filter Mode: Point (no filter)
Format: 32-bit
```

### 1.3. Slice Sprite Sheets
1. Mở **Sprite Editor**
2. **Slice → Grid by Cell Size**
3. Nhập kích thước: **64x64 pixels**
4. **Apply** để tách thành từng tile riêng biệt

## Bước 2: Tạo Tile Palette

### 2.1. Mở Tile Palette Window
```
Window → 2D → Tile Palette
```

### 2.2. Tạo Palette mới
1. Click **Create New Palette**
2. Đặt tên: `Environment_Palette`
3. Chọn **Grid → Rectangle**
4. **Cell Size → Automatic**

### 2.3. Thêm Tiles vào Palette
1. **Kéo sprites** từ Project window vào Tile Palette
2. Unity sẽ tự động tạo **Tile Assets**
3. Lưu vào thư mục `Assets/Tiles/`

## Bước 3: Tạo Tilemap Layers

### 3.1. Tạo Ground Layer
```
Hierarchy → Right Click → 2D Object → Tilemap → Rectangular
```

**Đặt tên:** `Ground`

### 3.2. Tạo thêm các Layers
Tạo thêm các Tilemap sau:
```
- Ground (Order in Layer: -1)
- Decorations (Order in Layer: 0)  
- Elevation (Order in Layer: 1)
- Foreground (Order in Layer: 10)
```

### 3.3. Cấu hình Sorting Layers
```
Edit → Project Settings → Tags and Layers → Sorting Layers

Thêm các layers:
- Background
- Default  
- Foreground
```

## Bước 4: Vẽ Bản Đồ Với Tilemap

### 4.1. Sử dụng Paint Tools
Trong **Tile Palette**, các công cụ chính:
```
🖌️ Paint Brush: Vẽ từng tile
🪣 Paint Bucket: Tô vùng lớn
⬜ Rectangle: Vẽ hình chữ nhật
📏 Line: Vẽ đường thẳng
🗑️ Eraser: Xóa tiles
```

### 4.2. Quy trình vẽ Map
```
1. Chọn Ground layer → Vẽ nền đất
2. Chọn Elevation layer → Vẽ núi, tường
3. Chọn Decorations layer → Thêm cây cối, đá
4. Chọn Foreground layer → Vẽ vật che khuất player
```

### 4.3. Tips vẽ Map hiệu quả
> **Sử dụng Paint Bucket** cho vùng lớn đồng nhất  
> **Sử dụng Paint Brush** cho chi tiết  
> **Giữ Shift** để vẽ đường thẳng  

## Bước 5: Thiết Lập Collision System

### 5.1. Thêm Tilemap Collider
1. Chọn **Elevation** layer (núi, tường)
2. **Add Component → Tilemap Collider 2D**
3. Collider sẽ tự động bám sát các tiles

### 5.2. Tối ưu Collision với Composite Collider
```csharp
// Thêm components sau vào Elevation layer:
- Rigidbody2D (Body Type: Static)
- Composite Collider 2D

// Trong Tilemap Collider 2D:
✅ Used By Composite: true
```

### 5.3. Test Collision
1. **Click Play**
2. Di chuyển Player đến vùng có Elevation
3. Player sẽ bị chặn, không thể đi xuyên qua

## Bước 6: Quản Lý Layer Order

### 6.1. Cấu hình Order in Layer
```
Ground: -1 (dưới cùng)
Decorations: 0
Player: 5 (ở giữa)
Elevation: 1
Foreground: 10 (trên cùng)
```

### 6.2. Mẹo quản lý Layer
> **Sử dụng số cách xa nhau** (10, 20, 30...) để dễ chèn layer mới  
> **Ground luôn ở dưới cùng** (-1)  
> **Foreground che khuất Player** khi đi sau vật thể  

## Bước 7: Tối Ưu Performance

### 7.1. Chunk Size Optimization
```
Tilemap Renderer → Chunk Size
- Static maps: 32x32
- Dynamic maps: 16x16
```

### 7.2. Culling Optimization
```
Tilemap Renderer → Mode: Chunk
→ Tự động ẩn chunks ngoài camera view
```

## Troubleshooting

### Lỗi thường gặp:
```
❌ Tiles không hiển thị
→ Kiểm tra Order in Layer và Sorting Layer

❌ Collision không hoạt động  
→ Đảm bảo đã thêm Tilemap Collider 2D

❌ Performance lag khi vẽ map lớn
→ Sử dụng Composite Collider và điều chỉnh Chunk Size
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Thiết lập và sử dụng Tile Palette**  
✅ **Tạo và quản lý multiple Tilemap layers**  
✅ **Sử dụng Paint Tools** hiệu quả  
✅ **Thiết lập Collision system** với Tilemap Collider  
✅ **Tối ưu performance** với Composite Collider  
✅ **Quản lý Order in Layer** cho hiển thị đúng thứ tự  
✅ **Level design** cơ bản cho game RPG  

## Bài Tập Thực Hành

1. **Tạo một khu rừng nhỏ** với cây cối và đường đi
2. **Thiết kế một ngôi làng** với nhà cửa và hàng rào
3. **Tạo layer Foreground** với cây che khuất Player khi đi sau
4. **Thử nghiệm Paint Bucket** để tô vùng nước hoặc cỏ lớn

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 04**, chúng ta sẽ học:
- Tạo **NPCs** và **Objects** tương tác
- Hệ thống **Dialogue** cơ bản
- **Item collection** và **Inventory** đơn giản

## Lưu Ý Quan Trọng

> **Layer Organization:** Luôn đặt tên layer rõ ràng và sử dụng Order in Layer hợp lý

> **Performance:** Sử dụng Composite Collider cho maps lớn để tối ưu collision detection

> **Design Tip:** Vẽ Ground trước, sau đó thêm Elevation và Decorations để tạo độ sâu

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*