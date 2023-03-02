import { styled } from '..'

export const SliderContainer = styled('main', {
  display: 'flex',
  width: '100%',
  marginLeft: 'auto',
  maxWidth: 'calc(1180px + (100vw - 1180px) / 2)',
  minHeight: 656,
})

export const Product = styled('div', {
  background: '$background-gradient',
  borderRadius: 8,
  position: 'relative',

  minWidth: 540,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  overflow: 'hidden',

  color: '$gray300',

  img: {
    objectFit: 'cover',
  },

  '&:hover': {
    outline: '2px inset $green300',

    footer: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
})

export const ProductFooter = styled('footer', {
  position: 'absolute',
  bottom: '0.25rem',
  left: '0.25rem',

  width: 'calc(100% - 8px)',
  padding: '2rem',

  borderRadius: 6,

  background: '$gray800',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  transform: 'translateY(110%)',
  opacity: 0,

  transition: 'all 0.2s ease-in-out',

  strong: {
    display: 'block',
    fontWeight: 700,
    fontSize: '$lg',
  },

  span: {
    display: 'block',
    fontWeight: 700,
    fontSize: '$xl',
    color: '$green300',
    marginTop: '0.25rem',
  },

  a: {
    padding: '0.75rem',
    borderRadius: 6,
    background: '$green500',
    color: '$white',
    cursor: 'pointer',

    '&:hover': {
      background: '$green300',
      transition: 'background 0.2s ease-in',
    },
  },
})
