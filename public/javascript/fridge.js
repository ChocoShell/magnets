// Generated by CoffeeScript 1.3.3
(function() {
  var words;

  words = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "person", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"];

  $(function() {
    var hold;
    hold = $("#hold");
    _.each(words, function(word) {
      var elm, properties;
      properties = {
        left: (Math.floor((Math.random()) * window.innerWidth)) + "px",
        top: (Math.floor((Math.random()) * window.innerHeight)) + "px"
      };
      elm = $("<div class='magnet' data-word='" + word + "'>" + word + "</div>");
      elm.css(properties);
      return hold.append(elm);
    });
    return $(".magnet").draggable({
      stop: function(e) {
        var params;
        params = {
          target: $(e.target).data('word'),
          position: $(e.target).offset()
        };
        return socket.emit('update', params);
      }
    });
  });

}).call(this);
