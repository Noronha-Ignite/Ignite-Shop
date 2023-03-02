import { styled } from '@stitches/react'

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const SidebarTrigger = styled('button', {
  color: '$gray500',
  backgroundColor: '$gray800',
  border: 0,

  position: 'relative',

  borderRadius: 6,

  padding: '0.75rem',

  cursor: 'pointer',
  transition: 'filter 0.2s',

  '&:hover': {
    filter: 'brightness(1.25)',
  },
})

export const SidebarTriggerTag = styled('div', {
  content: '$itemsQuantity',
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(30%, -30%)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '1.75rem',
  height: '1.75rem',

  background: '$green500',
  border: '3px solid $gray900',

  borderRadius: '50%',

  color: '$white',
  fontSize: '0.875rem',
  fontWeight: 'bold',
})
