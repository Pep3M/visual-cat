import { createStyles, makeStyles } from "@material-ui/core";

export const globalsColors = {
  primary: 'RGB(25,118,210)',
  lightBasePrimary: '#fff',
  lightBaseSecondary: '#fcfcfc',
  lightBaseExtra: '#eaeaea',

}

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

const deepN = 7

export const neumorphismDivItem = {
  borderRadius: '10%',
  boxShadow:  `${deepN}px ${deepN}px ${deepN * 2}px #bebebe, -${deepN}px -${deepN}px ${deepN * 2}px #ffffff`,
}
export const neumorphismDivContainer = {
  background: 'RGB(250,250,250,0.6)',
  borderRadius: '15px',
  backdropFilter: 'blur(20px)',
  zIndex: 1,
  boxShadow:  `${deepN * 0.5}px ${deepN * 0.5}px ${deepN * 3}px #dedede`,

}
export default GlobalStyles;