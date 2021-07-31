<?php

namespace App\Repository;

use App\Entity\Articles;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Articles|null find($id, $lockMode = null, $lockVersion = null)
 * @method Articles|null findOneBy(array $criteria, array $orderBy = null)
 * @method Articles[]    findAll()
 * @method Articles[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticlesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Articles::class);
    }

    // /**
    //  * @return Articles[] Returns an array of Articles objects
    //  */
    
    public function getMostPopularBestSeller()
    {
        return $this->createQueryBuilder('a')
            ->where("a.View > 0")
            ->orderBy('a.View', "DESC")
            ->setMaxResults(30)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getMostPopularHome()
    {
        return $this->createQueryBuilder('a')
            ->orderBy('a.View', "DESC")
            ->setMaxResults(30)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getArticleByNameASC()
    {
        return $this->createQueryBuilder('a')
            ->orderBy('a.Title')
            ->setMaxResults(30)
            ->getQuery()
            ->getResult()
        ;
    }
    public function getArticleByNameDESC()
    {
        return $this->createQueryBuilder('a')
            ->orderBy('a.Title', 'DESC')
            ->setMaxResults(30)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getArticleByCategory($id)
    {
        return $this->createQueryBuilder('a')
            ->where('a.category = :id')
            ->setParameter('id', 1)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getListBasket($listId)
    {
        return $this->createQueryBuilder('a')
            ->where("a.id IN (:id)")
            ->setParameter(':id', $listId)
            ->getQuery()
            ->getResult()
            ;
    }
    /*
    public function findOneBySomeField($value): ?Articles
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
