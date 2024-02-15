import React from 'react';


const Slider = ({ columns,frames,setFrames, setColumns, setImageWidth, onChangeColumns }) => {

    const handleColumnChange = (e) => {
        const newColumns = parseInt(e.target.value);
        setColumns(newColumns);
        onChangeColumns(newColumns);

        let calculatedWidth;
        let newFrames = frames;

        if (newColumns === 5) {
            calculatedWidth = '19vw';
        } else if (newColumns === 4) {
            calculatedWidth = '24vw';
        } else if (newColumns === 3) {
            calculatedWidth = '32vw';
        } else if (newColumns === 2) {
            newFrames = '0fr';
            calculatedWidth = '32vw';
        } else if (newColumns === 1) {
            newFrames = '0fr';
            calculatedWidth = '32vw';
        }
        setImageWidth(calculatedWidth);
        setFrames(newFrames)
    
    };


    return (
        <div className="slider-container">
            <label className='topa'>{columns} colonnes</label>
            <input
                type="range"
                min="1"
                max="5"
                value={columns}
                onChange={handleColumnChange}
            />
        </div>

    );
};
export default Slider;
