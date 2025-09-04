base_path = $HOME/dust_visualization
data_dir = $HOME/data

year=2018
variable_name="PM"
while [ $year -le 2025 ]
do
    echo "separando vento..."
    cdo seldate,${year}-03-01,${year}-05-31 ${base_path}/Vento/todo-o-vento.nc ${base_path}/Vento/vento_queimada_${year}.nc
    
    echo "juntando meses..."
    cdo mergetime ${data_dir}/${year}/${year}-08-${variable_name}.nc ${data_dir}/${year}/${year}-09-${variable_name}.nc ${data_dir}/${year}/${year}-10-${variable_name}.nc ${data_dir}/${year}/${year}-queimada.nc
    
    echo "fazendo regrid..."
    cdo remapbil,${base_path}/src/grid.txt ${data_dir}/${year}/${year}-queimada.nc ${data_dir}/${year}/${year}-queimada-regrid.nc
    
    echo "renomeando variável..."
    cdo chvar,M2TMNXAER_5_12_4_DUSMASS,dusmass ${data_dir}/${year}/${year}-queimada-regrid.nc ${data_dir}/${year}/${year}-queimada-regrid-renamed.nc
    
    echo "juntando dust e vento..."
    cdo merge ${data_dir}/${year}/${year}-queimada-regrid-renamed.nc ${base_path}/Vento/vento_queimada_${year}.nc ${data_dir}/${year}/${year}-queimada-${variable_name}-v.nc
    
    echo "fazendo a média..."
    cdo timmean ${data_dir}/${year}/${year}-queimada-${variable_name}-v.nc ${data_dir}/${year}/${year}-queimada-mean.nc
    echo "queimada concluído!"
    echo "INVERO..."
    year=$((year+1))
done

# meses das queimadas: agosto, setembro e outubro