import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, X, ArrowLeft, ArrowRight } from 'lucide-react';
import schemesData from '../data/schemes.json';
import { filterSchemes, getCategories, getStates } from '../engine/EligibilityEngine';
import FilterSidebar from './FilterSidebar';
import SchemeCard from './SchemeCard';
import SearchBar from './SearchBar';

const INIT_FILTERS = { age: '', gender: 'All', caste: 'All', state: 'All', category: 'All', query: '' };
const PAGE_SIZE = 12;

export default function SchemesPage({ initialQuery, initialCategory, initialEligibility, compareList, onToggleCompare, onBack }) {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        ...INIT_FILTERS,
        query: initialQuery || '',
        category: initialCategory || 'All',
        ...(initialEligibility || {})
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);

    const categories = useMemo(() => getCategories(schemesData), []);
    const states = useMemo(() => getStates(schemesData), []);
    const filtered = useMemo(() => filterSchemes(schemesData, filters), [filters]);
    const hasFilter = filters.age || filters.gender !== 'All' || filters.caste !== 'All' || filters.state !== 'All' || filters.category !== 'All' || filters.query;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const updateFilter = (newF) => { setFilters(newF); setPage(1); };
    const resetAll = () => { setFilters(INIT_FILTERS); setPage(1); };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

            {/* ── Page Hero Banner ── */}
            <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #1A3A8A 100%)',
                padding: '2rem 1.5rem',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                        <button onClick={onBack} style={{
                            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                            color: '#fff', borderRadius: 999, padding: '4px 14px', cursor: 'pointer',
                            fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px',
                        }}>
                            <ArrowLeft size={13} /> Home
                        </button>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>/</span>
                        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', fontWeight: 600 }}>All Schemes</span>
                        {filters.category !== 'All' && (
                            <>
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>/</span>
                                <span style={{ color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 700 }}>{filters.category}</span>
                            </>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '6px' }}>
                                {filters.category !== 'All' ? `${filters.category} Schemes` : 'All Government Schemes'}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
                                {filtered.length} schemes found
                                {filters.query ? ` for "${filters.query}"` : ''}
                                {filters.category !== 'All' ? ` in ${filters.category}` : ''}
                            </p>
                        </div>

                        {/* Inline search bar on this page too */}
                        <div style={{ flex: 1, minWidth: 280, maxWidth: 480 }}>
                            <SearchBar
                                schemes={schemesData}
                                onSearch={(q) => updateFilter({ ...filters, query: q })}
                                onSelectSuggestion={(s) => updateFilter({ ...filters, query: s.name })}
                                large
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Quick Category Tabs ── */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '4px', minWidth: 'max-content' }}>
                    {['All', 'Farming', 'Health', 'Education', 'Housing', 'Employment', 'Insurance', 'Finance', 'Women & Child', 'Social Security', 'Food Security'].map(cat => (
                        <button key={cat} onClick={() => updateFilter({ ...filters, category: cat })} style={{
                            padding: '12px 16px', borderBottom: `3px solid ${filters.category === cat ? 'var(--accent)' : 'transparent'}`,
                            background: 'none', border: 'none', borderBottom: `3px solid ${filters.category === cat ? 'var(--accent)' : 'transparent'}`,
                            color: filters.category === cat ? 'var(--accent)' : 'var(--text-muted)',
                            fontWeight: filters.category === cat ? 700 : 500, fontSize: '0.85rem',
                            cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s',
                        }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Main: Sidebar + Cards ── */}
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Mobile: filter toggle + active filter bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Mobile filter toggle */}
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-filter-btn" style={{
                            display: 'none',
                            padding: '8px 16px', borderRadius: 999, background: sidebarOpen ? 'var(--primary)' : 'var(--surface)',
                            color: sidebarOpen ? '#fff' : 'var(--text)', border: '1.5px solid var(--border)',
                            cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
                            alignItems: 'center', gap: '6px',
                        }}>
                            <SlidersHorizontal size={14} /> Filters
                        </button>

                        {hasFilter && (
                            <button onClick={resetAll} style={{
                                padding: '8px 16px', borderRadius: 999, background: 'var(--bg)',
                                border: '1.5px solid var(--border)', color: 'var(--text-muted)',
                                cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
                                display: 'flex', alignItems: 'center', gap: '5px',
                            }}>
                                <X size={13} /> Clear All
                            </button>
                        )}
                    </div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        Showing {paginated.length} of {filtered.length} schemes · Page {page} of {totalPages || 1}
                    </span>
                </div>

                <div className="main-layout">
                    {/* Sidebar */}
                    <div style={{ display: sidebarOpen ? 'block' : undefined }}>
                        <FilterSidebar
                            filters={filters}
                            setFilters={updateFilter}
                            categories={categories}
                            states={states}
                            totalResults={filtered.length}
                        />
                    </div>

                    {/* Cards + Pagination */}
                    <div>
                        {paginated.length === 0 ? (
                            <EmptyState onReset={resetAll} />
                        ) : (
                            <>
                                <div className="scheme-grid">
                                    {paginated.map((s, i) => (
                                        <div key={s.id} style={{ animation: `fadeInUp 0.35s ease ${Math.min(i, 5) * 0.05}s both` }}>
                                            <SchemeCard scheme={s} compareList={compareList} onToggleCompare={onToggleCompare} />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={pgBtn(page === 1)}>
                                            <ArrowLeft size={14} /> Prev
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                                            .reduce((acc, n, i, arr) => {
                                                if (i > 0 && n - arr[i - 1] > 1) acc.push('…');
                                                acc.push(n);
                                                return acc;
                                            }, [])
                                            .map((n, i) => n === '…' ? (
                                                <span key={`ellipsis-${i}`} style={{ color: 'var(--text-muted)', padding: '0 4px' }}>…</span>
                                            ) : (
                                                <button key={n} onClick={() => setPage(n)} style={pgBtn(false, n === page)}>
                                                    {n}
                                                </button>
                                            ))
                                        }
                                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={pgBtn(page === totalPages)}>
                                            Next <ArrowRight size={14} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .mobile-filter-btn { display: flex !important; }
        }
      `}</style>
        </div>
    );
}

function EmptyState({ onReset }) {
    return (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>No schemes match your filters</div>
            <div style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Try adjusting your age, caste, state, or category filters.</div>
            <button onClick={onReset} className="view-all-btn">Clear All Filters</button>
        </div>
    );
}

function pgBtn(disabled, active = false) {
    return {
        padding: '8px 14px', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem',
        background: active ? 'var(--primary)' : 'var(--surface)',
        color: active ? '#fff' : disabled ? 'var(--text-muted)' : 'var(--text)',
        border: `1.5px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        display: 'flex', alignItems: 'center', gap: '5px',
        transition: 'all 0.15s',
    };
}
