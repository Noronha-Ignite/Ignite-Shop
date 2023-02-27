export const formatCurrency = (value: number) => {
  const formatter = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })

  return formatter.format(value)
}
