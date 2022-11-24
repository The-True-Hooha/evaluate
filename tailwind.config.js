/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neon_carrot: {
                    100: '#e79935'
                },
                blue_black: {
                    100: '#02041b'
                },
            },
        },
    },
    plugins: [],
}
