const express = require('express');
const router = express.Router();
const publicController = require('../../controllers/public');

router.get('/', publicController.home.index);

router.get('/login', publicController.sessions.new);
router.get('/callback',
  publicController.sessions.new,
  publicController.sessions.create);
router.get('/logout', publicController.sessions.destroy);

router.get('/profile', publicController.profile.index);
router.get('/profile/edit', publicController.profile.edit);
router.put('/profile/update', publicController.profile.update);

router.get('/dashboard', publicController.dashboard.index);
router.get('/dashboard/:guildID', publicController.dashboard.show);

router.get('/commands', publicController.commands.index);
router.get('/commands/new', publicController.commands.new);
router.post('/commands/create', publicController.commands.create);
router.get('/commands/:id/edit', publicController.commands.edit);
router.put('/commands/:id/update', publicController.commands.update);
router.delete('/commands/:id', publicController.commands.destroy);

module.exports = router;
