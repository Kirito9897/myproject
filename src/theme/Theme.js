/**
 * Theme.js — Digital India Inspired Color System
 * Change the look of the ENTIRE SITE by editing values here.
 */
export const Theme = {
    // ─── Digital India Brand Colors ────────────────────────────────
    primaryColor: '#002D62',   // Deep Navy — authority & trust
    primaryMid: '#1A56DB',   // Mid Blue — links, accents
    primaryLight: '#E8F0FE',   // Light Blue tint
    secondaryColor: '#B45309',   // Indian Government Orange
    accentOrange: '#F97316',   // Bright orange — CTAs
    accentSaffron: '#FF9933',   // Indian flag saffron
    accentGreen: '#138808',   // Indian flag green

    // ─── Background & Text ─────────────────────────────────────────
    bgColor: '#F8FAFD',
    surfaceColor: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    borderColor: '#E2E8F0',

    // ─── Dark Mode ─────────────────────────────────────────────────
    darkBg: '#0A1628',
    darkSurface: '#132042',
    darkText: '#E2E8F0',
    darkBorder: '#1E3A5F',

    // ─── Shape ─────────────────────────────────────────────────────
    borderRadius: '12px',
    borderRadiusSm: '8px',
    borderRadiusLg: '20px',

    // ─── Typography ────────────────────────────────────────────────
    fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
};

export function applyTheme(theme = Theme) {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primaryColor);
    root.style.setProperty('--primary-mid', theme.primaryMid);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--secondary', theme.secondaryColor);
    root.style.setProperty('--accent', theme.accentOrange);
    root.style.setProperty('--saffron', theme.accentSaffron);
    root.style.setProperty('--india-green', theme.accentGreen);
    root.style.setProperty('--bg', theme.bgColor);
    root.style.setProperty('--surface', theme.surfaceColor);
    root.style.setProperty('--text', theme.textPrimary);
    root.style.setProperty('--text-muted', theme.textSecondary);
    root.style.setProperty('--border', theme.borderColor);
    root.style.setProperty('--radius', theme.borderRadius);
    root.style.setProperty('--radius-sm', theme.borderRadiusSm);
    root.style.setProperty('--radius-lg', theme.borderRadiusLg);
    root.style.setProperty('--font', theme.fontFamily);
    root.style.setProperty('--shadow', '0 2px 16px rgba(0,45,98,0.08)');
    root.style.setProperty('--shadow-hover', '0 8px 32px rgba(0,45,98,0.16)');
    root.style.setProperty('--shadow-card', '0 1px 8px rgba(0,45,98,0.10)');
}
