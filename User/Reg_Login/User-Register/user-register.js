(async function () {
    const sel = document.getElementById('language-select');
    if (!sel) return;

    const saved = sessionStorage.getItem('selected_language') || 'English';

    try {
        const out = await (await fetch('/api/languages')).json();
        if (!out.success || !Array.isArray(out.data) || !out.data.length) {
            throw new Error('empty or unsuccessful payload');
        }

        sel.innerHTML = '';
        out.data.forEach((item) => {
            const opt = document.createElement('option');
            opt.value = item.name;                                 // same convention as login.js
            opt.textContent = `${item.native_name} (${item.name})`;
            if (item.name === saved) opt.selected = true;
            sel.appendChild(opt);
        });
    } catch (err) {
        console.error('Failed to load languages:', err);
        sel.innerHTML = '<option value="English" selected>English</option>';
    }

    sel.addEventListener('change', (e) => {
        sessionStorage.setItem('selected_language', e.target.value);
        localStorage.setItem('selected_language', e.target.value);
    });
})();