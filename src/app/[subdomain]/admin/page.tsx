"use client";

import { useState } from "react";

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DashboardComponent />;
      case "users":
        return <UsersComponent />;
      case "settings":
        return <SettingsComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <main className="flex-1 p-8">
      {renderComponent()}
    </main>
  );
}

function DashboardComponent() {
  return <h2 className="text-2xl font-bold">Dashboard</h2>;
}

function UsersComponent() {
  return <h2 className="text-2xl font-bold">Users Management</h2>;
}

function SettingsComponent() {
  return <h2 className="text-2xl font-bold">Settings</h2>;
}
