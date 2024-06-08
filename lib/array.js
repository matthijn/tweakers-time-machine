export function sample(arr, n) {
    const randomized = randomize(arr)
    return randomized.slice(0, n)
}

function randomize(array) {
    return array.sort(() => Math.random() - 0.5);
}