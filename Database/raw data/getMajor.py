# -*- coding: utf-8 -*-

import re

data =  open('dataDaihoc.txt', 'r')
majorFile = open('major.txt', 'w')

majors = {}

for line in data:
	m = re.search('[DC]\d\d\d\d\d\d', line)
	if (line.find(",http://www") > -1):
		print line[0:3]
		# majorFile.write(line[0:3])
	elif m:
		id = line.split('---')[1]
		name = line.split('---')[0]
		name = name.split('(')[0]
		# print id + "," + name

		if (id not in majors.keys() and len(id) == 7 and name not in majors.values()):
			majors[id] = name
			# print id + "," + name
			majorFile.write(id + "," + name + "\n")