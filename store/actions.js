import AsyncStorage from "@react-native-async-storage/async-storage";
export const Init = () => {
    return async dispatch => {
      let token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log('token fetched');
        dispatch({
          type: 'LOGIN',
          payload: token,
        })
      }
    }
  }
export const Loginn=(email,pass)=>{
    return async dispatch=>{
        let token=null;
        if(email!==''&&pass!==''){
            token=email+pass;
            await AsyncStorage.setItem('token',token);
            console.log('token stored');
        }
     
        dispatch({
            type:'LOGIN',
            payload:token,
        })

    }
    
}
export const Logoutt=()=>{
    
    return ({
        type:'LOGOUT',
        //AsyncStorage.clear('')
        
    }
    )
}