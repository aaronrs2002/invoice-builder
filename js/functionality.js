/*import React, { useState, useEffect } from "react";
import timestamp from "./timestamp";
import renderHTML from 'react-render-html';
import axios from "axios";
import Validate from "./Validate";*/

//const WorkOrderForm = (props) => {

/* let [eventsNum, setEventsNum] = useState([]);
 let [eventArr, setEventArr] = useState([]);
 let [imagesNum, setImagesNum] = useState([]);
 let [imagesArr, setImagesArr] = useState([]);
 let [videosNum, setVideosNum] = useState([]);
 let [videosArr, setVideosArr] = useState([]);
 let [formsNum, setFormsNum] = useState([]);
 let [formsArr, setFormsArr] = useState([]);
 let [encryptedNum, setEncryptedNum] = useState([]);
 let [encryptedArr, setEncryptedArr] = useState([]);
 let [crudNum, setCrudNum] = useState([]);
 let [crudArr, setCrudArr] = useState([]);
 let [htmlOutput, setHtmlOutput] = useState("");
 let [loaded, setLoaded] = useState(false);
 let [allOrders, setAllOrders] = useState([]);
 let [timeStampEmail, setTimeStampEmail] = useState();
 let [activeOrder, setActiveOrder] = useState("default");*/
let eventsNum = [];
let eventArr = [];
let imagesNum = [];
let imagesArr = [];
let videosNum = [];
let videosArr = [];
let formsNum = [];
let formsArr = [];
let encryptedNum = [];
let encryptedArr = [];
let crudNum = [];
let crudArr = [];
let htmlOutput = "";
let loaded = false;
let allOrders = [];
let timeStampEmail = null;
let activeOrder = "default";
let numbers = [];
for (let i = 0; i < 25; i++) {
    numbers.push(i);
}

[].forEach.call(document.querySelectorAll("[numbers-total]"), (e, i) => {
    let totalNum = e.getAttribute("numbers-total");

    let selectHTML = "";
    for (let i = 0; i < numbers.length; i++) {
        if (i < totalNum) {
            selectHTML = selectHTML + "<option value='" + i + "'>" + i + "</option>"
        }

    }

    e.innerHTML = selectHTML;

})

//CLIENT SIDE GET ALL WITHIN A DECADE
const loadIds = () => {
    axios.get("/api/workOrder/allOrderIds/202", props.config).then(
        (res) => {
            if (res.data.affectedRows === 0) {
                props.showAlert("Message: " + res.data.message, "warning");
            } else {
                //setAllOrders((allOrders) => res.data);
                allOrders = res.data;
            }
        },
        (error) => {
            console.log(error);
            props.showAlert(
                "Your submission did not go through.",
                "danger"
            );
        }
    );
}


