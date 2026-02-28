import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Target, X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

const STATES = [
    'All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir',
];

const CASTES = ['General', 'OBC', 'SC', 'ST'];

export default function EligibilityFinder({ onClose, onSubmit }) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({ age: '', gender: 'Male', caste: 'General', state: 'All India' });

    const update = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));
    const next = () => setStep(s => Math.min(s + 1, 4));
    const back = () => setStep(s => Math.max(s - 1, 1));
    const submit = () => { onSubmit(answers); onClose(); };

    const steps = [
        {
            num: 1, label: t('eligibility.step1.label'),
            content: (
                <input
                    type="number" value={answers.age} min={0} max={120}
                    onChange={e => update('age', e.target.value)}
                    placeholder={t('eligibility.step1.placeholder')}
                    style={inputStyle}
                    autoFocus id="elig-age"
                />
            ),
            valid: answers.age > 0,
        },
        {
            num: 2, label: t('eligibility.step2.label'),
            content: (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Male', 'Female', 'Other'].map(g => (
                        <button key={g} onClick={() => update('gender', g)} style={optBtn(answers.gender === g)} id={`elig-gender-${g}`}>
                            {g}
                        </button>
                    ))}
                </div>
            ),
            valid: !!answers.gender,
        },
        {
            num: 3, label: t('eligibility.step3.label'),
            content: (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {CASTES.map(c => (
                        <button key={c} onClick={() => update('caste', c)} style={optBtn(answers.caste === c)} id={`elig-caste-${c}`}>
                            {c}
                        </button>
                    ))}
                </div>
            ),
            valid: !!answers.caste,
        },
        {
            num: 4, label: t('eligibility.step4.label'),
            content: (
                <select value={answers.state} onChange={e => update('state', e.target.value)} style={inputStyle} id="elig-state">
                    {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
            ),
            valid: !!answers.state,
        },
    ];

    const current = steps[step - 1];

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }} onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={{
                background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
                padding: '2rem', width: '100%', maxWidth: '480px',
                boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
                animation: 'fadeInUp 0.35s ease',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Target size={20} color="#fff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>{t('eligibility.title')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('eligibility.subtitle')}</div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <X size={22} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '1.75rem' }}>
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} style={{
                            flex: 1, height: 4, borderRadius: 999,
                            background: n <= step ? 'var(--primary)' : 'var(--border)',
                            transition: 'background 0.3s',
                        }} />
                    ))}
                </div>

                {/* Step label */}
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    Step {step} of 4
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '1.25rem' }}>
                    {current.label}
                </div>

                {/* Content */}
                <div style={{ marginBottom: '1.75rem' }}>
                    {current.content}
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    {step > 1 && (
                        <button onClick={back} style={{
                            flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg)', border: '1.5px solid var(--border)',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', color: 'var(--text)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        }}>
                            <ChevronLeft size={16} /> {t('eligibility.back')}
                        </button>
                    )}
                    {step < 4 ? (
                        <button onClick={next} disabled={!current.valid} style={{
                            flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)',
                            background: current.valid ? 'var(--primary)' : 'var(--border)',
                            color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                            cursor: current.valid ? 'pointer' : 'not-allowed', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            transition: 'opacity 0.2s',
                        }}>
                            {t('eligibility.next')} <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button onClick={submit} style={{
                            flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        }}>
                            <CheckCircle size={16} /> {t('eligibility.find')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: '1rem', fontFamily: 'var(--font)',
    outline: 'none', transition: 'border-color 0.2s',
    onFocus: undefined,
};

function optBtn(active) {
    return {
        padding: '10px 22px', borderRadius: 999, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
        background: active ? 'var(--primary)' : 'var(--bg)',
        color: active ? '#fff' : 'var(--text)',
        border: `2px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
        transition: 'all 0.2s',
    };
}
