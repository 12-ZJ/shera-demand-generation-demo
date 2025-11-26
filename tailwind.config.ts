import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {
      colors: {
        theme_background: "#ffffff",
        theme_foreground: "#f7f7f7",
        theme_back: "#595959",
        theme_label: "#494949",
        theme_sub_label: "#9b9a9a",
        theme_border: "#D9D9D9",
        theme_table_border: "#E9ECF0",
        theme_table_header: "#F5F5F5",
      
        theme_black: "#262626",
        theme_grey: "#374254",
        theme_red: "#DD2626",
        theme_dim_red: "#B74D4D",
        theme_green: "#2D8291",
      
        theme_hover_blue: "#233B7C",
        theme_hover_cyan: "#0096A8",
        theme_hover_grey: "#F7F9FC",
        theme_hover_red: "#BA2F2D",

        theme_orange: "#CF4320",
        theme_red_bright: "#FD0303",
        theme_steel_blue: "#485D74",
        theme_dark_slate: "#1F252D",
        theme_deep_navy: "#0B0F19",
        theme_light_gray: "#DDE2E8",
        theme_medium_gray: "#555555",
        theme_blue_grey: "#324E6D",
        theme_brown_grey: "#837F7F",

        theme_primary: "#27b461",
        theme_secondary: "#00ab4e",
        theme_tertiary: "#008039",
        theme_white: "#ffffff",
        theme_disabled: "#f5f5f5",
        theme_greyLight: "#ebebeb",
        theme_greyDark: "#6d6f72",
        theme_greyDarker: "#383d44ff",
        theme_greyMedium: "#707072",
        theme_greyRegular: "#9d9ea2",
        theme_redLight: "#f8d7da",
        theme_redDark: "#a32035",
        theme_redMedium: "#aa3845",
        theme_redRegular: "#b4454e",
        theme_peachLight: "#c99884",
        theme_peachSoft: "#e2be8f",
        theme_topic: "#092E48",
        theme_link: "#27b461",
        theme_text: "black",
        theme_textLight: "#ffffff",
        theme_greenLight: "#d4edda",
        theme_greenMedium: "#00ab4e",
        theme_greenDark: "#034b38",
        theme_yellowLight: "#fff3cd",
        theme_yellowMedium: "#ffc107",
        theme_orangeLight: "#ffd2b4ff",
        theme_orange_medium: "#f09d50ff",
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
export default config