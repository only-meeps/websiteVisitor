const gameList = [];
const URLList = [];
async function downloadTxtFile() {
    const filename = document.getElementById("FileName").value + ".html";
    const CustomURL = "https://"+ document.getElementById("GameURL").value;
    const TabName = document.getElementById("TabName").value;
    gameList.push();
    URLList.push();
    UpdateGameList(gameList, URLList);
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
function SetCookie(key, value){
    document.cookie = key + "=" + value;
}
function GetCookie(key){
    const cookieName = key + "=";
    const ca = document.cookie.split(";");
      for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(cookieName) === 0)
    {
        return c.substring(key.length, c.length);
    } 
}
  return null;
}
function Init(){
    const retrieveCookie = GetCookie("UUID");
    if(retrieveCookie != null)
    {
        PlayFabSignIn(retrieveCookie);
        DebugLog("Logged into account " + retrieveCookie);
    }
    else
    {
        const UUID = crypto.randomUUID();
        SetCookie("UUID", UUID);
        PlayFabSignIn(UUID);
        DebugLog("Created new account " + UUID);
    }
}
function DebugLog(text){
    document.getElementById("resultOutput").innerHTML = document.getElementById("resultOutput").innerHTML + "\n" +text;
}
function PlayFabSignIn(UUID){
    PlayFab.settings.titleId = "1F918E";
    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: UUID,
        CreateAccount: true
    };

    PlayFabClientSDK.LoginWithCustomID(loginRequest, LoginCallback);
}
function UpdateGameList(list1, list2){
    PlayFabClientAPI.UpdateUserData({
        Data: {
            "Game List": list1,
            "URL List":list2,
            "LastLoginTime": new Date().toISOString()
        },
    }, function (endResult, error) {
        if (endResult) {
            DebugLog("Updated game list");
        } else {
            DebugLog("Error updating game list:\n" +PlayFab.GenerateErrorReport(error));
        }
    });
}

var LoginCallback = function (result, error) {
    if (result !== null) {
        
        DebugLog("Signed in as user " + Playfab.CustomId);
    } else if (error !== null) {
        DebugLog("Failed to sign into playfab:\n" +PlayFab.GenerateErrorReport(error));
    }
}