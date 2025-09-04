function geral(args)
'reinit'
#
##############################################################
###########
### Script Automático executar o script para detecção do Jato de ###
### Baixos Niveis (JBN) ###
### Utiliza o as reanálises do CFSR (1979 a 2010) e CFSv2 (2011 a ###
### 2021). ###
### ###
### IMPORTANTE: Esse script roda somente as 06Z. ###
### Elaborado por: Pedro Cardoso, Adriano Vitor e Mario Quadro ###
### ###
### Para rodar : ###
### "run detecta_jbn.gs YYYYMMDD(i) YYYYMMDD(f)" ###
### Adaptado em: 05/11/2021 ###
### ###
##############################################################
###########
#
#
#************************************************************************
# Define Parâmetros e Critério para Definir o JBN
#************************************************************************
#
# zdef 16 levels 1 2 3 4 5 6 7 8 9 10 11 12
# zdef 16 levels 1000 975 950 925 900 875 850 825 800 775 750 700
132
#
# UNDCO -> Contagem de valores indefinidos na grade
# VALCO -> Contagem de valores válidos na grade
# WINMIN -> Valor mínimo do vento na grade
# WINMAX -> Valor máximo do vento na grade
# WINAVE -> Valor médio do vento na grade
# WINSIG -> Desvio Padrão do vento na grade
#
# LEVMIN -> Nível de Pressão mínimo na grade
# LEVMAX -> Nível de Pressão máximo na grade
# WINAVE -> Nível de Pressão médio na grade
# LEVSIG -> Desvio Padrão do Nível de Pressão na grade
#
#------------------------------------------------------------------------
# Área do JBN
#------------------------------------------------------------------------
# Area Total
 _lati=-30.0 ;# Define Latitude Sul
 _latf=-10.0 ;# Define Latitude mais ao Norte
 _loni=-68.0 ;# Define Langitude Oeste
 _lonf=-52.0 ;# Define Langitude Leste
# Quadrante NW
 _latinw=(_lati+_latf)/2 ;# Define Latitude Sul do Quadrante NW
 _latfnw=_latf ;# Define Latitude mais ao Norte do Quadrante NW
 _loninw=_loni ;# Define Langitude Oeste do Quadrante NW
 _lonfnw=(_loni+_lonf)/2 ;# Define Langitude Leste do Quadrante NW
# Quadrante NE
 _latine=(_lati+_latf)/2 ;# Define Latitude Sul do Quadrante NE
 _latfne=_latf ;# Define Latitude mais ao Norte do Quadrante NE
 _lonine=(_loni+_lonf)/2 ;# Define Langitude Oeste do Quadrante NE
 _lonfne=_lonf ;# Define Langitude Leste do Quadrante NE
133
# Quadrante SW
 _latisw=_lati ;# Define Latitude Sul do Quadrante SW
 _latfsw=(_lati+_latf)/2 ;# Define Latitude mais ao Norte do Quadrante SW
 _lonisw=_loni ;# Define Langitude Oeste do Quadrante SW
 _lonfsw=(_loni+_lonf)/2 ;# Define Langitude Leste do Quadrante SW
# Quadrante SE
 _latise=_lati ;# Define Latitude Sul do Quadrante SE
 _latfse=(_lati+_latf)/2 ;# Define Latitude mais ao Norte do Quadrante SE
 _lonise=(_loni+_lonf)/2 ;# Define Langitude Oeste do Quadrante SE
 _lonfse=_lonf ;# Define Langitude Leste do Quadrante SE
#
#
# (latf,loni) (latf,lonf)
# |--------------------|--------------------|
# | | |
# | | |
# | | |
# | Quadrante | Quadrante |
# | NW | NE |
# | | |
# | | |
# | | |
# |--------------------|--------------------|
# | | |
# | | |
# | | |
# | Quadrante | Quadrante |
# | SW | SE |
# | | |
# | | |
# | | |
134
# |--------------------|--------------------|
# (lati,loni) (lati,lonf)
#
#------------------------------------------------------------------------
# Niveis de Pressão Inferior e Superior
#------------------------------------------------------------------------
#
 _pinf=1000 ;# Define Nivel de Pressão Inferior
 _psup=700 ;# Define Nivel de Pressão Superior
#
#------------------------------------------------------------------------
# Limiar de Vento Máximo e cizalhamento
#------------------------------------------------------------------------
#
 _limw=12 ;# Define Limiar do Vento Máximo
 _licz=6 ;# Define Limiar do Cizalamneto até 700 hpa (~ 3000m)
