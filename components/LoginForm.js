import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Text, TouchableOpacity, View, Alert } from "react-native";
import { loginApi } from "../api/userapi";
import { validateEmail } from "../utils/validations";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function LoginForm(props) {
  const { changeForm, setUser } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      const response = await loginApi(formData);
      if (response?.accessToken){
        AsyncStorage?.setItem("AccessToken", response?.accessToken);
        setUser(response?.accessToken);
      }
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View className = "gap-y-5">
      <View className="gap-y-4">
        <Text className="font-bold text-4xl text-white">
          Encuentra tus eventos favoritos
        </Text>
        <Text className="text-base text-lightgray">
          Eventix está aquí para ayudarte a encontrar los mejores eventos basado
          en tus intereses.
        </Text>
      </View>
      <View className="space-y-4 ">
        <View
          className={
            formError?.email
              ? "w-full bg-inkDark rounded-lg p-4 border border-red-800 "
              : "w-full bg-inkDark rounded-lg p-4 "
          }
        >
          <TextInput
            placeholder="Correo Electrónico"
            placeholderTextColor="#929497"
            onChange={(e) => onChange(e, "email")}
            className="text-white"
          />
        </View>
        <View
          className={
            formError?.password
              ? "w-full bg-inkDark rounded-lg p-4 flex-row justify-between border border-red-800 "
              : "w-full bg-inkDark rounded-lg p-4 flex-row justify-between "
          }
        >
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#929497"
            secureTextEntry={showPassword ? false : true}
            onChange={(e) => onChange(e, "password")}
            className="text-white w-[90%]"
          />

          {showPassword ? (
            <MaterialCommunityIcons
              name="eye-outline"
              size={24}
              color="white"
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            <MaterialCommunityIcons
              name="eye-off-outline"
              size={24}
              color="white"
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
        </View>
      </View>
      <View className="flex-row w-full justify-center space-x-4">
        <TouchableOpacity onPress={login}>
          <Text className="text-white w-full px-7 py-3 mx-1 text-center rounded-[32px] bg-PrimaryBase">
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeForm}>
          <Text className="text-PrimaryBase w-full px-7 py-3 mx-1 text-center rounded-[32px] bg-white">
            ¿No tienes cuenta?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <TouchableOpacity>
          <Text className="text-PinkBase">¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

export default LoginForm;
