import os, json, qrcode

qrdir = "qrcode"
if not os.path.exists(qrdir):
    os.makedirs(qrdir)  
    print(f"Pasta '{qrdir}' criada.")
dados = {
    "id": "1",
    "title": "Exemplo 1",
    "content": """Este é um teste de funcionalidade do app Avard."""
}
json_string = json.dumps(dados)
qr = qrcode.QRCode( version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4, )
qr.add_data(json_string)
qr.make(fit=True)
imagem = qr.make_image(fill_color="black", back_color="white")
qr_path = os.path.join(qrdir, "qrcode.png")
imagem.save(qr_path)
print("QR Code gerado com sucesso como 'qrcode.png'!")
