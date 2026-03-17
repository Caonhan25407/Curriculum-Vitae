const links = document.querySelectorAll(".navbar a");
const sections = Array.from(document.querySelectorAll("section[id]"));

function setActiveLink(target) {
    links.forEach(l => l.classList.toggle("active", l === target));
}

function updateActiveLinkByHash() {
    const hash = window.location.hash;
    const targetLink = Array.from(links).find(l => l.getAttribute("href") === hash);
    if (targetLink) setActiveLink(targetLink);
}

function updateActiveLinkOnScroll() {
    const scrollY = window.scrollY;
    const offset = 80; 

    const current = sections
        .filter(sec => sec.offsetTop - offset <= scrollY)
        .pop();

    if (!current) return;

    const targetLink = Array.from(links).find(l => l.getAttribute("href") === `#${current.id}`);
    if (targetLink) setActiveLink(targetLink);
}

links.forEach(link => {
    link.addEventListener("click", function() {
        setActiveLink(link);
    });
});

window.addEventListener("scroll", updateActiveLinkOnScroll, { passive: true });
window.addEventListener("hashchange", updateActiveLinkByHash);
window.addEventListener("load", () => {
    updateActiveLinkByHash();
    updateActiveLinkOnScroll();
});
