import { createMuiTheme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
const primaryColor = lightGreen["700"];
const secondaryColor = lightGreen["700"];

export const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#373737"
    },
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor
    },
    text: {
      primary: "#ffffff",
      secondary: "#959595"
    }
  },
  overrides: {
    MuiDialog: {
      paper: {
        backgroundColor: "#272727"
      }
    },
    MuiDialogContent: {
      root: {
        backgroundColor: "#272727"
      }
    },
    MuiTypography: {
      root: {
        color: "#f2f2f2"
      }
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 100,
        height: 10
      },
      colorPrimary: {
        backgroundColor: lightGreen["A200"]
      },
      barColorPrimary: {
        backgroundColor: lightGreen["600"]
      }
    },
    MuiButton: {
      root: {
        textTransform: "none",
        borderRadius: 10
      },
      contained: {
        background: `linear-gradient(-135deg, ${primaryColor} 20%, ${secondaryColor} 90%)`
      }
    }
  }
});
