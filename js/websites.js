// Website grid elements

const websitesGrid = document.querySelector(".websites_grid");
const websitesToggle = document.querySelector(".websites_toggle");
const websiteCards = [...websitesGrid.querySelectorAll(".website_item")];

// Collapsed rows and expanded content

function updateWebsiteVisibility() {
	const expanded = websitesToggle.getAttribute("aria-expanded") === "true";
	const columns = getComputedStyle(websitesGrid).gridTemplateColumns.split(/\s+/).length;
	const visibleCount = Math.max(2, columns);

	websiteCards.forEach((card, index) => {
		card.hidden = !expanded && index >= visibleCount;
	});

	websitesToggle.hidden = websiteCards.length <= visibleCount;
	websitesToggle.textContent = expanded ? "Show less" : "Show more";
}

websitesToggle.addEventListener("click", () => {
	const expanded = websitesToggle.getAttribute("aria-expanded") === "true";

	websitesToggle.setAttribute("aria-expanded", String(!expanded));
	updateWebsiteVisibility();
});

// Keep the collapsed count in sync with the responsive grid.

new ResizeObserver(updateWebsiteVisibility).observe(websitesGrid);
updateWebsiteVisibility();
