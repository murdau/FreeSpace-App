import haversine from 'haversine';
import { create } from 'lodash';
import React, {Component} from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import {Entypo} from 'react-native-vector-icons';
import Geocoder from 'react-native-geocoding';
import Input from './input';


const LATITUDE = 43.893825// Uottawa lat and longitude: 45.424721;
const LONGITUDE = -79.013244//-75.695000;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

Geocoder.init("AIzaSyB-psvglsE4y4PYkKSvVYFhELMeOBvwKkk", {language : "en"});
Geocoder.from(45.424721,-75.695000)
            .then(JSON => {
                var addressComponent =
                JSON.results[0].address_components[0];
                        console.log(addressComponent);
            })
            .catch(error=>console.warn(error));


const styles=StyleSheet.create({
    distanceContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    }
})

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
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                const { latitude, longitude } = position.coords;
                const { routeCoordinates, distancedTravelled } = this.state;
                const newCoordinate = { latitude, longitude };
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    //error:null
                    //latitude, 
                    //longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distancedTravelled: distancedTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });
            },
            error => this.setState({ error: error.message }),
            {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000}
        );
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
            >
                <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5}/>
            </MapView>
            <View style={styles.distanceContainer}>
            <Text style={{marginLeft:138}}>{parseFloat(this.state.distancedTravelled).toFixed(2)} km travelled</Text>
            </View>
            </View>
        );
    }
}
//<Polyline coordinates={this.getMapRegion()} strokeWidth={2}/>
/*<Marker coordinate={this.getMapRegion()}>
                    <Image source={require('./personICON.jpg')} style={{ height: 25, width: 25}}/>
                </Marker>*/