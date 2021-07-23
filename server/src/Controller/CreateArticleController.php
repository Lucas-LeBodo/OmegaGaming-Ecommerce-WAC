<?php

namespace App\Controller;

use App\Entity\Articles;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateArticleController extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(Request $request)
    {
        $article = new Articles();

        $data = $request->getContent();
        $data = json_decode($data, true);

        $title = $data["Title"];
        $description = $data["Description"];
        $file = $data["Image"];
        $features = $data["Feature"];
        $stock = $data["Stock"];
        $price = $data["Price"];
        
        $article->setTitle($title);
        $article->setDescription($description);
        $article->setImage($file);
        $article->setFeature($features);
        $article->setPrice($price);
        $article->setStock($stock);
        $article->setView(0);

        $em = $this->getDoctrine()->getManager();

        $em->persist($article);

        $repository = $this->getDoctrine()->getRepository(Articles::class);
        $articles = $repository->findOneBy(["id" => 2]);
        return $articles;

    }
}
