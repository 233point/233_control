/**
 *
 * generateTree Function
 * Author: zhou qi
 * Date: 2018/05/18
 *
 * 根据一个1维结构数组生成符合ElementUI规则的树形结构化数据.
 * PS: 该方法目前只适用于当前公司项目环境, 树型数据中通过
 * id/pid来确定层级关系.
 * pid 为空的为根节点
 *
 * @param treeData {Array} 原始1维树结构数据对象
 *
 */
export const generateTree = (treeData, pidName, takePid) => {
  // // 把跟节点首先放进数组
  let tmpTree = [];
  if (takePid) {
    tmpTree = treeData.filter(
      node => (pidName ? node[pidName] : node.pId) === ""
    );
  } else {
    tmpTree = treeData.filter(
      node => (pidName ? node[pidName] : node.pId) === "" || node.root
    );
  }

  // 递归生成节点及子节点数据
  const findChildren = tree => {
    tree.forEach(node => {
      node.children = treeData.filter(
        cNode => (pidName ? cNode[pidName] : cNode.pId) === node.id
      );
      if (node.children.length) {
        findChildren(node.children);
      } else {
        node.children = null;
      }
    });
  };

  findChildren(tmpTree);
  let result = JSON.parse(JSON.stringify(tmpTree));
  return result;
};

//  获取一个节点下所有子节点id
export const getTreeNode = (treeData, pId, noNeedRoot) => {
  let childrenNode = [pId[pId.length - 1]].concat([]);
  let childrenTree = [];
  let lastId = pId[pId.length - 1];
  // 取出子节点数据
  const findChildrenTree = data => {
    data.forEach(node => {
      if (node.id == lastId) {
        childrenTree = node.children || [];
      } else if (node.children && node.children.length) {
        findChildrenTree(node.children);
      }
    });
  };
  findChildrenTree(treeData);
  const findChildrenIds = data => {
    data.forEach(node => {
      childrenNode.push(node.id);
      if (node.children && node.children.length) {
        findChildrenIds(node.children);
      }
    });
  };
  if (childrenTree.length == 0) {
    return [lastId];
  } else {
    findChildrenIds(childrenTree);
    return childrenNode;
  }
};

// 查询节点路径
export const findPath = (list, id) => {
  let path = [];
  path.push(id);
  const findParentPath = (list, newId) => {
    let thisNode = list.find(item => {
      return item.id == newId;
    });
    if (thisNode) {
      if (thisNode.root) {
        return;
      }
      let pId = thisNode.pId;
      let result = list.find(item => {
        return item.id == pId;
      });
      if (result) {
        path.unshift(result.id);
        findParentPath(list, result.id);
      }
    } else {
    }
  };
  findParentPath(list, id);
  return path;
};

/**
 *
 * disGenerateTree Function
 * Author: Calamus
 * Date: 2018/05/18
 *
 * 反编译上面的代码生成的树结构
 *
 * @param treeData {Array} 原始1维树结构数据对象
 *
 */
export const disGenerateTree = (treeData, childName, pidName) => {
  var tmpTree = treeData;

  const findChildren = tree => {
    tree.forEach(node => {
      let childrenData = childName ? node[childName] : node.children;
      let childrenName = childName || "children";
      if (childrenData && childrenData.length >= 0) {
        tmpTree = tmpTree.concat(childrenData);
        delete node[childrenName];
        findChildren(tmpTree);
      }
    });
  };
  findChildren(tmpTree);

  return tmpTree.sort((a, b) => {
    return parseInt(a.linkType) - parseInt(b.linkType);
  });
};

export const deleteNullChildren = data => {
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      deleteNullChildren(item.children);
    } else if (item.children && item.children.length == 0) {
      delete item.children;
    }
  });
  return data;
};
