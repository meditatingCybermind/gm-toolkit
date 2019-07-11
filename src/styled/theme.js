import * as styledComponents from 'styled-components';

export const Theme = {
    colors: {
        // blues
        primaryBlue: '#006298',
        darkBlue: '#004165',
        // greens
        primaryGreen: '#3A8200',
        darkGreen: '#234f00',
        // yellows
        primaryYellow: '#ffc72d',
        darkYellow: '#DBAC2B',
        lightOrange: '#F2A900',
        orange: '#FA6600',

        // reds
        primaryRed: '#e20000',
        darkRed: '#a90001',

        // greyscale
        white: '#ffffff',
        lightGrey: '#f7f7f7', // primary light grey
        lightGreyBackground2: '#ECECEC',
        greyAccent: '#dfdfdf', // borders, shadows, etc
        darkGreyAccent: '#bfbfbf',
        darkGrey: '#3f3f3f', // Cengage Black, Text Grey
        black: '#000000',

        // scoring, errors, and other pastel colors
        correctGreenTint: '#E2EDD9', // Score Bg
        partiallyCorrectYellowTint: '#FDF2D9',
        errorRedTint: '#FDE0E0',
        extraCreditGoldTint: '#FEEBDD'
    },
    // tslint:disable-next-line:quotemark
    OpenSans: "'Open Sans', sans-serif",
    // tslint:disable-next-line:quotemark
    Oswald: "'Oswald', sans-serif"
};

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider
} = styledComponents;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
