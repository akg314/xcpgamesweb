'use strict';
var WAValidator = require('wallet-address-validator');
 
function isValidXCPAddress(address) {
  return WAValidator.validate(address)
}

module.exports = class {
    //initialze with address from local storage or default counterparty address
    onInput(input) {
        this.state = {address: input.address}
    }
    //if address in local storage, display the stored address in the input field
    onMount() {
        console.log('address selector mounted');
        if (typeof localStorage.address !== 'undefined') {
            this.getEl('addressInput').value = this.state.address;
        }
    }
    //change address on input and emit event to parent element to redo API calls
    onAddressInput() {
    let address = this.getEl('addressInput').value;
    console.log("onAddressInput() executed in address-selector");
    if (!isValidXCPAddress(address)) {
      this.getEl('addressFormHeader').innerHTML = "Invalid address.";
    } else {
       this.getEl('addressFormHeader').innerHTML = "Assets held by this address:"; 
        this.emit('address-select', address);
    }
  }
};
