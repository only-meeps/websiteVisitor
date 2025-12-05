async function downloadTxtFile() {
    const filename = document.getElementById("FileName");
    const CustomURL = document.getElementById("GameURL");
    const TabName = document.getElementById("TabName");
    try {
        const response = await fetch("template.txt");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let templateContent = await response.text();
        templateContent = templateContent
            .replace('[GAMEURL]', CustomURL)
            .replace('[TABNAME]', TabName)

        const blob = new Blob([templateContent], { type: 'text/plain' });

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