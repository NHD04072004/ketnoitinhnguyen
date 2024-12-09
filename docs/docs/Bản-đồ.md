## Hệ thống gửi và nhận vị trí.

<p align="center">
    <img src="https://raw.githubusercontent.com/NHD04072004/ketnoitinhnguyen/refs/heads/main/docs/images/map/mapflow.png">
</p>

- Người dùng đang ở vị trí gặp nạn. Sau đó hệ thống tự động lấy vị trí.
- Hệ thống lưu kinh độ, vĩ độ của người dùng vào [MongoDB](https://www.mongodb.com/).
- Goong map có nhiệm vụ cung cấp API cho server để tải bản đồ.
- Server sẽ trả dữ liệu về phía người dùng để hiển thị các điểm đánh dấu trên bản đồ.