<?php

namespace App\Controller;

use App\Entity\Articles;
use AppBundle\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateArticleController extends AbstractController
{
    public function __construct(private Security $security)
    {
        
    }

    public function __invoke(Request $request)
    {
        $article = new Articles();

        // dd($article);
        $data = $request->getContent();
        $data = json_decode($data, true);

        $title = $data["Title"];
        $description = $data["Description"];
        $file = $data["Image"];
        $features = $data["Feature"];
        $price = $data["Price"];
        
        $article->setTitle($title);
        $article->setDescription($description);
        $article->setImage($file);
        $article->setFeature($features);
        $article->setPrice($price);

        $em = $this->getDoctrine()->getManager();

        $em->persist($article);
        

        $repository = $this->getDoctrine()->getRepository(Articles::class);
        $articles = $repository->findOneBy(["id" => 2]);
        return $articles;

    }
}
