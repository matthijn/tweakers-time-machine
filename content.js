import {randomized_articles} from "./domain/time_machine";
import {append_historical_news} from "./domain/modify_news_dom";

async function main() {
    const articles = await randomized_articles()
    await append_historical_news(articles)
}

main().catch(console.error)