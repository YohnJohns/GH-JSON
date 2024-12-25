<?php

$html = <<<HTML
<article>
	<header>
		<h2>Yohns PicoCSS Fork v2.2.1</h2>
		<p class="mb-0">Not in npm yet, but will be soon.</p>
	</header>
	<p>I've merged some open pull requests from the <a href="https://github.com/picocss/pico">original Pico</a>
		repository, and then added a few more enhancements that I either needed for a project (timeline) or wanted
		to make the building process of websites easier (<code>:user-valid</code> "validation", using
		<code>&lt;label&gt;</code> within groups, <code>.row</code> &amp; <code>.row-fluid</code> and the
		<code>.col-*</code> classes like Bootstrap, <code>.align-*</code> and more.) The demo docs here is the main
		enhanced that have been added to the <a href="https://picocss.com/">Pico CSS 2.0.6</a> branch, for more
		docs, refer to the original <a href="https://picocss.com/docs">Pico CSS docs</a>.
	</p>
	<hr>
	<p><code>(OPTIONAL)</code> Some of the demos on this page do require <a
			href="https://github.com/Yohn/PicoCSS/tree/main/docs/js">Vanilla JavaScript Files</a> to work the same as
		the preview here. I may get a build script going to compile the javascript plugins / components later. Let
		me know if this feature would help you.</p>
	<footer>If this fork has helped you, please <a href="https://github.com/Yohn/PicoCSS">Like</a> this fork!
	</footer>
</article>
HTML;

echo json_encode(value: ['title' => 'Yohns PicoCSS Fork Information', 'html' => $html], flags: JSON_PRETTY_PRINT);