// GET CURRENT VIDEO URL
let videoUrl = window.location.href;

// LISTENER FOR MESSAGES FROM BACKGROUND SCRIPT
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // CHECK IF MESSAGE IS TO GET VIDEO URL
    if (message.action === "getVideoUrl") {
        // SEND VIDEO URL AS RESPONSE        
        sendResponse({ url: videoUrl });
    }
});
