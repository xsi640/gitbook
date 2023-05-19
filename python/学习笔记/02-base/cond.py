#!/usr/bin/env python3

age = 22
if age > 30:
    print("age > 30")
elif age > 20:
    print("age > 20")
else:
    print("age <= 20")

names = ["zhangsan", "lisi", "wangwu"]
for name in names:
    print(name)

sum = 0
for x in [1,2,3,4,5,6,7,8,9,10]:
    sum += x
print(sum)

sum = 0
for x in range(101):
    sum += x
print(sum)

sum = 0
while sum < 100:
    if(sum > 20):
        break
    sum += 1
    if(sum % 2 == 0):
        continue
    else:
        sum += 1
print(sum)