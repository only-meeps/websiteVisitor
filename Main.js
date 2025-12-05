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
    const inputValue = inputElement.inputValue;
    document.getElementById("abutton").textContent = 
    "You entered: " + inputValue;
}