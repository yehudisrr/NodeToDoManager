const router = require('express').Router();
const tditemsDb = require('../db/tditems-db');

router.get('/', async (req, res) => {
    const tditems = await tditemsDb.getIncompleteTditems();
    res.render('tditems/index', { tditems });
});

router.get('/completed', async (req, res) => {
    const tditems = await tditemsDb.getCompletedTditems();
    res.render('tditems/completed', { tditems });
});

router.get('/categories', async (req, res) => {
    const categories = await tditemsDb.getCategories();
    res.render('tditems/categories', { categories });
});

router.get('/newitem', async (req, res) => {
    const categories = await tditemsDb.getCategories();
    res.render('tditems/newitem', {categories});
});

router.post('/additem', async (req, res) => {
    await tditemsDb.addItem(req.body);
    res.redirect('/tditems');
});

router.post('/markascompleted', async (req, res) => {
    await tditemsDb.markAsCompleted(req.body);
    res.redirect('/tditems');
});

router.get('/newcategory', (req, res) => {
    res.render('tditems/newcategory');
});

router.post('/addcategory', async (req, res) => {
    await tditemsDb.addCategory(req.body);
    res.redirect('/tditems/categories');
});
router.get('/editcategory', async (req, res) => {
    const category = await tditemsDb.getCategoryById(req.query.id);
    res.render('tditems/editcategory', {category});
});

router.get('/bycategory', async (req, res) => {
    const tditems = await tditemsDb.getByCategoryId(req.query.id);
    res.render('tditems/bycategory', { tditems });
});

router.post('/updatecategory', async (req, res) => {
    await tditemsDb.updateCategory(req.body);
    res.redirect('/tditems/categories');
});

module.exports = router;