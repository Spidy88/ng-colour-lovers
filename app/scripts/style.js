
angular.module('ColourLovers')
    .service('Style', Style);

function Style() {
    this.primaryBackgroundColor = '#333';
    this.secondaryBackgroundColor = 'white';
    this.primaryTextColor = 'black';
    this.secondaryTextColor = '#888';
    this.primaryAccentColor = '#EEE';
    this.secondaryAccentColor = 'white';
}