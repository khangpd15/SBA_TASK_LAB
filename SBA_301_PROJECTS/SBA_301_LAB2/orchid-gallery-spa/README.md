# Orchid Gallery SPA

Ứng dụng Single Page Application (SPA) hiển thị bộ sưu tập hoa lan, được xây dựng bằng **React**, **Vite** và **React-Bootstrap**. Dự án phục vụ cho bài lab môn học **SBA301**, minh họa kỹ thuật quản lý trạng thái, Custom Hook, tối ưu hóa giao tiếp mạng và chiến lược lưu bộ nhớ đệm (Cache Policy).

---

## 1. Mục tiêu (Objectives)

- **Xây dựng giao diện SPA trực quan**: Hiển thị danh sách hoa lan dạng thẻ lưới (Card Grid), xem chi tiết qua cửa sổ Modal, phân loại hoa đặc biệt (`Special`).
- **Quản lý trạng thái bất đồng bộ**: Xử lý đầy đủ các trạng thái của dữ liệu gồm: `loading` (đang tải), `error` (báo lỗi & thử lại), và `success` (hiển thị dữ liệu).
- **Tách biệt tầng dữ liệu & giao diện**: Sử dụng Custom Hook (`useOrchids`) kết hợp cùng tầng Service API (`orchidService`) để tách rời logic lấy dữ liệu khỏi UI component.
- **Áp dụng chiến lược Caching**: Triển khai chính sách bộ nhớ tạm In-Memory TTL Cache giúp giảm thiểu request thừa và tăng tốc độ phản hồi cho người dùng.
- **Sẵn sàng tích hợp Backend**: Cấu trúc linh hoạt giữa Mock Data, Static JSON (`Fetch API` / `Axios`) và dễ dàng chuyển đổi sang RESTful API (Spring Boot).

---

## 2. Prerequisites (Yêu cầu hệ thống)

Trước khi bắt đầu, hãy đảm bảo máy tính đã cài đặt các công cụ sau:

