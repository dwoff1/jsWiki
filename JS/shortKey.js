var abortAction = false;

document.addEventListener('keyup', controls);

function controls(e)
{
    if(abortAction) //if we we are in a input field etc
        return;

    switch(`${e.code}`)
    {
        case "KeyE":
            console.log('expand');
            break;
        case "KeyC":
            console.log("Collapse");
            break;
        case "KeyT":
            console.log("top");
            break;
        default:
            console.log(`${e.code}`);
    }
}