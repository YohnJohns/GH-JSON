document.addEventListener("DOMContentLoaded", () => {
	const mainContent = document.getElementById("main-content");
	const loadingOverlay = document.getElementById("loading-overlay");

	async function fetchAndUpdatePage(url) {
		try {
			// Show loading overlay and blur content
			loadingOverlay.style.display = "flex";
			mainContent.style.filter = "blur(5px)";

			// Fetch the JSON file
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			// Update content
			document.getElementById("title").textContent = data.title;
			document.getElementById("description").textContent = data.content;

			// Update page title and URL
			document.title = data.title;
			const baseName = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".json"));
			const hashbangUrl = `#!/${baseName}`;
			history.pushState({ url, title: data.title }, data.title, hashbangUrl);
		} catch (error) {
			console.error("Error fetching the JSON file:", error);
		} finally {
			// Hide loading overlay and reset blur
			loadingOverlay.style.display = "none";
			mainContent.style.filter = "none";
		}
	}

	// Handle clicks on .load-page elements
	document.querySelectorAll(".load-page").forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			const url = link.getAttribute("href") || link.getAttribute("data-load");
			if (url) {
				fetchAndUpdatePage(url);
			}
		});
	});

	// Handle back/forward navigation
	window.addEventListener("popstate", (event) => {
		if (event.state && event.state.url) {
			fetchAndUpdatePage(event.state.url);
		}
	});

	// Handle direct navigation to a hashbang URL
	if (location.hash.startsWith("#!/")) {
		const baseName = location.hash.substring(3); // Remove "#!/"
		const jsonUrl = `data/${baseName}.json`;
		fetchAndUpdatePage(jsonUrl);
	}
});
