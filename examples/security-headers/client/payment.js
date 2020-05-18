/* eslint-disable no-console */
// Call the payment api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const payment = async() => {
  if (window.PaymentRequest) {
    try {
      const payment = new PaymentRequest([{
        supportedMethods: 'basic-card',
        data: {supportedNetworks: ['mastercard'], supportedTypes: ['prepaid']},
      }], {
        total: {label: 'Policy Test', amount: {currency: 'USD', value: '00.01'}},
      })
      await payment
      console.log('payment api permission granted')
    } catch (error) {
      console.log('payment api permission denied')
    }
  } else {
    console.log('payment api not found in navigator')
  }
}
