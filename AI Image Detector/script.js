function triggerFileInput() {
    document.getElementById('imageInput').click();
}

//set number of tags to display per page
const tagsPerPage = 20;


//event listener for upload btn
document.getElementById('uploadButton').addEventListener('click', async () =>{
    //elements and file handling
    const fileInput = document.getElementById('imageInput');

    const file = fileInput.files[0];
    const imagePreview =  document.getElementById('imagePreview');
    const uploadModal = document.getElementById('uploadModal');
    const uploadProgress = document.getElementById('uploadProgress');
    
    // check if file is selected and show message
    if (!file) {
        //alert('Please select a file');
        return showToast('Please select a file');
    }

    //show image preview
    const reader = new FileReader();
    reader.onload = e => {
        imagePreview.src = e.target.result;
    }
    reader.readAsDataURL(file);

    //image api credentials
    const apiKey = '';
    const apiSecret = 'ada7dac53a68d42ad4cb93875178692a';
    const authHeader = 'Basic ' + btoa(`${apiKey}:${apiSecret}`);

    //prepare data for upload
    const formData = new FormData();
    formData.append('image', file);

    try{
        //show upload modal and reset progress bar
        uploadModal.style.display = 'block';
        uploadProgress.style.width = '0%';

        //upload image to api
        const uploadResponse = await fetch('https://api.imagga.com/v2/uploads', {
            method: 'POST',
            headers: {
                'Authorization': authHeader
            },
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('Upload failed');
        }

        //track upload progress
        const contentLength = +uploadResponse.headers.get('Content-Length');
        const reader = uploadResponse.body.getReader();
        let receivedLength = 0;
        let chunks = []; 

        //read response stream and upload progress
        while (true) {
            const {done, value} = await reader.read();
            if (done) {
                break;
            }
            chunks.push(value);
            receivedLength += value.length;
            uploadProgress.style.width = `${(receivedLength / contentLength * 100).toFixed(2)}%`;
        }

        //decode and parse response
        const responseArray = new Uint8Array(receivedLength);
        let position = 0;
        for (const chunk of chunks) {
            responseArray.set(chunk, position);
            position += chunk.length;
        }

        const text = new TextDecoder('utf-8').decode(responseArray);
        const {result: {upload_id}} = JSON.parse(text);
        
        //fetch color and tag analysis from Imagga API

        const [colorResult, tagResult] = await Promise.all([
            fetch(`https://api.imagga.com/v2/colors?image_upload_id=${upload_id}`, {
                headers: {
                    'Authorization': authHeader
                }
            }).then(res => res.json()),
            fetch(`https://api.imagga.com/v2/tags?image_upload_id=${upload_id}`,{
                headers: {
                    'Authorization': authHeader
                }
            }).then(res => res.json())
        ]);

        //display results
        displayColors(colorResult.result.colors);
        displayTags(tagResult.result.tags);
    }
    catch (err) {
        console.error(err);
        showToast('Upload failed');
    } 
    finally {
        //hide upload modal after upload
        uploadModal.style.display = 'none';
    }

})