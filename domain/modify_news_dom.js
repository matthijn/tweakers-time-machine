import {articles_to_dom_elements} from "./generate_dom";
import {NewsLocation} from "./news_location";

export function append_historical_news(articles, display_location) {
    const elements = articles_to_dom_elements(articles)

    if (display_location === NewsLocation.SIDEBAR) {
      const target = document.querySelector(".sidebar-1");
      target.prepend(elements);
    } else {
      const target = document.querySelector(".headline-block-2");
      target.appendChild(elements);
    }
}