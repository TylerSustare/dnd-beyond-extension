document.getElementById("createSpellSlot").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: createSpellSlot,
    });
  });
});

document.getElementById("shareWithDM").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: shareWithDM,
    });
  });
});

// Function to be executed in the content script
function createSpellSlot() {
  const originalElement = document.querySelector(
    ".ct-spells-level-casting__slot-group-manager"
  );
  if (originalElement) {
    const clonedElement = originalElement.cloneNode(true);
    clonedElement.id = "created-spell-slots";
    originalElement.parentNode.appendChild(clonedElement);
    clonedElement.classList.add("ddbext-highlight");
  } else {
    alert("Element not found.");
  }
}

// Function to share with DM
function shareWithDM() {
  alert("Shared with DM!");
}
