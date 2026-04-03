from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.secret_key = 'your_secret_key_here'  # Change this to a secure key

@app.route('/')
def home():
    return render_template('portfolio.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    subject = request.form.get('subject', '').strip()
    message = request.form.get('message', '').strip()
    
    # Validate inputs
    if not all([name, email, subject, message]):
        flash('Please fill in all fields', 'error')
        return redirect(url_for('home'))
    
    # TODO: Add code to send email or save to database
    # For now, just show a success message
    flash(f'Thank you for your message, {name}! We will get back to you soon.')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)