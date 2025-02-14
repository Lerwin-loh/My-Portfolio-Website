const express = require('express');
const router = express.Router();
const app = express();

app.use(express.urlencoded({
    extended: true
}));

// Now you can access various Firebase services:
const admin = require('firebase-admin');
const db = admin.firestore();
// Get a reference to your Cloud Storage bucket
// const bucket = admin.storage().bucket();


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


router.get('/aProject/:project_id', async (req, res) => {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let project_id = req.params.project_id
    let aProj, aProj_dateFrom, aProj_dateTo, monthIndex, year;
    let aProj_techniques = ""
    let aProj_features = ""

    console.log(project_id)
    try {
        const docRef = db.collection('projects').doc(project_id);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            aProj = docSnapshot.data();

            aProj_dateFrom = docSnapshot.data().date_from.toDate();
            monthIndex = aProj_dateFrom.getMonth();
            year = aProj_dateFrom.getFullYear();
            aProj_dateFrom = String(monthNames[monthIndex]) + " " + String(year)

            aProj_dateTo = docSnapshot.data().date_to.toDate();
            monthIndex = aProj_dateTo.getMonth();
            year = aProj_dateTo.getFullYear();
            aProj_dateTo = String(monthNames[monthIndex]) + " " + String(year)

            aProj.techniques.forEach((aTechnique) => {
                aProj_techniques += aTechnique
            });
            aProj.features.forEach((aFeature) => {
                aProj_features += aFeature
            });

            // console.log(aProj_dateTo, aProj_dateFrom)
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error reading documents:', error);
    }


    res.render('projects/aProject', { project_id, aProj, aProj_dateFrom, aProj_dateTo, aProj_techniques, aProj_features })
});


// router.get('/addProject', (req, res) => {
//     db.collection('projects').doc("project_6")
//         .set({
//             type: 'Business Analytics Project',
//             company: "NYP",
//             company_desc: `This project is about applying visualisation concepts and techniques to create informative graphical representations using Tableau to support the hypothesis on, "Is the ease of buying a house in Singapore decreasing?".`,
//             title_images: {
//                 'Integrated Dashboard': "/img/projects/analytics/integrated_dashboard.png"
//             },
//             role_desc: `With a population of nearly 5.9 million people and a limited land area of 709 square kilometres, this project aims to find out whether buying a house in Singapore is becoming more difficult. Web scraping and Data cleaning was performed using Tableau and Python programming to extract useful information. From the data extracted and properly organised through using Tableau Prep builder, 3 methods of analysis, Descriptive, Diagnostic and Prediction analysis is used in the making of the dashboard to bring meaningful information to aid viewers in decision-making.`,
//             grade: "Distinction",
//             date_from: new Date("2021-04-01"),
//             date_to: new Date("2021-08-01"),
//             skills: ["TABLEAU", "PYTHON", "EXCEL"],
//             techniques: [
//                 '<nobr><img class="proj_icon" src="/img/icons/web_scrape.png" alt=""> Web Scraping</nobr>',
//                 '<nobr><img class="proj_icon" src="/img/icons/tableau_prep.png" alt=""> Tableau Prep</nobr>',
//                 '<nobr><img class="proj_icon" src="/img/icons/pandas.png" alt=""> Pandas</nobr>',
//                 '<nobr><img class="proj_icon" src="/img/icons/sqlite.png" alt=""> SQlite</nobr>'],
//             features: [],
//             front_end: '',
//             front_end_images: {},
//             back_end: '',
//             back_end_images: {},
//             involvement_scheduling: "I lead this project and in-charge of project scheduling.",
//             involvement_scheduling_images: {
//                 'Gantt Chart': "/img/projects/analytics/gantt.png"
//             },
//             use_case: "",
//             database_info: "",
//             database_images: {},
//             dashboard_info: "Diving into the problem statement's sub-factors, my group ventured into Affordability, BTO Housing, Resources available, and Housing Grant Schemes. With these proven hypotheses below, we can thus say that although houses seem to stay affordable to the public, the ease of getting a flat on hand is becoming more difficult.",
//             dashboard_images: {
//                 "Affordability Dashboard: Singapore's Resale HDB is more affordable": "/img/projects/analytics/affordability_db.png",
//                 "Affordability Dashboard: Architecture Diagram": "/img/projects/analytics/system_diagram_affordability_edited.png",
//                 "BTO Housing Dashboard: The difficulty of purchasing a BTO flat is increasing": "/img/projects/analytics/bto_housing_db.png",
//                 "BTO Housing Dashboard: Architecture Diagram": "/img/projects/analytics/system_diagram_btohousing_edited.png",
//                 "Resources Dashboard: Change in resources(land, labour, construction materials) will influence the no. of houses built": "/img/projects/analytics/resources_db.png",
//                 "Resources Dashboard: Architecture Diagram": "/img/projects/analytics/system_diagram_resources_edited.png",
//                 "Housing Grants Dashboard: Housing grants ease te purchasing of HDB flats": "/img/projects/analytics/housing_grants_db.png",
//                 "Housing Grants Dashboard: Architecture Diagram": "/img/projects/analytics/system_diagram_housinggrants_edited.png",
//             }

