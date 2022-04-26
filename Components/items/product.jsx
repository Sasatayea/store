import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function product() {
    getDocs(collection(db, "products")).then(
        querySnapshot=>
    querySnapshot.forEach((doc) => {
      console.log(doc.id,doc.data());
    })
    );
  return (
    <View style={styles.content}>
      
      <View style={styles.infoView}><TouchableOpacity 
      style={styles.info} onPress={() => alert(text)}>
        
        </TouchableOpacity>

        
        </View>
        <Text></Text>
        <TouchableOpacity 
      style={styles.select}>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    
    marginTop:24,
    padding:20,
    paddingHorizontal:20,
    backgroundColor: "#FFFFFF",
    flexDirection:"row",
    
  },
  image: {
    width: 50,
    height: 50,
  },
  infoView:{
    flexDirection:"row",
    alignItems:"center",
    
  },
  info: {
    width:20,
    height:20,
    backgroundColor:"#55BCF6",
    marginRight:10,
    
  },

  select:{
    width:15,
    height:15,
    borderWidth:2,
    borderRadius:10,
    borderColor:"#55BCF6",
    marginLeft:230,
    
  },
});
