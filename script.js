document.addEventListener("DOMContentLoaded", function() {
    const scrapeButton = document.getElementById("scrapeButton");
    const resultsDiv = document.getElementById("results");

    scrapeButton.addEventListener("click", function() {
        fetch("/scrape")
            .then(response => response.json())
            .then(data => {
                if (data.titles) {
                    const titlesList = document.createElement("ul");
                    data.titles.forEach(title => {
                        const listItem = document.createElement("li");
                        listItem.textContent = title;
                        titlesList.appendChild(listItem);
                    });
                    resultsDiv.innerHTML = "";
                    resultsDiv.appendChild(titlesList);
                } else if (data.error) {
                    resultsDiv.textContent = data.error;
                }
            })
            .catch(error => {
                console.error(error);
                resultsDiv.textContent = "An error occurred.";
            });
    });
});
