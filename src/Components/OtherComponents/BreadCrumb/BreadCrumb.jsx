import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ path }){
    return (
        <div className="breadcrumb">
            {path.map((crumb, index) => (
                <span key={index}>
                    <Link to={crumb.link}>{crumb.name}</Link>
                    {index < path.length - 1 && ' -> '}
                </span>
            ))}
        </div>
    );
};

