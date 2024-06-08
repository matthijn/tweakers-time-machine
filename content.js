import {fetch_articles, randomized_articles} from "./domain/time_machine";
import {append_historical_news} from "./domain/modify_news_dom";
import {end_of_day} from "./lib/time";
import {make_cacheable} from "./lib/cache";

async function main() {
    const cached_article_call = make_cacheable(fetch_articles, "historical_articles", end_of_day())
    const all_articles = await cached_article_call()
    const selection = randomized_articles(all_articles)
    await append_historical_news(selection)
}

main().catch(console.error)