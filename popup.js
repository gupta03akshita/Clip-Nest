// EVENT LISTENER FOR "ADD BOOKMARK" BUTTON
document.getElementById("addBookmarkBtn").addEventListener("click", () => {
    const note = document.getElementById("noteInput").value;
    if (note.trim() !== "") {
        // GET ACTIVE TAB URL
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const videoUrl = tabs[0].url;
            // SEND MESSAGE TO ADD BOOKMARK
            chrome.runtime.sendMessage({ action: "addBookmark", url: videoUrl, note: note });
            // CLEAR NOTE INPUT
            document.getElementById("noteInput").value = "";
            // DISPLAY UPDATED BOOKMARK LIST
            displayBookmarks();
        });
    }
});

// FUNCTION TO DISPLAY BOOKMARKS IN THE LIST
function displayBookmarks() {
    chrome.runtime.sendMessage({ action: "getBookmarks" }, (bookmarks) => {
        const list = document.getElementById("bookmarksList");
        // CLEAR PREVIOUS LIST
        list.innerHTML = "";
        bookmarks.forEach((bookmark) => {
            // CREATE NEW LIST ITEM
            const li = document.createElement("li");
            // CREATE HEADING FOR NOTE
            const noteHeading = document.createElement('h3');
            noteHeading.textContent = bookmark.note;
            // CREATE LINK FOR BOOKMARK URL
            const link = document.createElement('a');
            link.href = bookmark.url;
            // OPEN LINK IN NEW TAB
            link.target = '_blank';
            link.textContent = bookmark.url;
            // ADD NOTE HEADING TO LI
            li.appendChild(noteHeading);
            // ADD LINK TO LI
            li.appendChild(link);
            // ADD LI TO LIST
            list.appendChild(li);
        });
    });
}

// EVENT LISTENER FOR "EXPORT" BUTTON
document.getElementById("exportBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "getBookmarks" }, (bookmarks) => {
        // CONVERT DATA TO JSON
        const exportedData = JSON.stringify(bookmarks, null, 2);
        // CREATE BLOB FROM JSON
        const blob = new Blob([exportedData], { type: "application/json" });
        // CREATE OBJECT URL FOR DOWNLOAD
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // FILE NAME FOR EXPORT
        a.download = "bookmarks.json";
        // TRIGGER DOWNLOAD
        a.click();
    });
});

// INITIAL CALL TO DISPLAY BOOKMARKS
displayBookmarks();