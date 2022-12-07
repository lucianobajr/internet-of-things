import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return !user ? <AuthRoutes /> : <AppRoutes />;
};

export default routes;
