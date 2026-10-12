import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { UserPlus, UserCheck, RotateCcw } from 'lucide-react';

export default function UserModal({
  isOpen,
  mode = 'create',
  user = null,
  existingUsers = [],
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: 2,
    status: 1
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && user) {
        setFormData({
          username: user.username || '',
          fullName: user.fullName || '',
          email: user.email || '',
          password: '',
          role: user.role !== undefined ? user.role : 2,
          status: user.status !== undefined ? user.status : 1
        });
      } else {
        setFormData({
          username: '',
          fullName: '',
          email: '',
          password: '',
          role: 2,
          status: 1
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'role' || name === 'status') ? parseInt(value, 10) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    if (mode === 'update' && user) {
      setFormData({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',
        role: user.role !== undefined ? user.role : 2,
        status: user.status !== undefined ? user.status : 1
      });
    } else {
      setFormData({
        username: '',
        fullName: '',
        email: '',
        password: '',
        role: 2,
        status: 1
      });
    }
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    const trimmedUsername = formData.username.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedUsername) {
      errs.username = "Tên đăng nhập (username) không được để trống";
    } else if (trimmedUsername.length < 3) {
      errs.username = "Username phải có ít nhất 3 ký tự";
    } else {
      const isDuplicate = existingUsers.some(
        u => u.username.toLowerCase() === trimmedUsername.toLowerCase() &&
             (mode === 'create' || u.id !== user?.id)
      );
      if (isDuplicate) {
        errs.username = "Tên đăng nhập này đã được sử dụng";
      }
    }

    if (!formData.fullName.trim()) {
      errs.fullName = "Họ và tên không được để trống";
    }

    if (!trimmedEmail) {
      errs.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = "Định dạng email không hợp lệ (VD: user@example.com)";
    }

    if (mode === 'create' && !formData.password.trim()) {
      errs.password = "Mật khẩu không được để trống khi tạo mới";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      username: formData.username.trim(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      role: Number(formData.role),
      status: Number(formData.status)
    };

    if (formData.password.trim()) {
      payload.password = formData.password.trim();
    } else if (mode === 'update' && user?.password) {
      payload.password = user.password;
    }

    onSubmit(payload);
  };

  const isCreate = mode === 'create';
  const modalTitle = isCreate ? "Thêm Tài Khoản Mới" : "Cập nhật Tài Khoản";
  const modalSubtitle = isCreate 
    ? "Tạo tài khoản quản trị hoặc nhân viên biên tập" 
    : `Chỉnh sửa thông tin tài khoản @${user?.username}`;
  const modalIcon = isCreate ? <UserPlus size={20} /> : <UserCheck size={20} />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      icon={modalIcon}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-body p-4">
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="user-username">
              Tên đăng nhập (Username) <span className="text-danger">*</span>
            </label>
            <input
              id="user-username"
              name="username"
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="VD: nguyenvana..."
              value={formData.username}
              onChange={handleChange}
              disabled={mode === 'update'}
              autoFocus={mode === 'create'}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="user-fullname">
              Họ và tên <span className="text-danger">*</span>
            </label>
            <input
              id="user-fullname"
              name="fullName"
              type="text"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              placeholder="VD: Nguyễn Văn A..."
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="user-email">
              Địa chỉ Email <span className="text-danger">*</span>
            </label>
            <input
              id="user-email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="VD: user@funews.edu.vn"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="user-password">
              Mật khẩu {isCreate ? <span className="text-danger">*</span> : <span className="text-secondary fw-normal">(để trống nếu giữ nguyên)</span>}
            </label>
            <input
              id="user-password"
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder={isCreate ? "Nhập mật khẩu..." : "••••••••"}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Role & Status Row */}
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold small" htmlFor="user-role">
                Phân quyền (Role)
              </label>
              <select
                id="user-role"
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value={1}>1 - Quản trị viên (Admin)</option>
                <option value={2}>2 - Biên tập viên (Staff)</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold small" htmlFor="user-status">
                Trạng thái
              </label>
              <select
                id="user-status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={1}>Hoạt động (Active)</option>
                <option value={0}>Khóa (Inactive)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer bg-body-tertiary d-flex justify-content-between px-4 py-3">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={handleReset}
            title="Đặt lại thông tin form ban đầu"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm px-3"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm px-3"
            >
              {isCreate ? "Tạo tài khoản" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
