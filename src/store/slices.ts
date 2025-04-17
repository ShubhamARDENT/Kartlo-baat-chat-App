
import { createSlice , PayloadAction} from "@reduxjs/toolkit";


interface userState {
    username:string | null
}

const initialState : userState={
    username:null
}

const userSlice = createSlice({
    name:"loggedInUser",
      initialState,
      reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
          state.username = action.payload;
        },
        clearUsername: (state) => {
          state.username = null;
        },
      },
})

export const { setUsername, clearUsername } = userSlice.actions;
export default userSlice.reducer;