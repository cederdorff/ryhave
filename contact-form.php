<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputPhone']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputPhone']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Udfyld venligst alle felterne i kontaktformen.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = $_POST['inputEmail'];
    $mail->FromName = $_POST['inputName'];
    $mail->AddAddress('cederdorff@gmail.com'); //recipient 
    $mail->Subject = "Henvendelse fra ryhave.dk, navn: " . $_POST['inputName'];
    $mail->Body = "Hej Jens. \r\n\r\nDu har modtaget en ny henvendelse fra ryhave.dk \r\n\r\nNavn: " . $_POST['inputName'] . "\r\n\r\nEmail: " . $_POST['inputEmail'] . "\r\n\r\nTelefonnummer: " . $_POST['inputPhone'] . "\r\n\r\nBesked: " . stripslashes($_POST['inputMessage']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Der opstod desværre en fejl. Prøv igen.' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Tak! Din besked er nu send, og jeg vil vende tilbage til dig hurtigst muligt.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Udfyld venligst alle felterne i kontaktformen.');
    echo json_encode($data);

}