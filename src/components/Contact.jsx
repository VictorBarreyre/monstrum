import React, { useState } from 'react';

const Contact = ({ hoverLay, data }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (index, event) => {
    setHoveredItem(index);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className={hoverLay ? 'activeClassContact' : 'inactiveClassContact'}>
      <div className='single-container-contact'>
        <p className='quiestil'>
          Qui est il ? <br />
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
        </p>
      </div>

      <div className='single-container-contact'>
        <p className='quiestil'>
          Contact :<br />
          Le Lorem Ipsum est simplement du faux texte employé dans la composition
        </p>
      </div>

      <div className='single-container-contact'>
        <ul className='quiestil'>
          Index : <br />
          {data.map((item, index) => (
            <div
              key={index}
             
            >
              <div className='flex-grid-text'>
                <li className='quiestil li'  onMouseEnter={(event) => handleMouseEnter(index, event)}
              onMouseLeave={handleMouseLeave}> {item.title}</li>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className='flexend-contact'>
        <p className='quiestil'>
          Credit :<br />
          Designed & Developed by Victor Barreyre
        </p>
        <p className='copyright'>©</p>
      </div>

      {hoveredItem !== null && (
        <div className="mouse-overlay" style={{ top: mousePosition.y, left: mousePosition.x }}>
          <img style={{
            cursor:'none',
            width:'200px',
          }}
           src={data[hoveredItem].image} alt={data[hoveredItem].title} />
        </div>
      )}

    </div>
  );
};

export default Contact;
