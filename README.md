<p align="center">
    <img src="./docs/images/ketnoitinhnguyen.png">
</p>

<p align="center">
  <a href="https://github.com/NHD04072004/F5-alpha/blob/master/LICENSE"><img
    src="https://img.shields.io/github/license/NHD04072004/ketnoitinhnguyen.svg"
    alt="LICENSE"
  /></a>
  <a href="https://github.com/NHD04072004/F5-alpha/issues"><img
    src="https://img.shields.io/github/issues/NHD04072004/ketnoitinhnguyen.svg"
    alt="Open issues"
  /></a>
  <a href="https://github.com/NHD04072004/F5-alpha/pulls"><img
    src="https://img.shields.io/github/issues-pr/NHD04072004/ketnoitinhnguyen.svg"
    alt="Open pull requests"
  /></a>
  <a href="https://github.com/NHD04072004/F5-alpha/graphs/contributors"><img
    src="https://img.shields.io/github/contributors/NHD04072004/ketnoitinhnguyen.svg"
    alt="contributor"
  /></a>
</p>


<a href="https://github.com/NHD04072004/ketnoitinhnguyen/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=%F0%9F%90%9B+Bug+Report%3A+">Bug Report ⚠️
</a><br>
<a href="https://github.com/NHD04072004/ketnoitinhnguyen/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=RequestFeature:">Request Feature 👩‍💻</a>

# Kết nối tình nguyện

Ứng dụng giúp kết nối giữa nhân dân với tình nguyện viên và các nhà hảo tâm.

Dự án được thực hiện trong cuộc thi [Phần Mềm Nguồn Mở Olympic Tin học Sinh viên Việt Nam 2024](https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F). Được cấp phép nguồn mở theo giấy phép [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) bởi đội F5-alpha.

## 🔎 Danh Mục
1. [Giới Thiệu](#Giới-Thiệu)
2. [Chức Năng](#chức-năng-chính)
3. [Tổng Quan Hệ Thống](#👩‍💻-tổng-quan-hệ-thống)
4. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
5. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
    - [📋 Yêu Cầu - Prerequisites](#yêu-cầu-📋)
    - [🔨 Cài Đặt](#🔨-cài-đặt)
6. [🙌 Đóng Góp](#🙌-đóng-góp-cho-dự-án)
7. [📝 License](#📝-license)

## Giới Thiệu

- Những năm gần đây chúng ta cũng đã phải trải qua một số thời điểm phải ứng phó khẩn cấp trên quy mô rộng như thời kì đại dịch Covid, thiên tai do bão lũ gây ra hàng năm.
- Trong năm 2024 này đã có đợt [bão Yagi](https://vi.wikipedia.org/wiki/B%C3%A3o_Yagi_(2024)) là xoáy thuận nhiệt đới thứ 11 của Mùa bão Tây Bắc Thái Bình Dương 2024. Cơn bão đã ảnh hưởng tới một loạt các nước châu Á đặc biệt là Philippines, Trung Quốc và Việt Nam.
- Tại những thời điểm này thường xuất hiện các nhu cầu ứng dụng CNTT để kết nối cộng đồng, cung cấp thông tin nhanh phục vụ các hoạt động ứng phó khẩn cấp, khắc phục hậu quả, hỗ trợ nhân đạo sau thảm họa.

## Chức Năng Chính

Project tập trung vào các chức năng chính như sau:
- Đăng ký làm tình nguyện viên.
- Đăng ký thành lập tổ chức.
- Gửi yêu cầu hỗ trợ.
- Bản đồ hỗ trợ.
- AI tra cứu vấn đề liên quan đến thiên tai và cứu trợ.

## 👩‍💻 Tổng Quan Hệ Thống

Hệ thống được xây dựng bằng công nghệ LCDP (Low code development platform), cụ thể là [Budibase](https://budibase.com/)


## Cấu trúc thư mục

```
.
├── .github/
├── docs/
│   ├── docs/
│   ├── images/
│   ├── .gitignore
│   └── mkdocs.yaml
├── src/
│   └── <export_file>.tar.gz
├── .gitignore
├── LICENSE
└── README.md
```

## Hướng Dẫn Cài Đặt


### Yêu Cầu 📋

Để cài đặt và chạy được dự án, trước tiên bạn cần phải cài đặt các công cụ bên dưới. Hãy thực hiện theo các hướng dẫn cài đặt sau, lưu ý chọn hệ điều hành phù hợp với máy tính:

-   [Docker-Installation](https://docs.docker.com/get-docker/)
-   [Docker-Compose-Installation](https://docs.docker.com/compose/install/)
-   [NodeJS v22-Installation](https://nodejs.org/en/download/)
-   [Budibase Cli-Installation](https://docs.budibase.com/docs/budibase-cli-setup)

### 🔨 Cài Đặt

Trước hết, hãy khởi tạo dự án:

```bash
mkdir myProject
cd myProject

budi hosting --init
```

Tiếp theo, khởi chạy dự án của bạn:

```bash
budi hosting --start
```

Clone dự án của tôi về máy tính của bạn:

```bash
git clone https://github.com/NHD04072004/F5-alpha.git
```

## 🙌 Đóng góp cho dự án

Bạn muốn đóng góp cho dự án, hãy đọc [CONTRIBUTING](.github/CONTRIBUTING.md) để biết thêm chi tiết.

## Liên hệ

Nếu bạn có câu hỏi, đừng ngần ngại liên hệ với chúng tôi

- Nguyễn Hải Đăng: 22a1001d0049@students.hou.edu.vn
- Nguyễn Thế Lộc: 22a1001d0199@students.hou.edu.vn
- Trần Anh Quân: 22a1001d0275@students.hou.edu.vn

## 📝 License

This project is licensed under the terms of the [Apache-2.0](LICENSE) license.
