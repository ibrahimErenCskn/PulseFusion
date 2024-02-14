import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


interface UserProps {
    uid: string
}

export const checkUserData: any = createAsyncThunk('user/checkuserdata', async ({ uid }: UserProps) => {
    try {
        const userRef = firestore().collection(uid).doc('userData');
        const userDoc = await userRef.get();
        if (userDoc.exists) return true
        else return false
    } catch (err) {
        console.log(err)
        throw err
    }
})

interface WriteDataProps {
    data: object
    writeType: any
    dataName: string
}

export const writeDataInUsers: any = createAsyncThunk('user/writedatainusers', async ({ data, writeType, dataName }: WriteDataProps) => {
    if (writeType === "update") {
        try {
            const userUid: any = auth()?.currentUser?.uid
            firestore().collection(userUid).doc(dataName).update(data);
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    if (writeType === "set") {
        try {
            const userUid: any = auth()?.currentUser?.uid
            firestore().collection(userUid).doc(dataName).set(data);
        } catch (err) {
            console.log(err)
            throw err
        }
    }
})

export interface FirestoreSliceInitialProps {
    data: object
    isLoading: boolean
}

const initialState: FirestoreSliceInitialProps = {
    data: {},
    isLoading: false
}

export const firestoreSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(checkUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkUserData.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(checkUserData.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(writeDataInUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(writeDataInUsers.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(writeDataInUsers.rejected, (state) => {
                state.isLoading = false
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = firestoreSlice.actions

export default firestoreSlice.reducer