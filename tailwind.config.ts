import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"]
      },
      colors: {
        kografly: {
          indigo: "#0B3C8A",
          amber: "#D97706",
          teal: "#0F766E",
          stone: "#FAFAF9",
          ink: "#1C1917",
          muted: "#78716C",
          surface: "#FFFFFF",
          success: "#16A34A",
          error: "#DC2626",
          info: "#2563EB"
        }
      },
      borderRadius: {
        thread: "1.35rem"
      },
      boxShadow: {
        thread: "0 28px 80px rgba(15, 23, 42, 0.13)",
        soft: "0 14px 40px rgba(15, 23, 42, 0.08)"
      },
      keyframes: {
        "k-rise": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "k-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.025)" }
        },
        "k-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-1.5deg)" },
          "75%": { transform: "rotate(1.5deg)" }
        },
        "k-bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        "k-glow": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(11, 60, 138, 0)" },
          "50%": { boxShadow: "0 0 28px rgba(11, 60, 138, .26)" }
        }
      },
      animation: {
        "k-rise": "k-rise .42s ease both",
        "k-pulse": "k-pulse 2s ease-in-out infinite",
        "k-wiggle": "k-wiggle 1.5s ease-in-out infinite",
        "k-bounce-soft": "k-bounce-soft 1.8s ease-in-out infinite",
        "k-glow": "k-glow 2.3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
