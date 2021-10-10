import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostScreen from './PostScreen'
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
   "Edwardian Script ITC": require("../assets/fonts/ITCEDSCR.TTF"),
    "Felix Titling": require("../assets/fonts/felixti.ttf"),
        "Times New Roman": require("../times-new-roman.ttf"),
        "Papyrus" : require("../papyrus.ttf")
};

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
            

          <TouchableOpacity style={styles.container} onPress={()=>
           this.props.navigation.navigate("PostScreen", {story:this.props.story})
        }>
    
        
        <View style={styles.cardContainer}>
        <Text style={styles.storyTitleText}> {this.props.story.author} </Text>
        <View>
         <Image 
          source={require("../assets/image_1.jpg")}
          style={styles.storyImage}
         />
         
         </View>
           <Text style={styles.storycaptionText}> {this.props.story.caption} </Text>
         <View style={styles.titleContainer}>
          
        
         </View>
         <View style={styles.actionContainer}>
          <View style={styles.likeButton}>
            <Ionicons
           name = {"heart"}
           color="white"
           size = {RFValue(30)}
           />
           <Text style={styles.likeText}>  12K </Text>
        </View>
        </View>
        </View>

        
    </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
         margin:10,

  },
        
  storyImage:{
         margin:1,
 
   height:RFValue(250),
   resizeMode:"contain",
   width:299,
   alignSelf:"center"
  },
  storyTitleText:{
     height:RFValue(55),
     fontFamily:"Times New Roman",
    textAlign:"center",
     color:"white",
     fontSize:RFValue(35),
         margin:10,
  },
   storycaptionText:{
     height:RFValue(55),
     fontFamily:"Papyrus",
    textAlign:"center",
     color:"white",
     fontSize:RFValue(40),
         margin:10,

     
  },

  titleContainer:{
    justifyContent:"center",
        paddingLeft:RFValue(20),
         margin:5,

  },
  actionContainer:{
     justifyContent:"center",
       padding:RFValue(15),
       alignItems:"center",
         margin:5,

  },
  likeText:{
    color:"white",
      fontSize:RFValue(20),
      marginLeft:RFValue(10),

  },
  likeButton:{
    justifyContent:"center",
     backgroundColor:"#eb3948",
       alignItems:"center",
       borderRadius:RFValue(30),
       height:RFValue(30),
       width:RFValue(100),
       flexDirection:'row',

  },
  cardContainer:{
    backgroundColor:"#2f345d",
    borderRadius:RFValue(60),
    marginTop:30,
    width:350,
    margin:5
    
  }

});