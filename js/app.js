/**
 * js/app.js
 */
(function () {
    'use strict';

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

        // Кнопки "Вперед"
        document.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', () => {
                const nextTabId = btn.dataset.next;
                const nextTabBtn = document.querySelector(`.tab[data-tab="${nextTabId}"]`);
                if (nextTabBtn) {
                    nextTabBtn.click();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
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
                <tr><td>Производительность одного насоса</td><td>${v.q_pump}</td><td>л/с</td></tr>
                <tr><td>Требуемый напор одного насоса</td><td>${v.h_pump}</td><td>м.в.ст.</td></tr>
                <tr><td>Диаметр по параллельной установке</td><td>${v.d_parallel}</td><td>мм</td></tr>
                <tr><td>Диаметр по длине насоса</td><td>${v.d_length}</td><td>мм</td></tr>
                <tr><td>Высота корпуса расчётная</td><td>${v.h_body}</td><td>мм</td></tr>
                <tr><td>Рабочий объём</td><td>${v.v_working_m3}</td><td>м³</td></tr>
                <tr><td>Мин. высота рабочего объёма</td><td>${v.h_working_min}</td><td>мм</td></tr>
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

    function onExport() {
        const data = { kns: readInput(), economics: window.Economics.exportData() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `КНС_Данные_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function onImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                const data = JSON.parse(evt.target.result);

                if (data.kns) {
                    Object.keys(data.kns).forEach(k => {
                        const el = document.getElementById(k);
                        if (el) el.value = data.kns[k];
                    });
                    onCalculate();
                }

                if (data.economics) {
                    window.Economics.importData(data.economics);
                }

                alert('Данные успешно загружены!');
            } catch (err) {
                console.error(err);
                alert('Ошибка при чтении файла. Убедитесь, что это правильный JSON.');
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    }

    function init() {
        initTabs();
        const btnCalc = document.getElementById('btn-calc');
        if (btnCalc) btnCalc.addEventListener('click', onCalculate);

        applyDefaults();
        onCalculate();

        if (typeof window.initEconomics === 'function') {
            window.initEconomics();
        }

        document.getElementById('btn-export').addEventListener('click', onExport);
        document.getElementById('btn-import').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        document.getElementById('import-file').addEventListener('change', onImport);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();