#
##############################################################
###########
### Pegando Parametros de Entrada ###
##############################################################
###########
#
_datai=subwrd(args,1)
_anoi=substr(_datai,1,4)
_mesi=substr(_datai,5,2)
_diai=substr(_datai,7,2)
_hori=06
#
_dataf=subwrd(args,2)
_anof=substr(_dataf,1,4)
135
_mesf=substr(_dataf,5,2)
_diaf=substr(_dataf,7,2)
_horf=06
#
#------------------------------------------#
# Cria variável com data em forma de strg #
# usando função #
#------------------------------------------#
ret=arruma_mes(_mesi)
_msi=_mes_string
ret=arruma_mes(_mesf)
_msf=_mes_string
#
_nmes=((_anof-_anoi)*12)-_mesi+_mesf+1
#
say 'Data Inicial -> '_anoi%_mesi%_diai' , '_msi
say 'Data Final -> '_anof%_mesf%_diaf' , '_msf
say 'No de Meses -> '_nmes
#_nanos=_anof-_anoi+1#
#pull c
#'quit'
#
##############################################################
###########
### Define PAths e Abre Arquivo Descritor ###
##############################################################
###########
#
_path_scr='/home/sifapsc/scripts/pedro'
136
_path_png=_path_scr'/images'
_path_txt=_path_scr'/outfiles'
_path_dat='/media/hd2tb/dados/pesquisa/cfsr'
_path_lib='/usr/share/grads'
#
'!mkdir -p '_path_png
'!mkdir -p '_path_txt
#
'open '_path_dat'/cdas1.wind.1990-2021.ctl'
say 'Arquivo Aberto -> '_path_dat'/cdas1.wind.1990-2021.ctl'
#
'set mpdset brmap_hires'
'run '_path_lib'/define_colors.gs'
#
##########################################
#Define ultimo DATA DO ARQUIVO
##############################################
#
'set time '_hori'Z'_diai%_msi%_anoi
'q dims'
_tinic=sublin(result,5)
_tinic=subwrd(_tinic,9)
#
'set time '_horf'Z'_diaf%_msf%_anof
'q dims'
_tlast=sublin(result,5)
_tlast=subwrd(_tlast,9)
#
say 'Tempo Inicial, Tempo Final -> '_hori'Z'_diai%_msi%_anoi' (t='_tinic') a
'_horf'Z'_diaf%_msf%_anof' (t='_tlast')'
137
#pull c
#'quit'
_t=_tinic
#
while (_t <= _tlast)
#
#
##########################################################
# Define Tempo
##########################################################
#
'set t '_t
'q time'
 _anl = subwrd(result,3)
 _hh = substr(_anl,1,2)
 _dd = substr(_anl,4,2)
 _mmm = substr(_anl,6,3)
 _yy = substr(_anl,9,4)
 say 'Tempo -> '_anl
 ret=month()
 if (_mm <= 3 )
 _y1 = _yy - 1
 _y2 = _yy
 else
 _y1 = _yy
 _y2 = _yy + 1
 endif
#
##########################################################
# Faz o Mapa em 850 hPa somente para os Meses NOV, DEZ, JAN e FEV
138
##########################################################
#
if (_mm=1 | _mm=2 | _mm=3 | _mm=11 | _mm=12 )
'c'
'set map 15 1 6'
'set lev 850'
'set gxout shaded'
'set lat -45 0'
'set lon -80 -35'
'set grads off'
'set clevs 12 15 18 21 24 27 33'
'set ccols 0 72 73 74 76 77 78 79'
'd mag(ugrdprs,vgrdprs)'
'run '_path_lib'/cbarn.gs'
'set gxout stream'
'set grads off'
'set strmden 4'
'd ugrdprs;vgrdprs'
#
'q w2xy '_loni' '_lati
 xlo=subwrd(result,3)
 ylo=subwrd(result,6)
'q w2xy '_lonf' '_latf
 xhi=subwrd(result,3)
 yhi=subwrd(result,6)
 say xlo' 'ylo' 'xhi' 'yhi
'set line 2'
'draw rec 'xlo' 'ylo' 'xhi' 'yhi
#
'draw title Analise de Vento (m/s) em 850 hPa \ para '_hh'Z de '_dd'/'_mm'/'_yy
'set strsiz 0.12 0.12'
139
'draw string 0.70 0.3 PCAM/IFSC'
'printim '_path_png'/anl_lcor_850_'_yy%_mm%_dd%_hh'.png white'
 say 'Arquivo Gerado -> '_path_png'/anl_lcor_850_'_yy%_mm%_dd%_hh'.png'
