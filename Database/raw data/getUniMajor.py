# -*- coding: utf-8 -*-

import re

data =  open('dataDaihoc.txt', 'r')
uniFile = open('uniMajor.txt', 'w')

# majors = {}

for line in data:
	m = re.search('[DC]\d\d\d\d\d\d', line)
	if (line.find(",http://") > -1):
		print line[0:3]
		uniFile.write(line[0:3] + "\n")
	elif m:
		id = line.split('---')[1]
		# name = line.split('---')[0]
		# name = name.split('(')[0]
		# print id + "," + name

		if (len(id) == 7):
			# majors[id] = name
			# print id + "," + name
			uniFile.write(id + "\n")