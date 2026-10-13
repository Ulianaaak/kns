/**
 * js/economics.js
 * Рендер и расчёт всех экономических вкладок.
 */
(function () {
    'use strict';

    const fmt = (n) => (Number(n) || 0).toLocaleString('ru-RU', { maximumFractionDigits: 2 });
    const num = (v) => {
        const n = Number(v);
        return isNaN(n) ? 0 : n;
    };

    // ============ 1. Параметры КНС ============
    function renderParams() {
        const tbody = document.getElementById('params-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.PARAMS_KNS.forEach(p => {
            const tr = document.createElement('tr');
            let input;
            if (p.type === 'select') {
                input = `<select data-key="${p.key}">${p.options.map(o =>
                    `<option${o === p.value ? ' selected' : ''}>${o}</option>`).join('')}</select>`;
            } else {
                input = `<input type="number" step="1" data-key="${p.key}" value="${p.value}">`;
            }
            tr.innerHTML = `<td>${p.label}</td><td>${input}</td><td>${p.required}</td>`;
            tbody.appendChild(tr);
        });
    }

    // ============ 2. ЖБИ ============
    function renderJbi(filter = 'Все') {
        const tbody = document.getElementById('jbi-body');
        const filterSel = document.getElementById('jbi-group-filter');
        if (!tbody) return;

        // Заполнить фильтр группами
        if (filterSel.options.length === 0) {
            const groups = ['Все', ...new Set(window.CATALOG_JBI.map(i => i.group))];
            filterSel.innerHTML = groups.map(g => `<option>${g}</option>`).join('');
            filterSel.addEventListener('change', () => renderJbi(filterSel.value));
        }

        tbody.innerHTML = '';
        const items = window.CATALOG_JBI.filter(i => filter === 'Все' || i.group === filter);

        items.forEach((item, idx) => {
            const globalIdx = window.CATALOG_JBI.indexOf(item);
            const tr = document.createElement('tr');
            tr.dataset.idx = globalIdx;
            tr.innerHTML = `
                <td><input type="checkbox" class="jbi-check"></td>
                <td>${item.type || ''}</td>
                <td>${item.name || ''}</td>
                <td>${item.mark || ''}</td>
                <td>${item.dIn ?? ''}</td>
                <td>${item.dOut ?? ''}</td>
                <td>${item.h ?? ''}</td>
                <td><input type="number" min="1" value="1" class="jbi-qty" style="width:60px"></td>
                <td>${item.unit}</td>
                <td><input type="number" step="0.01" class="jbi-price" style="width:100px"></td>
                <td class="jbi-sum">0</td>
                <td>${item.required}</td>
            `;
            tbody.appendChild(tr);
        });

        // Обработчики
        tbody.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('input', () => {
                const tr = inp.closest('tr');
                tr.classList.toggle('included', tr.querySelector('.jbi-check').checked);
                updateJbiRow(tr);
                updateJbiSubtotal();
            });
        });
        tbody.querySelectorAll('.jbi-check').forEach(cb => {
            cb.addEventListener('change', () => {
                const tr = cb.closest('tr');
                tr.classList.toggle('included', cb.checked);
                updateJbiRow(tr);
                updateJbiSubtotal();
            });
        });
    }

    function updateJbiRow(tr) {
        const cb = tr.querySelector('.jbi-check');
        const qty = num(tr.querySelector('.jbi-qty').value) || 1;
        const price = num(tr.querySelector('.jbi-price').value);
        const sum = cb.checked ? qty * price : 0;
        tr.querySelector('.jbi-sum').textContent = fmt(sum);
    }

    function updateJbiSubtotal() {
        let total = 0;
        document.querySelectorAll('#jbi-body tr').forEach(tr => {
            if (tr.querySelector('.jbi-check').checked) {
                const qty = num(tr.querySelector('.jbi-qty').value) || 1;
                const price = num(tr.querySelector('.jbi-price').value);
                total += qty * price;
            }
        });
        document.getElementById('jbi-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    // ============ 3. Металлоизделия ============
    function renderMetal() {
        const tbody = document.getElementById('metal-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.CATALOG_METAL.forEach((item, i) => addMetalRow(item, i));
    }

    function addMetalRow(item = {}, idx = null) {
        const tbody = document.getElementById('metal-body');
        const tr = document.createElement('tr');
        tr.dataset.idx = idx ?? 'new-' + Date.now();
        tr.innerHTML = `
            <td><input type="checkbox" class="metal-check"></td>
            <td><input type="text" class="metal-group" value="${item.group || ''}"></td>
            <td><input type="text" class="metal-name" value="${item.name || ''}"></td>
            <td><input type="text" class="metal-unit" value="${item.unit || ''}" style="width:60px"></td>
            <td><input type="text" class="metal-size" value="${item.size || ''}"></td>
            <td><input type="number" min="1" value="1" class="metal-qty" style="width:60px"></td>
            <td><input type="number" step="0.01" class="metal-price" style="width:100px"></td>
            <td class="metal-sum">0</td>
        `;
        tbody.appendChild(tr);

        tr.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('input', () => {
                tr.classList.toggle('included', tr.querySelector('.metal-check').checked);
                updateMetalRow(tr);
                updateMetalSubtotal();
            });
        });
        tr.querySelector('.metal-check').addEventListener('change', (e) => {
            tr.classList.toggle('included', e.target.checked);
            updateMetalRow(tr);
            updateMetalSubtotal();
        });
    }

    function updateMetalRow(tr) {
        const cb = tr.querySelector('.metal-check');
        const qty = num(tr.querySelector('.metal-qty').value) || 1;
        const price = num(tr.querySelector('.metal-price').value);
        tr.querySelector('.metal-sum').textContent = cb.checked ? fmt(qty * price) : '0';
    }

    function updateMetalSubtotal() {
        let total = 0;
        document.querySelectorAll('#metal-body tr').forEach(tr => {
            if (tr.querySelector('.metal-check').checked) {
                const qty = num(tr.querySelector('.metal-qty').value) || 1;
                const price = num(tr.querySelector('.metal-price').value);
                total += qty * price;
            }
        });
        document.getElementById('metal-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    // ============ 4. Комплектующие ============
    function renderParts() {
        const tbody = document.getElementById('parts-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.CATALOG_PARTS.forEach(item => addPartsRow(item));
    }

    function addPartsRow(item = {}) {
        const tbody = document.getElementById('parts-body');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="parts-check"></td>
            <td><input type="text" class="parts-name" value="${item.name || ''}"></td>
            <td><input type="text" class="parts-unit" value="${item.unit || ''}" style="width:60px"></td>
            <td><input type="number" min="1" value="1" class="parts-qty" style="width:60px"></td>
            <td><input type="number" step="0.01" class="parts-price" style="width:100px"></td>
            <td class="parts-sum">0</td>
        `;
        tbody.appendChild(tr);
        tr.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('input', () => {
                tr.classList.toggle('included', tr.querySelector('.parts-check').checked);
                updatePartsRow(tr);
                updatePartsSubtotal();
            });
        });
        tr.querySelector('.parts-check').addEventListener('change', (e) => {
            tr.classList.toggle('included', e.target.checked);
            updatePartsRow(tr);
            updatePartsSubtotal();
        });
    }

    function updatePartsRow(tr) {
        const cb = tr.querySelector('.parts-check');
        const qty = num(tr.querySelector('.parts-qty').value) || 1;
        const price = num(tr.querySelector('.parts-price').value);
        tr.querySelector('.parts-sum').textContent = cb.checked ? fmt(qty * price) : '0';
    }

    function updatePartsSubtotal() {
        let total = 0;
        document.querySelectorAll('#parts-body tr').forEach(tr => {
            if (tr.querySelector('.parts-check').checked) {
                const qty = num(tr.querySelector('.parts-qty').value) || 1;
                const price = num(tr.querySelector('.parts-price').value);
                total += qty * price;
            }
        });
        document.getElementById('parts-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    // ============ 5. Услуги ============
    function renderServices() {
        const tbody = document.getElementById('services-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.CATALOG_SERVICES.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox" class="serv-check"></td>
                <td><input type="text" class="serv-group" value="${item.group || ''}" style="min-width:180px"></td>
                <td><input type="text" class="serv-name" value="${item.name || ''}"></td>
                <td><input type="text" class="serv-size" value="${item.size || ''}" style="width:70px"></td>
                <td><input type="text" class="serv-unit" value="${item.unit || ''}" style="width:70px"></td>
                <td><input type="number" min="1" value="1" class="serv-qty" style="width:60px"></td>
                <td><input type="number" step="0.01" class="serv-price" style="width:90px"></td>
                <td><input type="number" step="0.1" class="serv-norm" style="width:70px"></td>
                <td><input type="number" step="0.01" class="serv-fund" style="width:80px"></td>
                <td class="serv-sum">0</td>
            `;
            tbody.appendChild(tr);
        });
        tbody.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('input', () => {
                const tr = inp.closest('tr');
                tr.classList.toggle('included', tr.querySelector('.serv-check').checked);
                updateServiceRow(tr);
                updateServicesSubtotal();
            });
        });
        tbody.querySelectorAll('.serv-check').forEach(cb => {
            cb.addEventListener('change', () => {
                const tr = cb.closest('tr');
                tr.classList.toggle('included', cb.checked);
                updateServiceRow(tr);
                updateServicesSubtotal();
            });
        });
    }

    function updateServiceRow(tr) {
        const cb = tr.querySelector('.serv-check');
        const qty = num(tr.querySelector('.serv-qty').value) || 1;
        const price = num(tr.querySelector('.serv-price').value);
        const fund = num(tr.querySelector('.serv-fund').value);
        const sum = cb.checked ? qty * price * (fund || 1) : 0;
        tr.querySelector('.serv-sum').textContent = fmt(sum);
    }

    function updateServicesSubtotal() {
        let total = 0;
        document.querySelectorAll('#services-body tr').forEach(tr => {
            if (tr.querySelector('.serv-check').checked) {
                const qty = num(tr.querySelector('.serv-qty').value) || 1;
                const price = num(tr.querySelector('.serv-price').value);
                const fund = num(tr.querySelector('.serv-fund').value);
                total += qty * price * (fund || 1);
            }
        });
        document.getElementById('services-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    // ============ 6. Прочие услуги ============
    function renderOther() {
        const tbody = document.getElementById('other-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.CATALOG_OTHER.forEach(item => addOtherRow(item));
    }

    function addOtherRow(item = {}) {
        const tbody = document.getElementById('other-body');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="other-check"></td>
            <td><input type="text" class="other-name" value="${item.name || ''}"></td>
            <td><input type="text" class="other-unit" value="${item.unit || ''}" style="width:70px"></td>
            <td><input type="number" min="1" value="1" class="other-qty" style="width:70px"></td>
            <td><input type="number" step="0.01" class="other-price" style="width:110px"></td>
            <td class="other-sum">0</td>
        `;
        tbody.appendChild(tr);
        tr.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('input', () => {
                tr.classList.toggle('included', tr.querySelector('.other-check').checked);
                updateOtherRow(tr);
                updateOtherSubtotal();
            });
        });
        tr.querySelector('.other-check').addEventListener('change', (e) => {
            tr.classList.toggle('included', e.target.checked);
            updateOtherRow(tr);
            updateOtherSubtotal();
        });
    }

    function updateOtherRow(tr) {
        const cb = tr.querySelector('.other-check');
        const qty = num(tr.querySelector('.other-qty').value) || 1;
        const price = num(tr.querySelector('.other-price').value);
        tr.querySelector('.other-sum').textContent = cb.checked ? fmt(qty * price) : '0';
    }

    function updateOtherSubtotal() {
        let total = 0;
        document.querySelectorAll('#other-body tr').forEach(tr => {
            if (tr.querySelector('.other-check').checked) {
                const qty = num(tr.querySelector('.other-qty').value) || 1;
                const price = num(tr.querySelector('.other-price').value);
                total += qty * price;
            }
        });
        document.getElementById('other-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    // ============ 7. Логистика ============
    function renderLogistics() {
        const tbody = document.getElementById('logistics-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.CATALOG_LOGISTICS.forEach(item => addLogisticsRow(item));
    }

    function addLogisticsRow(item = {}) {
        const tbody = document.getElementById('logistics-body');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="log-check"></td>
            <td><input type="text" class="log-name" value="${item.name || ''}"></td>
            <td><input type="text" class="log-unit" value="${item.unit || ''}" style="width:70px"></td>
            <td><input type="number" min="1" value="1" class="log-qty" style="width:70px"></td>
            <td><input type="number" step="0.01" class="log-price" style="width:110px"></td>
            <td class="log-sum">0</td>
        `;
        tbody.appendChild(tr);
        tr.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('input', () => {
                tr.classList.toggle('included', tr.querySelector('.log-check').checked);
                updateLogRow(tr);
                updateLogSubtotal();
            });
        });
        tr.querySelector('.log-check').addEventListener('change', (e) => {
            tr.classList.toggle('included', e.target.checked);
            updateLogRow(tr);
            updateLogSubtotal();
        });
    }

    function updateLogRow(tr) {
        const cb = tr.querySelector('.log-check');
        const qty = num(tr.querySelector('.log-qty').value) || 1;
        const price = num(tr.querySelector('.log-price').value);
        tr.querySelector('.log-sum').textContent = cb.checked ? fmt(qty * price) : '0';
    }

    function updateLogSubtotal() {
        let total = 0;
        document.querySelectorAll('#logistics-body tr').forEach(tr => {
            if (tr.querySelector('.log-check').checked) {
                const qty = num(tr.querySelector('.log-qty').value) || 1;
                const price = num(tr.querySelector('.log-price').value);
                total += qty * price;
            }
        });
        document.getElementById('logistics-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    // ============ Общий итог ============
    function updateGrandTotal() {
        const get = (id) => num(document.getElementById(id).textContent.replace(/\s/g, '').replace(',', '.'));
        const sum =
            get('jbi-subtotal') +
            get('metal-subtotal') +
            get('parts-subtotal') +
            get('services-subtotal') +
            get('other-subtotal') +
            get('logistics-subtotal');
        document.getElementById('grand-total').textContent = fmt(sum);
    }

    // ============ Инициализация ============
    window.initEconomics = function () {
        renderParams();
        renderJbi();
        renderMetal();
        renderParts();
        renderServices();
        renderOther();
        renderLogistics();

        document.getElementById('metal-add').addEventListener('click', () => addMetalRow());
        document.getElementById('parts-add').addEventListener('click', () => addPartsRow());
        document.getElementById('other-add').addEventListener('click', () => addOtherRow());
        document.getElementById('logistics-add').addEventListener('click', () => addLogisticsRow());
    };
})();