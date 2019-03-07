const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/auth');
const mongoose = require('mongoose');
const express = require('express')

const Story = mongoose.model('stories');

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render("stories/add")
});
router.get('/', (req, res) => {
    res.render("stories/index")
});
// Process Add Story 
router.post('/', (req, res) => {
    let allowComments;
    let story = req.body;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    // Create Story
    new Story(newStory).save().then(story => {
        res.redirect(`/stories/show/${story.id}`);
    })

    // console.log(req.body)
})

module.exports = router