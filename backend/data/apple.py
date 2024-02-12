from jose import jwt, jwk
from jose.utils import base64url_decode
import httpx
from time import time
import json
import os

APPLE_PUBLIC_KEY_URL = "https://appleid.apple.com/auth/keys"
APPLE_PUBLIC_KEYS = None
APPLE_KEY_CACHE_EXP = 60 * 60 * 24  # Cache expiration time (1 day)
APPLE_LAST_KEY_FETCH = 0

class AppleUser:
    def __init__(self, apple_id, email=None):
        self.id = apple_id
        self.email = email
        self.full_user = bool(email)

    def __repr__(self):
        return f"<AppleUser {self.id}>"

async def fetch_apple_public_keys():
    global APPLE_LAST_KEY_FETCH, APPLE_PUBLIC_KEYS
    current_time = int(time())

    if APPLE_PUBLIC_KEYS is None or (APPLE_LAST_KEY_FETCH + APPLE_KEY_CACHE_EXP) < current_time:
        async with httpx.AsyncClient() as client:
            response = await client.get(APPLE_PUBLIC_KEY_URL)
            keys = response.json()["keys"]
            APPLE_PUBLIC_KEYS = {key["kid"]: jwk.construct(key) for key in keys}
            APPLE_LAST_KEY_FETCH = current_time

    return APPLE_PUBLIC_KEYS

async def decode_apple_user_token(apple_user_token):
    await fetch_apple_public_keys()
    headers = jwt.get_unverified_headers(apple_user_token)
    kid = headers["kid"]
    key = APPLE_PUBLIC_KEYS[kid]
    try:
        claims = jwt.decode(
            apple_user_token,
            key.to_pem(),
            algorithms=["RS256"],
            audience="com.medibot",
            issuer="https://appleid.apple.com"
        )
        apple_user = AppleUser(claims["sub"], claims.get("email"))
        return apple_user
    except jwt.ExpiredSignatureError:
        raise Exception("That token has expired.")
    except jwt.JWTClaimsError as e:
        raise Exception("Token's claims are invalid: " + str(e))
    except Exception as e:
        raise Exception("An unexpected error occurred: " + str(e))

