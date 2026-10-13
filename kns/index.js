(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.KNS = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    const DEFAULTS = {
        q_m3h:       170.72,
        h_req:       14,
        h_in_depth:  4.7,
        h_out_depth: 2.8,
        n_work:      1,
        n_res:       1,
        n_stock:     1,
        d_pump:      500,
        l_pump:      1118,
        h_min_water: 820,
        dn_coupling: 150,
        h_friction:  0.363,
        h_local:     2.25,
        d_inner:     3200,
        h_ram:       0,
        h_extra:     0,
        t_min:       5,
        h_konstr:    0
    };

    const PARALLEL_COEF = [
        { n: 1, k: 1.00 },
        { n: 2, k: 1.11 },
        { n: 3, k: 1.18 },
        { n: 4, k: 1.25 }
    ];

    const PIPE_TABLE = [
        { dn: 50,  dOut: 57,  wall: 3.0, dIn: 51,  weight: 3.98 },
        { dn: 65,  dOut: 76,  wall: 3.0, dIn: 70,  weight: 5.40 },
        { dn: 80,  dOut: 89,  wall: 3.5, dIn: 82,  weight: 7.38 },
        { dn: 100, dOut: 108, wall: 4.0, dIn: 100, weight: 10.26 },
        { dn: 125, dOut: 133, wall: 4.0, dIn: 125, weight: 12.73 },
        { dn: 150, dOut: 160, wall: 4.0, dIn: 152, weight: 15.39 },
        { dn: 200, dOut: 220, wall: 5.0, dIn: 210, weight: 26.53 },
        { dn: 250, dOut: 273, wall: 5.0, dIn: 263, weight: 33.04 }
    ];

    function ceilingMath(value, significance) {
        if (!significance) return 0;
        return Math.ceil(value / significance) * significance;
    }

    function round(value, digits) {
        const k = Math.pow(10, digits);
        return Math.round(value * k) / k;
    }

    function lookupParallelCoef(nWork) {
        const row = PARALLEL_COEF.find(r => r.n === nWork);
        return row ? row.k : 1;
    }

    function lookupPipe(dn) {
        return PIPE_TABLE.find(r => r.dn === dn) || PIPE_TABLE[5];
    }

    function defaultLocalLosses() {
        return {
            вход: 0.5, плавныйВход: 0, приемнаяСетка: 0, приемныйКлапан: 0,
            магистраль: 0, ответвление: 0, тройник: 1.5, косойТройник: 0,
            ответвлениеВход: 0, колено90: 2.2, коленоАльфа: 0,
            переходСужающ: 0, переходРасшир: 0, выходИзТрубы: 0,
            обратныйКлапан: 1.7, задвижка: 1.05
        };
    }

    function sumZeta(losses) {
        return Object.values(losses).reduce((a, b) => a + b, 0);
    }

    function pick(input, key) {
        const v = input ? input[key] : undefined;
        if (v === '' || v == null || isNaN(Number(v))) {
            return DEFAULTS[key];
        }
        return Number(v);
    }

    function calculateKNS(input) {
        const Q_m3h       = pick(input, 'q_m3h');
        const H_req       = pick(input, 'h_req');
        const H_in_depth  = pick(input, 'h_in_depth');
        const H_out_depth = pick(input, 'h_out_depth');

        const N_work      = pick(input, 'n_work');
        const N_res       = pick(input, 'n_res');
        const K_reduction = lookupParallelCoef(N_work);

        const Q_ls   = Q_m3h / 3.6;
        const Q_pump = (Q_ls / N_work) * K_reduction;

        const D_pump      = pick(input, 'd_pump');
        const L_0_8D      = 0.8 * D_pump;
        const L_pump      = pick(input, 'l_pump');
        const H_min_water = pick(input, 'h_min_water');
        const DN_coupling = pick(input, 'dn_coupling');

        const pipe = lookupPipe(DN_coupling);

        const D_inner = pick(input, 'd_inner');

        const D_parallel_raw = 0.8 * 2 * D_pump + 1.5 * (N_work + N_res - 1) * D_pump;
        const D_parallel = ceilingMath(D_parallel_raw, 100);
        const D_length   = L_pump + 2 * L_0_8D;

        const H_ram   = pick(input, 'h_ram');
        const H_extra = pick(input, 'h_extra');

        const T_min = pick(input, 't_min');
        const V_working_m3 = (Q_m3h * T_min) / 60;

        const H_working_min_raw =
            (V_working_m3 / ((Math.PI * Math.pow(D_inner / 1000, 2)) / 4)) * 1000;
        const H_working_min = ceilingMath(H_working_min_raw, 10);

        const H_konstr = pick(input, 'h_konstr');
        const H_prim_rab_vys = H_working_min + H_konstr;

        const H_body = H_in_depth * 1000 + H_prim_rab_vys + H_min_water + H_ram + H_extra;

        const v = (4 * 1000 * Q_pump) / (Math.PI * Math.pow(pipe.dIn, 2));

        const H_friction = pick(input, 'h_friction');
        const H_local    = pick(input, 'h_local');

        const zetaSum = sumZeta(input && input.localLosses ? input.localLosses : defaultLocalLosses());
        const H_local_calc = zetaSum * v * v / (2 * 9.81);

        const H_pump =
            (H_in_depth + H_prim_rab_vys / 1000 - H_out_depth) +
            H_req + H_friction + H_local;

        return {
            success: true,
            results: {
                q_ls:           round(Q_ls, 2),
                q_pump:         round(Q_pump, 2),
                h_pump:         round(H_pump, 2),
                k_reduction:    round(K_reduction, 2),
                v_speed:        round(v, 2),
                h_friction:     round(H_friction, 3),
                h_local:        round(H_local, 3),
                h_local_calc:   round(H_local_calc, 3),
                zeta_sum:       round(zetaSum, 2),
                d_parallel:     round(D_parallel, 0),
                d_length:       round(D_length, 0),
                h_body:         round(H_body, 0),
                v_working:      round(V_working_m3 * 1000, 0),
                v_working_m3:   round(V_working_m3, 2),
                h_working_min:  round(H_working_min, 0),
                h_prim_rab_vys: round(H_prim_rab_vys, 0),
                pipe_dn:        pipe.dn,
                pipe_dOut:      pipe.dOut,
                pipe_dIn:       pipe.dIn,
                pipe_weight:    pipe.weight
            },
            disclaimer:
                ''
        };
    }

    return {
        calculateKNS,
        ceilingMath,
        lookupParallelCoef,
        lookupPipe,
        defaultLocalLosses,
        sumZeta,
        PIPE_TABLE,
        PARALLEL_COEF,
        DEFAULTS,
        VERSION: '4.2.0'
    };
});