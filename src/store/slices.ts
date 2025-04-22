
import { createSlice , PayloadAction} from "@reduxjs/toolkit";


interface userState {
    senderId: number | null,
    userMsg:[],
    userConvoId:number | string
}

const initialState : userState ={
    senderId:null,
    userMsg: [], 
    userConvoId: 0   
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
        setUserConvoId:(state,action)=>{
          state.userConvoId = action.payload
        }
      },
})


export const { setSenderId , clearSenderId ,setUserMessage ,setUserConvoId } = userSlice.actions;
export default userSlice.reducer;
