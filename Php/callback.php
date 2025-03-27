<?php
$data = file_get_contents('php://input');
$logFile = "mpesa_log.txt";
file_put_contents($logFile, $data . PHP_EOL, FILE_APPEND);

$response = json_decode($data, true);

if (isset($response['Body']['stkCallback'])) {
  $callback = $response['Body']['stkCallback'];

  if ($callback['ResultCode'] == 0) {
    $amount = $callback['CallbackMetadata']['Item'][0]['Value'];
    $mpesaReceipt = $callback['CallbackMetadata']['Item'][1]['Value'];
    $phone = $callback['CallbackMetadata']['Item'][4]['Value'];

    $db = new mysqli("localhost", "DB_USER", "DB_PASS", "DB_NAME");
    $stmt = $db->prepare("INSERT INTO donations (phone, amount, receipt) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $phone, $amount, $mpesaReceipt);
    $stmt->execute();
    $stmt->close();
  }
}
