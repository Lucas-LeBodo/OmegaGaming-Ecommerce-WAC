<?php

namespace App\Controller;

use App\Repository\BasketRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DeleteBasket extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(BasketRepository $basket)
    {

        $idUser = $_GET["params"];
        $test = $basket->deleteBasket($idUser);
        json_encode($test);
        return $test;
    }
}
