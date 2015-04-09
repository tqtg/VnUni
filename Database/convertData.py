# -*- coding: utf-8 -*-

import csv
import json

csvfile =  open('university.csv', 'r')
jsonfile = open('university.json', 'w')

fieldnames = ("id", "name", "region", "city", "type")
reader = csv.DictReader(csvfile, fieldnames)

jsonfile.write("[\n")

for row in reader:
	row['region'] = int(row['region'])
	row['city'] = int(row['city'])
	row['type'] = int(row['type'])
	# print row
	jsonfile.write("\t{\n")
	jsonfile.write('\t\t"id": "' + row['id'] + '",\n')
	jsonfile.write('\t\t"name": "' + row['name'] + '",\n')
	region = '\t\t"region": %d,\n' % row['region']
	jsonfile.write(region)
	city = '\t\t"city": %d,\n' % row['city']
	jsonfile.write(city)
	type = '\t\t"type": %d\n' % row['type']
	jsonfile.write(type)
	jsonfile.write("\t},\n")

jsonfile.write("]")