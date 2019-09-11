/*
 * 判断数组parent是否含有另一个数组child中的元素
 * 1.数组合并去重判断长度
 * 2.遍历两个数组
 * 3.
 * */
export const contains = (child, parent) => {
  let oldLen = child.length + parent.length;
  let newArr = Array.from(new Set(child.concat(parent)));
  return oldLen > newArr.length;
};
