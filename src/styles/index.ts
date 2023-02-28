import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      'background-gradient':
        'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      'skeleton-gradient':
        'linear-gradient(168deg, rgba(29,29,29,1) 0%, rgba(106,106,106,1) 52%, rgba(157,157,157,1) 100%)',
      white: '#FFF',

      gray900: '#121214',
      gray800: '#202024',
      gray500: '#8d8d99',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e',
    },
    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
})
