import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import '../style/MobileScrollButton.css'; // Import the CSS file for your animations

const ScrollButton = () => {
    const [buttonClass, setButtonClass] = useState('scroll-button');

    const handleScroll = () => {
        if (window.scrollY > 220) { // Adjust the threshold value as needed
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
                sx={{
                    position: 'fixed',
                    top: '5%',
                    left: 'auto', // Set right to auto
                    right: '25px',    // Center horizontally
                    transition: 'all .25s ease',
                    visibility: `${window.scrollY > 200 ? 'visible' : 'collapse'}`,
                }}
                size='small'
                className={buttonClass}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <KeyboardDoubleArrowUpIcon />
            </Fab>

        </div>
    );
};

export default ScrollButton;
