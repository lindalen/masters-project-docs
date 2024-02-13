import { createBox, createText } from "@shopify/restyle";
import React from "react";
import * as AppleAuthentication from 'expo-apple-authentication';
import { Theme } from "../theme";
import AppIcon from "../components/AppIcon";
import { proxyUrl } from "../utils";
import { RequestError, isUser } from "../types";
import { useAppStore } from "../state";


const Box = createBox<Theme>();
const Text = createText<Theme>();

const LoginScreen = () => {
    const setUser = useAppStore((state) => state.setUser)

    return (
    <Box flex={1} flexDirection={"column"} justifyContent={"space-evenly"} backgroundColor="bgPrimary" alignItems={"center"}>
        <Box justifyContent={"center"} alignItems={"center"}>
            <AppIcon fontSize={25} iconSize={48} gapSize={6}/>
        </Box>
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        style={{ width: 200, height: 64 }}
        cornerRadius={5}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ], 
            });

            const response = await fetch(`${proxyUrl}/auth/apple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identityToken: credential.identityToken,
                }),
                });

            const userData = await response.json();

            if (isUser(userData)) {
                setUser(userData)
            } else {
                throw new RequestError("Bad User Object Returned.")
            }
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    </Box>)
}

export default LoginScreen;