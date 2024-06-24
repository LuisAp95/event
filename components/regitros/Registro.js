import React, { useState } from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
import PhoneInput from "react-native-phone-input";

import moment from "moment";
import Intereses from "./Intereses";

export default function Registro(props) {
  const { formData, setFormError, formError, setNext, next } = props;
  const [datos, setDatos] = useState(defaultValue());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fecha, setFecha] = useState(null);
  const [sex, setSex] = useState("");
  const [next1, setNext1] = useState(false);
  const [formEr, setFormEr] = useState({});

  const register = () => {
    let errors = {};
    if (!datos.firstNames || !datos.lastNames || !datos.phone || !fecha) {
      if (!datos.firstNames) errors.firstNames = true;
      if (!datos.lastNames) errors.lastNames = true;
      if (!datos.phone) errors.phone = true;
      if (!fecha) errors.birthDate = true;
    } else {
      setNext1(true);
    }
    setFormEr(errors);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFecha(date);
    hideDatePicker();
  };
  const sexo = [
    { title: "Mujer" },
    { title: "Hombre" },
    { title: "Indefinido" },
  ];

  return (
    <>
      {/* <Image
        source={require("../../assets/site-bg.jpg")}
        className=" absolute z-[-10] w-screen "
      /> */}
      <View className="gap-y-4 relative h-screen justify-center">
        {next1 ? (
          <Intereses
            datos={datos}
            fecha={fecha}
            sex={sex}
            setNext1={setNext1}
            next1={next1}
            formData={formData}
          />
        ) : (
          <>
            <View className="mb-5">
              <Text className="font-bold text-4xl text-white text-center">
                ¡Cuentanos de ti!
              </Text>
            </View>

            <View className="flex-row justify-between items-center  mb-3 top-8 absolute z-50">
              <TouchableOpacity>
                <MaterialIcons
                  name="arrow-back-ios"
                  color="#fff"
                  size={16}
                  onPress={() => setNext(false)}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
              <View
                className={
                  formEr?.firstNames
                    ? "w-[48%] bg-inkDark rounded-lg p-4 flex-row justify-between border border-red-800"
                    : "w-[48%] bg-inkDark rounded-lg p-4 flex-row justify-between "
                }
              >
                <TextInput
                  className="text-white  w-full"
                  placeholder="Nombre"
                  placeholderTextColor="#969696"
                  onChange={(e) =>
                    setDatos({ ...datos, firstNames: e.nativeEvent.text })
                  }
                />
              </View>
              <View
                className={
                  formEr?.lastNames
                    ? "w-[48%] bg-inkDark rounded-lg p-4 flex-row justify-between border border-red-800 "
                    : "w-[48%]  bg-inkDark rounded-lg p-4 flex-row justify-between "
                }
              >
                <TextInput
                  className="text-white ww-full"
                  placeholder="Apellido"
                  placeholderTextColor="#969696"
                  //secureTextEntry={showPassword ? false : true}
                  onChange={(e) =>
                    setDatos({ ...datos, lastNames: e.nativeEvent.text })
                  }
                />
              </View>
            </View>
            <View className="flex-row  justify-between ">
              <View className=" bg-inkDark w-[48%] rounded-lg ">
                <SelectDropdown
                  data={sexo}
                  onSelect={(selectedItem, index) => {
                    setSex(selectedItem.title);
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        {selectedItem && (
                          <Octicons
                            name={selectedItem.icon}
                            style={styles.dropdownButtonIconStyle}
                            color="#fff"
                          />
                        )}
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.title) ||
                            "Selecciona tu sexo"}
                        </Text>
                        <Octicons
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          style={styles.dropdownButtonArrowStyle}
                          color="#fff"
                        />
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: "#665EE0" }),
                        }}
                      >
                        <Text style={styles.dropdownItemTxtStyle}>
                          {item.title}
                        </Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
              <View
                className={
                  formEr?.phone
                    ? "w-[48%] bg-inkDark rounded-lg p-4 flex-row justify-between border border-red-800 "
                    : "w-[48%] bg-inkDark rounded-lg p-4 flex-row justify-between"
                }
              >
                <TextInput
                  className="text-white w-full "
                  placeholder="Telefono"
                  placeholderTextColor="#969696"
                  onChange={(e) =>
                    setDatos({ ...datos, phone: e.nativeEvent.text })
                  }
                />
              </View>
            </View>

            <TouchableOpacity onPress={showDatePicker}>
              <View
                className={
                  formEr?.birthDate
                    ? "bg-inkDark w-full rounded-lg p-4 flex-row items-center justify-between border border-red-800 "
                    : "bg-inkDark w-full rounded-lg p-4 flex-row items-center justify-between"
                }
              >
                {!fecha ? (
                  <Text className="text-lightgray">Fecha de nacimiento</Text>
                ) : (
                  <Text className="text-lightgray">
                    {moment(fecha).format("DD/MM/YYYY")}{" "}
                  </Text>
                )}

                <MaterialIcons name="calendar-today" color="#fff" size={16} />
                <DateTimePickerModal
                  className=" bg-black"
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  isDarkModeEnabled={true}
                />
              </View>
            </TouchableOpacity>
            <View className="flex flex-row justify-end ">
              <TouchableOpacity onPress={register}>
                <Text className=" px-7 py-3  items-center rounded-[32px] bg-PrimaryBase text-white">
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}

function defaultValue() {
  return {
    firstNames: "",
    lastNames: "",
    gender: "",
    phone: "",
    birthDate: "",
  };
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#929497",
  },
  dropdownButtonArrowStyle: {
    fontSize: 25,
  },
  dropdownButtonIconStyle: {
    fontSize: 25,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#929497",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
