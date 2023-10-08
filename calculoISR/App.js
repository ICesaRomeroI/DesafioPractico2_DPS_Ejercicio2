import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import Formulario from "./components/Formulario";
import Planilla from "./components/Planilla";
import Colors from "./src/utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [calculosISR, setCalculosISR] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    obtenerCalculoISRStorage = async () => {
      try {
        const calculoStorage = await AsyncStorage.getItem("calculo");
        if (calculoStorage) {
          setCalculosISR(JSON.parse(calculoStorage));
        }
      } catch (error) {
        console.log(error);
      }
      obtenerCalculoISRStorage();
    };
  }, []);

  const eliminarEmpleado = (id) => {
    const calculosFiltrados = calculosISR.filter(
      (calculo) => calculo.id !== id
    );
    setCalculosISR(calculosFiltrados);
    guardarCalculoISRStorage(JSON.stringify(calculosFiltrados));
  };

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  const guardarCalculoISRStorage = async (calculoJSON) => {
    try {
      await AsyncStorage.setItem("calculo", calculoJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
        <View style={styles.contenedor}>
          
          <Text style={styles.titulo}>
            Cálculo del Impuesto Sobre la Renta (ISR){" "}
          </Text>
          <Image source={require("./img/logo.png")} style={styles.logo} />
          <View>
            <TouchableHighlight
              onPress={() => mostrarFormulario()}
              style={styles.btnMostrarForm}
            >
              <Text style={styles.textoMostrarForm}>
                {mostrarForm ? "Cancelar" : "Agregar Nuevo Cálculo"}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo}>Realizar Nuevo Cálculo</Text>
                <Formulario
                  calculoISR={calculosISR}
                  setCalculoISR={setCalculosISR}
                  guardarMostrarForm={guardarMostrarForm}
                  guardarCalculoISRStorage={guardarCalculoISRStorage}
                />
              </>
            ) : (
              <>
                <View style={styles.tituloContainer}>
                  <Text style={styles.tituloCont}>
                    {calculosISR.length > 0
                      ? "Administrar Cálculos Previos"
                      : "No hay ningun cálculo, agregue uno nuevo"}
                  </Text>
                </View>
                <FlatList
                  style={styles.listado}
                  data={calculosISR}
                  renderItem={({ item }) => (
                    <Planilla item={item} eliminarEmpleado={eliminarEmpleado} />
                  )}
                />
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1,
  },
  titulo: {
    color: "#FFF",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tituloCont: {
    color: "#FFF",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  tituloContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 50,  // Ajusta el ancho según tus necesidades
    height: 50, // Ajusta la altura según tus necesidades
    //resizeMode: 'contain', // Ajusta la forma en que la imagen se ajusta en el contenedor
    marginTop: 50,
    marginLeft: 11,
    position: "absolute",
  },
});
export default App;
