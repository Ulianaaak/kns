/**
 * kns/index.js
 * Расчёт КНС по формулам из предоставленного Excel-файла.
 * UMD-модуль: работает в браузере (window.KNS) и в Node.js.
 */

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.KNS = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    function round(value, digits) {
        const k = Math.pow(10, digits);
        return Math.round(value * k) / k;
    }

    /**
     * Основная функция расчёта.
     * Все входные данные соответствуют полям Excel-таблицы.
     */
    function calculateKNS(input) {
        // --- Секция 1: Исходные данные ---
        const Q_m3h       = Number(input.q_m3h) || 0;         // Производительность, м³/ч
        const H_req       = Number(input.h_req) || 0;         // Напор на выходе, м.в.ст.
        const H_in_depth  = Number(input.h_in_depth) || 0;    // Глубина подводящего трубопровода, м
        const H_out_depth = Number(input.h_out_depth) || 0;   // Глубина отводящего трубопровода, м

        // --- Секция 2: Схема работы насосных агрегатов ---
        const N_work      = Number(input.n_work) || 1;        // Рабочих агрегатов
        const N_res       = Number(input.n_res) || 1;         // Резервных агрегатов
        const N_stock     = Number(input.n_stock) || 1;       // На склад (сухой запас)
        const K_reduction = Number(input.k_reduction) || 1;   // Коэф. снижения подачи

        // --- Секция 3: Расчётные характеристики насосных агрегатов ---
        const Q_ls        = Q_m3h / 3.6;                      // Производительность, л/с
        const Q_pump      = (Q_ls / N_work) * K_reduction;    // Производительность одного насоса, л/с
        const H_pump      = H_req + (H_in_depth - H_out_depth) + (Number(input.h_friction) || 0) + (Number(input.h_local) || 0);
                                                              // Требуемый напор одного насоса, м.в.ст.
        const D_pump      = Number(input.d_pump) || 500;      // Габаритный размер улитки, мм
        const L_pump      = Number(input.l_pump) || 1118;     // Длина насоса с муфтой, мм
        const H_min_water = Number(input.h_min_water) || 820; // Мин. уровень воды, мм
        const DN_coupling = Number(input.dn_coupling) || 150; // DN муфты, мм

        // --- Секция 4: Геометрические параметры корпуса КНС ---
        const D_inner     = Number(input.d_inner) || 3200;    // Диаметр корпуса внутренний, мм
        const D_parallel  = 2 * D_pump;                       // Диаметр по параллельной установке, мм
        const D_length    = L_pump + 2 * (0.8 * D_pump);      // Диаметр по длине насоса, мм
        const H_body      = (H_req * 1000) + L_pump + H_min_water + 200; // Высота корпуса, мм

        // --- Секция 5: Расчёт полезного объема КНС ---
        const T_min       = Number(input.t_min) || 5;         // Время цикла, мин
        const V_working   = (T_min * 60 * Q_pump) / 4;        // Рабочий объем, л
        const V_working_m3 = V_working / 1000;                // Рабочий объем, м³
        const H_working_min = (V_working_m3 / (Math.PI * Math.pow(D_inner / 1000, 2) / 4)) * 1000; // Мин. высота рабочего объема, мм

        return {
            success: true,
            results: {
                // Секция 3
                q_ls:           round(Q_ls, 2),
                q_pump:         round(Q_pump, 2),
                h_pump:         round(H_pump, 2),
                d_parallel:     round(D_parallel, 0),
                d_length:       round(D_length, 0),
                h_body:         round(H_body, 0),
                // Секция 5
                v_working:      round(V_working, 0),
                v_working_m3:   round(V_working_m3, 2),
                h_working_min:  round(H_working_min, 0)
            },
            disclaimer: ''
        };
    }

    return { calculateKNS, round, VERSION: '2.0.0' };
});