---
title: "Hướng dẫn sử dụng Hugo - Static Site Generator"
date: 2025-10-11T14:00:00+07:00
draft: false
categories: ["học tập"]
description: "Hướng dẫn cơ bản về Hugo để tạo blog cá nhân"
---

# Hugo là gì?

Hugo là một static site generator nhanh và mạnh mẽ, được viết bằng Go. Nó giúp bạn tạo ra các trang web tĩnh một cách dễ dàng.

## Ưu điểm của Hugo

- ⚡ **Tốc độ build cực nhanh**
- 🎨 **Hàng trăm themes đẹp**
- 📝 **Hỗ trợ Markdown**
- 🔧 **Dễ customize**

## Cách sử dụng cơ bản

### 1. Cài đặt Hugo

```bash
# Windows (Chocolatey)
choco install hugo

# macOS (Homebrew)  
brew install hugo
```

### 2. Tạo site mới

```bash
hugo new site my-blog
cd my-blog
```

### 3. Thêm theme

```bash
git submodule add https://github.com/theme-name themes/theme-name
```

### 4. Tạo bài viết

```bash
hugo new posts/my-first-post.md
```

### 5. Chạy development server

```bash
hugo server -D
```

## Kết luận

Hugo là công cụ tuyệt vời cho việc tạo blog cá nhân. Đơn giản, nhanh và hiệu quả!

---

*Bài viết này là phần hướng dẫn cơ bản. Tôi sẽ viết thêm các bài chi tiết hơn về Hugo trong tương lai.*