import React, { useState, useEffect, useCallback, useRef } from 'react';

const List = ({ data }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const cursorImageRef = useRef(null); // Référence pour l'élément d'image du curseur

  const handleMouseEnter = useCallback((image) => {
    setHoveredImage(image);
    document.addEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (cursorImageRef.current) {
      cursorImageRef.current.style.left = `${e.pageX + 10}px`;
      cursorImageRef.current.style.top = `${e.pageY + 10}px`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredImage(null);
    document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);



  return (
    <div className='container-flex-list-item' style={{ cursor: 'none' }}> 
      <div className='flex-list-item'> 
        {data.map((item, index) => {
            const titleStyle = hoveredImage === item.image ? 
            { color: 'black', 
              backgroundImage: 'none',
              fontSize: '32px',
              marginBottom: '10vh',
              marginTop: '10vh',   } : 
            { backgroundImage: `url(${item.image})` };
          return (
            <div
              key={index}
              className="list-item"
              onMouseEnter={() => handleMouseEnter(item.image)}
              onMouseLeave={handleMouseLeave}
            >
              
              <span style={titleStyle} className='title-part'>{item.title}</span>
              <span style={titleStyle} className='title-part2'>{item.details}</span>
            </div>
          )
        })}
      </div>
      {hoveredImage && (
        <img
          ref={cursorImageRef}
          src={hoveredImage}
          alt="Cursor"
          style={{
            position: 'absolute',
            pointerEvents: 'none', // Important pour ne pas interférer avec d'autres éléments
            display: 'block',
            transform: 'translate(-50%, -50%)', // Centre l'image sur le curseur
            zIndex: 9999, // Assurez-vous qu'elle est au-dessus des autres éléments
            maxWidth: '400px', // Limite la taille de l'image du curseur
            maxHeight: '400px',
          }}
        />
      )}
    </div>
  );
}

export default List;
