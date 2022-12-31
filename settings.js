document.querySelector(".done-button").addEventListener("click", enterNewID);

function enterNewID () {
    var newID = document.querySelector(".settings").value;

    // https://docs.google.com/spreadsheets/d/1KbdS2oqMBE-Nl8z5Pp3a5wJqZXIQYzPVcPfavGdausU/edit#gid=0

    try{
        let fullLink = newID;
        const fullLinkSplit = fullLink.split("https://docs.google.com/spreadsheets/d/");
        const finalSplit = fullLinkSplit[1].split("/edit");
        var finalID = finalSplit[0];
        localStorage.setItem('spreadsheetID', finalID);
    }
    catch(err){
        console.log(err);
    }
}