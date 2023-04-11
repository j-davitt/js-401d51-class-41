import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [{ x1, y1, z1 }, setData1] = useState({
    x1: 0,
    y1: 0,
    z1: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const [chartX, setChartX] = useState(['x']);
  const [chartY, setChartY] = useState([0]);

  // let chartX = ['x'];
  // let chartY = [0];

  // const chartInterval = () => {
  //   setInterval(() => {
  //     chartX.push('x');
  //     chartY.push(x);
  //     console.log('chartX: ', chartX);
  //     console.log('chartY: ', chartY);
  //   }, 600);
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
    if (y > y1) {
      setData1({ y1: y, });
      console.log('y1: ', y1)
    }
  }, [{ y }]);

  useEffect(() => {
    if (x > x1) {
      setData1({ x1: x, });
      console.log('x1: ', x1)
      chartX.push('x');
      chartY.push(x);
      // console.log('chartX: ', chartX);
      // console.log('chartY: ', chartY);
    }
  }, [{ x }]);

  useEffect(() => {
    if (z > z1) {
      setData1({ z1: z, });
      console.log('z1: ', z1)
    }
  }, [{ z }]);


  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>Throw your phone and get a high score!</Text>
      <Text style={styles.text}>HIGHSCORE: {x1}</Text>

      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      {/* <Button title="Start" onPress={startChart} />
      <Button title="Stop" onPress={stopChart} /> */}
      <MyLineChart
        chartX={chartX}
        chartY={chartY}
      />

    </View>
  );
}

const MyLineChart = (props) => {

  return (
    <>
      <Text style={styles.text}>Line Chart</Text>
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
