export async function get_value(id, default_value = null) {
    let v

    const storage = extension_storage()
    if (storage) {
        v = (await storage.local.get([id]))[id]
    }
    else {
        v = localStorage.getItem(id)
    }

    return exists(v) ? v : default_value
}

export async function save_value(id, value) {
    const storage = extension_storage()
    if (storage) {
        return storage.local.set({ [id]: value })
    }

    return localStorage.setItem(id, value)
}

export async function remove_value(id) {
    return save_value(id, null)
}

function extension_storage() {
    return (typeof browser !== 'undefined' && browser.storage) || (typeof chrome !== 'undefined' && chrome.storage);
}

function exists(v) {
    return v !== undefined && v !== null
}