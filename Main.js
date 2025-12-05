function goToNextPage()
{
    const text = 'Hello, world!';
    const params = new URLSearchParams();
    params.append('text', text);
    const queryString = params.toString();
    const targetURL = 'results.html?' + queryString;
    window.location.href = targetURL;
}
function readInput()
{
    const inputElement = document.getElementById("userInput")
    const inputValue = inputElement.value;
    document.getElementById("abutton").textContent = "You entered: " + inputValue;
}
function downloadTxtFile() {
    const textContent = "Heeeyyyy you downloaded this file!";
    const filename = 'generated_file.txt';
    const blob = new Blob([textContent], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
}