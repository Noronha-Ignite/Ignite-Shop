import { styled } from '../..'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',

  variants: {
    style: {
      skeleton: {
        width: '100%',
      },
    },
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,

  background: '$background-gradient',
  borderRadius: 8,

  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  variants: {
    style: {
      skeleton: {
        background: '$skeleton-gradient',
      },
    },
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    padding: '1.25rem',

    backgroundColor: '$green500',
    color: '$white',

    border: 0,
    borderRadius: 8,

    cursor: 'pointer',

    fontWeight: 'bold',
    fontSize: '$md',

    '&:hover': {
      backgroundColor: '$green300',
      transition: 'background-color 0.2s',
    },
  },

  variants: {
    style: {
      skeleton: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

        h1: {
          background: '$skeleton-gradient',
          padding: 32,
          borderRadius: 8,
        },
        p: {
          background: '$skeleton-gradient',
          flex: 1,
          marginBottom: 32,
          borderRadius: 8,
        },
        button: {
          background: '$skeleton-gradient',
          width: '100%',
          padding: 32,
        },
      },
    },
  },
})
