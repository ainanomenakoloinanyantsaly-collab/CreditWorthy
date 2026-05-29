import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import CreditScorePage from './pages/CreditScorePage';
import LenderPortalPage from './pages/LenderPortalPage';
import { computeFarmer } from './utils/calculations';

// Initial data for demonstration
const INITIAL_FARMERS = [
  { name: "Rakoto", region: "Alaotra", crop: "Rice", area: 2.4, yield_t: 4.2, financial_access: "Mobile Money", cooperative: true },
  { name: " Aina", region: "Vakinankaratra", crop: "Maize", area: 1.1, yield_t: 2.8, financial_access: "Mobile Money", cooperative: false },
  { name: "Jean", region: "Androy", crop: "Rice", area: 0.6, yield_t: 1.5, financial_access: "None", cooperative: false },
].map(f => computeFarmer(f));

function App() {
  const [activePage, setActivePage] = useState('home');
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [currentFarmer, setCurrentFarmer] = useState(null);

  const handleRegister = (farmer) => {
    // Add to list if not already there (by name)
    setFarmers(prev => {
      const exists = prev.find(f => f.name === farmer.name);
      if (exists) return prev;
      return [...prev, farmer];
    });
    setCurrentFarmer(farmer);
    setActivePage('score');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'registration':
        return <RegistrationPage onRegister={handleRegister} />;
      case 'score':
        return <CreditScorePage farmer={currentFarmer} onBack={() => setActivePage('registration')} />;
      case 'lender':
        return <LenderPortalPage farmers={farmers} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <Layout 
      activePage={activePage} 
      setActivePage={setActivePage} 
      farmerCount={farmers.length}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
