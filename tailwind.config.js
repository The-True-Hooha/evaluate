/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            neon_carrot: '#e79935',
            blue_black: '#02041b',
        },
        extend: {},
    },
    plugins: [],
}
