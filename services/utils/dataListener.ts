import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface addListenerDataProps {
    setData: any
    dataName: string
}

export const addListenerData = ({ setData, dataName }: addListenerDataProps) => {
    const userUid: any = auth()?.currentUser?.uid
    firestore()
        .collection(userUid)
        .doc(dataName)
        .onSnapshot(documentSnapshot => {
            setData(documentSnapshot.data())
        });
}
