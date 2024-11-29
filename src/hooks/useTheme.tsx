import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    // Check the system theme
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Set the initial theme
    setTheme(darkModeMediaQuery.matches ? "dark" : "light");

    // Add event listener for theme changes
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return theme;
};

export default useTheme;
