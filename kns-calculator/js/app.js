(function () {
    'use strict';

    if (typeof window.KNS === 'undefined') {
        console.error('[app.js] Модуль KNS не загружен. Проверьте путь к kns/index.js');
        return;
    }

    function readInput() {
        const val = (id) => {
            const el = document.getElementById(id);
            if (!el) return '';
            const v = el.value.trim();
            return v === '' ? '' : parseFloat(v);
        };
        return {
            q_m3h:       val('q_m3h'),
            h_req:       val('h_req'),
            h_in_depth:  val('h_in_depth'),
            h_out_depth: val('h_out_depth'),
            n_work:      val('n_work'),
            n_res:       val('n_res'),
            n_stock:     val('n_stock'),
            d_pump:      val('d_pump'),
            l_pump:      val('l_pump'),
            h_min_water: val('h_min_water'),
            dn_coupling: val('dn_coupling'),
            h_friction:  val('h_friction'),
            h_local:     val('h_local'),
            d_inner:     val('d_inner'),
            h_ram:       val('h_ram'),
            h_extra:     val('h_extra'),
            t_min:       val('t_min'),
            h_konstr:    val('h_konstr')
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
        box.classList.toggle('error', !r.success);

        if (!r.success) {
            box.innerHTML =
                '<p><strong>Ошибки:</strong></p><ul>' +
                r.errors.map(e => `<li>${e}</li>`).join('') +
                '</ul>';
            return;
        }

        const v = r.results;
        box.innerHTML = `
            <h3>Результаты расчёта</h3>
            <table class="result-table">
                <tr><th>Параметр</th><th>Значение</th><th>Ед. изм.</th></tr>
                <tr><td>Производительность (общая)</td><td>${v.q_ls}</td><td>л/с</td></tr>
                <tr><td>Производительность одного насоса</td><td>${v.q_pump}</td><td>л/с</td></tr>
                <tr><td>Требуемый напор одного насоса</td><td>${v.h_pump}</td><td>м.в.ст.</td></tr>
                <tr><td>Коэф. параллельной работы</td><td>${v.k_reduction}</td><td>—</td></tr>
                <tr><td>Скорость в обвязке</td><td>${v.v_speed}</td><td>м/с</td></tr>
                <tr><td>Потери на трение</td><td>${v.h_friction}</td><td>м.в.ст.</td></tr>
                <tr><td>Потери на местные сопротивления</td><td>${v.h_local}</td><td>м.в.ст.</td></tr>
                <tr><td>Диаметр по параллельной установке</td><td>${v.d_parallel}</td><td>мм</td></tr>
                <tr><td>Диаметр по длине насоса</td><td>${v.d_length}</td><td>мм</td></tr>
                <tr><td>Высота корпуса КНС</td><td>${v.h_body}</td><td>мм</td></tr>
                <tr><td>Рабочий объем</td><td>${v.v_working} л (${v.v_working_m3} м³)</td><td>л / м³</td></tr>
                <tr><td>Мин. высота рабочего объема</td><td>${v.h_working_min}</td><td>мм</td></tr>
                <tr><td>Принимаемая рабочая высота</td><td>${v.h_prim_rab_vys}</td><td>мм</td></tr>
                <tr><td>Труба обвязки</td><td>DN${v.pipe_dn} (${v.pipe_dOut}×${v.pipe_dIn})</td><td>мм</td></tr>
            </table>
            <p style="font-size:14px;color:#7f8c8d;margin-top:10px;">${r.disclaimer}</p>
        `;
    }

    function onCalculate() {
        try {
            const input = readInput();
            const result = window.KNS.calculateKNS(input);
            renderResult(result);
        } catch (err) {
            console.error('[app.js] Ошибка расчёта:', err);
            const box = document.getElementById('result');
            box.style.display = 'block';
            box.classList.add('error');
            box.innerHTML = `<p><strong>Ошибка:</strong> ${err.message}</p>`;
        }
    }

    function init() {
        const btn = document.getElementById('btn-calc');
        if (!btn) {
            console.error('[app.js] Кнопка #btn-calc не найдена');
            return;
        }
        btn.addEventListener('click', onCalculate);

        applyDefaults();
        onCalculate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();