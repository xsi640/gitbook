#!/usr/bin/env python3

t = (1,2,3,'4')
print(t)
# t[3] = '5' # 元祖不可修改
# print(t)

s = (1,['a','b'])
s[1][0] = 'c'
print(s)