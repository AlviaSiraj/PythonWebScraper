import pymysql  # PyMySQL for database connection
import json  # For JSON conversion
import os  # To read environment variables
import requests #HTTP Request Library

# Function to establish a database connection using PyMySQL
def get_db_connection():
    try:
        conn = pymysql.connect(
            host=os.getenv('DB_HOST'),  # Replace with your RDS endpoint
            user=os.getenv('DB_USER'),  # Your RDS username
            password=os.getenv('DB_PASSWORD'),  # Your RDS password
            database=os.getenv('DB_NAME'),  # Your database name
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        return conn
    except pymysql.MySQLError as err:
        print(f"Error: {err}")
        return None
    
#save answers to db
def save_answers_to_db(category,question,answer):
    conn = get_db_connection()
    if not conn:
        return {"error": "Failed to connect to the database"}
    try:
        with conn.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO question_data (category, question, answer) VALUES (%s, %s,%s)"
            cursor.execute(sql, (category, question, answer))
        # Commit changes
        conn.commit()
        return {"message": "Answers saved successfully"}
    except pymysql.MySQLError as err:
        print(f"Error: {err}")  
        return {"error": f"Failed to save answers: {err}"}
    finally:
        conn.close()

def submit_answer(category,question,answer):
    #save the answer to the database  
   try:
     
        result=save_answers_to_db(category,question,answer)
        return result, None
   
   except requests.exceptions.RequestException as e:
        return None, f"Failed to fetch the webpage: {e}"