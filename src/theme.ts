import { createTheme } from '@mui/material/styles';
import { deDE, plPL } from '@mui/x-date-pickers/locales';
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
const greyColorDark = '#3C464B'
const grey120ColorDark = '#1d1f20'
const primaryColor = greyColorDark
const secondaryColor = '#009697'
const successColor = '#70AE6E'
const backgroundColor = '#ffffff'
const infoColor = '#009697'
const errorColor = '#cc0000'
const textPrimnaryColor = primaryColor
const textSecondaryColor = '#707679'
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
const textSecondaryColorDark = '#989b9f'
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
            paper: backgroundColor,
        },
        info: {
            main: infoColor
        },
        error: {
            main: errorColor
        },
        text: {
            primary: textPrimnaryColor,
            secondary: textSecondaryColor
        },

    },
    shape: {
        borderRadius: 1
    },

    typography: {
        fontFamily: [
            'Manrope', // Primary font
            'sans-serif',
        ].join(','),
        h1: {
            color: grey80ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h2: {
            color: grey80ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h3: {
            color: grey80ColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h4: {
            color: grey80ColorDark,
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
                    boxShadow: 'none',
                    borderWidth: 1,
                    borderColor: 'transparent',
                    backgroundColor: greyLightMinus10BlackColor,
                    color: infoColor,
                    '&.selected-card': {
                        borderColor: tinycolor(secondaryColor).toRgbString(),
                        backgroundColor: tinycolor(primaryColor).toRgbString(),
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: "12ch",
                    borderColor: '#000'

                },
                input: {
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: greyLightColor,
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
                    backgroundColor: 'white',
                    borderBottom: `1px solid ${theme.palette.divider}`,
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
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: 'left'
                }
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
                    backgroundColor: greyLightMinus10BlackColor
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
        h1: {
            color: primaryColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h2: {
            color: primaryColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h3: {
            color: primaryColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h4: {
            color: primaryColorDark,
            fontWeight: 600,
            letterSpacing: -1
        },
        h5: {
            color: textSecondaryColorDark,
            fontWeight: 600,
            letterSpacing: -0.75
        },
        h6: {
            color: textSecondaryColorDark,
            fontWeight: 500,
            letterSpacing: -0.5
        },
    },


    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadius * 100
                }
            }
        },
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: "12ch",
                },
                input: {
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "14px",
                    paddingBottom: "14px"
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: greyColorDark,
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
                    borderBottom: `1px solid ${theme.palette.divider}`,
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
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: 'left'
                }
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
                    backgroundColor: greyColorDark
                }
            }
        }
    },
}
);

export default theme