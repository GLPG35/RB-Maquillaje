import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { authChanged, upUserData } from '../firebase/client'

const useUser = () => {
    const [user, setUser] = useState(undefined)
    const router = useRouter()

    useEffect(() => {
        authChanged(setUser)
    }, [])

    useEffect(() => {
        user === null && router.replace('/login')
    }, [user])

    return user
}

export default useUser