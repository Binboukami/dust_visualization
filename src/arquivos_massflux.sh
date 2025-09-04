base_path = /home/felpelon/dust_visualization
working_dir = data

mon=1
year=2024
variable_name=massflux
component=V

while [ $mon -le 12 ]
    do
    echo "processando mês ${mon}..."
    cdo setreftime,${year}-$(printf "%02d" $mon)-01,00:00:00,months ${base_path}/${working_dir}/componente_${component}/g4.timeAvg.M2TMNXAER_5_12_4_DUFLUX${component}.${year}0101-${year}1231.MONTH_$(printf "%02d" $mon).180W_90S_180E_90N.nc ${base_path}/${working_dir}/componente_${component}/${year}-$(printf "%02d" $mon)-${variable_name}-${component}.nc
    mon=$((mon+1))
    done
echo "juntando os arquivos..."

    cdo mergetime ${base_path}/${working_dir}/componente_${component}/${year}-??-${variable_name}-${component}.nc ${base_path}/${working_dir}/componente_${component}/${year}-${variable_name}-${component}.nc

echo "fazendo regrid..."

    cdo remapbil,${base_path}/src/grid.txt ${base_path}/${working_dir}/componente_${component}/${year}-${variable_name}-${component}.nc ${base_path}/${working_dir}/componente_${component}/${year}-${variable_name}-${component}-regrid.nc

echo "renomeando variável..."

    cdo chvar,M2TMNXAER_5_12_4_DUFLUX${component},${component}mf ${base_path}/${working_dir}/componente_${component}/${year}-${variable_name}-${component}-regrid.nc ${base_path}/${working_dir}/componente_${component}/${year}-${variable_name}-${component}-regrid-renamed.nc

echo "tudo certo"