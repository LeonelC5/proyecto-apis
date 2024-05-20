from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
app.secret_key = "my_secret_key"

CORS(app)

db = mysql.connector.connect(
    host="database-proyecto.c45ddxrq8nnm.us-east-1.rds.amazonaws.com",
    user="admin",
    password="database-proyecto",
    database="usuario"
)

cursor = db.cursor(dictionary=True)

@app.route("/users", methods=["GET"])
def get_users():
    # Consulta SQL para obtener todos los usuarios
    query = "SELECT * FROM user"
    cursor.execute(query)
    users = cursor.fetchall()
    return jsonify(users)

@app.route("/user/<int:id>", methods=["GET"])
def get_user(id):
    query = "SELECT * FROM user WHERE id = %s"
    cursor.execute(query, (id,))
    user = cursor.fetchone()
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
@app.route("/user", methods=["POST"])
def create_user():
    data = request.json
    if "nombre" in data and "apellido" in data and "correo" in data and "password" in data and "celular" in data and "description" in data and "imagen" in data:
        query = "INSERT INTO user (nombre, apellido, correo, password, celular, description, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (data["nombre"], data["apellido"], data["correo"], data["password"], data["celular"], data["description"], data["imagen"])
        cursor.execute(query, values)
        db.commit()
        return jsonify({"message": "Usuario creado exitosamente"}), 201
    else:
        return jsonify({"error": "Faltan datos en la solicitud"}), 400

@app.route("/user/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.json
    if "nombre" in data or "apellido" in data or "correo" in data or "password" in data or "celular" in data or "description" in data or "imagen" in data:
        updates = []
        values = []
        if "nombre" in data:
            updates.append("nombre = %s")
            values.append(data["nombre"])
        if "apellido" in data:
            updates.append("apellido = %s")
            values.append(data["apellido"])
        if "correo" in data:
            updates.append("correo = %s")
            values.append(data["correo"])
        if "password" in data:
            updates.append("password = %s")
            values.append(data["password"])
        if "celular" in data:
            updates.append("celular = %s")
            values.append(data["celular"])
        if "description" in data:
            updates.append("description = %s")
            values.append(data["description"])
        if "imagen" in data:
            updates.append("imagen = %s")
            values.append(data["imagen"])
        
        query = "UPDATE user SET " + ", ".join(updates) + " WHERE id = %s"
        values.append(id)
        cursor.execute(query, tuple(values))
        db.commit()
        return jsonify({"message": "Usuario actualizado exitosamente"}), 200
    else:
        return jsonify({"error": "No se proporcionaron datos para actualizar"}), 400

@app.route("/user/<int:id>", methods=["DELETE"])
def delete_user(id):
    query = "DELETE FROM user WHERE id = %s"
    cursor.execute(query, (id,))
    db.commit()
    if cursor.rowcount > 0:
        return jsonify({"message": "Usuario eliminado exitosamente"}), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8000, debug=True)
