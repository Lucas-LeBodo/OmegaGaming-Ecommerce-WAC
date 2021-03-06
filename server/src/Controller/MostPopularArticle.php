<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Repository\ArticlesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class MostPopularArticle extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(ArticlesRepository $articlesRepository)
    {
        if(isset($_GET["exist"])) {
            $articles = $articlesRepository->getMostPopularHome();
        } else {
            $articles = $articlesRepository->getMostPopularBestSeller();
        }
        json_encode($articles);
        return $articles;
    }

}
