import {get, set, get_default} from "./domain/config";
import {YearSort} from "./domain/year_sort";
import {NewsLocation} from "./domain/news_location";

function make_select(id, values, selected_value, onchange, map_value = (v) => v) {
    const select = document.getElementById(id)

    for (const v of values) {
        const option = document.createElement("option")
        option.value = v
        option.textContent = v
        option.selected = v === selected_value
        select.appendChild(option)
    }

    select.onchange = function(e) {
        const v = e.target.value
        const mapped = map_value(v)
        e.target.value = mapped
        onchange(mapped)
    }
}

async function make_persistable_select(id, values, map_value = (v) => v) {
    const current_value = await get(id)
    return make_select(id, values, current_value, (value) => set(id, value), map_value)
}

document.addEventListener('DOMContentLoaded', async function () {
    const years = Array.from({length: get_default('end_year') - get_default('start_year') + 1}, (v, i) => get_default('start_year') + i);

    const range = Array.from({ length: 10 }, (v, i) => i + 1);

    return Promise.all([
        make_persistable_select("start_year", years, (value) => Math.min(get_default("end_year"), value)),
        make_persistable_select("end_year", years, (value) => Math.max(get_default("start_year"), value)),

        make_persistable_select("year_count", range),
        make_persistable_select("article_count", range),

        make_persistable_select('year_sort', [YearSort.NO, YearSort.YES_OLDEST_FIRST, YearSort.YES_NEWEST_FIRST]),
        make_persistable_select('display_location', [NewsLocation.BELOW_RECENT, NewsLocation.SIDEBAR])
    ])
})