import { createContext, useContext, useState } from "react";

export const NostrContext = createContext();
export const useNostrContext = () => useContext(NostrContext);

// Fake nostr client
export const NostrProvider = ({ children }) => {
  const [nostr, setNostr] = useState({
    publish: (note) => {
      let feed = JSON.parse(localStorage.getItem("feed") || "[]");
      feed.unshift(note);
      localStorage.setItem("feed", JSON.stringify(feed));
    },
    getFeed: () => {
      return JSON.parse(localStorage.getItem("feed") || "[]");
    },
  });

  return (
    <NostrContext.Provider value={{ nostr }}>{children}</NostrContext.Provider>
  );
};
