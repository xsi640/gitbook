#!/usr/bin/env python3

print("'A' code is ", ord('A'))
print("65 code of ", chr(65))
print("%d" % 11)
print("%.2f" % 1.111)
print('%s' % 'aaaaa')
print('%s成绩提高了%d分' % ('小明', 20))
print('{0}成绩提高了{1:.1f}分'.format('小明', 20))

name = '小明'
score = 20
print(f'{name}成绩提高了{score:.1f}分')