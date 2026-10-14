/**
 * js/catalogs.js
 * Все справочники для экономической части.
 * Структура ЖБИ приведена к единому виду.
 */

// ---------- Параметры КНС (форма) ----------
window.PARAMS_KNS = [
    { key: 'type_kns',         label: 'Тип КНС',                    type: 'select', options: ['ЖБ', 'Стеклопластик', 'Металл'], value: 'ЖБ', required: 'Обязательно' },
    { key: 'd_inner',          label: 'Внутренний диаметр, мм',     type: 'number', value: '',  required: 'Обязательно' },
    { key: 'h_total',          label: 'Общая высота, мм',           type: 'number', value: '',  required: 'Обязательно' },
    { key: 'bottom_plate',     label: 'Наличие нижней плиты',       type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Обязательно' },
    { key: 'cover',            label: 'Наличие покрытия',           type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Обязательно' },
    { key: 'support_ring',     label: 'Наличие опорного кольца',    type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Желательно' },
    { key: 'cone_ring',        label: 'Наличие конического кольца', type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Желательно' },
    { key: 'ladder',           label: 'Наличие лестницы',           type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Обязательно' },
    { key: 'pumps_total',      label: 'Количество насосов',         type: 'number', value: '',  required: 'Обязательно' },
    { key: 'pumps_work',       label: 'Количество рабочих насосов', type: 'number', value: '',  required: 'Желательно' },
    { key: 'pumps_res',        label: 'Количество резервных насосов', type: 'number', value: '', required: 'Желательно' },
    { key: 'basket',           label: 'Сороудерживающая корзина',   type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Желательно' },
    { key: 'platform',         label: 'Площадка обслуживания',      type: 'select', options: ['Да', 'Нет'], value: 'Нет', required: 'Не обязательно' },
    { key: 'piping',           label: 'Трубная обвязка',            type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Обязательно' },
    { key: 'control_panel',    label: 'Шкаф управления',            type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Обязательно' },
    { key: 'ventilation',      label: 'Вентиляция',                 type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Желательно' },
    { key: 'waterproofing',    label: 'Гидроизоляция',              type: 'select', options: ['Да', 'Нет'], value: 'Да', required: 'Желательно' }
];

// ---------- ЖБИ ----------
// Единая структура: group, name, ntd, vp, dOut, dIn, thickness, h, hPg, volume, unit, required, price
window.CATALOG_JBI = [
    // ===== Кольца стеновые (обобщённые) =====
    { group: 'Кольца стеновые', name: 'КС 7.3',   ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 700,  thickness: '', h: 290,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 7.9',   ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 700,  thickness: '', h: 890,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 10.3',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 1000, thickness: '', h: 290,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 10.6',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 1000, thickness: '', h: 590,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 10.9',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 1000, thickness: '', h: 890,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 13.9',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 1250, thickness: '', h: 890,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 15.6',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 1500, thickness: '', h: 590,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 15.9',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 1500, thickness: '', h: 890,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 20.6',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 2000, thickness: '', h: 590,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца стеновые', name: 'КС 20.9',  ntd: 'ГОСТ', vp: '—', dOut: '',   dIn: 2000, thickness: '', h: 890,  hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },

    // ===== Кольца опорные =====
    { group: 'Кольца опорные', name: 'КО',  ntd: 'ГОСТ', vp: '—', dOut: 840,  dIn: 700,  thickness: '', h: '40-150', hPg: '', volume: '', unit: 'шт', required: 'Желательно', price: '' },
    { group: 'Кольца опорные', name: 'КО',  ntd: 'ГОСТ', vp: '—', dOut: 1160, dIn: 1000, thickness: '', h: '40-150', hPg: '', volume: '', unit: 'шт', required: 'Желательно', price: '' },
    { group: 'Кольца опорные', name: 'КО',  ntd: 'ГОСТ', vp: '—', dOut: 1410, dIn: 1250, thickness: '', h: '40-150', hPg: '', volume: '', unit: 'шт', required: 'Желательно', price: '' },
    { group: 'Кольца опорные', name: 'КО',  ntd: 'ГОСТ', vp: '—', dOut: 1680, dIn: 1500, thickness: '', h: '40-150', hPg: '', volume: '', unit: 'шт', required: 'Желательно', price: '' },
    { group: 'Кольца опорные', name: 'КО',  ntd: 'ГОСТ', vp: '—', dOut: 2200, dIn: 2000, thickness: '', h: '40-150', hPg: '', volume: '', unit: 'шт', required: 'Желательно', price: '' },
    { group: 'Кольца опорные', name: 'КО',  ntd: 'ГОСТ', vp: '—', dOut: 2700, dIn: 2500, thickness: '', h: '40-150', hPg: '', volume: '', unit: 'шт', required: 'Желательно', price: '' },

    // ===== Плиты днища (обобщённые) =====
    { group: 'Плиты днища', name: 'ПН', ntd: 'ГОСТ', vp: '—', dOut: 1000, dIn: '', thickness: '', h: 100, hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища', name: 'ПН', ntd: 'ГОСТ', vp: '—', dOut: 1250, dIn: '', thickness: '', h: 100, hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища', name: 'ПН', ntd: 'ГОСТ', vp: '—', dOut: 1500, dIn: '', thickness: '', h: 100, hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища', name: 'ПН', ntd: 'ГОСТ', vp: '—', dOut: 2000, dIn: '', thickness: '', h: 100, hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },

    // ===== Плиты перекрытия (обобщённые) =====
    { group: 'Плиты перекрытия', name: 'ПП (смотровой/контрольный колодец)', ntd: 'ГОСТ', vp: '—', dOut: 1160, dIn: '700/1000', thickness: '', h: '150/160/180', hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия', name: 'ПП (смотровой/контрольный колодец)', ntd: 'ГОСТ', vp: '—', dOut: 1410, dIn: '700/1000', thickness: '', h: '150/160/180', hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия', name: 'ПП (смотровой/контрольный колодец)', ntd: 'ГОСТ', vp: '—', dOut: 1680, dIn: '700/1000', thickness: '', h: '150/160/180', hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия', name: 'ПП (смотровой/контрольный колодец)', ntd: 'ГОСТ', vp: '—', dOut: 2200, dIn: '700/1000', thickness: '', h: '150/160/180', hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия', name: 'ПП (смотровой/контрольный колодец)', ntd: 'ГОСТ', vp: '—', dOut: 2700, dIn: '700/1000', thickness: '', h: '150/160/180', hPg: '', volume: '', unit: 'шт', required: 'Обязательно', price: '' },

    // ===== ГОСТ, ЗЗБО КС2.0 =====
    { group: 'Кольца ГОСТ',    name: 'КС7.3 ПГ ФУТ',  ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 880,  dIn: 700,  thickness: 90,  h: 300, hPg: 20, volume: 0.07, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС7.6 ПГ ФУТ',  ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 880,  dIn: 700,  thickness: 90,  h: 600, hPg: 20, volume: 0.13, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС7.9 ПГ ФУТ',  ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 880,  dIn: 700,  thickness: 90,  h: 900, hPg: 20, volume: 0.20, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС10.3 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1200, dIn: 1000, thickness: 100, h: 300, hPg: 20, volume: 0.10, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС10.6 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1200, dIn: 1000, thickness: 100, h: 600, hPg: 20, volume: 0.21, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС10.9 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1200, dIn: 1000, thickness: 100, h: 900, hPg: 20, volume: 0.31, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС15.3 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1720, dIn: 1500, thickness: 110, h: 300, hPg: 30, volume: 0.17, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС15.6 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1720, dIn: 1500, thickness: 110, h: 600, hPg: 30, volume: 0.33, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС15.9 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1720, dIn: 1500, thickness: 110, h: 900, hPg: 30, volume: 0.50, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС20.3 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 2240, dIn: 2000, thickness: 120, h: 300, hPg: 30, volume: 0.24, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС20.6 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 2240, dIn: 2000, thickness: 120, h: 600, hPg: 30, volume: 0.48, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ГОСТ',    name: 'КС20.9 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 2240, dIn: 2000, thickness: 120, h: 900, hPg: 30, volume: 0.72, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ГОСТ', name: 'ПН7 ПГ ФУТ',  ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 880,  dIn: 700,  thickness: 90,  h: 100, hPg: 20, volume: 0.02, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ГОСТ', name: 'ПН10 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1200, dIn: 1000, thickness: 100, h: 100, hPg: 20, volume: 0.11, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ГОСТ', name: 'ПН15 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 1720, dIn: 1500, thickness: 110, h: 120, hPg: 30, volume: 0.28, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ГОСТ', name: 'ПН20 ФУТ',    ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0',     dOut: 2240, dIn: 2000, thickness: 120, h: 120, hPg: 30, volume: 0.47, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ГОСТ', name: 'ПП7 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0', dOut: 880,  dIn: 700,  thickness: 90,  h: 100, hPg: 20, volume: 0.06, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ГОСТ', name: 'ПП10-2 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0', dOut: 1200, dIn: 1000, thickness: 100, h: 150, hPg: 20, volume: 0.11, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ГОСТ', name: '1ПП15-2 ПГ ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0', dOut: 1720, dIn: 1500, thickness: 110, h: 150, hPg: 30, volume: 0.29, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ГОСТ', name: '1ПП20-2 ФУТ', ntd: 'ГОСТ', vp: 'ЗЗБО КС2.0', dOut: 2240, dIn: 2000, thickness: 120, h: 160, hPg: 30, volume: 0.57, unit: 'шт', required: 'Обязательно', price: '' },

    // ===== ТУ, Уралспец-74 =====
    { group: 'Кольца ТУ',      name: 'КС7-3 ФУТ',     ntd: 'ТУ', vp: 'Уралспец-74', dOut: 840,  dIn: 700,  thickness: 70,  h: 290, hPg: 'отс.', volume: 0.05, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС7-6 ФУТ',     ntd: 'ТУ', vp: 'Уралспец-74', dOut: 840,  dIn: 700,  thickness: 70,  h: 590, hPg: 'отс.', volume: 0.10, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС7-9 ФУТ',     ntd: 'ТУ', vp: 'Уралспец-74', dOut: 840,  dIn: 700,  thickness: 70,  h: 890, hPg: 'отс.', volume: 0.15, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС10-3 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1160, dIn: 1000, thickness: 80,  h: 290, hPg: 20, volume: 0.08, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС10-6 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1160, dIn: 1000, thickness: 80,  h: 590, hPg: 20, volume: 0.16, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС10-9 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1160, dIn: 1000, thickness: 80,  h: 890, hPg: 20, volume: 0.24, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС15-3 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1680, dIn: 1500, thickness: 90,  h: 290, hPg: 30, volume: 0.13, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС15-6 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1680, dIn: 1500, thickness: 90,  h: 590, hPg: 30, volume: 0.27, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС15-9 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1680, dIn: 1500, thickness: 90,  h: 890, hPg: 30, volume: 0.40, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС20-3 ФУТ',    ntd: 'ТУ', vp: 'Уралспец-74', dOut: 2200, dIn: 2000, thickness: 100, h: 290, hPg: 'отс.', volume: 0.19, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС20-6 ФУТ',    ntd: 'ТУ', vp: 'Уралспец-74', dOut: 2200, dIn: 2000, thickness: 100, h: 590, hPg: 'отс.', volume: 0.39, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца ТУ',      name: 'КС20-9 ФУТ',    ntd: 'ТУ', vp: 'Уралспец-74', dOut: 2200, dIn: 2000, thickness: 100, h: 890, hPg: 'отс.', volume: 0.59, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ТУ', name: 'ПН10 ПГ ФУТ',   ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1160, dIn: 1000, thickness: 80,  h: 100, hPg: 20, volume: 0.11, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ТУ', name: 'ПН15 ПГ ФУТ',   ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1680, dIn: 1500, thickness: 90,  h: 120, hPg: 30, volume: 0.27, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища ТУ', name: 'ПН20 ФУТ',      ntd: 'ТУ', vp: 'Уралспец-74', dOut: 2200, dIn: 2000, thickness: 100, h: 120, hPg: 'отс.', volume: 0.46, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ТУ', name: 'ПП10-2 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1160, dIn: 1000, thickness: 80,  h: 150, hPg: 20, volume: 0.10, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ТУ', name: '1ПП15-2 ПГ ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 1680, dIn: 1500, thickness: 90,  h: 150, hPg: 30, volume: 0.27, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты перекрытия ТУ', name: '1ПП20-2 ФУТ', ntd: 'ТУ', vp: 'Уралспец-74', dOut: 2200, dIn: 2000, thickness: 100, h: 150, hPg: 'отс.', volume: 0.51, unit: 'шт', required: 'Обязательно', price: '' },

    // ===== ТУ, Рекон (Ø 3200) =====
    { group: 'Кольца Рекон',   name: 'ПКС32.3', ntd: 'ТУ', vp: 'Рекон', dOut: 3440, dIn: 3200, thickness: 120, h: 290, hPg: 'отс.', volume: 0.18, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца Рекон',   name: 'ПКС32.6', ntd: 'ТУ', vp: 'Рекон', dOut: 3440, dIn: 3200, thickness: 120, h: 590, hPg: 'отс.', volume: 0.37, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца Рекон',   name: 'ПКС32.9', ntd: 'ТУ', vp: 'Рекон', dOut: 3440, dIn: 3200, thickness: 120, h: 890, hPg: 'отс.', volume: 0.56, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища Рекон', name: 'ППН32', ntd: 'ТУ', vp: 'Рекон', dOut: 3440, dIn: 3200, thickness: 120, h: 200, hPg: 'отс.', volume: '0.80*', unit: 'шт', required: 'Обязательно', price: '' },

    // ===== ТУ, Рекон (Ø 2600) =====
    { group: 'Кольца Рекон',   name: 'ПКС26.3', ntd: 'ТУ', vp: 'Рекон', dOut: 2840, dIn: 2600, thickness: 120, h: 290, hPg: 'отс.', volume: 0.15, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца Рекон',   name: 'ПКС26.6', ntd: 'ТУ', vp: 'Рекон', dOut: 2840, dIn: 2600, thickness: 120, h: 590, hPg: 'отс.', volume: 0.30, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Кольца Рекон',   name: 'ПКС26.9', ntd: 'ТУ', vp: 'Рекон', dOut: 2840, dIn: 2600, thickness: 120, h: 890, hPg: 'отс.', volume: 0.46, unit: 'шт', required: 'Обязательно', price: '' },
    { group: 'Плиты днища Рекон', name: 'ППН26', ntd: 'ТУ', vp: 'Рекон', dOut: 2840, dIn: 2600, thickness: 120, h: 200, hPg: 'отс.', volume: '0.53*', unit: 'шт', required: 'Обязательно', price: '' }
];

// ---------- Металлические изделия ----------
window.CATALOG_METAL = [
    { group: 'Крышка КНС ст.нерж.', name: 'Труба профильная',            unit: 'м',  size: '100*100*3 AISI316', price: '' },
    { group: 'Крышка КНС ст.нерж.', name: 'Труба профильная',            unit: 'м',  size: '40*40*4',            price: '' },
    { group: 'Крышка КНС ст.нерж.', name: 'Лист нерж',                    unit: 'кг', size: '3*1500*3000 - 3 листа', price: '' },
    { group: 'Крышка КНС ст.нерж.', name: 'Петля',                        unit: 'шт', size: '',                   price: '' },
    { group: 'Крышка КНС ст.нерж.', name: 'Рукоятка (из круглой арматуры)', unit: 'шт', size: '',                 price: '' },
    { group: 'Лестница',            name: 'Уголок',                       unit: 'м',  size: '50*50*5 AISI316',    price: '' },
    { group: 'Лестница',            name: 'Полоса',                       unit: 'м',  size: '40*3 AISI316',       price: '' },
    { group: 'Лестница',            name: 'Пластина',                     unit: 'шт', size: '150*100*6 AISI316',  price: '' },
    { group: 'Лестница',            name: 'Пластина',                     unit: 'шт', size: '150*150*6 AISI316',  price: '' },
    { group: 'Корзина',             name: 'Уголок',                       unit: 'м',  size: '50*50*5 AISI316L',   price: '' },
    { group: 'Корзина',             name: 'Пруток',                       unit: 'м',  size: 'Ду8 мм AISI316L',    price: '' },
    { group: 'Корзина',             name: 'Пластина',                     unit: 'шт', size: '200*200*6',          price: '' },
    { group: 'Корзина',             name: 'Пластина',                     unit: 'шт', size: '170*280*6',          price: '' },
    { group: 'Корзина',             name: 'Петля',                        unit: 'шт', size: '',                   price: '' },
    { group: 'Направляющие корзины', name: 'Труба профильная',            unit: 'м',  size: '80*80*4 AISI316L',   price: '' },
    { group: 'Направляющие корзины', name: 'Пластина',                    unit: 'шт', size: '150*150*6',          price: '' },
    { group: 'Направляющие корзины', name: 'Пластина',                    unit: 'шт', size: '150*100*6',          price: '' },
    { group: 'Направляющие корзины', name: 'Косынка',                     unit: 'шт', size: '150*35*6',           price: '' },
    { group: 'Площадка обслуживания', name: 'Труба профильная',           unit: 'м',  size: '40*40*2 AISI316L',   price: '' },
    { group: 'Площадка обслуживания', name: 'Полоса',                     unit: 'м',  size: '40*3 AISI316',       price: '' },
    { group: 'Площадка обслуживания', name: 'Труба',                      unit: 'мм', size: '32*3 L=70',          price: '' },
    { group: 'Площадка обслуживания', name: 'Лист',                       unit: 'шт', size: '150*820*3',          price: '' }
];

// ---------- Комплектующие ----------
window.CATALOG_PARTS = [
    { name: 'Насосный комплект',                          unit: 'шт',  price: '' },
    { name: 'Раствор для гидроизоляции',                  unit: 'т',   price: '' },
    { name: 'Раствор для внешней гидроизоляции',          unit: 'т',   price: '' },
    { name: 'Муфта защитная кабельных вводов',            unit: 'шт',  price: '' },
    { name: 'Труба подводящая',                           unit: 'п.м.', price: '' },
    { name: 'Труба подводящая 168*5',                     unit: 'п.м.', price: '' },
    { name: 'Муфта ПНД фланцевая 90',                     unit: 'шт',  price: '' },
    { name: 'Муфта защитная подводящего трубопровода',    unit: 'шт',  price: '' },
    { name: 'Муфта защитная отводящего трубопровода',     unit: 'шт',  price: '' },
    { name: 'Муфта защитная вентиляция',                  unit: 'шт',  price: '' },
    { name: 'Шкаф управления КНС',                        unit: 'шт',  price: '' },
    { name: 'Павильон',                                   unit: 'шт',  price: '' },
    { name: 'Люк средний С(В125)-2-60 (с запорным устройством)', unit: 'шт', price: '' }
];

// ---------- Услуги ----------
window.CATALOG_SERVICES = [
    { group: 'Изготовление крышки КНС из нерж',      name: 'Резка листа нерж',            size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление крышки КНС из нерж',      name: 'Резка нерж проф трубы',       size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление крышки КНС из нерж',      name: 'Сварка нерж листа',           size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление крышки КНС из нерж',      name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление крышки КНС из нерж',      name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление крышки КНС из нерж',      name: 'Установка прокладки',         size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление сороулавливающей корзины', name: 'Резка листа',                size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление сороулавливающей корзины', name: 'Резка профильной трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление сороулавливающей корзины', name: 'Сварка нерж листа',           size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление сороулавливающей корзины', name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление сороулавливающей корзины', name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление площадки обслуживания',   name: 'Резка профильной трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление площадки обслуживания',   name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление площадки обслуживания',   name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление направляющей для насосов',name: 'Резка профильной трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление направляющей для насосов',name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление направляющей для насосов',name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление направляющих для корзины',name: 'Резка профильной трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление направляющих для корзины',name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление направляющих для корзины',name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление трубной обвязки КНС',     name: 'Резка профильной трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление трубной обвязки КНС',     name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление трубной обвязки КНС',     name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' },
    { group: 'Изготовление лестницы',                name: 'Резка профильной трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление лестницы',                name: 'Сварка нерж проф трубы',      size: '', unit: 'за п.м', price: '' },
    { group: 'Изготовление лестницы',                name: 'Сборка изделия',              size: '', unit: 'н.час', price: '' }
];

// ---------- Прочие услуги ----------
window.CATALOG_OTHER = [
    { name: 'Алмазное бурение',              unit: 'ед',    price: '' },
    { name: 'Устройство площадки',           unit: 'ед',    price: '' },
    { name: 'Сборка ЖБИ колодца',            unit: 'ед',    price: '' },
    { name: 'Сварка колец (полукольца)',     unit: 'ед',    price: '' },
    { name: 'Сварка нержавейки',             unit: 'за п.м', price: '' },
    { name: 'Сварка пруток',                 unit: 'за п.м', price: '' },
    { name: 'Гидроизоляция наружная',        unit: 'за п.м', price: '' },
    { name: 'Гидроизоляция швов',            unit: 'за п.м', price: '' },
    { name: 'Обратная засыпка',              unit: 'ед',    price: '' },
    { name: 'СМР лестницы',                  unit: 'ед',    price: '' },
    { name: 'СМР площадки',                  unit: 'ед',    price: '' },
    { name: 'СМР насосов',                   unit: 'ед',    price: '' },
    { name: 'СМР трубопроводы и арматура',   unit: 'ед',    price: '' },
    { name: 'СМР крышки',                    unit: 'ед',    price: '' },
    { name: 'СМР вентиляции',                unit: 'ед',    price: '' },
    { name: 'СМР электрика',                 unit: 'ед',    price: '' },
    { name: 'СМР слаботочка',                unit: 'ед',    price: '' },
    { name: 'СМР ЩУ',                        unit: 'ед',    price: '' },
    { name: 'СМР Пусконаладка',              unit: 'ед',    price: '' }
];

// ---------- Логистика ----------
window.CATALOG_LOGISTICS = [
    { name: 'Логистика до завода',    unit: 'ед', price: '' },
    { name: 'Логистика до заказчика', unit: 'ед', price: '' }
];