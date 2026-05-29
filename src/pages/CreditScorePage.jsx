import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { harvestValue, getLoanOffers } from '../utils/calculations';

const ScoreGauge = ({ score, color }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="score-circle" style={{
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      position: 'relative',
      background: 'var(--card-opaque)',
      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
    }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
        <circle
          cx="70" cy="70" r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth="10"
        />
        <motion.circle
          cx="70" cy="70" r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          strokeLinecap="round"
        />
      </svg>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <div style={{ fontSize: '42px', fontWeight: 800, fontFamily: 'var(--font-display)', color }}>{score}</div>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Points</div>
      </motion.div>
    </div>
  );
};

const CreditScorePage = ({ farmer, onBack }) => {
  if (!farmer) {
    return (
      <div className="card">
        <div className="alert alert-info" style={{ background: '#e8f4fb', color: '#1a6fa3', padding: '20px', borderRadius: '12px' }}>
          No active profile. Register a new farmer to see their credit score.
        </div>
        <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '20px' }}>
          Go to Registration
        </button>
      </div>
    );
  }

  const { score, details, segment, segment_label, color, bg, loan, improvement_points } = farmer;
  const offers = loan ? getLoanOffers(segment, loan.final_amount) : [];
  const hv = harvestValue(farmer.area, farmer.yield_t, farmer.crop);

  return (
    <div className="credit-score-page">
      <header className="page-header" style={{ marginBottom: '32px' }}>
        <h1 className="page-title" style={{ fontSize: '34px', fontWeight: 600, color: 'var(--text)' }}>
          Credit Score Analysis
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <div className="left-col">
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <ScoreGauge score={score} color={color} />
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: bg,
                color: color,
                border: `1.5px solid ${color}`
              }}>
                {segment === 'A' ? <CheckCircle2 size={16} /> : segment === 'B' ? <TrendingUp size={16} /> : <AlertCircle size={16} />}
                Segment {segment}: {segment_label}
              </div>
            </div>

            <div className="score-breakdown">
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="var(--primary)" />
                Factor Breakdown
              </h3>
              {Object.entries(details).map(([key, [val, max]], idx) => (
                <motion.div 
                  key={key} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.1 * idx }}
                  style={{ marginBottom: '18px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{key}</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{val} / {max} pts</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${(val / max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + 0.1 * idx }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), #34d399)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {loan && (
            <motion.div className="card" style={{ marginTop: '24px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="var(--primary)" />
                Loan Calculation Structure
              </h3>
              <div style={{ background: 'var(--primary-l)', padding: '20px', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                <div style={{ fontSize: '11px', color: 'var(--green-d)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Prequalified Amount
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                  {Math.round(loan.final_amount).toLocaleString('fr-FR')} <span style={{ fontSize: '16px' }}>Ar</span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'var(--green-d)' }}>Base (25% Harvest Value: {Math.round(hv).toLocaleString('fr-FR')} Ar)</span>
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
            </motion.div>
          )}
        </div>

        <div className="right-col">
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Landmark size={20} color="var(--primary)" />
              {loan ? 'Tailored Loan Offers' : 'Ineligible for Credit'}
            </h3>
            
            {loan ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {offers.map((offer, idx) => (
                  <motion.div 
                    key={idx} 
                    className="offer-card" 
                    whileHover={{ y: -4, borderColor: 'var(--primary)' }}
                    style={{
                      background: 'var(--card-opaque)',
                      border: '1.5px solid var(--border)',
                      padding: '20px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {offer.institution}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: '4px 0' }}>{offer.product}</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{offer.amount}</div>
                      </div>
                      <div className="btn-primary" style={{ padding: '8px', borderRadius: '10px' }}>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px', fontSize: '12px' }}>
                      <span style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '20px' }}>{offer.duration}</span>
                      <span style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '20px' }}>{offer.rate} APR</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', background: 'var(--red-l)', borderRadius: '12px', color: 'var(--red)' }}>
                Unfortunately, based on the current data, the scoring segment does not meet the minimum requirements for immediate credit. Complete the areas for improvement below to become eligible.
              </div>
            )}
          </motion.div>

          {improvement_points && improvement_points.length > 0 && (
            <motion.div className="card" style={{ marginTop: '24px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309' }}>
                <TrendingUp size={20} color="#d97706" />
                Areas for Improvement
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {improvement_points.map((pt, i) => (
                  <div key={i} style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ fontWeight: 700, color: '#b45309', fontSize: '13px', marginBottom: '6px' }}>{pt.title}</div>
                    <div style={{ color: '#92400e', fontSize: '13px', lineHeight: 1.5 }}>{pt.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditScorePage;
