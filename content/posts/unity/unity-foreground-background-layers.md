---
slug: unity-foreground-background-layers
url: /posts/unity-foreground-background-layers/
title: "Unity Game Cơ Bản - Bài 04: Tạo Chiều Sâu Với Foreground và Background"
date: 2025-10-21T11:00:00+07:00
draft: false
categories: ["unity game cơ bản"]
description: "Hướng dẫn thiết lập nhiều layer tilemap để tạo ảo giác chiều sâu, giúp nhân vật có thể đi phía sau các vật thể như cây và núi"
---

# Unity Game Cơ Bản - Bài 04: Tạo Chiều Sâu Với Foreground và Background

Chào mừng các bạn quay trở lại với series Unity Game cơ bản! Trong bài thứ tư này, chúng ta sẽ học cách thiết lập hệ thống **Foreground và Background layers** để tạo ảo giác chiều sâu cho bản đồ 2D, giúp nhân vật có thể đi phía sau các vật thể như cây, núi một cách tự nhiên.

## Video Hướng Dẫn

{{< youtube m_NjNJ7N11Q >}}

## Ôn Tập Các Bài Trước

**Bài 01:** ✅ Thiết lập project và chuyển động cơ bản  
**Bài 02:** ✅ Animation system và sprite flipping  
**Bài 03:** ✅ Tilemap system và collision  
**Bài 04:** 🎯 **Foreground/Background layers và depth illusion**

## Vấn Đề Cần Giải Quyết

### Hiện tại chúng ta có:
- ❌ **Nhân vật luôn ở trên** hoặc **luôn ở dưới** tất cả objects
- ❌ **Không có cảm giác chiều sâu** thực tế
- ❌ **Collision không linh hoạt** (toàn bộ object hoặc không collision)

### Mục tiêu:
- ✅ **Nhân vật có thể đi sau cây** nhưng vẫn bị chặn bởi thân cây
- ✅ **Tạo ảo giác 3D** trong không gian 2D
- ✅ **Quản lý collision chi tiết** cho từng phần của object

## Bước 1: Hiểu Hệ Thống Layer Mới

### 1.1. Cấu trúc hiện tại (cần cải thiện)
```
Ground layer (Order: -1)
Decorations layer (Order: 0)  
Player (Order: 5)
Collision layer (Order: 10)
```

### 1.2. Hệ thống mới (4 layers chính)
```
Ground (Order: -1)          - Nền đất
Non-Collision Low (Order: 0) - Trang trí dưới player
Player (Order: 5)           - Nhân vật
Collision Low (Order: 0)     - Collision dưới player  
Collision High (Order: 10)   - Collision trên player
Non-Collision High (Order: 10) - Trang trí trên player
```

### 1.3. Bảng phân loại Layer System

| **Layer** | **Collision** | **Mục đích** | **Vị trí hiển thị** |
|-----------|---------------|--------------|-------------------|
| **Collision Low** | ✅ Có | Player đụng được, hiển thị dưới player | Dưới player |
| **Collision High** | ✅ Có | Vật thể cao hiển thị phía trước player | Trước player |
| **Non-Collision Low** | ❌ Không | Trang trí hiển thị phía dưới | Dưới player |
| **Non-Collision High** | ❌ Không | Phần cho phép player đi phía sau | Trước player |

## Bước 2: Tạo Hệ Thống Layer Mới

### 2.1. Đổi tên layer hiện tại
1. Chọn **Collision layer** hiện tại
2. Đổi tên thành: `Collision High`
3. Đặt **Order in Layer = 10**

### 2.2. Tạo các layer mới
```
Hierarchy → Right Click → 2D Object → Tilemap → Rectangular
```

**Tạo lần lượt:**
```csharp
// 1. Collision Low
Name: "Collision Low"
Order in Layer: 0
Components: Tilemap Collider 2D + Composite Collider 2D

// 2. Non-Collision Low  
Name: "Non-Collision Low"
Order in Layer: 0
Components: Chỉ Tilemap Renderer

// 3. Non-Collision High
Name: "Non-Collision High" 
Order in Layer: 10
Components: Chỉ Tilemap Renderer
```

### 2.3. Cấu hình Player Order
```
Player Order in Layer: 5
→ Ở giữa Low (0) và High (10)
```

## Bước 3: Thiết Lập Collision System Chi Tiết

### 3.1. Cấu hình Collision Low
```csharp
// Add Components:
- Tilemap Collider 2D
- Rigidbody2D (Body Type: Static)  
- Composite Collider 2D

// Settings:
Tilemap Collider 2D → Used By Composite: ✅
Composite Collider 2D → Geometry Type: Polygons
```

### 3.2. Cấu hình Collision High (nếu cần)
```csharp
// Tương tự Collision Low
// Dành cho objects cao cần collision từ phía trên
```

## Bước 4: Thiết Kế Objects Với Depth

