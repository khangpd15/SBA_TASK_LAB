# NHẬT KÝ DEBUG VÀ XỬ LÝ SỰ CỐ (DEBUG LOG) - SBA301 ASSIGNMENT 01

> **Sinh viên:** Phan Doãn Khang (CE191105)  
> **Dự án:** FUNewsManagementSystem  
> **Mục tiêu:** Ghi lại quy trình debug có phương pháp (5 bước) theo yêu cầu Mục 6 của tài liệu hướng dẫn.

---

## Bảng Nhật ký Debug (Debug Decision Table)

| # | Lỗi (Triệu chứng quan sát được) | Giả thuyết ban đầu | Cách kiểm tra & Khoanh vùng | Nguyên nhân gốc rễ (Root Cause) | Giải pháp khắc phục (Fix) | Kiểm thử lại (Retest) |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Nút bấm "Thêm bài viết mới" (btn-primary) bị trong suốt, chỉ thấy chữ màu trắng. | Biến CSS màu chủ đạo bị thiếu hoặc bị ghi đè bởi Bootstrap CSS. | Mở DevTools Inspect Element trên thẻ `<button>`, kiểm tra tab Styles thấy thuộc tính `background-color: var(--primary-600)` bị gạch ngang do biến không tồn tại. | Khi tích hợp Bootstrap 5, file `src/styles/index.css` mới chưa khai báo đầy đủ biến `--primary-600`. | Khai báo bổ sung `--primary-600: #4f46e5` và thêm rule `.btn-primary { background-color: #4f46e5 !important; }` để định hình màu nút chuẩn xác. | Nút hiển thị màu xanh Indigo `#4f46e5` sắc nét, có đổ bóng và hover đổi màu chuẩn. |
| **2** | Cột "Danh mục" trong bảng Tin tức bị ngắt dòng chữ kỳ lạ ("Công \n nghệ & \n AI"). | Thẻ badge có chiều rộng cố định quá nhỏ hoặc thuộc tính `display: inline-block` không có `white-space: nowrap`. | Kiểm tra class của thẻ badge trong file `NewsView.jsx` và layout table. Cột `<th>` không chỉ định độ rộng tối thiểu nên trình duyệt tự co cột lại. | Trình duyệt chia tỉ lệ cột tự động khi bảng có nhiều cột, làm co hẹp cột Danh mục xuống dưới 80px khiến chữ bị ép xuống 3 dòng. | Chuyển layout bảng sang hệ thống Bootstrap 5 (`table align-middle`), gán `style={{ width: '180px' }}` cho cột Danh mục và sử dụng class `badge bg-primary-subtle text-primary border`. | Chữ "Công nghệ & AI" nằm thẳng trên 1 dòng duy nhất, đẹp mắt và gọn gàng. |
| **3** | Mở dialog "Thêm mới" sau khi vừa bấm "Chỉnh sửa" thì dữ liệu bài viết cũ vẫn còn hiển thị trong form. | State của modal form (`formData`) không được reset khi chuyển `mode` từ `update` sang `create`. | Bấm nút Edit bài viết số 1 → đóng modal → bấm nút Thêm bài viết mới. Quan sát các ô input trong form. | Hook `useEffect` lắng nghe `[isOpen, mode, newsItem]` nhưng nhánh `mode === 'create'` không làm sạch hết các trường dữ liệu phụ (như `tagsString`). | Trong nhánh `mode === 'create'`, thiết lập lại toàn bộ `formData` về giá trị rỗng mặc định và xóa toàn bộ state `errors`. | Mở Edit rồi mở Add liên tiếp: form Add luôn hoàn toàn trắng sạch và sẵn sàng nhập mới. |

---

## Quy trình 5 Bước Debug Chuẩn đã Áp dụng

1. **Mô tả triệu chứng:** Quan sát trực quan qua giao diện hoặc console log (ví dụ: chữ bị ngắt dòng, form còn dữ liệu cũ).
2. **Khoanh vùng:** Xác định component nào quản lý view đó (ví dụ: `NewsView.jsx`, `NewsModal.jsx`, `index.css`).
3. **Kiểm tra dữ liệu vào:** Kiểm tra props, state, form inputs thông qua React Developer Tools.
4. **Kiểm tra điểm biến đổi:** Kiểm tra event handlers, hook `useEffect`, `map()`, `filter()`.
5. **Sửa thay đổi nhỏ nhất & Retest:** Sửa đúng chỗ cần thiết, không viết lại toàn bộ code, chạy lại test case để đảm bảo không bị regression.
