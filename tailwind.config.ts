import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        screens: {
            container: '1280px',
            xl: {max: '1279px'}, // => @media (max-width: 1279px) { ... }
            lg: {max: '900px'}, // => @media (max-width: 1023px) { ... }
            br800: {max: '800px'}, // => @media (max-width: 1023px) { ... }
            md: {max: '768px'}, // => @media (max-width: 767px) { ... }
            sm: {max: '640px'}, // => @media (max-width: 639px) { ... }
            xs: {max: '400px'}, // => @media (max-width: 480px) { ... },
            lg2: {max: '1040px'}, // => @media (max-width: 480px) { ... },

            'min-xl': {min: '1279px'}, // => @media (min-width: 1279px) { ... }
            'min-lg': {min: '900px'}, // => @media (min-width: 1023px) { ... }
            'min-md': {min: '768px'}, // => @media (min-width: 767px) { ... }
            'min-sm': {min: '640px'}, // => @media (min-width: 639px) { ... }
            'min-xs': {min: '440px'} // => @media (min-width: 480px) { ... }
        }
    },
    plugins: []
}
export default config