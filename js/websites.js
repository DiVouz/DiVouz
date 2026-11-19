const websitesGrid = document.querySelector(".websites_grid");
const websitesToggle = document.querySelector(".websites_toggle");
const websiteCards = [...websitesGrid.querySelectorAll(".website_item")];

function updateWebsiteVisibility() {
	const expanded = websitesToggle.getAttribute("aria-expanded") === "true";
	const columns = getComputedStyle(websitesGrid).gridTemplateColumns.split(/\s+/).length;

	websiteCards.forEach((card, index) => {
		card.hidden = !expanded && index >= columns;
	});
	websitesToggle.hidden = websiteCards.length <= columns;
	websitesToggle.textContent = expanded ? "Show fewer websites" : "Show more websites";
}

websitesToggle.addEventListener("click", () => {
	const expanded = websitesToggle.getAttribute("aria-expanded") === "true";
	websitesToggle.setAttribute("aria-expanded", String(!expanded));
	updateWebsiteVisibility();
});

new ResizeObserver(updateWebsiteVisibility).observe(websitesGrid);
updateWebsiteVisibility();
