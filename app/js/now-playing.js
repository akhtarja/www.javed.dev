/* eslint-disable no-undef */
/* eslint-disable func-names */
// eslint-disable-next-line wrap-iife
(function ($) {
  function getArtistName(artists) {
    if (artists.length === 1) {
      return `<a href="${artists[0].uri}">${artists[0].name}</a>`;
    }
    if (artists.length === 2) {
      return `<a href="${artists[0].uri}">${artists[0].name}</a> and <a href="${artists[1].uri}">${artists[1].name}</a>`;
    }
    return `<a href="${artists[0].uri}">${artists[0].name}</a> and ${
      artists.length - 1
    } other artists`;
  }

  $(document).ready(function () {
    $.get(www_javed_dev_now_playing_apiurl, function (response) {
      $('#masthead-loading').addClass('hidden');
      $('#masthead-content-area').removeClass('hidden');
      if (response.isPlaying) {
        const nowPlayingText = `I am currently listening to <a href="${
          response.songUri
        }">${response.songName}</a> by ${getArtistName(response.artists)}.`;
        $('#spotify-now-playing').html(nowPlayingText);
      }
    });
  });
})(jQuery);
