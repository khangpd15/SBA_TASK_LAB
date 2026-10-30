// Sinh viên: Phùng Đình Khang - CE191105
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { FolderPlus, Edit3, RotateCcw } from 'lucide-react';

export default function CategoryModal({
  isOpen,
  mode = 'create',
  category = null,
  existingCategories = [],
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 1
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && category) {
        setFormData({
          name: category.name || '',
          description: category.description || '',
          status: category.status !== undefined ? category.status : 1
        });
      } else {
        setFormData({
          name: '',
          description: '',
          status: 1
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' ? parseInt(value, 10) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    if (mode === 'update' && category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        status: category.status !== undefined ? category.status : 1
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 1
      });
    }
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      errs.name = "Tên danh mục không được để trống";
    } else {
      const isDuplicate = existingCategories.some(
        c => c.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
             (mode === 'create' || c.id !== category?.id)
      );
      if (isDuplicate) {
        errs.name = "Tên danh mục này đã tồn tại trong hệ thống";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: Number(formData.status)
    });
  };

  const isCreate = mode === 'create';
  const modalTitle = isCreate ? "Thêm Danh mục Mới" : "Cập nhật Danh mục";
  const modalSubtitle = isCreate 
    ? "Điền thông tin để tạo danh mục tin tức mới" 
    : `Chỉnh sửa thông tin danh mục ID #${category?.id}`;
  const modalIcon = isCreate ? <FolderPlus size={20} /> : <Edit3 size={20} />;

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
          {/* Category Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="cat-name">
              Tên danh mục <span className="text-danger">*</span>
            </label>
            <input
              id="cat-name"
              name="name"
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="VD: Công nghệ & Đổi mới..."
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="cat-desc">
              Mô tả danh mục
            </label>
            <textarea
              id="cat-desc"
              name="description"
              className="form-control"
              placeholder="Mô tả phạm vi hoặc nội dung của danh mục..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="cat-status">
              Trạng thái hoạt động
            </label>
            <select
              id="cat-status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Hoạt động (Active)</option>
              <option value={0}>Tạm khóa (Inactive)</option>
            </select>
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
              {isCreate ? "Tạo danh mục" : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
