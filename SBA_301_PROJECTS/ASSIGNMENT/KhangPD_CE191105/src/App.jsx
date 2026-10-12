import React, { useState, useEffect, useCallback } from 'react';
import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/views.css';

import { StorageService } from './services/storageService';
import LoginView from './views/LoginView';
import AdminLayout from './components/layout/AdminLayout';
import DashboardView from './views/DashboardView';
import CategoryView from './views/CategoryView';
import NewsView from './views/NewsView';
import UserView from './views/UserView';
import SettingsView from './views/SettingsView';
import Toast from './components/common/Toast';

export default function App() {
  // 1. Auth State (Requirement R02, R03)
  const [currentUser, setCurrentUser] = useState(() => StorageService.getCurrentUser());

  // 2. Navigation State (Requirement R06)
  const [activeTab, setActiveTab] = useState('dashboard');

  // 3. Theme State (Dark / Light mode transfer task)
  const [isDarkMode, setIsDarkMode] = useState(() => StorageService.getDarkMode());

  // 4. Data States (Requirement R12: localStorage persistence)
  const [categories, setCategories] = useState(() => StorageService.getCategories());
  const [news, setNews] = useState(() => StorageService.getNews());
  const [users, setUsers] = useState(() => StorageService.getUsers());

  // 5. Toast Feedback State
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync theme with DOM root attribute for Bootstrap 5 and custom CSS
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.documentElement.removeAttribute('data-theme');
    }
    StorageService.setDarkMode(isDarkMode);
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // ==========================================
  // AUTH HANDLERS
  // ==========================================
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    StorageService.saveCurrentUser(user);
    setActiveTab('dashboard');
    showToast(`Chào mừng ${user.username} đã đăng nhập thành công!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    StorageService.saveCurrentUser(null);
    setActiveTab('dashboard');
    showToast('Đã đăng xuất khỏi phiên làm việc', 'info');
  };

  // ==========================================
  // CATEGORY CRUD HANDLERS (Requirement R07)
  // Immutable state updates
  // ==========================================
  const handleAddCategory = (newCat) => {
    const nextId = categories.length > 0 
      ? Math.max(...categories.map(c => c.id)) + 1 
      : 1;
    const createdItem = { ...newCat, id: nextId };
    const updatedList = [createdItem, ...categories];
    setCategories(updatedList);
    StorageService.saveCategories(updatedList);
    showToast(`Đã thêm danh mục "${newCat.name}" thành công!`, 'success');
  };

  const handleUpdateCategory = (id, updatedFields) => {
    const updatedList = categories.map(cat => 
      cat.id === id ? { ...cat, ...updatedFields } : cat
    );
    setCategories(updatedList);
    StorageService.saveCategories(updatedList);
    showToast(`Đã cập nhật danh mục #${id} thành công!`, 'success');
  };

  const handleDeleteCategory = (id) => {
    const target = categories.find(c => c.id === id);
    const updatedList = categories.filter(cat => cat.id !== id);
    setCategories(updatedList);
    StorageService.saveCategories(updatedList);
    showToast(`Đã xóa danh mục "${target?.name || id}"`, 'info');
  };

  // ==========================================
  // NEWS CRUD HANDLERS (Requirement R08)
  // Immutable state updates
  // ==========================================
  const handleAddNews = (newArticle) => {
    const nextId = news.length > 0 
      ? Math.max(...news.map(n => n.id)) + 1 
      : 1;
    const now = new Date().toISOString().split('T')[0];
    const createdItem = { 
      ...newArticle, 
      id: nextId, 
      createdAt: now 
    };
    const updatedList = [createdItem, ...news];
    setNews(updatedList);
    StorageService.saveNews(updatedList);
    showToast(`Đã xuất bản bài viết "${newArticle.title}"`, 'success');
  };

  const handleUpdateNews = (id, updatedFields) => {
    const updatedList = news.map(item => 
      item.id === id ? { ...item, ...updatedFields } : item
    );
    setNews(updatedList);
    StorageService.saveNews(updatedList);
    showToast(`Đã cập nhật bài viết #${id} thành công!`, 'success');
  };

  const handleDeleteNews = (id) => {
    const target = news.find(n => n.id === id);
    const updatedList = news.filter(item => item.id !== id);
    setNews(updatedList);
    StorageService.saveNews(updatedList);
    showToast(`Đã xóa bài viết "${target?.title || id}"`, 'info');
  };

  // ==========================================
  // USER CRUD HANDLERS (Requirement R09)
  // Immutable state updates
  // ==========================================
  const handleAddUser = (newUser) => {
    const nextId = users.length > 0 
      ? Math.max(...users.map(u => u.id)) + 1 
      : 1;
    const now = new Date().toISOString().split('T')[0];
    const createdItem = { 
      ...newUser, 
      id: nextId, 
      createdAt: now 
    };
    const updatedList = [...users, createdItem];
    setUsers(updatedList);
    StorageService.saveUsers(updatedList);
    showToast(`Đã tạo tài khoản @${newUser.username}`, 'success');
  };

  const handleUpdateUser = (id, updatedFields) => {
    const updatedList = users.map(user => 
      user.id === id ? { ...user, ...updatedFields } : user
    );
    setUsers(updatedList);
    StorageService.saveUsers(updatedList);
    // If updating current logged in user, update session as well
    if (currentUser && currentUser.id === id) {
      const updatedCurrent = { ...currentUser, ...updatedFields };
      setCurrentUser(updatedCurrent);
      StorageService.saveCurrentUser(updatedCurrent);
    }
    showToast(`Đã cập nhật tài khoản #${id} thành công!`, 'success');
  };

  const handleDeleteUser = (id) => {
    const target = users.find(u => u.id === id);
    const updatedList = users.filter(user => user.id !== id);
    setUsers(updatedList);
    StorageService.saveUsers(updatedList);
    showToast(`Đã xóa tài khoản @${target?.username || id}`, 'info');
  };

  // ==========================================
  // RESET FACTORY DEMO DATA
  // ==========================================
  const handleResetFactoryData = () => {
    const fresh = StorageService.resetAll();
    setCategories(fresh.categories);
    setNews(fresh.news);
    setUsers(fresh.users);
    showToast("Đã khôi phục toàn bộ dữ liệu mẫu ban đầu!", "success");
  };

  // ==========================================
  // CONDITIONAL VIEW ROUTING (Requirement R03, R05)
  // ==========================================
  // If not logged in, render LoginPage
  if (!currentUser) {
    return (
      <>
        <LoginView onLoginSuccess={handleLoginSuccess} />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  // If logged in, render Admin Master Layout with active view
  return (
    <>
      <AdminLayout
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categories={categories}
        news={news}
        users={users}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      >
        {activeTab === 'dashboard' && (
          <DashboardView
            categories={categories}
            news={news}
            users={users}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'category' && (
          <CategoryView
            categories={categories}
            news={news}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {activeTab === 'news' && (
          <NewsView
            news={news}
            categories={categories}
            currentUser={currentUser}
            onAddNews={handleAddNews}
            onUpdateNews={handleUpdateNews}
            onDeleteNews={handleDeleteNews}
          />
        )}

        {activeTab === 'users' && (
          <UserView
            users={users}
            currentUser={currentUser}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onResetFactoryData={handleResetFactoryData}
          />
        )}
      </AdminLayout>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
