import React from 'react';
import { Landmark, ExternalLink, Phone, Mail, Twitter, Youtube, Facebook, Instagram, ArrowRight } from 'lucide-react';

const QUICK_LINKS = [
    { label: 'Browse All Schemes', href: '#schemes-section' },
    { label: 'Check Eligibility', href: '#eligibility' },
    { label: 'Scheme Categories', href: '#categories' },
    { label: 'Document Checklist', href: '#schemes-section' },
    { label: 'Compare Schemes', href: '#schemes-section' },
];

const REF_SITES = [
    { name: 'myScheme.gov.in', url: 'https://www.myscheme.gov.in' },
    { name: 'Digital India', url: 'https://www.digitalindia.gov.in' },
    { name: 'Jan Samarth', url: 'https://www.jansamarth.in' },
    { name: 'NSP Scholarships', url: 'https://scholarships.gov.in' },
    { name: 'PM Kisan Portal', url: 'https://pmkisan.gov.in' },
];

const SOCIAL = [
    { Icon: Twitter, label: 'Twitter', href: '#' },
    { Icon: Facebook, label: 'Facebook', href: '#' },
    { Icon: Youtube, label: 'YouTube', href: '#' },
    { Icon: Instagram, label: 'Instagram', href: '#' },
];

export default function Footer() {
    return (
        <footer style={{ background: '#002147', color: 'rgba(255,255,255,0.75)' }}>
            {/* Main footer columns */}
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #1A56DB, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Landmark size={20} color="#fff" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, color: '#FFF', fontSize: '1rem' }}>SarkariHub</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Government Schemes Portal</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                            Making government schemes accessible to every Indian citizen — across 28 states, 12 categories, 1500+ schemes.
                        </p>
                        {/* Social */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {SOCIAL.map(({ Icon, label, href }) => (
                                <a key={label} href={href} aria-label={label} style={{
                                    width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'rgba(255,255,255,0.8)', transition: 'background 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                            Quick Links
                        </div>
                        {QUICK_LINKS.map(l => (
                            <a key={l.label} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', padding: '5px 0', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#F97316'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                            >
                                <ArrowRight size={11} /> {l.label}
                            </a>
                        ))}
                    </div>

                    {/* Official References */}
                    <div>
                        <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                            Official Sites
                        </div>
                        {REF_SITES.map(r => (
                            <a key={r.name} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', padding: '5px 0', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                            >
                                <ExternalLink size={11} /> {r.name}
                            </a>
                        ))}
                    </div>

                    {/* Contact / Helpline */}
                    <div id="about">
                        <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                            Help & Support
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { icon: Phone, text: 'PM Kisan Helpline: 155261' },
                                { icon: Phone, text: 'PMJAY: 14555' },
                                { icon: Phone, text: 'PMAY Helpline: 1800-11-6163' },
                                { icon: Mail, text: 'feedback@sarkarihub.gov.in' },
                            ].map(({ icon: Icon, text }, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                                    <Icon size={13} color="rgba(255,153,51,0.9)" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1.5rem' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem' }}>
                        © 2025 SarkariHub. Unofficial portal for educational purposes. Official info: <a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" style={{ color: '#60A5FA' }}>myscheme.gov.in</a>
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
                            <a key={l} href="#" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                            >{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
