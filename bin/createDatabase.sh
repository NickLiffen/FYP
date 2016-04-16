#!/bin/bash

EXPECTED_ARGS=1
E_BADARGS=65
MYSQL=`which mysql`

Q1="CREATE DATABASE IF NOT EXISTS $1;"
SQL="${Q1}"

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: $0 dbname dbuser dbpass"
  exit $E_BADARGS
fi

$MYSQL -uroot -p -e "$SQL"
echo "Database Created Successfully: $1"
