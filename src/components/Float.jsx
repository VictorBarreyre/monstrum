import React, { useState, useEffect } from 'react';

const Float = ({ data }) => {
    const [positions, setPositions] = useState({});
    const [draggingItem, setDraggingItem] = useState(null);
    const [zIndex, setZIndex] = useState({});
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        const initialPositions = {};
        const initialZIndex = {};
        data.forEach((_, index) => {
            initialPositions[index] = {
                x: Math.random() * (window.innerWidth - 100),
                y: Math.random() * (window.innerHeight - 100),
                startX: 0,
                startY: 0
            };
            initialZIndex[index] = 1; // Définit un zIndex de base pour tous les éléments
        });
        setPositions(initialPositions);
        setZIndex(initialZIndex);
    }, [data]);

    const onStart = (item, e) => {
        const event = e.touches ? e.touches[0] : e;
        setDraggingItem(item);

        const maxZIndex = Math.max(...Object.values(zIndex)) + 1;
        setZIndex(prevZIndex => ({
            ...prevZIndex,
            [item]: maxZIndex
        }));

        setShowTitle(true);

        setPositions(prev => ({
            ...prev,
            [item]: {
                ...prev[item],
                startX: event.clientX,
                startY: event.clientY,
            },
        }));
    };

    const onMove = (e) => {
        if (draggingItem === null) return;
        e.preventDefault(); // Empêcher le comportement par défaut ici

        const event = e.touches ? e.touches[0] : e;

        setPositions(prev => {
            const currentItem = prev[draggingItem];
            if (!currentItem) return prev;

            const newX = currentItem.x + (event.clientX - currentItem.startX);
            const newY = currentItem.y + (event.clientY - currentItem.startY);

            return {
                ...prev,
                [draggingItem]: {
                    ...currentItem,
                    x: newX,
                    y: newY,
                    startX: event.clientX,
                    startY: event.clientY,
                },
            };
        });
    };

    const onEnd = () => {
        setDraggingItem(null);
        setShowTitle(false);
    };

    const getItemStyle = (index) => {
        const position = positions[index];
        const zIndexValue = zIndex[index] || 1;
        const opacity = draggingItem === null || draggingItem === index ? 1 : 0; // Réduit l'opacité des non-sélectionnés
        return {
            transform: `translate(${position?.x}px, ${position?.y}px)`,
            position: 'absolute',
            zIndex: zIndexValue,
            opacity: opacity, // Applique l'opacité conditionnelle
        };
    };

    const getTitleStyle = () => {
        return {
            display: showTitle ? 'block' : 'none'
        };
    };

    return (
        <div className="gallery-container"
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onTouchMove={onMove}
            onTouchEnd={onEnd}>
            {data.map((item, index) => (
                <div key={index}
                    style={getItemStyle(index)}
                    className="gallery-item"
                    onMouseDown={(e) => onStart(index, e)}
                    onTouchStart={(e) => onStart(index, e)}>
                    <img src={item.image} alt={item.title} />
                    <div className='float-texte-flex'> 
                    <p style={getTitleStyle()} className='title-float'>{item.title}</p>
                    <p style={getTitleStyle()} className='title-float-details'>{item.details}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Float;
