(function () {
  // document.addEventListener("DOMContentLoaded", () => {
  const interval = setInterval(() => {
    if (
      document.querySelector(
        ".ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells"
      )
    ) {
      clearInterval(interval);

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

        // TODO: add blank spell slots with how many they have created
        /*
          <div role="checkbox" aria-checked="false" aria-label="use" class="ct-slot-manager__slot ct-slot-manager__slot--interactive"></div>
        */
        // TODO: check the number of spell slots they have used with this feature
        // Append the cloned element to the original element due to the way the page is structured
        originalElement.appendChild(clonedElement);

        document
          .querySelector("#created-spell-slots")
          .classList.add("ddbext-highlight");
      } else {
        console.error(
          "Element with class '.ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells' not found."
        );
      }
    } else {
      console.log("Waiting for element to appear...");
    }
  }, 5000);

  // alert("Hello from your Chrome extension!");
  // const originalElement = document.querySelector(
  //   ".ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells"
  // );

  // if (originalElement) {
  //   // Clone the element
  //   const clonedElement = originalElement.cloneNode(true);

  //   // Add the new ID to the cloned element
  //   clonedElement.id = "created-spell-slots";

  //   clonedElement.querySelector(
  //     ".ct-spells-level-casting__slot-group-label"
  //   ).innerHTML = `Created`;
  //   // Append the cloned element to the parent of the original element
  //   originalElement.appendChild(clonedElement);
  // } else {
  //   console.error(
  //     "Element with class '.ct-spells-level-casting__slot-group.ct-spells-level-casting__slot-group--spells' not found."
  //   );
  // }

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
})();
