<?php

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
class UsersFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for ($count = 0; $count < 20; $count++) {
            $user = new User();
            $last_name = "Croute" . $count;
            $first_name = "Antoine & Daniel" . $count;
            $email = "antoine.croute@gmail.com";
            $password = password_hash("toto est pas un vrai prénom");
            $user->setLastName($last_name);
            $user->setFirstName($first_name);
            $user->setEmail($email);
            $user->setPassword($password);
            $manager->persist($user);
        }
        $manager->flush();
    }
}