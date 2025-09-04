base_path = '/home/felpelon/dust_visualization'

mlist.1 = 1                                                            
mlist.2 = 2
mlist.3 = 3
mlist.4 = 4
mlist.5 = 5
mlist.6 = 6
mlist.7 = 7
mlist.8 = 8
mlist.9 = 9
mlist.10 = 10
mlist.11 = 11
mlist.12 = 12

monname.1 = "janeiro"
monname.2 = "fevereiro"
monname.3 = "marco"
monname.4 = "abril"
monname.5 = "maio"
monname.6 = "junho"
monname.7 = "julho"
monname.8 = "agosto"
monname.9 = "setembro"
monname.10 = "outubro"
monname.11 = "novembro"
monname.12 = "dezembro"

rregion.1 = "Santa_Catarina"
rregion.2 = "América_Latina"

year = 2018
variable_name = PM
r = 2
q = (2*r-1)*(2*r-1)
p = (5-2*r)/10

while (year <= 2025)
  'sdfopen 'base_path'/dust/'year'/'year'-'variable_name'-v.nc'
  'set lev 850'

*SANTA CATARINA
*'set lat -30 -25.5'
*'set lon -54 -48'zzzz

*américa latina
  'set lat -56 11'
  'set lon -83 -29'

  time = 1
  while (time <= 12)
    tval = mlist.time
    mes = monname.time
    regiao = rregion.r

      'set t 'tval
      'set grads off'
      'clear'
      'set gxout shaded'
      'set rgb 16 147 255 244'
      'set rgb 17 157 245 234'
      'set rgb 18 167 235 224'
      'set rgb 19 177 225 214'
      'set rgb 20 187 215 204'
      'set rgb 21 197 205 194'
      'set rgb 22 207 195 184'
      'set rgb 23 217 185 174'
      'set rgb 24 227 175 164'
      'set rgb 25 237 165 154'
      'set rgb 26 247 155 144'

      'set clevs 0 1e-9 2e-9 3e-9 4e-9 5e-9 6e-9 7e-9 8e-9 9e-9 1e-8 1.2e-8 1.4e-8 1.6e-8'
****'set ccols 16 17 18 19 20 21 22 23 24 25 26'

      'd dusmass'
*'set gxout contour'
*'set clevs 0 1e-9 2e-9 3e-9 4e-9 5e-9 6e-9 7e-9 8e-9 9e-9 1e-8 1.1e-8 1.2e-8 1.3e-8'
*'d dusmass'
      'set gxout vector'
      'set arrscl 'p''
      'd skip(u,'q');skip(v,'q')'
      

      'draw shp 'base_path'/src/br.shp'
      montext = monname.tval
      'draw string 4 8 Mes: 'mes''
      'draw string 6 8 Pressao: 850hPa'
      'd aave(dusmass, lon=-83, lon=-29, lat=-56, lat=11)'
      media = result
      numero_da_media = subwrd(media,4)
      if (numero_da_media != Request)
        numero_truncado = math_int(numero_da_media*1e11)/100
        'draw string 1 4 Media: 'numero_truncado'ug'
      endif
      'draw string 9.15 8 PM10'
      'draw string 2 8 Ano: 'year''
      'run 'base_path'/src/cbarn.gs'

*por mês
      fname =''regiao'_'year'_'time'_'mes'_850hpa.png'
*por pressão
*fname = ''regiao'_850hpa_'time''mes'_'year'.png'
      cmd = 'printim 'base_path'/grads/Mapas/'year'/PM10/America_Latina/'fname
      cmd

    time = time + 1
  endwhile
  'close 1'
  year = year + 1
endwhile
