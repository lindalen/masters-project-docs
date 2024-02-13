import argparse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.UserAuth import UserAuthMethod
from models.User import User
import os

from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Database connection setup
DATABASE_URL = os.getenv("INTERNAL_DB_URL")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
print(DATABASE_URL)
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def delete_user(user_id):
    session = Session()
    try:
        # First, delete related UserAuthMethod entries
        session.query(UserAuthMethod).filter(UserAuthMethod.user_id == user_id).delete()

        # Then, delete the User
        user = session.query(User).filter(User.id == user_id).first()
        if user:
            session.delete(user)
            session.commit()
            print(f"User with ID {user_id} and related auth methods deleted successfully.")
        else:
            print("User not found.")
    except Exception as e:
        session.rollback()
        print(f"Error deleting user and related auth methods: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Delete a user from the database by user ID.")
    parser.add_argument("--user-id", type=int, required=True, help="User ID of the user to delete.")
    
    args = parser.parse_args()
    
    delete_user(args.user_id)