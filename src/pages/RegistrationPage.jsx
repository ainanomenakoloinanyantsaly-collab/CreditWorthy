import React, { useState } from 'react';
import { REGIONS, ALL_CROPS } from '../data/constants';
import { computeFarmer } from '../utils/calculations';
import { motion } from 'framer-motion';
import { User, Sprout, Landmark, ArrowRight } from 'lucide-react';

const RegistrationPage = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    region: Object.keys(REGIONS)[0],
    crop: ALL_CROPS[0],
    area: 1.0,
    yield_t: 2.0,
    financial_access: 'Mobile Money',
    cooperative: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('⚠️ Please enter a name.');
      return;
    }
    setError('');
    const farmer = computeFarmer(formData);
    onRegister(farmer);
  };

  return (
    <div className="registration-page">
      <header className="page-header" style={{ marginBottom: '32px' }}>
        <motion.h1 
          className="page-title" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '34px', fontWeight: 600, color: 'var(--text)', margin: 0 }}
        >
          Farmer Registration
        </motion.h1>
        <p className="page-caption" style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>
          Fill in the form — credit estimate is calculated automatically
        </p>
      </header>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '18px',
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--text)'
              }}>
                <User size={18} color="var(--primary)" />
                <span>Identity</span>
              </div>
              
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Full Name <span style={{ color: 'var(--primary)' }}>*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rakoto Jean-Pierre" 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Region</label>
                <select name="region" value={formData.region} onChange={handleChange}>
                  {Object.keys(REGIONS).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Main Crop</label>
                <select name="crop" value={formData.crop} onChange={handleChange}>
                  {ALL_CROPS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '18px',
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--text)'
              }}>
                <Sprout size={18} color="var(--primary)" />
                <span>Farm Data</span>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Cultivated Area (hectares) <span style={{ color: 'var(--primary)' }}>*</span></label>
                <input 
                  type="number" 
                  name="area"
                  min="0.1" 
                  max="100" 
                  step="0.1" 
                  value={formData.area} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Estimated Yield (tonnes/ha)</label>
                <input 
                  type="number" 
                  name="yield_t"
                  min="0.1" 
                  max="20" 
                  step="0.1" 
                  value={formData.yield_t} 
                  onChange={handleChange}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                margin: '24px 0 18px',
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--text)'
              }}>
                <Landmark size={18} color="var(--primary)" />
                <span>Financial Profile</span>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Financial Access</label>
                <select name="financial_access" value={formData.financial_access} onChange={handleChange}>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-row" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  border: '1.5px solid var(--border)',
                  borderRadius: '9px',
                  cursor: 'pointer',
                  backgroundColor: formData.cooperative ? 'var(--primary-l)' : 'var(--card-opaque)',
                  borderColor: formData.cooperative ? 'var(--primary)' : 'var(--border)',
                  transition: 'all 0.2s',
                  userSelect: 'none'
                }}>
                  <input 
                    type="checkbox" 
                    name="cooperative"
                    checked={formData.cooperative}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid',
                    borderColor: formData.cooperative ? 'var(--primary)' : 'var(--border)',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: formData.cooperative ? 'var(--primary)' : 'transparent',
                    color: 'white',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}>
                    {formData.cooperative && '✓'}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    Member of an agricultural cooperative
                  </span>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-error" style={{
              background: 'var(--red-l)',
              color: 'var(--red)',
              borderRadius: '10px',
              padding: '14px',
              marginTop: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: '32px' }}>
            <button type="submit" className="btn btn-primary" style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              letterSpacing: '0.01em'
            }}>
              🚀 Calculate Credit Score & Loan Estimate
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
