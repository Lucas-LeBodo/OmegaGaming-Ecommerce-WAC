<?php

namespace App\Controller;

use App\Repository\ArticlesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class NewArticlesController extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(ArticlesRepository $articlesRepository)
    {
        $articles = $articlesRepository->getNewArticle();
        json_encode($articles);
        return $articles;
    }

}