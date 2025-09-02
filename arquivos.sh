mon=12
year=2018
variable_name="PM"
while [ $year -le 2025 ]
do
    while [ $mon -le 12 ]
    do
    echo "processando mês ${mon}..."
    cdo setreftime,${year}-$(printf "%02d" $mon)-01,00:00:00,months /home/felpelon/dust/${year}/g4.timeAvg.M2TMNXAER_5_12_4_DUSMASS.${year}0101-${year}1231.MONTH_$(printf "%02d" $mon).180W_90S_180E_90N.nc /home/felpelon/dust/${year}/${year}-$(printf "%02d" $mon)-${variable_name}.nc
    mon=$((mon+1))
    done
    echo "juntando os arquivos..."

    cdo mergetime /home/felpelon/dust/$year/${year}-??-${variable_name}.nc /home/felpelon/dust/${year}/${year}-${variable_name}.nc

    echo "fazendo regrid..."

    cdo remapbil,/home/felpelon/grads/data/grid.txt /home/felpelon/dust/${year}/${year}-${variable_name}.nc /home/felpelon/dust/${year}/${year}-${variable_name}-regrid.nc

    echo "renomeando variável..."

    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass /home/felpelon/dust/${year}/${year}-${variable_name}-regrid.nc /home/felpelon/dust/${year}/${year}-${variable_name}-regrid-renamed.nc

    echo "juntando dust e vento..."

    cdo merge /home/felpelon/Vento/${year}-v.nc /home/felpelon/dust/${year}/${year}-${variable_name}-regrid-renamed.nc /home/felpelon/dust/${year}/${year}-${variable_name}-v.nc

    echo "ano concluído."
    echo "juntando estações..."
    echo "verao..."

    # Verão (dezembro do ano anterior + jan, fev)
    echo "separando vento..."
    cdo seldate,$((year-1))-12-01,${year}-02-28 /home/felpelon/Vento/todo-o-vento.nc /home/felpelon/Vento/vento_verao_${year}.nc
    
    echo "juntando meses..."
    cdo mergetime /home/felpelon/dust/$((year-1))/$((year-1))-12-${variable_name}.nc /home/felpelon/dust/${year}/${year}-01-${variable_name}.nc /home/felpelon/dust/${year}/${year}-02-${variable_name}.nc /home/felpelon/dust/${year}/${year}-verao.nc
    
    echo "fazendo regrid..."
    cdo remapbil,/home/felpelon/grads/data/grid.txt /home/felpelon/dust/${year}/${year}-verao.nc /home/felpelon/dust/${year}/${year}-verao-regrid.nc
    
    echo "renomeando variável..."
    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass /home/felpelon/dust/${year}/${year}-verao-regrid.nc /home/felpelon/dust/${year}/${year}-verao-regrid-renamed.nc
    
    echo "juntando dust e vento..."
    cdo merge /home/felpelon/dust/${year}/${year}-verao-regrid-renamed.nc /home/felpelon/Vento/vento_verao_${year}.nc /home/felpelon/dust/${year}/${year}-verao-${variable_name}-v.nc
    
    echo "fazendo a média..."
    cdo timmean /home/felpelon/dust/${year}/${year}-verao-${variable_name}-v.nc /home/felpelon/dust/${year}/${year}-verao-mean.nc
    echo "verão concluído!"
    echo "outono..."

    # Outono (mar, abr, mai)
      echo "separando vento..."
    cdo seldate,${year}-03-01,${year}-05-31 /home/felpelon/Vento/todo-o-vento.nc /home/felpelon/Vento/vento_outono_${year}.nc
    
    echo "juntando meses..."
    cdo mergetime /home/felpelon/dust/${year}/${year}-03-${variable_name}.nc /home/felpelon/dust/${year}/${year}-04-${variable_name}.nc /home/felpelon/dust/${year}/${year}-05-${variable_name}.nc /home/felpelon/dust/${year}/${year}-outono.nc
    
    echo "fazendo regrid..."
    cdo remapbil,/home/felpelon/grads/data/grid.txt /home/felpelon/dust/${year}/${year}-outono.nc /home/felpelon/dust/${year}/${year}-outono-regrid.nc
    
    echo "renomeando variável..."
    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass /home/felpelon/dust/${year}/${year}-outono-regrid.nc /home/felpelon/dust/${year}/${year}-outono-regrid-renamed.nc
    
    echo "juntando dust e vento..."
    cdo merge /home/felpelon/dust/${year}/${year}-outono-regrid-renamed.nc /home/felpelon/Vento/vento_outono_${year}.nc /home/felpelon/dust/${year}/${year}-outono-${variable_name}-v.nc
    
    echo "fazendo a média..."
    cdo timmean /home/felpelon/dust/${year}/${year}-outono-${variable_name}-v.nc /home/felpelon/dust/${year}/${year}-outono-mean.nc
    echo "outono concluído!"
    echo "invero..."

    # Inverno (jun, jul, ago)
    cdo seldate,${year}-06-01,${year}-08-31 /home/felpelon/Vento/todo-o-vento.nc /home/felpelon/Vento/vento_inverno_${year}.nc
    
    echo "juntando meses..."
    cdo mergetime /home/felpelon/dust/${year}/${year}-06-${variable_name}.nc /home/felpelon/dust/${year}/${year}-07-${variable_name}.nc /home/felpelon/dust/${year}/${year}-08-${variable_name}.nc /home/felpelon/dust/${year}/${year}-inverno.nc
    
    echo "fazendo regrid..."
    cdo remapbil,/home/felpelon/grads/data/grid.txt /home/felpelon/dust/${year}/${year}-inverno.nc /home/felpelon/dust/${year}/${year}-inverno-regrid.nc
    
    echo "renomeando variável..."
    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass /home/felpelon/dust/${year}/${year}-inverno-regrid.nc /home/felpelon/dust/${year}/${year}-inverno-regrid-renamed.nc
    
    echo "juntando dust e vento..."
    cdo merge /home/felpelon/dust/${year}/${year}-inverno-regrid-renamed.nc /home/felpelon/Vento/vento_inverno_${year}.nc /home/felpelon/dust/${year}/${year}-inverno-${variable_name}-v.nc
    
    echo "fazendo a média..."
    cdo timmean /home/felpelon/dust/${year}/${year}-inverno-${variable_name}-v.nc /home/felpelon/dust/${year}/${year}-inverno-mean.nc
    echo "inverno concluído!"

    echo "primavera..."

    # Primavera (set, out, nov)
    cdo seldate,${year}-09-01,${year}-11-30 /home/felpelon/Vento/todo-o-vento.nc /home/felpelon/Vento/vento_primavera_${year}.nc
    
    echo "juntando meses..."
    cdo mergetime /home/felpelon/dust/${year}/${year}-09-${variable_name}.nc /home/felpelon/dust/${year}/${year}-10-${variable_name}.nc /home/felpelon/dust/${year}/${year}-11-${variable_name}.nc /home/felpelon/dust/${year}/${year}-primavera.nc
    
    echo "fazendo regrid..."
    cdo remapbil,/home/felpelon/grads/data/grid.txt /home/felpelon/dust/${year}/${year}-primavera.nc /home/felpelon/dust/${year}/${year}-primavera-regrid.nc
    
    echo "renomeando variável..."
    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass /home/felpelon/dust/${year}/${year}-primavera-regrid.nc /home/felpelon/dust/${year}/${year}-primavera-regrid-renamed.nc
    
    echo "juntando dust e vento..."
    cdo merge /home/felpelon/dust/${year}/${year}-primavera-regrid-renamed.nc /home/felpelon/Vento/vento_primavera_${year}.nc /home/felpelon/dust/${year}/${year}-primavera-${variable_name}-v.nc
    
    echo "fazendo a média..."
    cdo timmean /home/felpelon/dust/${year}/${year}-primavera-${variable_name}-v.nc /home/felpelon/dust/${year}/${year}-primavera-mean.nc
    echo "primavera concluída!"
    echo "estacoes concluidas"
mon=1
year=$((year+1))
done


