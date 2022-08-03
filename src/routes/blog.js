const blogController = require('../controllers/blogController');
const router = require('express').Router();

router.get('/', blogController.index);
router.get('/create', blogController.create);
router.get('/:id', blogController.detail);
router.post('/create', blogController.add);
router.get('/update/:id', blogController.updatePage);
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);
// router.get('/:id', blogController.id);

module.exports = router;