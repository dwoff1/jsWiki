function triggerButton(triggerObj, functionName)
{
    eval(functionName) //really bad way, thinking of better
    triggerObj.classList.add("active");
}

function aTest()
{
    console.log("TW");
}


//------------------(Seed functions)
    //-for JSON compliance/loading
    var allowReset = false;
    var letterIndex = 0;
    var letter = ['a','b','c','d','e','f','g','h','i','j'];
    var seedDefault = "&*$"; //assumed this to be unlikely in the 'wild' defined in generator

    //aim: create a unique seed until resetSeedCount() is run
    //ie does "&*$a" for 1, "&*$j" for 10 then "&*$ja" for 11
    //assumption user wont create more then 10 columns or 10 rows anyway so minor loss of unique seeds permitted
    function seedIdenty()
    {
        seed = seedDefault;
        var intermidIndex = (++letterIndex);
        while(intermidIndex > 10)
        {
            seed += letter[9];
            intermidIndex -= 10;
        }
        seed += letter[(intermidIndex-1)];
        //seed = letter[letterIndex++];
        return seed;
    }
    
    function resetSeedCount()
    {
        letterIndex = 0;
    }

    function resumeSeedAt(index)
    {
        letterIndex = index;
    }

    function stripSeed(input)
    {
        var endOfLine = input.lastIndexOf(seedDefault);
        if(endOfLine > 0)
        {
            return input.slice(0, endOfLine);
        }
        else
        {
            customError("Logic", "Unable to find the unique seed, please try again or contact support", 3, true);
            return "error";
        }  
    }