base_path = /home/felpelon/dust_visualization
output_dir = grads/Mapas
year=2018

while [ $year -le 2025 ]
do
    rm -rf ${base_path}/${output_dir}/${year}/PM10/America_Latina/*
    year=$((year+1))
done