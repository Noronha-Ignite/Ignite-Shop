import Link from 'next/link'
import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  marginLeft: 'auto',
  maxWidth: 'calc(1180px + (100vw - 1180px) / 2)',
  minHeight: 656,
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
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

  footer: {
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
      fontWeight: 700,
      fontSize: '$lg',
    },
    span: {
      fontWeight: 700,
      fontSize: '$xl',
      color: '$green300',
    },
  },

  '&:hover': {
    outline: '2px inset $green300',

    footer: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
})
