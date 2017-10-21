# Ng Valid Phone
[![npm version](https://badge.fury.io/js/ng-valid-phone.svg)](https://badge.fury.io/js/ng-valid-phone)
[![Bower](https://img.shields.io/bower/v/ng-valid-phone.svg)]()
[![dependency Status](https://david-dm.org/eraycetinay/ng-valid-phone.svg)](https://david-dm.org/eraycetinay/ng-valid-phone.svg)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

Angularjs directive which use google's libphonenumber library for international phone number validations.
## Installation
```
npm install ng-valid-phone
bower install ng-valid-phone
```
## Features
- International number validation.
- National number validation.
- Number masking and filtering
- Example numbers as placeholders.
- Defining countryCode ability.
- Simple and fast integration.
## Usage
- Add 'libphonenumber.js' and 'ng-valid-phone.js' to your source.
```
<script src="bower_components/google-libphonenumber/dist/libphonenumber.js"></script>
<script src="bower_components/ng-valid-phone/dist/ng-valid-phone.js"></script>
```
### Basic Setup
- Add ng-valid-phone directive to your html element.
- With basic setup, validation will work for all international numbers.
- Eg; 86 431 2344 1234 (CH) - 1 201 555-1234 (US)
```
<input type="text" ng-model="test" ng-valid-phone />
```
### Country Code Setup
- You can use country code **(2 letter regional code)** option to get only national number with its pattern.
- **countryCode** should be initialize as a variable. In this way you can create a select box for your country list.
- Or simply you can use ng-init to initialize countryCode in temaplate like in this example.
``` 
<input type="text" ng-model="test" data-country-code="countryCode" ng-init="countryCode='US'" ng-valid-phone />
```
### Placeholder Setup
- If you define a country-code param, you can use place-holder option too. It will show an example national number for the defined country.
```
<input type="text" ng-model="test" data-place-holder="1" data-country-code="countryCode" ng-init="countryCode='US'" ng-valid-phone />
```
## Example
You can set **error/success** messages by using angular's basic validation checks.
```
<form name="myForm">
  <input type="text" ng-model="test" name="test" data-place-holder="1" data-country-code="countryCode" ng-init="countryCode='US'" ng-valid-phone />
  <span ng-show="!myForm.test.$valid">Please enter a valid number.</span>
  <span ng-show="myForm.test.$valid">Your phone number is valid.</span>        
</form>
```
## Notes
- If you define a countryCode, validation will be done only for that country.
```
countryCode:US,  Valid numbers: 1201 555 1234 - 201 555 1234
```
- if client uses country code at the beginning it will be removed after validation automatically.
```
countryCode:US,  Number: 1201 555 1234 or 0201 555 1234 will be changed to 201 555 1234 after the last digit is entered.
```
- If you dont specify a country code, validation will be done for all international numbers.
```
Eg; Valid numbers: 86 431 2344 1234 (CH) - 90 531 232 12 34 (TR) - 1 201 555-1234 (US)
```
## License
[MIT](LICENSE) license.
