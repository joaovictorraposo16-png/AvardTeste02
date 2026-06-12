import os, json, qrcode

# Diretório
qrdir = "qrcode"
if not os.path.exists(qrdir):
    os.makedirs(qrdir)  
    print(f"Pasta '{qrdir}' criada.")

# Dados (Json)
dados = {
    "id": "02",
    "title": "teste",
    "content": """Desde os primórdios da humanidade, o olhar voltado para o horizonte nunca foi de mera contemplação. Havia, no fundo da mente de nossos ancestrais, uma pergunta inquieta e silenciosa: O que existe além? Foi essa dúvida que transformou nômades em exploradores e pequenas tribos em civilizações interconectadas. A curiosidade não era apenas uma ferramenta de sobrevivência; era a força motriz da evolução cultural humana.As primeiras grandes navegações exemplificam o ápice desse desejo de expandir limites. Homens e mulheres desafiavam oceanos desconhecidos, guiados apenas pelas estrelas e por mapas imprecisos que misturavam geografia com mitologia. Navegar era preciso, não porque o caminho fosse seguro, mas porque a estagnação significava o fim do crescimento. Cada nova costa descoberta, cada nova cultura contatada reescrevia a história e expandia a própria definição de "mundo".Com o passar dos séculos, a Terra começou a parecer menor. As linhas em branco nos globos terrestres foram preenchidas por cartógrafos detalhistas. As montanhas mais altas foram escaladas, as florestas mais densas foram mapeadas e as profundezas dos oceanos começaram a ser desvendadas. Parecia que o ciclo da exploração estava chegando ao fim. No entanto, a mente humana não aceita o conceito de linha de chegada. Quando o chão sob nossos pés foi finalmente compreendido, nossos olhos se voltaram automaticamente para cima."""
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