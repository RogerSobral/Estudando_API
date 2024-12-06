from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

# USERS
@app.route("/users", methods=["GET"])
def pegarUsuario():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    return jsonify(users), 200

@app.route("/users", methods=["POST"])
def add_user():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO users(nome) VALUES(%s)""", (data["nome"],))
    conn.commit()
    return jsonify({"message": "User created successfully"}), 201



if __name__ == '__main__':
    app.run(debug=True)
