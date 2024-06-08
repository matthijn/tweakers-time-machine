import {articles_to_dom_elements} from "./generate_dom";

export function append_historical_news(articles) {
    const elements = articles_to_dom_elements(articles)
    const target = document.querySelector(".headline-block-2");
    target.after(elements)
}