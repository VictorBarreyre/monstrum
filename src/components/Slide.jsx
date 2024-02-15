import React, { useState, useEffect, useRef } from 'react';

const Slide = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);
  const cursorTitleRef = useRef(null);



  const handleWheel = (e) => {
    e.preventDefault();
    const sliderWidth = sliderRef.current.offsetWidth;
    const totalContentWidth = sliderRef.current.scrollWidth;
    const maxScrollPosition = totalContentWidth - sliderWidth / data.length;
    let newScrollPosition = scrollPosition - e.deltaY;

    //Clamper newScrollPosition dans les limites permises
    newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScrollPosition))

    if (newScrollPosition >= maxScrollPosition) {
      newScrollPosition = 0; //Re-start du scroll 
    } else if (newScrollPosition < 0) {
      newScrollPosition
    }


    // Calculez l'index de l'image basé sur la nouvelle position de scroll
    // Supposons que chaque image ait une largeur uniforme et que totalContentWidth inclut toutes les images
    const imageWidth = totalContentWidth / data.length;

    const indexBasedOnScroll = Math.floor(newScrollPosition / imageWidth);

    // Mettez à jour scrollPosition et l'image sélectionnée basée sur le scroll
    setScrollPosition(newScrollPosition);
    setSelectedImage(indexBasedOnScroll);
  };


  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('wheel', handleWheel, { passive: false });
      return () => slider.removeEventListener('wheel', handleWheel);
    }
  }, [scrollPosition]);

  const handleImageSelect = (index) => setSelectedImage(index);

  const centerStyle = () => ({
    position: 'fixed',
    maxWidth: '100vw',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    display: selectedImage !== null ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'end',
    marginTop: '5.5vh',
    '@media (max-width: 600px)': {
      maxWidth: 'unset',
      flexDirection: 'column',
      alignItems: 'center',
    }
  });


  useEffect(() => {
    const handleMouseMove = (e) => {
      // Vérifiez si l'image sélectionnée est affichée
      if (selectedImage !== null) {
        // Affichez et positionnez l'élément du titre du curseur
        cursorTitleRef.current.style.display = 'block';
        cursorTitleRef.current.style.left = `${e.pageX + 10}px`;
        cursorTitleRef.current.style.top = `${e.pageY + 10}px`;
        // Cachez le curseur lorsque l'utilisateur survole le conteneur
        sliderRef.current.style.cursor = 'none';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [selectedImage]);


  const getImageStyle = (index) => ({
    opacity: index === selectedImage ? 1 : 0.5, // Réduire l'opacité pour les images non sélectionnées
    transition: 'opacity 0.5s',
  });

  // Calculer les indices de l'image précédente et suivante
  const secondPreviousImageIndex = selectedImage > 0 ? selectedImage - 2 : data.length - 2;
  const previousImageIndex = selectedImage > 0 ? selectedImage - 1 : data.length - 1;
  const nextImageIndex = selectedImage < data.length - 1 ? selectedImage + 1 : 0;
  const secondnextImageIndex = selectedImage < data.length - 1 ? selectedImage + 2 : 0;


  return (
    
    <div className='slider-container' ref={sliderRef}>
          
      <div className='flex-slider-container' style={centerStyle()}>
  
        {data[secondPreviousImageIndex] && (
          <img
            className='flex-slider-img'
            src={data[secondPreviousImageIndex].image}
            alt={data[secondPreviousImageIndex].title}
            style={{ ...getImageStyle(secondPreviousImageIndex), filter: 'blur(2px)', margin:'1vh' }} // Appliquer une opacité réduite et un léger flou
          />
        )}
        {data[previousImageIndex] && (
          <img
            className='flex-slider-img'
            src={data[previousImageIndex].image}
            alt={data[previousImageIndex].title}
            style={{ ...getImageStyle(previousImageIndex), filter: 'blur(2px)', margin:'1vh' }} // Appliquer une opacité réduite et un léger flou
          />
        )}
        <div className='center-flex'> 
        <p className='slide-details'>{data[selectedImage]?.details} </p>
        {data[selectedImage] && (
          <img
            className='flex-slider-img'
            src={data[selectedImage].image}
            alt={data[selectedImage].title}
            style={{ ...getImageStyle(selectedImage),  margin:'1vh' }} // Image sélectionnée plus visible
          />
        )}
        </div>
        {data[nextImageIndex] && (
          <img
            className='flex-slider-img'
            src={data[nextImageIndex].image}
            alt={data[nextImageIndex].title}
            style={{ ...getImageStyle(nextImageIndex), filter: 'blur(2px)', margin:'1vh' }} // Appliquer une opacité réduite et un léger flou
          />
        )}

        {data[secondnextImageIndex] && (
          <img
            className='flex-slider-img'
            src={data[secondnextImageIndex].image}
            alt={data[secondnextImageIndex].title}
            style={{ ...getImageStyle(secondnextImageIndex),  filter: 'blur(2px)', margin:'1vh' }} // Appliquer une opacité réduite et un léger flou
          />
        )}

      </div>


      <div className='slider' style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="slide-item"
            onMouseEnter={() => handleImageSelect(index)}
            style={{ display: 'inline-block', margin: '0 1px' }}
          >
            <img
              className='slide-img'
              src={item.image}
              alt={item.title}
              style={{ opacity: selectedImage === index ? 1 : 0.2, transition: 'opacity 0.5s' }}
            />
          </div>
        ))}
      </div>
      <div
        ref={cursorTitleRef}
        style={{
          textAlign: 'center',
          fontSize: '28px',
          lineHeight: '28px',
          display: 'none', // Caché par défaut
          position: 'absolute',
          pointerEvents: 'none', // Assurez-vous que cela ne bloque pas les événements de souris
          zIndex: 10000, // Assurez-vous qu'il est au-dessus de tout
          // Ajoutez d'autres styles selon vos besoins, par exemple pour le fond, la couleur du texte, etc.
        }}
      >
        {data[selectedImage]?.title}
      </div>

    </div>
  );
};

export default Slide;
