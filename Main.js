async function downloadTxtFile() {
    const filename = document.getElementById("FileName").value + ".html";
    const CustomURL = "https://"+ document.getElementById("GameURL").value;
    const TabName = document.getElementById("TabName").value;
    try {
        const response = await fetch("template.txt");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let templateContent = await response.text();
        templateContent = templateContent
            .replace('[GAMEURL]', CustomURL)
            .replace('[TABNAME]', TabName)

        const blob = new Blob([templateContent], { type: 'text/html' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);

        alert(`Custom file "${filename}" generated and downloaded!`);

    } catch (error) {
        console.error('Error processing template file:', error);
        alert('Failed to load or process the template file.');
    }
}
function PlayFabSignIn(){
    PlayFab.settings.titleId = "1F918E";
    var loginRequest = {
        // Currently, you need to look up the required and optional keys for this object in the API reference for LoginWithCustomID. See the Request Headers and Request Body.
        TitleId: PlayFab.settings.titleId,
        CustomId: crypto.randomUUID(),
        CreateAccount: true
    };

    PlayFabClientSDK.LoginWithCustomID(loginRequest, LoginCallback);
}

// callback functions take two parameters: result and error
// see callback functions in JavaScript if unclear
var LoginCallback = function (result, error) {
    if (result !== null) {
        document.getElementById("resultOutput").innerHTML = "Congratulations, you made your first successful API call!";
    } else if (error !== null) {
        document.getElementById("resultOutput").innerHTML =
            "Something went wrong with your first API call.\n" +
            "Here's some debug information:\n" +
            PlayFab.GenerateErrorReport(error);
    }
}