<?php
    $mailData = array("firstname" => "", "name" => "", "email" => "", "phone" => "", "message" => "", "firstnameError" => "", "nameError" => "", "emailError" => "", "phoneError" => "", "messageError" => "", "isSuccess" => false);
    $emailTo = "samueldelienx78@gmail.com";

    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    { 
        $mailData["firstname"] = cleanInput($_POST["firstnameInput"]);
        $mailData["name"] = cleanInput($_POST["nameInput"]);
        $mailData["email"] = cleanInput($_POST["emailInput"]);
        $mailData["phone"] = "0".cleanInput($_POST["phoneInput"]);
        $mailData["message"] = cleanInput($_POST["messageInput"]);
        $mailData["isSuccess"] = true; 
        $emailText = "";
        
        if (empty($mailData["firstname"]))
        {
            $mailData["firstnameError"] = "J'ai besoin de ton prénom.";
            $mailData["isSuccess"] = false; 
        } 
        else
        {
            $emailText .= "Prénom: {$mailData['firstname']}\n";
        }

        if (empty($mailData["name"]))
        {
            $mailData["nameError"] = "J'ai besoin de ton nom.";
            $mailData["isSuccess"] = false; 
        } 
        else
        {
            $emailText .= "Nom: {$mailData['name']}\n";
        }

        if(!isEmail($mailData["email"])) 
        {
            $mailData["emailError"] = "L'envoi nécessite un mail valide.";
            $mailData["isSuccess"] = false; 
        } 
        else
        {
            $emailText .= "Email: {$mailData['email']}\n";
        }

        if (isPhone($mailData["phone"]))
        {
            $emailText .= "Phone: {$mailData['phone']}\n";
        }

        if (empty($mailData["message"]))
        {
            $mailData["messageError"] = "Tu as oublié ton message ?";
            $mailData["isSuccess"] = false; 
        }
        else
        {
            $emailText .= "Message: {$mailData['message']}\n";
        }
        if($mailData["isSuccess"]) 
        {
            $headers = "From: ".$mailData['firstname']." ".$mailData['name']." <".$mailData['email'].">\r\n"; // Envoyer
            $headers .= "Disposition-Notification-To: {$mailData['email']}\r\n"; // Accusé de réception
            $headers .= 'Delivered-to: '.$emailTo."\r\n"; // Destinataire

            mail($emailTo, "Un message de votre site", $emailText, $headers);
        }        
    }

    function isEmail($email) 
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    function isPhone($phone) 
    {
        return preg_match("/^[0-9 ]*$/",$phone);
    }
    function cleanInput($inputValue) 
    {
      $inputValue = trim($inputValue);
      $inputValue = stripslashes($inputValue);
      $inputValue = htmlspecialchars($inputValue);
      return $inputValue;
    }
 
?>


