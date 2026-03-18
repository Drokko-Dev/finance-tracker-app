import { MainLayout } from "@/layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";


export function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRouter/>
      </MainLayout>
    </BrowserRouter>
  );
}
