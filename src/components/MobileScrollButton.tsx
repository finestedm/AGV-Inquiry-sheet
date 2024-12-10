import { useState, useEffect, useRef } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Box } from '@mui/material';

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null); // Ref for the target element

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting); // Button is visible when target is not in view
            },
            { threshold: 0.1 } // Trigger when 10% of the target is visible
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    return (
        <Box>
            <Box
                ref={targetRef}
                position='absolute'
                top={200}
                visibility='hidden'
/>
            <Fab
                sx={{
                    position: 'fixed',
                    top: 50,
                    right: '25px',
                    transition: 'all .25s ease',
                    visibility: isVisible ? 'visible' : 'collapse',
                }}
                size="small"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <KeyboardDoubleArrowUpIcon />
            </Fab>
        </Box>
    );
};

export default ScrollButton;
