// Sinh viên: Phùng Đình Khang - CE191105
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Newspaper, Edit3, RotateCcw } from 'lucide-react';

export default function NewsModal({
  isOpen,
  mode = 'create',
  newsItem = null,
  categories = [],
  currentUser = null,
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    content: '',
    tagsString: '',
    status: 1
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && newsItem) {
        setFormData({
          title: newsItem.title || '',
          categoryId: newsItem.categoryId ? String(newsItem.categoryId) : '',
          content: newsItem.content || '',
          tagsString: Array.isArray(newsItem.tags) ? newsItem.tags.join(', ') : '',
          status: newsItem.status !== undefined ? newsItem.status : 1
        });
      } else {
        const defaultCatId = categories.length > 0 ? String(categories[0].id) : '';
        setFormData({
          title: '',
          categoryId: defaultCatId,
          content: '',
          tagsString: '',
          status: 1
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, newsItem, categories]);

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
    if (mode === 'update' && newsItem) {
      setFormData({
        title: newsItem.title || '',
        categoryId: newsItem.categoryId ? String(newsItem.categoryId) : '',
        content: newsItem.content || '',
        tagsString: Array.isArray(newsItem.tags) ? newsItem.tags.join(', ') : '',
        status: newsItem.status !== undefined ? newsItem.status : 1
      });
    } else {
      const defaultCatId = categories.length > 0 ? String(categories[0].id) : '';
      setFormData({
        title: '',
        categoryId: defaultCatId,
        content: '',
        tagsString: '',
        status: 1
      });
    }
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = "Tiêu đề bài viết không được để trống";
    }
    if (!formData.categoryId) {
      errs.categoryId = "Vui lòng chọn danh mục bài viết";
    }
    if (!formData.content.trim()) {
      errs.content = "Nội dung bài viết không được để trống";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const tagsArray = formData.tagsString
      ? formData.tagsString.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    onSubmit({
      title: formData.title.trim(),
      categoryId: parseInt(formData.categoryId, 10),
      content: formData.content.trim(),
      tags: tagsArray,
      status: Number(formData.status),
      createdBy: newsItem?.createdBy || currentUser?.username || 'Admin'
    });
  };

  const isCreate = mode === 'create';
  const modalTitle = isCreate ? "Thêm Bài Viết Mới" : "Cập nhật Bài Viết";
  const modalSubtitle = isCreate 
    ? "Tạo và phát hành tin tức mới lên cổng thông tin" 
    : `Chỉnh sửa nội dung bài viết ID #${newsItem?.id}`;
  const modalIcon = isCreate ? <Newspaper size={20} /> : <Edit3 size={20} />;

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
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-title">
              Tiêu đề bài viết <span className="text-danger">*</span>
            </label>
            <input
              id="news-title"
              name="title"
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              placeholder="VD: FPT Edu khởi động chuỗi hoạt động công nghệ..."
              value={formData.title}
              onChange={handleChange}
              autoFocus
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-category">
              Danh mục tin tức <span className="text-danger">*</span>
            </label>
            <select
              id="news-category"
              name="categoryId"
              className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} {cat.status === 0 ? '(Tạm ẩn)' : ''}
                </option>
              ))}
            </select>
            {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-content">
              Nội dung chi tiết <span className="text-danger">*</span>
            </label>
            <textarea
              id="news-content"
              name="content"
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              placeholder="Nhập nội dung đầy đủ của bài tin tức..."
              value={formData.content}
              onChange={handleChange}
              rows={5}
            />
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-tags">
              Thẻ từ khóa (Tags) <span className="text-secondary fw-normal">(phân tách bằng dấu phẩy)</span>
            </label>
            <input
              id="news-tags"
              name="tagsString"
              type="text"
              className="form-control"
              placeholder="VD: AI, Hackathon, FPT, SinhVien"
              value={formData.tagsString}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label fw-semibold small" htmlFor="news-status">
              Trạng thái xuất bản
            </label>
            <select
              id="news-status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Công khai (Active)</option>
              <option value={0}>Bản nháp / Tạm ẩn (Inactive)</option>
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
              {isCreate ? "Đăng bài viết" : "Lưu bài viết"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
