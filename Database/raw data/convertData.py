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
	if (key in majors.keys()):
		print key
	majors[key] = value
	# print key, majors[key]

# print len(majors)

# for major in majors:
# 	print major, majors[major]

uniMajors = defaultdict(list)
uniMajorFile = open('uniMajor.txt', 'r')
uniId = ""
for line in uniMajorFile:
	if len(line) == 4:
		uniId = line[0:3]
		# print uniId
		if (uniId in uniMajors.keys()):
			print uniId
	else:
		majorId = line[0:7]
		# print majorId
		uniMajors[uniId].append(majorId)

colMajorFile = open('colMajor.txt', 'r')
for line in colMajorFile:
	if (len(line) == 4):
		uniId = line[0:3]
		# print uniId
		if (uniId in uniMajors.keys()):
			continue
	else:
		majorId = line[0:7]
		# print majorId
		uniMajors[uniId].append(majorId)

# for uni in uniMajors:
# 	print uni, uniMajors[uni][0][1:7]

uniMarks = {}
markFile = open('diemchuan.txt', 'r')
majorId = ""
for line in markFile:
	if line.find("uniId") > -1:
		uniId = line.split("---")[1][0:3]
		# print uniId
		if (uniId in uniMarks.keys()):
			continue
		else:
			uniMarks[uniId] = {}
	elif line.find("majorId") > -1:
		majorId = line.split("---")[1][0:len(line.split("---")[1])-1]
		# print majorId
		if majorId not in uniMarks[uniId].keys():
			uniMarks[uniId][majorId] = {}
	elif line.find("divisions") > -1:
		divisions = line.split("---")[1][0:len(line.split("---")[1])-1]
		uniMarks[uniId][majorId]["divisions"] = []
		if divisions.find(",") > -1:
			divisions = divisions.split(",")
			for division in divisions:
				uniMarks[uniId][majorId]["divisions"].append(division)
		elif divisions == "none":
			uniMarks[uniId][majorId]["divisions"].append("")
		else:
			uniMarks[uniId][majorId]["divisions"].append(divisions)
	elif line.find("mark") > -1:
		mark = line.split("---")[1][0:len(line.split("---")[1])-1]
		uniMarks[uniId][majorId]["mark"] = mark

for uni in uniMarks:
	if "DiemChung" in uniMarks[uni].keys() and len(uniMarks[uni].keys()) > 1:
		del uniMarks[uni]["DiemChung"]

uniInfor = {}
inforFile = open('dataThongtin.txt', 'r')
uniId = ''
count = 0
for line in inforFile:
	if len(line) == 4:
		uniId = line[0:3]
		# print uniId
		if uniId not in uniInfor.keys():
			uniInfor[uniId] = {}
			count += 1
	elif line.find("Địa chỉ") > -1 and len(line) > 10:
		address = line.split(': ')[1][0:len(line.split(': ')[1])-1]
		uniInfor[uniId]['address'] = address
		# print uniInfor[uniId]['address']
	elif line.find("Điện thoại") > -1 and len(line) > 10:
		phone = line.split(': ')[1][0:len(line.split(': ')[1])-1]
		uniInfor[uniId]['phone'] = phone
		# print uniInfor[uniId]['phone']
	elif line.find("Email") > -1 and len(line) > 10:
		email = line.split(': ')[1][0:len(line.split(': ')[1])-1]
		uniInfor[uniId]['email'] = email
		# print uniInfor[uniId]['email']
	elif line.find("Website") > -1 and len(line) > 10:
		website = line.split(': ')[1][0:len(line.split(': ')[1])-1]
		uniInfor[uniId]['website'] = website
		# print uniInfor[uniId]['website']

tempFile = open('temp.txt', 'w')
for uni in uniInfor:
	tempFile.write(uni + "\n")
	for key in uniInfor[uni]:
		tempFile.write(key + ": " + uniInfor[uni][key] + "\n")
		
count = 0

