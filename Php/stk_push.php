<?php
header("Content-Type: application/json");

// Receive JSON input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->phone) || !isset($data->amount)) {
  echo json_encode(["error" => "Phone number and amount required."]);
  exit;
}

$phone = $data->phone;
$amount = $data->amount;

$businessShortCode = "174379"; // Replace with actual Paybill/Till Number
$passkey = "YOUR_PASSKEY";
$timestamp = date("YmdHis");
$password = base64_encode($businessShortCode . $passkey . $timestamp);

// Get access token
$token = file_get_contents("php/mpesa_auth.php");

$url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

$payload = [
  "BusinessShortCode" => $businessShortCode,
  "Password" => $password,
  "Timestamp" => $timestamp,
  "TransactionType" => "CustomerPayBillOnline",
  "Amount" => $amount,
  "PartyA" => $phone,
  "PartyB" => $businessShortCode,
  "PhoneNumber" => $phone,
  "CallBackURL" => "https://yourwebsite.com/php/callback.php",
  "AccountReference" => "ChurchDonation",
  "TransactionDesc" => "Donation"
];

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => $url,
  CURLOPT_HTTPHEADER => ["Authorization: Bearer $token", "Content-Type: application/json"],
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_RETURNTRANSFER => true
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
