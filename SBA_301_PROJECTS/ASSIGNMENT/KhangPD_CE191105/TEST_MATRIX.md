# BẢNG MA TRẬN KIỂM THỬ (TEST MATRIX) - SBA301 ASSIGNMENT 01

> **Sinh viên:** Phan Doãn Khang (CE191105)  
> **Dự án:** FUNewsManagementSystem  
> **Mục tiêu:** Kiểm thử toàn diện 35 ca kiểm thử chuẩn (Normal, Negative, Edge case) theo Mục 5.1 của tài liệu hướng dẫn.

---

| # | Phân nhóm | Tên Test Case | Thao tác thực hiện | Kết quả mong đợi | Kết quả thực tế / Trạng thái |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **1** | Login | Empty | Bấm "Đăng nhập" khi để trống cả username và password | Không đăng nhập; hiển thị thông báo lỗi yêu cầu nhập | **PASS** |
| **2** | Login | Wrong credential | Nhập sai tài khoản (VD: `abc` / `123`) | Không vào trang admin; báo lỗi thông tin sai | **PASS** |
| **3** | Login | Valid Admin | Nhập `Admin` / `Admin` hoặc bấm nút điền nhanh | Đăng nhập thành công, chuyển hướng vào Admin Dashboard | **PASS** |
| **4** | Auth | Logout | Bấm nút "Đăng xuất" ở Header sau khi đã đăng nhập | Trở về màn hình Login; phiên làm việc bị xóa | **PASS** |
| **5** | Layout | Menu completeness | Quan sát Sidebar sau khi đăng nhập | Có đủ 5 menu: Dashboard, Category, News, Users, Settings | **PASS** |
| **6** | Navigation | All menus | Lần lượt bấm vào từng menu trên Sidebar | Chuyển đúng nội dung từng trang mà không reload toàn bộ trang | **PASS** |
| **7** | Category | Read | Chuyển đến trang "Quản lý Danh mục" | Hiển thị đầy đủ danh sách 5 danh mục ban đầu | **PASS** |
| **8** | Category | Create valid | Bấm "Thêm danh mục", nhập tên hợp lệ, bấm "Tạo danh mục" | Bản ghi mới xuất hiện ngay lập tức trên bảng | **PASS** |
| **9** | Category | Create invalid | Để trống tên danh mục và bấm "Tạo danh mục" | Không thêm mới; hiển thị thông báo lỗi trường bắt buộc | **PASS** |
| **10** | Category | Update | Bấm Edit ở 1 danh mục, sửa tên/mô tả, bấm "Lưu thay đổi" | Cập nhật chính xác bản ghi đó theo ID | **PASS** |
| **11** | Category | Delete cancel | Bấm Delete ở 1 danh mục, bấm "Hủy bỏ" trong hộp thoại | Hộp thoại đóng lại; bản ghi vẫn giữ nguyên trong bảng | **PASS** |
| **12** | Category | Delete confirm | Bấm Delete ở 1 danh mục, bấm "Xác nhận xóa" | Bản ghi biến mất khỏi bảng; có thông báo toast phản hồi | **PASS** |
| **13** | Category | Search hit | Nhập từ khóa có tồn tại (VD: "Công nghệ") vào ô tìm kiếm | Danh sách lọc chính xác các danh mục khớp từ khóa | **PASS** |
| **14** | Category | Search miss | Nhập từ khóa không tồn tại (VD: "XYZ999") | Hiển thị giao diện Empty State "Không tìm thấy kết quả" | **PASS** |
| **15** | News | Read | Chuyển đến trang "Quản lý Tin tức" | Hiển thị đầy đủ danh sách 5 bài viết tin tức ban đầu | **PASS** |
| **16** | News | Create valid | Bấm "Thêm bài viết mới", chọn danh mục, điền tiêu đề/nội dung | Bài viết mới xuất hiện ở đầu bảng | **PASS** |
| **17** | News | Create invalid | Bỏ trống tiêu đề hoặc nội dung và bấm submit | Form chặn lại; hiển thị thông báo lỗi màu đỏ | **PASS** |
| **18** | News | Update | Bấm Edit ở 1 bài viết, sửa tiêu đề, bấm "Lưu bài viết" | Đúng bài viết đó được cập nhật nội dung mới | **PASS** |
| **19** | News | Delete cancel | Bấm Delete ở 1 bài viết, bấm "Hủy bỏ" trong confirm dialog | Bài viết vẫn còn nguyên trong bảng | **PASS** |
| **20** | News | Delete confirm | Bấm Delete ở 1 bài viết, bấm "Xác nhận xóa" | Bài viết bị xóa khỏi danh sách; toast hiển thị xác nhận | **PASS** |
| **21** | News | Search hit | Nhập từ khóa có tồn tại (VD: "Robotics" hoặc "AI") | Danh sách lọc ra đúng bài viết liên quan | **PASS** |
| **22** | News | Search miss | Nhập từ khóa không tồn tại (VD: "KhongCoTinNay") | Hiển thị Empty State với nút "Xóa bộ lọc" | **PASS** |
| **23** | Users | Read | Chuyển đến trang "Quản lý Tài khoản" | Hiển thị danh sách tài khoản người dùng ban đầu | **PASS** |
| **24** | Users | Create valid | Bấm "Thêm tài khoản", nhập username, họ tên, email chuẩn, submit | Tài khoản mới được thêm thành công vào hệ thống | **PASS** |
| **25** | Users | Create invalid | Nhập email sai định dạng (VD: `abc@xyz`) hoặc để trống username | Form chặn lại; hiển thị thông báo email không hợp lệ | **PASS** |
| **26** | Users | Update | Bấm Edit ở 1 tài khoản, sửa họ tên hoặc email, bấm Lưu | Bản ghi tài khoản được cập nhật chính xác | **PASS** |
| **27** | Users | Delete cancel | Bấm Delete ở 1 tài khoản, bấm "Hủy bỏ" | Tài khoản không bị xóa | **PASS** |
| **28** | Users | Delete confirm | Bấm Delete ở 1 tài khoản khác phiên hiện tại, bấm "Xác nhận xóa" | Tài khoản bị xóa khỏi danh sách | **PASS** |
| **29** | Users | Search hit | Nhập username hoặc họ tên tồn tại (VD: "khangpd") | Danh sách lọc chính xác tài khoản | **PASS** |
| **30** | Users | Search miss | Nhập từ khóa không tồn tại (VD: "NoSuchUser") | Hiển thị Empty State không tìm thấy kết quả | **PASS** |
| **31** | News | Relation | Mở modal Thêm bài viết mới, quan sát dropdown danh mục | Hiển thị đúng các danh mục lấy từ state Category | **PASS** |
| **32** | User | Role | Quan sát cột Vai trò trong Quản lý Tài khoản | Hiển thị nhãn rõ ràng: `1 - Admin` hoặc `2 - Staff` | **PASS** |
| **33** | Status | Display | Quan sát trạng thái ở Category, News, Users | Hiển thị nhãn trực quan `Active` (xanh) hoặc `Inactive` (đỏ) | **PASS** |
| **34** | Data | Empty state | Nhập từ khóa tìm kiếm không khớp bất kỳ mục nào | Giao diện hiển thị EmptyState thân thiện, không bị crash trắng trang | **PASS** |
| **35** | Persistence | Reload | Thêm/sửa 1 bản ghi rồi bấm F5 reload lại trang | Dữ liệu và trạng thái đăng nhập vẫn được giữ nguyên vẹn | **PASS** |

---

## Kết luận Đánh giá Kiểm thử

- **Tổng số test cases:** 35/35 đạt (100% Pass).
- **Mức độ bao phủ:** Đầy đủ luồng chuẩn (Happy path), luồng chặn lỗi (Validation), luồng hủy bỏ (Cancel/Confirmation) và tính bền vững của dữ liệu qua `localStorage`.
