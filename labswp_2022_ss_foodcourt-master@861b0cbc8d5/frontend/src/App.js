import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import AdministratorList from "./components/AdministratorList";
import AddAdministrator from "./components/AddAdministrator";
import EditAdministrator from "./components/EditAdministrator";
import RestaurantonwerList from "./components/RestaurantownerList";
import AddRestaurantonwer from "./components/AddRestaurantowner";
import EditRestaurantowner from "./components/EditRestaurantowners";
import MenuAdministration from "./components/MenuAdministration";
import AddDish from "./components/AddDish"
import EditDish from "./components/EditDish"
import AddBeverage from "./components/AddBeverage";
import EditBeverage from "./components/EditBeverage";
import EventAdministration from "./components/EventAdministration";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import EventGuest from "./components/EventGuest";
import Login from "./components/Login";
import AdminNavbar from "./components/AdminNavbar";
import Contact from "./components/Contact";
import { useAuth } from "./hooks";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { token } = useAuth()
  return (
    <Router>
      {token
        ? <AdminNavbar />
        : <Navbar />
      }
      <div className="container">
        <div className="columns is-centered">
          <Routes>
            <Route exact path="/" element={
              <Home />}
            />
            <Route exact path="/menu" element={
              <Menu />}
            />
            <Route exact path="/contact" element={
              <Contact />}
            />
            <Route exact path="/administrators"
              element={
                <ProtectedRoute>
                  <AdministratorList />
                </ProtectedRoute>}
            />
            <Route path="/administrators/add"
              element={
                <ProtectedRoute>
                  <AddAdministrator />
                </ProtectedRoute>}
            />
            <Route path="/administrators/edit/:username"
              element={
                <ProtectedRoute>
                  <EditAdministrator />
                </ProtectedRoute>}
            />
            <Route path="/restaurantowners"
              element={
                <ProtectedRoute>
                  <RestaurantonwerList />
                </ProtectedRoute>}
            />
            <Route path="/restaurantowners/add"
              element={
                <ProtectedRoute>
                  <AddRestaurantonwer />
                </ProtectedRoute>}
            />
            <Route path="/restaurantowners/edit/:foodstand"
              element={
                <ProtectedRoute>
                  <EditRestaurantowner />
                </ProtectedRoute>}
            />
            <Route path="/menu/administration"
              element={
                <ProtectedRoute>
                  <MenuAdministration />
                </ProtectedRoute>}
            />
            <Route path="/dishes/add"
              element={
                <ProtectedRoute>
                  <AddDish />
                </ProtectedRoute>}
            />
            <Route path="/dishes/edit/:description"
              element={
                <ProtectedRoute>
                  <EditDish />
                </ProtectedRoute>}
            />
            <Route path="/beverages/add"
              element={
                <ProtectedRoute>
                  <AddBeverage />
                </ProtectedRoute>}
            />
            <Route path="/beverages/edit/:description"
              element={
                <ProtectedRoute>
                  <EditBeverage />
                </ProtectedRoute>}
            />
            <Route path="/events/guest"
              element={
                <EventGuest />
              } />
            <Route path="/events/administration"
              element={
                <ProtectedRoute>
                  <EventAdministration />
                </ProtectedRoute>}
            />
            <Route path="/events/add/"
              element={
                <ProtectedRoute>
                  <AddEvent />
                </ProtectedRoute>}
            />
            <Route path="/events/edit/:id"
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>}
            />
            <Route path="/login"
              element={
                <Login />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;