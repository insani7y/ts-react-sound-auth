import React from "react";

import { Link, useLocation } from "react-router-dom"

const Nav = () => {
    const { pathname } = useLocation()

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                {pathname !== '/private' && (
                    <Link className="navbar-brand" to="/">Public</Link>
                )}
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {pathname === '/private' ? (
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Logout</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
