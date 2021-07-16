<?php
require './recaptchavars.php';

$gscore = 0.8;

if (isset($_POST['recaptchaResponse']) && !empty($_POST['recaptchaResponse'])) {
    $secret = V3_SECRETKEY;
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['recaptchaResponse']);

    $responseData = json_decode($verifyResponse);

    var_dump($responseData);
    var_dump($_POST['recaptchaResponse']);

    if ($responseData->success) {
        if ($responseData->score < $gscore) {
            // 認証スコアが低いのでbotの可能性
            var_dump(1);
            exit();
        }
    } else {
        // 認証失敗した場合
        var_dump(2);
        exit();
    }
} else {
    // POST値が正常に投げられていなかった場合
    var_dump(3);
    exit();
}
