import React, {useState} from 'react';
import {Text,StyleSheet,View,TextInput,Button,TouchableHighlight,Alert,ScrollView,Dimensions} from 'react-native';
import shortid from 'react-id-generator';
import Colors from '../src/utils/Colors';


const Formulario = ({calculoISR,setCalculoISR,guardarMostrarForm,guardarCalculoISRStorage}) =>{
    //Variables

    const [nombre,guardarNombre] = useState('');
    const [apellido,guardarApellido] = useState('');
    const [sueldo,guardarSueldo] = useState('');
    let [sueldoNeto, guardarSueldoNeto] = useState('');
    let [renta, guardarRenta] = useState('');

     // Función para validar letras
  const validarLetras = (texto) => {
    return /^[A-Za-z\s]+$/.test(texto);
  };

  // Función para validar números
  const validarNumeros = (texto) => {
    return /^\d+$/.test(texto);
  };

  // Función para manejar cambios en el campo Nombre
  const handleNombreChange = (texto) => {
    if (validarLetras(texto)) {
      guardarNombre(texto);
    }
  };

  // Función para manejar cambios en el campo Apellido
  const handleApellidoChange = (texto) => {
    if (validarLetras(texto)) {
      guardarApellido(texto);
    }
  };

  // Función para manejar cambios en el campo Sueldo Mensual
  const handleSueldoChange = (texto) => {
    if (validarNumeros(texto)) {
        guardarSueldo(texto);
    }
  };

    //crear planilla
    const crearCalculosISR = () =>{
        if (
            nombre.trim().length === 0 ||
            apellido.trim().length === 0 ||
            sueldo.trim().length === 0 
        ) {
             
             mostrarAlerta();
             return;
        } else {
            calcularSueldoNeto();
        }
    
        const calculo = {nombre,apellido,sueldo,renta,sueldoNeto};
        calculo.id = shortid();
    
        const calculoISRNuevo = [...calculoISR,calculo];
        setCalculoISR(calculoISRNuevo);
    
        guardarCalculoISRStorage(JSON.stringify(calculoISRNuevo));
    
        guardarMostrarForm(false);
        guardarNombre('');
        guardarApellido('');
        guardarSueldo('');
        guardarSueldoNeto('');
        guardarRenta('');
    }
    const calcularSueldoNeto = () =>{
      renta = 0;

        if (sueldo < 1000) {
          renta = sueldo* 0.07;
            sueldoNeto = (sueldo-renta).toFixed(2);
            
        } else if (sueldo >= 1000 && sueldo <=2500) {
          renta = sueldo*0.18;
            sueldoNeto = (sueldo-renta).toFixed(2);

        } else if (sueldo > 2500) {
          renta = sueldo*0.25;
            sueldoNeto = (sueldo-renta).toFixed(2);
                 
        }else{

        }

        guardarRenta(renta)
        guardarSueldoNeto(sueldoNeto)
        
         
    }

    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return(
        <>
        <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNombreChange}
          value={nombre}
        />
      </View>
      <View>
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleApellidoChange}
          value={apellido}
        />
      </View>
      <View>
        <Text style={styles.label}>Sueldo:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleSueldoChange}
          value={sueldo}
        />
      </View>
      <View>
      <TouchableHighlight
        onPress={() => {
        crearCalculosISR();
        }}
        style={styles.btnSubmit}
      >
        <Text style={styles.textoSubmit}>Realizar Calculo</Text>
      </TouchableHighlight>
      </View>
    </ScrollView>
        
        </>
    )


}
const styles = StyleSheet.create({
    formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
    },
    label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
    },
    input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
    },
    btnSubmit: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10
    },
    textoSubmit: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
    }
    })

    export default Formulario;