# Front-End

Đây là giao diện được xây dựng bằng HTML, CSS, JavaScript và API của GoongMap lấy dữ liệu từ Server Node.js có nhiệm vụ hiển thị bản đồ cho Admin chứa thông tin các vị trí (maker) đã được đánh dấu trên bản đồ .

---

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
const GOONG_API_DIRECTION = "YOUR GOONG_API_DIRECTION";

````

### 3. Trỏ đến Server Node.js của bạn
- Thay đổi đường dẫn đến Server của bạn để lấy thông tin.
- Bạn có thể deploy server của bạn lên các nền tảng trực tuyến hoặc chạy localhost.
```bash
const response = await fetch("https://your-server-name/locations");
````

### 5. Cài đặt extension Live Server (nếu bạn chạy localhost)
```bash
npm start
```` 
- Server sẽ chạy tại http://localhost:5000.

## Các API Endpoint chính
Lấy danh sách tất cả các vị trí

    GET /locations

Thêm một vị trí mới

    POST /locations

Lấy thông tin vị trí theo IDadmin

    GET /locations/:id

Cập nhật thông tin vị trí

    PUT /locations/:id

Xóa một vị trí

    DELETE /locations/:id

Lấy danh sách vị trí theo phone_org

    GET /locations/phone_org/:phone_org


## Sơ đồ hoạt động
<p align="center">
    <img src="/home/quan/WorkSpace/ketnoitinhnguyen/docs/images/nodejs-map-server.svg">
</p>