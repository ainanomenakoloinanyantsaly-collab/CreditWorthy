import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Sprout, Landmark, TrendingUp, CheckCircle2, AlertCircle, Info, Calculator } from 'lucide-react';

const FarmerDetailModal = ({ farmer, onClose }) => {
  if (!farmer) return null;

  const { name, region, crop, area, yield_t, score, details, segment, segment_label, color, bg, loan, improvement_points } = farmer;

  return (
    <AnimatePresence>
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} onClick={onClose}>
        <motion.div 
          className="modal-content card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            backgroundColor: 'var(--card-opaque)',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'var(--primary-l)',
              border: 'none',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'var(--primary)'
            }}
          >
            <X size={20} />
          </button>

          <header style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                backgroundColor: 'var(--primary-l)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <User size={24} />
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>{name}</h2>
            </div>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--muted)', fontSize: '14px', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={14} /> {region}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Sprout size={14} /> {crop} Specialist</span>
            </div>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <aside>
              <div style={{ 
                background: bg, 
                border: `1.5px solid ${color}`,
                borderRadius: '20px',
                padding: '24px',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', color, marginBottom: '8px' }}>
                  Credit Score
                </div>
                <div style={{ fontSize: '56px', fontWeight: 800, color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {score}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color, marginTop: '8px' }}>
                  pts · Segment {segment}
                </div>
              </div>

              <div className="section">
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calculator size={16} color="var(--primary)" />
                  Calculation Steps
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(details).map(([key, [val, max]], idx) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--muted)' }}>{key}</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>+{val} / {max}</span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${(val / max) * 100}%` }}
                          style={{ height: '100%', background: 'var(--primary)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <main>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sprout size={16} color="var(--primary)" />
                  Farm Capacity
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>Area</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>{area} Ha</div>
                  </div>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>Yield</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>{yield_t} T/Ha</div>
                  </div>
                </div>
              </div>

              {loan ? (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Landmark size={16} color="var(--primary)" />
                    Loan Calculation
                  </h4>
                  <div style={{ background: 'var(--primary-l)', padding: '20px', borderRadius: '16px', border: '1px solid var(--primary)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--green-d)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                      Prequalified Amount
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                      {Math.round(loan.final_amount).toLocaleString('fr-FR')} <span style={{ fontSize: '16px' }}>Ar</span>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--green-d)' }}>Base (25% Harvest)</span>
                        <span style={{ fontWeight: 600 }}>{Math.round(loan.base_amount).toLocaleString('fr-FR')} Ar</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--green-d)' }}>Segment Multiplier</span>
                        <span style={{ fontWeight: 600 }}>× {(loan.segment_multiplier).toFixed(1)}</span>
                      </div>
                      {loan.bonus_breakdown.map(([desc, amt], i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                          <span style={{ color: 'var(--green-d)' }}>{desc}</span>
                          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>+{Math.round(amt).toLocaleString('fr-FR')} Ar</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--red-l)', padding: '20px', borderRadius: '16px', border: '1px solid var(--red)', color: 'var(--red)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '8px' }}>
                    <AlertCircle size={18} />
                    Ineligible for Institutional Credit
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
                    Score is below the 45-point threshold for Segment B. Recommend cooperative membership or mobile money formalization.
                  </p>
                </div>
              )}
            </main>
          </div>

          {improvement_points && improvement_points.length > 0 && (
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="#d97706" />
                Areas for Improvement
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {improvement_points.map((pt, i) => (
                  <div key={i} style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ fontWeight: 700, color: '#b45309', fontSize: '13px', marginBottom: '6px' }}>{pt.title}</div>
                    <div style={{ color: '#92400e', fontSize: '12px', lineHeight: 1.5 }}>{pt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <footer style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
            <button className="btn btn-primary" onClick={onClose}>
              Done Viewing Profile
            </button>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FarmerDetailModal;
