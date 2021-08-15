<?php
// src/Entity/User

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\SerializedName;
use App\Controller\MeController;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 *
 */

 #[ApiResource(
             collectionOperations: [ 'me' => [
                     'pagination_enabled' => false,
                     'path' => '/me',
                     'method' => 'get',
                     'controller' => MeController::class,
                     'read' => false,
                 ],
                 'post'
             ],
             normalizationContext: ['groups' => ["user:read"]],
             denormalizationContext: ["groups" => ["user:write"]]
         ),
         ApiFilter(SearchFilter::class, properties: ['email' => 'exact'])]
         
         class User implements UserInterface
         {
             /**
              * @ORM\Id()
              * @ORM\GeneratedValue()
              * @ORM\Column(type="integer")
              *
              * @Groups("user:read")
              */
             private $id;
         
             /**
              * @ORM\Column(type="string", length=180, unique=true)
              *
              * @Groups({"user:read", "user:write"})
              */
             private $email;
         
             /**
              * @ORM\Column(type="json")
              *
              * @Groups("user:read")
              */
             private $roles = [];
         
             /**
              * @var string The hashed password
              * @ORM\Column(type="string")
              */
             private $password;
         
             /**
              * @Groups("user:write")
              * 
              * @SerializedName("password")
              */
             private $plainPassword;
         
             /**
              * @ORM\Column(type="string", length=255)
              *
              * @Groups({"user:read", "user:write"})
              */
             private $firstName;
         
             /**
              * @ORM\Column(type="string", length=255)
              *
              * @Groups({"user:read", "user:write"})
              */
             private $lastName;
         
             /**
              * @ORM\Column(type="string", length=255, nullable=true)
              *
              * @Groups({"user:read", "user:write"})
              */
             private $country;
         
             /**
              * @ORM\Column(type="string", length=255, nullable=true)
              *
              * @Groups({"user:read", "user:write"})
              */
             private $adress;
         
             /**
              * @ORM\Column(type="string", length=255, nullable=true)
              *
              * @Groups({"user:read", "user:write"})
              */
             private $cardData;
      
             /**
              * @ORM\Column(type="string", length=255, nullable=true)
              *
              * @Groups({"user:read", "user:write"})

              */
             private $postalCode;
         
             public function getId(): ?int
             {
                 return $this->id;
             }
         
             public function getEmail(): ?string
             {
                 return $this->email;
             }
         
             public function setEmail(string $email): self
             {
                 $this->email = $email;
         
                 return $this;
             }
         
             /**
              * A visual identifier that represents this user.
              *
              * @see UserInterface
              */
             public function getUserIdentifier(): string
             {
                 return (string) $this->email;
             }
         
             /**
              * @deprecated since Symfony 5.3, use getUserIdentifier instead
              */
             public function getUsername(): string
             {
                 return (string) $this->email;
             }
         
             /**
              * @see UserInterface
              */
             public function getRoles(): array
             {
                 $roles = $this->roles;
                 if (!empty($roles)) {
                     $roles[] = 'ROLE_ADMIN';
                 } else {
                     $roles[] = 'ROLE_USER';
                 }
         
                 return array_unique($roles);
             }
         
             public function setRoles(array $roles): self
             {
                 $this->roles = $roles;
         
                 return $this;
             }
         
             /**
              * @see PasswordAuthenticatedUserInterface
              */
             public function getPassword(): string
             {
                 return $this->password;
             }
         
             public function setPassword(string $password): self
             {
                 $this->password = $password;
         
                 return $this;
             }
         
             public function getPlainPassword(): string
             {
                 return $this->plainPassword;
             }
         
             public function setPlainPassword(string $plainPassword): self
             {
                 $this->plainPassword = $plainPassword;
         
                 return $this;
             }
         
             /**
              * Returning a salt is only needed, if you are not using a modern
              * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
              *
              * @see UserInterface
              */
             public function getSalt(): ?string
             {
                 return null;
             }
         
             /**
              * @see UserInterface
              */
             public function eraseCredentials()
             {
                 // If you store any temporary, sensitive data on the user, clear it here
                 $this->plainPassword = null;
             }
         
             public function getFirstName(): ?string
             {
                 return $this->firstName;
             }
         
             public function setFirstName(string $firstName): self
             {
                 $this->firstName = $firstName;
         
                 return $this;
             }
         
             public function getLastName(): ?string
             {
                 return $this->lastName;
             }
         
             public function setLastName(string $lastName): self
             {
                 $this->lastName = $lastName;
         
                 return $this;
             }
         
             public function getCountry(): ?string
             {
                 return $this->country;
             }
         
             public function setCountry(?string $country): self
             {
                 $this->country = $country;
         
                 return $this;
             }
         
             public function getAdress(): ?string
             {
                 return $this->adress;
             }
         
             public function setAdress(?string $adress): self
             {
                 $this->adress = $adress;
         
                 return $this;
             }
         
             public function getCardData(): ?string
             {
                 return $this->cardData;
             }
             public function setCardData(?string $cardData): self
             {
                 $this->cardData = $cardData;
                 return $this;
             }
   
             public function getPostalCode(): ?string
             {
                 return $this->postalCode;
             }

             public function setPostalCode(?string $postalCode): self
             {
                 $this->postalCode = $postalCode;

                 return $this;
             }
         }