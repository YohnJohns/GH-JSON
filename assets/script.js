document.addEventListener("DOMContentLoaded", () => {
	// JSON Loader
	const mainContent = document.getElementById("main-content");
	const loadingOverlay = document.getElementById("loading-overlay");
	let activeDestroyFunction = null;

	async function fetchAndUpdatePage(url) {
		try {
			// Call the destroy function for the previous page
			if (typeof activeDestroyFunction === "function") {
				activeDestroyFunction();
				activeDestroyFunction = null;
			}

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
			mainContent.innerHTML = data.html;

			// Update page title and URL
			document.title = data.title;
			const baseName = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".json"));
			const hashbangUrl = `#!/${baseName}`;
			history.pushState({ url, title: data.title }, data.title, hashbangUrl);

			// Execute page-specific JavaScript
			if (data.script) {
				try {
					const executePageScript = new Function(data.script);
					executePageScript();
				} catch (error) {
					console.error("Error executing page-specific script:", error);
				}
			}

			// Set up destroy function
			if (data.destroy) {
				try {
					activeDestroyFunction = new Function(data.destroy);
				} catch (error) {
					console.error("Error setting up destroy function:", error);
				}
			}
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
	// /end JSON Loader

	// Function to change the theme
	function changeTheme(newTheme) {
		const linkElement = document.getElementById('theme-color-ss');
		if (linkElement) {
			linkElement.setAttribute('href', 'https://cdn.jsdelivr.net/gh/Yohn/PicoCSS@2.2.1/css/pico.' + newTheme + '.min.css');
		}
	}

	// Adding click event listener to all elements with the "change-theme" class
	document.querySelectorAll('.change-theme').forEach(element => {
		element.addEventListener('click', function () {
			const newTheme = this.getAttribute('data-theme');
			changeTheme(newTheme);
		});
	});

	// File validator
	//const checkFile = document.getElementById("checkFile");
	//new FileValidator(checkFile);


	//document.querySelectorAll('pre code').forEach((el) => {
	//	hljs.highlightElement(el);
	//});

	//new PicoTabs('[role="tablist"]');
});
