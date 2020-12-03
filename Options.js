import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, ScrollView, Linking, Alert, Dimensions, 
    Platform, PermissionsAndroid, NativeModules, NativeEventEmitter} from 'react-native';
//import { Entypo } from '@expo/vector-icons';
import colors from './colors';
import Map from './mapTest';
import { Button } from './Button';
import Navigation from './Navigation';

import AndroidOpenSettings from 'react-native-android-open-settings'

import BleManager from 'react-native-ble-manager';
import { stringToBytes, bytesToString } from "convert-string";


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const deviceName = 'SH-HC-08';
const deviceId = '2C:AB:33:DB:D5:F0';
const serviceId = '0000ffe0-0000-1000-8000-00805f9b34fb';
const charId = '0000ffe1-0000-1000-8000-00805f9b34fb';

const screen = Dimensions.get('window');

//.catch prevents malicious and zipped URLs from being linked
const openURL = (URL) => {
    return Linking.openURL(URL).catch(() =>{
        Alert.alert('Sorry, something went wrong.', 'please try again later.');
    });
}

const styles = StyleSheet.create({
container: {
    backgroundColor: colors.blue,
    flex: 1
},
row: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},
text: {
    flex: 1,
    textAlign:"center",
    fontSize: 16,
    color: colors.white
},
separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20
},
map: {
    height:screen.height*0.4,
    width:screen.width*0.4,
    position:"relative"
},
backButton: {
    position:'absolute',
    left:0,
    right:80,
    top:0,
    bottom:0,
    marginLeft:15,
    marginTop:22,
}
});

export default  class Options extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isBLE: false,
            isConnected:false,
            deviceId: ''
        }
    }

    render(){
    return(
        <View style={styles.container}>
        <SafeAreaView style={{flex: 1 }}>
                <TouchableOpacity style={styles.row}>
                <Text style={styles.text} onPress={this.onBLEPress} >Bluetooth</Text> 
                {/*<Entypo name="chevron-right" size={20} color={colors.white} onPress={() => alert("hi")}/>*/}
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row}>
                <Text onPress={this.onSettings} style={styles.text}>Settings</Text>
                {/*<Entypo name="chevron-right" size={20} color={colors.white} onPress={() => openURL('app-settings://')}/>*/}
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.row}>
                <Text onPress={() => openURL('https://www.google.ca/maps')} style={styles.text}>Navigation</Text>
                {/*<Entypo name="export" size={20} color={colors.white} onPress={() => openURL('https://www.google.ca/maps')}/>*/}
            </TouchableOpacity>

            <View style={styles.separator} />
            <Map style={styles.map} dest={this.props.route.params.dest}/>
        </SafeAreaView>
        </View>
    )
    }

    onSettings = () => {
        AndroidOpenSettings.generalSettings();
    }

    onBLEPress = () => {
        this.startBLE();
    }

    startBLE = () => {
        BleManager.start({ showAlert: true }).then(() => {
            console.log("BLE Module initialized");
        }).then(() => {
            BleManager.scan([], 3, true).then((results) => {
                console.log('Scanning... ');
                //this.setState({scanning:true});
            });
            bleManagerEmitter.addListener("BleManagerDiscoverPeripheral", (args) => {
                console.log('new device ' + args.id + '  ' + args.name);
                if (args.name == deviceName) {
                    this.connectBLEDevice(args.id);
                }
            });
            
        })
    }

    connectBLEDevice = (pID) => {
        BleManager.connect(pID)
        .then(() => {
            console.log("Connected ye");
            Alert.alert('BLE Connect Success!');
            this.setState({
                isConnected: true,
                deviceId: pID
            });
            BleManager.retrieveServices(pID).then(
                (peripheralInfo) => {
                    console.log("Peripheral info:", peripheralInfo);
                    const data = stringToBytes('Helllo');
                    this.writeBLEChar(this.state.deviceId, serviceId, charId, data);
                }
            );
        })
        .catch((error) => {console.log("fail to connect ble " + error);
    });
    }

    readBLEChar = (pId, sId, cId) => {
        BleManager.read(pId,sId,cId)
        .then((res) => {
            console.log("read success");
            Alert.alert('BLE Read Success', bytesToString(res));
        })
        .catch((error) => {
            console.log("fail to read ble " + error);
            Alert.alert('BLE Read Failed');
        });
    }

    writeBLEChar = (pId, sId, cId, data) => {
        BleManager.write(pId,sId,cId,data)
        .then(() => {
            Alert.alert('BLE Write Success');
            console.log("Write success");
        })
        .catch((error) => {console.log("fail to write ble " + error)});
    }

    componentDidMount() {

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                    //this.startBLE();
                } else {
                  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                        //this.startBLE();
                        console.log("User accept");
                    } else {
                        console.log("User refuse");
                    }
                  });
                }
          });
        }
    }

    componentWillUnmount() {
        if (this.state.isConnected) {
            BleManager.disconnect(this.state.deviceId)
            .then(() => {
                console.log("BLE Disconnected");
                this.setState({isConnected: false});
            }).catch((error) => {console.log('fail to disconnect ble' + error);});
        }
    }

}