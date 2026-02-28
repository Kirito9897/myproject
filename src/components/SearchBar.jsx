import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { searchSchemes } from '../engine/EligibilityEngine';

export default function SearchBar({ schemes, onSearch, onSelectSuggestion, large = false }) {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSugg, setShowSugg] = useState(false);
    const timer = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setSuggestions(searchSchemes(schemes, query));
            onSearch(query);
        }, 280);
        return () => clearTimeout(timer.current);
    }, [query, schemes]);

    const clear = () => { setQuery(''); onSearch(''); inputRef.current?.focus(); };
    const select = (s) => { setQuery(s.name); setSuggestions([]); onSelectSuggestion?.(s); };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: large ? 680 : 520 }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: '#fff', borderRadius: 999,
                padding: large ? '0 22px' : '0 16px',
                border: '2px solid var(--border)',
                boxShadow: '0 4px 20px rgba(0,45,98,0.10)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
                onFocus={() => { }} onBlur={() => { }}
            >
                <Search size={large ? 22 : 18} color="#94A3B8" style={{ flexShrink: 0 }} />
                <input
                    ref={inputRef}
                    id="main-search"
                    type="text"
                    value={query}
                    autoComplete="off"
                    placeholder={t('hero.searchPlaceholder')}
                    onChange={e => { setQuery(e.target.value); setShowSugg(true); }}
                    onFocus={() => setShowSugg(true)}
                    onBlur={() => setTimeout(() => setShowSugg(false), 160)}
                    style={{
                        flex: 1, border: 'none', outline: 'none', background: 'transparent',
                        color: 'var(--text)', fontFamily: 'var(--font)',
                        fontSize: large ? '1rem' : '0.9rem',
                        padding: large ? '16px 0' : '12px 0',
                    }}
                />
                {query && (
                    <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}>
                        <X size={16} />
                    </button>
                )}
                {large && (
                    <button onClick={() => onSearch(query)} style={{
                        padding: '10px 22px', borderRadius: 999, background: 'var(--accent)',
                        color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                        flexShrink: 0, whiteSpace: 'nowrap',
                    }}>
                        Search
                    </button>
                )}
            </div>

            {/* Suggestions */}
            {showSugg && suggestions.length > 0 && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                    background: '#fff', borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow-hover)', border: '1px solid var(--border)',
                    zIndex: 200, overflow: 'hidden', animation: 'fadeInUp 0.2s ease',
                }}>
                    {suggestions.map((s, i) => (
                        <button key={s.id} onMouseDown={() => select(s)} style={{
                            width: '100%', textAlign: 'left', padding: '11px 16px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                            display: 'flex', alignItems: 'center', gap: '10px',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                            <Search size={13} color="#94A3B8" />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.87rem', color: 'var(--text)' }}>{s.name}</div>
                                <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{s.category} · {s.state}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
