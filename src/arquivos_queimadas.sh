
year=2018
variable_name="PM"
while [ $year -le 2025 ]
do
    echo "separando vento..."
    cdo seldate,${year}-03-01,${year}-05-31 /home/felpelon/Vento/todo-o-vento.nc /home/felpelon/Vento/vento_queimada_${year}.nc
    
    echo "juntando meses..."
    cdo mergetime /home/felpelon/dust/${year}/${year}-08-${variable_name}.nc /home/felpelon/dust/${year}/${year}-09-${variable_name}.nc /home/felpelon/dust/${year}/${year}-10-${variable_name}.nc /home/felpelon/dust/${year}/${year}-queimada.nc
    
    echo "fazendo regrid..."
    cdo remapbil,/home/felpelon/grads/data/grid.txt /home/felpelon/dust/${year}/${year}-queimada.nc /home/felpelon/dust/${year}/${year}-queimada-regrid.nc
    
    echo "renomeando variável..."
    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass /home/felpelon/dust/${year}/${year}-queimada-regrid.nc /home/felpelon/dust/${year}/${year}-queimada-regrid-renamed.nc
    
    echo "juntando dust e vento..."
    cdo merge /home/felpelon/dust/${year}/${year}-queimada-regrid-renamed.nc /home/felpelon/Vento/vento_queimada_${year}.nc /home/felpelon/dust/${year}/${year}-queimada-${variable_name}-v.nc
    
    echo "fazendo a média..."
    cdo timmean /home/felpelon/dust/${year}/${year}-queimada-${variable_name}-v.nc /home/felpelon/dust/${year}/${year}-queimada-mean.nc
    echo "queimada concluído!"
    echo "INVERO..."
    year=$((year+1))
done

# meses das queimadas: agosto, setembro e outubro