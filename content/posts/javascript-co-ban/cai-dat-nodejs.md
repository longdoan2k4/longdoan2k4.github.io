---
title: "Tải & Cài Đặt NodeJS - Khởi Đầu Hành Trình JavaScript"
date: 2025-10-19T12:00:00+07:00
draft: false
categories: ["javascript cơ bản"]
description: "Hướng dẫn chi tiết cách tải và cài đặt NodeJS để bắt đầu học JavaScript"
---

# Tải & Cài Đặt NodeJS - Khởi Đầu Hành Trình JavaScript

NodeJS là runtime environment cho phép chạy JavaScript ngoài trình duyệt web. Đây là bước đầu tiên và quan trọng nhất để bắt đầu hành trình học JavaScript backend.

## Video Hướng Dẫn

{{< youtube lwsS-ikKnPs >}}

## Tại sao cần NodeJS?

**NodeJS** cho phép:
- ✅ Chạy JavaScript trên máy tính (không cần browser)
- ✅ Phát triển ứng dụng web backend
- ✅ Tạo APIs và web servers
- ✅ Sử dụng npm để quản lý packages
- ✅ Build tools và automation scripts

## Cách Tải NodeJS

### 1. Truy cập trang chính thức
Vào trang **[nodejs.org](https://nodejs.org)**

### 2. Chọn phiên bản phù hợp
- **LTS (Long Term Support)**: Phiên bản ổn định, khuyên dùng cho production
- **Current**: Phiên bản mới nhất với features mới

**💡 Khuyến nghị**: Chọn phiên bản **LTS** cho người mới bắt đầu

### 3. Download cho hệ điều hành
- **Windows**: File `.msi`
- **macOS**: File `.pkg` 
- **Linux**: Package manager hoặc binary

## Cài Đặt NodeJS

### Windows
1. **Chạy file `.msi`** đã download
2. **Làm theo wizard**: Next → Next → Install
3. **Tích chọn** "Automatically install necessary tools"
4. **Finish** và restart máy nếu cần

### macOS
1. **Chạy file `.pkg`** đã download
2. **Làm theo hướng dẫn** cài đặt
3. **Nhập password** khi được yêu cầu
4. **Hoàn tất** cài đặt

### Linux (Ubuntu/Debian)
```bash
# Cập nhật package list
sudo apt update

# Cài NodeJS và npm
sudo apt install nodejs npm

# Hoặc dùng NodeSource repository cho phiên bản mới nhất
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Kiểm Tra Cài Đặt

Mở **Terminal** (macOS/Linux) hoặc **Command Prompt** (Windows) và chạy:

```bash
# Kiểm tra version NodeJS
node --version
# hoặc
node -v

# Kiểm tra version npm
npm --version
# hoặc
npm -v
```

**Kết quả mong đợi:**
```
v18.17.0
9.6.7
```

## Chạy JavaScript Đầu Tiên

### 1. Tạo file test
Tạo file `hello.js`:
```javascript
console.log("Xin chào NodeJS!");
console.log("Tôi đã cài đặt thành công!");

// Hiển thị thông tin version
console.log("NodeJS version:", process.version);
console.log("Platform:", process.platform);
```

### 2. Chạy file
```bash
node hello.js
```

**Output:**
```
Xin chào NodeJS!
Tôi đã cài đặt thành công!
NodeJS version: v18.17.0
Platform: win32
```

## NPM - Node Package Manager

**NPM** được cài đặt cùng NodeJS và cho phép:

### Khởi tạo project mới
```bash
# Tạo thư mục project
mkdir my-first-node-app
cd my-first-node-app

# Khởi tạo package.json
npm init -y
```

### Cài đặt packages
```bash
# Cài package phổ biến
npm install express
npm install lodash
npm install moment

# Cài global package
npm install -g nodemon
```

### Chạy scripts
```bash
# Chạy file với nodemon (auto-restart)
nodemon hello.js

# Chạy scripts từ package.json
npm start
npm run dev
```

## Troubleshooting

### Lỗi thường gặp

**1. "node is not recognized" (Windows)**
```bash
# Thêm NodeJS vào PATH environment variable
# Hoặc restart Command Prompt/PowerShell
```

**2. Permission denied (macOS/Linux)**
```bash
# Dùng sudo cho global installs
sudo npm install -g package-name

# Hoặc config npm prefix
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

**3. Version cũ**
```bash
# Update NodeJS qua installer mới
# Hoặc dùng nvm (Node Version Manager)
```

## Node Version Manager (NVM)

**NVM** giúp quản lý nhiều phiên bản NodeJS:

### Cài NVM (macOS/Linux)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Sử dụng NVM
```bash
# Cài NodeJS version mới nhất
nvm install node

# Cài version cụ thể
nvm install 18.17.0

# Chuyển đổi version
nvm use 18.17.0

# Xem danh sách versions
nvm list
```

## Tiếp Theo Học Gì?

Sau khi cài đặt NodeJS thành công:

1. **JavaScript Fundamentals** - Syntax, variables, functions
2. **File System** - Đọc/ghi files với NodeJS
3. **NPM Packages** - Sử dụng thư viện có sẵn
4. **Express.js** - Framework web phổ biến
5. **APIs & Databases** - Kết nối với database

## Kết Luận

🎉 **Chúc mừng!** Bạn đã cài đặt thành công NodeJS và sẵn sàng cho hành trình JavaScript backend.

**NodeJS** mở ra cánh cửa để:
- Phát triển web applications
- Tạo APIs và microservices  
- Build tools và automation
- Desktop apps với Electron

**Bước tiếp theo**: Bắt đầu viết JavaScript và khám phá ecosystem NodeJS phong phú!

---

*Hãy xem video hướng dẫn ở trên để theo dõi từng bước cài đặt chi tiết. Chúc bạn học tập hiệu quả!*