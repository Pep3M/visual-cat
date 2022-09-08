import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      "*, *::before, *::after": {
        boxSizing: "inherit",
      },
      body: {
        height: "100%",
        width: "100%",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();
  return null;
};

export const neumorphismDivItem = {
  borderRadius: '10%',
  background: '#e0e0e0',
  boxShadow:  '28px 28px 56px #bebebe, -28px -28px 56px #ffffff',
}
export const neumorphismDivContainer = {
  background: '#e0e0e0',
  borderRadius: '15px',
}
export default GlobalStyles;