import { createStyles, makeStyles } from "@material-ui/core";

export const globalsColors = {
  primary: 'rgb(25,118,210)',
  redPrimary: '#ed1c24',
  primaryThin: 'rgba(25,118,210,0.2)',
  lightBasePrimary: '#e9f5ff',
  lightBaseThin: 'rgb(255,255,255,0.4)',
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

const deepN = 3

export const neumorphismDivItem = {
  borderRadius: '10%',
  boxShadow:  `${deepN}px ${deepN}px ${deepN * 2}px RGBA(111,111,111,0.5), -${deepN}px -${deepN}px ${deepN * 5}px RGB(255,255,255,0.5)`,
}
export const neumorphismDivContainer = {
  background: 'RGB(250,250,250,0.6)',
  borderRadius: '15px',
  backdropFilter: 'blur(20px)',
  zIndex: 1,
  boxShadow:  `${deepN * 0.5}px ${deepN * 0.5}px ${deepN * 3}px RGB(200,200,200,0.5)`,

}
export default GlobalStyles;

export const scrollBarStyle = {
  '&::-webkit-scrollbar': {
    width: '.3em',
 },
    
 '&::-webkit-scrollbar-track': {
    backgroundColor: globalsColors.lightBaseExtra,
    
    margin: 10,
 },
    
 '&::-webkit-scrollbar-thumb': {
   backgroundColor: globalsColors.primaryThin,
 }
}