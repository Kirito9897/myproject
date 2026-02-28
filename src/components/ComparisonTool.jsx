import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, GitCompare } from 'lucide-react';
import { compareSchemes } from '../engine/EligibilityEngine';

export default function ComparisonTool({ compareList, allSchemes, onClear, onClose }) {
    const { t } = useTranslation();
    const schemeA = allSchemes.find(s => s.id === compareList[0]);
    const schemeB = allSchemes.find(s => s.id === compareList[1]);
    const fields = compareSchemes(schemeA, schemeB);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
            overflowY: 'auto',
        }} onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={{
                background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
                padding: '2rem', width: '100%', maxWidth: '800px',
                boxShadow: '0 30px 100px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.35s ease',
                maxHeight: '90vh', overflowY: 'auto',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <GitCompare size={20} color="#fff" />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>
                            {t('compare.title')}
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <X size={22} />
                    </button>
                </div>

                {/* Column Headers */}
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div />
                    {[schemeA, schemeB].map((s, i) => (
                        <div key={i} style={{
                            background: i === 0 ? 'var(--primary-light)' : '#FEF3C7',
                            borderRadius: 'var(--radius-sm)', padding: '14px 16px',
                            borderTop: `3px solid ${i === 0 ? 'var(--primary)' : 'var(--warning)'}`,
                        }}>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.3 }}>
                                {s?.name || '—'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                {s?.ministry || ''}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Rows */}
                {fields.map((row, i) => (
                    <div key={row.label} style={{
                        display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '1rem',
                        padding: '12px 0', borderBottom: i < fields.length - 1 ? '1px solid var(--border)' : 'none',
                        alignItems: 'start',
                    }}>
                        <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: '2px' }}>
                            {row.label}
                        </div>
                        <div style={{ fontSize: '0.87rem', color: 'var(--text)', lineHeight: 1.55 }}>{row.a}</div>
                        <div style={{ fontSize: '0.87rem', color: 'var(--text)', lineHeight: 1.55 }}>{row.b}</div>
                    </div>
                ))}

                {/* Apply Links */}
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                    <div />
                    {[schemeA, schemeB].map((s, i) => (
                        <a key={i} href={s?.applyLink} target="_blank" rel="noreferrer" style={{
                            display: 'block', textAlign: 'center', padding: '12px',
                            borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.87rem',
                            background: i === 0 ? 'var(--primary)' : 'var(--accent)',
                            color: '#fff', textDecoration: 'none',
                            transition: 'opacity 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            Apply: {s?.name?.split(' ').slice(0, 3).join(' ')}... ↗
                        </a>
                    ))}
                </div>

                {/* Close */}
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button onClick={onClose} style={{
                        padding: '10px 28px', borderRadius: 999, background: 'var(--bg)',
                        border: '1.5px solid var(--border)', color: 'var(--text)', fontWeight: 600,
                        cursor: 'pointer', fontSize: '0.87rem',
                    }}>
                        {t('compare.close')}
                    </button>
                </div>
            </div>
        </div>
    );
}
