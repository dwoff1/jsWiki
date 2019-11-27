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

var defaultJSON = "{\"title\":\"A Test\"}";
var defaultAStore;
function loadJSON()
{
    defaultAStore = JSON.parse(defaultJSON);
    //load title
    document.getElementById('pageTitle').innerText = defaultAStore['title'];
    document.getElementById('mainTitle').innerText = defaultAStore['title'];
}