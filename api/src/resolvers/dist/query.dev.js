"use strict";

module.exports = {
  notes: function notes(parent, args, _ref) {
    var models;
    return regeneratorRuntime.async(function notes$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            models = _ref.models;
            _context.next = 3;
            return regeneratorRuntime.awrap(models.Note.find());

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  note: function note(parent, args, _ref2) {
    var models;
    return regeneratorRuntime.async(function note$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            models = _ref2.models;
            _context2.next = 3;
            return regeneratorRuntime.awrap(models.Note.findById(args.id));

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};