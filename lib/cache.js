export function make_cacheable(func, cache_key, until_date) {
    return async function () {
        const exists = get_cache(cache_key)
        if (exists) { return exists }

        const res = await func()
        set_cache(cache_key, res, until_date)
        return res
    }
}

function set_cache(key, value, until_date) {
    const serialized_value = JSON.stringify(value);

    const cache_data = {
        value: serialized_value,
        until_date: until_date.getTime()
    };
    localStorage.setItem(key, JSON.stringify(cache_data));
}

function get_cache(key) {
    const cache_data = localStorage.getItem(key);
    if (!cache_data) {
        return null;
    }

    const parsed_cache_data = JSON.parse(cache_data);
    const cached_until_date = new Date(parsed_cache_data.until_date);

    if (new Date() > cached_until_date) {
        localStorage.removeItem(key);
        return null;
    }

    const deserialized_value = JSON.parse(parsed_cache_data.value);
    return deserialized_value;
}