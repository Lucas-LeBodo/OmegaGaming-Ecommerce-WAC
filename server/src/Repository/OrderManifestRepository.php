<?php

namespace App\Repository;

use App\Entity\OrderManifest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method OrderManifest|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrderManifest|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrderManifest[]    findAll()
 * @method OrderManifest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderManifestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderManifest::class);
    }

    // /**
    //  * @return OrderManifest[] Returns an array of OrderManifest objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?OrderManifest
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