//         })
//         .then((docRef) => {
//             console.log('Document written with ID: ', docRef.type);
//         })
//         .catch((error) => {
//             console.error('Error adding document: ', error);
//         });

//     res.render('landing/guestIndex')

// });


// async function getVideoUrls() {
//     try {
//         // Retrieve all files from the bucket
//         const [files] = await bucket.getFiles();

//         // Filter or assume that all files are videos, then generate signed URLs
//         const videoDataPromises = files.map(async (file) => {
//             // Generate a signed URL valid for 1 hour (adjust expiration as needed)
//             const [url] = await file.getSignedUrl({
//                 action: 'read',
//                 expires: Date.now() + 60 * 60 * 1000
//             });
//             return { name: file.name, url };
//         });

//         const videos = await Promise.all(videoDataPromises);
//         console.log(videos)
//     } catch (error) {
//         console.error('Error retrieving videos:', error);
//     }
// }

module.exports = router;


// =========================================================== Project Data 5 ===========================================================
// type: 'Python App Development',
// company: "NYP",
// company_desc: `This website is developed based on the python flask framework and it aims to enable consumers to make transactions seamlessly at their own comfort.`,
// title_images: {
//     'Candy Floriculture: Home': "/img/projects/PADP/candy_home_crop2.png",
//     'Candy Floriculture': "/img/projects/PADP/candy_features.png",
// },
// role_desc: `My team and I have created an E-commerce website to cater to Candyfloriculture, a nursery farm that still uses traditional media to propagate its business. This website aims to tackle the issues that Candyfloriculture faces. Problems such as poor location, lack of proper transaction basis and marketing strategies are individually resolved through the making of our website.`,
// grade: "Distinction",
// date_from: new Date("2020-11-01"),
// date_to: new Date("2021-02-01"),
// skills: ["HTML", "CSS", "JS", "FLASK"],
// techniques: [],
// features: ['<nobr><img class="proj_icon" src="/img/icons/encrypt.png" alt=""> Encryption</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/captcha.png" alt=""> Captcha</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/chatbot.png" alt=""> AI Chatbot</nobr>'],
// front_end: 'This showcases some of the consumer interactive pages that the website has.',
// front_end_images: { 'video': "/img/projects/PADP/front_end.mp4" },
// back_end: 'This showcases some of the administrative configuration pages that the website has.',
// back_end_images: { 'video': "/img/projects/PADP/back_end.mp4" },
// involvement_scheduling: "I lead this project and in-charge of project scheduling.",
// involvement_scheduling_images: {
//     'Gantt Chart': "/img/projects/PADP/schedule.png"
// },
// use_case: "",
// database_info: "Backed by Python Shelve Persistent Storage.",
// database_images: { "MSSQL Schema": "/img/projects/PADP/shelve_db_schema.png" }


