import React from 'react';


const Grid = ({ data }) => {


  return (
    <div className='grid-container'>
      <div className='grid'>
        {data.map((item, index) => (
          <div key={index} className="grid-item" >
            <img src={item.image} alt={item.title} />
            <div className='flex-grid-text'> 
            <p className='title-grid'> {item.title} {item.details}</p>
            </div>
          </div>
     
        ))}
      </div>
    
    </div>
  );
}

export default Grid;
