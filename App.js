import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import Home from "./screens/Home";
import Auth from "./components/Auth";
import Categoria from "./screens/Categoria";
import CategoriaV2 from "./screens/CategoriaV2";
import Evento from "./screens/Evento";
import Descubre from "./screens/Descubre";
import Cuenta from "./screens/Cuenta";
import Ticket from "./screens/Ticket";
import Tickets from "./screens/Tickets";
import TabMenu from "./components/TabMenu";
import Maps from "./screens/Maps";
import Favoritos from "./screens/Favoritos";
import Checkout from "./screens/Checkout";
import Payment from "./screens/Payment";
import Confirmacion from "./screens/Confirmacion";
import Siguiendo from "./screens/Siguiendo";
import Ayuda from "./screens/Ayuda";

const Stack = createStackNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(true);

  useEffect(() => {
    /*  handleGetToken(); */
  }, [user]);

  const handleGetToken = async () => {
    const token = await AsyncStorage?.getItem("AccessToken");
    if (token) {
      setUser(token);
    } else {
      setUser(false);
    }
  };

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "pink" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          height: 60,
          width: "80%",
          borderLeftColor: "red",
          borderRadius: 30,
        }}
        contentContainerStyle={{ paddingHorizontal: 40 }}
        text1Style={{
          fontSize: 24,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };

  if (user === undefined) return null;

  return (
    <PaperProvider>
      <NavigationContainer>
        {user ? (
          <>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Categoria" component={Categoria} />
              <Stack.Screen name="CategoriaV2" component={CategoriaV2} />
              <Stack.Screen name="Evento" component={Evento} />
              <Stack.Screen name="Descubre" component={Descubre} />
              <Stack.Screen name="Cuenta" component={Cuenta} />
              <Stack.Screen name="Tickets" component={Tickets} />
              <Stack.Screen name="Ticket">
                {(props) => <Ticket active={active} setActive={setActive} />}
              </Stack.Screen>
              <Stack.Screen name="Favoritos" component={Favoritos} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="Confirmacion" component={Confirmacion} />
              <Stack.Screen name="Siguiendo" component={Siguiendo} />
              <Stack.Screen name="Ayuda" component={Ayuda} />
              <Stack.Screen name="Maps" component={Maps} />
            </Stack.Navigator>
            <View className="bg-bg">
              <TabMenu user={user} setUser={setUser} />
            </View>
          </>
        ) : (
          <Auth user={user} setUser={setUser} />
        )}
        <Toast config={toastConfig} />
      </NavigationContainer>
    </PaperProvider>
  );
}