# pull c
#
##########################################################
# Inicia o Script de deteccao JBN
# Faz o Loop para gerar as estatísticas da área total e os 4 quadrantes
##########################################################
#
_c=1
while (_c <= 5)
 if(_c=1);_area=tot;_lat1=_lati;_lat2=_latf;_lon1=_loni;_lon2=_lonf;endif

if(_c=2);_area=nw;_lat1=_latinw;_lat2=_latfnw;_lon1=_loninw;_lon2=_lonfnw;endif

if(_c=3);_area=ne;_lat1=_latine;_lat2=_latfne;_lon1=_lonine;_lon2=_lonfne;endif

if(_c=4);_area=sw;_lat1=_latisw;_lat2=_latfsw;_lon1=_lonisw;_lon2=_lonfsw;endif

if(_c=5);_area=se;_lat1=_latise;_lat2=_latfse;_lon1=_lonise;_lon2=_lonfse;endif
#
 'set lat '_lat1' '_lat2
 'set lon '_lon1' '_lon2
 ret=dimensoes_area() ;# Funcao para Calcular a dimensão x,y da área de
estudo
#
#----------------------------------------------------------
# CRITERIO A:
140
# - Seleciona regiões com vento Norte (atribui valor 1) e Vento Sul (atribui valor
0)
#----------------------------------------------------------
#
 'set gxout grid'
 'set lev '_pinf' '_psup
 'define crita=abs(((abs(vgrdprs)-vgrdprs)/2)*(-1)/vgrdprs)'
# ret=teste_crita() ;# Funcao Teste para verificar se o Criterio a funcionou
#
#----------------------------------------------------------
# CRITERIO B:
# - Define Valor (wmax) e o nível (wloc) máximo do Vento entre os
# níveis de pressao inferior e superior;
# - Seleciona Regiões com limiar de wmax acima do definido (atribui valor 1)
# e abaixo do definido (atribui valor 0)
#
# IMPORTANTE: Para definir a matrix com valores de wmax provisório
(wmaxp),
# deve-se considerar o critério A pois a verificacão
# do vento norte deve ser aplicado para todos os níveis de pressão,
# considerando os limiares inferior e superior definido no inicio
# do script
#----------------------------------------------------------
#
 'set z 1'
 'define wmaxp=max(mag(UGRDprs,VGRDprs)*crita,lev='_pinf',lev='_psup')'
 'define wlocp=maxloc(mag(UGRDprs,VGRDprs)*crita,lev='_pinf',lev='_psup')'
#
#
#----------------------------------------------------------
# CRITERIO C:
141
# - Define Regiões de wmax com cizalhamento verticas (wciz)
# maior que o limiar definido entre níveis de pressao inferior e superior;
#----------------------------------------------------------
#
 'define wxli=wmaxp-'_limw
 'define critb=abs(((abs(wxli)+(wxli))/2)/wxli)'
#
 'define wminp=min(mag(UGRDprs,VGRDprs)*crita,lev='_pinf',lev='_psup')'
 'define wcizp=wmaxp-wminp'
#
 'define wcli=wcizp-'_licz
 'define critc=abs(((abs(wcli)+(wcli))/2)/wcli)'
#
#----------------------------------------------------------
# RESULTADO:
# - Defineo valor final de wmax e wloc, considerando os critérios
# B (critb) e C (critc);
#----------------------------------------------------------
 'define wmax=wmaxp/(critb*critc)'
 'define wloc=wlocp/(critb*critc)'
# ret=print_testes() ;# Funcao para gerar alguns mapas de testes
# ret=cizjbn_new() ;# Funcao para novo criterio de cizalhamento
#
##########################################################
# Gera Estatístizas e Matrizes de Wmax e Wloc
##########################################################
#
142
 _var='wind'
#
 'set gxout stat'
 'd wloc'
# say result
 lin=sublin(result,8)
 _lvmi=subwrd(lin,4) ;# Min Value of Level Pressure
 _lvma=subwrd(lin,5) ;# Max value of Level Pressure
 lin=sublin(result,11)
 _lave=subwrd(lin,2) ;# Average Value (/n) of Level Pressure
 lin=sublin(result,13)
 _lsig=subwrd(lin,2) ;# Standard deviation (/n) of Level Pressure
 'd wmax'