const exportToHTML = (method) => {

    Validate(["fname", "lname", "email", "phone", "domain", "price", "supportRate", "developementRate"]);

    let fname = document.querySelector("[name='fname']").value;
    let lname = document.querySelector("[name='lname']").value;
    let email = document.querySelector("[name='email']").value;
    let phone = document.querySelector("[name='phone']").value;


    //clientSupport
    let clientSupport = "No Support";
    if (document.querySelector("[name='clientSupport']").checked) {
        clientSupport = "Yes Client Site Support";
    }

    let hosting = "No Hosting";
    if (document.querySelector("[name='hosting']").checked) {
        hosting = "Yes Hosting";
    }
    let securityCert = "No SSL Certificate";
    if (document.querySelector("[name='securityCert']").checked) {
        securityCert = "Yes SSL Certificate";
    }

    let howManyPgs = document.querySelector("[name='howManyPgs']").value;

    let contactForm = "No contact form";
    if (document.querySelector("[name='contactForm']").checked) {
        contactForm = "Yes contact form";
    }

    let weatherAPI = "No weather API";
    if (document.querySelector("[name='weatherAPI']").checked) {
        weatherAPI = "Yes weather API";
    }

    let banners = "No banners";
    if (document.querySelector("[name='banners']").checked) {
        banners = "Yes banners";
    }

    let analytics = "No Google Analytics";
    if (document.querySelector("[name='analytics']").checked) {
        analytics = "Yes Google Analytics";
    }


    let content = "No content modules";
    if (document.querySelector("[name='content']").checked) {
        content = "Yes content modules";
    }
    let blog = document.querySelector("[name='blog']").value;

    const openUl = "<ul>";
    const closeUl = "</ul>";

    /*events module*/
    let events = "";
    let tempEvents = [];
    [].forEach.call(document.querySelectorAll("input[name^='events']"), function (e, i) {
        events = events + "<li>Event Module " + (i + 1) + " page name: " + e.value + "</li>";
        tempEvents.push(e.value);
    });
    //setEventArr((eventArr) => tempEvents);
    eventArr = tempEvents;
    let eventModules = openUl + events + closeUl;

    /*images module*/
    let images = "";
    let tempImages = [];
    [].forEach.call(document.querySelectorAll("input[name^='images']"), function (e, i) {
        images = images + "<li>Image Carousel Module " + (i + 1) + " page name: " + e.value + "</li>";
        tempImages.push(e.value);
    });
    //setImagesArr((imagesArr) => tempImages);
    imagesArr = tempImages;
    let imageCarouselModules = openUl + images + closeUl;

    /*videos module*/
    let videos = "";
    let tempVideos = [];
    [].forEach.call(document.querySelectorAll("input[name^='videos']"), function (e, i) {
        videos = videos + "<li>Video Carousel Module " + (i + 1) + " page name: " + e.value + "</li>";
        tempVideos.push(e.value);
    });
    // setVideosArr((videosArr) => tempVideos);
    videosArr = tempVideos;
    let videoCarouselModules = openUl + videos + closeUl;

    /*forms module*/
    let forms = "";
    let tempForms = [];
    [].forEach.call(document.querySelectorAll("input[name^='forms']"), function (e, i) {
        forms = forms + "<li>Form Module " + (i + 1) + " page name: " + e.value + "</li>";
        tempForms.push(e.value);
    });
    // setFormsArr((formsArr) => tempForms);
    formsArr = tempForms;
    let formsModules = openUl + forms + closeUl;
    if (tempForms.length === 0) {
        forms = "No forms in client side application";
    }

    let jwtLogin = "No JWT login";
    if (document.querySelector("[name='jwtLogin']").checked) {
        jwtLogin = "Yes JWT login";
    };
    let dbBackup = "No DB Backup";
    if (document.querySelector("[name='dbBackup']").checked) {
        dbBackup = "Yes bi-weekly DB Backup";
    }

    let dbSupport = "No Admin and Database Support";
    if (document.querySelector("[name='dbSupport']").checked) {
        dbSupport = "Yes Admin and Database Support";
    }

    let merchantAccount = "No merchant account";
    if (document.querySelector("[name='merchantAccount']").checked) {
        merchantAccount = "Yes merchant account";
    }
    let databaseType = document.querySelector("[name='databaseType']").value;

    /*encrypted module*/
    let encrypted = "";
    let tempEncrypted = [];
    [].forEach.call(document.querySelectorAll("input[name^='encrypted']"), function (e, i) {
        encrypted = encrypted + "<li>Encrypted value " + (i + 1) + ": " + e.value + "</li>";
        tempEncrypted.push(e.value);
    });
    //setEncryptedArr((encryptedArr) => tempEncrypted);
    encryptedArr = tempEncrypted;
    let encryptedModules = openUl + encrypted + closeUl;

    /*crud module*/
    let crud = "";
    let tempCrud = [];
    [].forEach.call(document.querySelectorAll("input[name^='crud']"), function (e, i) {
        crud = crud + "<li>CRUD " + (i + 1) + ": " + e.value + "</li>";
        tempCrud.push(e.value);
    });
    //setCrudArr((crudArr) => tempCrud);
    crudArr = tempCrud;

    let crudModules = openUl + crud + closeUl;
    let details = document.querySelector("textarea[name='details']").value;

    let formDetails = "No unique forms";
    if (formsModules.length > 0) {
        formDetails = formsModules;
    }


    let htmlString = "<h2>Web-Presence LLC Work Order</h2><h5>" + timestamp(new Date()) + "</h5><div><ul><li>" + fname + " " + lname + "</li><li>" + email + "</li><li>" +
        phone + "</li><li>Price: " + document.querySelector("[name='price']").value + "</li><li>Monthly Support Rate: " + document.querySelector("[name='supportRate']").value + "</li><li>Developer Rate: " + document.querySelector("[name='developementRate']").value + "</li><li>Domain: " +
        document.querySelector("[name='domain']").value + "</li><li>" + clientSupport + "</li><li>" + hosting + "</li><li>" + securityCert + "</li><li>How many HTML pages: " + howManyPgs + "</li><li>" + contactForm + "</li><li>" +
        weatherAPI + "</li><li>" + banners + "</li><li>" + analytics + "</li><li>" + content + "</li><li>Content Management System for admin use only</li><li>Blog address: " + blog + "</li><li>Event Modules: " + eventModules + "</li><li>Image Carousel Modules: " + imageCarouselModules + "</li><li>Video Carousel Modules: " +
        videoCarouselModules + "</li><li>Form modules: " + formDetails + "</li><li>" + dbSupport + "</li><li>" + dbBackup + "</li><li>" + jwtLogin + "</li><li>" + merchantAccount + "</li><li>" + databaseType + "</li><li>Encrypted Values: " + encryptedModules + "</li><li>CRUD Modules: " + crudModules + "</li><li>Details: <p>" + details + "</p></li></ul></div>";
    let id = timeStampEmail;
    if (method === "default") {
        id = timestamp(new Date()) + ":" + email;
    }

    const data = {
        timestampEmail: id,
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        supportRate: document.querySelector("[name='supportRate']").value,
        developementRate: document.querySelector("[name='developementRate']").value,
        domain: document.querySelector("[name='domain']").value,
        clientSupport,
        hosting,
        securityCert,
        howManyPgs,
        contactForm,
        weatherAPI,
        banners,
        analytics,
        content,
        blog,
        eventModules: JSON.stringify(tempEvents),
        imageCarouselModules: JSON.stringify(tempImages),
        videoCarouselModules: JSON.stringify(tempVideos),
        formsModules: JSON.stringify(tempForms),
        jwtLogin,
        dbBackup,
        dbSupport,
        merchantAccount,
        databaseType,
        encryptedModules: JSON.stringify(tempEncrypted),
        crudModules: JSON.stringify(tempCrud),
        details,
        price: parseInt(document.querySelector("[name='price']").value).toFixed(2)
    }


    /* if (method === "default") {
         axios.post("/api/workOrder/post-workOrder/", data, props.config).then(
             (res) => {
                 if (res.data.affectedRows === 0) {
                     props.showAlert("Message: " + res.data.message, "warning");
                 } else {
                     props.showAlert("Posted successfully!", "success");
                 }
             },
             (error) => {
                 console.log(error);
                 props.showAlert(
                     "Your submission did not go through.",
                     "danger"
                 );
             }
         );
     }
     if (method === "update") {
         axios.put("/api/workOrder/updateWorkOrder/", data, props.config).then(
             (res) => {
                 if (res.data.affectedRows === 0) {
                     props.showAlert("Message: " + res.data.message, "warning");
                 } else {
                     props.showAlert("Updated successfully!", "success");
                 }
             },
             (error) => {
                 console.log(error);
                 props.showAlert(
                     "Your submission did not go through.",
                     "danger"
                 );
             }
         );
     }*/
    // setHtmlOutput((htmlOutput) => htmlString);
    htmlOutput = htmlString;

    document.getElementById("HTML_Target").innerHTML = htmlOutput;
}


