import psycopg2

# Replace these variables with your actual database connection details
DATABASE_URL = "postgres://daniel:iAaWwat7QY6rVqyW1u5GRcKAeqHFx5gr@dpg-cn4bvl5jm4es73bomhlg-a.frankfurt-postgres.render.com/appdb_erlp"

# SQL commands to create tables
commands = (
    """
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        profile_picture_url VARCHAR(255),
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc'),
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc')
    )
    """,
    """
    CREATE TABLE user_auth_methods (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        provider VARCHAR(50),
        provider_user_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc')
    )
    """
)

conn = None
try:
    # Connect to the PostgreSQL server
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Create each table
    for command in commands:
        cur.execute(command)
    
    # Close communication with the PostgreSQL database server
    cur.close()

    # Commit the changes
    conn.commit()
    print("Tables created successfully.")
except (Exception, psycopg2.DatabaseError) as error:
    print(error)


