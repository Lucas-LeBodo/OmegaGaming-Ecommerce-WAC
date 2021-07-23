<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\ArticlesController;
use App\Controller\MostPopularArticle;
use App\Controller\ViewController;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\ArticlesRepository;
use App\Controller\CreateArticleController;


/**
 * @ORM\Entity(repositoryClass=ArticlesRepository::class)
 * 
 */

#[ApiResource(
    collectionOperations: [
        'countView' => [
            'path' => '/articles/view',
            'method' => 'get',
            'controller' => ViewController::class,
        ],
        'orderByView' => [
            'path' => '/articles/popularity',
            'method' => 'get',
            'controller' => MostPopularArticle::class,
        ],
        'createArticle' => [
            'pagination_enabled' => false,
            'path' => '/createArticle',
            'method' => 'post',
            'controller' => CreateArticleController::class,
            'read' => false,
       ],
        'get',
        'post'
    ],
    normalizationContext: ['groups' => ["article:read"]],
    denormalizationContext: ["groups" => ["article:write"]]
 )]

class Articles
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups("article:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"article:read", "article:write"})
     * 
     */
    private $Title;

    /**
     * @ORM\Column(type="text", length=4294967295)
     * 
     * @Groups({"article:read", "article:write"})
     */
    private $Description;

    /**
     * @ORM\Column(type="text", length=4294967295)
     * @Groups({"article:read", "article:write"})
     */
    private $Image;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"article:read", "article:write"})
     */
    private $Feature;

    /**
     * @ORM\Column(type="integer")
     * 
     * @Groups({"article:read", "article:write"})
     */
    private $Price;

    /**
     * @ORM\Column(type="integer")
     * 
     * @Groups({"article:read", "article:write"})
     */
    private $Stock;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * 
     * @Groups("article:read")
     */
    private $View;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="articles")
     */
    private $category;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->Title;
    }

    public function setTitle(string $Title): self
    {
        $this->Title = $Title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->Image;
    }

    public function setImage(string $Image): self
    {
        $this->Image = $Image;

        return $this;
    }

    public function getFeature(): ?string
    {
        return $this->Feature;
    }

    public function setFeature(string $Feature): self
    {
        $this->Feature = $Feature;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->Price;
    }

    public function setPrice(int $Price): self
    {
        $this->Price = $Price;

        return $this;
    }
    public function getStock(): ?int
    {
        return $this->Stock;
    }

    public function setStock(int $Stock): self
    {
        $this->Stock = $Stock;

        return $this;
    }

    public function getView(): ?int
    {
        return $this->View;
    }

    public function setView(?int $View): self
    {
        $this->View = $View;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
}
