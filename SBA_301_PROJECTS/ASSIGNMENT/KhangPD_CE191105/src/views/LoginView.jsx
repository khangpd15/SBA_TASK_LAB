import React, { useState } from 'react';
import { LogIn, AlertCircle, ShieldCheck, KeyRound, User } from 'lucide-react';
import logoSvg from '../assets/logo.svg';

export default function LoginView({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser && !trimmedPass) {
      setErrorMsg("Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }
    if (!trimmedUser) {
      setErrorMsg("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!trimmedPass) {
      setErrorMsg("Vui lòng nhập mật khẩu");
      return;
    }

    if (trimmedUser === 'Admin' && trimmedPass === 'Admin') {
      setErrorMsg('');
      onLoginSuccess({
        id: 1,
        username: 'Admin',
        fullName: 'Quản trị viên Hệ thống',
        role: 1
      });
      return;
    }

    if (trimmedUser === 'Staff' && trimmedPass === 'Staff') {
      setErrorMsg('');
      onLoginSuccess({
        id: 2,
        username: 'Staff',
        fullName: 'Nguyễn Văn Biên Tập',
        role: 2
      });
      return;
    }

    setErrorMsg("Tên đăng nhập hoặc mật khẩu không chính xác! (Gợi ý: Admin / Admin)");
  };

  const handleFillCredentials = (u, p) => {
    setUsername(u);
    setPassword(p);
    setErrorMsg('');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary p-3">
      <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4" style={{ maxWidth: '440px', width: '100%' }}>
        {/* Brand Header */}
        <div className="text-center mb-4">
          <img 
            src={logoSvg} 
            alt="FUNews Logo" 
            width="60" 
            height="60" 
            className="mb-3 rounded-3 shadow-sm"
          />
          <h3 className="fw-bold text-body mb-1">FUNews Management</h3>
          <p className="text-secondary small mb-0">Cổng quản trị tin tức SBA301 - Single Page Application</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small rounded-3 mb-3" role="alert">
            <AlertCircle size={18} className="flex-shrink-0" />
            <div>{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-body" htmlFor="login-username">
              Tên đăng nhập
            </label>
            <div className="input-group">
              <span className="input-group-text bg-body text-secondary border-end-0">
                <User size={16} />
              </span>
              <input
                id="login-username"
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Nhập username (VD: Admin)"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold small text-body" htmlFor="login-password">
              Mật khẩu
            </label>
            <div className="input-group">
              <span className="input-group-text bg-body text-secondary border-end-0">
                <KeyRound size={16} />
              </span>
              <input
                id="login-password"
                type="password"
                className="form-control border-start-0 ps-0"
                placeholder="Nhập mật khẩu (VD: Admin)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
          >
            <LogIn size={18} />
            <span>Đăng nhập hệ thống</span>
          </button>
        </form>

        {/* Credentials Helper Pill */}
        <div className="card bg-body-tertiary border border-secondary border-opacity-25 rounded-3 p-3 mt-4">
          <div className="d-flex align-items-center gap-2 small fw-bold text-primary mb-2">
            <ShieldCheck size={16} />
            <span>Tài khoản kiểm thử theo đề bài:</span>
          </div>
          <div className="d-flex flex-column gap-2 small">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-secondary">Admin (Toàn quyền):</span>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm py-0 px-2 font-monospace"
                onClick={() => handleFillCredentials('Admin', 'Admin')}
                title="Bấm để điền nhanh"
              >
                Admin / Admin
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-secondary">Staff (Biên tập viên):</span>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm py-0 px-2 font-monospace"
                onClick={() => handleFillCredentials('Staff', 'Staff')}
                title="Bấm để điền nhanh"
              >
                Staff / Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