const buildFields = (fieldName) => {
    let howMany = document.querySelector("select[name='" + fieldName + "']").value;
    let tempList = [];
    for (let i = 0; i < Number(howMany); i++) {
        tempList.push(i);
    }

    switch (fieldName) {
        case 'events':
            //setEventArr((eventArr) => tempList);
            eventArr = tempList;
            break;
        case 'images':
            // setImagesArr((imagesArr) => tempList);
            imagesArr = tempList;
            break;
        case 'videos':
            //setVideosArr((videosArr) => tempList);
            videosArr = tempList;
            break;
        case 'forms':
            // setFormsArr((formsArr) => tempList);
            formsArr = tempList;
            break;
        case 'encrypted':
            // setEncryptedArr((encryptedArr) => tempList);
            encryptedArr = tempList;
            break;
        case 'crud':
            // setCrudArr((crudArr) => tempList);
            crudArr = tempList;
            break;
    }
}


const formSelection = () => {
    const whichOrder = document.querySelector("select[name='whichOrder']").value;
    if (whichOrder === "default") {
        [].forEach.call(document.querySelectorAll("input[type='text'], textarea"), function (e, i) {
            e.value = "";
        });
        [].forEach.call(document.querySelectorAll("select"), function (e, i) {
            e.selectedIndex = 0;
        });
        [].forEach.call(document.querySelectorAll("input[type='checkbox']"), function (e, i) {
            e.checked = false;
        });
        //setEventArr((eventArr) => []);
        eventArr = [];
        //setImagesArr((imagesArr) => []);
        imagesArr = [];
        //setVideosArr((videosArr) => []);
        videosArr = [];
        // setFormsArr((formsArr) => []);
        formsArr = [];
        // setEncryptedArr((encryptedArr) => []);
        encryptedArr = [];
        // setCrudArr((crudArr) => []);
        crudArr = [];
        return false;
    }
    // setActiveOrder((activeOrder) => whichOrder);
    activeOrder = whichOrder;

    /* axios.get("/api/workOrder/specificOrder/" + whichOrder, props.config).then(
         (res) => {
             if (res.data.affectedRows === 0) {
                 props.showAlert("Message: " + res.data.message, "warning");
             } else {
 
                 //setTimeStampEmail((timestampEmail) => res.data[0].timestampEmail);
                 timestampEmail = res.data[0].timestampEmail;
                 document.querySelector("[name='fname']").value = res.data[0].fname;
                 document.querySelector("[name='lname']").value = res.data[0].lname;
                 document.querySelector("[name='email']").value = res.data[0].email;
                 document.querySelector("[name='phone']").value = res.data[0].phone;
                 document.querySelector("[name='domain']").value = res.data[0].domain;
                 document.querySelector("[name='price']").value = res.data[0].price;
                 document.querySelector("[name='supportRate']").value = res.data[0].supportRate;
                 document.querySelector("[name='developementRate']").value = res.data[0].developementRate;
 
                 if (res.data[0].clientSupport.indexOf("Yes") !== -1) {
                     document.querySelector("[name='clientSupport']").checked = true;
                 }
 
                 if (res.data[0].hosting.indexOf("Yes") !== -1) {
                     document.querySelector("[name='hosting']").checked = true;
                 }
 
                 if (res.data[0].securityCert.indexOf("Yes") !== -1) {
                     document.querySelector("[name='securityCert']").checked = true;
                 }
 
                 document.querySelector("[name='howManyPgs']").value = res.data[0].howManyPgs;
 
                 if (res.data[0].contactForm.indexOf("Yes") !== -1) {
                     document.querySelector("[name='contactForm']").checked = true;
                 }
                 if (res.data[0].weatherAPI.indexOf("Yes") !== -1) {
                     document.querySelector("[name='weatherAPI']").checked = true;
                 }
                 if (res.data[0].banners.indexOf("Yes") !== -1) {
                     document.querySelector("[name='banners']").checked = true;
                 }
                 if (res.data[0].analytics.indexOf("Yes") !== -1) {
                     document.querySelector("[name='analytics']").checked = true;
                 }
                 if (res.data[0].content.indexOf("Yes") !== -1) {
                     document.querySelector("[name='content']").checked = true;
                 }
                 document.querySelector("[name='blog']").value = res.data[0].blog;
 
                 if (res.data[0].jwtLogin.indexOf("Yes") !== -1) {
                     document.querySelector("[name='jwtLogin']").checked = true;
                 }
 
                 if (res.data[0].dbBackup.indexOf("Yes") !== -1) {
                     document.querySelector("[name='dbBackup']").checked = true;
                 }
 
                 if (res.data[0].dbSupport.indexOf("Yes") !== -1) {
                     document.querySelector("[name='dbSupport']").checked = true;
                 }
 
                 if (res.data[0].merchantAccount.indexOf("Yes") !== -1) {
                     document.querySelector("[name='merchantAccount']").checked = true;
                 }
 
                 document.querySelector("[name='databaseType']").value = res.data[0].databaseType;
                 document.querySelector("[name='details']").value = res.data[0].details;
 
 
                 //setEventArr((eventArr) => JSON.parse(res.data[0].eventModules));
                 eventArr = JSON.parse(res.data[0].eventModules);
                 //setImagesArr((imagesArr) => JSON.parse(res.data[0].imageCarouselModules));
                 imagesArr = JSON.parse(res.data[0].imageCarouselModules);
                 //setVideosArr((videosArr) => JSON.parse(res.data[0].videoCarouselModules));
                 videosArr = JSON.parse(res.data[0].videoCarouselModules);
                 //setFormsArr((formsArr) => JSON.parse(res.data[0].formsModules));
                 formsArr = JSON.parse(res.data[0].formsModules);
                 // setEncryptedArr((encryptedArr) => JSON.parse(res.data[0].encryptedModules));
                 encryptedArr = JSON.parse(res.data[0].encryptedModules);
                 // setCrudArr((crudArr) => JSON.parse(res.data[0].crudModules));
                 crudArr = JSON.parse(res.data[0].crudModules);
 
                 const list = [JSON.parse(res.data[0].eventModules), JSON.parse(res.data[0].imageCarouselModules), JSON.parse(res.data[0].videoCarouselModules), JSON.parse(res.data[0].formsModules), JSON.parse(res.data[0].encryptedModules), JSON.parse(res.data[0].crudModules)];
                 const names = ["events", "images", "videos", "forms", "encrypted", "crud"];
                 setTimeout(() => {
                     for (let i = 0; i < names.length; i++) {
                         for (let j = 0; j < list[i].length; j++) {
                             if (document.querySelector("[name='" + names[i] + "-" + j + "']")) {
                                 document.querySelector("[name='" + names[i] + "-" + j + "']").value = list[i][j];
                             }
                         }
                     }
                     exportToHTML("view");
                 }, 500);
             }
         },
         (error) => {
             console.log(error);
             props.showAlert(
                 "Your submission did not go through.",
                 "danger"
             );
         }
     );*/

    exportToHTML("view");

}

/*
    useEffect(() => {


        loadIds();

    }, [])
    */