# say result
 lin=sublin(result,5)
 _npx=subwrd(lin,3) ;# x diretion number of points (LONG)
 _npy=subwrd(lin,4) ;# y diretion number of points (LAT)
 lin=sublin(result,7)
 _uco=subwrd(lin,4) ;# Undef count
 _vco=subwrd(lin,8) ;# Valid count
 lin=sublin(result,8)
 _wvmi=subwrd(lin,4) ;# Min Value of Wind
 _wvma=subwrd(lin,5) ;# Max value of Wind
 lin=sublin(result,11)
 _wave=subwrd(lin,2) ;# Average Value (/n) of Wind
 lin=sublin(result,13)
 _wsig=subwrd(lin,2) ;# Standard deviation (/n) of Wind
# pull c
143
# 'quit'
 if (_vco=0) ;# Nao encontrou JBN
 _wvmi=0 ; _lvmi=0
 _wvma=0 ; _lvma=0
 _wave=0 ; _lave=0
 _wsig=0 ; _lsig=0
 endif
 _file_out=_path_scr'/stat_txt/'_y1'-'_y2'/stat_'_var'_'_y1'-'_y2'_'_area'.txt'
 _fcsv_out=_path_scr'/stat_csv/'_y1'-'_y2'/stat_'_var'_'_y1'-'_y2'_'_area'.csv'
#
 '!mkdir -p '_path_scr'/stat_txt/'_y1'-'_y2
 '!mkdir -p '_path_scr'/stat_csv/'_y1'-'_y2
 '!mkdir -p '_path_txt'/'_yy
#
 if (_t=_tinic | _dd = "01" & _mm = 11)
 say 'Gerando Estatisticas para '_var' em '_dd%_mm%_yy
# _file_out=_path_scr'/stat_txt/'_yy'/stat_'_var'_'_yy'_'_area'.txt'
# _fcsv_out=_path_scr'/stat_csv/'_yy'/stat_'_var'_'_yy'_'_area'.csv'
 say 'File out -> '_file_out
 _outcab='DATA UNDCO VALCO WINMIN WINMAX WINAVE WINSIG
LEVMIN LEVMAX LEVAVE LEVSIG'
 '!echo NPX='_npx' NPY='_npy' LONI='_loni' LONF='_lonf' LATI='_lati'
LATF='_latf' > '_file_out
 '!printf "%10s %5s %5s %6s %6s %6s %6s %6s %6s %6s %6s \n" '_outcab'
>> '_file_out
 endif
#
 _outwri=_yy%_mm%_dd%_hh' '_uco' '_vco' '_wvmi' '_wvma' '_wave' '_wsig'
'_lvmi' '_lvma' '_lave' '_lsig
144
 say 'outwri -> '_outwri
 '!printf "%10s%6s%6s%7.1f%7.1f%7.1f%7.1f%7.1f%7.1f%7.1f%7.1f %s\n"
'_outwri' >> '_file_out
 say 'Arquivo Gerado -> '_file_out
 wmaxfile =_path_txt'/'_yy'/wmax_'_area'_'_yy%_mm%_dd%_hh'.txt'
 '!rm -rf 'wmaxfile
 'set gxout print'
 'set prnopts %7.1f 8 1'
 'd wmax'
 rc=write(wmaxfile,result)
 say 'Arquivo Gerado -> 'wmaxfile
 rc=close(wmaxfile)
 wlocfile =_path_txt'/'_yy'/wloc_'_area'_'_yy%_mm%_dd%_hh'.txt'
 '!rm -rf 'wlocfile
 'set gxout print'
 'set prnopts %7.1f 8 1'
 'd wloc'
 rc=write(wlocfile,result)
 say 'Arquivo Gerado -> 'wlocfile
 rc=close(wlocfile)
