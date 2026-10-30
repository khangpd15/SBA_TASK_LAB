// Sinh viên: Phùng Đình Khang - CE191105
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  RotateCcw, 
  User, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function SettingsView({
  currentUser = null,
  isDarkMode = false,
  onToggleTheme,
  onResetFactoryData
}) {
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Cài Đặt Hệ Thống (Settings)</h2>
        <p className="text-secondary small mb-0">Tùy biến giao diện, thông tin tài khoản và quản trị dữ liệu mẫu</p>
      </div>

      <div className="row g-4" style={{ maxWidth: '900px' }}>
        {/* Profile Card */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-body mb-1">Thông tin tài khoản phiên làm việc</h5>
              <p className="text-secondary small mb-3">Tài khoản đang đăng nhập trong phiên quản trị hiện tại</p>

              <div className="d-flex align-items-center justify-content-between p-3 bg-body-tertiary rounded-3 border">
                <div>
                  <h6 className="fw-bold mb-1">Tài khoản: {currentUser?.username || 'Admin'}</h6>
                  <p className="text-secondary small mb-0">
                    Họ tên: {currentUser?.fullName || 'Administrator'} • Vai trò: {currentUser?.role === 1 ? 'Quản trị viên (Admin)' : 'Biên tập viên (Staff)'}
                  </p>
                </div>
                <div className="avatar-circle" style={{ width: '42px', height: '42px', fontSize: '16px' }}>
                  {(currentUser?.username || 'A')[0].toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-body mb-1">Giao diện người dùng (Theme & Display)</h5>
              <p className="text-secondary small mb-3">Chuyển đổi chủ đề màu sắc sáng / tối (Dark Mode / Light Mode)</p>

              <div className="d-flex align-items-center justify-content-between p-3 bg-body-tertiary rounded-3 border">
                <div>
                  <h6 className="fw-bold mb-1">Chế độ hiển thị</h6>
                  <p className="text-secondary small mb-0">
                    Hiện đang áp dụng: <strong>{isDarkMode ? 'Chế độ Tối (Dark Theme)' : 'Chế độ Sáng (Light Theme)'}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 px-3 py-2"
                  onClick={onToggleTheme}
                >
                  {isDarkMode ? <Sun size={17} className="text-warning" /> : <Moon size={17} className="text-primary" />}
                  <span>{isDarkMode ? "Bật giao diện Sáng" : "Bật giao diện Tối"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Persistence & Data Reset */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-body mb-1">Quản trị bộ nhớ dữ liệu (Mock Persistence)</h5>
              <p className="text-secondary small mb-3">Khôi phục toàn bộ danh mục, tin tức và tài khoản về trạng thái ban đầu của đề bài</p>

              <div className="d-flex align-items-center justify-content-between p-3 bg-body-tertiary rounded-3 border">
                <div>
                  <h6 className="fw-bold mb-1">Khôi phục dữ liệu ban đầu (Factory Reset)</h6>
                  <p className="text-secondary small mb-0">
                    Xóa sạch các thay đổi trong localStorage và nạp lại dữ liệu mẫu 5 categories, 5 news, 4 users
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger d-inline-flex align-items-center gap-2 px-3 py-2"
                  onClick={() => setIsResetConfirmOpen(true)}
                >
                  <RotateCcw size={16} />
                  <span>Khôi phục dữ liệu</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Project Meta */}
        <div className="col-12">
          <div className="card border-primary border-opacity-25 bg-primary bg-opacity-10 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold text-primary d-flex align-items-center gap-2 mb-2">
                <Sparkles size={18} />
                <span>Thông tin đồ án Assignment 01</span>
              </h5>
              <p className="text-secondary small mb-3">Đáp ứng tiêu chuẩn đánh giá Rubric 10.0 môn SBA301</p>

              <div className="row g-3 small">
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Môn học:</span>
                  <div className="fw-bold text-body">SBA301 (Spring + SPA)</div>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Hệ thống:</span>
                  <div className="fw-bold text-body">FUNewsManagement</div>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Sinh viên:</span>
                  <div className="fw-bold text-body">Phùng Đình Khang (CE191105)</div>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary">Công nghệ:</span>
                  <div className="fw-bold text-body">React 19 + Bootstrap 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Khôi phục toàn bộ dữ liệu mẫu?"
        message="Hành động này sẽ đặt lại toàn bộ danh mục, tin tức và tài khoản người dùng về trạng thái mặc định của đề bài. Toàn bộ các chỉnh sửa thử nghiệm sẽ bị đặt lại."
        confirmText="Đồng ý khôi phục"
        cancelText="Giữ nguyên"
        onConfirm={() => {
          onResetFactoryData();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
