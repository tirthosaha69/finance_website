from flask import Flask, render_template, request, redirect, session
from testing1.db import insert_user, get_user_by_email,update_fitness_data,load_user_fitness_on_login

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Change this to something secret

@app.route('/', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        age = request.form['age']
        password = request.form['password']  # Storing password in plaintext
        
        user_data = {
            "name": name,
            "email": email,
            "age": int(age),
            "password": password,  # Store password directly (plaintext)
            "fitness_data": []  # Initialize an empty list to store fitness data

        }
        insert_user(user_data)
        return redirect('/login')
    return render_template('form.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        user = get_user_by_email(email)
        if user and user['password'] == password:
            session['user_id'] = str(user['_id'])  # Store the string representation of the ObjectId
            session['user_email'] = user['email']  # Store email in session as well (optional)
            
            
            load_user_fitness_on_login(email=email)
            return redirect('/profile')
        else:
            return "Invalid email or password!", 401
    return render_template('login.html')

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect('/login')

    user_email = session['user_email']
    user = get_user_by_email(user_email)  # Get user details including fitness data

    if user:
        return render_template('profile.html', user=user)
    return "User not found", 404


@app.route('/logout')
def logout():
    session.pop('user_id', None)  # Remove user_id from session
    session.pop('user_email', None)  # Optionally remove email from session
    return redirect('/login')


@app.route('/update_fitness', methods=['POST'])
def update_fitness():
    if 'user_id' not in session:
        return redirect('/login')

    user_email = session['user_email']
    weight = request.form['weight']
    steps = request.form['steps']
    date = request.form['date']  # Ensure it's in a valid date format

    fitness_data = {
        "weight": float(weight),
        "steps": int(steps),
        "date": date
    }
    
    update_fitness_data(user_email, fitness_data)
    return redirect('/profile')


if __name__ == '__main__':
    app.run(debug=True)
