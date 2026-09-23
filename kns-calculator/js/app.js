/**
 * js/app.js
 * Обработка формы, загрузка Excel, вывод результатов.
 * Требует подключения: kns/index.js и xlsx.full.min.js (SheetJS).
 */
(function () {
    'use strict';

    // Считывание всех полей формы
    function readInput() {
        return {
            q_m3h:       parseFloat(document.getElementById('q_m3h').value),
            h_req:       parseFloat(document.getElementById('h_req').value),
            h_in_depth:  parseFloat(document.getElementById('h_in_depth').value),
            h_out_depth: parseFloat(document.getElementById('h_out_depth').value),
            n_work:      parseInt(document.getElementById('n_work').value),
            n_res:       parseInt(document.getElementById('n_res').value),
            n_stock:     parseInt(document.getElementById('n_stock').value),
            k_reduction: parseFloat(document.getElementById('k_reduction').value),
            h_friction:  parseFloat(document.getElementById('h_friction').value),
            h_local:     parseFloat(document.getElementById('h_local').value),
            d_pump:      parseFloat(document.getElementById('d_pump').value),
            l_pump:      parseFloat(document.getElementById('l_pump').value),
            h_min_water: parseFloat(document.getElementById('h_min_water').value),
            dn_coupling: parseFloat(document.getElementById('dn_coupling').value),
            d_inner:     parseFloat(document.getElementById('d_inner').value),
            t_min:       parseFloat(document.getElementById('t_min').value)
        };
    }

    // Заполнение формы данными из Excel
    function fillForm(data) {
        const mapping = {
            'q_m3h': 'q_m3h', 'h_req': 'h_req', 'h_in_depth': 'h_in_depth', 'h_out_depth': 'h_out_depth',
            'n_work': 'n_work', 'n_res': 'n_res', 'n_stock': 'n_stock', 'k_reduction': 'k_reduction',
            'h_friction': 'h_friction', 'h_local': 'h_local', 'd_pump': 'd_pump', 'l_pump': 'l_pump',
            'h_min_water': 'h_min_water', 'dn_coupling': 'dn_coupling', 'd_inner': 'd_inner', 't_min': 't_min'
        };
        for (const key in mapping) {
            if (data[key] !== undefined) {
                const el = document.getElementById(mapping[key]);
                if (el) el.value = data[key];
            }
        }
    }

    // Вывод результатов
    function renderResult(r) {
        const box = document.getElementById('result');
        box.style.display = 'block';

        if (!r.success) {
            box.innerHTML = `<p style="color:#c0392b;"><strong>Ошибка:</strong> ${r.errors.join('<br>')}</p>`;
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
                <tr><td>Диаметр по параллельной установке</td><td>${v.d_parallel}</td><td>мм</td></tr>
                <tr><td>Диаметр по длине насоса</td><td>${v.d_length}</td><td>мм</td></tr>
                <tr><td>Высота корпуса КНС</td><td>${v.h_body}</td><td>мм</td></tr>
                <tr><td>Рабочий объем</td><td>${v.v_working} л (${v.v_working_m3} м³)</td><td>л / м³</td></tr>
                <tr><td>Мин. высота рабочего объема</td><td>${v.h_working_min}</td><td>мм</td></tr>
            </table>
            <p style="font-size:14px;color:#7f8c8d;margin-top:10px;">${r.disclaimer}</p>
        `;
    }

    // Обработка кнопки "Рассчитать"
    function onCalculate() {
        const input = readInput();
        const result = window.KNS.calculateKNS(input);
        renderResult(result);
    }

    // Обработка загрузки Excel
    function onFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Предполагаем, что данные находятся во 2-й строке (индекс 1),
            // а заголовки — в 1-й строке (индекс 0).
            if (jsonData.length < 2) {
                alert('Файл пуст или имеет неверный формат.');
                return;
            }

            const headers = jsonData[0];
            const values = jsonData[1];
            const mappedData = {};

            headers.forEach((header, index) => {
                if (header && values[index] !== undefined) {
                    mappedData[header.toString().trim()] = values[index];
                }
            });

            fillForm(mappedData);
            onCalculate(); // Автоматический расчёт после загрузки
        };
        reader.readAsArrayBuffer(file);
    }

    // Скачивание шаблона Excel
    function downloadTemplate() {
        const headers = [
            'q_m3h', 'h_req', 'h_in_depth', 'h_out_depth',
            'n_work', 'n_res', 'n_stock', 'k_reduction',
            'h_friction', 'h_local', 'd_pump', 'l_pump',
            'h_min_water', 'dn_coupling', 'd_inner', 't_min'
        ];
        const values = [
            170.72, 14, 4.7, 2.8,
            1, 1, 1, 0.9,
            0.5, 0.2, 500, 1118,
            820, 150, 3200, 5
        ];
        const ws = XLSX.utils.aoa_to_sheet([headers, values]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Данные');
        XLSX.writeFile(wb, 'Шаблон_КНС.xlsx');
    }

    // Инициализация
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('btn-calc').addEventListener('click', onCalculate);
        document.getElementById('excelFile').addEventListener('change', onFileUpload);
        document.getElementById('btn-template').addEventListener('click', downloadTemplate);
    });
})();