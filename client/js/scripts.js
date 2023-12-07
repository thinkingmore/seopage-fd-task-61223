function openModal() {
    let modal = document.getElementById("#attachmentModal");
    modal.style.display = 'block';
}

function closeModal() {
    let modal = document.getElementById("#attachmentModal");
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const uploadButtons = document.querySelectorAll('.attachmentButton');

    uploadButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            openModal();
        });
    });

    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", uploadFiles);

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

        if (selectedFiles.length === 0) {
            alert("Please select at least one file to upload.");
            return;
        }

        updateFileList(selectedFiles);

        const formData = new FormData();
        formData.append('_token', '{{ csrf_token() }}');


        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files[]", selectedFiles[i]);
        }

        const xhr = new XMLHttpRequest();
        const url = 'http://127.0.0.1:8000/upload'; // Update with your API endpoint
        

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                alert(response.message);
                // Call a function to get total attachments
                getTotalAttachments();
            } else {
                handleUploadError(xhr.status);
            }
        };

        xhr.onerror = function () {
            handleUploadError(xhr.status);
        };

        xhr.send(formData);
    }

    function handleUploadError(status) {
        let errorMessage = 'Error uploading files.';

        if (status === 413) {
            errorMessage = 'File size exceeds the maximum limit.';
        }

        alert(errorMessage);
    }
});
