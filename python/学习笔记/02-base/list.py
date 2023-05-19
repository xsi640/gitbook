#!/usr/bin/env python3

list = ['zhangsan', 'lisi', 'wangwu']
print(list)
print(f"size: {len(list)}")
list[1] = 'zhaoliu'
print(list)
print(f'last at {list[-1]}')
print(f'last but one at {list[-2]}')
list.append('4444')
print(f'末尾添加 \'444\'', list)
list.insert(1,'1111')
print(f'索引为1，插入\'1111\'',list)
t = list.pop()
print(f'最后一个元素{t}出栈', list)
list.append(1234)
print(f'追加一个数字类型的元素\'1234\'', list)