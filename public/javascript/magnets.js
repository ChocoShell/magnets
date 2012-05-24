(function() {
  var cached, closeModel, createAWord, sendUpdate, setListeners, setupMagnets, socketListeners, submitWord;

  cached = {};

  submitWord = function(e) {
    closeModel();
    socket.emit("newWord", {
      'word': $('#add_word_form input').val()
    });
    return $('#add_word_form input').val('');
  };

  closeModel = function() {
    return $('#add_word_form').hide().addClass('inactive');
  };

  setListeners = function() {
    $('#add_word').on('click', function() {
      return $('#add_word_form').show().removeClass('inactive');
    });
    $('#add_word_form .close').on('click', closeModel);
    $('#add_word_form .add').on('click', submitWord);
    return $('#add_word_form input').on('keydown', function(e) {
      if (e.keyCode === 13) submitWord(e);
      if (e.keyCode === 32) return e.preventDefault();
    });
  };

  createAWord = function(word) {
    return $('#hold').append("<div class='magnet no_select' style='left: " + word.position.left + "px; top: " + word.position.top + "px;' data-word='" + word.word + "'>" + word.word + "</div>");
  };

  socketListeners = function() {
    socket.on('newWord', function(word) {
      createAWord(word);
      return setupMagnets();
    });
    socket.on('pieceMoved', function(data) {
      var selector;
      selector = cached[data.word] || (function() {
        return cached[data.word] = $("[data-word='" + data.word + "']");
      })();
      return select.offset.data(data.offset).css({
        "z-index": 999
      });
    });
    return socket.on('peopleOnline', function(data) {
      return $('#people_online .count').html(data);
    });
  };

  setupMagnets = function() {
    return $(".magnet").draggable({
      drag: sendUpdate,
      stop: sendUpdate
    });
  };

  sendUpdate = function(e) {
    var params;
    params = {
      word: $(e.target).data('word'),
      offset: $(e.target).offset(),
      position: $(e.target).position()
    };
    return socket.emit('update', params);
  };

  $(function() {
    setListeners();
    socketListeners();
    return setupMagnets();
  });

}).call(this);
