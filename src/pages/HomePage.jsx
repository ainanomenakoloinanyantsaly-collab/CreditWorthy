import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Calculator, BarChart3, ArrowRight } from 'lucide-react';

const NavCard = ({ title, description, icon: Icon, onClick, delay, highlightColor }) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      padding: '32px',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      cursor: 'pointer',
      backdropFilter: 'blur(20px)',
      boxShadow: 'var(--shadow-lg)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      minHeight: '260px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = highlightColor;
      e.currentTarget.style.boxShadow = `0 10px 40px ${highlightColor}25`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    }}
  >
    <div style={{
      background: `${highlightColor}15`,
      padding: '16px',
      borderRadius: '16px',
      color: highlightColor,
      marginBottom: '24px'
    }}>
      <Icon size={32} />
    </div>
    
    <h3 style={{ 
      fontSize: '24px', 
      fontWeight: 800, 
      color: 'var(--text)', 
      fontFamily: 'var(--font-display)',
      marginBottom: '12px'
    }}>
      {title}
    </h3>
    
    <p style={{ 
      fontSize: '15px', 
      color: 'var(--muted)', 
      lineHeight: 1.6,
      marginBottom: '32px',
      flexGrow: 1
    }}>
      {description}
    </p>

    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: highlightColor,
      fontWeight: 700,
      fontSize: '14px',
      marginTop: 'auto'
    }}>
      Access Module <ArrowRight size={16} />
    </div>
  </motion.button>
);

const HomePage = ({ setActivePage }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100%',
      position: 'relative',
      zIndex: 10,
      padding: '20px 0'
    }}>
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <div style={{ 
          display: 'inline-block',
          padding: '6px 16px', 
          background: 'var(--primary-l)', 
          color: 'var(--primary)',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '1px',
          marginBottom: '24px'
        }}>
          VERSION 2.0 // SYSTEM ACTIVE
        </div>
        
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 900, 
          margin: '0 0 20px 0',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.1,
          color: 'var(--text)',
        }}>
          Credit<span style={{ color: 'var(--primary)' }}>Worthy</span>
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: 'var(--muted)', 
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Agricultural credit profiling platform. Select a module below to begin risk analysis.
        </p>
      </motion.div>

      {/* 3 Interactive Modules */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        <NavCard 
          title="Farmer Registration" 
          description="Create a new agricultural profile and input yield data to pre-estimate credit."
          icon={UserPlus} 
          onClick={() => setActivePage('registration')} 
          delay={0.1}
          highlightColor="#0ea5e9" /* Cyan / Primary */
        />
        
        <NavCard 
          title="Credit Score" 
          description="View the details of the latest calculated score, bonus breakdowns, and tailored offers."
          icon={Calculator} 
          onClick={() => setActivePage('score')} 
          delay={0.2}
          highlightColor="#8b5cf6" /* Violet */
        />
        
        <NavCard 
          title="Lender Portal" 
          description="Supervise the farmer portfolio. Complete dashboard of performance and loan volumes."
          icon={BarChart3} 
          onClick={() => setActivePage('lender')} 
          delay={0.3}
          highlightColor="#f59e0b" /* Amber */
        />
      </div>
    </div>
  );
};

export default HomePage;
