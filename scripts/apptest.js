if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(function() {
      console.log('SW registered');
    });
}


function initPaymentRequest() {
  let networks = ['amex', 'jcb', 'visa', 'maestro', 'mastercard'];
  
  let supportedInstruments = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: networks, 
      supportedTypes: ['debit', 'credit', 'prepaid']
    }
  }, {
    supportedMethods: 'https://apple.com/apple-pay',
    data: {
        version: 2,
        supportedNetworks: networks,
        countryCode: 'US',
        merchantIdentifier: 'whatwebcando.today.sample',
        merchantCapabilities: ['supportsDebit', 'supportsCredit', 'supports3DS']
    }
  }];

  let details = {
    total: {label: 'Donation', amount: {currency: 'EUR', value: '10.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'EUR', value: '15.00'}
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'EUR', value: '-5.00'}
      }
    ]
  };

  return new PaymentRequest(supportedInstruments, details);
}

/**
 * Invokes PaymentRequest for credit cards.
 */
function onBuyClicked(request) {
  request.show()
    .then(instrumentResponse => sendPaymentToServer(instrumentResponse))
    .catch(err => document.getElementById('log').innerText = err);
}

/**
 * Simulates processing the payment data on the server.
 */
function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  
  window.setTimeout(function () {
    instrumentResponse.complete('success')
        .then(() => document.getElementById('log').innerHTML = resultToTable(instrumentResponse))
        .catch(err => document.getElementById('log').innerText = err);
  }, 2000);
}

/**
 * Converts the payment instrument into a JSON string.
 */
function resultToTable(result) {
  return '' +
    '' +
    '' +
    '' +
    '' +
    '' +
    '' +
    'Method name' + result.methodName + 'Billing address' + (result.details.billingAddress || {}).addressLine + ', ' + (result.details.billingAddress || {}).city + 'Card number' + result.details.cardNumber + 'Security code' + result.details.cardSecurityCode + 'Cardholder name' + result.details.cardholderName + 'Expiry date' + result.details.expiryMonth + '/' + result.details.expiryYear + '';
}

function donate() {
  if (!window.PaymentRequest) {
    alert('This browser does not support Web Payments API');
    return;
  }
    
  let request = initPaymentRequest();
  onBuyClicked(request);
}