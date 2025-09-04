base_path = /home/felpelon

year = 2019
variable_name = PM
r = 2
q = (2*r-1)*(2*r-1)
p = (5-2*r)/10

estname.1 = "verao"
estname.2 = "outono"
estname.3 = "inverno"
estname.4 = "primavera"
estname.5 = "queimada"


While (year <= 2025)
*tval = 1
    tval = 5
    While (tval <= 5)

        est = estname.tval
        'sdfopen 'base_path'/dust/'year'/'year'-'est'-mean.nc'
*américa latina
        'set lat -56 11'
        'set lon -83 -29'
        'set gxout shaded'
        'set clevs 0 1e-9 2e-9 3e-9 4e-9 5e-9 6e-9 7e-9 8e-9 9e-9 1e-8 1.2e-8 1.4e-8 1.6e-8'
        'd dusmass'
        'set gxout vector'
        'set arrscl 'p''
        'd skip(u,'q');skip(v,'q')'
        'draw shp 'base_path'/grads/data/br.shp'
        'draw string 4 8 Estacao: 'est''
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
        'run 'base_path'/grads/data/cbarn.gs'
        fname =''est'_850hpa.png'
        cmd = 'printim 'base_path'/grads/Mapas/'year'/PM10/America_Latina/'fname
        cmd
        'clear'
        'close 1'
        tval = tval + 1

    endwhile
year = year + 1
endwhile

        