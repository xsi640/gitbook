#!/usr/bin/env python3

d = {'a':1,'b':2,'c':3}
print(d)
print(d['c'])
print(f'The key d exists:', 'd' in d)
print(f'The key c exists:', 'c' in d)
print(f'The key d exists:', d.get('d') != None)
print(f'The key c exists:', d.get('c', -1) != -1)

f = d.pop('c')
print(d)