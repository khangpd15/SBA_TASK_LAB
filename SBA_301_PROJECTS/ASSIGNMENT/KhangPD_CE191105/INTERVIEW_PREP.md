# TÀI LIỆU ÔN TẬP PHỎNG VẤN VÀ BẢO VỆ CODE (INTERVIEW PREP)

> **Môn học:** SBA301 – Integrate Single Page Application with Spring Boot  
> **Sinh viên:** Phan Doãn Khang (CE191105)  
> **Dự án:** FUNewsManagementSystem  
> **Mục tiêu:** Nắm vững cấu trúc code, quy luật thực thi và tự tin trả lời phỏng vấn trong 30 giây để đạt điểm tối đa (10.0 Rubric).

---

## 1. Khung Trả lời 5 Tầng Chuẩn (The 5-Layer Framework)

Khi giảng viên chỉ vào bất kỳ file nào và hỏi: *"File này làm gì?"*, hãy trả lời theo 5 bước:

1. **Purpose (Mục đích):** File/component này chịu trách nhiệm gì trong hệ thống?
2. **Input (Dữ liệu vào):** Props, state hoặc dữ liệu nào được truyền vào component này?
3. **Trigger (Tác nhân kích hoạt):** Sự kiện (`onClick`, `onChange`, `onSubmit`) hoặc `useEffect` nào kích hoạt logic?
4. **Transform (Xử lý biến đổi):** Dữ liệu được validate, filter hoặc cập nhật (immutable) như thế nào?
5. **Output (Dữ liệu ra):** State nào thay đổi và giao diện React render lại như thế nào?

---

## 2. Trả lời Nhanh "Mở file và chỉ code" (≤ 30 Giây)

### Q1: Mở file xử lý đăng nhập và chỉ điều kiện Admin/Admin?
- **Mở file:** `src/views/LoginView.jsx` (dòng 29-41).
- **Chỉ code:**
  ```javascript
  if (trimmedUser === 'Admin' && trimmedPass === 'Admin') {
    onLoginSuccess({ id: 1, username: 'Admin', role: 1 });
  }
  ```
- **Giải thích:** Sử dụng Controlled Inputs (`username`, `password` state). Validate rỗng trước, sau đó kiểm tra đúng cặp `Admin`/`Admin` thì kích hoạt callback `onLoginSuccess`.

### Q2: Auth state lưu ở đâu? Sau khi reload có bị mất không?
- **Mở file:** `src/App.jsx` và `src/services/storageService.js`.
- **Giải thích:** Auth state được lưu trong state `currentUser` của `App.jsx`. Đồng thời đồng bộ lưu vào `localStorage.setItem('funews_current_user', ...)` nên khi F5 reload trang, state được hydrate (phục hồi) lại ngay lập tức, không bị văng ra màn hình đăng nhập. Khi bấm "Đăng xuất", hàm `handleLogout` sẽ set `currentUser = null` và xóa key trong `localStorage`.

### Q3: Mở logic Create/Update Category và giải thích tính chất Immutable Update?
- **Mở file:** `src/App.jsx` (hàm `handleAddCategory` và `handleUpdateCategory`).
- **Chỉ code:**
  - **Create:** `const updatedList = [createdItem, ...categories];` (Toán tử spread, tạo mảng mới thay vì `categories.push()`).
  - **Update:** `categories.map(cat => cat.id === id ? { ...cat, ...updatedFields } : cat);` (Hàm `map()` trả về mảng mới, giữ nguyên các phần tử khác và thay thế đúng phần tử có ID trùng khớp).
- **Lý do:** React so sánh tham chiếu (`shallow comparison`) để biết state có thay đổi hay không. Nếu mutate trực tiếp mảng cũ (`categories.push` hoặc `categories[i] = ...`), tham chiếu bộ nhớ không đổi và React sẽ **không re-render** lại giao diện!

### Q4: Mở logic Search và chứng minh danh sách gốc không bị mất?
- **Mở file:** `src/views/NewsView.jsx` (hoặc `CategoryView.jsx`).
- **Chỉ code:**
  ```javascript
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchSearch = !keyword || item.title.toLowerCase().includes(keyword)...;
      const matchCategory = selectedCategoryFilter === 'ALL' || String(item.categoryId) === selectedCategoryFilter;
      return matchSearch && matchCategory;
    });
  }, [news, searchTerm, selectedCategoryFilter]);
  ```
- **Giải thích:** Dữ liệu gốc nằm an toàn trong state `news`. Biến `filteredNews` là dữ liệu hiển thị (derived state) được tính toán tức thời thông qua `useMemo` và `filter()`. Khi người dùng xóa từ khóa tìm kiếm (`searchTerm = ''`), `filteredNews` tự động quay lại toàn bộ danh sách gốc mà không cần gọi lại dữ liệu từ storage.

### Q5: Mở logic Xóa và Delete Confirmation?
- **Mở file:** `src/views/CategoryView.jsx` (hoặc `NewsView.jsx`).
- **Chỉ code:** Khi bấm icon Thùng rác, ta lưu object vào state `categoryToDelete` và mở modal `isConfirmOpen = true`. Nếu người dùng bấm "Hủy bỏ", ta chỉ đóng modal và reset state rác. Chỉ khi người dùng bấm "Xác nhận xóa", hàm `onDeleteCategory(id)` mới được kích hoạt để loại bỏ item bằng `filter(c => c.id !== id)`.

---

## 3. Câu hỏi Phỏng vấn Kiến trúc & Mở rộng (Transfer Tasks)

### Q: Nếu Assignment 02 kết nối Spring Boot API thật thì em sẽ thay đổi tầng nào?
- **Trả lời:** Em chỉ cần thay đổi **duy nhất tầng `src/services/storageService.js`**.
  - Thay vì đọc/ghi vào `localStorage`, ta thay các hàm `getNews()`, `saveNews()` bằng các hàm `async/await` gọi `axios.get('/api/news')`, `axios.post('/api/news')` đến backend Spring Boot Controller.
  - Toàn bộ giao diện UI (Views, Components, Tables, Modals) được giữ nguyên hoàn toàn do tính trừu tượng hóa và tách biệt tầng rõ ràng (Separation of Concerns).

### Q: Nếu thêm role Staff (Biên tập viên) thì hệ thống xử lý thế nào?
- **Trả lời:** Em đã tích hợp sẵn role Staff (`role = 2`)! Khi đăng nhập bằng `Staff / Staff`:
  - Trong `Sidebar.jsx`, menu "Quản lý Tài khoản" được kiểm tra `restricted: currentUser?.role === 2` và tự động vô hiệu hóa / ẩn đi.
  - Staff vẫn có thể đăng bài và quản lý tin tức bình thường.
  - Mọi bài viết tạo bởi Staff sẽ tự động gán nhãn `createdBy: "Staff"`.

### Q: Bố cục giao diện Bootstrap 5 được tổ chức như thế nào?
- **Trả lời:** Em sử dụng hệ thống Grid System của Bootstrap 5 kết hợp các utility classes:
  - Layout chia thành `app-sidebar` cố định bên trái (260px) và `main-wrapper` bên phải co giãn linh hoạt (`d-flex flex-column flex-grow-1`).
  - Sử dụng các component chuẩn: `table table-hover align-middle`, `card border-0 shadow-sm`, `badge bg-primary-subtle text-primary`, `modal-dialog modal-dialog-centered`.
  - Hỗ trợ chế độ Dark Mode thông qua thuộc tính chuẩn `data-bs-theme="dark"` của Bootstrap 5.
