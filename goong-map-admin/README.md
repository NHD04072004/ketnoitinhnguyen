# Map Admin

Đây là một RESTful API được xây dựng bằng Node.js và MongoDB để quản lý thông tin về các vị trí. API cung cấp các chức năng như tạo, cập nhật, xóa và truy xuất thông tin vị trí.

---

## Yêu cầu hệ thống

### Node.js
- Phiên bản **14 trở lên**.

### MongoDB
- Có thể sử dụng:
  - **Cài đặt cục bộ** trên máy tính.
  - **Trên Cloud** thông qua MongoDB Atlas hoặc các dịch vụ tương tự.

---

### Các thư viện chính

- **`express`**: Framework cho Node.js để xây dựng ứng dụng web.
- **`mongoose`**: Thư viện quản lý cơ sở dữ liệu MongoDB.
- **`body-parser`**: Phân tích cú pháp dữ liệu JSON từ yêu cầu HTTP.
- **`cors`**: Kích hoạt chia sẻ tài nguyên từ nhiều nguồn (CORS).
- **`dotenv`**: Quản lý và tải các biến môi trường từ file `.env`.

---

## Cách sử dụng

### 1. Clone repository
```bash
git clone https://github.com/NHD04072004/ketnoitinhnguyen/tree/main/goong-map-admin
cd map-admin
```
### 2. Cài đặt phụ thuộc
```bash
npm install
````

### 3. Cấu hình môi trường
- Tạo file .env trong thư mục gốc và thêm cấu hình MongoDB
```bash
PORT = 5000
MONGO_URI=mongodb://localhost:27017/locations_db
````
- Thay chuỗi kết nối đến Database trong MongoDB của bạn
### 4. Chạy Server
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