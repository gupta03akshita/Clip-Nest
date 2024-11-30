// INITIALIZE STORAGE WITH EMPTY BOOKMARKS ON INSTALL
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ bookmarks: [] });
});

// FUNCTION TO ADD A NEW BOOKMARK
function addBookmark(videoUrl, note) {
    chrome.storage.local.get("bookmarks", (data) => {
        const newBookmark = { url: videoUrl, note: note, timestamp: new Date().toISOString() };
        // ADD NEW BOOKMARK TO STORAGE
        data.bookmarks.push(newBookmark);
        // UPDATE STORAGE
        chrome.storage.local.set({ bookmarks: data.bookmarks });
    });
}

// FUNCTION TO GET ALL BOOKMARKS
function getBookmarks(callback) {
    chrome.storage.local.get("bookmarks", (data) => {
        // RETURN BOOKMARKS TO CALLBACK
        callback(data.bookmarks);
    });
}

// LISTENER FOR MESSAGES TO ADD OR GET BOOKMARKS
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "addBookmark") {
        // ADD BOOKMARK IF ACTION IS "addBookmark"
        addBookmark(message.url, message.note);
    } else if (message.action === "getBookmarks") {
        // GET BOOKMARKS IF ACTION IS "getBookmarks"
        getBookmarks(sendResponse);
        // KEEP RESPONSE OPEN FOR ASYNC CALL
        return true;
    }
});
