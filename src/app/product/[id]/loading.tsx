import * as S from '@/styles/pages/product'

export default function ProductSkeleton() {
  return (
    <S.Container style='skeleton'>
      <S.ImageContainer style='skeleton' />

      <S.ProductDetails style='skeleton'>
        <h1 />
        <span />
        <p />
        <button />
      </S.ProductDetails>
    </S.Container>
  )
}
