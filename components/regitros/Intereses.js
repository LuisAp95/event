import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  TouchableHighlight,
} from "react-native";
import moment from "moment";

export default function (props) {
  const { formData, datos, fecha, sex, setNext1, next1 } = props;
  const [interes, setInteres] = useState([]);
  console.log(interes, "vers");

  const registro = async () => {
    console.log(fecha, "fecha");
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
    console.log(Datos);
  };

  const InteR = [
    { name: "Entretenimiento", id: "1" },
    { name: "Disco", id: "2" },
    { name: "Nigth Club", id: "3" },
    { name: "Restaurant", id: "4" },
    { name: "Pezca", id: "5" },
  ];





  function handlebuscar(event) {
    const categorias = []
    let nuevaLongitud = categorias.push(event)
   setInteres(categorias)


   /*  for (event in InteR) setInteres(InteR[event]);*/
  } 
 

  return (
    <View className="gap-y-4 relative h-screen justify-center">
      <Text className="font-bold text-4xl text-white text-center">
        Seleciona tus intereses
      </Text>
      <Text className="text-base  text-lightgray">
        Debes elegir al menos 3 intereses
      </Text>
      <View className="grid grid-cols-3 gap-4">
        {InteR.map((int) => (
          <TouchableOpacity
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => handlebuscar(int.name)}
            key= {int.id}
          >
            <Text className="px-7 py-3  items-center rounded-[32px] bg-PrimaryBase text-white">
              {int.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex flex-row justify-center gap-x-8 ">
        <TouchableOpacity onPress={registro}>
          <Text className="px-7 py-3  items-center rounded-[32px] bg-PrimaryBase text-white">
            Registrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNext1(!next1)}>
          <Text className=" px-7 py-3  items-center rounded-[32px] bg-PrimaryBase text-white">
            volver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
