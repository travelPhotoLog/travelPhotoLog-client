const calcRem = size => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const spacing = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray_1: "#222222",
  gray_2: "#767676",
  green_1: "#3cb46e",
};

const container = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  flexSpaceBetween: `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexSpaceAround: `
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  flexEnd: `
    display: flex;
    justify-content: flex-end;
    algin-items: center;
  `,
};

const theme = {
  fontSizes,
  spacing,
  colors,
  container,
};

export default theme;
