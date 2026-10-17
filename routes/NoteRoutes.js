
const noteModel = require('../models/NotesModel');
const express = require('express');
const noteRoutes = express.Router();

// Create a new Note
noteRoutes.post('/notes', (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    const note = new noteModel(req.body.content);

    note.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).send({ message: err.message });
        });
});

// Retrieve all Notes
noteRoutes.get('/notes', (req, res) => {
    noteModel.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// Retrieve a single Note
noteRoutes.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found"
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({ message: err.message });
        });
});

// Update a Note
noteRoutes.put('/notes/:noteId', (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    noteModel.findByIdAndUpdate(
        req.params.noteId,
        req.body.content,
        { new: true }
    )
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found"
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({ message: err.message });
        });
});

// Delete a Note
noteRoutes.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndDelete(req.params.noteId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found"
                });
            }
            res.send({ message: "Note deleted successfully" });
        })
        .catch(err => {
            res.status(400).send({ message: err.message });
        });
});

module.exports = noteRoutes;
