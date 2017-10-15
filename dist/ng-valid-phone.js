(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        module.exports = factory(require('angular'));
    } else {
        return factory(root.angular);
    }
}(this, function(angular) {
    'use strict';
    var moduleName = 'ngValidPhone';
    var mod = angular.module(moduleName, []);
    mod.directive('ngValidPhone', function($window) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                countryCode: '=',
                placeHolder: '='
            },
            link: function(scope, element, attrs, modelCtrl) {
                var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
                var AsYouTypeFormatter = libphonenumber.AsYouTypeFormatter;

                var onlynumeric = function(inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    inputValue = inputValue.replace(/\D/g, '');

                    if (scope.countryCode && scope.countryCode.length == 2 && inputValue.length > 1) {
                        var formatter = new AsYouTypeFormatter(scope.countryCode),
                            filtered;
                        for (var i = 0, len = inputValue.length; i + 1 < len; i++) {
                            formatter.inputDigit(inputValue[i]);
                        }
                        filtered = formatter.inputDigit(inputValue[inputValue.length - 1]);
                        modelCtrl.$setViewValue(filtered);
                        modelCtrl.$render();
                    } else {
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                }

                modelCtrl.$parsers.push(onlynumeric);

                scope.$watch('countryCode', function(value) {
                    modelCtrl.$validate();
                    if (typeof scope.placeHolder != 'undefined') {
                        try {
                            var exnumber = phoneUtil.getExampleNumberForType(scope.countryCode, scope.placeHolder);
                            attrs.$set('placeholder', phoneUtil.format(exnumber, 4).replace('+', ''));
                        } catch (err) {
                            attrs.$set('placeholder', '');
                        }
                    }
                });

                var IsPhoneValid = function(inputValue) {
                    if (inputValue) {
                        try {
                            if (scope.countryCode && scope.countryCode.length == 2) {
                                var parsedNumber = phoneUtil.parse(inputValue, scope.countryCode);
                                var isvalidnum = phoneUtil.isValidNumber(parsedNumber);
                                if (isvalidnum) {
                                    onlynumeric(phoneUtil.format(parsedNumber, 4));
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                var parsedNumber = phoneUtil.parse('+' + inputValue);
                                var isvalidnum = phoneUtil.isValidNumber(parsedNumber);
                                if (isvalidnum) {
                                    if (typeof scope.countryCode != 'undefined') {
                                        scope.countryCode = phoneUtil.getRegionCodeForNumber(parsedNumber);
                                        onlynumeric(phoneUtil.format(parsedNumber, 4));
                                    }
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        } catch (err) {
                            return false;
                        }
                    } else return false;
                };

                modelCtrl.$validators.invalidPhone = function(modelValue, viewValue) {
                    return IsPhoneValid(modelValue);
                };
            }
        }
    });
    return moduleName;
}));