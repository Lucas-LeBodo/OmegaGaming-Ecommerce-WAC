<?php

namespace App\DataFixtures;


use App\Entity\Users;
use App\Entity\Articles;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $faker = Faker\Factory::create('fr_FR');
           for ($i = 0; $i < 4; $i++) {
               $articles = new Articles;
               $articles->setTitle("titre $i");
               $articles->setDescription("text article $i");
               $articles->setImage("image $i");
               $articles->setFeature("feature $i");
               $articles->setPrice(random_int(0,1000));

               $manager->persist($articles);
        // $product = new Product();
        // $manager->persist($product);
         }
         $manager->flush();
    }
}
