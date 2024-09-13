import React from 'react';
import { Link } from 'react-router-dom';

// The component should accept `links` as a prop
export function NavLinks({ links }) {
    return (
        <>
            {links.map((link, i) => (
                <li key={i} className="nav-item fs-3">
                    <Link className="nav-link active" aria-current="page" to={link.path}>{link.name}</Link>
                </li>
            ))}
        </>
    );
}
