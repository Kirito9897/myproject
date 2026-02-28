import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Sun, Moon, Contrast, Menu, X, Landmark, Search, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
    { key: 'home', href: '#home' },
    { key: 'schemes', href: '#schemes-section', label: 'Browse Schemes' },
    { key: 'eligibility', href: '#eligibility', label: 'Check Eligibility' },
    { key: 'about', href: '#about', label: 'About' },
];

export default function Header({ theme, setTheme, onOpenEligibility, onGoHome, onGoSchemes }) {
    const { i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const cycleTheme = () => {
        const order = ['light', 'dark'];
        setTheme(order[(order.indexOf(theme) + 1) % order.length]);
    };

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            {/* ── Main Header ── */}
            <div style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
                boxShadow: '0 2px 12px rgba(0,45,98,0.08)',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', height: 66 }}>
                    {/* Logo */}
                    <button onClick={onGoHome} style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 10,
                            background: 'linear-gradient(135deg, var(--primary), #1A56DB)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Landmark size={22} color="#fff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary)', lineHeight: 1.1 }}>SarkariHub</div>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                Government Schemes Portal
                            </div>
                        </div>
                    </button>

                    {/* Desktop Nav */}
                    <nav className="desktop-nav" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
                        {[
                            { label: 'Home', action: onGoHome },
                            { label: 'Browse Schemes', action: onGoSchemes },
                            { label: 'Check Eligibility', action: onOpenEligibility },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={item.action}
                                style={{
                                    padding: '8px 14px', borderRadius: 8, color: 'var(--text)', fontWeight: 500,
                                    fontSize: '0.87rem', transition: 'all 0.2s', whiteSpace: 'nowrap',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text)'; }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                        {/* Dark mode */}
                        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{
                            width: 36, height: 36, borderRadius: 8, background: 'var(--primary-light)',
                            border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--primary)',
                        }}>
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        {/* CTA */}
                        <button onClick={onOpenEligibility} style={{
                            padding: '8px 18px', borderRadius: 999, background: 'var(--accent)',
                            color: '#fff', fontWeight: 700, fontSize: '0.82rem',
                            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                            boxShadow: '0 3px 12px rgba(249,115,22,0.3)',
                        }}>
                            Find My Scheme
                        </button>

                        {/* Mobile hamburger */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
                            width: 36, height: 36, borderRadius: 8, background: 'var(--primary-light)',
                            border: '1px solid var(--border)', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--primary)',
                        }}>
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {['Home', 'Browse Schemes', 'Categories', 'About'].map(l => (
                            <a key={l} href="#" onClick={() => setMenuOpen(false)} style={{ padding: '10px 12px', borderRadius: 8, color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem' }}>
                                {l}
                            </a>
                        ))}
                        <button onClick={() => { onOpenEligibility(); setMenuOpen(false); }} style={{ marginTop: '8px', padding: '12px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                            Find My Scheme →
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
