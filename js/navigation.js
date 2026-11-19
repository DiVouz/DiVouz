// Navigation elements

const sectionLinks = [...document.querySelectorAll(".section_nav a")];
const navigationSections = sectionLinks.map((link) => document.querySelector(link.hash));
const pageNavigation = document.querySelector(".page_navigation");
const sectionPicker = document.querySelector(".section_picker");
const sectionPickerLabel = document.querySelector(".section_picker_label");

let navigationUpdatePending = false;

// Active-section tracking

function updateActiveSection() {
	navigationUpdatePending = false;

	let activeIndex = 0;

	navigationSections.forEach((section, index) => {
		if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
			activeIndex = index;
		}
	});

	if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
		activeIndex = navigationSections.length - 1;
	}

	sectionLinks.forEach((link, index) => {
		if (index === activeIndex) {
			link.setAttribute("aria-current", "location");
			return;
		}

		link.removeAttribute("aria-current");
	});

	pageNavigation.dataset.section = navigationSections[activeIndex].id;
	sectionPickerLabel.textContent = sectionLinks[activeIndex].textContent;
}

function scheduleNavigationUpdate() {
	if (navigationUpdatePending) {
		return;
	}

	navigationUpdatePending = true;
	window.requestAnimationFrame(updateActiveSection);
}

// Mobile section picker

function closeSectionPicker() {
	pageNavigation.classList.remove("page_navigation--expanded");
	sectionPicker.setAttribute("aria-expanded", "false");
}

sectionPicker.addEventListener("click", () => {
	const expanded = sectionPicker.getAttribute("aria-expanded") === "true";

	pageNavigation.classList.toggle("page_navigation--expanded", !expanded);
	sectionPicker.setAttribute("aria-expanded", String(!expanded));
});

sectionLinks.forEach((link) => {
	link.addEventListener("click", closeSectionPicker);
});

document.addEventListener("pointerdown", (event) => {
	if (!pageNavigation.contains(event.target)) {
		closeSectionPicker();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key !== "Escape" || sectionPicker.getAttribute("aria-expanded") !== "true") {
		return;
	}

	closeSectionPicker();
	sectionPicker.focus();
});

document.addEventListener("focusin", (event) => {
	if (!pageNavigation.contains(event.target)) {
		closeSectionPicker();
	}
});

// Responsive behavior and initialization

window.matchMedia("(max-width: 640px)").addEventListener("change", closeSectionPicker);
window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleNavigationUpdate);
window.addEventListener("load", scheduleNavigationUpdate);

pageNavigation.classList.add("page_navigation--ready");
updateActiveSection();
