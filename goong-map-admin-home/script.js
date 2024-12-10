const GOONG_API_KEY = "32kmtyYrNGxGT8HTfQuZoJKwKNltvXVh4fucACBd";
const GOONG_API_DIRECTION = "mCTsP9i1RSee5Q2df9p57Gvseo9aueYfgdWDKaZO";

// Gán API key cho Goong JS
goongjs.accessToken = GOONG_API_KEY;

// Lấy vị trí hiện tại và khởi tạo bản đồ
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      initializeMap(latitude, longitude);
    },
    () => {
      console.warn("Không thể lấy vị trí hiện tại. Sử dụng tọa độ mặc định.");
      initializeMap(10.762622, 106.660172); // Tọa độ mặc định
    }
  );
} else {
  console.error("Trình duyệt không hỗ trợ geolocation.");
  initializeMap(10.762622, 106.660172); // Tọa độ mặc định
}

// Hàm khởi tạo bản đồ
function initializeMap(lat, lng) {
  const map = new goongjs.Map({
    container: "map",
    style: "https://tiles.goong.io/assets/goong_map_web.json",
    center: [lng, lat],
    zoom: 13,
  });

  new goongjs.Marker({ color: "Magenta" })
    .setLngLat([lng, lat])
    .addTo(map);

  loadMarkersWithRouting(map, lng, lat);

  // Thêm nút "Vị trí của tôi" sau khi khởi tạo bản đồ
  addLocationButton(map, lat, lng);
}

