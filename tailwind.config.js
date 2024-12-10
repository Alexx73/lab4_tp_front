// const flowbite = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // ...
//     flowbite.content(),
//   ],
//   plugins: [
//     // ...
//     flowbite.plugin(),
//   ],
// };

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Aquí defines los archivos que Tailwind debe analizar
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),  // Añades flowbite para que Tailwind lo procese
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(), // Agregas el plugin de Flowbite
  ],
};

