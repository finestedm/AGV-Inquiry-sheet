import { createTheme } from '@mui/material/styles';

export let theme = createTheme({})

//shadows
const shadowColor = 'hsla(220, 43%, 11%, 30%)'
const shadowColor2 = 'hsla(220, 43%, 11%, 8%)'
const shadowColor3 = 'hsla(220, 43%, 11%, 15%)'

const shadow1 = `0px 1px 2px ${shadowColor}`
const shadow2 = `0px 2px 4px ${shadowColor2}`
const shadow3 = `0px 5px 10px ${shadowColor2}`
const shadow4 = `0px 8px 15px ${shadowColor2}`
const shadow5 = `0px 10px 20px ${shadowColor3}`
const shadow6 = `0px 12px 25px ${shadowColor3}`
const shadow7 = `0px 15px 30px ${shadowColor3}`
const shadow8 = `0px 18px 35px ${shadowColor3}`
const shadow9 = `0px 20px 40px ${shadowColor3}`
const shadow10 = `0px 23px 45px ${shadowColor3}`

const shadowsArray = [
    "none",
    shadow1,
    shadow2,
    shadow3,
    shadow4,
    shadow5,
    shadow6,
    shadow7,
    shadow8,
    shadow9,
    shadow10,
    "none", // Add "none" for the missing levels
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
];

//borders
const borderStandard = `1px solid`

theme = createTheme({
    palette: {
        primary: {
            main: '#3c464b',
        },
        secondary: {
            main: '#ffb900',
        },
        success: {
            main: '#0082A4',
        },
    },



    shadows: [
        "none",
        shadow1,
        shadow2,
        shadow3,
        shadow4,
        shadow5,
        shadow6,
        shadow7,
        shadow8,
        shadow9,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,
        shadow10,

    ],
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: shadow5,
                    border: borderStandard,
                    borderColor: theme.palette.grey[200]
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '1.25rem',
                },
            },
        },
        
    },
});

export default theme