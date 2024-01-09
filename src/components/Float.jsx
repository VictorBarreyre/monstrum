import React, { useState, useEffect } from 'react';
import data from '../data';

const Float = () => {
    const [positions, setPositions] = useState({});
    const [draggingItem, setDraggingItem] = useState(null);
    const [zIndex, setZIndex] = useState({});

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
            initialZIndex[index] = 0;
        });
        setPositions(initialPositions);
        setZIndex(initialZIndex);
    }, []);

    const onStart = (item, e) => {
        const event = e.touches ? e.touches[0] : e;
        e.preventDefault(); // Empêcher le comportement de glisser-déposer par défaut

        setDraggingItem(item);

        setPositions(prev => ({
            ...prev,
            [item]: {
                ...prev[item],
                startX: event.clientX,
                startY: event.clientY,
            },
        }));

        setZIndex(prevZIndex => ({
            ...prevZIndex,
            [item]: Math.max(...Object.values(prevZIndex)) + 1
        }));
    };

    const onMove = (e) => {
        if (draggingItem === null) return;
        const event = e.touches ? e.touches[0] : e;

        setPositions(prev => {
            const currentItem = prev[draggingItem];
            if (!currentItem) return prev;

            // Mise à jour des positions en fonction des mouvements
            const newX = event.clientX ;
            const newY = event.clientY ;

            return {
                ...prev,
                [draggingItem]: {
                    ...currentItem,
                    x: newX,
                    y: newY,
                },
            };
        });
    };

    const onEnd = () => {
        setDraggingItem(null);
    };

    const getItemStyle = (index) => {
        const position = positions[index];
        const zIndexValue = zIndex[index] || 0;
        return {
            transform: `translate(${position?.x}px, ${position?.y}px)`,
            position: 'absolute',
            zIndex: zIndexValue
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
                    <p className='title-float'>{item.title}</p>
                </div>
            ))}
        </div>
    );
}

export default Float;
