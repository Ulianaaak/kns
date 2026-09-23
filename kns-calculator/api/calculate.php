<?php
/**
 * api/calculate.php
 * Серверный расчёт КНС. Принимает POST (JSON или form-data),
 * возвращает JSON-ответ, идентичный по структуре kns/index.js.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'errors' => ['Метод не поддерживается. Используйте POST.']], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---- Чтение входных данных (JSON или form-data) ----
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$get = function ($key) use ($data) {
    return isset($data[$key]) ? (float)$data[$key] : null;
};

$qDay      = $get('qDay');
$kCh       = $get('kCh');
$hGeo      = $get('hGeo');
$hIn       = $get('hIn');
$hOut      = $get('hOut');
$cycleTime = $get('cycleTime');

// ---- Валидация ----
$errors = [];

$check = function ($val, $name, $min, $allowZero) use (&$errors) {
    if ($val === null || !is_numeric($val) || !is_finite($val)) {
        $errors[] = "Параметр «{$name}» должен быть числом.";
        return;
    }
    if ($allowZero ? $val < $min : $val <= $min) {
        $errors[] = "Параметр «{$name}» должен быть " . ($allowZero ? '≥' : '>') . " {$min}.";
    }
};

$check($qDay,      'Суточный расход',             0.0001, false);
$check($kCh,       'Коэффициент неравномерности', 1,      false);
$check($hGeo,      'Геометрическая высота',       0,      true);
$check($hIn,       'Потери во всасывающем тр-де', 0,      true);
$check($hOut,      'Потери в напорном тр-де',     0,      true);
$check($cycleTime, 'Время цикла',                 1,      false);

if ($kCh !== null && ($kCh < 1 || $kCh > 3)) {
    $errors[] = 'Коэффициент часовой неравномерности обычно в диапазоне 1.0–3.0.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors, 'results' => null], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ---- Расчёт ----
$qHour    = ($qDay * $kCh) / 24;              // м³/ч
$qSec     = ($qHour * 1000) / 3600;           // л/с
$head     = $hGeo + $hIn + $hOut;             // м
$volumeL  = ($cycleTime * $qSec) / 4;         // л
$volumeM3 = $volumeL / 1000;                  // м³

$recommendedPumpFlowM3h = $qHour * 1.2;
$pumpStartsPerHour      = 3600 / $cycleTime;

$response = [
    'success' => true,
    'errors'  => [],
    'results' => [
        'hourlyFlowM3h'          => round($qHour, 2),
        'secondFlowLs'           => round($qSec, 2),
        'requiredHeadM'          => round($head, 2),
        'tankVolumeL'            => round($volumeL, 0),
        'tankVolumeM3'           => round($volumeM3, 2),
        'recommendedPumpFlowM3h' => round($recommendedPumpFlowM3h, 2),
        'pumpStartsPerHour'      => round($pumpStartsPerHour, 1),
        'input' => [
            'qDay' => $qDay, 'kCh' => $kCh, 'hGeo' => $hGeo,
            'hIn' => $hIn, 'hOut' => $hOut, 'cycleTime' => $cycleTime
        ]
    ],
    'disclaimer' =>
        'Расчёт выполнен по упрощённой методике. ' .
        'Для точного подбора оборудования требуется гидравлический ' .
        'расчёт трубопроводов и анализ графика притока.'
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);