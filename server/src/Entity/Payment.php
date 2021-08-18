<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PaymentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PaymentRepository::class)
 */
#[ApiResource]
class Payment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $cardData;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $cvv;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $date;

    /**
     * @ORM\OneToOne(targetEntity=User::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $idUser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCardData(): ?int
    {
        return $this->cardData;
    }

    public function setCardData(?int $cardData): self
    {
        $this->cardData = $cardData;

        return $this;
    }

    public function getCvv(): ?int
    {
        return $this->cvv;
    }

    public function setCvv(?int $cvv): self
    {
        $this->cvv = $cvv;

        return $this;
    }

    public function getDate(): ?int
    {
        return $this->date;
    }

    public function setDate(?int $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getIdUser(): ?User
    {
        return $this->idUser;
    }

    public function setIdUser(User $idUser): self
    {
        $this->idUser = $idUser;

        return $this;
    }
}
