<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ShippyController extends AbstractController
{
   

    public function __invoke()
    { 

        $data = $_GET['params'];

        $ch = \curl_init();

        \curl_setopt($ch, CURLOPT_URL, "https://www.shippypro.com/api");
        \curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        \curl_setopt($ch, CURLOPT_HEADER, FALSE);

        \curl_setopt($ch, CURLOPT_POST, TRUE);

        \curl_setopt($ch, CURLOPT_POSTFIELDS, "{
          \"Method\": \"GetRates\", \"Params\": " . $data . " }");

        \curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          "Content-Type: application/json",
          "Authorization: Basic ZjE1MzYxMjE3OGE2NTEzYzJhYzlhZWEwYWM1MzM2MjM6"
        ));

        $response = \curl_exec($ch);
        \curl_close($ch);

        return json_decode($response);
    }
}
