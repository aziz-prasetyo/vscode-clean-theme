document.addEventListener("DOMContentLoaded", function() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                const commandDialog = document.querySelector(".quick-input-widget");

                if (commandDialog) {
                    if (commandDialog.style.display !== "none") {
                        applyBlur();
                    }

                    observeCommandDialogVisibility(commandDialog);

                    observer.disconnect();
                    return;
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    function observeCommandDialogVisibility(commandDialog) {
        const visibilityObserver = new MutationObserver(() => {
            if (commandDialog.style.display !== "none") {
                applyBlur();
            } else {
                removeBlur();
            }
        });

        visibilityObserver.observe(commandDialog, { attributes: true, attributeFilter: ["style"] });
    }

    function applyBlur() {
        const targetDiv = document.querySelector(".monaco-workbench");
        let blurElement = document.getElementById("bg-blur");

        if (!blurElement) {
            blurElement = document.createElement("div");
            blurElement.setAttribute("id", "bg-blur");
            blurElement.addEventListener("click", removeBlur);
            targetDiv.appendChild(blurElement);
        }
    }

    function removeBlur() {
        const blurElement = document.getElementById("bg-blur");
        
        if (blurElement) {
            blurElement.remove();
        }
    }
});
