base_path = /home/felpelon

'clear'
'set lat -30 -25.5'
'set lon -54 -48'
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

'set clevs 0 1e-9 2e-9 3e-9 4e-9 5e-9 6e-9 7e-9 8e-9 9e-9 1e-8'
'set ccols 16 17 18 19 20 21 22 23 24 25 26'
'd dusmass'
'draw shp 'base_path'/grads/data/br.shp'

*set ccols 0 1 2 3 4 5 6 7 8 9 10