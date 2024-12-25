
new PicoTabs('[role="tablist"]');
document.querySelectorAll('pre code').forEach((el) => {
	if (!el.dataset.highlighted) {
		hljs.highlightElement(el);
	}
});