import {get_value, remove_value, save_value} from "./storage";

export function make_cacheable(func, cache_key, until_date) {
    return async function () {
        const exists = await get_cache(cache_key)
        if (exists) { return exists }

        const res = await func()
        await set_cache(cache_key, res, until_date)
        return res
    }
}

async function set_cache(key, value, until_date) {
    const serialized_value = JSON.stringify(value);

    const cache_data = {
        value: serialized_value,
        until_date: until_date.getTime()
    };

    return save_value(key, JSON.stringify(cache_data));
}

async function get_cache(key) {
    const cache_data = await get_value(key);
    if (!cache_data) {
        return null;
    }

    const parsed_cache_data = JSON.parse(cache_data);
    const cached_until_date = new Date(parsed_cache_data.until_date);

    if (new Date() > cached_until_date) {
        await remove_value(key);
        return null;
    }

    return JSON.parse(parsed_cache_data.value);
}