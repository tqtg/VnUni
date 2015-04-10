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

	# id
	jsonfile.write('\t\t"id": "' + row['id'] + '",\n')
	# name
	jsonfile.write('\t\t"name": "' + row['name'] + '",\n')
	# region
	region = '\t\t"region": %d,\n' % row['region']
	jsonfile.write(region)
	# city
	city = '\t\t"city": %d,\n' % row['city']
	jsonfile.write(city)
	# school type
	type = '\t\t"type": %d,\n' % row['type']
	jsonfile.write(type)

	# majors
	jsonfile.write('\t\t"majors": [\n')
	jsonfile.write('\t\t\t{\n')
	# major id
	major = '\t\t\t\t"major": ,\n'
	jsonfile.write(major)
	# divisions
	jsonfile.write('\t\t\t\t"divisions": {\n')
	# division id
	division = '\t\t\t\t\t"division": \n'
	jsonfile.write(division)
	jsonfile.write('\t\t\t\t},\n')
	# admission marks
	jsonfile.write('\t\t\t\t"admissionMarks": [\n')
	jsonfile.write('\t\t\t\t\t{\n')
	jsonfile.write('\t\t\t\t\t\t"year": ,\n')
	jsonfile.write('\t\t\t\t\t\t"mark": \n')
	jsonfile.write('\t\t\t\t\t}\n')
	jsonfile.write('\t\t\t\t]\n')

	jsonfile.write('\t\t\t}\n')
	jsonfile.write('\t\t]\n')
	jsonfile.write("\t},\n")

jsonfile.write("]")