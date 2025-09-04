base_path = '/home/felpelon/dust_visualization'

year = 2019
variable_name = PM

r = 2
q = (2*r-1)*(2*r-1)*3
p = (5-2*r)/10

row = 3
col = 4
marg = 0.5

'q gxinfo'
pg_size=sublin(result,2)
x_siz=subwrd(pg_size,4)
y_siz=subwrd(pg_size,6)

o_marg=marg
i_marg=marg/2

nada = ''

monname.1  = "jan"
monname.2  = "fev"
monname.3  = "mar"
monname.4  = "abr"
monname.5  = "mai"
monname.6  = "jun"
monname.7  = "jul"
monname.8  = "ago"
monname.9  = "set"
monname.10 = "out"
monname.11 = "nov"
monname.12 = "dez"

*while (year <= 2024)
while (year <= 2019)
    'sdfopen 'base_path'/dust/'year'/'year'-'variable_name'-v.nc'
    'set lev 850'

*SANTA CATARINA
*'set lat -30 -25.5'
*'set lon -54 -48'zzzz

*américa latina
    'set lat -56 11'
    'set lon -83 -29'

    time = 1

*while (time <= 12)
    while (time <= 1)

    mes = monname.time
    regiao = rregion.r
    i = 1
    while (i <= 3)
        j = 1
        while (j <= 4)
        'set grads off'
        'set strsiz 0.1 0.1'
        'set t 'time
        'run 'base_path'/src/set_parea.gs 'row' 'col' 'i' 'j''
        'set xlab .'
        'set ylab .'
        'set gxout shaded'
        'set clevs 0 1e-9 2e-9 3e-9 4e-9 5e-9 6e-9 7e-9 8e-9 9e-9 1e-8 1.2e-8 1.4e-8 1.6e-8'
        'd dusmass'
        
        'set gxout vector'
        'set rgb 18 255 255 255'
        'set arrscl 'p''
        'd skip(u,'q');skip(v,'q')'
      

        'draw shp 'base_path'/src/br.shp'

        xpl_siz=(x_siz-2*o_marg-(col-1)*i_marg)/col
        ypl_siz=(y_siz-2*o_marg-(row-1)*i_marg)/row

        xmin=o_marg+(j-1)*(xpl_siz+i_marg)
        xmax=xmin+xpl_siz
        ymin=o_marg+(row-i)*(ypl_siz+i_marg)
        ymax=ymin+ypl_siz
    
        xmin=substr(xmin,1,5)
        xmax=substr(xmax,1,5)
        ymin=substr(ymin,1,5)
        ymax=substr(ymax,1,5)

        xmid = (xmax+xmin)/2
        ymid = (ymax+ymin)/2

        'run 'base_path'/src/cbarn.gs 0.35 1 'xmid+1' 'ymid''
        'draw recf 'xmin+0.33' 'ymin+0.33''
        'set string 0 c 5'
        'set strsiz 0.1'
        'draw string 'xmin+0.16' 'ymin+0.16' 'monname.((i-1)*4+j)
    

        time = time + 1
        j = j + 1
        endwhile
    i = i + 1
    endwhile
    endwhile

    fname =''regiao'_'year'_comparar_850hpa.png'
    cmd = 'printim 'base_path'/grads/Mapas/'year'/PM10/America_Latina/'fname' x3000 y2000'
    cmd
    'close 1'
    year = year + 1
endwhile






