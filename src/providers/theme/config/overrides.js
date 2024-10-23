import { hexToRgba } from '../helpers';

export const getOverrides = (theme) => {
  const IS_DARK = theme.palette.mode === 'dark';

  return {
    MuiAppBar: {
      colorDefault: {
        backdropFilter: 'blur(6px)',
        boxShadow: 'none',
        backgroundColor: hexToRgba(theme.palette.background.default, 0.72)
      }
    },
    MuiToolbar: {
      regular: theme.mixins.toolbar
    },
    MuiContainer: {
      root: {
        [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
          paddingLeft: theme.spacing,
          paddingRight: theme.spacing
        }
      }
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    MuiFormControlLabel: {
      root: {
        marginLeft: 0
      }
    },
    MuiInputLabel: {
      root: {
        '&.Mui-error + .MuiInputBase-adornedEnd': {
          '& .MuiSvgIcon-root': {
            fill: `${theme.palette.error.main} !important`
          }
        }
      },
      shrink: {
        color: theme.palette.secondary.main,
        '&.Mui-focused + .MuiInputBase-adornedEnd': {
          '& .MuiSvgIcon-root': {
            fill: theme.palette.primary.main
          }
        },
        '& + .MuiInputBase-adornedEnd': {
          '& .MuiSvgIcon-root': {
            fill: theme.palette.secondary.main
          }
        }
      },
      outlined: {
        transform: 'translate(14px, 18px) scale(1)'
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: `${hexToRgba(
          theme.palette.text.primary,
          0.07
        )} !important`,
        borderRadius: theme.shape.borderRadius,
        '&.Mui-disabled': {
          backgroundColor: `${hexToRgba(
            theme.palette.text.primary,
            0.05
          )} !important`
        }
      },
      underline: {
        '&::before': {
          display: 'none'
        },
        '&::after': {
          display: 'none'
        }
      }
    },
    MuiInputBase: {
      inputMarginDense: theme.typography.body2,
      adornedEnd: {
        '& .MuiSvgIcon-root': {
          fill: theme.palette.text.secondary,
          '&.Mui-disabled': {
            fill: theme.palette.text.disabled
          }
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.grey[IS_DARK ? 600 : 300]
        },
        '&.Mui-disabled': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.disabledBackground
          }
        }
      },
      input: {
        padding: '16.5px 14px'
      }
    },
    MuiButton: {
      contained: {
        '&:hover': {
          boxShadow: 'none'
        }
      },
      outlined: {
        borderColor: theme.palette.grey[300]
      },
      containedPrimary: {
        boxShadow: IS_DARK
          ? theme.customShadows.z1
          : theme.customShadows.primary
      },
      containedSecondary: {
        boxShadow: IS_DARK
          ? theme.customShadows.z1
          : theme.customShadows.secondary
      },
      sizeLarge: {
        height: '48px'
      }
    },
    MuiCard: {
      root: {
        boxShadow: theme.customShadows.z16,
        position: 'relative'
      }
    },
    MuiPopover: {
      paper: {
        boxShadow: theme.customShadows.z16,
        border:
          theme.palette.mode === 'light' &&
          `solid 1px ${theme.palette.grey[100]}`,
        overflowX: 'initial',
        overflowY: 'initial'
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: theme.shape.borderRadius * 2
      }
    },
    MuiBackdrop: {
      root: {
        background: `linear-gradient(75deg, ${hexToRgba(
          theme.palette.grey[900],
          0.1
        )} 0%, ${hexToRgba(theme.palette.grey[900], 0.9)} 100%)`
      }
    },
    MuiSwitch: {
      track: {
        backgroundColor: theme.palette.grey[500]
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: `solid 1px ${hexToRgba(
          theme.palette.grey[IS_DARK ? 100 : 700],
          0.075
        )}`,
        padding: theme.spacing
      }
    },
    MuiBreadcrumbs: {
      ol: {
        flexWrap: 'nowrap',
        overflowX: 'auto'
      }
    },
    MuiTab: {
      root: {
        maxWidth: 320
      },
      wrapper: {
        flexDirection: 'row',
        textTransform: 'initial',
        transition: `color ${theme.transitions.duration.standard}ms`,
        '& p': {
          transition: `color ${theme.transitions.duration.standard}ms`
        }
      },
      labelIcon: {
        minHeight: 48,
        '& .MuiTab-wrapper > *:first-child': {
          marginBottom: 0,
          marginRight: theme.spacing * 0.5
        }
      }
    },
    MuiTabScrollButton: {
      root: {
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main
        }
      }
    },
    MuiPickersTimePickerToolbar: {
      hourMinuteLabelReverse: {
        flexDirection: 'row'
      }
    }
  };
};
