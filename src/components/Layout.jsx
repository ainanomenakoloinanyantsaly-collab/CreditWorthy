import React from 'react';
import Sidebar from './Sidebar';
import TechBackground from './TechBackground';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children, activePage, setActivePage, farmerCount }) => {
  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <TechBackground />
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        farmerCount={farmerCount} 
      />
      <main className="main" style={{
        marginLeft: '260px',
        flex: 1,
        padding: '40px 48px',
        maxWidth: '1200px',
        position: 'relative',
        zIndex: 10
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