# Main
fieldnames = ("id", "name", "region", "city", "type")
reader = csv.DictReader(csvfile, fieldnames)

jsonfile.write("[\n")
for row in reader:
	row['region'] = int(row['region'])
	row['city'] = int(row['city'])
	row['type'] = int(row['type'])
	uni = row['id']
	# print row
	
	jsonfile.write("\t{\n")

	# id
	jsonfile.write('\t\t"id": "' + row['id'] + '",\n')
	# name
	jsonfile.write('\t\t"name": "' + row['name'] + '",\n')
	# infor
	if uni in uniInfor.keys():
		# address
		if 'address' in uniInfor[uni].keys():
			jsonfile.write('\t\t"address": "' + uniInfor[uni]['address'] + '",\n')
		else:
			jsonfile.write('\t\t"address": "",\n')
		# phone
		if 'phone' in uniInfor[uni].keys():
			phone = uniInfor[uni]['phone']
			jsonfile.write('\t\t"phone": "' + ''.join([x for x in phone if ord(x) < 128]) + '",\n')
		else:
			jsonfile.write('\t\t"phone": "",\n')
		# email
		if 'email' in uniInfor[uni].keys():
			jsonfile.write('\t\t"email": "' + uniInfor[uni]['email'] + '",\n')
		else:
			jsonfile.write('\t\t"email": "",\n')
		# website
		if 'website' in uniInfor[uni].keys():
			jsonfile.write('\t\t"website": "' + uniInfor[uni]['website'] + '",\n')
		else:
			jsonfile.write('\t\t"website": "",\n')
	else:
		jsonfile.write('\t\t"address": "",\n')
		jsonfile.write('\t\t"email": "",\n')
		jsonfile.write('\t\t"website": "",\n')
		jsonfile.write('\t\t"phone": "",\n')
	

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

	nMajors = 0
	for major in uniMajors[uni]:
		nMajors += 1
		jsonfile.write('\t\t\t{\n')
		# major
		majorId = '\t\t\t\t"id": "' + major + '",\n'
		jsonfile.write(majorId)
		majorName = '\t\t\t\t"name": "",\n'
		majorId = major[1:7]
		if (majorId in majors):
			majorName = '\t\t\t\t"name": "' + majors[majorId] + '",\n'
		jsonfile.write(majorName)
		# divisions
		jsonfile.write('\t\t\t\t"divisions": [ ')
		# division id
		if uni in uniMarks.keys():
			if major in uniMarks[uni]:
				if len(uniMarks[uni][major]["divisions"]) != 0:
					for i in range(0, len(uniMarks[uni][major]["divisions"])):
					# print uniMarks[uni][major]["divisions"][i]
						if i != (len(uniMarks[uni][major]["divisions"])-1):
							division = '"' + uniMarks[uni][major]["divisions"][i] + '", '
						else:
							division = '"' + uniMarks[uni][major]["divisions"][i] + '" '
						jsonfile.write(division)		
		jsonfile.write('],\n')
		
		# admission marks
		jsonfile.write('\t\t\t\t"admissionMarks": [')
		if uni in uniMarks.keys():
			if major in uniMarks[uni]:
				jsonfile.write('\n\t\t\t\t\t{\n')
				year = '\t\t\t\t\t\t"year": %d,\n' % 2014
				jsonfile.write(year)
				mark = '\t\t\t\t\t\t"mark": %d\n' % float(uniMarks[uni][major]["mark"])
				jsonfile.write(mark)
				jsonfile.write('\t\t\t\t\t}\n')
				jsonfile.write('\t\t\t\t]\n')
			else:
				jsonfile.write(' ]\n')
		else:
				jsonfile.write(' ]\n')
		
		if nMajors != len(uniMajors[uni]):
			jsonfile.write('\t\t\t},\n')
		else:
			jsonfile.write('\t\t\t}\n')

	jsonfile.write('\t\t]\n')
	jsonfile.write("\t},\n")
	# break

jsonfile.write("]")

print count