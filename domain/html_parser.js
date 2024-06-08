export function map_html_to_articles(html) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html,'text/html')
    const grouped_elements = group_dom_articles(doc)
    return map_grouped_elements(grouped_elements)
}

function group_dom_articles(doc) {
    const result = [];
    let current_year = null;

    Array.from(doc.querySelector(".container").children).forEach(child => {
        if (child.tagName === 'H2') {
            if (current_year) {
                result.push(current_year);
            }
            current_year = [child, []];
        } else if (child.tagName === 'DIV' && current_year) {
            current_year[1].push(child);
        }
    });

    if (current_year) {
        result.push(current_year);
    }

    return result
}

function map_grouped_elements(elements) {
    return elements.map((group) => ({
        year: group[0].innerText,
        articles: group[1].map(map_article_element)
    }))
}

function map_article_element(article) {
    const link = article.querySelector('a');

    let url = link.getAttribute("href")
    let title = link.innerText

    link.remove();
    let time = article.innerText;

    return { url, title, time }
}

