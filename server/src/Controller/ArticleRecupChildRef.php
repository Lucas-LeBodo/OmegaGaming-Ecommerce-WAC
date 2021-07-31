<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Repository\ArticlesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class ArticleRecupChildRef extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(ArticlesRepository $articlesRepository)
    {
      
        if(!empty($_GET)){
            $parentRef = $_GET['sameArticles'];
            $articles = $articlesRepository->getChildRef($parentRef);
        }
        

        json_encode($articles);
        return $articles;
    }

}