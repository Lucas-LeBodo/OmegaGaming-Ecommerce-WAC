<?php

namespace App\Entity;

use App\Controller\DeleteBasket;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\ShippyShipController;
use App\Repository\OrderManifestRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OrderManifestRepository::class)
 */
#[ApiResource(
    collectionOperations: [
        'shippy' => [
            'path' => '/shippy/postOrder',
            'method' => 'get',
            'controller' => ShippyShipController::class,
        ],
        'deleteBasket' => [
            'path' => '/shippy/deleteBasket',
            'method' => 'get',
            'controller' => DeleteBasket::class,
        ],
        'get',
        'post'
    ],
    normalizationContext: ['groups' => ["OrderManifest:read"]],
    denormalizationContext: ["groups" => ["OrderManifest:write"]]
)]
class OrderManifest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups("OrderManifest:write")
     */
    private $orderId;

    /**
     * @ORM\Column(type="text")
     * @Groups("OrderManifest:write")
     */
    private $content;

    /**
     * @ORM\Column(type="integer")
     * @Groups("OrderManifest:write")
     */
    private $userId;

    /**
     * @ORM\Column(type="integer")
     * @Groups("OrderManifest:write")
     */
    private $price;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderId(): ?int
    {
        return $this->orderId;
    }

    public function setOrderId(int $orderId): self
    {
        $this->orderId = $orderId;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): self
    {
        $this->userId = $userId;

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
