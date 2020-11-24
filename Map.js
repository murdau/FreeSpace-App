import React, { Component } from 'react';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
import { render } from 'react-dom';
import MapViewDirections from 'react-native-maps-directions';

const screen = Dimensions.get('window');
const styles = StyleSheet.create ({
    container: {
        height: screen.height*0.66,
        width: screen.height*0.565,
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
       ...StyleSheet.absoluteFillObject
    },
});

const GOOGLE_MAPS_APIKEY='AIzaSyC-N_ouuRrHACgLYfB0JdZtdLodYy0Esuk';
const origin={latitude: 45.424721, longitude: -75.695000};
const destination={latitude: 43.894130, longitude: -79.012850}

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region:{
                latitude: 45.424721,
                    longitude: -75.695000,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
            },
            marker: {
                latlng:{
                    latitude: null,
                    longitude: null,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            }
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            /*(position) => {alert("value: " + position)},*/
            (error) => { console.log(error)},
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 10000
            }
         )
        }
        /*this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        },(error) =>console.log(error));
    }
    onRegionChange(region, lastLat, lastLong ) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }*/
   /* componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID);
    }*/
       /* navigator.geolocation.getCurrentPosition(
           /*(position) => {alert("value: " + position)},
           (error) => { console.log(error)},
           {
               enableHighAccuracy: true,
               timeout: 20000,
               maximumAge: 10000
           }
        )
        });
    }*/
    onMapPress(e) {
        alert("Coordinates: " + JSON.stringify(e.nativeEvent.coordinate))
            this.setState({
                marker: [{coordinate: e.nativeEvent.coordinate}]
            })
    } 
    render(){
        return(
            <View style={styles.container}>
                <MapView style={styles.map}
                /* region={{
                    latitude: 45.424721,
                    longitude: -75.695000,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}*/
                ref="map"
                region={this.state.mapRegion}
               /* onRegionChange={this.onRegionChange.bind(this)}
                provider={this.props.provider}*/
                onPress={this.onMapPress.bind(this)}
                provider= {PROVIDER_DEFAULT}
                showsUserLocation={true}
                followsUserLocation={true}
                showsTraffic={true}
                showsIndoors={true}
                zoomEnabled={true} 
                pitchEnabled={true}
                >
                    <Marker
                    coordinate={{latitude: 45.4222, longitude: -75.6824}}
                    title="University of Ottawa"
                    description="GNG2101"/>
                </MapView>
            </View>
        )
    }
}
/*<MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    />*/ 