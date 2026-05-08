import { BrowserRouter, createBrowserRouter, Link, Route, RouterProvider, Routes } from "react-router";
import "./App.css";
import { lazy, Suspense } from "react";
import loadData from "./utils/loadData";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import CoursesPage from "./Pages/coursePage.jsx";
import CheckoutPage from "./Pages/checkoutPage.jsx";
import ResultPage from "./Pages/ResultPage.jsx";
import CourseDetailPage from "./Pages/CourseDetailPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import HeroSection from "./Componenets/GSHHero.jsx";
import ProtectedRoute from "./Componenets/protectedRoute.jsx";
import AdminPage from "./Componenets/adminPage.jsx";
const ContactUs = lazy(() => import("./Pages/contactUs"));
const AboutUs = lazy(() => import("./Pages/About"));
const NotFound = lazy(() => import("./Pages/notFound"));
const Layout = lazy(() => import("./Pages/Layout"));
const Login = lazy(() => import("./Componenets/Login.jsx"));
const Register = lazy(() => import("./Componenets/Register"));
const Profile = lazy(() => import("./Componenets/Profile"));



const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		children: [
			{ index: true, element: <HeroSection></HeroSection> },
			{ path: "/home", element: <HeroSection></HeroSection>, loader: loadData },
			{ path: "/courses", element: <CoursesPage></CoursesPage> },
			{ path: "/course/:id", element: <CourseDetailPage></CourseDetailPage> },
			{ path: "/cart", element: <CartPage ></CartPage> },
			{ path: "/checkout", element: <CheckoutPage></CheckoutPage> },
			{ path: "/login", element: <Login></Login> },
			{ path: "/register", element: <Register></Register> },
			{ path: "/profile", element: <Profile></Profile> },
			{ path: "/result", element: <ResultPage></ResultPage> },
			{ path: "/aboutus", element: <AboutUs></AboutUs> },
			{ path: "/contactus", element: <ContactUs></ContactUs> },
			{ path: "/admin", element: <ProtectedRoute role="admin"><AdminPage /></ProtectedRoute> }
		],
		errorElement: <NotFound></NotFound>,
	},
	{ path: "*", element: <NotFound></NotFound> },
]);
function App() {
	console.log("App Start");

	return (
		<>
			<Provider store={store}>
				<Suspense fallback={<div>Loading...</div>}>
					<RouterProvider router={router}></RouterProvider>
				</Suspense>
			</Provider>
		</>
	);
}

export default App;
