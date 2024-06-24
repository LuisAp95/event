import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import moment from "moment";

export default function (props) {
  const { formData, datos, fecha, sex, setNext1, next1 } = props;
  const [interes, setInteres] = useState([]);

  const registro = async () => {
    const Datos = {
      firstNames: datos.firstNames,
      lastNames: datos.lastNames,
      birthDate: moment(fecha).format("DD/MM/YYYY"),
      email: formData.email,
      password: formData.password,
      gender: sex,
      phone: datos.phone,
      interests: interes,
    };
  };

  const InteR = [
    { name: "Teatro", id: "1" },
    { name: "Deportes", id: "2" },
    { name: "Night Clubs", id: "3" },
    { name: "Comida", id: "4" },
    { name: "Aire libre", id: "5" },
    { name: "Museos", id: "6" },
  ];

  function handlebuscar(event) {
    const categorias = [];
    let nuevaLongitud = categorias.push(event);
    setInteres(categorias);

    /*  for (event in InteR) setInteres(InteR[event]);*/
  }

  return (
    <View className="justify-center min-h-screen space-y-4 h-full">
      <Text className="font-bold text-4xl text-white text-center">
        Seleciona tus intereses
      </Text>
      <Text className="text-base  text-lightgray">
        Debes elegir al menos 3.
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="gap-y-4 relative max-h-96"
      >
        <View className="grid grid-cols-4 gap-4">
          {InteR.map((int) => (
            <TouchableOpacity
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => handlebuscar(int.name)}
              key={int.id}
            >
              <View className="w-24 h-24 flex text-center justify-center items-center rounded-full bg-PrimaryBase ">
                <Text className="text-white text-xs">{int.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="flex flex-row justify-center gap-x-8 ">
        <TouchableOpacity onPress={registro}>
          <Text className="px-7 py-3  items-center rounded-[32px] bg-PrimaryBase text-white">
            Registrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNext1(!next1)}>
          <Text className=" px-7 py-3  items-center rounded-[32px] bg-white text-PrimaryBase">
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
