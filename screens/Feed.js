import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard' ;

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import firebase from "firebase";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
   "Edwardian Script ITC": require("../assets/fonts/ITCEDSCR.TTF"),
    "Felix Titling": require("../assets/fonts/felixti.ttf"),
    "French Script MT": require("../assets/fonts/FrenchScriptMT.ttf")
};

let posts = require('./temp_posts.json');

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:false,
      posts:[]
    };
  }
   async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchpost();
    this.fetchUser();
  }
 async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value",  snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({
      light_theme: theme === "light" 
     
    });
      });
   
  }
 fetchpost = () => {
   firebase.database().ref('/posts/')
   .on("value",(snapShot ) => {
     let posts= []
     if (snapShot.val()){
       Object.keys(snapShot.val()).forEach(function (key){
             posts.push({
               key:key,
                      value:snapShot.val()[key]
                    
             })
       })}
       
       this.setState({posts:posts})
       this.props.setUpdateToFalse()
     } ,function(errorObject){
       console.log("The Read Failed" + errorObject.code)
     }
     
   
   )
 }
  renderItem = ({ item: story }) => {
    return <PostCard story={story} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {

    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={this.state.light_theme
        ?styles.lightContainer:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/daily_pictures.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>  Spectagram App</Text>
            </View>
          </View>
        
            {! this.state.posts[0]?(
        <View style={styles.noStory}>
         <Text style={this.state.light_theme?styles.noStoryTextLight:styles.noStoryText}> No posts Available</Text>
        </View>
      ):(
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.posts}
              renderItem={this.renderItem}
            />
          </View>)}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
    lightContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    marginLeft:-20,
    color: 'white',
    fontSize: RFValue(32),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
 
    marginLeft:-20,
    color: 'black',
    fontSize: RFValue(32),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
    noStory:{
    flex:0.85,
    justifyContent:"center",
    alignItems:"center"
  },
  noStoryTextLight:{
   
   fontSize:RFValue(20),
   fontFamily:"Bubblegum-Sans"
  },
   noStoryText:{
   color:"white",
   fontSize:RFValue(20),
   fontFamily:"Bubblegum-Sans"
  }
});
