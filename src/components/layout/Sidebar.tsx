import * as Dialog from '@radix-ui/react-dialog'

import * as S from '@/styles/components/layout/sidebar'
import { formatCurrency } from '@/utils/format'
import Image from 'next/image'
import { X } from 'phosphor-react'

type SidebarProps = {
  children: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <S.Overlay />

        <Dialog.Content>
          <S.Container>
            <S.Closer>
              <X size={24} />
            </S.Closer>

            <S.Content>
              <h1>Sacola de compras</h1>

              <S.ItemsWrapper>
                <S.CartItem>
                  <S.CartImageContainer>
                    <Image
                      src={require('@/assets/camisas/2.png')}
                      alt='Camiseta'
                      width={90}
                      height={80}
                    />
                  </S.CartImageContainer>

                  <div>
                    <h4>Camiseta Beyond the Limits</h4>

                    <span>{formatCurrency(79.9)}</span>

                    <button>Remover</button>
                  </div>
                </S.CartItem>
              </S.ItemsWrapper>

              <footer>
                <div>
                  <span>Quantidade</span>
                  <span>3 itens</span>
                </div>

                <div>
                  <strong>Valor total</strong>
                  <strong>R$ 270,00</strong>
                </div>

                <button>Finalizar compra</button>
              </footer>
            </S.Content>
          </S.Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
