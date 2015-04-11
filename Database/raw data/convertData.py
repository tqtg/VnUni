# -*- coding: utf-8 -*-

import csv
import json
from collections import defaultdict

csvfile =  open('../university.csv', 'r')
jsonfile = open('../university.json', 'w')

majors = {}
majorFile = open('major.txt', 'r')
for line in majorFile:
	key = line.split('---')[0]
	value = line.split('---')[1][0:len(line.split('---')[1])-1]
	majors[key] = value
	# print key, majors[key]

# for major in majors:
# 	print major, majors[major]

uniMajors = defaultdict(list)
uniMajorFile = open('uniMajor.txt', 'r')
uniId = ""
for line in uniMajorFile:
	if len(line) == 4:
		uniId = line[0:3]
		# print uniId
	else:
		majorId = line[0:7]
		# print majorId
		uniMajors[uniId].append(majorId)

# for uni in uniMajors:
# 	print uni, uniMajors[uni]

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
	
	uni = row['id']
	nMajors = 0
	for major in uniMajors[uni]:
		nMajors += 1
		jsonfile.write('\t\t\t{\n')
		# major
		majorId = '\t\t\t\t"id": "' + major + '",\n'
		jsonfile.write(majorId)
		majorName = '\t\t\t\t"name": "",\n'
		if (major in majors):
			majorName = '\t\t\t\t"name": "' + majors[major] + '",\n'
		jsonfile.write(majorName)
		# divisions
		jsonfile.write('\t\t\t\t"divisions": {\n')
		# division id
		division = '\t\t\t\t\t"division": ""\n'
		jsonfile.write(division)
		jsonfile.write('\t\t\t\t},\n')
		# admission marks
		jsonfile.write('\t\t\t\t"admissionMarks": [\n')
		jsonfile.write('\t\t\t\t\t{\n')
		year = '\t\t\t\t\t\t"year": %d,\n' % 2015
		jsonfile.write(year)
		mark = '\t\t\t\t\t\t"mark": %d\n' % 0
		jsonfile.write(mark)
		jsonfile.write('\t\t\t\t\t}\n')
		jsonfile.write('\t\t\t\t]\n')
		if nMajors != len(uniMajors[uni]):
			jsonfile.write('\t\t\t},\n')
		else:
			jsonfile.write('\t\t\t}\n')

	jsonfile.write('\t\t]\n')
	jsonfile.write("\t},\n")
	# break

jsonfile.write("]")