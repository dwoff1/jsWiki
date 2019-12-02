/*
    Author: Darryl Wall
    Last update: 27-11-2019
    -----------(Functions Index)
    XXXXX-> loadJSON()
    XXXXX-> 
    XXXXX-> 
    XXXXX-> 
    XXXXX-> 

    -----------(Var Index)
    XXXXX-> 
    XXXXX-> defaultJSON used for developement, stores a basic json struct
    XXXXX-> defaultAStore used for development, stores the parsed json
 */

var defaultJSON = '{"title": "A title","description": "A brief summary of the reason for the page/ what it applies to","mainInfo": {"Classification": "Telephony->Deskphone","Support Contact": "John Smith (Telephones inc) 03 0000 0000","Device": "Deskphone","Model/OS": "Alcatel 550"},"keynote": "Alcatel has blocked access to korea https://sdsfsdf.dsf.sdf/cdsfds","mainBody": {"textStep": "Begin by checking for power","choicestep": {"mainTxt":"testmain", "500 model": {"ImgStep": {"url":"//aserver/img/a.jpg", "mainTxt": "note the red plug"}},"550 model": {"ImgStep": "//aserver/img/b.jpg","textStep": "watch for stuck down toggles"}},"textStep1": "Check extension is showing"}}';
var defaultAStore;
var defA = [];
function loadJSON()
{
    defaultAStore = JSON.parse(defaultJSON);
    //load title
    document.getElementById('pageTitle').innerText = defaultAStore['title'];
    document.getElementById('mainTitle').innerText = defaultAStore['title'];
    //loadDescription
    document.getElementById('pageReason').innerText = defaultAStore['description'];
    //load yellow box
    document.getElementById('mainInfo').getElementsByTagName('b')[0].insertAdjacentHTML('afterend', defaultAStore["mainInfo"]['Classification']);
    document.getElementById('mainInfo').getElementsByTagName('b')[1].insertAdjacentHTML('afterend', defaultAStore["mainInfo"]['Support Contact']);
    document.getElementById('mainInfo').getElementsByTagName('b')[2].insertAdjacentHTML('afterend', defaultAStore["mainInfo"]['Device']);
    document.getElementById('mainInfo').getElementsByTagName('b')[3].insertAdjacentHTML('afterend', defaultAStore["mainInfo"]['Model/OS']);
    //load key note message
    try{
        document.getElementById('keyNote').innerText = defaultAStore['keynote'];
    } catch{devlog("Fail at keynote, likely no keynote");}
    //load content
    testv = defaultAStore.mainBody;
    for(x=0;x<Object.keys(defaultAStore.mainBody).length;x++)
    {
        var t = Object.keys(defaultAStore.mainBody)[x];
        devlogP("current key is " + t);
        selectTypeStep(t, defaultAStore.mainBody);
    }
}

function selectTypeStep(t, activeHeight)
{
    switch(t)
    {
        case "textStep": generateTextStep(activeHeight[t]);
            break;
        case "imgStep": generateImgStep(activeHeight[t]['text'], activeHeight[t]['url']);
            break;
        case "choicestep":
                generateChoiceStep(activeHeight[t]['mainTxt'], activeHeight[t]);
            break;
    }
}
//dead end step (ie just text)
function generateTextStep(text)
{
    document.getElementById('mainBody').insertAdjacentHTML('beforeend', "<li>" + text + "</li>");
}

//ie step description then a img, then a caption (ie maybe url of img)
function generateImgStep(mainText, imgURL, imgCaption)
{
    document.getElementById('mainBody').insertAdjacentHTML('beforeend', "<li>" + mainText + " " + imgURL + "</li>");
}

//ie accordian laptop, desktop, mobile etc
//string, array
function generateChoiceStep(mainText, choices)
{
    fTxt = "<div>" + mainText;
    for(x=1;x<Object.keys(choices).length;x++)
    {
        var t = Object.keys(choices)[x];
        devlogP("current key is " + t);
        document.getElementById('mainBody').insertAdjacentHTML('beforeend', "<div><button>" + t + "</button></div>");
        //selectTypeStep(t, defaultAStore.mainBody);
    }
    //choices.foreach()
    //document.getElementById('mainBody').insertAdjacentHTML('beforeend', "<div><button>" + "xi" + "</button></div>");
}

