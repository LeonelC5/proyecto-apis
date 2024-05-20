FROM python:3-slim

WORKDIR /programas/api-perfil

# Instala las dependencias necesarias
RUN pip install flask flask-cors mysql-connector-python

# Copia tu archivo de código fuente
COPY . .

# Comando para ejecutar la aplicación Flask
CMD ["python", "api-perfil.py"]
