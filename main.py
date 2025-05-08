from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/budget')
def budget():
    return render_template('budget.html')
@app.route('/investments')
def investment():
    return render_template('investments.html')
@app.route('/goals')
def goals():
    return render_template('goals.html')

if __name__ == '__main__':
    app.run(debug=True)
