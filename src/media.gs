base_path = '/home/felpelon/dust_visualization'

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

r = 2
q = (2*r-1)*(2*r-1)
p = (5-2*r)/10

'sdfopen 'base_path'/2024dv.nc'

*SANTA CATARINA
*'set lat -30 -25.5'
*'set lon -54 -48'

*américa latina
'set lat -56 11'
'set lon -83 -29'

time = 1
while (time <= 12)
  tval = mlist.time
  mes = monname.time
  regiao = rregion.r