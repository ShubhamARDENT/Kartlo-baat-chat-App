
import { createSlice , PayloadAction} from "@reduxjs/toolkit";


 interface userState {
    senderId: number | null,
    senderUsername:string | null
    userMsg:[],
    GroupName:string | null
    userConversation:number | string
}

const initialState : userState ={
    senderId:null,
    senderUsername:null,
    userMsg: [], 
    userConversation: 0, 
    GroupName:null, 
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
        },
        setGroupName:(state,action) => {
          state.GroupName = action.payload
        }
      },
})


export const { setSenderId , clearSenderId ,setUserMessage ,setUserConversation ,setSenderName , setGroupName } = userSlice.actions;
export default userSlice.reducer;
