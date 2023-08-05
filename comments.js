// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// GET /comments
// Get all comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// POST /comments
// Create a new comment
router.post('/', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// GET /comments/:id
// Get a single comment
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.json(comment);
  });
});

// PUT /comments/:id
// Update a comment
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    comment.body = req.body.body;
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

// DELETE /comments/:id
// Delete a comment
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    comment.remove(function(err) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

module.exports = router;