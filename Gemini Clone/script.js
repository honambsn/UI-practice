const messageForm = document.querySelector(".prompt__form");
const chatHistoryContainer = document.querySelector(".chats");
const suggestionItems = document.querySelectorAll(".suggests__item");

const themeToggleButton = document.getElementById("themeToggler");
const clearChatButton = document.getElementById("deleteButton");

// state variables
let currentUserMessage = null;
let isGeneratingResponse = false;

const GOOGLE_API_KEY = "AIzaSyARYer5D6utESNXYHwGKKDHcm0l2aqNeV8";
const API_REQUEST_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// load saved data from local storage
const loadSaveChatHistory = () => {
    const savedConversations = JSON.parse(localStorage.getItem("saved-api-chats")) || [];
    const isLightTheme = localStorage.getItem("theme-color") === "light_mode";

    document.body.classList.toggle("light-mode", isLightTheme);
    themeToggleButton.innerHTML = isLightTheme ? '< class= "bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';

    chatHistoryContainer.innerHTML = '';

    // iterate through saved chat history and display messages
    savedConversations.forEach(conversation =>{
        // display the user's message
        const userMessageHtml = `
            <div class="message__content">
                <img class="message__avatar" src="assets/profile.png" alt="User Avatar">
                <p class="message__text">${conversation.userMessage}</p>
            </div>
        `;

        const outgoingMessageElement =
        createChatMessageElement(userMessageHtml, "message--outgoing");
        chatHistoryContainer.appendChild(outgoingMessageElement);

        //display the api response
        const responseText = conversation.apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsedApiResponse = marked.parse(responseText); //convert to html
        const rawApiResponse = responseText; // plain text version

        const responseHtml = `
            <div class=message__content">
                <img class="message__avatar" src="assets/gemini.svg" alt="Gemini Avatar">
                <p class="message__text"></p>
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
            </div>
            <span onClick="copyMessageToClipboard(this)" class=message__icon hide"><i class="bx bx-copy-alt"></i></span>
        `;
        const incomingMessageElement = createChatMessageElement(responseHtml, "message--incoming");
        chatHistoryContainer.appendChild(incomingMessageElement);

        const messageTextElement = incomingMessageElement.querySelector(".message__text");

        // display saved chat without typing effect
        showTypingEffect(rawApiResponse, parsedApiResponse, messageTextElement, incomingMessageElement, true); // 'true' skips typing
    });

    document.body.classList.toggle("hide-header", savedConversations.length > 0);
};

//create a new chat message element
const createChatMessageElement = (htmlContent, ...cssClasses) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", ...cssClasses);
    messageElement.innerHTML = htmlContent;
    return messageElement;
}

// show typing effect
const showTypingEffect = (rawText, htmlText, messageElement, incomingMessageElement, skipEffect = false) => {
    const copyIconElement = incomingMessageElement.querySelector(".message__icon");
    copyIconElement.classList.add("hide"); // initially hide button

    if (skipEffect) {
        //display content directly without typing effect
        messageElement.innerHTML = htmlText;
        hljs.highlightAll();
        addCopyButtonToCodeBlocks();
        copyIconElement.classList.remove("hide"); // show copy button
        isGeneratingResponse = false;
        return;
    }

    const wordsArray = rawText.split(" ");
    let wordIndex = 0;

    const typingInterval = setInterval(() => {
        messageElement.innerText += (wordIndex === 0 ? '' : ' ') + wordsArray[wordIndex++];
        if (wordIndex === wordsArray.length){
            clearInterval(typingInterval);
            isGeneratingResponse.innerHTML = htmlText;
            hljs.highlightAll();
            addCopyButtonToCodeBlocks();
            copyIconElement.classList.remove("hide");
        }
    },  75);
};

