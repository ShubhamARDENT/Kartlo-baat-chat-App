
import { createSlice , PayloadAction} from "@reduxjs/toolkit";


interface userState {
    senderId: number | null
    userMsg:[]
}

const initialState : userState={
    senderId:null,
    userMessage:[]
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
        }
      },
})


export const { setSenderId , clearSenderId ,setUserMessage } = userSlice.actions;
export default userSlice.reducer;
