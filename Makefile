scrape:
	deno run --allow-net=www.thevoid.community --allow-write=void.json scrape.js
enrich:
	GEMINI_API_KEY=<TODO - input the API key here> deno run --allow-net=generativelanguage.googleapis.com --allow-env=GEMINI_API_KEY enrich.js