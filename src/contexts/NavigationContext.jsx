import { createContext, useContext, useState, useCallback } from "react";

const NavigationContext = createContext(null);

const SECTIONS = [
  "intro",
  "hub",
  "sweets",
  "fireworks",
  "diyas",
  "gift",
  "memories",
  "reasons",
  "letter",
];

export function NavigationProvider({ children }) {
  const [currentSection, setCurrentSection] = useState("intro");
  const [showIntro, setShowIntro] = useState(true);

  const navigateTo = useCallback(
    (section) => {
      const target = section === "hero" ? "hub" : section;
      if (SECTIONS.includes(target)) {
        setCurrentSection(target);
        if (target !== "intro") {
          setShowIntro(false);
        }
      }
    },
    []
  );

  const goHome = useCallback(() => {
    setCurrentSection("hub");
    setShowIntro(false);
  }, []);

  const completeIntro = useCallback(() => {
    setShowIntro(false);
    setCurrentSection("hub");
  }, []);

  const value = {
    currentSection,
    showIntro,
    navigateTo,
    navigate: navigateTo,
    goHome,
    completeIntro,
    sections: SECTIONS,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
