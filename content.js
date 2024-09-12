(function () {
  let currentInterval;

  function initializeSpellSlots() {
    // Check if this class is a sorcerer
    const classElement = document.querySelector(
      ".ddbc-character-summary__classes"
    );
    if (classElement && !classElement.innerHTML.includes("orcerer")) {
      alert("Not a sorcerer, play a sorcerer.");
      console.log(
        "DDB Extension: No sorcerer class found, extension not running."
      );
      clearInterval(currentInterval);
      return;
    }

    // Clear any existing interval
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    // if the #created-spell-slots element exists return
    if (document.getElementById("created-spell-slots")) {
      return;
    }

    currentInterval = setInterval(() => {
      if (
        document.querySelector(
          ".ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells"
        )
      ) {
        clearInterval(currentInterval);
        currentInterval = null;

        const originalElement = document.querySelector(
          ".ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells"
        );

        if (originalElement) {
          // Clone the element
          const clonedElement = originalElement.cloneNode(true);

          // Add the new ID to the cloned element
          clonedElement.id = "created-spell-slots";

          clonedElement.querySelector(
            ".ct-spells-level-casting__slot-group-label"
          ).innerHTML = `Created`;

          // Remove elements with specified classes
          const elementsToRemove = clonedElement.querySelectorAll(
            ".ct-slot-manager__slot.ct-slot-manager__slot--used.ct-slot-manager__slot--interactive, " +
              ".ct-slot-manager__slot.ct-slot-manager__slot--interactive"
          );

          elementsToRemove.forEach((element) => element.remove());

          // add back the appropriate number
          // hard code to one used slot and one empty slot for now
          // TODO: get this from a server

          // Create a variable with the new spell slot element
          const usedSpellSlot = document.createElement("div");
          usedSpellSlot.innerHTML = `
            <div role="checkbox" aria-checked="true" aria-label="use" class="ct-slot-manager__slot ct-slot-manager__slot--used ct-slot-manager__slot--interactive"></div>
          `;
          const usedSpellSlotElement = usedSpellSlot.firstElementChild;

          // Find the ct-slot-manager element in the clonedElement
          const slotManager = clonedElement.querySelector(".ct-slot-manager");

          // Append the usedSpellSlotElement to the slot manager
          if (slotManager) {
            slotManager.appendChild(usedSpellSlotElement);
          }

          // Add an empty slot as well
          const emptySpellSlot = document.createElement("div");
          emptySpellSlot.innerHTML = `
            <div role="checkbox" aria-checked="false" aria-label="use" class="ct-slot-manager__slot ct-slot-manager__slot--interactive"></div>
          `;
          const emptySpellSlotElement = emptySpellSlot.firstElementChild;

          if (slotManager) {
            slotManager.appendChild(emptySpellSlotElement);
          }

          // Add classes for the magical appearance
          clonedElement.classList.add("ddbext-highlight", "magical-appearance");

          // Set initial opacity to 0
          clonedElement.style.opacity = "0";

          // Append the cloned element to the original element
          originalElement.appendChild(clonedElement);

          // Trigger the transition after a short delay
          setTimeout(() => {
            clonedElement.classList.add("show");
          }, 100);
        } else {
          console.error(
            "Element with class '.ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells' not found."
          );
        }
      } else {
        console.log("Waiting for element to appear...");
      }
    }, 5000);
  }

  // Initial call
  initializeSpellSlots();

  // Add window resize listener
  window.addEventListener("resize", () => {
    console.log("Window resized, reinitializing spell slots...");
    initializeSpellSlots();
  });

  // function updateNotes() {
  //   debugger;
  //   import(
  //     "https://media.dndbeyond.com/packages/rules-engine/es/apiAdapter/generators.js"
  //   )
  //     .then(({ generateApiAdapter }) => {
  //       generateApiAdapter(
  //         "https://auth-service.dndbeyond.com/v1/cobalt-token",
  //         false
  //       )
  //         .put(
  //           "https://character-service.dndbeyond.com/character/v5/description/notes",
  //           { characterId: 109459659, otherNotes: "~~~~fruit_of_magic~~~~" },
  //           {}
  //         )
  //         .then((response) => {
  //           console.log("API request successful:", response);
  //         })
  //         .catch((error) => {
  //           console.error("API request failed:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Failed to import generateApiAdapter:", error);
  //     });
  // }

  // Call the function to load the module and send the API request
  // updateNotes();
  // });

  // Add this custom selector to the document
  // document.querySelector =
  //   document.querySelector ||
  //   function (selector) {
  //     if (selector.startsWith("*:not(script):not(style):icontains(")) {
  //       const searchText = selector.match(/"(.+)"/)[1].toLowerCase();
  //       return Array.from(document.getElementsByTagName("*")).find(
  //         (element) =>
  //           !["SCRIPT", "STYLE"].includes(element.tagName) &&
  //           element.textContent.toLowerCase().includes(searchText)
  //       );
  //     }
  //     return Document.prototype.querySelector.call(this, selector);
  //   };

  // ... rest of the existing code ...
})();

const style = document.createElement("style");
style.textContent = `
  .magical-appearance {
    transition: opacity 1s ease-in-out, box-shadow 1s ease-in-out;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0);
    border-radius: 8px;
  }
  .magical-appearance.show {
    opacity: 1 !important;
    box-shadow:
      0 0 10px rgba(255, 0, 0, 0.6),
      0 0 20px rgba(255, 215, 0, 0.6),
      0 0 30px rgba(255, 100, 0, 0.4);
    border-radius: 8px;
  }
`;
document.head.appendChild(style);
