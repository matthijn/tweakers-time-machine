import { map_html_to_articles } from "./html_parser";
import { sample } from "../lib/array";

export async function fetch_articles() {
    const html = await fetch_source_html()
    return map_html_to_articles(html)
}

export function randomized_articles(contents, nr_years = 3, per_year = 4) {
    return sample(contents.map((group) => ({
        ...group,
        articles: sample(group.articles, per_year)
    })), nr_years)
}

async function fetch_source_html() {
    const url = "https://randomize.be/wot_tijdmachine/"
    const contents = await fetch(url)
    return contents.text()
}
