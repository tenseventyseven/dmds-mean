"use strict";

angular.module('app')

  .factory('quotesService', quotesService);

function quotesService() {
  var service = {
    getQuotes: getQuotes,
    getRandomQuote: getRandomQuote
  };

  return service;

  // get all quotes
  function getQuotes() {
    // TODO: make API request
    return ['Go hard or go home!',
      'Keep your chin tucked!',
      'Sweat is the lube of success!',
      'Sweat is weakness leaving the body!',
      'Compress on covers!',
      'Rotate back foot on crosses!',
      'Leave the day\'s stress out the door - let\'s train!',
      'Sweat is pain\'s tears!',
      'The 3Ps - Perfect Practise make Perfect!',
      'You\'re not going to look any better if you take shortcuts!',
      'There\'s no shortcut to success!',
      'Pain is temporary, Glory is forever!',
      'Every pushup you do today is one you don\'t have to worry about tomorrow'
    ];
  }

  // get random quote
  function getRandomQuote() {
    var quotes = getQuotes();

    return quotes[_.random(0, quotes.length - 1)];
  }
}
