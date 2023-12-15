import { createTheme } from '@mui/material/styles';
import { deDE, plPL } from '@mui/x-date-pickers/locales';

export let theme = createTheme({})

//shadows
const shadowColor1 = 'hsla(220, 43%, 11%, 8%)';
const shadowColor2 = 'hsla(220, 43%, 11%, 15%)';
const shadowColor3 = 'hsla(220, 43%, 11%, 30%)';
const shadowColor4 = 'hsla(220, 43%, 11%, 50%)';

const shadow1 = `0px 1px 2px ${shadowColor1}`;
const shadow2 = `0px 2px 4px ${shadowColor1}`;
const shadow3 = `0px 4px 6px ${shadowColor1}`;
const shadow4 = `0px 6px 8px ${shadowColor1}`;
const shadow5 = `0px 8px 10px ${shadowColor2}`;
const shadow6 = `0px 10px 12px ${shadowColor2}`;
const shadow7 = `0px 12px 14px ${shadowColor2}`;
const shadow8 = `0px 14px 16px ${shadowColor2}`;
const shadow9 = `0px 16px 18px ${shadowColor2}`;
const shadow10 = `0px 18px 20px ${shadowColor3}`;
const shadow11 = `0px 20px 22px ${shadowColor3}`;
const shadow12 = `0px 22px 24px ${shadowColor3}`;
const shadow13 = `0px 24px 26px ${shadowColor3}`;
const shadow14 = `0px 26px 28px ${shadowColor3}`;
const shadow15 = `0px 28px 30px ${shadowColor3}`;
const shadow16 = `0px 30px 32px ${shadowColor3}`;
const shadow17 = `0px 32px 34px ${shadowColor3}`;
const shadow18 = `0px 34px 36px ${shadowColor4}`;
const shadow19 = `0px 36px 38px ${shadowColor4}`;
const shadow20 = `0px 38px 40px ${shadowColor4}`;
const shadow21 = `0px 40px 42px ${shadowColor4}`;
const shadow22 = `0px 42px 44px ${shadowColor4}`;
const shadow23 = `0px 44px 46px ${shadowColor4}`;
const shadow24 = `0px 46px 48px ${shadowColor4}`;


//borders
const borderStandard = `1px solid`

theme = createTheme({
    palette: {
        primary: {
            main: '#3c464b',
        },
        secondary: {
            main: '#009697',
        },
        success: {
            main: '#70AE6E',
        },
        background: {
            default: '#ffffff'
        },
        info: {
            main: '#009697'
        },
        error: {
            main: '#cc0000'
        },
        text: {
            primary: '#3c464b',
            secondary: '#636b6e'
        },

    },
    shape: {
        borderRadius: theme.shape.borderRadius * 3
    },

    typography: {
        fontFamily: [
            'Manrope', // Primary font
            'sans-serif',
        ].join(','),
        h1: {
            color: '#7b8082',
            fontWeight: 600,
            letterSpacing: -1
        },
        h2: {
            color: '#7b8082',
            fontWeight: 600,
            letterSpacing: -1
        },
        h3: {
            color: '#7b8082',
            fontWeight: 600,
            letterSpacing: -1
        },
        h4: {
            color: '#7b8082',
            fontWeight: 600,
            letterSpacing: -1
        },
        h5: {
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: -0.75
        },
        h6: {
            color: theme.palette.text.secondary,
            fontWeight: 500,
            letterSpacing: -0.5
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
        shadow11,
        shadow12,
        shadow13,
        shadow14,
        shadow15,
        shadow16,
        shadow17,
        shadow18,
        shadow19,
        shadow20,
        shadow21,
        shadow22,
        shadow23,
        shadow24,

    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius * 10
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    // boxShadow: shadow5,
                    border: borderStandard,
                    borderColor: theme.palette.grey[200],
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: "12ch", // Customize the minimum width as per your requirement
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 6px', // Adjust the padding as per your requirements
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none'
                }
            }
        },
    },
}
);


export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#18191a',
            paper: '#131515'
        },
        primary: {
            main: '#ffb900',
        },
        secondary: {
            main: '#009697',
        },
        success: {
            main: '#94DDBC',
        },
        info: {
            main: '#009697'
        },
        error: {
            main: '#cc0000'
        },
        text: {
            primary: '#eff1f2',
            secondary: '#7e878a'
        }
    },
    shape: {
        borderRadius: theme.shape.borderRadius
    },

    typography: {
        fontFamily: [
            'Manrope', // Primary font
            'sans-serif',
        ].join(','),
        h1: {
            color: '#979d9f',
            fontWeight: 600,
            letterSpacing: -1
        },
        h2: {
            color: '#979d9f',
            fontWeight: 600,
            letterSpacing: -1
        },
        h3: {
            color: '#979d9f',
            fontWeight: 600,
            letterSpacing: -1
        },
        h4: {
            color: '#979d9f',
            fontWeight: 600,
            letterSpacing: -1
        },
        h5: {
            color: '#c0c7ca',
            fontWeight: 600,
            letterSpacing: -0.75
        },
        h6: {
            color: '#c0c7ca',
            fontWeight: 500,
            letterSpacing: -0.5
        },
    },


    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius * 10
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: shadow5,
                    border: borderStandard,
                    borderColor: theme.palette.grey[800]
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: "12ch", // Customize the minimum width as per your requirement
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 6px', // Adjust the padding as per your requirements
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: '#131515',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }
            }
        }
    },
}
);

export default theme