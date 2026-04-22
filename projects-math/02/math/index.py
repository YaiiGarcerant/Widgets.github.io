import cv2
import matplotlib.pyplot as plt

# 1. Cargar imagen y pasar a escala de grises
img = cv2.imread('test.jpeg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 2. Aplicar un umbral (Threshold) para binarizar
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# 3. Encontrar contornos
contornos, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# 4. Dibujar para comprobar
cv2.drawContours(img, contornos, -1, (0, 255, 0), 3)

# Mostrar resultado
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title("¿El borde verde encaja con el objeto?")
plt.show()