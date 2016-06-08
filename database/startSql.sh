#!/bin/sh

echo "Starting MySQL..."
docker run --name dbSNP -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:5.7

echo "Waiting for db to start..."
docker exec dbSNP mysqladmin --wait=20 -ppassword ping || exit 1

echo "Importing sql files..."
docker exec -i dbSNP mysql -ppassword alleles < Allele.sql
docker exec -i dbSNP mysql -ppassword alleles < SNPAncestralAllele.sql
