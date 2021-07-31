<?php

namespace App\Controller;

use App\Repository\ArticlesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ListBasketController extends AbstractController
{
    public function __invoke(ArticlesRepository $articlesRepository)
    {
        if(!empty($_GET)){
            $list = $_GET["tabList"];
            $articlesBasket = $articlesRepository->getListBasket($list);

            json_encode($articlesBasket);
            return $articlesBasket;
        }
    }
}
