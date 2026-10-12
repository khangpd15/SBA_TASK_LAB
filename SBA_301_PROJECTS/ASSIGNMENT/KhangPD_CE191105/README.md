# FUNewsManagementSystem - Assignment 01 (ReactJS + Bootstrap 5)

> **Môn học:** SBA301 – Integrate Single Page Application with Spring Boot  
> **Sinh viên thực hiện:** Phan Doãn Khang (KhangPD)  
> **Mã số sinh viên / Lớp:** CE191105  
> **Dự án:** FUNewsManagementSystem – Single Page Application (SPA) Quản trị Tin tức  
> **Công nghệ sử dụng:** React 19, Vite, Bootstrap 5, Lucide Icons, localStorage persistence  

---

## 1. Hướng dẫn Cài đặt và Khởi chạy (Setup & Run)

Chỉ cần 3 bước tiêu chuẩn để khởi chạy dự án:

```bash
# 1. Di chuyển vào thư mục dự án
cd KhangPD_CE191105

# 2. Cài đặt các gói phụ thuộc (Dependencies)
npm install

# 3. Khởi chạy Development Server
npm run dev
```

Sau khi chạy lệnh, truy cập trình duyệt tại địa chỉ: **`http://localhost:5173/`**

---

## 2. Tài khoản Đăng nhập Kiểm thử (Test Credentials)

Hệ thống tích hợp sẵn nút bấm điền nhanh (Quick Fill) tại màn hình đăng nhập:

| Vai trò (Role) | Tên đăng nhập (Username) | Mật khẩu (Password) | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `Admin` | `Admin` | Toàn quyền quản trị Dashboard, Category, News, Users, Settings |
| **Biên tập viên (Staff)** | `Staff` | `Staff` | Quyền biên tập Tin tức, Danh mục; không quản lý Users |

---

## 3. Danh sách Chức năng đã Hoàn thành (Core Scope)

Tuân thủ đầy đủ 12 yêu cầu trong **Requirement Traceability Matrix (R01 - R12)** và rubric 10 điểm:

1. **R01 - Cấu trúc Project Vite chuẩn:** Cấu trúc module hóa rõ ràng, chạy mượt mà với Vite và React 19.
2. **R02 & R03 - Xác thực người dùng (Login/Auth):** 
   - Controlled input cho username và password.
   - Bắt lỗi bỏ trống (Empty validation) và thông báo lỗi khi nhập sai credential.
   - Đăng nhập `Admin/Admin` chuyển vào trang quản trị; hỗ trợ tài khoản `Staff`.
3. **R04 - Logo hệ thống:** Logo vector SVG sắc nét cho FUNewsManagementSystem tại Header và trang Login.
4. **R05 & R06 - Master Layout & Navigation:**
   - Sidebar với 5 menu: **Dashboard (Bảng điều khiển)**, **Category (Danh mục)**, **News (Tin tức)**, **Users (Tài khoản)**, **Settings (Cài đặt)**.
   - Header hiển thị breadcrumb, chuyển đổi Dark/Light mode, thông tin tài khoản phiên làm việc và nút Đăng xuất.
5. **R07 - Quản lý Danh mục (Category Management):**
   - Đầy đủ CRUD (Create, Read, Update, Delete) + Search theo tên danh mục.
   - Lọc theo trạng thái Active / Inactive.
   - Popup Modal cho Create/Update; cảnh báo an toàn khi xóa danh mục đang có bài viết liên kết.
6. **R08 - Quản lý Tin tức (News Management):**
   - Đầy đủ CRUD + Search theo tiêu đề, nội dung và thẻ tags.
   - Lọc kết hợp theo Danh mục (Category) và Trạng thái (Status).
   - Popup Modal chọn danh mục từ state Category; nhập tags phân tách bằng dấu phẩy.
7. **R09 - Quản lý Tài khoản (User Management):**
   - Đầy đủ CRUD + Search theo username, họ tên, email.
   - Lọc theo phân quyền (Admin / Staff) và trạng thái.
   - Cơ chế bảo vệ: Không cho phép tự xóa tài khoản đang đăng nhập phiên hiện tại.
