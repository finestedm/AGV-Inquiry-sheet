import { outlinedInputClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import tinycolor from 'tinycolor2';

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

//colors
const greyColorDark = '#131313'
const grey120ColorDark = '#1d1f20'
const primaryColor = greyColorDark
const secondaryColor = '#009697'
const successColor = '#70AE6E'
const backgroundColor = '#ffffff'
const paperColor = '#f7f9fa'
const infoColor = '#009697'
const errorColor = '#cc0000'
const textPrimaryColor = '#101828'
const textSecondaryColor = '#667085'
const greyLightMinus10BlackColor = '#EAEFF1'
const greyLightColor = '#D7DADB'

const JHYellow = '#ffb900'
const JHYellow75 = '#BA8800'
const primaryColorDark = JHYellow
const secondaryColorDark = '#009697'
const successColorDark = '#94DDBC'
const backgroundColorDark = '#18191a'
const infoColorDark = '#009697'
const errorColorDark = '#cc0000'
const textPrimaryColorDark = '#eff1f2'
const textSecondaryColorDark = '#b4b9bc'
const grey40ColorDark = '#B1B5B7'
const grey80ColorDark = '#636B6E'


theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        success: {
            main: successColor,
        },
        background: {
            default: backgroundColor,
            paper: paperColor,
        },
        info: {
            main: infoColor
        },
        error: {
            main: errorColor
        },
        text: {
            primary: textPrimaryColor,
            secondary: textSecondaryColor
        },
        divider: greyLightColor
    },
    shape: {
        borderRadius: 6
    },

    typography: {
        fontFamily: [
            'Manrope', // Primary font
            'sans-serif',
        ].join(','),
        fontWeightRegular: 500,
        body1: {
            fontWeight: 500,
            fontSize: 14
        },
        h1: {
            fontWeight: 600,
            letterSpacing: -1
        },
        h2: {
            fontWeight: 600,
            letterSpacing: -1
        },
        h3: {
            fontWeight: 600,
            letterSpacing: -1
        },
        h4: {
            fontWeight: 600,
            letterSpacing: -1
        },
        h5: {
            fontWeight: 600,
            letterSpacing: -0.75
        },
        h6: {
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
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderWidth: 1,
                    borderColor: 'transparent',
                    backgroundColor: greyLightMinus10BlackColor,
                    color: infoColor,
                    '&.selected-card': {
                        borderColor: tinycolor(secondaryColor).toRgbString(),
                        backgroundColor: tinycolor(primaryColor).toRgbString(),
                    },
                    '&.input-group-card': {
                        backgroundColor: paperColor,
                        border: borderStandard,
                        borderColor: greyLightMinus10BlackColor
                    }
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
        MuiTextField: {
            styleOverrides: {
                root: {
                    input: {
                        "&:-webkit-autofill": {
                            WebkitBoxShadow: `0 0 0 100px ${tinycolor(JHYellow).lighten(40).toRgbString()} inset`,
                        },
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: "12ch",
                    borderColor: '#000',
                    backgroundColor: backgroundColor,
                    boxShadow: shadow1
                },
                input: {
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: greyLightColor,
                },
                root: {
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: tinycolor(greyLightColor).brighten(10).toRgbString(),
                        },
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: shadow1
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: shadow1
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: shadow1
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 6px',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderBottom: `1px solid ${greyLightColor}`,
                    boxShadow: 'none',
                    '&.mobile-stepper': {
                        backgroundColor: '#ffffffAA',
                        backdropFilter: 'blur(5px)'
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: 'left'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: 14,
                    fontWeight: 600
                },
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    textAlign: 'left'
                }
            }
        },
        MuiMobileStepper: {
            styleOverrides: {
                dotActive: {
                    // Your custom styles for the active dot
                    width: 20,
                    borderRadius: 1000

                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: "blur(3px)",
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: greyLightMinus10BlackColor,
                    height: 24
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&.extender-icon': {
                        // backgroundColor: greyColorDark,
                        color: textSecondaryColor,
                        border: `1px solid ${greyLightColor}`
                    }
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: paperColor,
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 46,
                    height: 26,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 0,
                        margin: 2.5,
                        transitionDuration: '300ms',
                        '&.Mui-checked': {
                            transform: 'translateX(20px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : primaryColor,
                                opacity: 1,
                                border: 0,
                            },
                            '&.Mui-disabled + .MuiSwitch-track': {
                                opacity: 0.5,
                            },
                        },
                        '&.Mui-focusVisible .MuiSwitch-thumb': {
                            color: '#33cf4d',
                            border: '6px solid #fff',
                        },
                        '&.Mui-disabled .MuiSwitch-thumb': {
                            color:
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[600],
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxSizing: 'border-box',
                        width: 21,
                        height: 21,
                        boxShadow: shadow3
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 26 / 2,
                        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
                        opacity: 1,
                        transition: theme.transitions.create(['background-color'], {
                            duration: 500,
                        }),
                    },
                }
            }
        },
    },
}
);

export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primaryColorDark,
        },
        secondary: {
            main: secondaryColorDark,
        },
        success: {
            main: successColorDark,
        },
        background: {
            default: backgroundColorDark,
            paper: grey120ColorDark
        },
        info: {
            main: infoColorDark
        },
        error: {
            main: errorColorDark
        },
        text: {
            primary: textPrimaryColorDark,
            secondary: textSecondaryColorDark
        },
    },
    shape: {
        borderRadius: theme.shape.borderRadius
    },

    typography: {
        fontFamily: [
            'Manrope', // Primary font
            'sans-serif',
        ].join(','),
        fontWeightRegular: 500,
        h1: {
            color: grey40ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h2: {
            color: grey40ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h3: {
            color: grey40ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h4: {
            color: grey40ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h5: {
            color: textSecondaryColor,
            fontWeight: 600,
            letterSpacing: -0.75
        },
        h6: {
            color: textSecondaryColor,
            fontWeight: 500,
            letterSpacing: -0.5
        },
    },


    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderWidth: 1,
                    borderColor: 'transparent',
                    backgroundColor: grey120ColorDark,
                    '&.selected-card': {
                        borderColor: tinycolor(primaryColorDark).toRgbString(),
                        backgroundColor: tinycolor(primaryColorDark).toRgbString(),
                    }
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
        MuiTextField: {
            styleOverrides: {
                root: {
                    input: {
                        "&:-webkit-autofill": {
                            WebkitBoxShadow: `0 0 0 100px ${tinycolor(JHYellow).darken(27).toRgbString()} inset`,
                        },
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: "12ch",
                    backgroundColor: backgroundColorDark
                },
                input: {
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: greyColorDark,
                },
                root: {
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: tinycolor(greyColorDark).darken(10).toRgbString(),
                        },
                    }
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 6px',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: grey120ColorDark,
                    borderBottom: `1px solid ${greyColorDark}`,
                    '&.mobile-stepper': {
                        backgroundColor: '#131515AA',
                        backdropFilter: 'blur(5px)'
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: 'left'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: 14,
                    fontWeight: 600
                },
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    textAlign: 'left'
                }
            }
        },
        MuiMobileStepper: {
            styleOverrides: {
                dotActive: {
                    // Your custom styles for the active dot
                    width: 20,
                    borderRadius: 1000
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: "blur(3px)",
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: greyColorDark,
                    height: 24
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&.extender-icon': {
                        // backgroundColor: greyColorDark,
                        color: textSecondaryColorDark,
                        border: `1px solid ${greyColorDark}`
                    }
                }
            }
        }
    },
}
);

export default theme