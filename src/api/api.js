import mock from "./mock.json";

let cursor = 0;
const size = 50;

function delay(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export async function apiData() {
    await delay(1000);
    // cursor += 1;
    const start = cursor * size;
    const end = cursor * size + size;
    return mock.slice(start, end);
}

export default async function filteredApiData(filter) {
    await delay(10);
    const start = cursor * size;
    const end = cursor * size + size;
    let result = mock;

    filter.forEach(({ field, value }) => {
        result = result.filter(r => (r[field] || '').toLowerCase().indexOf(value.toLowerCase()) > -1);
    });

    return result.slice(start, end);
}