# pull c
_c=_c+1
endwhile
endif ;# Fim do if dos meses
#
145
_t=_t+4
endwhile
'quit'
return 'ok'
#
##############################################
function dimensoes_area()
##############################################
#
'q dims'
lin=sublin(result,2)
res=subwrd(lin,11) ; _xini=math_int(res)
res=subwrd(lin,13) ; _xfin=math_int(res)
lin=sublin(result,3)
res=subwrd(lin,11) ; _yini=math_int(res)
res=subwrd(lin,13) ; _yfin=math_int(res)
_nlon=1+(_xfin-_xini)
_nlat=1+(_yfin-_yini)
#
say 'xini ; xfin -> '_xini' ; '_xfin
say 'yini ; yfin -> '_yini' ; '_yfin
say 'nlon ; nlat -> '_nlon' ; '_nlat
say 'Longitude -> '_loni' to '_lonf
say 'Latitude -> '_lati' to '_latf
return
146
#
##############################################
function month()
##############################################
#
if (_mmm='JAN') ;_mm=01; endif
if (_mmm='FEB') ;_mm=02; endif
if (_mmm='MAR') ;_mm=03; endif
if (_mmm='APR') ;_mm=04; endif
if (_mmm='MAY') ;_mm=05; endif
if (_mmm='JUN') ;_mm=06; endif
if (_mmm='JUL') ;_mm=07; endif
if (_mmm='AUG') ;_mm=08; endif
if (_mmm='SEP') ;_mm=09; endif
if (_mmm='OCT') ;_mm=10;endif
if (_mmm='NOV') ;_mm=11;endif
if (_mmm='DEC') ;_mm=12;endif
return
#
##############################################
# Ajustando data de decimal para string #
##############################################
#
function arruma_mes(mes)
_mes_decimal=subwrd(mes,1)
if (_mes_decimal = 01 ); _mes_string='JAN' ; endif
if (_mes_decimal = 02 ); _mes_string='FEB' ; endif
if (_mes_decimal = 03 ); _mes_string='MAR' ; endif
if (_mes_decimal = 04 ); _mes_string='APR' ; endif
147
if (_mes_decimal = 05 ); _mes_string='MAY' ; endif
if (_mes_decimal = 06 ); _mes_string='JUN' ; endif
if (_mes_decimal = 07 ); _mes_string='JUL' ; endif
if (_mes_decimal = 08 ); _mes_string='AUG' ; endif
if (_mes_decimal = 09 ); _mes_string='SEP' ; endif
if (_mes_decimal = 10 ); _mes_string='OCT' ; endif
if (_mes_decimal = 11 ); _mes_string='NOV' ; endif
if (_mes_decimal = 12 ); _mes_string='DEC' ; endif
return geral
#
##############################################
# Funcao Teste para verifica se o Critério a
# funcionou
##############################################
#
function teste_crita()
'c'
'set gxout grid'
# 'set gxout print'
'set lev 850'
'd crita'
'set cmax 0'
'set gxout contour'
'd vgrdprs'
'set gxout vector'
'd UGRDprs;VGRDprs'
'draw title Vento Meridional em 850 hPa'
 pull c
'c'
148
'set gxout grid'
'set lev 700'
'd crita'
'set cmax 0'
'set gxout contour'
'd vgrdprs'
'set gxout vector'
'd UGRDprs;VGRDprs'
'draw title Vento Meridional em 700 hPa'
 pull c
return
#
##############################################
# Funcao Teste para verifica se o Critério a
# funcionou
##############################################
#
function print_testes()
#
#'set cmin 12'
'c'
'set gxout grid'
'd wlocp'
'draw title Valor de Vento Maximo Provisorio'
 pull c
'c'
'set gxout grid'
'd critb'
149
'draw title Regioes com Criterio B (Wmax > Limiar) definidas'
 pull c
'c'
'set gxout grid'
'd critb'
'draw title Regioes com Criterio C (Wciz > Limiar) definidas'
 pull c
#'run /usr/share/grads/cbarn.gs'
#'set gxout contour'
#'set cmax 0'
#'set gxout stream'
#'d UGRDprs(lev=850);VGRDprs(lev=850)'
'c'
'set gxout shaded'
'set clevs 12 15 18 21 24 27 30'
'set ccols 0 72 73 74 76 77 78 79'
'd wmax'
'set gxout grid'
'd wloc'
'run '_path_lib'/cbarn.gs'
'draw title Regioes com Wloc (grid) \ e Wmax (shades) selecionados'
'printim '_path_png'/result.png white'
 pull c
'set gxout vector'
'set lev 700'
'd UGRDprs;VGRDprs'
 pull c
'c'
'set lat -16'
150
'set lon -64'
'set z 1 16'
'd mag(UGRDprs,VGRDprs)'
 pull c
#'d mag(UGRDprs(lev=850),VGRDprs(lev=850))'
return
###########################################################
# Funcao para Define Valor mínimo (wmin) desde 3 níveis abaixo a
# 3 níveis acima do Nívek de venton máximo
###########################################################
#
function cizjbn_new()
_i=_xini
while (_i <= _xfin)

 _j=_yini
 while (_j <= _yfin)
 'set x '_i
 'set y '_j
 'set gxout stat'
 'd wloc'

 lin=sublin(result,8)
151
 _val=subwrd(lin,4)
 say 'i ; j ; Valor Nivel Vento Máximo -> '_i' ; '_j' ; '_val
 pull c
 'set gxout contour'
 'set z '_val-4' '_val+1
 'set lev 1000 700'
 'd mag(UGRDprs,VGRDprs)'
 'set z 1'
 'd min(mag(UGRDprs,VGRDprs),z='_val-4',z='_val+1')'
 say result
 _j=_j+1
 endwhile
_i=_i+1
endwhile