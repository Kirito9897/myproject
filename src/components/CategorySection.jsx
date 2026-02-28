import React from 'react';
import { Sprout, HeartPulse, GraduationCap, Home, Briefcase, Users, Shield, Wheat, ArrowRight } from 'lucide-react';

const CATEGORIES = [
    { name: 'Farming', icon: Sprout, color: '#16A34A', bg: '#DCFCE7', emoji: '🌾', desc: 'PM-Kisan, Fasal Bima & more' },
    { name: 'Health', icon: HeartPulse, color: '#DC2626', bg: '#FEE2E2', emoji: '🏥', desc: 'Ayushman Bharat, CGHS & more' },
    { name: 'Education', icon: GraduationCap, color: '#7C3AED', bg: '#EDE9FE', emoji: '🎓', desc: 'Scholarships, PMKVY & more' },
    { name: 'Housing', icon: Home, color: '#B45309', bg: '#FEF3C7', emoji: '🏠', desc: 'PMAY Urban & Gramin' },
    { name: 'Employment', icon: Briefcase, color: '#1D4ED8', bg: '#DBEAFE', emoji: '💼', desc: 'MUDRA, NREGA & more' },
    { name: 'Women & Child', icon: Users, color: '#DB2777', bg: '#FCE7F3', emoji: '👩', desc: 'Ujjwala, Beti Bachao & more' },
    { name: 'Insurance', icon: Shield, color: '#0891B2', bg: '#CFFAFE', emoji: '🛡️', desc: 'PMSBY, PMJJBY & more' },
    { name: 'Social Security', icon: Wheat, color: '#6B7280', bg: '#F3F4F6', emoji: '🧓', desc: 'Pension, widow support' },
];

export default function CategorySection({ onSelectCategory }) {
    return (
        <section id="categories" className="section" style={{ background: 'var(--bg)' }}>
            <div className="section-container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Browse by <span>Category</span></h2>
                        <p className="section-subtitle">Choose a category to see matching schemes instantly</p>
                    </div>
                    <button className="view-all-btn" onClick={() => onSelectCategory('All')}>
                        View All <ArrowRight size={14} />
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1rem',
                }}>
                    {CATEGORIES.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => onSelectCategory(cat.name)}
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    padding: '1.25rem',
                                    cursor: 'pointer', textAlign: 'left',
                                    transition: 'all 0.22s',
                                    boxShadow: 'var(--shadow-card)',
                                    animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
                                    display: 'flex', alignItems: 'center', gap: '14px',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = cat.color + '55';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                            >
                                {/* Icon Circle */}
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                                    background: cat.bg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <span style={{ fontSize: '1.6rem' }}>{cat.emoji}</span>
                                </div>
                                {/* Text */}
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '2px' }}>
                                        {cat.name}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                                        {cat.desc}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
