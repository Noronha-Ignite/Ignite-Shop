import { styled } from '..'

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginBottom: '4rem',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginBottom: '5rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    color: '$green500',
    fontSize: '$lg',
    fontWeight: 'bold',
    textDecoration: 'none',

    '&:hover': {
      transition: 'color 0.2s',
      color: '$green300',
    },
  },
})

export const ImagesWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > div': {
    marginLeft: '-4rem',
  },
})

export const ImageContainer = styled('div', {
  width: 145,
  height: 145,
  background: '$background-gradient',
  borderRadius: '50%',
  padding: '0.25rem',
  marginBottom: '2rem',

  transform: 'translateX(2rem)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',

  img: {
    objectFit: 'cover',
  },
})
