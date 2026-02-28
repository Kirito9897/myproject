import React from 'react';
import { useTranslation } from 'react-i18next';
import { GitCompare, X, ArrowRight } from 'lucide-react';

export default function CompareBar({ compareList, allSchemes, onClear, onOpenCompare }) {
    const { t } = useTranslation();
    if (compareList.length === 0) return null;

    const names = compareList.map(id => allSchemes.find(s => s.id === id)?.name);

    return (
        <div style={{
            position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 150, display: 'flex', alignItems: 'center', gap: '12px',
            background: 'var(--surface)', borderRadius: 999,
            padding: '12px 20px', boxShadow: '0 8px 50px rgba(0,0,0,0.2)',
            border: '2px solid var(--primary)', minWidth: '320px',
            animation: 'slideDown 0.3s ease',
        }}>
            <GitCompare size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
                {compareList.length === 1
                    ? `1 selected · ${names[0]?.slice(0, 30)}${names[0]?.length > 30 ? '…' : ''}`
                    : `Comparing: ${names[0]?.split(' ').slice(0, 2).join(' ')} vs ${names[1]?.split(' ').slice(0, 2).join(' ')}`
                }
            </div>

            {compareList.length === 2 && (
                <button
                    onClick={onOpenCompare}
                    id="compare-now-btn"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: '0.82rem',
                        background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {t('compare.compare')} <ArrowRight size={14} />
                </button>
            )}

            <button
                onClick={onClear}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', flexShrink: 0,
                }}
                title={t('compare.clear')}
            >
                <X size={18} />
            </button>
        </div>
    );
}
