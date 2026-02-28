import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, ChevronDown, ChevronUp, ExternalLink, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';

const CATEGORY_BADGE = {
    'Farming': 'farming', 'Health': 'health', 'Education': 'education',
    'Housing': 'housing', 'Employment': 'employment', 'Insurance': 'insurance',
    'Finance': 'finance', 'Women & Child': 'women', 'Social Security': 'social',
    'Food Security': 'food',
};

// Category-themed gradient header for each card
const CATEGORY_GRADIENT = {
    'Farming': 'linear-gradient(135deg, #166534, #15803D)',
    'Health': 'linear-gradient(135deg, #991B1B, #DC2626)',
    'Education': 'linear-gradient(135deg, #4C1D95, #7C3AED)',
    'Housing': 'linear-gradient(135deg, #92400E, #D97706)',
    'Employment': 'linear-gradient(135deg, #1E3A8A, #2563EB)',
    'Insurance': 'linear-gradient(135deg, #9D174D, #DB2777)',
    'Finance': 'linear-gradient(135deg, #065F46, #059669)',
    'Women & Child': 'linear-gradient(135deg, #831843, #EC4899)',
    'Social Security': 'linear-gradient(135deg, #374151, #6B7280)',
    'Food Security': 'linear-gradient(135deg, #78350F, #D97706)',
};

const CATEGORY_EMOJI = {
    'Farming': '🌾', 'Health': '🏥', 'Education': '🎓', 'Housing': '🏠',
    'Employment': '💼', 'Insurance': '🛡️', 'Finance': '💰', 'Women & Child': '👩',
    'Social Security': '🧓', 'Food Security': '🍱',
};

export default function SchemeCard({ scheme, compareList, onToggleCompare }) {
    const { t } = useTranslation();
    const [docsOpen, setDocsOpen] = useState(false);
    const [checked, setChecked] = useState({});
    const isInCompare = compareList.includes(scheme.id);
    const compareDisabled = compareList.length >= 2 && !isInCompare;

    const toggleDoc = (d) => setChecked(p => ({ ...p, [d]: !p[d] }));
    const badgeClass = `badge badge-${CATEGORY_BADGE[scheme.category] || 'social'}`;
    const gradient = CATEGORY_GRADIENT[scheme.category] || 'linear-gradient(135deg, #002D62, #1A56DB)';
    const emoji = CATEGORY_EMOJI[scheme.category] || '📋';

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Card Visual Header Strip */}
            <div style={{
                background: gradient, padding: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '12px',
                minHeight: 90,
            }}>
                <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.8rem',
                }}>
                    {emoji}
                </div>
                <div style={{ flex: 1 }}>
                    <span className={badgeClass} style={{ marginBottom: 6, display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                        {scheme.category}
                    </span>
                    <div style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 500, opacity: 0.85 }}>{scheme.state}</div>
                </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '1.125rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.97rem', color: 'var(--text)', lineHeight: 1.35, marginBottom: '8px' }}>
                    {scheme.name}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '10px' }}>
                    {scheme.description}
                </p>

                {/* Benefits */}
                <div style={{
                    background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                    borderRadius: 'var(--radius-sm)', padding: '10px 12px', marginBottom: '10px',
                    borderLeft: '3px solid #059669',
                }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
                        💰 Key Benefit
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>{scheme.benefits}</div>
                </div>

                {/* Eligibility chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                    {scheme.gender !== 'All' && <Chip label={scheme.gender} />}
                    {scheme.caste !== 'All' && <Chip label={scheme.caste} />}
                    <Chip label={`Age: ${scheme.minAge}–${scheme.maxAge}`} />
                </div>

                {/* Ministry */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 500 }}>
                    🏛️ {scheme.ministry}
                </div>

                {/* Document Toggle */}
                <button onClick={() => setDocsOpen(!docsOpen)} style={{
                    width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    cursor: 'pointer', color: 'var(--text)', fontWeight: 600, fontSize: '0.8rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'background 0.15s',
                    marginBottom: docsOpen ? '8px' : '0',
                }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
                    id={`docs-toggle-${scheme.id}`}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={13} color="var(--primary)" />
                        {docsOpen ? t('card.hideDocs') : t('card.viewDocs')} ({scheme.documents.length})
                    </span>
                    {docsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {docsOpen && (
                    <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '10px' }}>
                        {scheme.documents.map(doc => (
                            <label key={doc} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer' }}>
                                <input type="checkbox" checked={!!checked[doc]} onChange={() => toggleDoc(doc)} style={{ accentColor: '#059669', width: 14, height: 14 }} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text)', textDecoration: checked[doc] ? 'line-through' : 'none', opacity: checked[doc] ? 0.5 : 1 }}>
                                    {doc}
                                </span>
                                {checked[doc] && <CheckCircle size={12} color="#059669" />}
                            </label>
                        ))}
                    </div>
                )}

                {/* Footer Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <a href={scheme.applyLink} target="_blank" rel="noreferrer" id={`apply-${scheme.id}`} style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                        padding: '9px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.82rem',
                        background: '#059669', color: '#fff', textDecoration: 'none',
                        transition: 'opacity 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        <ExternalLink size={13} /> Apply Now
                    </a>
                    <button onClick={() => !compareDisabled && onToggleCompare(scheme.id)} disabled={compareDisabled}
                        id={`compare-${scheme.id}`}
                        style={{
                            padding: '9px 12px', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.75rem',
                            border: `1.5px solid ${isInCompare ? 'var(--primary)' : 'var(--border)'}`,
                            background: isInCompare ? 'var(--primary-light)' : 'var(--surface)',
                            color: isInCompare ? 'var(--primary)' : 'var(--text-muted)',
                            cursor: compareDisabled ? 'not-allowed' : 'pointer',
                            opacity: compareDisabled ? 0.4 : 1,
                            display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
                        }}>
                        {isInCompare ? <Minus size={12} /> : <Plus size={12} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Chip({ label }) {
    return (
        <span style={{ padding: '3px 9px', borderRadius: 999, background: 'var(--bg)', border: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {label}
        </span>
    );
}
