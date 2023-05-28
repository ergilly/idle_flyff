import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    const navigate = useNavigate();

    const routeChange = () => {
        navigate('/');
    }

    return (
        <React.Fragment>
            <div>hello</div>
        </React.Fragment>
    );
}
