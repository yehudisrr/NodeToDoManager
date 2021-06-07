const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const tditemsRoutes = require('./routes/tditems');
const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

app.use('/tditems', tditemsRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => console.log('server started'));