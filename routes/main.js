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
    let aProj_techniques = ""
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

            aProj.techniques.forEach((aTechnique) => {
                aProj_techniques += aTechnique
            });
            console.log(aProj_dateTo,aProj_dateFrom)
          } else {
            console.log('No such document!');
          }
    } catch (error) {
        console.error('Error reading documents:', error);
    }


    res.render('projects/aProject', { project_id, aProj, aProj_dateFrom, aProj_dateTo, aProj_techniques})
});


router.get('/addProject', (req, res) => {
    db.collection('projects').doc("project_3")
    .set({
        type: 'Final Year Project',
        company: "NYP",
        company_desc: 'In modern times, migration is not seldomly seen anymore. It can be triggered by factors such as Domestic or international conflicts, Employment & wages and Business opportunities. This causes people to lose their important credentials such as proof of address, credit score, financial statements and also access to financial services when they migrate. Hence, With the problem statement, “How can you help migrants create a personal digital identity that can be trusted and accepted globally?” given from PolyFinTech 100 API Hackathon 2022, my team and I came up with a cutting-edge application to aid Migrants, to migrate smoothly without having the need to lose their proof of identity via blockchain.',
        title_images: {
            'DIGIPASS':"/img/projects/BIPJ/digipass_home_crop.png",
            'DIGIPASS Wallet':"/img/projects/BIPJ/digipass_wallet_main.png",
            'DIGIPASS Wallet Top Up with Paypal/Stripe':"/img/projects/BIPJ/digipass_wallet_topup.png",
            'Feature 1: Digital Wallet':"/img/projects/BIPJ/feature_1.png",
            'Feature 2: Digital Credentials':"/img/projects/BIPJ/feature_2.png",
            'Feature 3: RPA Job Recommendation':"/img/projects/BIPJ/feature_3.png",
            'Feature 4: Credit Scoring':"/img/projects/BIPJ/feature_4.png"},
        role_desc: 'Our website helps migrants securely maintain a digital identity on the Ropsten blockchain-accessed via MetaMask-for storing credentials, making payments, building credit scores, and connecting with communities. It uses APIs for face recognition, text extraction, geolocation, and translations; includes a digital wallet for payments and loyalty rewards; offers a community forum and job recommendations powered by UiPath; and features a chatbot for user inquiries. This streamlines the migration process, ensuring migrants retain critical proof of identity worldwide.',
        grade: "Distinction",
        date_from: new Date("2022-06-01"),
        date_to: new Date("2022-08-01"),
        skills: ["BLOCKCHAIN", "HTML", "CSS", "JS", "SQL", "NODEJS", "UIPATH"],
        techniques: ['<nobr><img class="proj_icon" src="/img/icons/face_recog.png" alt=""> Face Recognition</nobr>',
            '<nobr><img class="proj_icon" src="/img/icons/ocr_text.png" alt=""> OCR-Text</nobr>',
            '<nobr><img class="proj_icon" src="/img/icons/metamask.png" alt=""> MetaMask</nobr>', 
            '<nobr><img class="proj_icon" src="/img/icons/rpa.png" alt=""> Robtobic Process Automation</nobr>', 
            '<nobr><img class="proj_icon" src="/img/icons/encrypt.png" alt=""> Encryption</nobr>', 
            '<nobr><img class="proj_icon" src="/img/icons/scoring.png" alt=""> Credit Scoring</nobr>', 
        ],
        front_end: 'This showcases some of the consumer interactive pages that the website has.',
        front_end_images: {'video':"/img/projects/BIPJ/RegTech_TeamRookies_PreliminaryVideo.mp4"},
        back_end: 'This showcases some of the administrative configuration pages that the website has.',
        back_end_images: {'video':"/img/projects/BIPJ/digipass_admin_site.mp4"},
        involvement_scheduling: "I lead this project and handle all scheduling throughout its lifecycle using a Scrum framework.",
        involvement_scheduling_images: {'Timeline':"/img/projects/BIPJ/schedule.png"},
        spec_features:["BLOCKCHAIN", "HTML", "CSS", "JS", "SQL", "NODEJS"],
        use_case:"",
        database_info: "Credentials and Digital Wallet are stored on Blockchain. However, user logins, credit scoring, job recommendations and coupon managements are backed by SQL.",
        database_images: {"SQL Schema": "/img/projects/BIPJ/sql_schema.png"}

    })
    .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
        console.error('Error adding document: ', error);
    });
    
    res.render('landing/guestIndex')

});


module.exports = router;

