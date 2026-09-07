async function loadNavigation() {
    const response = await fetch("../html/nav.html");
    const html = await response.text();

    document.getElementById("navigation").innerHTML = html;
}

loadNavigation();

async function loadAbout() {
    const response = await fetch("../md/about.md");
    const markdown = await response.text();

    document.getElementById("about-content").innerHTML =
        marked.parse(markdown);
}

async function load2dCube() {
    const response = await fetch("../html/2dCube.html");
    const html = await response.text();

    document.getElementById("2dCube").innerHTML = html;
}

const page = document.body.dataset.page;

if (page === "about") {
    loadAbout();
}
