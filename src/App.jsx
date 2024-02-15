import React, { useState } from 'react';
import './App.css';
import data from './data.jsx';
import Float from './components/Float.jsx';
import List from './components/List.jsx';
import Header from './components/Header.jsx';
import Contact from './components/Contact.jsx';
import Grid from './components/Grid.jsx';

function App() {
  const [activeComponent, setActiveComponent] = useState('List'); 
  const [hoverLay, setHoverlayOpen] = useState(false)


  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const openOverlayContact = () => {
    setHoverlayOpen(!hoverLay)
  };

  return (
    <>
    <Header 
      openOverlayContact={openOverlayContact}
      hoverLay={hoverLay}
      setActiveComponent={handleComponentChange} 
      activeComponent={activeComponent}/>  
      <Contact 
      data={data} 
      hoverLay={hoverLay}
      />
      {activeComponent === 'List' && <List data={data} />}
      {activeComponent === 'Grid' && <Grid data={data} />}
      {activeComponent === 'Float' && <Float data={data} />}
      
    </>
  );
}

export default App;
