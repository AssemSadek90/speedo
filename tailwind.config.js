/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"
  ],
  
  theme: {
    extend: {
      screens: {
        "w-1465-max": {"max": "1465px"},
        'w-1190-max': {'max': '1190px'},
        "w-910-max": {"max": "910px"},
        'w-820-max': {'max': '820px'},
        'w-780-max': {'max': '780px'},
        'w-625-max': {'max': '625px'},
        'w-545-max': {'max': '545px'},
        'w-485-max': {'max': '485px'},
        'w-380-max': {'max': '380px'},
      },
    },
  },
  plugins: [
    
  ],
};
