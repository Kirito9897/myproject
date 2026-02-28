import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, RotateCcw } from 'lucide-react';

const GENDERS = ['All', 'Male', 'Female'];
const CASTES = ['All', 'General', 'OBC', 'SC', 'ST'];

export default function FilterSidebar({ filters, setFilters, categories, states, totalResults }) {
    const { t } = useTranslation();

    const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
    const reset = () => setFilters({ age: '', gender: 'All', caste: 'All', state: 'All', category: 'All', query: '' });

    const SectionTitle = ({ label }) => (
        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            {label}
        </div>
    );

    const OptionBtn = ({ value, current, onSelect }) => (
        <button
            onClick={() => onSelect(value)}
            style={{
                padding: '6px 14px', borderRadius: 999, fontSize: '0.82rem', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
                background: current === value ? 'var(--primary)' : 'var(--surface)',
                color: current === value ? '#fff' : 'var(--text)',
                border: `1.5px solid ${current === value ? 'var(--primary)' : 'var(--border)'}`,
            }}
        >
            {value}
        </button>
    );

    return (
        <aside style={{
            background: 'var(--surface)', borderRadius: 'var(--radius)',
            padding: '1.5rem', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)', position: 'sticky', top: '90px',
            maxHeight: 'calc(100vh - 110px)', overflowY: 'auto',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
                    <Filter size={18} color="var(--primary)" />
                    {t('filter.title')}
                </div>
                <button
                    onClick={reset}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem',
                    }}
                >
                    <RotateCcw size={13} /> {t('filter.reset')}
                </button>
            </div>

            {/* Results Count */}
            <div style={{
                background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)',
                padding: '10px 14px', marginBottom: '1.5rem',
                color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center',
            }}>
                {totalResults} {t('filter.results')}
            </div>

            {/* Category */}
            <div style={{ marginBottom: '1.5rem' }}>
                <SectionTitle label={t('filter.category')} />
                <select
                    value={filters.category}
                    onChange={e => update('category', e.target.value)}
                    style={{
                        width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid var(--border)', background: 'var(--surface)',
                        color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'var(--font)', cursor: 'pointer',
                    }}
                    id="filter-category"
                >
                    {categories.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>

            {/* State */}
            <div style={{ marginBottom: '1.5rem' }}>
                <SectionTitle label={t('filter.state')} />
                <select
                    value={filters.state}
                    onChange={e => update('state', e.target.value)}
                    style={{
                        width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid var(--border)', background: 'var(--surface)',
                        color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'var(--font)', cursor: 'pointer',
                    }}
                    id="filter-state"
                >
                    {states.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

            {/* Gender */}
            <div style={{ marginBottom: '1.5rem' }}>
                <SectionTitle label={t('filter.gender')} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {GENDERS.map(g => <OptionBtn key={g} value={g} current={filters.gender} onSelect={v => update('gender', v)} />)}
                </div>
            </div>

            {/* Caste */}
            <div style={{ marginBottom: '1.5rem' }}>
                <SectionTitle label={t('filter.caste')} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {CASTES.map(c => <OptionBtn key={c} value={c} current={filters.caste} onSelect={v => update('caste', v)} />)}
                </div>
            </div>

            {/* Age */}
            <div>
                <SectionTitle label="Age" />
                <input
                    type="number"
                    value={filters.age}
                    onChange={e => update('age', e.target.value)}
                    placeholder="Enter your age"
                    min={0} max={120}
                    style={{
                        width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid var(--border)', background: 'var(--surface)',
                        color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'var(--font)', outline: 'none',
                    }}
                    id="filter-age"
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
            </div>
        </aside>
    );
}
