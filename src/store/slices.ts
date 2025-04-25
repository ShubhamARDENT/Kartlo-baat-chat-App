
import { createSlice , PayloadAction} from "@reduxjs/toolkit";


 interface userState {
    senderId: number | null,
    senderUsername:string | null
    userMsg:[],
    userConversation:number | string
}

const initialState : userState ={
    senderId:null,
    senderUsername:null,
    userMsg: [], 
    userConversation: 0   
}

const userSlice = createSlice({
    name:"loggedInUser",
      initialState,
      reducers: {
        setSenderId: (state, action: PayloadAction<number>) => {
          state.senderId = action.payload;
        },
        clearSenderId: (state) => {
          state.senderId = null;
        },
        setUserMessage:(state,action)=>{
          state.userMsg = action.payload
        },
        setSenderName:(state,action)=>{
          state.senderUsername = action.payload
        },
        setUserConversation:(state,action)=>{
          state.userConversation = action.payload
        }
      },
})


export const { setSenderId , clearSenderId ,setUserMessage ,setUserConversation ,setSenderName } = userSlice.actions;
export default userSlice.reducer;
