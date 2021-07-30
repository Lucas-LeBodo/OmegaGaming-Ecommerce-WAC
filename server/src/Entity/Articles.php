<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\ViewController;
use App\Controller\ArticleReference;
use App\Controller\ArticlesByCategory;
use App\Controller\ArticlesController;
use App\Controller\MostPopularArticle;
use App\Repository\ArticlesRepository;
use App\Controller\ArticlesOrderByName;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Controller\ArticlesOrderByNameASC;
use App\Controller\ArticlesOrderByNameDESC;
use App\Controller\CreateArticleController;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

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
       'orderByNameASC' => [
        'path' => '/articles/OrderByNameASC',
        'method' => 'get',
        'controller' => ArticlesOrderByNameASC::class,
        ],
        'orderByNameDESC' => [
            'path' => '/articles/OrderByNameDESC',
            'method' => 'get',
            'controller' => ArticlesOrderByNameDESC::class,
        ],
        'articleByCategory' => [
            'method' => 'get',
            'pagination_enabled' => false,
            'path' => '/articles/ArticleByCategory/',
            'controller' => ArticlesByCategory::class,
        ],
        'searchArticleByName' => [
            'method' => 'get',
            'pagination_enabled' => false,
            'path' => '/articles/searchArticle/', // cote front la requete api/articles/searchArticle/?Title= 
        ],
        'recupReference' => [
            'method' => 'get',
            'pagination_enabled' => false,
            'path' => '/articles/recupReferences/',
            'controller' => ArticleReference::class,
        ],
        'get',
        'post'
    ],
    normalizationContext: ['groups' => ["article:read"]],
    denormalizationContext: ["groups" => ["article:write"]]
),
ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'Title' => 'partial'])]

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
     * 
     */
    private $View;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="articles")
     * @ORM\JoinColumn(nullable=false)
     * 
     * @Groups({"article:write", "article:read"})
     */
    private $category;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"article:write", "article:read"})
     */
    private $sameArticles;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"article:write", "article:read"})
     */
    private $featureDiff;


    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }

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

    public function getSameArticles(): ?string
    {
        return $this->sameArticles;
    }

    public function setSameArticles(?string $sameArticles): self
    {
        $this->sameArticles = $sameArticles;

        return $this;
    }

    public function getFeatureDiff(): ?string
    {
        return $this->featureDiff;
    }

    public function setFeatureDiff(?string $featureDiff): self
    {
        $this->featureDiff = $featureDiff;

        return $this;
    }

}
