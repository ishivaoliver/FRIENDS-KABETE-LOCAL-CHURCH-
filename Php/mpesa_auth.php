<?php
function generateAccessToken()
{
  $consumerKey = 'YOUR_CONSUMER_KEY';
  $consumerSecret = 'YOUR_CONSUMER_SECRET';

  $credentials = base64_encode($consumerKey . ":" . $consumerSecret);
  $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Basic " . $credentials]);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($ch);
  curl_close($ch);

  $result = json_decode($response);
  return $result->access_token ?? null;
}
