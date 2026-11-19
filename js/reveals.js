// Enhance sections only when observation and motion are supported.

if (
	"IntersectionObserver" in window &&
	!window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
	const sections = document.querySelectorAll(".lualua_card, .websites_card, .games_card");

	const revealSection = (section) => {
		section.classList.remove("scroll-reveal--pending");
		section.classList.add("scroll-reveal--visible");
		sectionObserver.unobserve(section);
	};

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					revealSection(entry.target);
				}
			});
		},
		{ threshold: 0.08 }
	);

	sections.forEach((section) => {
		section.classList.add("scroll-reveal--pending");
		sectionObserver.observe(section);
		section.addEventListener("focusin", () => revealSection(section), { once: true });
	});
}
