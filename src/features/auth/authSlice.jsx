import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from '../../firebase/firebase.config';

const initialState = {
    user: { email: "", role: "", },
    isLoading: true,
    isError: false,
    error: ""
}

// ------------Create User with Email & Password--------------
export const createUser = createAsyncThunk("auth/createUser", async (user) => {
    const data = await createUserWithEmailAndPassword(auth, user.email, user.password);

    return data.user.email;
});

// ------------get User from backend--------------
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const res = await fetch(`http://localhost:5000/user/${email}`)
    const data = await res.json();
    if (data.status) {
        return data;
    }
    return email;
});

// ------------Login User with Email & Password--------------
export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
    const data = await signInWithEmailAndPassword(auth, user.email, user.password);

    return data.user.email;
});

// ------------Google Login--------------
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleProvider);

    return data.user.email;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user.email = "";
        },
        setUser: (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = action.payload;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";

                if (action.payload.status) {
                    state.user = action.payload.data;
                } else {
                    state.user.email = action.payload;
                }

            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.user.email = "";
            })
    }

})

export const { logout, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer