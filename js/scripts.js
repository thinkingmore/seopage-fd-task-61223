function openModal() {
    let modal = document.getElementById("#attachmentModal");
    modal.style.display = 'block';
}

function closeModal() {
    let modal = document.getElementById("#attachmentModal");
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Find all elements with the specific class
    let uploadButtons = document.querySelectorAll('.attachmentButton');

    // Attach a specific function to each element
    uploadButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            openModal();
        });
    });


    const uploadButton = document.getElementById("uploadButton");
    uploadButton.addEventListener("click", uploadFiles);

    function updateFileList(selectedFiles) {
        const fileList = document.getElementById("fileList");

        for (let i = 0; i < selectedFiles.length; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = selectedFiles[i].name;
            fileList.appendChild(listItem);
        }
    }
    function uploadFiles(event) {
        event.preventDefault();

        const fileInput = document.getElementById("fileInput");
        const selectedFiles = fileInput.files;

        // Check if any files are selected
        if (selectedFiles.length === 0) {
            alert("Please select at least one file to upload.");
            return;
        }

        // Display selected files in a list
        updateFileList(selectedFiles);

        const formData = new FormData();

        // Append each selected file to the FormData object
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files[]", selectedFiles[i]);
        }

        // The rest of your code for uploading the files...
        // (e.g., using Fetch API as mentioned in the previous response)
    }
});