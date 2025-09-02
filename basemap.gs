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

plist.1 = 850
plist.2 = 875
plist.3 = 900
plist.4 = 925
plist.5 = 950

monname.1 = "janeiro"
monname.2 = "fevereiro"
monname.3 = "março"
monname.4 = "abril"
monname.5 = "maio"
monname.6 = "junho"
monname.7 = "julho"
monname.8 = "agosto"
monname.9 = "setembro"
monname.10 = "outubro"
monname.11 = "novembro"
monname.12 = "dezembro"

i = 1
while (i <= 12)
  tval = mlist.i
  mes = monname.i

  j = 1
  while (j <= 5)
    pval = plist.j

    'set t 'tval
    'set lev 'pval
    'set grads off'
    'clear'
    'd skip(u,1);skip(v,1)'
    'draw shp /home/felpelon/grads/data/br.shp'
    montext = monname.tval
    draw1 = 'draw string 10 90 "Mês: 'montext'"'
    draw2 = 'draw string 10 85 "Pressão: 'pval'hPa"'
    execute(draw1)
    execute(draw2)
    fname = '2024_'pval'_'mes'.png'
    cmd = 'printim 'fname
    cmd

    
    j = j + 1
  endwhile

  i = i + 1
endwhile
