/**
 * js/app.js
 * Переключение вкладок + расчёт КНС.
 */
(function () {
    'use strict';

    // ---------- Переключение вкладок ----------
    function initTabs() {
        const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const id = 'tab-' + tab.dataset.tab;
                document.getElementById(id).classList.add('active');
            });
        });
    }

    // ---------- Расчёт КНС ----------
    if (typeof window.KNS === 'undefined') {
        console.error('[app.js] Модуль KNS не загружен.');
    }

    function readInput() {
        const val = (id) => {
            const el = document.getElementById(id);
            if (!el) return '';
            const v = el.value.trim();
            return v === '' ? '' : parseFloat(v);
        };
        return {
            q_m3h: val('q_m3h'), h_req: val('h_req'),
            h_in_depth: val('h_in_depth'), h_out_depth: val('h_out_depth'),
            n_work: val('n_work'), n_res: val('n_res'), n_stock: val('n_stock'),
            d_pump: val('d_pump'), l_pump: val('l_pump'),
            h_min_water: val('h_min_water'), dn_coupling: val('dn_coupling'),
            h_friction: val('h_friction'), h_local: val('h_local'),
            d_inner: val('d_inner'), h_ram: val('h_ram'), h_extra: val('h_extra'),
            t_min: val('t_min'), h_konstr: val('h_konstr')
        };
    }

    function applyDefaults() {
        Object.keys(window.KNS.DEFAULTS).forEach(k => {
            const el = document.getElementById(k);
            if (el) el.value = window.KNS.DEFAULTS[k];
        });
    }

    function renderResult(r) {
        const box = document.getElementById('result');
        box.style.display = 'block';
        if (!r.success) { box.innerHTML = '<p><strong>Ошибка</strong></p>'; return; }
        const v = r.results;
        box.innerHTML = `
            <h3>Результаты расчёта</h3>
            <table class="result-table">
                <tr><th>Параметр</th><th>Значение</th><th>Ед. изм.</th></tr>
                <tr><td>Производительность одного насосного агрегата</td><td>${v.q_pump}</td><td>л/с</td></tr>
                <tr><td>Требуемый напор одного насосного агрегата</td><td>${v.h_pump}</td><td>м.в.ст.</td></tr>
                <tr><td>Диаметр расчётный по параллельной установке</td><td>${v.d_parallel}</td><td>мм</td></tr>
                <tr><td>Диаметр расчётный по длине насосного агрегата</td><td>${v.d_length}</td><td>мм</td></tr>
                <tr><td>Высота корпуса расчётная</td><td>${v.h_body}</td><td>мм</td></tr>
                <tr><td>Рабочий объём</td><td>${v.v_working_m3}</td><td>м³</td></tr>
                <tr><td>Минимальная высота рабочего объёма</td><td>${v.h_working_min}</td><td>мм</td></tr>
                <tr><td>Принимаемая рабочая высота</td><td>${v.h_prim_rab_vys}</td><td>мм</td></tr>
            </table>
            <p style="font-size:14px;color:#7f8c8d;margin-top:10px;">${r.disclaimer}</p>
        `;
    }

    function onCalculate() {
        try {
            const result = window.KNS.calculateKNS(readInput());
            renderResult(result);
        } catch (err) {
            console.error(err);
        }
    }

    function init() {
        initTabs();

        const btn = document.getElementById('btn-calc');
        if (btn) btn.addEventListener('click', onCalculate);

        applyDefaults();
        onCalculate();

        if (typeof window.initEconomics === 'function') {
            window.initEconomics();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();