<?php

namespace App\Controller;

use App\Entity\Basket;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CountArticleController extends AbstractController
{   
    public function __invoke()
    {
        $email = $_GET["email"];
        $repository = $this->getDoctrine()->getRepository(User::class);
        $user = $repository->findOneBy(["email" => "$email"]);
        $id = $user->getId();

        $repository = $this->getDoctrine()->getRepository(Basket::class);
        $basket = $repository->findBy(["id_user" => $id]);
        return $basket;
    }
}
