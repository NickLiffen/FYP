#!/bin/bash

EXPECTED_ARGS=2
E_BADARGS=65
MYSQL=`which mysql`

Q1="GRANT ALL ON *.* TO '$1'@'localhost' IDENTIFIED BY '$2';"
Q2="FLUSH PRIVILEGES;"
SQL="${Q1}${Q2}"

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: $0 dbname dbuser dbpass"
  exit $E_BADARGS
fi

$MYSQL -uroot -p -e "$SQL"
echo "User Created Successfully: $1"
