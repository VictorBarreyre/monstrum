import React from 'react'

const Contact = ({ hoverLay, data }) => {


  return (
    <div className={hoverLay ? 'activeClassContact' : 'inactiveClassContact'}>
      <p className='quiestil'>
        Qui est il ? <br />
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
      </p>

      <p className='quiestil'>
        Contact :<br />
        Le Lorem Ipsum est simplement du faux texte employé dans la composition
      </p>

      <ul className='quiestil' >
        Index : <br />
        {data.map((item, index) => (
          <div key={index}>
            <div className='flex-grid-text'>
              <li className='quiestil'> {item.title}</li>
            </div>
          </div>
        ))}
      </ul>

      <div className='flexend-contact'> 
      <p className='quiestil'>
        Credit :<br />
       Designed & Developed by Victor Barreyre 
      </p>
      <p className='copyright'>©</p>
      </div>

    </div>
  )
}

export default Contact