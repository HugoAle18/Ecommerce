export const formatPrice = (amount, currency = 'PEN') => {
  const symbols = { PEN: 'S/', USD: '$' }
  return `${symbols[currency]} ${amount.toFixed(2)}`
}

export const getPrice = (product, currency = 'PEN') => {
  return currency === 'USD' ? product.priceUSD : product.price
}