import os, json, qrcode

# Diretório
qrdir = "qrcode"
if not os.path.exists(qrdir):
    os.makedirs(qrdir)  
    print(f"Pasta '{qrdir}' criada.")

# Dados (Json)
dados = {
    "id": "01",
    "title": "Exemplo",
    "content": "Conteúdo"
}
json_string = json.dumps(dados)

# Definições do QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(json_string)
qr.make(fit=True)

# Criar e enviar o QR code para a pasta "qrcode"
imagem = qr.make_image(fill_color="black", back_color="white")
qr_path = os.path.join(qrdir, "qrcode.png") # nome da imagem gerada
imagem.save(qr_path)
print("QR Code gerado com sucesso como 'qrcode.png'!")