// Hàm tải các điểm cứu trợ và thiết lập sự kiện click vào marker
async function loadMarkersWithRouting(map, userLng, userLat) {
  try {
    const response = await fetch("https://goong-map-admin.vercel.app/locations");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const locations = await response.json();

    removeOldMarkers(map); // Xóa các marker cũ trước khi thêm mới

    locations.forEach((location) => {
      // Xác định màu marker dựa trên trạng thái
      let markerColor = "red"; // Mặc định là màu đỏ
      if (location.status === "Đang cứu trợ") {
        markerColor = "orange";
      } else if (location.status === "Hoàn thành cứu trợ") {
        markerColor = "green";
      }

      const marker = new goongjs.Marker({ color: markerColor })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);

      // Tạo nội dung popup với dropdown và nút cập nhật
      const popupContent = document.createElement("div");

      const infoSection = document.createElement("div");
      infoSection.innerHTML = `
        <h4>${location.name || "Không có tên"}</h4>
        <p><b>Tên người gửi:</b> ${location.request_sender}</p>
        <p><b>SĐT:</b> ${location.phone_number}</p>
        <p><b>Loại yêu cầu:</b> ${location.request_type}</p>
        <p><b>Số lượng người cần cứu trợ:</b> ${location.number_people || "Không có thông tin"}</p>
        <p><b>Trạng thái hiện tại:</b> ${location.status}</p>
      `;

      // Dropdown chọn trạng thái
      const statusSelect = document.createElement("select");
      ["Đang cứu trợ", "Chờ cứu trợ", "Hoàn thành cứu trợ"].forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        if (status === location.status) {
          option.selected = true;
        }
        statusSelect.appendChild(option);
      });

      // Nút cập nhật trạng thái
      const updateButton = document.createElement("button");
      updateButton.textContent = "Cập nhật trạng thái";
      updateButton.style.marginTop = "10px";

      updateButton.addEventListener("click", async () => {
        const newStatus = statusSelect.value;

        try {
          const response = await fetch(`https://goong-map-admin.vercel.app/locations/${location._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          });

          if (response.ok) {
            alert("Cập nhật trạng thái thành công!");
            // Gọi lại để load các marker mới
            loadMarkersWithRouting(map, userLng, userLat);
          } else {
            alert("Cập nhật trạng thái thất bại!");
          }
        } catch (error) {
          console.error("Lỗi khi cập nhật trạng thái:", error);
        }
      });

      popupContent.appendChild(infoSection);
      popupContent.appendChild(statusSelect);
      popupContent.appendChild(updateButton);

      const popup = new goongjs.Popup({ offset: 25 }).setDOMContent(popupContent);
      marker.setPopup(popup);
    });

    // Thêm "Vị trí của tôi" vào danh sách
    const userLocation = { name: "Vị trí của tôi", latitude: userLat, longitude: userLng };
    locations.unshift(userLocation);

    setupRouting(map, locations, userLat, userLng);
  } catch (error) {
    console.error("Không thể tải dữ liệu địa điểm:", error);
  }
}

// Hàm xóa các marker cũ
function removeOldMarkers(map) {
  const layers = map.getStyle().layers;
  layers.forEach((layer) => {
    if (layer.id.startsWith("marker") || layer.id === "route") {
      map.removeLayer(layer.id);
      map.removeSource(layer.id);
    }
  });
}





function setupRouting(map, locations, userLat, userLng) {
  const pointSelector = document.getElementById("point-selector");

  // Xóa các phần tử con cũ của `pointSelector` nếu có
  while (pointSelector.firstChild) {
    pointSelector.removeChild(pointSelector.firstChild);
  }

  // Tạo dropdown và nút tìm đường mới
  const startSelect = createDropdown("start-point", "Chọn điểm bắt đầu", locations);
  const endSelect = createDropdown("end-point", "Chọn điểm đến", locations);

  const routeButton = document.createElement("button");
  routeButton.textContent = "Tìm đường";
  routeButton.addEventListener("click", async () => {
    const startIndex = startSelect.value;
    const endIndex = endSelect.value;

    if (startIndex === endIndex || startIndex === "" || endIndex === "") {
      alert("Vui lòng chọn hai điểm khác nhau.");
      return;
    }

    const startLocation = locations[startIndex];
    const endLocation = locations[endIndex];

    const result = await getDirectionsWithDistance(
      startLocation.longitude,
      startLocation.latitude,
      endLocation.longitude,
      endLocation.latitude
    );

    if (result) {
      drawRoute(map, result.polyline);

      const distanceInKm = (result.distance / 1000).toFixed(2);
      alert(
        `Tuyến đường từ "${startLocation.name}" đến "${endLocation.name}" có độ dài: ${distanceInKm} km.`
      );
    }
  });

  // Thêm dropdown và nút vào giao diện
  pointSelector.appendChild(startSelect);
  pointSelector.appendChild(endSelect);
  pointSelector.appendChild(routeButton);
}


// Hàm lấy chỉ đường và khoảng cách
async function getDirectionsWithDistance(startLng, startLat, endLng, endLat) {
  const directionsURL = `https://rsapi.goong.io/Direction?origin=${startLat},${startLng}&destination=${endLat},${endLng}&vehicle=car&api_key=${GOONG_API_DIRECTION}`;
  try {
    const response = await fetch(directionsURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return { polyline: route.overview_polyline.points, distance: route.legs[0].distance.value };
    } else {
      console.error("Không tìm thấy tuyến đường!");
      return null;
    }
  } catch (error) {
    console.error("Không thể lấy dữ liệu chỉ đường:", error);
    return null;
  }
}

// Hàm tạo dropdown
function createDropdown(id, placeholder, locations) {
  const select = document.createElement("select");
  select.id = id;

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = placeholder;
  select.appendChild(defaultOption);

  locations.forEach((location, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = location.name || `Điểm cứu trợ ${index + 1}`;
    select.appendChild(option);
  });

  return select;
}

// Hàm vẽ tuyến đường
function drawRoute(map, polyline) {
  const routeCoords = decodePolyline(polyline);

  const routeLayer = {
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: routeCoords,
        },
      },
    },
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#FF3366", "line-width": 4 },
  };

  if (map.getLayer("route")) {
    map.removeLayer("route");
    map.removeSource("route");
  }
  map.addLayer(routeLayer);
}

// Hàm giải mã polyline
function decodePolyline(encoded) {
  let index = 0, lat = 0, lng = 0, coordinates = [];
  while (index < encoded.length) {
    let result = 0, shift = 0, byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);

    result = shift = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : (result >> 1);

    coordinates.push([lng / 1e5, lat / 1e5]);
  }
  return coordinates;
}

// Thêm nút "Vị trí của tôi" vào bản đồ
function addLocationButton(map, userLat, userLng) {
  // Tạo một nút nhỏ
  const locationButton = document.createElement('button');
  locationButton.innerHTML = '<img width="24" height="24" src="https://img.icons8.com/ios-filled/50/location-off.png" alt="location-off"/>';
  locationButton.style.position = 'absolute';
  locationButton.style.top = '10px';  // Khoảng cách từ trên xuống
  locationButton.style.right = '10px';  // Khoảng cách từ phải vào
  locationButton.style.zIndex = '1';
  locationButton.style.border = 'none';
  locationButton.style.background = 'transparent';

  locationButton.onclick = function() {
    // Zoom đến vị trí người dùng khi nhấn vào nút
    map.flyTo({
      center: [userLng, userLat],
      zoom: 15,  // Zoom level tùy chỉnh
      essential: true
    });
  };

  // Thêm nút vào phần tử chứa bản đồ
  document.getElementById('map').appendChild(locationButton);
}


