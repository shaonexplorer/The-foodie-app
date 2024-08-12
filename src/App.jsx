import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Meals from "../components/Meals";
import CartContextProvider from "../store/CartContextProvider";
import UserProgressContextProvider from "../store/UserProgressContextProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <UserProgressContextProvider>
            <Meals />
          </UserProgressContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
