<?php

$tokens = "< here the token >";

define('SERVER_API_KEY','< here server key >');

$header = [
            'Authorization: key='.SERVER_API_KEY,
	    'Content-Type: Application/json'			
          ];
		  
$notification = [
                'title' => 'il blog di un programmatore ha un nuovo articolo',
		'body'  => 'React JS, impostare l\'ambiente di lavoro',
		'icon'  => 'https://www.ilblogdiunprogrammatore.it/image/favicon.ico',
		'click_action' => 'https://www.ilblogdiunprogrammatore.it/39825-react-js-impostare-l-ambiente-di-lavoro.html'
		];
		  
$payload = [
            'notification' => $notification,
            'to' => $tokens
	  ];

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_HTTPHEADER => $header
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo "Notification sent successfully.";  
}
	
	
