import { URL_USER } from "@env";
import Toast from 'react-native-toast-message';


////login // 


export async function loginApi(data) {
  try {
    const url = `${URL_USER}/users/login`;
    console.log(url, data)
     const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    console.log(response.status)
   if (response.status === 200 ){
    const result = await response.json();
     return result;
    } else{
      Toast.show({
        type: 'error',
        text2: 'Email o clave invalida'
      });

   } 
  } catch (error) {
    console.log(error);
  }
}
