"use strict";

module.exports = {
  newNote: function newNote(parent, args, _ref) {
    var models;
    return regeneratorRuntime.async(function newNote$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            models = _ref.models;
            _context.next = 3;
            return regeneratorRuntime.awrap(models.Note.create({
              content: args.content,
              author: 'Adam Scott'
            }));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};