/**
 * EligibilityEngine.js
 * The "brain" that filters schemes based on user input.
 * All filtering logic lives here — no UI code.
 */

/**
 * Filter schemes based on eligibility criteria
 * @param {Array} schemes - Full schemes array from schemes.json
 * @param {Object} filters - { age, gender, caste, state, category, query }
 * @returns {Array} matching schemes
 */
export function filterSchemes(schemes, filters = {}) {
    const { age, gender, caste, state, category, query } = filters;

    return schemes.filter((scheme) => {
        // Age filter
        if (age !== undefined && age !== '' && age !== null) {
            const userAge = parseInt(age, 10);
            if (!isNaN(userAge)) {
                if (userAge < scheme.minAge || userAge > scheme.maxAge) return false;
            }
        }

        // Gender filter
        if (gender && gender !== 'All') {
            if (scheme.gender !== 'All' && scheme.gender !== gender) return false;
        }

        // Caste filter
        if (caste && caste !== 'All') {
            if (scheme.caste !== 'All' && scheme.caste !== caste) return false;
        }

        // State filter
        if (state && state !== 'All') {
            if (scheme.state !== 'All India' && scheme.state !== state) return false;
        }

        // Category filter
        if (category && category !== 'All') {
            if (scheme.category !== category) return false;
        }

        // Text search filter
        if (query && query.trim() !== '') {
            const q = query.toLowerCase().trim();
            const searchText = [
                scheme.name,
                scheme.description,
                scheme.benefits,
                scheme.category,
                ...(scheme.tags || []),
            ]
                .join(' ')
                .toLowerCase();
            if (!searchText.includes(q)) return false;
        }

        return true;
    });
}

/**
 * Search schemes with a text query (for live suggestions)
 * Returns top 5 matches
 * @param {Array} schemes
 * @param {string} query
 * @returns {Array}
 */
export function searchSchemes(schemes, query) {
    if (!query || query.trim() === '') return [];

    const q = query.toLowerCase().trim();
    return schemes
        .filter((scheme) => {
            const searchText = [scheme.name, scheme.category, ...(scheme.tags || [])]
                .join(' ')
                .toLowerCase();
            return searchText.includes(q);
        })
        .slice(0, 5);
}

/**
 * Compare two schemes side by side
 * Returns a structured comparison object
 * @param {Object} schemeA
 * @param {Object} schemeB
 * @returns {Object}
 */
export function compareSchemes(schemeA, schemeB) {
    const fields = [
        { key: 'category', label: 'Category' },
        { key: 'benefits', label: 'Benefits' },
        { key: 'state', label: 'Coverage' },
        { key: 'minAge', label: 'Min Age' },
        { key: 'maxAge', label: 'Max Age' },
        { key: 'gender', label: 'For Gender' },
        { key: 'caste', label: 'Eligible Caste' },
        { key: 'ministry', label: 'Ministry' },
    ];

    return fields.map((field) => ({
        label: field.label,
        a: schemeA?.[field.key] ?? '—',
        b: schemeB?.[field.key] ?? '—',
    }));
}

/**
 * Get all unique categories from schemes
 */
export function getCategories(schemes) {
    const cats = [...new Set(schemes.map((s) => s.category))];
    return ['All', ...cats.sort()];
}

/**
 * Get all unique states from schemes
 */
export function getStates(schemes) {
    const states = [...new Set(schemes.map((s) => s.state))];
    return ['All', ...states.sort()];
}
