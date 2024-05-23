import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigation } from '@react-navigation/native';


function Auth(props) {
  const { user, setUser } = props;
  const [isLogin, setIsLogin] = useState(true);
  const [showContraseña, setShowContraseña] = useState(false);

  const navigation = useNavigation();

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View>
      <View className="w-full bg-bg p-6 h-full justify-center">
        {isLogin ? (
          <LoginForm user={user} setUser={setUser} changeForm={changeForm} navigation={navigation} />
        ) : (
          <RegisterForm changeForm={changeForm} navigation={navigation} />
        )}
        {/* <RecuperarContraseña setShowContraseña={setShowContraseña} navigation={navigation} /> */}
      </View>
      {/* <ModalContraseña show={showContraseña} setShow={setShowContraseña} /> */}
    </View>
  );
}
function RecuperarContraseña(props) {
  const { setShowContraseña } = props;

  return (
    <View className="w-full flex justify-center mt-5">
      <TouchableOpacity onPress={() => setShowContraseña(true)}>
        <Text className="text-white">Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Auth;
