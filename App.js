import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';
import { NativeBaseProvider, Box, Center, Button } from 'native-base';
import ProgressBar from './Components/ProgressBar';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [dataX, setDataX] = useState(0);
  const [dataY, setDataY] = useState(0);
  const [dataZ, setDataZ] = useState(0);
  const [dataTotal, setDataTotal] = useState(0);


  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const [chartX, setChartX] = useState(['x']);
  const [chartY, setChartY] = useState([0]);


  const resetData = () => {
    setDataX(0);
    setDataY(0);
    setDataZ(0);
  };

  // const chartInterval = () => {
  //   setInterval(() => {
  //     setDataY(0);
  //     setDataX(0);
  //     setDataZ(0);
  //   }, 5000);
  // };

  // const startChart = () => {
  //   chartInterval();
  // };

  // const stopChart = () => {
  //   clearInterval(chartInterval);
  // };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(setData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };


  useEffect(() => {
    if (y > dataY) {
      console.log('y1: ', y)
      setDataY(y);
      setDataTotal(dataTotal + (y/1.2));
    }
  }, [{ y }]);


  useEffect(() => {
    if (x > dataX) {
      setDataX(x);
      console.log('x1: ', x)
      chartX.push('x');
      chartY.push(x);
      setDataTotal(dataTotal + (x/1.2));
    }
  }, [{ x }]);

  useEffect(() => {
    if (z > dataZ) {
      setDataZ(z);
      console.log('z1: ', z)
      setDataTotal(dataTotal + (z/1.2));
    }
  }, [{ z }]);


  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <NativeBaseProvider>

      <Box
        bg={dataTotal > 70 ? "indigo.300" : "muted.400"}
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
     
        <Text style={styles.text}>Throw your phone and get a high score!</Text>
        <Text style={styles.text}>X: {dataX.toFixed(5)}</Text>
        <Text style={styles.text}>Y: {dataY.toFixed(5)}</Text>
        <Text style={styles.text}>Z: {dataZ.toFixed(5)}</Text>

        {/* <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
    <Text style={styles.text}>z: {z}</Text> */}
        <Button colorScheme={dataTotal > 70 ? "secondary" : "primary"} onPress={resetData}>Reset Highscores</Button>
      {/* <Button title="Stop" onPress={stopChart} /> */}
        <MyLineChart
          chartX={chartX}
          chartY={chartY}
          />
        <ProgressBar
          dataTotal={dataTotal}
          />

         
      </Box>
    </NativeBaseProvider>
  );
}

const MyLineChart = (props) => {

  return (
    <>
      <Text style={styles.text}>X Axis Chart</Text>
      <LineChart
        data={{
          labels: props.chartX,
          datasets: [
            {
              data: props.chartY,
              strokeWidth: 2,
            },
          ],
        }}
        width={325}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
