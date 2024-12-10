// Thay YOUR_GOONG_API_KEY bằng API key của bạn
const GOONG_API_KEY = "32kmtyYrNGxGT8HTfQuZoJKwKNltvXVh4fucACBd";

// Gán API key cho Goong JS
goongjs.accessToken = GOONG_API_KEY;

// Tạo bản đồ
const map = new goongjs.Map({
  container: 'map', // ID của div chứa bản đồ
  style: 'https://tiles.goong.io/assets/goong_map_web.json', // Style bản đồ Goong
  center: [106.660172, 10.762622], // Toạ độ trung tâm (long, lat)
  zoom: 13 // Độ zoom
});

// Hàm tải các điểm đánh dấu từ backend
async function loadMarkers() {
  try {
    const response = await fetch('http://localhost:5000/locations'); // API backend
    const locations = await response.json();

    // Thêm các điểm đánh dấu lên bản đồ
    locations.forEach(location => {
      new goongjs.Marker()
        .setLngLat([location.longitude, location.latitude]) // Toạ độ của điểm
        .addTo(map);
    });
  } catch (error) {
    console.error('Không thể tải dữ liệu:', error);
  }
}

// Gọi hàm khi trang được tải
loadMarkers();
