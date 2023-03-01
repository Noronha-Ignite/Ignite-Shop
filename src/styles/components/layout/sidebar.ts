import * as Dialog from '@radix-ui/react-dialog'

import { styled } from '@/styles'
import { keyframes } from '@stitches/react'

const animationPullFromRight = keyframes({
  '0%': {
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(0)',
  },
})

export const Overlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .4)',
  position: 'fixed',
  inset: 0,
})

export const Container = styled('div', {
  boxSizing: 'border-box',
  minWidth: 320,
  height: '100vh',
  position: 'fixed',
  background: '$gray800',
  top: 0,
  right: 0,
  padding: '1.5rem',

  animation: `${animationPullFromRight} 250ms`,
})

export const Closer = styled(Dialog.Close, {
  display: 'block',
  color: '$gray500',
  marginLeft: 'auto',

  background: 0,
  border: 0,

  cursor: 'pointer',

  transition: 'color 0.2s',

  '&:hover': {
    color: '$gray300',
  },
})

export const Content = styled('div', {
  padding: '1.5rem',
  height: 'calc(100% - 1.5rem)',
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$lg',
    color: '$gray100',
    marginBottom: '2rem',
  },

  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',

    '& > div': {
      '&:first-child': {
        marginBottom: '0.5rem',
      },

      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',

      span: {
        fontSize: '$md',
        color: '$gray300',

        '&:first-child': {
          fontSize: '1rem',
          color: '$gray100',
        },
      },

      strong: {
        fontSize: '$xl',
        color: '$gray100',

        '&:first-child': {
          fontSize: '$md',
        },
      },
    },

    button: {
      marginTop: '3.5rem',
      padding: '1.25rem',

      background: '$green500',
      border: 0,
      borderRadius: 8,

      color: '$white',
      fontWeight: 700,
      fontSize: '$md',

      cursor: 'pointer',

      '&:hover': {
        transition: 'background 0.2s ease-in',
        background: '$green300',
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
        transition: 'background-color 0.2s',
      },

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
  },
})

export const ItemsWrapper = styled('div', {
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginBottom: '2rem',

  paddingRight: '2rem',

  /* width */
  '&::-webkit-scrollbar': {
    width: 6,
  },

  /* Track */
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  /* Handle */
  '&::-webkit-scrollbar-thumb': {
    background: '$green500',
  },

  /* Handle on hover */
  '&::-webkit-scrollbar-thumb:hover': {
    background: '$green300',
  },
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: '1.5rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
  },

  h4: {
    display: 'block',
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray300',
    marginBottom: '0.25rem',
  },

  span: {
    display: 'block',
    fontSize: '$lg',
    color: '$gray100',
    fontWeight: 'bold',
  },

  button: {
    width: 'fit-content',
    marginTop: 'auto',

    background: 0,
    border: 0,

    fontWeight: 'bold',
    fontSize: '1rem',
    color: '$green500',

    cursor: 'pointer',

    '&:hover': {
      transition: 'color 0.2s ease-in',
      color: '$green300',
    },
  },
})

export const CartImageContainer = styled('div', {
  width: 100,
  height: 90,

  background: '$background-gradient',
  borderRadius: 8,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  img: {
    objectFit: 'cover',
  },
})
