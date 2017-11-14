'use strict';
var WAValidator = require('wallet-address-validator');
 
function isValidXCPAddress(address) {
  return WAValidator.validate(address)
}

module.exports = class {
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
