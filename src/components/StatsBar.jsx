import React from 'react';
import { Users, FileText, MapPin, Star } from 'lucide-react';

const STATS = [
    { icon: FileText, value: '1,500+', label: 'Government Schemes', emoji: '📋' },
    { icon: Users, value: '80 Crore', label: 'Beneficiaries Covered', emoji: '👥' },
    { icon: MapPin, value: '28 States', label: 'All States & UTs', emoji: '🗺️' },
    { icon: Star, value: '12', label: 'Scheme Categories', emoji: '🏆' },
];

export default function StatsBar() {
    return (
        <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1A3A8A 100%)',
            padding: '2.5rem 1.5rem',
        }}>
            <div style={{
                maxWidth: 1280, margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
            }}>
                {STATS.map((s, i) => (
                    <div key={s.label} style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '0.5rem 0',
                        borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                            background: 'rgba(255,255,255,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.75rem',
                        }}>
                            {s.emoji}
                        </div>
                        <div>
                            <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.6rem', lineHeight: 1.1 }}>{s.value}</div>
                            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: 500, marginTop: '3px' }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
