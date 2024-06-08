// After title exists to make sure there's a nice divide between new / ancient and / older nieuws
export function articles_to_dom_elements(groups, after_title = 'Ander nieuws') {
    const html = `
        <div class="historical-headline headline-block-1">
            <div class="headlines-head">
                <h2 class="fp-title">
                    Vandaag in historie
                </h2>
            </div>
            <div class="headlines-1">
                ${groups.map(group_to_dom_elements).join("")}
            </div>
            <div class="headlines-head">
                <h2 class="fp-title">
                    ${after_title}
                </h2>
            </div>
        </div>  
    `

    const parser = new DOMParser()
    return parser.parseFromString(html,'text/html').querySelector(".historical-headline")
}

function group_to_dom_elements(group) {
    const article_html = group.articles.map(map_to_headline).join("")
    const title = `
        <h2 class="headline--day">${group.year}</h2>
    `
    return title.concat(article_html)
}

function map_to_headline(article) {
    return `
        <div class="headlineItem news">
            <article class="headline">
                 <span class="headline--icon">
                    <twk-icon name="twk-article-type-news" class="icon pro" title="Nieuws | Websites en community's"><svg><use href="/x/build/images/icons-symbol.f923b0fd.svg#twk-article-type-news"></use></svg></twk-icon>
                </span>
                <time class="headline--time" datetime="12:27">${article.time}</time>
                <a class="headline--anchor" href="${article.url}">
                    ${article.title}
                </a>
            </article>
        </div>
    `
}