import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { validateEmail } from "../utils/validations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Registro from "./regitros/Registro";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [next, setNext] = useState(false);

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      console.log("Registrar");
      console.log(formData, "datos");
      setNext(true);
    }
    setFormError(errors);
  };

  return (
    <>
      {next ? (
        <Registro
          formData={formData}
          formError={formError}
          setFormError={setFormError}
          setNext={setNext}
          next={next}
        />
      ) : (
        <View className="gap-y-4">
          <View className="gap-y-4">
            <Text className="font-bold text-4xl text-white ">
              ¡Vive, disfruta, Eventix te ayuda!
            </Text>
            <Text className="text-base  text-lightgray">
              ¡Unete a nosotros, y encuentra ese lugar magico que tanto estabas
              buscando!
            </Text>
          </View>
          <View className="space-y-4">
            <View
              className={
                formError?.email
                  ? "w-full bg-inkDark rounded-lg p-4 border border-red-800 "
                  : "w-full bg-inkDark rounded-lg p-4 "
              }
            >
              <TextInput
                className="text-white"
                placeholder="Correo Electrónico"
                placeholderTextColor="#969696"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.nativeEvent.text })
                }
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
                className="text-white w-[90%]"
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                value={formData.password}
                secureTextEntry={showPassword ? false : true}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.nativeEvent.text })
                }
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
            <View
              className={
                formError?.password
                  ? "w-full bg-inkDark rounded-lg p-4 flex-row justify-between border border-red-800 "
                  : "w-full bg-inkDark rounded-lg p-4 flex-row justify-between "
              }
            >
              <TextInput
                className="text-white w-[90%]"
                placeholder="Repetir Contraseña"
                placeholderTextColor="#969696"
                value={formData.repeatPassword}
                secureTextEntry={showPassword2 ? false : true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repeatPassword: e.nativeEvent.text,
                  })
                }
              />
              {showPassword2 ? (
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={24}
                  color="white"
                  onPress={() => setShowPassword2(!showPassword2)}
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  size={24}
                  color="white"
                  onPress={() => setShowPassword2(!showPassword2)}
                />
              )}
            </View>
          </View>
          <View className="flex-row w-full space-x-4 justify-center ">
            <TouchableOpacity onPress={register}>
              <Text className="w-full px-7 py-3 mx-1 justify-center items-center rounded-[32px] bg-PrimaryBase text-white">
                Registrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeForm}>
              <Text className="text-PrimaryBase w-full px-7 py-3 mx-1 justify-center items-center rounded-[32px] bg-white">
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}
