<?php
include 'mpesa_auth.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $phone = $_POST['phone'];
  $amount = $_POST['amount'];

  $phone = preg_replace('/[^0-9]/', '', $phone);
  if (substr($phone, 0, 1) == '0') {
    $phone = '254' . substr($phone, 1);
  }

  $accessToken = generateAccessToken();
  if (!$accessToken) {
    die(json_encode(['status' => 'error', 'message' => 'Failed to get access token']));
  }

  $shortCode = "174379"; // Use Paybill or Till Number
  $passkey = "YOUR_PASSKEY";
  $timestamp = date('YmdHis');
  $password = base64_encode($shortCode . $passkey . $timestamp);

  $callbackUrl = "https://yourdomain.com/callback.php";

  $payload = [
    "BusinessShortCode" => $shortCode,
    "Password" => $password,
    "Timestamp" => $timestamp,
    "TransactionType" => "CustomerPayBillOnline",
    "Amount" => $amount,
    "PartyA" => $phone,
    "PartyB" => $shortCode,
    "PhoneNumber" => $phone,
    "CallBackURL" => $callbackUrl,
    "AccountReference" => "ChurchDonation",
    "TransactionDesc" => "Church Donation"
  ];

  $url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
  ]);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

  $response = curl_exec($ch);
  curl_close($ch);

  echo $response;
}
