import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpRight, TrendingUp, Users, Activity, Landmark } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import FarmerDetailModal from '../components/FarmerDetailModal';
import { REGIONS } from '../data/constants';

const SegmentBadge = ({ segment }) => {
  const colors = {
    A: { bg: 'var(--primary-l)', text: 'var(--primary)', dot: 'var(--primary)' },
    B: { bg: 'var(--amber-l)', text: 'var(--amber)', dot: 'var(--amber)' },
    C: { bg: 'var(--red-l)', text: 'var(--red)', dot: 'var(--red)' },
  };
  const { bg, text, dot } = colors[segment] || colors.C;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      borderRadius: '99px',
      fontSize: '12px',
      fontWeight: 700,
      backgroundColor: bg,
      color: text
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dot }} />
      Segment {segment}
    </div>
  );
};

const LenderPortalPage = ({ farmers }) => {
  const [filterSeg, setFilterSeg] = useState(new Set(['A', 'B', 'C']));
  const [filterRegion, setFilterRegion] = useState('All');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const stats = {
    total: farmers.length,
    avgScore: Math.round(farmers.reduce((acc, f) => acc + f.score, 0) / (farmers.length || 1)),
    eligible: farmers.filter(f => f.segment !== 'C').length,
    totalVolume: Math.round(farmers.reduce((acc, f) => acc + (f.loan?.final_amount || 0), 0))
  };

  const filteredFarmers = farmers.filter(f => 
    filterSeg.has(f.segment) && (filterRegion === 'All' || f.region === filterRegion)
  );

  const toggleSeg = (seg) => {
    const next = new Set(filterSeg);
    if (next.has(seg)) next.delete(seg);
    else next.add(seg);
    setFilterSeg(next);
  };

  return (
    <div className="lender-portal">
      <header className="page-header" style={{ marginBottom: '32px' }}>
        <h1 className="page-title" style={{ fontSize: '34px', fontWeight: 600, color: 'var(--text)' }}>
          Lender Portal
        </h1>
        <p className="page-caption" style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>
          Overview of scored and pre-qualified farmers for institutional lending
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <MetricCard label="Total Farmers" value={stats.total} icon={Users} color="var(--text)" delay={0.1} />
        <MetricCard label="Avg. Credit Score" value={stats.avgScore} icon={Activity} color="var(--primary)" delay={0.2} />
        <MetricCard label="Pre-Qualified" value={stats.eligible} icon={TrendingUp} color="var(--amber)" delay={0.3} />
        <MetricCard label="Potential Volume (Ar)" value={stats.totalVolume.toLocaleString('fr-FR')} icon={Landmark} color="var(--primary)" delay={0.4} />
      </div>

      <motion.div 
        className="card" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['A', 'B', 'C'].map(s => (
              <button 
                key={s}
                onClick={() => toggleSeg(s)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '99px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: filterSeg.has(s) ? 'var(--primary)' : 'var(--border)',
                  backgroundColor: filterSeg.has(s) ? 'var(--primary-l)' : 'var(--card-opaque)',
                  color: filterSeg.has(s) ? 'var(--primary)' : 'var(--muted)',
                  transition: 'all 0.2s'
                }}
              >
                Segment {s}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input 
                type="text" 
                placeholder="Search name..." 
                style={{ paddingLeft: '36px', height: '40px', width: '200px' }}
              />
            </div>
            <select 
              value={filterRegion} 
              onChange={(e) => setFilterRegion(e.target.value)}
              style={{ height: '40px', width: '160px' }}
            >
              <option value="All">All Regions</option>
              {Object.keys(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div style={{ 
          overflowX: 'auto', 
          borderRadius: '12px', 
          border: '1px solid var(--border)',
          background: 'var(--card-opaque)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Name</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Region</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Crop</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Score</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Segment</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>Est. Loan</th>
                <th style={{ padding: '16px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((f, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}
                  whileHover={{ backgroundColor: 'var(--primary-l)' }}
                  onClick={() => setSelectedFarmer(f)}
                >
                  <td style={{ padding: '16px', fontWeight: 600 }}>{f.name}</td>
                  <td style={{ padding: '16px' }}>{f.region}</td>
                  <td style={{ padding: '16px' }}>{f.crop}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '60px' }}>
                        <div style={{ height: '100%', width: `${f.score}%`, background: 'var(--primary)', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontWeight: 700 }}>{f.score}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}><SegmentBadge segment={f.segment} /></td>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                    {f.loan ? f.loan.final_amount.toLocaleString('fr-FR') + ' Ar' : '—'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ color: 'var(--muted)' }}><ArrowUpRight size={18} /></div>
                  </td>
                </motion.tr>
              ))}
              {filteredFarmers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                    No farmers found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <FarmerDetailModal 
        farmer={selectedFarmer} 
        onClose={() => setSelectedFarmer(null)} 
      />
    </div>
  );
};

export default LenderPortalPage;
