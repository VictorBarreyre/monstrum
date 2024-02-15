import React from 'react'

const Contact = ({hoverLay}) => {
  
  return (
    <div className={hoverLay? 'activeClassContact' : 'inactiveClassContact'}>
      <p className='quiestil'> 
      Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
      </p>
    
    </div>
  )
}

export default Contact