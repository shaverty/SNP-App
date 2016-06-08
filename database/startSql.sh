#!/bin/sh

echo "Starting MySQL..."
docker run --name dbSNP -d \
	-e MYSQL_DATABASE=alleles \
	-e MYSQL_ROOT_PASSWORD=password \
	-p 3306:3306  mysql:5.7

echo "Waiting for db to start..."
sleep 10 
docker exec dbSNP mysqladmin --silent --wait=20 -ppassword ping || exit 1

echo "Importing sql files..."
echo "This might take a while..."
docker exec -i dbSNP mysql -ppassword alleles < Allele.sql
docker exec -i dbSNP mysql -ppassword alleles < SNPAncestralAllele.sql
