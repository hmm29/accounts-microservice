// No client-side operations, only method calls
matchInteractions.allow({
  exec: function (userId, command, args) {
    return false;
  }
});
