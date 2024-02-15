import React from 'react'

const Header = ( { openOverlayContact, activeComponent, setActiveComponent} ) => {
  return (
    <div className='navtop'>
        <a 
            className='topa'
            onClick={openOverlayContact}>
            Jeunecrouteur
        </a>
        <div className='leftflexbottom'>

        <a
                    className={`topa ${activeComponent === 'List' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('List')}
                >
                    List
                </a>

                <a
                    className={`topa ${activeComponent === 'Grid' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('Grid')}
                >
                    Grid
                </a>
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
               
            </div>
      </div>
  )
}

export default Header