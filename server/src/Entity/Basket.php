<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CountArticleController;
use App\Controller\ListBasketController;
use App\Controller\ShippyController;
use App\Repository\BasketRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BasketRepository::class)
 */

#[ApiResource(
    collectionOperations: [
        'countArticle' => [
            'path' => '/baskets/countArticles',
            'method' => 'get',
            'controller' => CountArticleController::class,
        ],
        'shippy' => [
            'path' => '/shippy',
            'method' => 'get',
            'controller' => ShippyController::class,
        ],
        'ListBasket' => [
            'path' => '/baskets/listBasket',
            'method' => 'get',
            'controller' => ListBasketController::class,
        ],
        'get',
        'post',
    ]
)]
class Basket
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $id_user;

    /**
     * @ORM\Column(type="integer")
     */
    private $id_articles;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUser(): ?int
    {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdArticles(): ?int
    {
        return $this->id_articles;
    }

    public function setIdArticles(int $id_articles): self
    {
        $this->id_articles = $id_articles;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }
}
