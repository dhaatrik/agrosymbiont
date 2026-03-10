const pathnamesStr = "/products/agricultural-drones/agras-t40";

function withoutMemo() {
    return pathnamesStr.split('/').filter((x) => x);
}

let cachedValue = null;
let lastLocation = null;
function withMemo(locationPathname) {
    if (locationPathname !== lastLocation) {
        lastLocation = locationPathname;
        cachedValue = locationPathname.split('/').filter((x) => x);
    }
    return cachedValue;
}

const ITERATIONS = 1000000;

console.log("Benchmarking Without Memo (recalculating every time)...");
const startWithoutMemo = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    withoutMemo();
}
const endWithoutMemo = performance.now();
const timeWithoutMemo = endWithoutMemo - startWithoutMemo;
console.log(`Time taken: ${timeWithoutMemo.toFixed(2)} ms`);

console.log("\nBenchmarking With Memo (simulating useMemo cache hit)...");
// Set the cache
withMemo(pathnamesStr);
const startWithMemo = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    withMemo(pathnamesStr);
}
const endWithMemo = performance.now();
const timeWithMemo = endWithMemo - startWithMemo;
console.log(`Time taken: ${timeWithMemo.toFixed(2)} ms`);

console.log(`\nImprovement: ${((timeWithoutMemo - timeWithMemo) / timeWithoutMemo * 100).toFixed(2)}% faster`);
console.log(`Speedup: ${(timeWithoutMemo / timeWithMemo).toFixed(2)}x faster`);