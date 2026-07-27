import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageShipments from "../pages/admin/ManageShipments";
import AuditLogs from "../pages/admin/AuditLogs";
import Analytics from "../pages/admin/Analytics";

import WarehouseDashboard from "../pages/warehouse/WarehouseDashboard";
import HubDashboard from "../pages/hub/HubDashboard";
import DeliveryDashboard from "../pages/delivery/DeliveryDashboard";

import Scan from "../pages/scan/Scan";
import ScanResult from "../pages/scan/ScanResult";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/shipments" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageShipments />
            </ProtectedRoute>
          } />
          <Route path="/admin/audit" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AuditLogs />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Analytics />
            </ProtectedRoute>
          } />

          {/* Warehouse */}
          <Route path="/warehouse/dashboard" element={
            <ProtectedRoute allowedRoles={["warehouse"]}>
              <WarehouseDashboard />
            </ProtectedRoute>
          } />

          {/* Hub */}
          <Route path="/hub/dashboard" element={
            <ProtectedRoute allowedRoles={["hub"]}>
              <HubDashboard />
            </ProtectedRoute>
          } />

          {/* Delivery */}
          <Route path="/delivery/dashboard" element={
            <ProtectedRoute allowedRoles={["delivery"]}>
              <DeliveryDashboard />
            </ProtectedRoute>
          } />

          {/* Scan — all roles */}
          <Route path="/scan" element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          } />
          <Route path="/scan/result/:token" element={
            <ProtectedRoute>
              <ScanResult />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;