// =========================================================== Project Data 4 ===========================================================
// type: 'C# App Development',
// company: "NYP",
// company_desc: `Using C# and ASP.NET, this project is developed with dynamic and database-driven web applications such as SQL. Security and Mimicking "Automation" are also two major components that are implemented into the E-business Website.`,
// title_images: {
//     'Veloce: Bot Automation Site': "/img/projects/BADP/veloce_home_crop2.png",
//     'Veloce: Bot Service': "/img/projects/BADP/veloce_bot.png",
//     'Veloce: Bot Service Subscriptions': "/img/projects/BADP/veloce_subscription.png",
// },
// role_desc: `The website "Veloce" provides its users with an Automation Bot Service, based on a subscription model, that would mimick the proces of "monitoring websites in real-time and perform the purchase journey" automatically. The website also sell house brand products and other popular items that peak consumer interest or are in high demand.`,
// grade: "Distinction",
// date_from: new Date("2021-11-01"),
// date_to: new Date("2022-02-01"),
// skills: ["HTML", "CSS", "JS", "SQL", "CSHARP"],
// techniques: [],
// features: ['<nobr><img class="proj_icon" src="/img/icons/encrypt.png" alt=""> Encryption</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/captcha.png" alt=""> Captcha</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/paypal.png" alt=""> Paypal</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/chatbot.png" alt=""> AI Chatbot</nobr>'],
// front_end: 'This showcases some of the consumer interactive pages that the website has.',
// front_end_images: { 'video': "/img/projects/BADP/front_end.mp4" },
// back_end: 'This showcases some of the administrative configuration pages that the website has.',
// back_end_images: { 'video': "/img/projects/BADP/back_end.mp4" },
// involvement_scheduling: "I lead this project and in-charge of project scheduling.",
// involvement_scheduling_images: {
//     'Meeting Minutes 8/11/21': "/img/projects/BADP/8_nov.png",
//     'Meeting Minutes 10/11/21': "/img/projects/BADP/10_nov.png",
//     'Meeting Minutes 12/11/21': "/img/projects/BADP/12_nov.png",
//     'Meeting Minutes 16/11/21': "/img/projects/BADP/16_nov.png",
//     'Meeting Minutes 17/11/21': "/img/projects/BADP/17_nov.png",
//     'Meeting Minutes 22/11/21': "/img/projects/BADP/22_nov.png",
//     'Meeting Minutes 16/12/21': "/img/projects/BADP/16_dec.png",
//     'Meeting Minutes 10/01/22': "/img/projects/BADP/10_jan_22.png"
// },
// use_case: "",
// database_info: "Backed by Microsoft SQL.",
// database_images: { "MSSQL Schema": "/img/projects/BADP/sql_schema.png" }


// =========================================================== Project Data 3 ===========================================================
// type: 'Full Stack Development',
// company: "NYP",
// company_desc: `Dating back to 2022, Many companies are badly hit by the Covid-19. They faced business challenges where they have never met before. Non-essential businesses are ordered to close during the circuit breaker period. Businesses without any online presence were having problems coping. Hence, this project focuses on creating a Business to Customer (B2C) web application that facilitates an e-commerce shop using full stack technologies. The Full-Stack technologies include, SQL (Database: for data storage and management); Express.js (Backend framework: to handle server-side logic and routing); Node.js (Server runtime: to run your backend JavaScript code); Handlebars (Front-end library/template engine: for rendering dynamic views on the client side);`,
// title_images: {
//     'ShoeCraft Ltd: Shoe Commerce Site': "/img/projects/FSD/shoecraft_home_crop2.png"
// },
// role_desc: `This project is created mainly for the purpose of mimicking a industry standard full cycle from customer purchase, order management, aftersales management, discount management, admin management, product management, and even mimicked supplier interactions via an external site through Full-Stack technologies.`,
// grade: "Distinction",
// date_from: new Date("2022-04-01"),
// date_to: new Date("2022-08-01"),
// skills: ["HTML", "CSS", "JS", "SQL", "NODEJS", "HANDLEBARS"],
// techniques: [],
// features: [
//     '<nobr><img class="proj_icon" src="/img/icons/encrypt.png" alt=""> Encryption</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/verification.png" alt=""> Email Authentication</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/captcha.png" alt=""> Captcha</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/paypal.png" alt=""> Paypal</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/report.png" alt=""> Report Generation</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/chatbot.png" alt=""> AI Chatbot</nobr>'],
// front_end: 'This showcases some of the consumer interactive pages that the website has.',
// front_end_images: { 'video': "/img/projects/FSD/front_end.mp4" },
// back_end: 'This showcases some of the administrative configuration pages that the website has.',
// back_end_images: { 'video': "/img/projects/FSD/back_end_and_supplier.mp4" },
// involvement_scheduling: "I lead this project and handle all scheduling throughout its lifecycle using a Scrum framework.",
// involvement_scheduling_images: { 'Timeline': "/img/projects/FSD/schedule.png" },
// spec_features: ["BLOCKCHAIN", "HTML", "CSS", "JS", "SQL", "NODEJS"],
// use_case: "",
// database_info: "Backed by MySQL.",
// database_images: { "SQL Schema": "/img/projects/FSD/sql_schema.png" }


