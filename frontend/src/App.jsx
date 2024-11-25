import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Store from "./redux/store";
import { loadUser, loadSeller } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";

import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreate,
  SellerActivationPage,
  ShopLogin,
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
  OrderDetailsPage,
} from "./routes/Routes";

import {
  ShopDashboardPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  ShopHomePage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventsPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopPreviewPage,
} from "./routes/ShopRoutes";

import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { server } from "./server";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  const stripePromise = stripeApikey ? loadStripe(stripeApikey) : null;

  async function getStripeApikey() {
    try {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApikey);
    } catch (error) {
      console.error("Falha ao buscar a chave da API do Stripe", error);
    }
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      <Elements stripe={stripePromise || null}>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produto/:id" element={<ProductDetailsPage />} />
          <Route path="/mais-vendidos" element={<BestSellingPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/shop-create" element={<ShopCreate />} />
          <Route path="/shop-login" element={<ShopLogin />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />

          {/* Rotas de Pagamento */}
          {stripeApikey && stripePromise && (
            <Route path="/payment" element={<PaymentPage />} />
          )}

          {/* Rotas Protegidas (Usuário) */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />

          {/* Rotas Protegidas (Vendedor) */}
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-pedidos"
            element={
              <SellerProtectedRoute>
                <ShopAllOrdersPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetailsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-criar-produto"
            element={
              <SellerProtectedRoute>
                <ShopCreateProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-produtos"
            element={
              <SellerProtectedRoute>
                <ShopAllProductsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-criar-evento"
            element={
              <SellerProtectedRoute>
                <ShopCreateEventsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-eventos"
            element={
              <SellerProtectedRoute>
                <ShopAllEventsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-cupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCouponsPage />
              </SellerProtectedRoute>
            }
          />
        </Routes>
      </Elements>

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