8. **R10 - Popup Dialog Create/Update:** Tái sử dụng Modal, hỗ trợ phím ESC, click backdrop, nút **Reset** khôi phục form ban đầu (Transfer task).
9. **R11 - Xác nhận xóa (Delete Confirmation):** Hộp thoại xác nhận hiển thị tên đối tượng cần xóa; bấm "Hủy bỏ" giữ nguyên dữ liệu, bấm "Xác nhận xóa" mới thực hiện xóa.
10. **R12 - Bền vững dữ liệu (Mock Persistence):** Tự động lưu trữ và đồng bộ hóa qua `localStorage` (dữ liệu không bị mất sau khi reload trang F5).
11. **Bảng điều khiển (Dashboard):** 4 thẻ thống kê số liệu tổng quan, bảng bài viết mới cập nhật và thanh tiến trình phân bố danh mục.
12. **Cài đặt & Khôi phục (Settings):** Chuyển đổi Dark Mode / Light Mode và nút bấm "Khôi phục dữ liệu ban đầu" (Factory Reset) tiện lợi cho việc demo.

---

## 4. Kiến trúc Thư mục Dự án (Project Architecture)

```
KhangPD_CE191105/
├── public/
│   └── logo.svg                 # Logo Favicon
├── src/
│   ├── assets/
│   │   └── logo.svg             # Logo SVG FUNews
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Modal.jsx        # Dialog Modal container
│   │   │   ├── ConfirmDialog.jsx# Delete confirmation prompt
│   │   │   ├── Toast.jsx        # Toast feedback messages
│   │   │   └── EmptyState.jsx   # No-data & no-search-result UI
│   │   ├── forms/               # CRUD Form Modals
│   │   │   ├── CategoryModal.jsx
│   │   │   ├── NewsModal.jsx
│   │   │   └── UserModal.jsx
│   │   └── layout/              # Master layout
│   │       ├── AdminLayout.jsx
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── services/
│   │   ├── initialData.js       # Seed demo data
│   │   └── storageService.js    # Data access layer & localStorage
│   ├── styles/                  # CSS Design System
│   │   ├── index.css            # Bootstrap overrides & tokens
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── views.css
│   ├── views/                   # Feature Views / Pages
│   │   ├── LoginView.jsx
│   │   ├── DashboardView.jsx
│   │   ├── CategoryView.jsx
│   │   ├── NewsView.jsx
│   │   ├── UserView.jsx
│   │   └── SettingsView.jsx
│   ├── App.jsx                  # Root component (State, Routing, Handlers)
│   └── main.jsx                 # Vite entry point
├── package.json
├── README.md
├── TEST_MATRIX.md               # 35 test cases chi tiết
├── DEBUG_LOG.md                 # Nhật ký debug 3 lỗi thực tế
└── INTERVIEW_PREP.md            # Tài liệu ôn tập phỏng vấn 10/10
```

---

## 5. Nhật ký Sử dụng AI có Kiểm soát (AI Usage Log)

Tuân thủ quy tắc trung thực học thuật mục 9 trong tài liệu hướng dẫn:

| # | Prompt / Mục đích | Gợi ý của AI | Cách sinh viên kiểm chứng | Phần đã chỉnh sửa |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Khởi tạo cấu trúc dự án Vite React | Gợi ý template React chuẩn và script chạy | Chạy `npm run dev` và kiểm tra cấu trúc thư mục | Đổi tên package và folder theo quy ước `KhangPD_CE191105` |
| 2 | Thiết kế giao diện Bootstrap 5 cho bảng tin tức | Gợi ý bảng table Bootstrap kết hợp input-group | Mở trình duyệt DevTools kiểm tra độ tương thích và wrap text | Chỉnh lại độ rộng các cột (ID, Tiêu đề, Danh mục, Actions) tránh vỡ chữ |
| 3 | Tối ưu hóa thuật toán tìm kiếm không mutate state | Đề xuất dùng `useMemo` kết hợp `filter` và `includes` | Nhập từ khóa chữ hoa/thường, xóa tìm kiếm | Bổ sung trim(), lowercase() và tìm kiếm mở rộng trên tags |

---

## 6. Giới hạn Phạm vi (Scope & Limitations)

- Bài tập sử dụng Mock Service kết hợp `localStorage` của trình duyệt theo đúng quy định mục 1.3 của đề bài (không bắt buộc Spring Boot backend và database MySQL/SQL Server thật ở Assignment 01).
- Kiến trúc được module hóa tại tầng `storageService.js` để ở Assignment tiếp theo có thể thay thế bằng `axios` / `fetch` gọi trực tiếp RESTful API của Spring Boot mà không cần thay đổi giao diện.
