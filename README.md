# dust_visualization
*****PARA GERAR OS ARQUIVOS*****

Joga os arquivos divididos por mês numa pasta

Indica o caminhos dessa pasta dentro dos scripts arquivos.sh e arquivos_queimadas.sh
Você também pode indicar o mês e o ano que quer eles comecem e ele vai até o ano indicado no loop (no momento está em 2025)
Mesmo que tenha meses faltando eles vão gerar os arquivos

Quando der run em cada um:

O arquivos.sh vai gerar arquivos de ano, 1 arquivo = 1 ano, com 12 timesteps 1 pra cada mês
O arquivos.sh também vai gerar arquivos sazonais Verão (DEZ, JAN, FEV), Outono (MAR, ABR, MAI), Inverno (JUN, JUL, AGO), Primavera (SET, OUT, NOV)
Para gerar o Verão ele precisa de dezembro do ano anterior, então Exemplo: Verão de 2019 = média de (dezembro de 2018, janeiro de 2019 e fevereiro de 2019).

O arquivos_queimadas.sh vai gerar 1 arquivo para cada ano de Queimadas (AGO, SET, OUT).

os arquivos trimestrais só têm 1 timestep com a média dos meses.


*****PARA GERAR OS MAPAS*****

O mapas.gs quando der run vai gerar mapas com dust e vento e salvar as imagens em pastas
Atenção: ele vai fazer todos os mapas possíveis de 2018 a 2025 a não ser que você mude no código

O estacoes.gs vai fazer a mesma coisa só que com os arquivos trimestrais, ele vai procurar as mesmas pastas do mapas.gs para colocar o que gerou
Atenção: ele vai fazer todos os mapas possíveis de 2018 a 2025 a não ser que você mude no código

O comparar_mapas.gs vai gerar os mesmos mapas do mapas.gs, mas vai colocar os 12 meses lado a lado e salvar como uma só imagem 
Atenção: ele ainda não está pronto e não funciona corretamente.
Por enquanto ele apenas gera essa imagem: rregion.2_2019_comparar_850hpa.png na pasta referente a 2019.