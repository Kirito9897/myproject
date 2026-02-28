import React, { useState, useEffect } from 'react';
import { applyTheme } from './theme/Theme.js';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import CategorySection from './components/CategorySection';
import SchemesPage from './components/SchemesPage';
import EligibilityFinder from './components/EligibilityFinder';
import ComparisonTool from './components/ComparisonTool';
import CompareBar from './components/CompareBar';
import Footer from './components/Footer';
import schemesData from './data/schemes.json';

// Pages: 'home' | 'schemes'
export default function App() {
  const [appTheme, setAppTheme] = useState('light');
  const [page, setPage] = useState('home');   // ← page router
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [compareList, setCompareList] = useState([]);
  const [showEligibility, setShowEligibility] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme === 'light' ? '' : appTheme);
  }, [appTheme]);

  useEffect(() => { applyTheme(); }, []);

  // Navigate to Schemes page, optionally with a pre-set search or category
  const goToSchemes = (opts = {}) => {
    setSearchQuery(opts.query || '');
    setSearchCategory(opts.category || 'All');
    setPage('schemes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEligibilitySubmit = ({ age, gender, caste, state }) => {
    // Go to schemes page with those as initial filters
    setSearchQuery('');
    setSearchCategory('All');
    setPage('schemes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // We pass eligibility answers via a ref trick — simplest: store in state
    setEligibilityFilters({ age, gender: gender || 'All', caste: caste || 'All', state: state || 'All' });
  };

  const [eligibilityFilters, setEligibilityFilters] = useState(null);

  const toggleCompare = (id) =>
    setCompareList(prev => prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 2 ? [...prev, id] : prev);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header is always shown */}
      <Header
        theme={appTheme}
        setTheme={setAppTheme}
        onOpenEligibility={() => setShowEligibility(true)}
        onGoHome={goHome}
        onGoSchemes={() => goToSchemes()}
      />

      <main style={{ flex: 1 }}>
        {page === 'home' ? (
          /* ═══════════════ HOME PAGE ═══════════════ */
          <>
            <Hero
              schemes={schemesData}
              onSearch={(q) => q && goToSchemes({ query: q })}
              onOpenEligibility={() => setShowEligibility(true)}
              onFilterCategory={(cat) => goToSchemes({ category: cat })}
            />
            <StatsBar />
            <CategorySection onSelectCategory={(cat) => goToSchemes({ category: cat })} />

            {/* ── CTA Banner ── */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #1A3A8A 100%)',
              padding: '3.5rem 1.5rem', textAlign: 'center',
            }}>
              <div style={{ maxWidth: 650, margin: '0 auto' }}>
                <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: '0.75rem' }}>
                  Not Sure Which Scheme You Qualify For?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.75rem', fontSize: '1rem', lineHeight: 1.65 }}>
                  Use our Smart Eligibility Finder — answer 4 quick questions about your age, gender, caste, and state to instantly discover schemes made for you.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                  <button id="eligibility" onClick={() => setShowEligibility(true)} style={{
                    padding: '14px 36px', borderRadius: 999, background: 'var(--accent)',
                    color: '#fff', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                    boxShadow: '0 6px 24px rgba(249,115,22,0.4)',
                    transition: 'transform 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    🎯 Check My Eligibility
                  </button>
                  <button onClick={() => goToSchemes()} style={{
                    padding: '14px 36px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.4)',
                    color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                  >
                    📋 Browse All Schemes
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ═══════════════ SCHEMES PAGE ═══════════════ */
          <SchemesPage
            initialQuery={searchQuery}
            initialCategory={searchCategory}
            initialEligibility={eligibilityFilters}
            compareList={compareList}
            onToggleCompare={toggleCompare}
            onBack={goHome}
          />
        )}
      </main>

      {/* Footer always shown */}
      {page === 'home' && <Footer />}

      {/* Modals */}
      {showEligibility && (
        <EligibilityFinder
          onClose={() => setShowEligibility(false)}
          onSubmit={(answers) => { setShowEligibility(false); handleEligibilitySubmit(answers); }}
        />
      )}
      {showComparison && compareList.length === 2 && (
        <ComparisonTool
          compareList={compareList}
          allSchemes={schemesData}
          onClear={() => { setCompareList([]); setShowComparison(false); }}
          onClose={() => setShowComparison(false)}
        />
      )}
      <CompareBar
        compareList={compareList}
        allSchemes={schemesData}
        onClear={() => setCompareList([])}
        onOpenCompare={() => setShowComparison(true)}
      />
    </div>
  );
}
