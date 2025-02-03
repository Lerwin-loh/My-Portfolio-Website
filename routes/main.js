const express = require('express');
const router = express.Router();
const app = express();

app.use(express.urlencoded({
    extended: true
}));


// ------------------------------------------------------------------------------------------------------------------ Page Routes ------------------------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    let title_body = ""

    res.render('landing/guestIndex', { title_body })

});

router.get('/aProject/:company', (req, res) => {
    company = req.params.company
    let title_body = ""

    res.render('projects/aProject', { company })

});


module.exports = router;