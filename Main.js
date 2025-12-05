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
    const inputElement = document.getElementById("abutton")
    const inputValue = inputElement.nodeValue;
    document.getElementById("output").textContent = 
    "You entered: " + inputValue;
}