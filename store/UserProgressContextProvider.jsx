import { createContext, useState } from "react";

export const UserProgressContext = createContext();

function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");

  const value = { progress, setProgress };
  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContextProvider;
