import { lazy, Suspense, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa lo stile di Bootstrap
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Per la gestione delle rotte
import NavBar from "./components/Navbar/Navbar"; // Importa il componente della barra di navigazione
import Footer from "./components/Footer/Footer"; // Importa il componente del footer
import Loader from "./components/Loader/Loader"; // Importa il loader per la suspense
import { ToastContainer } from "react-toastify"; // Importa il contenitore per le notifiche
import "react-toastify/dist/ReactToastify.css"; // Importa gli stili di react-toastify
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import GenerateCertificate from "./components/Dashboard/GenerateCertificate";
import Certificate from "./components/Dashboard/Certificate";
import SearchCertificate from "./components/Dashboard/Search-certificate";
import GenerateCertificateId from "./components/Dashboard/GenerateCertificateId";
import Profile from "./pages/Profile";


// Importazione lazy dei componenti delle pagine per il caricamento dinamico
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));

function App() {

  return (
    // Suspense visualizza il Loader finché i componenti lazy non vengono caricati
    <Suspense fallback={<Loader />}>
      {/* Router per gestire la navigazione */}
      <Router>
        {/* Contenitore delle notifiche di sistema */}
        <ToastContainer
          position="top-right" // Posiziona le notifiche in alto a destra
          autoClose={1000} // Chiudi automaticamente dopo 1 secondo
          hideProgressBar={false} // Mostra la barra di progresso
          newestOnTop={false} // Non mostrare le notifiche più recenti in cima
          closeOnClick // Chiudi al click
          pauseOnFocusLoss // Pausa quando la finestra perde il focus
          draggable // Notifiche trascinabili
          pauseOnHover // Pausa al passaggio del mouse
          theme="light" // Tema chiaro
        />
        {/* Barra di navigazione comune a tutte le pagine */}
        <NavBar />
        {/* Definizione delle rotte dell'applicazione */}
        <Routes>
          {/* Rotta per la homepage */}
          <Route path="/" element={<Home />} />
          {/* Rotta per la pagina del negozio */}
          <Route path="/shop" element={<Shop />} />
          {/* Rotta per il dettaglio del prodotto */}
          <Route path="/shop/:id" element={<Product />} />
          {/* Rotta per la pagina del carrello */}
          <Route path="/cart" element={<Cart />} />
          {/* Router signup */}
          <Route path="/login" element={<Login />} />
          {/* Router login */}
          <Route path="/singup" element={<Signup />} />
          {/* Router Admin Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Router Admin Dashboard */}
          <Route path="/dashboard/generate-certificate" element={<GenerateCertificate />} />
          {/* particular certificate of student */}
          <Route path="/certificate/:id" element={<Certificate />} />
          {/* search certificate */}
          <Route path="/search-certificate" element={<SearchCertificate />} />
          {/* search certificate */}
          <Route path="/dashboard/generate-certificateId" element={<GenerateCertificateId />} />
          {/* user profile page */}
          <Route path="/profile" element={<Profile />} />

        </Routes>
        {/* Footer visualizzato su tutte le pagine */}
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
