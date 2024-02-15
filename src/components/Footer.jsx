import React from 'react';

const Footer = ({ activeComponent, setActiveComponent }) => {
    return (
        <div className='navbottom'>
            <div className='leftflexbottom'>
                <a
                    className={`topa ${activeComponent === 'Float' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('Float')}
                >
                    Float
                </a>
                <a
                    className={`topa ${activeComponent === 'Slide' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('Slide')}
                >
                    Slide
                </a>
                <a
                    className={`topa ${activeComponent === 'List' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('List')}
                >
                    List
                </a>
            </div>
            <span className='topa'>All rights reserved ©Jeunecrouter </span>
        </div>
    );
};

export default Footer;
