<?php
header("Content-Type: application/json");

$callbackResponse = file_get_contents("php://input");
$logFile = "mpesa_response.log";
file_put_contents($logFile, $callbackResponse, FILE_APPEND);

$data = json_decode($callbackResponse, true);

if (isset($data["Body"]["stkCallback"]["ResultCode"])) {
  $resultCode = $data["Body"]["stkCallback"]["ResultCode"];

  if ($resultCode == 0) {
    $mpesaReceipt = $data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][1]["Value"];
    file_put_contents($logFile, "Payment Successful: Receipt: " . $mpesaReceipt . "\n", FILE_APPEND);
  } else {
    file_put_contents($logFile, "Payment Failed\n", FILE_APPEND);
  }
}
