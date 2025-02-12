const express = require('express');
const router = express.Router();
const app = express();

app.use(express.urlencoded({
    extended: true
}));

// Now you can access various Firebase services:
const admin = require('firebase-admin');
const db = admin.firestore();
const auth = admin.auth();


// ------------------------------------------------------------------------------------------------------------------ Page Routes ------------------------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    let title_body = ""
    res.render('landing/guestIndex', { title_body })

});


router.get('/testimonials', (req, res) => {

    res.render('recognitions/testimonials')

});

router.get('/certificates', (req, res) => {

    res.render('recognitions/certificates')

});


router.get('/aProject/:project_id', async(req, res) => {
    console.log(":HGEEOO")
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let project_id = req.params.project_id
    let aProj, aProj_dateFrom, aProj_dateTo, monthIndex, year;
    console.log(project_id)
    try {
        const docRef =  db.collection('projects').doc(project_id);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            console.log('Document data:', docSnapshot.data());
            aProj = docSnapshot.data();
            
            aProj_dateFrom = docSnapshot.data().date_from.toDate();
            monthIndex  = aProj_dateFrom.getMonth();
            year = aProj_dateFrom.getFullYear();
            aProj_dateFrom = String(monthNames[monthIndex]) + " " + String(year)

            aProj_dateTo = docSnapshot.data().date_to.toDate();
            monthIndex  = aProj_dateTo.getMonth();
            year = aProj_dateTo.getFullYear();
            aProj_dateTo = String(monthNames[monthIndex]) + " " + String(year)
          } else {
            console.log('No such document!');
          }
    } catch (error) {
        console.error('Error reading documents:', error);
    }


    res.render('projects/aProject', { project_id, aProj, aProj_dateFrom, aProj_dateTo})
});

module.exports = router;