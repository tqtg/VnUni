# -*- coding: utf-8 -*-

import re

data =  open('dataDiemchuan.txt', 'r')
markFile = open('diemchuan.txt', 'w')

# majors = {}

count = 0
for line in data:
	m = re.search('[DC]\d\d\d\d\d\d', line)
	if (len(line) == 4):
		print line[0:3]
		markFile.write("uniId---" + line)
		count += 1
	elif m:
		print ("majorId---" + m.group(0))
		markFile.write("majorId---" + m.group(0) + "\n")
	elif line.find("Khối thi:") > -1:
		divisions = line.split(": ")[1][0:len(line.split(": ")[1])-1]
		print ("divisions---" + divisions)
		markFile.write("divisions---" + divisions + "\n")
	elif line.find("Điểm chuẩn:") > -1:
		mark = line.split(": ")[1].split(" ")[0]
		if (mark.find("\n") > -1):
			mark = mark[0:len(mark)-1]
		print ("mark---" + mark)
		markFile.write("mark---" + mark + "\n")

print count
	# m = re.search('[DC]\d\d\d\d\d\d', line)
	# if (line.find(",http://") > -1):
	# 	print line[0:3]
	# 	colFile.write(line[0:3] + "\n")
	# elif m:
	# 	id = line.split('---')[0]
	# 	# name = line.split('---')[0]
	# 	# name = name.split('(')[0]
	# 	# print id + "," + name

	# 	if (len(id) == 7):
	# 		# majors[id] = name
	# 		# print id + "," + name
	# 		colFile.write(id + "\n")