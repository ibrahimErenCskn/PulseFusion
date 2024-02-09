import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
    webClientId: '360072007112-75plrar7svmvakafk4naun2niojhlaq9.apps.googleusercontent.com',
});

interface UserProps {
    email: string
    password: string
    username: string
}

export const loginHandle: any = createAsyncThunk('user/login', async ({ email, password }: UserProps) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)
        return auth()?.currentUser
    } catch (err) {
        console.log(err)
        throw err
    }
})
export const googleLoginAndRegister: any = createAsyncThunk('user/googlelogin', async () => {
    try {
        await GoogleSignin?.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        return auth()?.currentUser
    } catch (err) {
        console.log(err)
        throw err
    }
})

export const registerHandle: any = createAsyncThunk('user/register', async ({ email, password, username }: UserProps) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password)
        await auth().currentUser?.updateProfile({
            displayName: username
        })
        return auth()?.currentUser
    } catch (err) {
        console.log(err)
        throw err
    }
})

export const logaut: any = createAsyncThunk('user/logaut', async () => {
    try {
        await GoogleSignin?.signOut();
        await auth().signOut()
        return auth()?.currentUser
    } catch (error) {
        console.error(error);
    }
})

export interface AuthSliceInitialProps {
    data: object
    isLoading: boolean
}

const initialState: AuthSliceInitialProps = {
    data: {},
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginHandle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginHandle.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                console.log("Giriş Yapıldı Email ve Şifre ile")
            })
            .addCase(loginHandle.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(googleLoginAndRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(googleLoginAndRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                console.log("Giriş Yapıldı Google ile")
            })
            .addCase(googleLoginAndRegister.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(registerHandle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerHandle.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                console.log("Kayıt olundu email ve şifre ile")
            })
            .addCase(registerHandle.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(logaut.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logaut.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                console.log("Çıkış Yapıldı")
            })
            .addCase(logaut.rejected, (state) => {
                state.isLoading = false
            })
    }
})

// Action creators are generated for each case reducer function
export const { setData } = authSlice.actions

export default authSlice.reducer