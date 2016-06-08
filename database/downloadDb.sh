wget -O SNPAncestralAllele.sql.gz 'http://cgsmd.isi.edu/dbsnpq/download_table.php?table=SNPAncestralAllele&format=mysql' 
gunzip SNPAncestralAllele.sql.gz &
wget -O Allele.sql.gz 'http://cgsmd.isi.edu/dbsnpq/download_table.php?table=Allele&format=mysql'
gunzip Allele.sql.gz
