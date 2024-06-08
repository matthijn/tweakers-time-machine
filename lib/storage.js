export async function store(key, value) {
    return chrome.storage.local.set({ [key]: value });
}

export async function get(key){
    const dict = await chrome.storage.local.get([key])
    return dict[key]
}