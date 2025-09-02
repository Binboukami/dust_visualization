say 'AUX STARTED'
* debug: veja exatamente o que chegou
say 'AUX RAW args = ['args']'

xmax = subwrd(args,1)
xmin = subwrd(args,2)
ymax = subwrd(args,3)
ymin = subwrd(args,4)

* echo parseado
say 'AUX PARSED: 'xmax' 'xmin' 'ymax' 'ymin

* (opcional) defina deslocamentos/centro pra colorbar:
xmid = (xmax + xmin)/2
ymid = (ymax + ymin)/2