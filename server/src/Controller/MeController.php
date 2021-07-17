<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class MeController extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke()
    {
        $email = $_GET["username"];
        $repository = $this->getDoctrine()->getRepository(User::class);
        $user = $repository->findOneBy(["email" => "$email"]);
        return $user;
    }
}