### 4.1. Ví dụ: Cây cối
```
🌳 Thiết kế cây hoàn chỉnh:

Collision Low (Order: 0):
├── Thân cây (có collision)
└── Gốc cây (có collision)

Non-Collision High (Order: 10):  
├── Tán lá (không collision)
├── Cành cây cao (không collision)
└── Phần che khuất player
```

### 4.2. Quy trình vẽ cây
1. **Chọn Collision Low layer**
2. **Vẽ thân cây và gốc** (phần player không thể đi qua)
3. **Chọn Non-Collision High layer**
4. **Vẽ tán lá và cành** (phần player có thể đi sau)

### 4.3. Ví dụ: Núi và đá
```
⛰️ Thiết kế núi:

Collision Low (Order: 0):
├── Chân núi (có collision)
└── Phần đáy đá (có collision)

Non-Collision High (Order: 10):
├── Đỉnh núi (không collision)  
├── Phần cao của đá (không collision)
└── Hiệu ứng shadow/depth
```

## Bước 5: Cải Thiện Objects Hiện Tại

### 5.1. Di chuyển collision từ High xuống Low
```
1. Xóa gốc cây khỏi Collision High
2. Vẽ lại gốc cây ở Collision Low
3. Giữ tán cây ở Non-Collision High
```

### 5.2. Tạo hiệu ứng depth cho cây
```csharp
// Kết quả mong muốn:
Player đi gần cây → bị chặn bởi thân (Collision Low)
Player đi sau cây → bị che khuất bởi tán (Non-Collision High)
Player đi trước cây → thấy rõ ràng cây ở phía sau
```

## Bước 6: Test và Fine-tuning

### 6.1. Kiểm tra hoạt động
1. **Click Play**
2. **Di chuyển Player**:
   - Đến gần thân cây → **Bị chặn** ✅
   - Đi lên phía sau cây → **Bị che khuất bởi tán** ✅
   - Đi xuống phía trước → **Thấy rõ cây ở sau** ✅

### 6.2. Điều chỉnh Order in Layer
```
Nếu hiệu ứng chưa đúng:
- Tăng/giảm Order in Layer
- Đảm bảo Player ở giữa (Order: 5)
- Low layers < 5 < High layers
```

## Bước 7: Tối Ưu Performance

### 7.1. Gộp Collision Layers
```csharp
// Sử dụng Composite Collider để:
- Giảm số lượng colliders
- Tăng performance collision detection
- Tạo collision smooth hơn
```

### 7.2. Chunk Size Optimization
```
Tilemap Renderer → Chunk Size: 16x16
→ Phù hợp cho maps có nhiều layers
```

## Troubleshooting

### Lỗi thường gặp:
```
❌ Player không bị che khuất
→ Kiểm tra Order in Layer của Non-Collision High

❌ Collision không hoạt động đúng
→ Đảm bảo Composite Collider được cấu hình đúng

❌ Performance lag
→ Sử dụng Composite Collider và tối ưu Chunk Size

❌ Objects hiển thị sai thứ tự
→ Review lại Order in Layer của tất cả layers
```

## Kiến Thức Đã Học

Trong bài này, chúng ta đã học được:

✅ **Thiết lập hệ thống 4 layers** cho depth illusion  
✅ **Phân biệt Collision vs Non-Collision** layers  
✅ **Tạo objects phức tạp** với collision selektive  
✅ **Quản lý Order in Layer** hiệu quả  
✅ **Tối ưu performance** với Composite Collider  
✅ **Tạo ảo giác chiều sâu** trong game 2D  
✅ **Design thinking** cho level design chuyên nghiệp  

## Bài Tập Thực Hành

1. **Tạo một ngôi nhà** với cửa có thể đi sau và tường có collision
2. **Thiết kế khu vườn** với nhiều cây có depth effect khác nhau
3. **Tạo cầu thang** với player có thể đi trên và dưới cầu
4. **Experiment** với các objects phức tạp khác (tượng, cột điện, etc.)

## Chuẩn Bị Cho Bài Tiếp Theo

Trong **Bài 05**, chúng ta sẽ học:
- **Multi-level Tilemaps** với logic độ cao
- **Z-depth sorting** tự động
- **Stairs và elevation** system
- **Advanced collision** cho địa hình phức tạp

## Lưu Ý Quan Trọng

> **Design Rule:** Phần có collision luôn ở Low layer, phần decoration ở High layer

> **Performance:** Sử dụng Composite Collider cho tất cả Collision layers

> **Visual Hierarchy:** Player Order = 5 để luôn ở giữa Low (0) và High (10)

> **Testing:** Luôn test di chuyển ở nhiều góc độ để đảm bảo depth effect hoạt động đúng

---

**Nguồn:** *Bài viết được tổng hợp từ video hướng dẫn của kênh **[Night Run Studio](https://www.youtube.com/@NightRunStudio)**. Xem video gốc để có trải nghiệm học tập tốt nhất!*