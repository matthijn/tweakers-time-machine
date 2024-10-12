import {fetch_articles, randomized_articles} from "./domain/time_machine";
import {append_historical_news} from "./domain/modify_news_dom";
import {end_of_day} from "./lib/time";
import {make_cacheable} from "./lib/cache";
import {get, set} from "./domain/config";

async function main() {
    const is_front_page = document.location.href === "https://tweakers.net/"
    if (!is_front_page) {
        return
    }

    const [
        start_year,
        end_year,
        year_count,
        article_count,
        year_sort,
        display_location
    ] = await get("start_year", "end_year", "year_count", "article_count", 'year_sort', 'display_location')

    const cached_article_call = make_cacheable(fetch_articles, "historical_articles", end_of_day())
    const all_articles = await cached_article_call()

    const articles_in_range = all_articles.filter((a) => a.year >= start_year && a.year <= end_year)
    const selection = randomized_articles(articles_in_range, year_count, article_count, year_sort)

    await append_historical_news(selection, display_location)
}

main().catch(console.error)