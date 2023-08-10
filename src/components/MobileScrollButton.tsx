import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import '../style/MobileScrollButton.css'; // Import the CSS file for your animations

const ScrollButton = () => {
    const [buttonClass, setButtonClass] = useState('scroll-button');

    const handleScroll = () => {
        if (window.scrollY > 200) { // Adjust the threshold value as needed
            setButtonClass('scroll-button show')
        } else {
            setButtonClass('scroll-button')
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <Fab
                sx={{ position: 'fixed', bottom: '10%', right: '5%', transition: 'all .25s ease', transform: `${window.scrollY > 200 ? 'scale(1)' : 'scale(0)'}` }}
                color="primary"
                className={buttonClass} // Add the class for styling and animation
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <KeyboardDoubleArrowUpIcon />
            </Fab>
        </div>
    );
};

export default ScrollButton;
