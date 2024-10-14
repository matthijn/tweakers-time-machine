import { map_html_to_articles } from "./html_parser";
import { sample } from "../lib/array";
import { YearSort } from "./year_sort";

export async function fetch_articles() {
    const html = await fetch_source_html()
    return map_html_to_articles(html)
}

export function randomized_articles(contents, nr_years = 3, per_year = 4, year_sort = 'No') {
    const randomArticles = sample(contents.map((group) => ({
        ...group,
        articles: sample(group.articles, per_year)
    })), nr_years);

    switch (year_sort) { 
        case YearSort.YES_OLDEST_FIRST:
            return randomArticles.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        case YearSort.YES_NEWEST_FIRST:
            return randomArticles.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        default:
            return randomArticles;
    }
}

async function fetch_source_html() {
    const url = "https://randomize.be/wot_tijdmachine/"
    const contents = await fetch(url)
    return contents.text()
}
