/*
    Author: Darryl Wall
    Last update: 27-11-2019
    -----------(Functions Index)
    XXXXX-> devlog(msg) -> A preconfigured dev information logging function, pushes to stack instead of display immediately
    XXXXX-> devlogP(msg) -> A preconfigured dev information logging function, displays in console as a warn (yellow) and puts on stack
    XXXXX-> customError(type, msg, displayLoc, isError) -> a low level message pipe, can set locations as dev, see declaration for more info
    XXXXX-> clearErrStack() -> empties errList
    XXXXX-> addErrLoc(id) -> adds a 'id' to errLoc array (ie <h id='x'> would be added by addErrLoc('x'))

    -----------(Var Index)
    XXXXX-> errList (array) - the stack storing errors
    XXXXX-> errLoc (array) - list of locations [id#, id] ie [1, "messageBoard"] where messageboard is a elem id
 */

//-------------GLOBAL VARS
    var errList =[];
    var errLoc = [];
    var currentErrLocId = 0;
    var testv; //a testing var (ie store parts)
//-------------FUNCTIONS

function devlog(msg)
{
    customError("Dev", msg, -1, true, false);
}

function devlogP(msg)
{
    customError("Dev", msg, 0, true, false);
}

/**
 * 
 * @param {String} type type of error ie logic, unhandled, user
 * @param {String} msg the message (ie 'value must be below 4')
 * @param {Int} displayLoc the int representing location, ie -1 stack, 0 console, ....
 * @param {Boolean} isError whether to use 'error' in message
 * @param {Boolean} append whether message clears or appends
 */
function customError(type, msg, displayLoc, isError, append)
{
    var midWording = " - ";
    if(isError)
         midWording = " error - ";
    fMsg = (type + midWording + msg);
    errList.push(fMsg);//always push a error to array stack
    switch(displayLoc)
    {
        case -1: //escape (already added to errList)
            break;
        case 0: console.warn(fMsg); //only put to console.
            break;
        default:
        if (displayLoc > 0 && displayLoc < errLoc.length) 
        {
            document.getElementById(errLocRef[displayLoc]).style.display = "block";
        
            if(append)
                document.getElementById(errLocRef[displayLoc]).innerText += fMsg;
            else
                document.getElementById(errLocRef[displayLoc]).innerText = fMsg;
        }
    }
}

function clearErrStack()
{
    errList = [];
}

function addErrLoc(id)
{
    errLoc[currentErrLocId++] = id;
    return currentErrLocId;
}





/*   OLD           OLD             OLD
-----------(Functions Index)
XXXXX-> customError(type, msg, displayLoc, isError) -> display error in chosen location and push errors to stack for debugging
XXXXX-> devlog(message) -> A preconfigured dev information logging function
XXXXX-> clearError(displayLoc) -> complementary function to customError, used to clear errors from users' screen

    Author: Darryl
    Last update: 1-8-2019
    Aim: include functions to standardise error handling including use of placeholders to display errors onto users screen

    Examples:
    customError("Debug", "numOfCells: " + numOfCells, -1, false); //will push the msg "Debug - numOfCells: 12" to the stack (not visible to user)
    customError('Column weighting', 'Weight (%) not specified for 1 or more columns.', 2, true); //will display msg "Column weighting error - weight (%) not specified for 1 or more columns." in the column error placeholder & push to stack
    devlog("Save clicked") //will push msg "Debug - save clicked" to stack
 
//-----------------(Global vars)
var errLocRef = ['none', 'errorDisplayRow', 'errorDisplayCol', 'errorDisplayRand']; //the id's for errors to display (0->length) ie errLocRef[1] is allows retrieval of element with errorDisplayRow ID
var errors = new Array();
//-----------------(Functions)
/*display error in chosen location and push errors to stack for debugging
    type: type of error occuring ie 'Logic'
    msg: message to output (to console or user depending on displayLoc) ie 'too many rows for supplied data'
    displayLoc: -1 push only, 0 log immediately to console, 1+ show specific error to user ie 0
    isError: boolean of whether to ommit 'error' from middle of log sentance

function customError(type, msg, displayLoc, isError) {//displayLoc 0 = none, 1 = row, 2 = column, 3 = rand
    var midWording = " - ";
    if(isError)
         midWording = " error - ";
    errors.push(type + midWording + msg);//always push a error to array stack
    displayLoc === 0 ? console.warn(type + midWording + msg) : null;
    if (displayLoc > 0 && displayLoc < errLocRef.length) 
    {//for display immediate or a specific type
        document.getElementById(errLocRef[displayLoc]).style.display = "block";
        document.getElementById(errLocRef[displayLoc]).innerText = type + midWording + msg;
    }
}

/*Version to allow <a> (ie overrides etc
    function customErrorFunction(type, msg, displayLoc, isError, fn, fnMsg) {
        customError(type, msg, displayLoc, isError);
        document.getElementById(errLocRef[displayLoc]).innerHTML += '<button class="btn btn-danger" onclick="' + fn + '">' + fnMsg + '</button>';
    }

/* A preconfigured dev information logging function 
   Assumption, dev logging is for pushing non-error type information to the stack

function devlog(message)
{
    customError('Debug', message, -1, false);
}
//to be called manually post development to allow debugging
function displayAllErrors() {
    console.error("All ERRORS:");
    errors.forEach(function (storedError) { console.warn(storedError) }); //display the errors leading to the run demise
    //pop (hence remove error from stack or keep (thinking)
}

//complementary function to customError, used to clear errors from users' screen
function clearError(displayLoc)
{
    if(displayLoc > 0 && displayLoc < errLocRef.length)
        document.getElementById(errLocRef[displayLoc]).style.display = "none";
}

function test()
{
    console.log('test');
} */