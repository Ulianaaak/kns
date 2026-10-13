/**
 * js/economics.js
 * Рендер и расчёт всех экономических вкладок + сводка.
 */
(function () {
    'use strict';

    const fmt = (n) => (Number(n) || 0).toLocaleString('ru-RU', { maximumFractionDigits: 2 });
    const num = (v) => { const n = Number(v); return isNaN(n) ? 0 : n; };

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

    // Собирает параметры КНС в объект
    function getParamsKns() {
        const result = {};
        document.querySelectorAll('#params-body [data-key]').forEach(el => {
            result[el.dataset.key] = el.value;
        });
        return result;
    }

    // ============ 2. ЖБИ ============
    function renderJbi(filter = 'Все') {
        const tbody = document.getElementById('jbi-body');
        const filterSel = document.getElementById('jbi-group-filter');
        if (!tbody) return;

        if (filterSel.options.length === 0) {
            const groups = ['Все', ...new Set(window.CATALOG_JBI.map(i => i.group))];
            filterSel.innerHTML = groups.map(g => `<option>${g}</option>`).join('');
            filterSel.addEventListener('change', () => renderJbi(filterSel.value));
        }

        tbody.innerHTML = '';
        const items = window.CATALOG_JBI.filter(i => filter === 'Все' || i.group === filter);

        items.forEach(item => {
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
        tr.querySelector('.jbi-sum').textContent = cb.checked ? fmt(qty * price) : '0';
    }

    function updateJbiSubtotal() {
        const total = calcJbiItems().reduce((s, i) => s + i.sum, 0);
        document.getElementById('jbi-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    function calcJbiItems() {
        const items = [];
        document.querySelectorAll('#jbi-body tr').forEach(tr => {
            const cb = tr.querySelector('.jbi-check');
            if (!cb.checked) return;
            const idx = tr.dataset.idx;
            const src = window.CATALOG_JBI[idx];
            const qty = num(tr.querySelector('.jbi-qty').value) || 1;
            const price = num(tr.querySelector('.jbi-price').value);
            items.push({
                group: src.group,
                name: src.name,
                mark: src.mark,
                dIn: src.dIn,
                dOut: src.dOut,
                h: src.h,
                unit: src.unit,
                qty, price,
                sum: qty * price
            });
        });
        return items;
    }

    // ============ 3. Металлоизделия ============
    function renderMetal() {
        const tbody = document.getElementById('metal-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        window.CATALOG_METAL.forEach(item => addMetalRow(item));
    }

    function addMetalRow(item = {}) {
        const tbody = document.getElementById('metal-body');
        const tr = document.createElement('tr');
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
        const total = calcMetalItems().reduce((s, i) => s + i.sum, 0);
        document.getElementById('metal-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    function calcMetalItems() {
        const items = [];
        document.querySelectorAll('#metal-body tr').forEach(tr => {
            const cb = tr.querySelector('.metal-check');
            if (!cb.checked) return;
            const qty = num(tr.querySelector('.metal-qty').value) || 1;
            const price = num(tr.querySelector('.metal-price').value);
            items.push({
                group: tr.querySelector('.metal-group').value,
                name:  tr.querySelector('.metal-name').value,
                unit:  tr.querySelector('.metal-unit').value,
                size:  tr.querySelector('.metal-size').value,
                qty, price,
                sum: qty * price
            });
        });
        return items;
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
        const total = calcPartsItems().reduce((s, i) => s + i.sum, 0);
        document.getElementById('parts-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    function calcPartsItems() {
        const items = [];
        document.querySelectorAll('#parts-body tr').forEach(tr => {
            const cb = tr.querySelector('.parts-check');
            if (!cb.checked) return;
            const qty = num(tr.querySelector('.parts-qty').value) || 1;
            const price = num(tr.querySelector('.parts-price').value);
            items.push({
                name: tr.querySelector('.parts-name').value,
                unit: tr.querySelector('.parts-unit').value,
                qty, price,
                sum: qty * price
            });
        });
        return items;
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
        tr.querySelector('.serv-sum').textContent = cb.checked ? fmt(qty * price * (fund || 1)) : '0';
    }

    function updateServicesSubtotal() {
        const total = calcServicesItems().reduce((s, i) => s + i.sum, 0);
        document.getElementById('services-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    function calcServicesItems() {
        const items = [];
        document.querySelectorAll('#services-body tr').forEach(tr => {
            const cb = tr.querySelector('.serv-check');
            if (!cb.checked) return;
            const qty = num(tr.querySelector('.serv-qty').value) || 1;
            const price = num(tr.querySelector('.serv-price').value);
            const norm = num(tr.querySelector('.serv-norm').value);
            const fund = num(tr.querySelector('.serv-fund').value);
            items.push({
                group: tr.querySelector('.serv-group').value,
                name:  tr.querySelector('.serv-name').value,
                size:  tr.querySelector('.serv-size').value,
                unit:  tr.querySelector('.serv-unit').value,
                qty, price, norm, fund,
                sum: qty * price * (fund || 1)
            });
        });
        return items;
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
        const total = calcOtherItems().reduce((s, i) => s + i.sum, 0);
        document.getElementById('other-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    function calcOtherItems() {
        const items = [];
        document.querySelectorAll('#other-body tr').forEach(tr => {
            const cb = tr.querySelector('.other-check');
            if (!cb.checked) return;
            const qty = num(tr.querySelector('.other-qty').value) || 1;
            const price = num(tr.querySelector('.other-price').value);
            items.push({
                name: tr.querySelector('.other-name').value,
                unit: tr.querySelector('.other-unit').value,
                qty, price,
                sum: qty * price
            });
        });
        return items;
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
        const total = calcLogisticsItems().reduce((s, i) => s + i.sum, 0);
        document.getElementById('logistics-subtotal').textContent = fmt(total);
        updateGrandTotal();
    }

    function calcLogisticsItems() {
        const items = [];
        document.querySelectorAll('#logistics-body tr').forEach(tr => {
            const cb = tr.querySelector('.log-check');
            if (!cb.checked) return;
            const qty = num(tr.querySelector('.log-qty').value) || 1;
            const price = num(tr.querySelector('.log-price').value);
            items.push({
                name: tr.querySelector('.log-name').value,
                unit: tr.querySelector('.log-unit').value,
                qty, price,
                sum: qty * price
            });
        });
        return items;
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

    // ============ Сводка по всем вкладкам ============
    function buildSummary() {
        const params = getParamsKns();
        const jbi = calcJbiItems();
        const metal = calcMetalItems();
        const parts = calcPartsItems();
        const services = calcServicesItems();
        const other = calcOtherItems();
        const logistics = calcLogisticsItems();

        const sections = [
            buildParamsSection(params),
            buildItemsSection('ЖБИ', jbi, [
                { key: 'name', label: 'Наименование' },
                { key: 'mark', label: 'Марка' },
                { key: 'unit', label: 'Ед' }
            ]),
            buildItemsSection('Металлические изделия', metal, [
                { key: 'group', label: 'Группа' },
                { key: 'name', label: 'Номенклатура' },
                { key: 'size', label: 'Размеры' },
                { key: 'unit', label: 'Ед' }
            ]),
            buildItemsSection('Комплектующие', parts, [
                { key: 'name', label: 'Номенклатура' },
                { key: 'unit', label: 'Ед' }
            ]),
            buildItemsSection('Услуги', services, [
                { key: 'group', label: 'Группа' },
                { key: 'name', label: 'Номенклатура' },
                { key: 'unit', label: 'Ед' }
            ]),
            buildItemsSection('Прочие услуги', other, [
                { key: 'name', label: 'Наименование' },
                { key: 'unit', label: 'Ед' }
            ]),
            buildItemsSection('Логистика', logistics, [
                { key: 'name', label: 'Наименование' },
                { key: 'unit', label: 'Ед' }
            ])
        ];

        const totals = [
            { label: 'ЖБИ', value: jbi.reduce((s, i) => s + i.sum, 0) },
            { label: 'Металлоизделия', value: metal.reduce((s, i) => s + i.sum, 0) },
            { label: 'Комплектующие', value: parts.reduce((s, i) => s + i.sum, 0) },
            { label: 'Услуги', value: services.reduce((s, i) => s + i.sum, 0) },
            { label: 'Прочие услуги', value: other.reduce((s, i) => s + i.sum, 0) },
            { label: 'Логистика', value: logistics.reduce((s, i) => s + i.sum, 0) }
        ];
        const grand = totals.reduce((s, t) => s + t.value, 0);

        return { sections, totals, grand };
    }

    function buildParamsSection(params) {
        const rows = window.PARAMS_KNS.map(p => `
            <tr>
                <td>${p.label}</td>
                <td>${params[p.key] ?? ''}</td>
                <td>${p.required}</td>
            </tr>
        `).join('');
        return `
            <div class="summary-section">
                <h3>1. Параметры КНС</h3>
                <table class="summary-table">
                    <thead><tr><th>Параметр</th><th>Значение</th><th>Обязательность</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    function buildItemsSection(title, items, cols) {
        if (!items.length) {
            return `
                <div class="summary-section">
                    <h3>${title}</h3>
                    <p style="color:#7f8c8d;font-size:13px;margin:0;">Нет выбранных позиций</p>
                </div>
            `;
        }
        const head = cols.map(c => `<th>${c.label}</th>`).join('') +
            '<th>Кол-во</th><th>Цена, руб</th><th>Сумма, руб</th>';
        const rows = items.map(it => {
            const cells = cols.map(c => `<td>${it[c.key] ?? ''}</td>`).join('');
            return `<tr>${cells}
                <td class="num">${it.qty}</td>
                <td class="num">${fmt(it.price)}</td>
                <td class="num">${fmt(it.sum)}</td>
            </tr>`;
        }).join('');
        const subtotal = items.reduce((s, i) => s + i.sum, 0);
        return `
            <div class="summary-section">
                <h3>${title}</h3>
                <table class="summary-table">
                    <thead><tr>${head}</tr></thead>
                    <tbody>${rows}</tbody>
                    <tfoot><tr>
                        <td colspan="${cols.length + 1}">Итого по разделу:</td>
                        <td class="num" colspan="2">${fmt(subtotal)} руб</td>
                    </tr></tfoot>
                </table>
            </div>
        `;
    }

    function renderSummary() {
        const s = buildSummary();
        const body = document.getElementById('summary-body');

        const totalsHtml = `
            <div class="summary-section">
                <h3>Итоги по разделам</h3>
                <table class="summary-table">
                    <thead><tr><th>Раздел</th><th style="text-align:right">Сумма, руб</th></tr></thead>
                    <tbody>
                        ${s.totals.map(t =>
            `<tr><td>${t.label}</td><td class="num">${fmt(t.value)}</td></tr>`
        ).join('')}
                    </tbody>
                </table>
                <div class="summary-grand">ИТОГО по проекту: ${fmt(s.grand)} руб</div>
            </div>
        `;

        body.innerHTML = s.sections.join('') + totalsHtml;
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

        // --- Модальное окно сводки ---
        const modal = document.getElementById('summary-modal');
        const open = () => { renderSummary(); modal.style.display = 'flex'; };
        const close = () => { modal.style.display = 'none'; };

        document.getElementById('btn-summary').addEventListener('click', open);
        document.getElementById('summary-close').addEventListener('click', close);
        document.getElementById('summary-close-btn').addEventListener('click', close);
        document.getElementById('summary-print').addEventListener('click', () => window.print());
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') close();
        });
    };
})();