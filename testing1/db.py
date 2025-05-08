import json
from pymongo import MongoClient
import os

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
collection = db["user_details"]

# Hardcoded path to the JSON file where fitness data will be stored
fitness_data_file = 'json/fitness.json'

# Ensure the 'json' directory exists
if not os.path.exists('json'):
    os.makedirs('json')

# Function to insert user into the database
def insert_user(data):
    collection.insert_one(data)

# Function to get user by email from the database
def get_user_by_email(email):
    user = collection.find_one({'email': email})
    if user:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
    return user

# Function to load fitness data from the hardcoded JSON file
def load_fitness_data():
    try:
        with open(fitness_data_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

# Function to save fitness data to the hardcoded JSON file
def save_fitness_data(data):
    with open(fitness_data_file, 'w') as f:
        json.dump(data, f, indent=4)

# Function to update fitness data in MongoDB and the hardcoded JSON file
def update_fitness_data(email, fitness_data):
    # Update fitness data in MongoDB
    collection.update_one(
        {"email": email},
        {"$push": {"fitness_data": fitness_data}}
    )
    
    # Load existing data from the hardcoded JSON file
    fitness_data_json = load_fitness_data()
    
    # If the email is not in the fitness data, initialize it
    if email not in fitness_data_json:
        fitness_data_json[email] = []
    
    # Replace the old fitness data with the new one (Only keeping the latest entry)
    fitness_data_json[email] = [fitness_data]  # Only store the latest entry
    
    # Save the updated fitness data to the hardcoded JSON file
    save_fitness_data(fitness_data_json)

# Function to load the last fitness data when a user logs in
def load_user_fitness_on_login(email):
    # Get the user from MongoDB
    user = get_user_by_email(email)
    
    if user and 'fitness_data' in user:
        # Load the existing fitness data from the hardcoded JSON file
        fitness_data_json = load_fitness_data()
        
        # If the email doesn't exist in the JSON, add a new entry
        if email not in fitness_data_json:
            fitness_data_json[email] = user['fitness_data']
        else:
            # Update fitness data for the existing user, overwriting the old data
            fitness_data_json[email] = [user['fitness_data'][-1]]  # Only store the last entry

        # Save to the file
        save_fitness_data(fitness_data_json)
