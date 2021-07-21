// Import Libs
import React, { Fragment }from 'react'
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';


//import style 

const HomeAdmin = () => {
    return (
        <Fragment>
            <Container>
            <Link to={'/admin/create_article'} className="nav-link">Créer un article</Link>
            <Link to={'/admin/show_articles'} className="nav-link">Liste des articles</Link>
            </Container>
        </Fragment>
    )
}

export default HomeAdmin