// =========================================================== Project Data 2 ===========================================================
// type: 'Final Year Project',
// company: "NYP",
// company_desc: 'In modern times, migration is not seldomly seen anymore. It can be triggered by factors such as Domestic or international conflicts, Employment & wages and Business opportunities. This causes people to lose their important credentials such as proof of address, credit score, financial statements and also access to financial services when they migrate. Hence, With the problem statement, “How can you help migrants create a personal digital identity that can be trusted and accepted globally?” given from PolyFinTech 100 API Hackathon 2022, my team and I came up with a cutting-edge application to aid Migrants, to migrate smoothly without having the need to lose their proof of identity via blockchain.',
// title_images: {
//     'DIGIPASS':"/img/projects/BIPJ/digipass_home_crop.png",
//     'DIGIPASS Wallet':"/img/projects/BIPJ/digipass_wallet_main.png",
//     'DIGIPASS Wallet Top Up with Paypal/Stripe':"/img/projects/BIPJ/digipass_wallet_topup.png",
//     'Feature 1: Digital Wallet':"/img/projects/BIPJ/feature_1.png",
//     'Feature 2: Digital Credentials':"/img/projects/BIPJ/feature_2.png",
//     'Feature 3: RPA Job Recommendation':"/img/projects/BIPJ/feature_3.png",
//     'Feature 4: Credit Scoring':"/img/projects/BIPJ/feature_4.png"},
// role_desc: 'Our website helps migrants securely maintain a digital identity on the Ropsten blockchain-accessed via MetaMask-for storing credentials, making payments, building credit scores, and connecting with communities. It uses APIs for face recognition, text extraction, geolocation, and translations; includes a digital wallet for payments and loyalty rewards; offers a community forum and job recommendations powered by UiPath; and features a chatbot for user inquiries. This streamlines the migration process, ensuring migrants retain critical proof of identity worldwide.',
// grade: "Distinction",
// date_from: new Date("2022-06-01"),
// date_to: new Date("2022-08-01"),
// skills: ["BLOCKCHAIN", "HTML", "CSS", "JS", "SQL", "NODEJS", "UIPATH"],
// techniques: ['<nobr><img class="proj_icon" src="/img/icons/face_recog.png" alt=""> Face Recognition</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/ocr_text.png" alt=""> OCR-Text</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/metamask.png" alt=""> MetaMask</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/rpa.png" alt=""> Robtobic Process Automation</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/encrypt.png" alt=""> Encryption</nobr>',
//     '<nobr><img class="proj_icon" src="/img/icons/scoring.png" alt=""> Credit Scoring</nobr>',
// ],
// front_end: 'This showcases some of the consumer interactive pages that the website has.',
// front_end_images: {'video':"/img/projects/BIPJ/RegTech_TeamRookies_PreliminaryVideo.mp4"},
// back_end: 'This showcases some of the administrative configuration pages that the website has.',
// back_end_images: {'video':"/img/projects/BIPJ/digipass_admin_site.mp4"},
// involvement_scheduling: "I lead this project and handle all scheduling throughout its lifecycle using a Scrum framework.",
// involvement_scheduling_images: {'Timeline':"/img/projects/BIPJ/schedule.png"},
// spec_features:["BLOCKCHAIN", "HTML", "CSS", "JS", "SQL", "NODEJS"],
// use_case:"",
// database_info: "Credentials and Digital Wallet are stored on Blockchain. However, user logins, credit scoring, job recommendations and coupon managements are backed by SQL.",
// database_images: {"SQL Schema": "/img/projects/BIPJ/sql_schema.png"}