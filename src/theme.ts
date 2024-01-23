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
const JHYellow = '#ffb900'
const JHYellow75 = '#BA8800'
const greyColorDark = '#3c464b'
const grey120ColorDark = '#1d1f20'
const primaryColor = JHYellow;
const secondaryColor = '#009697'
const successColor = '#70AE6E'
const backgroundColor = '#ffffff'
const paperColor = '#f7f9fa'
const infoColor = '#009697'
const errorColor = '#cc0000'
const textPrimaryColor = '#101828'
const textSecondaryColor = '#667085'
const greyLightMinus10BlackColor = '#EAEFF1'
const greyLightColor = '#C0CBCE'


const primaryColorDark = JHYellow
const secondaryColorDark = '#009697'
const successColorDark = '#94DDBC'
const backgroundColorDark = '#0a0a0a'
const paperColorDark = backgroundColorDark
const infoColorDark = '#009697'
const errorColorDark = '#cc0000'
const textPrimaryColorDark = '#f5f5f5'
const textSecondaryColorDark = '#93999f'
const grey40ColorDark = '#B1B5B7'
const grey80ColorDark = '#636B6E'

// Generate shades using Material-UI's color manipulation functions
export const customGreyPalette = {
    50: '#f5f8fa',
    100: '#ecedef',
    200: '#d7dcdf',
    300: '#bfc5cc',
    400: '#aab2b9',
    500: '#949ea7',
    600: '#7f8f99',
    700: '#69788a', // Your provided color
    800: '#525f7b',
    900: '#3c464b',
};

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
            paper: backgroundColor,
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
        divider: customGreyPalette[200],
        grey: customGreyPalette
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
            fontWeight: 600,
            fontSize: 14
        },
        h1: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h2: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h3: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h4: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h5: {
            fontWeight: 700,
            letterSpacing: -0.75
        },
        h6: {
            fontWeight: 700,
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
                    backgroundColor: customGreyPalette[100],
                    color: infoColor,
                    '&.selected-card': {
                        borderColor: tinycolor(secondaryColor).toRgbString(),
                        backgroundColor: tinycolor(primaryColor).toRgbString(),
                    },
                    '&.input-group-card': {
                        backgroundColor: paperColor,
                        border: borderStandard,
                        borderColor: customGreyPalette[200]
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
                    borderColor: customGreyPalette[200],
                },
                root: {
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: customGreyPalette[100],
                        },
                    },
                    '&.Mui-focused': {
                        boxShadow: `0 0 0px 4px ${tinycolor(primaryColor).setAlpha(.3).toRgbString()}`,
                    },
                    '&.Mui-error.Mui-focused': {
                        boxShadow: `0 0 0px 4px ${tinycolor(errorColor).setAlpha(.3).toRgbString()}`,
                    }
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: shadow1,
                    padding: 3,
                    border: `${borderStandard} ${customGreyPalette[200]}`,
                    backgroundColor: customGreyPalette[50]
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: 14,
                    border: 'none',
                    borderRadius: theme.shape.borderRadius,
                    "&.Mui-selected": {
                        borderRadius: `3px !important`,
                        // border: `${borderStandard} ${customGreyPalette[200]} !important`,
                        backgroundColor: backgroundColor,
                        boxShadow: shadow2
                    },
                    "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: backgroundColor,
                        color: primaryColor,
                        // border: `${borderStandard} ${customGreyPalette[200]}`,

                    }
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: shadow1,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-outlined': {
                        boxShadow: shadow1,
                    },
                    '&.MuiButton-outlined.Mui-disabled': {
                        border: `${borderStandard} ${customGreyPalette[100]}`,
                        color: customGreyPalette[200]
                    },
                    '&.MuiButton-outlinedPrimary': {
                        border: `${borderStandard} ${customGreyPalette[200]}`,
                        color: textSecondaryColor,
                        '&:hover': {
                            backgroundColor: customGreyPalette[50],
                            color: textPrimaryColor
                        },
                        '&:focus': {
                            boxShadow: `0 0 0 3px ${customGreyPalette[100]}`,
                            color: textSecondaryColor
                        },
                    },
                    '&.MuiButton-containedPrimary': {
                        color: textPrimaryColor,
                    },
                    '&.MuiButton-contained.Mui-disabled': {
                        color: customGreyPalette[400]
                    },
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px',
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
                    fontSize: 13,
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
                    backgroundColor: primaryColor,
                    color: theme.palette.getContrastText(primaryColor),
                    height: 24
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: greyLightColor,
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                track: {
                    height: 16,
                },
                rail: {
                    color: greyLightColor,
                    height: 16
                },
                thumb: {
                    color: backgroundColor,
                    border: `2px solid ${primaryColor}`,
                    height: 22,
                    width: 22,
                    boxShadow: shadow1
                },
                mark: {
                    color: '#ffffff00'
                },
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
                    margin: 10,
                    '& .MuiSwitch-switchBase': {
                        padding: 0,
                        margin: 2,
                        transitionDuration: '300ms',
                        '&.Mui-checked': {
                            transform: 'translateX(20px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: primaryColor,
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
                            color: customGreyPalette[100]
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: .5,
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxSizing: 'border-box',
                        width: 22,
                        height: 22,
                        boxShadow: shadow2
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 26 / 2,
                        backgroundColor: customGreyPalette[100],
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
            paper: paperColorDark
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
        grey: customGreyPalette
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
        body1: {
            fontWeight: 700,
            fontSize: 14
        },
        h1: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h2: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h3: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h4: {
            fontWeight: 700,
            letterSpacing: -1
        },
        h5: {
            fontWeight: 600,
            letterSpacing: -0.75
        },
        h6: {
            fontWeight: 600,
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
                    borderColor: '#000',
                    backgroundColor: backgroundColorDark,
                    boxShadow: shadow1
                },
                input: {
                }
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
                    },
                    '&.Mui-focused': {
                        boxShadow: `0 0 0px 4px ${tinycolor(primaryColorDark).setAlpha(.35).toRgbString()}`,
                    },
                    '&.Mui-error.Mui-focused': {
                        boxShadow: `0 0 0px 4px ${tinycolor(errorColor).setAlpha(.35).toRgbString()}`,
                    }
                },
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: shadow1,
                    padding: 3,
                    border: `${borderStandard} ${greyColorDark}`

                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: 14,
                    color: textSecondaryColorDark,
                    border: 'none',
                    borderRadius: theme.shape.borderRadius,
                    "&.Mui-selected": {
                        borderRadius: `3px !important`,
                        border: 'none',
                        boxShadow: shadow3,
                    },
                    "&.Mui-selected, .Mui-selected:hover": {
                        backgroundColor: paperColorDark,
                        color: primaryColorDark
                    }
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
                    boxShadow: 'none',
                    backgroundColor: paperColorDark,
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
                    fontSize: 13,
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
                    backgroundColor: paperColorDark,
                    color: primaryColor,
                    height: 24
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: greyColorDark,
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                track: {
                    height: 16,
                },
                rail: {
                    color: greyColorDark,
                    height: 16
                },
                thumb: {
                    backgroundColor: backgroundColorDark,
                    border: `2px solid ${primaryColorDark}`,
                    height: 22,
                    width: 22,
                    boxShadow: shadow1
                },
                mark: {
                    color: '#ffffff00'
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-outlined': {
                        boxShadow: shadow1,
                    },
                    '&.MuiButton-outlined.Mui-disabled': {
                        border: `${borderStandard} ${customGreyPalette[800]}`,
                        color: customGreyPalette[700]
                    },
                    '&.MuiButton-outlinedPrimary': {
                        border: `${borderStandard} ${customGreyPalette[700]}`,
                        // backgroundColor: customGreyPalette[900],
                        color: textPrimaryColorDark,
                        '&:hover': {
                            backgroundColor: customGreyPalette[900],
                            color: customGreyPalette[100]
                        },
                        '&:focus': {
                            boxShadow: `0 0 0 3px ${customGreyPalette[700]}`,
                            color: textSecondaryColorDark
                        },
                    }
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
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 46,
                    height: 26,
                    padding: 0,
                    margin: 10,
                    '& .MuiSwitch-switchBase': {
                        padding: 0,
                        margin: 2,
                        transitionDuration: '300ms',
                        '&.Mui-checked': {
                            transform: 'translateX(20px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: primaryColorDark,
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
                            color: customGreyPalette[100]
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: .5,
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxSizing: 'border-box',
                        width: 22,
                        height: 22,
                        boxShadow: shadow2
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 26 / 2,
                        backgroundColor: greyColorDark,
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

export default theme