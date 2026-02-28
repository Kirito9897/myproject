import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';

const SLIDES = [
    {
        id: 1,
        image: '/hero1.png',
        tag: 'Digital India',
        title: 'Find the Right Government Scheme for You',
        subtitle: 'Access 1500+ central and state government schemes for education, health, farming, housing, and more.',
        cta: 'Find My Scheme',
        cta2: 'Browse All Schemes',
        cta2href: '#schemes-section',
        overlay: 'linear-gradient(90deg, rgba(0,45,98,0.92) 40%, rgba(0,45,98,0.5) 100%)',
    },
    {
        id: 2,
        image: '/hero2.png',
        tag: '🌾 Farming Schemes',
        title: '₹6,000/Year Direct to Farmers\' Bank Accounts',
        subtitle: 'PM Kisan Samman Nidhi and 50+ other agriculture schemes for small and marginal farmers.',
        cta: 'See Farming Schemes',
        filterCategory: 'Farming',
        overlay: 'linear-gradient(90deg, rgba(4,47,6,0.88) 40%, rgba(4,47,6,0.45) 100%)',
    },
    {
        id: 3,
        image: '/hero3.png',
        tag: '🎓 Education Scholarships',
        title: 'Scholarships & Skill Training for Every Student',
        subtitle: 'Discover PMKVY, NSP scholarships, and 100+ education schemes from Class 1 to PhD.',
        cta: 'Explore Education Schemes',
        filterCategory: 'Education',
        overlay: 'linear-gradient(90deg, rgba(46,16,101,0.88) 40%, rgba(46,16,101,0.45) 100%)',
    },
    {
        id: 4,
        image: '/hero4.png',
        tag: '🏥 Health Coverage',
        title: '₹5 Lakh Free Health Insurance for Your Family',
        subtitle: 'Ayushman Bharat (PM-JAY) covers 80 crore Indians — check if your family is eligible.',
        cta: 'Check Health Schemes',
        filterCategory: 'Health',
        overlay: 'linear-gradient(90deg, rgba(127,29,29,0.88) 40%, rgba(127,29,29,0.45) 100%)',
    },
    {
        id: 5,
        image: '/hero5.png',
        tag: '🏠 Housing for All',
        title: 'Your Dream Home — Subsidised by the Government',
        subtitle: 'PMAY offers subsidies up to ₹2.67 lakh. Check eligibility for urban and rural housing schemes.',
        cta: 'Explore Housing Schemes',
        filterCategory: 'Housing',
        overlay: 'linear-gradient(90deg, rgba(67,20,7,0.88) 40%, rgba(67,20,7,0.45) 100%)',
    },
];

const INTERVAL_MS = 7000;

