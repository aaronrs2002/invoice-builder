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
let invoices = []


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

});

if (localStorage.getItem("companyName")) {
    document.querySelector("input[name='companyName']").value = localStorage.getItem("companyName");
}

if (localStorage.getItem("invoices")) {
    let tempList = [];
    invoices = JSON.parse(localStorage.getItem("invoices"));


    let invoiceOptionsHTML = document.querySelector("[name='whichOrder']").innerHTML;
    for (let i = 0; i < invoices.length; i++) {
        if (tempList.indexOf(invoices[i].domain) === -1 && invoices[i].domain) {
            invoiceOptionsHTML = invoiceOptionsHTML + "<option value='" + i + "'>" + invoices[i].domain + "</option>";
            tempList.push(invoices[i].domain);
        }

    }
    document.querySelector("[name='whichOrder']").innerHTML = invoiceOptionsHTML;
}




//CLIENT SIDE GET ALL WITHIN A DECADE
/*const loadIds = () => {
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
}*/


const exportToHTML = (method) => {




    Validate(["fname", "lname", "email", "phone", "domain", "price", "supportRate", "developementRate", "companyName"]);

    if (document.querySelector(".error")) {
        globalAlert("alert-warning", "There is an isssue with your form");
        //globalAlert(alertLevel, message) 
        return false;

    }
    document.getElementById("legalText").classList.remove("hide");
    localStorage.setItem("companyName", document.querySelector("[name='companyName']").value);
    setTimeout(() => {
        [].forEach.call(document.querySelectorAll(".companyName"), (e) => {
            e.innerHTML = document.querySelector("[name='companyName']").value;
        });
    }, 1000);

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


    let htmlString = "<h2><span class='companyName'></span> Work Order</h2><h5>" + timestamp(new Date()) + "</h5><div><ul><li>" + fname + " " + lname + "</li><li>" + email + "</li><li>" +
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

    if (!data.domain) {
        return false;
    }
    if (method === "default") {
        let validCk = true;
        for (let i = 0; i < invoices.length; i++) {
            if (invoices[i].domain === data.domain) {
                invoices[i] = data;
                validCk = null;
            }
        }


        if (validCk) {
            invoices = [...invoices, data];
        }

        localStorage.setItem("invoices", JSON.stringify(invoices));
    } else {
        invoices[activeOrder] = data;
        localStorage.setItem("invoices", JSON.stringify(invoices));
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
    return false;
}


const buildFields = (fieldName) => {
    let howMany = document.querySelector("select[name='" + fieldName + "']").value;
    let inputHTML = "";
    for (let i = 0; i < howMany; i++) {
        inputHTML = inputHTML + "<input type='text' class='form-control' placeholder='" + fieldName + "-" + i + "' name='" + fieldName + "-" + i + "' />"
    }

    document.querySelector("[data-target='" + fieldName + "']").innerHTML = inputHTML;
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
 
                 //setTimeStampEmail((timestampEmail) => invoices[activeOrder].timestampEmail);
                 timestampEmail = invoices[activeOrder].timestampEmail;
                 document.querySelector("[name='fname']").value = invoices[activeOrder].fname;
                 document.querySelector("[name='lname']").value = invoices[activeOrder].lname;
                 document.querySelector("[name='email']").value = invoices[activeOrder].email;
                 document.querySelector("[name='phone']").value = invoices[activeOrder].phone;
                 document.querySelector("[name='domain']").value = invoices[activeOrder].domain;
                 document.querySelector("[name='price']").value = invoices[activeOrder].price;
                 document.querySelector("[name='supportRate']").value = invoices[activeOrder].supportRate;
                 document.querySelector("[name='developementRate']").value = invoices[activeOrder].developementRate;
 
                 if (invoices[activeOrder].clientSupport.indexOf("Yes") !== -1) {
                     document.querySelector("[name='clientSupport']").checked = true;
                 }
 
                 if (invoices[activeOrder].hosting.indexOf("Yes") !== -1) {
                     document.querySelector("[name='hosting']").checked = true;
                 }
 
                 if (invoices[activeOrder].securityCert.indexOf("Yes") !== -1) {
                     document.querySelector("[name='securityCert']").checked = true;
                 }
 
                 document.querySelector("[name='howManyPgs']").value = invoices[activeOrder].howManyPgs;
 
                 if (invoices[activeOrder].contactForm.indexOf("Yes") !== -1) {
                     document.querySelector("[name='contactForm']").checked = true;
                 }
                 if (invoices[activeOrder].weatherAPI.indexOf("Yes") !== -1) {
                     document.querySelector("[name='weatherAPI']").checked = true;
                 }
                 if (invoices[activeOrder].banners.indexOf("Yes") !== -1) {
                     document.querySelector("[name='banners']").checked = true;
                 }
                 if (invoices[activeOrder].analytics.indexOf("Yes") !== -1) {
                     document.querySelector("[name='analytics']").checked = true;
                 }
                 if (invoices[activeOrder].content.indexOf("Yes") !== -1) {
                     document.querySelector("[name='content']").checked = true;
                 }
                 document.querySelector("[name='blog']").value = invoices[activeOrder].blog;
 
                 if (invoices[activeOrder].jwtLogin.indexOf("Yes") !== -1) {
                     document.querySelector("[name='jwtLogin']").checked = true;
                 }
 
                 if (invoices[activeOrder].dbBackup.indexOf("Yes") !== -1) {
                     document.querySelector("[name='dbBackup']").checked = true;
                 }
 
                 if (invoices[activeOrder].dbSupport.indexOf("Yes") !== -1) {
                     document.querySelector("[name='dbSupport']").checked = true;
                 }
 
                 if (invoices[activeOrder].merchantAccount.indexOf("Yes") !== -1) {
                     document.querySelector("[name='merchantAccount']").checked = true;
                 }
 
                 document.querySelector("[name='databaseType']").value = invoices[activeOrder].databaseType;
                 document.querySelector("[name='details']").value = invoices[activeOrder].details;
 
 
                 //setEventArr((eventArr) => JSON.parse(invoices[activeOrder].eventModules));
                 eventArr = JSON.parse(invoices[activeOrder].eventModules);
                 //setImagesArr((imagesArr) => JSON.parse(invoices[activeOrder].imageCarouselModules));
                 imagesArr = JSON.parse(invoices[activeOrder].imageCarouselModules);
                 //setVideosArr((videosArr) => JSON.parse(invoices[activeOrder].videoCarouselModules));
                 videosArr = JSON.parse(invoices[activeOrder].videoCarouselModules);
                 //setFormsArr((formsArr) => JSON.parse(invoices[activeOrder].formsModules));
                 formsArr = JSON.parse(invoices[activeOrder].formsModules);
                 // setEncryptedArr((encryptedArr) => JSON.parse(invoices[activeOrder].encryptedModules));
                 encryptedArr = JSON.parse(invoices[activeOrder].encryptedModules);
                 // setCrudArr((crudArr) => JSON.parse(invoices[activeOrder].crudModules));
                 crudArr = JSON.parse(invoices[activeOrder].crudModules);
 
                 const list = [JSON.parse(invoices[activeOrder].eventModules), JSON.parse(invoices[activeOrder].imageCarouselModules), JSON.parse(invoices[activeOrder].videoCarouselModules), JSON.parse(invoices[activeOrder].formsModules), JSON.parse(invoices[activeOrder].encryptedModules), JSON.parse(invoices[activeOrder].crudModules)];
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



    timestampEmail = invoices[activeOrder].timestampEmail;
    document.querySelector("[name='fname']").value = invoices[activeOrder].fname;
    document.querySelector("[name='lname']").value = invoices[activeOrder].lname;
    document.querySelector("[name='email']").value = invoices[activeOrder].email;
    document.querySelector("[name='phone']").value = invoices[activeOrder].phone;
    document.querySelector("[name='domain']").value = invoices[activeOrder].domain;
    document.querySelector("[name='price']").value = invoices[activeOrder].price;
    document.querySelector("[name='supportRate']").value = invoices[activeOrder].supportRate;
    document.querySelector("[name='developementRate']").value = invoices[activeOrder].developementRate;

    if (invoices[activeOrder].clientSupport.indexOf("Yes") !== -1) {
        document.querySelector("[name='clientSupport']").checked = true;
    }

    if (invoices[activeOrder].hosting.indexOf("Yes") !== -1) {
        document.querySelector("[name='hosting']").checked = true;
    }

    if (invoices[activeOrder].securityCert.indexOf("Yes") !== -1) {
        document.querySelector("[name='securityCert']").checked = true;
    }

    document.querySelector("[name='howManyPgs']").value = invoices[activeOrder].howManyPgs;

    if (invoices[activeOrder].contactForm.indexOf("Yes") !== -1) {
        document.querySelector("[name='contactForm']").checked = true;
    }
    if (invoices[activeOrder].weatherAPI.indexOf("Yes") !== -1) {
        document.querySelector("[name='weatherAPI']").checked = true;
    }
    if (invoices[activeOrder].banners.indexOf("Yes") !== -1) {
        document.querySelector("[name='banners']").checked = true;
    }
    if (invoices[activeOrder].analytics.indexOf("Yes") !== -1) {
        document.querySelector("[name='analytics']").checked = true;
    }
    if (invoices[activeOrder].content.indexOf("Yes") !== -1) {
        document.querySelector("[name='content']").checked = true;
    }
    document.querySelector("[name='blog']").value = invoices[activeOrder].blog;

    if (invoices[activeOrder].jwtLogin.indexOf("Yes") !== -1) {
        document.querySelector("[name='jwtLogin']").checked = true;
    }

    if (invoices[activeOrder].dbBackup.indexOf("Yes") !== -1) {
        document.querySelector("[name='dbBackup']").checked = true;
    }

    if (invoices[activeOrder].dbSupport.indexOf("Yes") !== -1) {
        document.querySelector("[name='dbSupport']").checked = true;
    }

    if (invoices[activeOrder].merchantAccount.indexOf("Yes") !== -1) {
        document.querySelector("[name='merchantAccount']").checked = true;
    }

    document.querySelector("[name='databaseType']").value = invoices[activeOrder].databaseType;
    document.querySelector("[name='details']").value = invoices[activeOrder].details;


    //setEventArr((eventArr) => JSON.parse(invoices[activeOrder].eventModules));
    eventArr = JSON.parse(invoices[activeOrder].eventModules);
    let eventsInputHTML = "";
    for (let i = 0; i < eventArr.length; i++) {
        eventsInputHTML = eventsInputHTML + "<input type='text' class='form-control' name='events-" + i + "' />";

    }
    document.querySelector("[data-target='events']").innerHTML = eventsInputHTML;
    //setImagesArr((imagesArr) => JSON.parse(invoices[activeOrder].imageCarouselModules));
    imagesArr = JSON.parse(invoices[activeOrder].imageCarouselModules);
    let imagesInputHTML = "";
    for (let i = 0; i < imagesArr.length; i++) {
        imagesInputHTML = imagesInputHTML + "<input type='text' class='form-control' name='images-" + i + "' />";

    }
    document.querySelector("[data-target='images']").innerHTML = imagesInputHTML;
    //setVideosArr((videosArr) => JSON.parse(invoices[activeOrder].videoCarouselModules));
    videosArr = JSON.parse(invoices[activeOrder].videoCarouselModules);
    let videosInputHTML = "";
    for (let i = 0; i < videosArr.length; i++) {
        videosInputHTML = videosInputHTML + "<input type='text' class='form-control' name='videos-" + i + "' />";

    }
    document.querySelector("[data-target='videos']").innerHTML = videosInputHTML;
    //setFormsArr((formsArr) => JSON.parse(invoices[activeOrder].formsModules));
    formsArr = JSON.parse(invoices[activeOrder].formsModules);
    let formsInputHTML = "";
    for (let i = 0; i < formsArr.length; i++) {
        formsInputHTML = formsInputHTML + "<input type='text' class='form-control' name='forms-" + i + "' />";

    }
    document.querySelector("[data-target='forms']").innerHTML = formsInputHTML;
    // setEncryptedArr((encryptedArr) => JSON.parse(invoices[activeOrder].encryptedModules));
    encryptedArr = JSON.parse(invoices[activeOrder].encryptedModules);
    let encryptedInputHTML = "";
    for (let i = 0; i < encryptedArr.length; i++) {
        encryptedInputHTML = encryptedInputHTML + "<input type='text' class='form-control' name='encrypted-" + i + "' />";

    }
    document.querySelector("[data-target='encrypted']").innerHTML = encryptedInputHTML;
    // setCrudArr((crudArr) => JSON.parse(invoices[activeOrder].crudModules));
    crudArr = JSON.parse(invoices[activeOrder].crudModules);

    let crudInputHTML = "";
    for (let i = 0; i < crudArr.length; i++) {
        crudInputHTML = crudInputHTML + "<input type='text' class='form-control' name='crud-" + i + "' />";

    }
    document.querySelector("[data-target='crud']").innerHTML = crudInputHTML;



    const list = [JSON.parse(invoices[activeOrder].eventModules), JSON.parse(invoices[activeOrder].imageCarouselModules), JSON.parse(invoices[activeOrder].videoCarouselModules), JSON.parse(invoices[activeOrder].formsModules), JSON.parse(invoices[activeOrder].encryptedModules), JSON.parse(invoices[activeOrder].crudModules)];
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

    exportToHTML("view");

}
function printInvoice() {
    window.print();
}

/*
    useEffect(() => {


        loadIds();

    }, [])




[{"timestampEmail":"2024-12-11_PM-03:15:53:try@this.org","fname":"Aaron","lname":"Smith","email":"try@this.org","phone":"555.555.5555","supportRate":"500","developementRate":"75","domain":"try-this.org","clientSupport":"Yes Client Site Support","hosting":"Yes Hosting","securityCert":"Yes SSL Certificate","howManyPgs":"5","contactForm":"Yes contact form","weatherAPI":"Yes weather API","banners":"Yes banners","analytics":"Yes Google Analytics","content":"Yes content modules","blog":"try-this.rss.blog.org","eventModules":"[\"summerEvents\",\"winterEvents\"]","imageCarouselModules":"[\"historyImages\",\"recruitmentImages\"]","videoCarouselModules":"[\"historyVideos\",\"prostectiveVideos\"]","formsModules":"[\"execForm\",\"registrationForm\"]","jwtLogin":"Yes JWT login","dbBackup":"Yes bi-weekly DB Backup","dbSupport":"Yes Admin and Database Support","merchantAccount":"Yes merchant account","databaseType":"MySQL","encryptedModules":"[\"ccNum\",\"ccDate\",\"ccSec\"]","crudModules":"[\"guestsAPI\",\"employeeAPI\",\"transactionsAPI\",\"archiveAPI\",\"accountingAPI\",\"transportationAPI\"]","details":"JS Apex chart required for employee hours","price":"5000.00"}]




    */