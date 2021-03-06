// Import Libs
import React, { Fragment }from 'react'
import {Link} from 'react-router-dom';

const HomeAdmin = () => {
    return (
        <Fragment>
                <nav className="navMenu">
                <Link to={'/admin/create_article'} className="nav-link">Créer un article</Link>
                <Link to={'/admin/show_articles'} className="nav-link">Liste des articles</Link>
                <Link to={'/admin/show_category'} className="nav-link">Liste des categories</Link>
                <Link to={'/admin/create_category'} className="nav-link">Créer une categorie</Link>
                </nav>
        </Fragment>
    )
}

export default HomeAdmin