export default function Hero({ schemes, onSearch, onOpenEligibility, onFilterCategory }) {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const goTo = useCallback((idx) => {
        setTransitioning(true);
        setTimeout(() => {
            setCurrent(idx);
            setTransitioning(false);
        }, 250);
    }, []);

    const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
    const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

    // Auto-advance
    useEffect(() => {
        const t = setInterval(next, INTERVAL_MS);
        return () => clearInterval(t);
    }, [next]);

    const slide = SLIDES[current];

    const handlePrimaryCTA = () => {
        if (slide.filterCategory) {
            onFilterCategory(slide.filterCategory);
            document.getElementById('schemes-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            onOpenEligibility();
        }
    };

    return (
        <section id="home" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Image + Overlay */}
            <div style={{
                position: 'relative',
                height: 'clamp(420px, 55vw, 600px)',
                overflow: 'hidden',
            }}>
                <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.tag}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        opacity: transitioning ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                    }}
                    onError={(e) => { e.target.style.background = 'var(--primary)'; }}
                />
                {/* Gradient Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: slide.overlay }} />

                {/* Text Content */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: 'clamp(1.5rem, 5vw, 4rem)',
                    maxWidth: 760,
                    opacity: transitioning ? 0 : 1,
                    transform: transitioning ? 'translateY(10px)' : 'translateY(0)',
                    transition: 'all 0.5s ease',
                }}>
                    <span style={{
                        display: 'inline-block', padding: '5px 14px', borderRadius: 999,
                        background: 'var(--saffron)', color: '#000', fontWeight: 700,
                        fontSize: '0.77rem', marginBottom: '1rem', alignSelf: 'flex-start',
                        letterSpacing: '0.04em',
                    }}>{slide.tag}</span>

                    <h1 style={{
                        color: '#FFFFFF', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                        textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                    }}>
                        {slide.title}
                    </h1>

                    <p style={{
                        color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                        lineHeight: 1.65, marginBottom: '2rem', maxWidth: 560,
                    }}>
                        {slide.subtitle}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <button onClick={handlePrimaryCTA} id="hero-cta" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '13px 28px', borderRadius: 999, fontWeight: 700, fontSize: '0.95rem',
                            background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer',
                            boxShadow: '0 6px 24px rgba(249,115,22,0.45)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                        >
                            <Target size={18} /> {slide.cta} <ArrowRight size={16} />
                        </button>
                        {slide.cta2 && (
                            <a href={slide.cta2href} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '13px 28px', borderRadius: 999, fontWeight: 600, fontSize: '0.95rem',
                                background: 'rgba(255,255,255,0.15)', color: '#fff',
                                border: '2px solid rgba(255,255,255,0.5)',
                                backdropFilter: 'blur(8px)',
                            }}>
                                Browse All Schemes
                            </a>
                        )}
                    </div>
                </div>

                {/* Navigation Arrows */}
                {[['left', prev, '←'], ['right', next, '→']].map(([dir, fn, icon]) => (
                    <button key={dir} onClick={fn} aria-label={`${dir} slide`} style={{
                        position: 'absolute', top: '50%', [dir]: '1.5rem', transform: 'translateY(-50%)',
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        color: '#fff', fontSize: '1.1rem', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    >
                        {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                ))}

                {/* Dots */}
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                    {SLIDES.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} style={{
                            width: i === current ? 28 : 8, height: 8, borderRadius: 999, border: 'none',
                            background: i === current ? 'var(--saffron)' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.3s',
                        }} />
                    ))}
                </div>
            </div>

            {/* ── Search Bar Attached Below Carousel ── */}
            <div style={{
                background: 'var(--primary)', padding: '1.5rem',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 500 }}>
                        Search across 1500+ government schemes
                    </p>
                    <SearchBar schemes={schemes} onSearch={onSearch} onSelectSuggestion={(s) => onSearch(s.name)} large />
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {['PM Kisan', 'Ayushman Bharat', 'PMAY', 'MUDRA', 'Scholarship'].map(tag => (
                            <button key={tag} onClick={() => onSearch(tag)} style={{
                                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
                                color: 'rgba(255,255,255,0.9)', padding: '4px 14px', borderRadius: 999,
                                fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
                                transition: 'background 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Scrolling Ticker ── */}
            <div style={{ background: 'var(--accent)', overflow: 'hidden', padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ background: 'rgba(0,0,0,0.2)', color: '#fff', padding: '0 14px', fontWeight: 800, fontSize: '0.75rem', whiteSpace: 'nowrap', flexShrink: 0, borderRight: '2px solid rgba(255,255,255,0.3)' }}>
                    🔔 What's New
                </span>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                    <div className="ticker-track" style={{ display: 'inline-block' }}>
                        {[
                            'PM Kisan 19th installment released — check your account',
                            'Ayushman Bharat cards now issued at Common Service Centres',
                            'PMKVY 4.0 enrollments open — apply before March 31',
                            'PMAY-Urban Phase III launched for 1 crore new homes',
                            'Sukanya Samriddhi interest rate revised to 8.2% for Q1 2025',
                            'NSP scholarship applications open for OBC students — deadline March 15',
                        ].concat([
                            'PM Kisan 19th installment released — check your account',
                            'Ayushman Bharat cards now issued at Common Service Centres',
                        ]).map((text, i) => (
                            <span key={i} style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 500, margin: '0 3rem' }}>
                                ● {text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
