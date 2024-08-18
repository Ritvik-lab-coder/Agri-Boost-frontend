import React from 'react'
import { Link, useParams } from 'react-router-dom'
import '../CSS/PageNotFound.css'

const PageNotFound = () => {
    const { name } = useParams();
    return (
        <div>
            <div className="pnf">
                <h1 className='pnf-title'>{name === "notauthenticated" ? "401" : name === "notauthorized" ? "403" : "404"}</h1>
                <h2 className="pnf-heading">{name === "notauthenticated" ? "User not authenticated, please login or sign up" : name === "notauthorized" ? "User not authorized to access this resource" : "Oops ! Page not found"}</h2>
                <Link to='/' className='pnf-btn'>
                    Go to Home
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound
