<?php
function sendNotification(){
    $url ="https://fcm.googleapis.com/fcm/send";

    $fields=array(
        "to"=>$_REQUEST['token'],
        "notification"=>array(
            "body"=>$_REQUEST['message'],
            "title"=>$_REQUEST['title'],
            "icon"=>$_REQUEST['icon'],
            "click_action"=>"https://google.com"
        )
        );

        $headers=array(
            'Authorization: key=AAAAsgb7bk4:APA91bHUvnMJzTe4zeFbFLcAZG8ozErl2goBi2a6bTRMvwNj77akavfRHceznZK8vhZJgoHkYjKgS1tKM5NCeC3vTxfvpID9AR4q0LGd5HeC1MtL2FJm0ZdIqhl0rYGg6ULcJAn2Kk5x',
            'Content-Type:application/json'
        );

        $ch=curl_init();
        curl_setopt($ch,option: CURLOPT_URL,$url);
        curl_setopt($ch,option: CURLOPT_POST, value: true);
        curl_setopt($ch,option: CURLOPT_HTTPHEADER,$headers);
        curl_setopt($ch,option: CURLOPT_RETURNTRANSFER, value: true);
        curl_setopt($ch,option: CURLOPT_POSTFEIELDS,json_encode($fieldes));
        $result=curl_exec($ch);
        print_r($result)
        curl_close($ch)    
}
sendNotification();