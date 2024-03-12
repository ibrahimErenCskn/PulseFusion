import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userUid: any = auth()?.currentUser?.uid

interface addListenerDataProps {
    setData: any
    dataName: string
}

export const addListenerData = ({ setData, dataName }: addListenerDataProps) => {
    firestore()
        .collection(userUid)
        .doc(dataName)
        .onSnapshot(documentSnapshot => {
            setData(documentSnapshot.data())
        });
}
