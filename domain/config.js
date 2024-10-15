import {build_config_from_defaults} from "../lib/config";
import { YearSort } from "./year_sort";
import { NewsLocation } from "./news_location";

const defaults = {
    start_year: 1999,
    end_year: new Date().getFullYear() - 1,
    year_count: 3,
    article_count: 4,
    year_sort: YearSort.RANDOM,
    display_location: NewsLocation.BELOW_RECENT,
}

export const { get, set, get_default } = build_config_from_defaults(defaults)