//fetch api response based on user input
const requestApiResponse = async (incomingMessageElement) => {
    const messageElement = incomingMessageElement.querySelector(".message__text");

    try{
        const response = await fetch(API_REQUEST_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: currentUserMessage }] }]
            }),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.error.message);
        }

        const responseText =  responseData?.conditates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            throw new Error("Invalid response from the API");
        }

        const parsedApiResponse = marked.parse(responseText);
        const rawApiResponse = responseText;

        showTypingEffect(rawApiResponse, parsedApiResponse, messageElement, incomingMessageElement);

        //save conversation in local storage
        let savedConversations = JSON.parse(localStorage.getItem("saved-api-chats")) || [];
        savedConversations.push({ userMessage: currentUserMessage, apiResponse: responseData });
        localStorage.setItem("saved-api-chats", JSON.stringify(savedConversations));
    }
    catch (error) {
        isGeneratingResponse = false;
        messageTextElement.innerText = error.message;
        messageTextElement.closest(".message").classList.add("message--error");
    }
    finally{
        incomingMessageElement.classList.remove("message--loading");
    }
};

// add copy button to code blocks
const addCopyButtonToCodeBlocks = () => {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
        const codeElement = block.querySelector('code');
        let language = [...codeElement.classList].find(cls => cls.startsWith('language-'))?.replace('language-', '') || 'Text';

        const languageLabel = document.createElement('div');
        languageLabel.innerText = language.charAt(0).toUpperCase() + language.slice(1);
        languageLabel.classList.add('code__language-label');
        block.appendChild(languageLabel);

        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="bx bx-copy"></i>';
        copyButton.classList.add("code__copy-btn");
        block.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeElement.innerText).then(() => {
                copyButton.innerHTML = '<i class="bx bx-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="bx bx-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text:', err);
                alert("Unable to copy text to clipboard");
            });
        });
    });
};

// show loading animation during API request
const displayLoadingAnimation = () => {
    const loadingHtml = `
        <div class="message__content">
            <img class="message__avatar" src="assets/gemini.svg" alt="Gemini Avatar">
            <p class="message__text"></p>
            <div class="message__loading-indicator">
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
            </div>
        </div>
        <span onClick="copyMessageToClipboard(this)" class="message__icon hide"><i class="bx bx-copy-alt"></i></span>
    `;
    
    const loadingMessageElement = createChatMessageElement(loadingHtml, "message--incoming", "message--loading");
    chatHistoryContainer.appendChild(loadingMessageElement);

    requestApiResponse(loadingMessageElement);
};

//copy message to clipboard
const copyMessageToClipboard = (copyButton) => {
    const messageContent = copyButton.parentElement.querySelector(".message__text").innerText;

    navigator.clipboard.writeText(messageContent);
    copyButton.innerHTML = `<i class="bx bx-check"></i>`; // confirmation icon
    setTimeout(() => {
        copyButton.innerHTML = `<i class="bx bx-copy-alt"></i>`;
    }, 1000); // revert icon after 1 second
};

// handle sending chat messages
const handleOutgoingMessage = () =>{
    currentUserMessage = messageForm.querySelector(".prompt__form-input").value.trim() || currentUserMessage;
    if (!currentUserMessage || isGeneratingResponse) return; // exit if no message or already generated response

    isGeneratingResponse = true;
    const outgoingMessageHtml = `
        <div class="message__content">
            <img class="message__avatar" src="assets/profile.png" alt="User Avatar">
            <p class="message__text"></p>
        </div>
    `;

    const outgoingMessageElement = createChatMessageElement(outgoingMessageHtml, "message--outgoing");
    outgoingMessageElement.querySelector(".message__text").innerText = currentUserMessage;
    chatHistoryContainer.appendChild(outgoingMessageElement);

    messageForm.reset(); // clear input field
    document.body.classList.add("hide-header");
    setTimeout(displayLoadingAnimation, 500); // show loading animation after delay
};

// toggle between light and dark themes
themeToggleButton.addEventListener("click", () => {
    const isLightTheme = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme-color", isLightTheme ? "light_mode" : "dark_mode");

    //update icon based on theme
    const newIconClass = isLightTheme ? "bx-moon" : "bx-sun";
    themeToggleButton.querySelector("i").className = newIconClass;
});

//clear all chat history
clearChatButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all chat history?")){
        localStorage.removeItem("saved-api-chats");
        
        // reload chat history to reflect changes
        loadSaveChatHistory();

        currentUserMessage = null;
        isGeneratingResponse = false;
    }
});

// handle click on suggestion items
suggestionItems.forEach(suggestion =>{
    suggestion.addEventListener("click", () => {
        currentUserMessage = suggestion.querySelector(".suggests__item-text").innerText;
        handleOutgoingMessage();
    });
});

// prevent default from submission and handle outgoing message