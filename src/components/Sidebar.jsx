import React from 'react';
import { LayoutDashboard, FileCheck, Landmark, Users, Moon, Sun, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const NavButton = ({ id, active, onClick, icon: Icon, label }) => (
  <button
    onClick={() => onClick(id)}
    className={`nav-btn ${active ? 'active' : ''}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      width: '100%',
      border: 'none',
      backgroundColor: active ? 'var(--primary-l)' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--muted)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'left',
      marginBottom: '4px'
    }}
  >
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      backgroundColor: active ? 'var(--primary)' : 'var(--primary-l)',
      color: active ? 'white' : 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    }}>
      <Icon size={18} />
    </div>
    <span style={{ fontWeight: active ? 600 : 500 }}>{label}</span>
  </button>
);

const Sidebar = ({ activePage, setActivePage, farmerCount }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <aside className="sidebar" style={{
      width: '260px',
      height: '100vh',
      background: 'var(--card)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border)',
      padding: '32px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '4px'
      }}>
        <div style={{ fontSize: '24px' }}>🌱</div>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          color: 'var(--primary)',
          fontFamily: 'var(--font-display)',
          margin: 0
        }}>CreditWorthy</h1>
      </div>
      <p style={{ 
        fontSize: '11px', 
        color: 'var(--muted)', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em',
        marginBottom: '28px'
      }}>Agricultural Credit · Madagascar</p>

      <div style={{ height: '1px', background: 'var(--border)', margin: '0 -4px 24px' }} />
      
      <p style={{ 
        fontSize: '10px', 
        fontWeight: 700, 
        textTransform: 'uppercase', 
        color: 'var(--muted)', 
        letterSpacing: '0.1em',
        marginBottom: '12px',
        paddingLeft: '4px'
      }}>Navigation</p>

      <div style={{ flex: 1 }}>
        <NavButton 
          id="home" 
          active={activePage === 'home'} 
          onClick={setActivePage} 
          icon={Terminal} 
          label="System Home" 
        />
        <NavButton 
          id="registration" 
          active={activePage === 'registration'} 
          onClick={setActivePage} 
          icon={FileCheck} 
          label="Registration" 
        />
        <NavButton 
          id="score" 
          active={activePage === 'score'} 
          onClick={setActivePage} 
          icon={LayoutDashboard} 
          label="Credit Score" 
        />
        <NavButton 
          id="lender" 
          active={activePage === 'lender'} 
          onClick={setActivePage} 
          icon={Landmark} 
          label="Lender Portal" 
        />
      </div>

      <div style={{
        marginTop: 'auto',
        background: 'var(--primary-l)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'var(--primary-d)',
        fontSize: '13px',
        fontWeight: 500,
        marginBottom: '16px'
      }}>
        <Users size={16} />
        <span>{farmerCount} farmers registered</span>
      </div>

      <button 
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px',
          borderRadius: '12px',
          background: 'transparent',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          transition: 'all 0.2s',
        }}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </aside>
  );
};

export default Sidebar;
