import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ label, value, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="metric-card"
      style={{
        background: 'var(--card)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: 'var(--radius)',
        padding: '24px 26px',
        boxShadow: 'var(--shadow)',
        transition: 'var(--transition)'
      }}
    >
      <p style={{
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--muted)',
        marginBottom: '8px'
      }}>{label}</p>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '36px',
        fontWeight: 700,
        color: color || 'var(--text)',
        lineHeight: 1,
        margin: 0
      }}>{value}</p>
    </motion.div>
  );
};

export default MetricCard;
