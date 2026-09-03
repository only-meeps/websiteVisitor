const gameList = [];
const URLList = [];
var PlayFabInit = false;
async function LoadIFrame() {
    const PlainURL = document.getElementById("GameURL").value;
    var CustomURL = "";
    if(!PlainURL.includes("https://") && !PlainURL.includes("http://")){
        CustomURL = "https://"+ document.getElementById("GameURL").value;
    }
    else{
        CustomURL = document.getElementById("GameURL").value;
    }
    document.title = document.getElementById("TabName").value;
    gameList.push();
    URLList.push();
    SaveHistory();
    if(PlayFabInit)
    {

        UpdateGameList(gameList, URLList);
        
    }
    else
    {
        DebugLog("Game list unable to push. Error: PlayFab Offline!");
    }
    Hide("title");
    Hide("subtitle");
    Hide("GameURL");
    Hide("TabName");
    Hide("downloadButton");
    document.getElementById("mainIframe").src = CustomURL;
    Show("mainIframe");
    Hide("historyList");



    /*
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
    */
}
function Hide(id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'none';
    } else {
        console.warn("Could not find element with ID:", id);
    }
}
function Show(id) {
    document.getElementById(id).style.display = 'inline';
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
function DrawHistoryList(){
    
        const list = document.getElementById("historyList");
        for (let i = 0; i < URLList.length; i++) {
            const li = document.createElement("li");
            li.innerText = URLList[i];
            list.appendChild(li);
        }
}
function SaveHistory(){
    localStorage.setItem("URLList", JSON.stringify(URLList));
}
function LoadHistory(){
    const history = localStorage.getItem("URLList");
    URLList = JSON.parse(history);
}
function Start()
{
    LoadHistory();
    DrawHistoryList();
    Hide("mainIframe");
    Hide("resultOutput");
    const retrieveCookie = GetCookie("UUID");
    PlayFab.settings.titleId = "1F918E";
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
function Init(){
    if (typeof PlayFab !== 'undefined' && PlayFab.onSDKLoaded) {
        PlayFab.onSDKLoaded(Start);
    } else {
        Start(); 
    }
}
function DebugLog(text){
    //document.getElementById("resultOutput").innerHTML = document.getElementById("resultOutput").innerHTML + "\n" +text;
}
function PlayFabSignIn(UUID){

    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: UUID,
        CreateAccount: true
    };

    PlayFab.ClientApi.LoginWithCustomID(loginRequest, LoginCallback);
}
function UpdateGameList(list1, list2){
    PlayFab.ClientApi.UpdateUserData({
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
        //why is this not working :(
        DebugLog("Signed in as user " + PlayFab.ClientApi.CustomId);
        PlayFabInit = true;
    } else if (error !== null) {
        DebugLog("Failed to sign into PlayFab:\n" +PlayFab.GenerateErrorReport(error));
    }
}
Init();
