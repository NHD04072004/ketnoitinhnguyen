# Front-End

Đây là giao diện được xây dựng bằng HTML, CSS, JavaScript và API của GoongMap lấy dữ liệu từ Server Node.js có nhiệm vụ hiển thị bản đồ cho Admin chứa thông tin các vị trí (maker) đã được đánh dấu trên bản đồ .

Tài liệu này giải thích cách sử dụng API Goong Maps để tích hợp bản đồ tương tác vào ứng dụng web, với các tính năng như hiển thị các điểm đánh dấu (markers), tính toán tuyến đường, và cập nhật trạng thái của các vị trí. Mã nguồn sử dụng SDK JavaScript của Goong để hiển thị bản đồ và truy xuất dữ liệu vị trí cũng như chỉ đường từ các API của Goong.

## Yêu cầu hệ thống

### Html, Css, JavaScript

### GoongMap API
- API Key
- Maptiles Key

### API đều được lấy từ https://goong.io/

---

## Cách sử dụng

### 1. Clone repository

```bash
git clone https://github.com/NHD04072004/ketnoitinhnguyen/tree/main/goong-map-admin-home
cd goong-map-admin-home
```
### 2. Khai báo các hằng số  APi

```bash
const GOONG_API_KEY = "GOONG_API_KEY";
const GOONG_API_DIRECTION = "YOUR_GOONG_API_DIRECTION";
```

### 3. Trỏ đến Server Node.js của bạn

- Thay đổi đường dẫn đến Server của bạn để lấy thông tin.
- Bạn có thể deploy server của bạn lên các nền tảng trực tuyến hoặc chạy localhost.

```bash
const response = await fetch("https://your-server-name/locations");
```

### 5. Cài đặt extension **Live Server** để chạy local host
- Server sẽ chạy tại http://127.0.0.1:5500/
- Hoặc bạn có thể deploy dự án lên các nên tảng trực tuyến khác.

### 6. Tận hưởng

## Sơ đồ hoạt động

<p align="center">
    <img src="/home/quan/WorkSpace/ketnoitinhnguyen/docs/images/goong-map-admin.png">
</p>