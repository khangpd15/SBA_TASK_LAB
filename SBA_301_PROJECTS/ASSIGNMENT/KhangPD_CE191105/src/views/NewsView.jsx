import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Newspaper, 
  X,
  Tag,
  Calendar,
  UserCheck
} from 'lucide-react';
import NewsModal from '../components/forms/NewsModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';

export default function NewsView({
  news = [],
  categories = [],
  currentUser = null,
  onAddNews,
  onUpdateNews,
  onDeleteNews
}) {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal dialog state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedNews, setSelectedNews] = useState(null);

  // Delete dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  // Search logic (R08: search in title and content, preserve source array)
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const keyword = searchTerm.trim().toLowerCase();
      const matchSearch = 
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.content.toLowerCase().includes(keyword) ||
        (Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(keyword)));

      const matchCategory = 
        selectedCategoryFilter === 'ALL' || 
        String(item.categoryId) === selectedCategoryFilter;

      const matchStatus = 
        statusFilter === 'ALL' || 
        String(item.status) === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [news, searchTerm, selectedCategoryFilter, statusFilter]);

  // Handlers
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (modalMode === 'create') {
      onAddNews(formData);
    } else if (modalMode === 'update' && selectedNews) {
      onUpdateNews(selectedNews.id, formData);
    }
    setIsModalOpen(false);
  };

  const handleOpenDelete = (item) => {
    setNewsToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (newsToDelete) {
      onDeleteNews(newsToDelete.id);
    }
    setIsConfirmOpen(false);
    setNewsToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setNewsToDelete(null);
  };

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Tin Tức (News Articles)</h2>
          <p className="text-secondary small mb-0">Soạn thảo, phân loại danh mục và phát hành bài viết trên FUNews</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
          onClick={handleOpenCreate}
        >
          <Plus size={18} />
          <span className="fw-semibold">Thêm bài viết mới</span>
        </button>
      </div>

      {/* Toolbar: Bootstrap Card with Search & Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            {/* Search Input with Icon */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0 text-secondary">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Tìm theo tiêu đề, nội dung, tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary border-start-0" 
                    onClick={() => setSearchTerm('')}
                    title="Xóa tìm kiếm"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              >
                <option value="ALL">Tất cả danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-6 col-md-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="1">Đang công khai</option>
                <option value="0">Bản nháp / Ẩn</option>
              </select>
            </div>

            {/* Counter display */}
            <div className="col-12 col-md-2 text-md-end text-secondary small">
              Hiển thị <strong>{filteredNews.length}</strong> / {news.length} bài viết
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        {filteredNews.length === 0 ? (
          <EmptyState
            isSearch={Boolean(searchTerm || selectedCategoryFilter !== 'ALL' || statusFilter !== 'ALL')}
            keyword={searchTerm}
            title={news.length === 0 ? "Chưa có bài viết nào" : undefined}
            actionText={searchTerm ? "Xóa bộ lọc" : "Đăng bài viết đầu tiên"}
            onAction={
              searchTerm 
                ? () => { setSearchTerm(''); setSelectedCategoryFilter('ALL'); setStatusFilter('ALL'); } 
                : handleOpenCreate
            }
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small text-uppercase">
                  <th style={{ width: '60px' }} className="ps-4">ID</th>
                  <th style={{ minWidth: '340px' }}>Tiêu đề & Nội dung</th>
                  <th style={{ width: '180px' }}>Danh mục</th>
                  <th style={{ width: '130px' }}>Tác giả</th>
                  <th style={{ width: '180px' }}>Tags</th>
                  <th style={{ width: '120px' }}>Trạng thái</th>
                  <th style={{ width: '110px' }} className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => {
                  const category = categories.find(c => c.id === item.categoryId);
                  return (
                    <tr key={item.id}>
                      <td className="ps-4 fw-semibold text-secondary">
                        #{item.id}
                      </td>
                      <td>
                        <div className="fw-bold text-body mb-1">{item.title}</div>
                        <p className="text-secondary small mb-1 text-truncate" style={{ maxWidth: '420px' }}>
                          {item.content}
                        </p>
                        {item.createdAt && (
                          <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '11px' }}>
                            <Calendar size={12} />
                            <span>{item.createdAt}</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 text-wrap text-start">
                          {category?.name || `Danh mục #${item.categoryId}`}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1 small fw-semibold text-body">
                          <UserCheck size={14} className="text-primary" />
                          <span>{item.createdBy || 'Admin'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {Array.isArray(item.tags) && item.tags.length > 0 ? (
                            item.tags.map((tag, idx) => (
                              <span key={idx} className="badge bg-body-secondary text-secondary border small">
                                #{tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-secondary small">—</span>
                          )}
                        </div>
                      </td>
                      <td>
                        {item.status === 1 ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                            ● Active
                          </span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                            ● Inactive
                          </span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleOpenEdit(item)}
                            title="Chỉnh sửa bài viết"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleOpenDelete(item)}
                            title="Xóa bài viết"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <NewsModal
        isOpen={isModalOpen}
        mode={modalMode}
        newsItem={selectedNews}
        categories={categories}
        currentUser={currentUser}
        onSubmit={handleModalSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Xác nhận xóa bài viết"
        itemName={newsToDelete?.title}
        message="Hành động này sẽ xóa vĩnh viễn bài tin tức này khỏi hệ thống. Bạn có chắc chắn muốn tiếp tục?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
