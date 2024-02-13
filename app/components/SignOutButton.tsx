import React from 'react';
import { useAppStore } from '../state';
import { Button } from "react-native"


const SignOutButton = () => {
    const signOut = useAppStore((state) => state.signOut)

    return (
        <Button title="Sign Out" onPress={signOut}/>
    )
}

export default SignOutButton;