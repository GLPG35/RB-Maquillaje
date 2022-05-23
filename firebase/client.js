import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc, getFirestore, orderBy, query, Timestamp, getDoc, doc, updateDoc, onSnapshot, where } from 'firebase/firestore'
import crypto from 'crypto'

const firebaseConfig = {
    apiKey: 'AIzaSyCl8SRFsxuKzH_8HuAhmPZUtEDXYPX2ja8',
    authDomain: 'rbmu-27f96.firebaseapp.com',
    projectId: 'rbmu-27f96',
    storageBucket: 'rbmu-27f96.appspot.com',
    messagingSenderId: '333009855638',
    appId: '1:333009855638:web:3da1aee0ddf2b3b7220eb7'
}
  
const app = initializeApp(firebaseConfig);
const storage = getStorage()
const db = getFirestore(app)

export const login = (email, pass) => {
    const auth = getAuth()

    return signInWithEmailAndPassword(auth, email, pass)
}

export const authChanged = (onChange) => {
    const auth = getAuth()

    return onAuthStateChanged(auth, (user) => {
        onChange(user)
    })
}

export const logOut = () => {
    const auth = getAuth()
    
    signOut(auth)
}

export const upUserData = (displayName, photoURL) => {
    const auth = getAuth()

    updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL
    })
}

export const uploadImage = (file, fileName = null) => {
    const name = new Date().getTime().toString() + (Math.random() + 1).toString(36).substring(10)
    const hash = !fileName ? crypto.createHash('md5').update(name, 'utf8').digest('hex') + '.jpg' : fileName

    const refImage = ref(storage, `thumbnails/${hash}`)
    const task = uploadBytesResumable(refImage, file)

    return task
}

export const addPost = ({thumbnail, title, price, description = null}) => {
    return addDoc(collection(db, 'posts'), {
        thumbnail,
        title,
        price,
        description,
        date: Timestamp.fromDate(new Date())
    })
}

export const getPosts = (callback) => {
    return onSnapshot(query(collection(db, 'posts'), where('disabled', '==', false), orderBy('date', 'desc')),
    ({docs}) => {
        const postsData = docs.map((doc) => {
            const posts = doc.data()
            const pid = doc.id

            return {
                ...posts,
                pid
            }
        })

        callback(postsData)
    })
}

export const updatePost = ({pid, eThumb, eTitle, ePrice, eDesc = null}) => {
    return updateDoc(doc(db, 'posts', pid), {
        thumbnail: eThumb,
        title: eTitle,
        price: ePrice,
        description: eDesc
    })
}

export const deletePost = (pid) => {
    return updateDoc(doc(db, 'posts', pid), {
        disabled: true
    })
}

export const getPostFID = (pid) => {
    return getDoc(doc(db, `posts/${pid}`))
    .then((doc) => {
        const post = doc.data()
        const pid = doc.id
        
        return {
            ...post,
            pid
        }
    })
}

