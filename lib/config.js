import { get_value, save_value } from "./storage";

export function build_config_from_defaults(defaults) {
    async function get(...keys) {
        if (keys.length === 1) {
            return get_entry(keys[0])
        }

        return Promise.all(keys.map(get_entry))
    }

    async function get_entry(key) {
        const default_value = get_default(key)
        const v = await get_value(key, default_value)

        if (typeof default_value === "number") {
            return parseInt(v)
        }

        return v
    }

    async function set(key, value) {
        ensure_config_key(key)
        return save_value(key, value)
    }

    function get_default(key) {
        ensure_config_key(key)
        return defaults[key]
    }

    function ensure_config_key(key) {
        if (!defaults[key]) {
            throw new Error(`Unexpected configuration key: ${key}`)
        }
    }

    return { get, set, get_default }
}