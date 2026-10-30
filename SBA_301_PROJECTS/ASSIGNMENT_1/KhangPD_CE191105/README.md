<!-- Sinh viên: Phùng Đình Khang - CE191105 -->
KhangPDCE191105
ASSIGNMENT 1

## Xem chi tiết

Nhấn nút hình mắt trong cột Thao tác của bảng Danh mục, Tin tức hoặc Tài khoản để mở popup chỉ đọc.

- Danh mục: ID, tên, mô tả đầy đủ, trạng thái, số lượng và danh sách bài viết thuộc danh mục.
- Tin tức: ID, tiêu đề, danh mục, tác giả, ngày tạo, trạng thái, tags và toàn bộ nội dung, giữ xuống dòng.
- Tài khoản: ID, username, họ tên, email, vai trò, trạng thái và ngày tạo; không hiển thị mật khẩu.
- Đóng bằng nút Đóng, dấu X, Escape hoặc nhấn vùng nền. Nội dung dài cuộn trong popup.

Workflow code: nút Xem chi tiết cập nhật `detailCategoryId` / `detailNewsId` / `detailUserId` ở view tương ứng; view tìm record từ props và render `DetailModal`. Component này dùng lại `Modal` với chế độ cuộn. Đóng popup đặt id về null. Xem chi tiết không gọi handler CRUD hoặc ghi localStorage; App vẫn giữ dữ liệu nguồn dùng chung.

## Đăng nhập

Login kiểm tra danh sách tài khoản đang lưu trong localStorage (dữ liệu mẫu được nạp khi chưa có dữ liệu). Username không phân biệt hoa thường; mật khẩu có phân biệt hoa thường. Chỉ tài khoản có `status: 1` và role Admin/Staff hợp lệ được đăng nhập.

- Tài khoản mẫu đang hoạt động: `Admin / Admin`, `Staff / Staff`, `khangpd / 123`.
- `guest_writer / 123` ban đầu có `status: 0`, nên bị khóa. Đăng nhập Admin, vào Quản lý Tài khoản, sửa tài khoản này sang Hoạt động rồi lưu; sau đó đăng xuất và đăng nhập `guest_writer / 123`.
- Tài khoản mới tạo, đổi mật khẩu, khóa hoặc xóa trong CRUD được áp dụng ở lần đăng nhập tiếp theo. Nút điền nhanh Admin/Staff chỉ là gợi ý dữ liệu mẫu; không bỏ qua kiểm tra tài khoản đã lưu.
- Session đăng nhập chỉ chứa id, username, fullName, role; không chứa password. Đây vẫn là mock authentication cục bộ, chưa có backend.

https://github.com/khangpd15/SBA\_TASK\_LAB/tree/main/SBA\_301\_PROJECTS/ASSIGNMENT/KhangPD\_CE191105

