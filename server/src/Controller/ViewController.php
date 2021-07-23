<?php

namespace App\Controller;

use App\Entity\Articles;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class ViewController extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke()
    {
        $id = $_GET["id"];
        $entityManager = $this->getDoctrine()->getManager();
        $article = $entityManager->getRepository(Articles::class)->find($id);
        $view = $article->getView();
        if($view == "null") {
            $view = 0;
        }
        $view = $view + 1;
        $article->setView($view);
        $entityManager->flush();

        return $article;
    }

}
