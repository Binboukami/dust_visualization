year=2018
while [ $year -le 2025 ]
do
    rm -rf /home/felpelon/grads/Mapas/${year}/PM10/America_Latina/*
    year=$((year+1))
done