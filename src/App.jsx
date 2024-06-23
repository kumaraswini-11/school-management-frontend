import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <div className="min-h-screen">
      <DataProvider>
        <AppRouter />
        <Toaster position="top-right" reverseOrder={false} />
      </DataProvider>
    </div>
  );
};

export default App;
