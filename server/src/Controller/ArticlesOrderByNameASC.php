<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Repository\ArticlesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class ArticlesOrderByNameASC extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(ArticlesRepository $articlesRepository)
    {
        if(!empty($_GET)) {
            $articles = $articlesRepository->getArticleByNameASC();
        }
        json_encode($articles);
        return $articles;
    }

}
