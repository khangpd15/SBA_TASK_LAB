// Sinh viên: Phùng Đình Khang - CE191105
import React, { useState, useMemo } from 'react';
import { 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Shield, 
  X,
  Mail,
  Calendar
} from 'lucide-react';
import UserModal from '../components/forms/UserModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';

export default function UserView({
  users = [],
  currentUser = null,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onShowToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter(item => {
      const keyword = searchTerm.trim().toLowerCase();
      const matchSearch = 
        !keyword ||
        item.username.toLowerCase().includes(keyword) ||
        (item.fullName && item.fullName.toLowerCase().includes(keyword)) ||
        (item.email && item.email.toLowerCase().includes(keyword));

      const matchRole = 
        roleFilter === 'ALL' || 
        String(item.role) === roleFilter;

      const matchStatus = 
        statusFilter === 'ALL' || 
        String(item.status) === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode('update');
    setSelectedUser(item);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (modalMode === 'create') {
      onAddUser(formData);
    } else if (modalMode === 'update' && selectedUser) {
      onUpdateUser(selectedUser.id, formData);
    }
    setIsModalOpen(false);
  };

  const handleOpenDelete = (item) => {
    if (currentUser && item.id === currentUser.id) {
      if (onShowToast) {
        onShowToast("Không thể xóa tài khoản bạn đang đăng nhập hiện tại!", "error");
      }
      return;
    }
    setUserToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id);
    }
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1">Quản Lý Tài Khoản (User Accounts)</h2>
          <p className="text-secondary small mb-0">Quản lý phân quyền Quản trị viên (Admin) và Biên tập viên (Staff)</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
          onClick={handleOpenCreate}
        >
          <UserPlus size={18} />
          <span className="fw-semibold">Thêm tài khoản</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-body border-end-0 text-secondary">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Tìm theo username, họ tên, email..."
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

            {/* Role Filter */}
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="1">1 - Admin (Quản trị)</option>
                <option value="2">2 - Staff (Biên tập)</option>
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
                <option value="1">Đang hoạt động</option>
                <option value="0">Đã khóa</option>
              </select>
            </div>

            {/* Counter */}
            <div className="col-12 col-md-2 text-md-end text-secondary small">
              Hiển thị <strong>{filteredUsers.length}</strong> / {users.length} tài khoản
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        {filteredUsers.length === 0 ? (
          <EmptyState
            isSearch={Boolean(searchTerm || roleFilter !== 'ALL' || statusFilter !== 'ALL')}
            keyword={searchTerm}
            title={users.length === 0 ? "Chưa có tài khoản nào" : undefined}
            actionText={searchTerm ? "Xóa bộ lọc" : "Tạo tài khoản đầu tiên"}
            onAction={
              searchTerm 
                ? () => { setSearchTerm(''); setRoleFilter('ALL'); setStatusFilter('ALL'); } 
                : handleOpenCreate
            }
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small text-uppercase">
                  <th style={{ width: '60px' }} className="ps-4">ID</th>
                  <th style={{ minWidth: '220px' }}>Tài khoản & Họ tên</th>
                  <th style={{ minWidth: '240px' }}>Email liên hệ</th>
                  <th style={{ width: '150px' }}>Vai trò (Role)</th>
                  <th style={{ width: '120px' }}>Trạng thái</th>
                  <th style={{ width: '110px' }} className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((item) => {
                  const isCurrent = currentUser && currentUser.id === item.id;
                  return (
                    <tr key={item.id}>
                      <td className="ps-4 fw-semibold text-secondary">
                        #{item.id}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '13px' }}>
                            {(item.username || 'U')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold text-body d-flex align-items-center gap-1">
                              <span>{item.username}</span>
                              {isCurrent && (
                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle" style={{ fontSize: '10px' }}>
                                  Bạn
                                </span>
                              )}
                            </div>
                            <small className="text-secondary">{item.fullName || '—'}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1 small text-secondary">
                          <Mail size={13} />
                          <span>{item.email || '—'}</span>
                        </div>
                      </td>
                      <td>
                        {item.role === 1 ? (
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 d-inline-flex align-items-center gap-1">
                            <ShieldCheck size={13} />
                            <span>1 - Admin</span>
                          </span>
                        ) : (
                          <span className="badge bg-info-subtle text-info border border-info-subtle px-2 py-1 d-inline-flex align-items-center gap-1">
                            <Shield size={13} />
                            <span>2 - Staff</span>
                          </span>
                        )}
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
                            title="Chỉnh sửa tài khoản"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleOpenDelete(item)}
                            disabled={isCurrent}
                            style={isCurrent ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                            title={isCurrent ? "Không thể xóa chính mình" : "Xóa tài khoản"}
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

      <UserModal
        isOpen={isModalOpen}
        mode={modalMode}
        user={selectedUser}
        existingUsers={users}
        onSubmit={handleModalSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Xác nhận xóa tài khoản người dùng"
        itemName={userToDelete ? `@${userToDelete.username} (${userToDelete.fullName})` : ''}
        message="Hành động này sẽ xóa hoàn toàn tài khoản khỏi hệ thống và không thể khôi phục."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
