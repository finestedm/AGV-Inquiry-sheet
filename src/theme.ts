import { outlinedInputClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import tinycolor from 'tinycolor2';

export let theme = createTheme({})

//shadows
const shadowColor1 = 'hsla(220, 43%, 11%, 5%)';
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
// Generate shades using Material-UI's color manipulation functions
export const customGreyPalette = {

    25: '#FCFCFD',
    50: '#F8FAFC',
    100: '#EEF2F6',
    200: '#E3E8EF',
    300: '#CDD5DF',
    400: '#9AA4B2',
    500: '#697586',
    600: '#4B5565',
    700: '#364152',
    800: '#364152',
    900: '#121926',
    950: '#0D121C'
};

export const customGreyPaletteDark = {

    25: '#FAFAFA',
    50: '#F5F5F6',
    100: '#F0F1F1',
    200: '#ECECED',
    300: '#CECFD2',
    400: '#94969C',
    500: '#61646C',
    600: '#61646C',
    700: '#333741',
    800: '#1F242F',
    900: '#161B26',
    950: '#0C111D'
};

//colors
const JHYellow = '#ffb900'
const JHYellow75 = '#BA8800'
const greyColorDark = '#3c464b'
const grey120ColorDark = '#1d1f20'
const primaryColor = JHYellow;
const secondaryColor = '#009697'
const successColor = '#70AE6E'
const backgroundColor = '#f8fafc'
const paperColor = '#fff'
const infoColor = '#009697'
const errorColor = '#cc0000'
const textPrimaryColor = '#101828'
const textSecondaryColor = '#667085'
const greyLightMinus10BlackColor = '#EAEFF1'
const greyLightColor = '#C0CBCE'


const primaryColorDark = JHYellow
const secondaryColorDark = '#009697'
const successColorDark = '#94DDBC'
const backgroundColorDark = '#1f1f21'
const paperColorDark = '#161618'
const infoColorDark = '#009697'
const errorColorDark = '#cc0000'
const textPrimaryColorDark = customGreyPaletteDark[50]
const textSecondaryColorDark = customGreyPaletteDark[400]
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
            primary: customGreyPalette[900],
            secondary: customGreyPalette[700]
        },
        divider: customGreyPalette[200],
        grey: customGreyPalette
    },
    shape: {
        borderRadius: 1
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
                    border: `${borderStandard} ${customGreyPalette[300]}`,
                    boxShadow: shadow3,
                    '&.system-card': {
                        backgroundColor: backgroundColor,
                        '&.selected-card': {
                            borderColor: primaryColor,
                            color: textPrimaryColor,
                            backgroundColor: tinycolor(primaryColor).setAlpha(.05).toHex8String(),
                            // backgroundColor: tinycolor(primaryColor).toRgbString(),
                        },
                    },
                    '&.input-group-card': {
                        backgroundColor: paperColor,
                        border: borderStandard,
                        borderColor: customGreyPalette[200]
                    }
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    borderBottom: `${borderStandard} ${customGreyPalette[200]}`,
                    marginBottom: 16

                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    borderTop: `${borderStandard} ${customGreyPalette[200]}`,
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
                    backgroundColor: paperColor,
                    boxShadow: shadow1,
                },

            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: customGreyPalette[200],
                },
                root: {
                    '& .MuiInputBase-inputSizeSmall': {
                        padding: '14px 10px'
                    },

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
                    backgroundColor: customGreyPalette[100],
                    border: `${borderStandard} ${customGreyPalette[300]}`,
                    overflow: 'hidden',
                    '&.MuiToggleButtonGroup-error': {
                        backgroundColor: tinycolor(theme.palette.error.main).brighten(77).toRgbString(),
                        border: `${borderStandard} ${theme.palette.error.dark}`,
                    }
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: 14,
                    color: textSecondaryColor,
                    border: 'none',
                    borderRadius: '1px !important',
                    "&.MuiToggleButton-sizeSmall": {
                        padding: '2px 6px'
                    },
                    "&.Mui-disabled": {
                        border: 'none'
                    },
                    "&.Mui-selected": {
                        backgroundColor: paperColor,
                        color: textPrimaryColor,
                        boxShadow: shadow3,
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: paperColor,
                        color: textPrimaryColor,
                        boxShadow: shadow3,
                    },
                    "&:hover": {
                        backgroundColor: customGreyPalette[50],
                        color: textPrimaryColor,
                    },
                    "&.Mui-error": {
                        color: theme.palette.error.main,
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
                        backgroundColor: paperColor
                    },
                    '&.MuiButton-outlined.Mui-disabled': {
                        border: `${borderStandard} ${customGreyPalette[100]}`,
                        color: customGreyPalette[200],
                        backgroundColor: customGreyPalette[50]
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

                        color: tinycolor(primaryColor).darken(10).toHex8String(),
                        backgroundColor: tinycolor(primaryColor).lighten(12).setAlpha(.45).toHex8String(),
                        boxShadow: 'none',
                        '&:hover': {
                            color: tinycolor(primaryColor).darken(15).toHex8String(),
                            backgroundColor: tinycolor(primaryColor).setAlpha(.45).toHex8String(),
                        }
                    },

                    '&.MuiButton-contained.Mui-disabled': {
                        color: customGreyPalette[300],
                        backgroundColor: customGreyPalette[200]

                    },
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px',
                    backgroundColor: paperColor
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    borderBottom: `1px solid ${customGreyPalette[300]}`,
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
                    backgroundColor: customGreyPalette[600],
                    color: theme.palette.getContrastText(customGreyPalette[600]),
                    height: 24
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: customGreyPalette[400],
                    "& .MuiSvgIcon-root": {
                        fill: customGreyPalette[600],
                    },
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                track: {
                    height: 10,
                    color: customGreyPalette[600],

                },
                rail: {
                    color: customGreyPalette[400],
                    height: 12
                },
                thumb: {
                    color: backgroundColor,
                    border: `2px solid ${customGreyPalette[600]}`,
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
                        backgroundColor: paperColor,
                        color: textSecondaryColor,
                        border: `1px solid ${greyLightColor}`
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
                                backgroundColor: customGreyPalette[600],
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
                        backgroundColor: customGreyPalette[300],
                        opacity: 1,
                        transition: theme.transitions.create(['background-color'], {
                            duration: 500,
                        }),
                    },
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    border: `${borderStandard} ${customGreyPalette[300]}`,
                    backgroundColor: paperColor,
                    color: theme.palette.getContrastText(paperColor),
                    boxShadow: shadow8
                }
            }
        }
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
            primary: customGreyPaletteDark[50],
            secondary: customGreyPaletteDark[300]
        },
        grey: customGreyPaletteDark,
        divider: customGreyPaletteDark[700],
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
            fontWeight: 500,
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
                    border: `${borderStandard} ${customGreyPaletteDark[700]}`,
                    backgroundImage: 'none',
                    '&.system-card': {
                        backgroundColor: paperColorDark,
                        '&.selected-card': {
                            borderColor: primaryColorDark,
                            color: textPrimaryColorDark,
                            backgroundColor: tinycolor(primaryColorDark).setAlpha(.075).toHex8String(),
                            // backgroundColor: tinycolor(primaryColor).toRgbString(),
                        },
                    },
                    '&.input-group-card': {
                        backgroundColor: paperColor,
                        border: borderStandard,
                        borderColor: customGreyPaletteDark[700]
                    }
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: backgroundColorDark,
                },
                paper: {
                    backgroundImage: 'none',
                    backgroundColor: backgroundColorDark
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    borderBottom: `${borderStandard} ${customGreyPaletteDark[700]}`,
                    marginBottom: 16
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    borderTop: `${borderStandard} ${customGreyPaletteDark[700]}`,
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
                    backgroundColor: paperColorDark,
                    // boxShadow: shadow1,
                    // color: textPrimaryColorDark

                },
                input: {
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: customGreyPaletteDark[700],
                },
                root: {
                    '& .MuiInputBase-inputSizeSmall': {
                        padding: '14px 10px'
                    },
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: customGreyPaletteDark[900]
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
                    padding: 3,
                    backgroundColor: paperColorDark,
                    border: `${borderStandard} ${customGreyPaletteDark[700]}`,
                    overflow: 'hidden'
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
                    "&.MuiToggleButton-sizeSmall": {
                        padding: '2px 6px'
                    },
                    borderRadius: '1px !important',
                    "&.Mui-disabled": {
                        border: 'none'
                    },
                    "&.Mui-selected": {
                        backgroundColor: customGreyPaletteDark[700],
                        color: textPrimaryColorDark,
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: customGreyPaletteDark[700],
                        color: textPrimaryColorDark,
                    },
                    "&:hover": {
                        backgroundColor: customGreyPaletteDark[800],
                        color: textPrimaryColorDark,
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 6px',
                    backgroundColor: paperColorDark
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: paperColorDark,
                    backgroundImage: 'none',
                    borderBottom: `1px solid ${customGreyPaletteDark[700]}`,
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
                    fontWeight: 500,
                    textAlign: 'left'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: 13,
                    fontWeight: 500
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
                    backgroundColor: customGreyPaletteDark[700],
                    color: textPrimaryColorDark,
                    height: 24
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: customGreyPaletteDark[600],
                    "& .MuiSvgIcon-root": {
                        fill: customGreyPaletteDark[200],
                    },
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                track: {
                    height: 10,
                    color: customGreyPaletteDark[200],
                },
                rail: {
                    color: customGreyPaletteDark[600],
                    height: 12
                },
                thumb: {
                    backgroundColor: backgroundColorDark,
                    border: `2px solid ${customGreyPaletteDark[300]}`,
                    height: 22,
                    width: 22,
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
                        backgroundColor: paperColorDark
                    },
                    '&.MuiButton-outlined.Mui-disabled': {
                        border: `${borderStandard} ${customGreyPaletteDark[900]}`,
                        color: customGreyPaletteDark[700],
                        backgroundColor: customGreyPaletteDark[950]
                    },
                    '&.MuiButton-outlinedPrimary': {
                        border: `${borderStandard} ${customGreyPaletteDark[700]}`,
                        // backgroundColor: customGreyPalette[900],
                        color: textPrimaryColorDark,
                        '&:hover': {
                            backgroundColor: customGreyPaletteDark[700],
                            color: customGreyPaletteDark[100]
                        },
                        '&:focus': {
                            boxShadow: `0 0 0 3px ${customGreyPaletteDark[700]}`,
                            color: textPrimaryColorDark
                        },
                    },
                    '&.MuiButton-containedPrimary': {
                        color: primaryColorDark,
                        backgroundColor: tinycolor(primaryColorDark).lighten(12).setAlpha(.25).toHex8String(),
                        boxShadow: 'none',
                        '&:hover': {
                            color: tinycolor(primaryColorDark).lighten(12).toHex8String(),
                            backgroundColor: tinycolor(primaryColorDark).lighten(25).setAlpha(.25).toHex8String(),
                        }
                    },
                    '&.MuiButton-contained.Mui-disabled': {
                        color: customGreyPaletteDark[600],
                        backgroundColor: customGreyPaletteDark[700]

                    },
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&.extender-icon': {
                        // backgroundColor: greyColorDark,
                        color: textSecondaryColorDark,
                        border: `1px solid ${customGreyPaletteDark[600]}`
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
                                backgroundColor: customGreyPaletteDark[500],
                                border: `${borderStandard} ${customGreyPaletteDark[500]}`,
                                opacity: 1,
                                transition: theme.transitions.create(['border'], {
                                    duration: 500,
                                }),
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
                            color: customGreyPaletteDark[100]
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
                        border: `${borderStandard} ${customGreyPaletteDark[700]}`,
                        backgroundColor: paperColorDark,
                        opacity: 1,
                        transition: theme.transitions.create(['background-color'], {
                            duration: 500,
                        }),
                    },
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none'
                }
            }
        }
    },
}
);

export default theme