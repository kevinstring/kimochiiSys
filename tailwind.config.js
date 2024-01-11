
/** @type {import('tailwindcss').Config} */

module.exports =  {
  content: [   "./src/**/*.{html,ts}",  'node_modules/preline/dist/*.js',],
  theme: {
    
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#0ea5e9",
        
"secondary": "#2563eb",
        
"accent": "#bfdbfe",
        
"neutral": "#fcd34d",
        
"base-100": "#f3f4f6",
        
"info": "#00eeff",
        
"success": "#25ba00",
        
"warning": "#ff9900",
        
"error": "#ff939d",
        },
      },
    ],
  },
  plugins: [require("daisyui"),     require('preline/plugin'),],
}

