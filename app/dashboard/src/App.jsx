import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useCredits } from './contexts/CreditContext';
import {
  LayoutDashboard, Mic2, Clock, Coins, Settings, LogOut,
  Menu, X, ChevronLeft, Bell, User, Activity
} from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage from './pages/AnalyzePage';
import HistoryPage from './pages/HistoryPage';
import CreditsPage from './pages/CreditsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#FAFAFA'
      }}>
        <div style={{
          width: 48, height: 48, border: '4px solid #EDE9FE',
          borderTopColor: '#7C3AED', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

const sidebarLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/analyze', icon: Mic2, label: 'Analyze' },
  { to: '/dashboard/history', icon: Clock, label: 'History' },
  { to: '/dashboard/credits', icon: Coins, label: 'Credits' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarWidth,
        background: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: sidebarCollapsed ? '20px 16px' : '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid #E5E7EB',
          minHeight: 68,
        }}>
          <Activity size={28} color="#7C3AED" strokeWidth={2.5} />
          {!sidebarCollapsed && (
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap',
            }}>SpeechMirror</span>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sidebarLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: sidebarCollapsed ? '12px 16px' : '10px 16px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#7C3AED' : '#4B5563',
                background: isActive ? '#EDE9FE' : 'transparent',
                transition: 'all 0.2s',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              })}
            >
              <link.icon size={20} />
              {!sidebarCollapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Credit Badge */}
        {!sidebarCollapsed && (
          <div style={{
            margin: '0 16px 12px',
            padding: '12px 16px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Coins size={18} color="#7C3AED" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Credits</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#4C1D95' }}>{credits}</div>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            padding: '12px',
            border: 'none',
            borderTop: '1px solid #E5E7EB',
            background: 'transparent',
            cursor: 'pointer',
            color: '#6B7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: '0.85rem',
          }}
        >
          <ChevronLeft
            size={18}
            style={{
              transform: sidebarCollapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s',
            }}
          />
          {!sidebarCollapsed && 'Collapse'}
        </button>
      </aside>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarWidth,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top Bar */}
        <header style={{
          height: 68,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: 8,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#4B5563',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1F2937' }}>
            Dashboard
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Notifications */}
            <button style={{
              padding: 8, border: 'none', background: '#F3F4F6',
              borderRadius: 8, cursor: 'pointer', color: '#6B7280',
              position: 'relative',
            }}>
              <Bell size={18} />
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 8, height: 8, borderRadius: '50%',
                background: '#7C3AED',
              }} />
            </button>

            {/* User Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 600, fontSize: '0.85rem',
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1F2937' }}>
                  {user?.name || 'User'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                  {user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                padding: 8, border: 'none', background: '#FEE2E2',
                borderRadius: 8, cursor: 'pointer', color: '#EF4444',
              }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px', overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Routes inside DashboardLayout */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="analyze" element={<AnalyzePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
