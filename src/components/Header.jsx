import React from 'react'

const Header = ( { hoverLay,openOverlayContact, activeComponent, setActiveComponent} ) => {
  return (
    <div className='navtop'>
        <a 
            className={`topa ${hoverLay ? 'active' : ''}`}
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
               
            </div>
      </div>
  )
}

export default Header