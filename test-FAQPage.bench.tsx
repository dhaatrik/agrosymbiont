import { bench, describe } from 'vitest';

describe('Array.from vs for loop', () => {
    bench('Array.from', () => {
        const result = Array.from({ length: 10 }, (_, i) => ({
            question: `q${i}`,
            answer: `a${i}`
        }));
    });

    bench('for loop', () => {
        const result = new Array(10);
        for (let i = 0; i < 10; i++) {
            result[i] = {
                question: `q${i}`,
                answer: `a${i}`
            };
        }
    });
});
