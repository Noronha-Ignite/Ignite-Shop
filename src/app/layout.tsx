/* eslint-disable @next/next/no-page-custom-font */
import { CartContextProvider } from '@/contexts/CartContext'
import { getCssText } from '@/styles'
import { globalStyles } from '@/styles/global'
import * as S from '@/styles/pages/app'
import { Metadata } from 'next'
import { Header } from './Header'

export const metadata: Metadata = {
  title: {
    default: 'Ignite Shop',
    template: '%s | Ignite Shop',
  },
}

globalStyles()

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />

        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body>
        <CartContextProvider>
          <S.Container>
            <Header />
            {children}
          </S.Container>
        </CartContextProvider>
      </body>
    </html>
  )
}
