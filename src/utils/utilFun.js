export const uniqueArray = arr => {
  let hash = {};
  const newArr = arr.reduceRight((item, next) => {
    hash[next.id] ? "" : (hash[next.id] = true && item.push(next));
    return item;
  }, []);
  return newArr;
};
