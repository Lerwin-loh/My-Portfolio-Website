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

router.get('/testimonials', (req, res) => {

    res.render('recognitions/testimonials')

});

router.get('/certificates', (req, res) => {

    res.render('recognitions/certificates')

});

module.exports = router;