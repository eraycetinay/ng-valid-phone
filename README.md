# ng-valid-phone
Angular directive for international phone number validations which use google's libphonenumber library.

Installation
```
npm install ng-valid-phone or bower install ng-valid-phone
```

Add libphonenumber.js and ng-valid-phone.js to your source. Eg;
```

<script src="bower_components/google-libphonenumber/dist/libphonenumber.js"></script>
<script src="bower_components/ng-valid-phone/dist/ng-valid-phone.js"></script>
```

Add ng-valid-phone directive to your html element. Eg;
```
<input type="text" ng-model="test" ng-valid-phone />
```

You can use seperated country code (2 letter regional code) option to get only national number with its pattern Eg;
```
You can use a select list for 'countryCode' without using ng-init on input. 
<input type="text" ng-model="test" data-country-code="countryCode" ng-init="countryCode='US'" ng-valid-phone />
```

You can use placeholder option to show country-code based example phone numbers as placeholders. Eg;
```
<input type="text" ng-model="test" data-place-holder="1" data-country-code="countryCode" ng-init="countryCode='US'" ng-valid-phone />
```

If you specify a countryCode, validation will be done only for that country. 
```
Eg; countryCode:US,  Valid numbers: 1201 555 1234 - 201 555 1234
Note: if client uses country code at the beginning it will be removed after validation automatically.
```

If you dont specify a country code, validation will be done for all international numbers.
```
Eg; Valid numbers: 86 431 2344 1234 (CH) - 90 531 232 12 34 (TR) - 1 201 555-1234 (US)
```
