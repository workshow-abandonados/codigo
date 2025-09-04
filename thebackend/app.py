from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permite peticiones desde el frontend

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ladanivalegendbronto4x4!",
    database="workshow_db"
)

cursor = db.cursor(dictionary=True)

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    sql = "SELECT * FROM usuarios WHERE email = %s AND password = %s"
    cursor.execute(sql, (email, password))
    result = cursor.fetchone()

    if result:
        return jsonify({"mensaje": "Login exitoso", "usuario": result["email"]}), 200
    else:
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)
