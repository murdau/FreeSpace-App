import haversine from 'haversine';
//import { create } from 'lodash';
import React, {Component} from 'react';
import { Image, Platform, StyleSheet, Text, View, PermissionsAndroid, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
//import {Entypo} from 'react-native-vector-icons';
import Geocoder from 'react-native-geocoding';
//import Input from './input';
import Geolocation from 'react-native-geolocation-service';
import Axios from 'axios';
import polyline from '@mapbox/polyline';

const LATITUDE = 43.893825// Uottawa lat and longitude: 45.424721;
const LONGITUDE = -79.013244//-75.695000;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

Geocoder.init("AIzaSyAg7gj3AjYJnwW2GGIPWCn08ptYsqiROzg", {language : "en"});
/*
Geocoder.from(45.424721,-75.695000)
            .then(JSON => {
                var addressComponent =
                JSON.results[0].address_components[0];
                console.log(addressComponent);
            })
            .catch(error=>console.warn(error));
*/

const styles=StyleSheet.create({
    distanceContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    }
})

/*
navigator.geolocation.watchPosition(

    position => {
        console.log(position);
    },
    error => console.log(error),
    {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
    }
);
*/


export default
class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            latitude: LATITUDE,
            longitude: LONGITUDE,
            error: null,
            routeCoordinates: [],
            distancedTravelled: 0,
            valueprevLatLng: {}
        };
    }
    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                //console.log("VCN " +JSON.stringify(position));
                const { latitude, longitude } = position.coords;
    
                const { routeCoordinates, distancedTravelled } = this.state;
                const newCoordinate = { latitude, longitude };
                
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    //distancedTravelled: distancedTravelled + this.calcDistance(newCoordinate),
                    //prevLatLng: newCoordinate
                });
                if (this.props.dest != undefined) {
                    this.requestDirection(this.props.dest.Dest);
                }
            },
            error => {
                console.log("location err " +error);
                this.setState({ error: error.message });
            },
            {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000}
        );
    }

    onMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        console.log("location press " +latitude+','+longitude);
        this.requestDirection(latitude+','+longitude);
    }

    requestDirection = (dest) => {
        Axios.get('https://maps.googleapis.com/maps/api/directions/json?'
        +'origin='+this.state.latitude+','+this.state.longitude
        +'&destination='+ dest
        +'&key=AIzaSyAg7gj3AjYJnwW2GGIPWCn08ptYsqiROzg')
        .then( (res) => {
            //console.log(res.data.routes[0].legs);
            let lines = polyline.decode(res.data.routes[0].overview_polyline.points);
            let lineCoords = lines.map((p) => ({latitude: p[0],longitude: p[1]}));
            this.setState({routeCoordinates: lineCoords});

            if (res.data.routes[0].legs.length > 0) {
                var inst = '';
                res.data.routes[0].legs[0].steps.forEach(step => {
                    inst += step.html_instructions + '\n';
                });

                Alert.alert('Navigation instruction',inst.replace(/<\/?[^>]+(>|$)/g, ""));
            }
            
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    componentDidMount(){
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission required",
                        message:
                            "Please accept to continue",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                    );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("location accepted");
                    this.getCurrentPosition();
                } else {
                    console.log("location denied");
                }
            } catch (err) {
                console.warn(err);
            }
        };
        requestLocationPermission();
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };
    render(){
        return(
            <View style={{flex:1}}>
                <MapView
                    style={{flex:1}}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    region={this.getMapRegion()}
                    onPress={this.onMapPress}
                >
                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5}/>
                </MapView>

                {/*
                <View style={styles.distanceContainer}>
                    <Text style={{marginLeft:138}}>{parseFloat(this.state.distancedTravelled).toFixed(2)} km travelled</Text>
                </View>
                */}
                
            </View>
        );
    }
}
//<Polyline coordinates={this.getMapRegion()} strokeWidth={2}/>
/*<Marker coordinate={this.getMapRegion()}>
                    <Image source={require('./personICON.jpg')} style={{ height: 25, width: 25}}/>
                </Marker>*/