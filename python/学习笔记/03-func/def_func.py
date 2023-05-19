#!/usr/bin/env python3

import math

def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operate type')
    if x>0:
        return x
    else:
        return -x
    
print(my_abs(-1))

def nop():
    pass

print(nop())

# print(my_abs('-1'))

def move(x, y, step, angle = 0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

x, y = move(100, 100, 60, math.pi / 6)
print(x, y)

r = move(100, 100, 60, math.pi / 6)
print(r)

def add_end(L = []):
    L.append('END')
    return L

print(add_end())
#参数L会被当作变量来定义，两次执行后，L的值是['END', 'END']
print(add_end())

def calc(numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum

print(calc([1,2,3]))
print(calc((1,2,3)))

def calc1(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum

print(calc1(1,2,3))
print(calc1(1,2,3,4,5))

nums = [1,2,3]
print(calc1(*nums))

def person(name, age, **kw):
    if 'city' in kw:
        print("find city")
    if 'job' in kw:
        # 有job参数
        pass
    print('name:', name, 'age:', age, 'other:', kw)

person('Michael', 30)
person('Bob', 35, city='Beijing')
person('Adam', 45, gender='M', job='Engineer')
extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)