- **Node.js**: Phiên bản `>= 18.x` hoặc `20.x LTS` ([Tải tại nodejs.org](https://nodejs.org/))
- **Trình quản lý gói**: `npm` (mặc định đi kèm Node.js) hoặc `yarn`, `pnpm`
- **Trình duyệt Web**: Phiên bản mới nhất của Chrome, Edge, Firefox,...

Kiểm tra phiên bản cài đặt trên terminal:
```bash
node -v
npm -v
```

---

## 3. Cài đặt (Install)

1. Mở terminal tại thư mục gốc của dự án:
   ```bash
   cd orchid-gallery-spa
   ```

2. Cài đặt toàn bộ các thư viện phụ thuộc (`dependencies` & `devDependencies`):
   ```bash
   npm install
   ```

Các thư viện chính được sử dụng:
- `react`, `react-dom` (v19)
- `bootstrap`, `react-bootstrap` (Hỗ trợ Grid System, Modal, Card, Button, Badge)
- `axios` (HTTP client hỗ trợ gọi API)
- `vite` (Build tool và Dev server siêu tốc)

---

## 4. Chạy ứng dụng (Run)

Khởi động môi trường phát triển (Development Server) với tính năng Hot Module Replacement (HMR):

```bash
npm run dev
```

Sau khi chạy lệnh, truy cập vào ứng dụng trên trình duyệt:
- Local URL: **`http://localhost:5173/`**

---

## 5. Đóng gói & Kiểm tra (Build & Preview)

### Đóng gói ứng dụng (Production Build)
Biên dịch và tối ưu hóa toàn bộ mã nguồn vào thư mục `dist/`:
```bash
npm run build
```

### Chạy thử bản Build (Preview)
Khởi chạy web server nội bộ để kiểm tra bản build production trước khi deploy:
```bash
npm run preview
```

### Kiểm tra cú pháp (Linting)
Quét và kiểm tra quy chuẩn mã nguồn với ESLint:
```bash
npm run lint
```

---

## 6. Cấu trúc Project (Project Structure)

```text
orchid-gallery-spa/
├── public/                     # Thư mục tài nguyên tĩnh (public assets)
│   ├── images/                 # Ảnh hoa lan
│   ├── favicon.svg             # Favicon ứng dụng
│   ├── icons.svg               # Bộ icon SVG
│   └── orchids.json            # Dữ liệu tĩnh JSON phục vụ Fetch/Axios API
├── src/                        # Mã nguồn chính của ứng dụng React
│   ├── api/                    # Tầng giao tiếp dữ liệu (API Services)
│   │   ├── apiClient.js        # Cấu hình Axios instance (baseURL, timeout, headers)
│   │   ├── orchidService.js    # Service chính: Fetch API kết hợp Cache Policy
│   │   └── orchidService.axios.example.js  # Service mẫu sử dụng Axios
│   ├── components/             # Các React UI Components
│   │   ├── ErrorMessage.jsx    # Component hiển thị thông báo lỗi & nút Retry
│   │   ├── LoadingSpinner.jsx  # Hiệu ứng Spinner trong khi tải dữ liệu
│   │   ├── NavBar.jsx          # Thanh điều hướng ứng dụng
│   │   ├── OrchidCard.jsx      # Thẻ thông tin hiển thị từng cây lan
│   │   ├── OrchidDetailModal.jsx # Hộp thoại Modal xem chi tiết hoa lan
│   │   └── Orchids.jsx         # Component quản lý & render lưới danh sách hoa lan
│   ├── hooks/                  # Custom React Hooks
│   │   └── useOrchids.js       # Hook quản lý fetch data, state loading, error, reload
│   ├── shared/                 # Dữ liệu & hằng số dùng chung
│   │   └── ListOfOrchids.js    # Dữ liệu mảng mẫu (Mock Data JavaScript)
│   ├── App.css                 # CSS tùy biến giao diện
│   ├── App.jsx                 # Component gốc (Root Component)
│   ├── index.css               # CSS toàn cục
│   └── main.jsx                # Điểm vào chính của ứng dụng (Entry Point)
├── eslint.config.js            # Cấu hình ESLint
├── index.html                  # File HTML chính chứa thẻ <div id="root">
├── package.json                # Định nghĩa dependencies và scripts
└── vite.config.js              # Cấu hình Vite bundler & React plugin
```

---

## 7. Nguồn dữ liệu (Data Source)

Dự án hỗ trợ 3 hình thức nguồn dữ liệu để phục vụ cho các giai đoạn phát triển khác nhau:

1. **Local JavaScript Mock (`src/shared/ListOfOrchids.js`)**:
   - Dữ liệu tĩnh khởi tạo ban đầu, phù hợp cho việc dựng khung giao diện nhanh mà không cần máy chủ mạng.
2. **Static JSON Endpoint (`public/orchids.json`)**:
   - Tệp JSON đặt trong thư mục `public/` được cung cấp trực tiếp qua đường dẫn `/orchids.json`.
   - Giúp mô phỏng sát với hành vi gửi request qua mạng thực tế (Network Request) bằng `Fetch API` hoặc `Axios`.
3. **Backend REST API (Spring Boot - Mở rộng cho SBA301)**:
   - Dễ dàng thay đổi URL trong `src/api/apiClient.js` hoặc `src/api/orchidService.js` trỏ về API server thật (ví dụ: `http://localhost:8080/api/orchids`).

---

## 8. Chính sách bộ nhớ đệm (Cache Policy)

Cơ chế Cache được cài đặt trong `src/api/orchidService.js` nhằm tối ưu hóa hiệu năng, giảm thiểu gọi lại mạng không cần thiết:

- **Chiến lược**: In-Memory TTL (Time-To-Live) Caching.
- **Thời gian hiệu lực (TTL)**: **30 giây** (`CACHE_DURATION = 30_000 ms`).
- **Quy tắc hoạt động**:
  1. **Kiểm tra Cache hợp lệ**: Khi hàm `getOrchids()` được gọi, hệ thống kiểm tra xem dữ liệu trong RAM (`orchidCache`) còn hạn hay không (`now - cacheTime < CACHE_DURATION`).
  2. **Hit Cache**: Nếu cache còn hạn và không có yêu cầu bắt buộc làm mới (`!force`), hàm trả về ngay lập tức dữ liệu từ bộ nhớ đệm mà không phát sinh thêm HTTP Request.
  3. **Miss / Expired Cache**: Nếu chưa có cache hoặc cache đã quá 30 giây, một request mới tới `/orchids.json` sẽ được thực hiện, sau đó cập nhật lại `orchidCache` và mốc thời gian `cacheTime`.
  4. **Bỏ qua Cache (Force Refresh)**: Khi người dùng bấm nút **Reload** hoặc truyền tham số `{ force: true }`, hệ thống sẽ bỏ qua cache hiện tại và tải trực tiếp dữ liệu mới nhất.
  5. **Xóa Cache thủ công**: Cung cấp phương thức `clearCache()` để chủ động làm rỗng cache khi cần thiết.
