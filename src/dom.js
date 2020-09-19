window.dom = {
  // 创建
  create(string) {
    // template标签可以在里面放任何元素
    let container = document.createElement("template");
    // 去掉字符串前后的空格 字符串是直接写好的如<div><p><span></span></p></div>,不然就要再创建然后添加
    // 将字符串直接放进template标签会直接变成元素
    container.innerHTML = string.trim();
    // return container.content.children[0];
    return container.content.firstChild;
  },
  // parentDiv.insertBefore(sp1, sp2) 将sp1插入到sp2之前
  before(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },
  // 没有 insertAfter() 使用 insertBefore 和 Node.nextSibling 来模拟它
  after(node1, node2) {
    node1.parentNode.insertBefore(node2, node1.nextSibling);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  // 添加父元素
  wrap(parent, node) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  // 如果使用childNodes,删掉childNodes里元素以后，length会变化,所以不能使用for i遍历删除
  empty(node) {
    let firstChild = node.firstChild;
    let array = [];
    while (firstChild) {
      array.push(dom.remove(firstChild));
      firstChild = node.firstChild;
    }
    return array;
  },
  // 重载（设置不同的参数）
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
      // attr(node,name) 获取属性值
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  // 适配不同的浏览器
  text(node, string) {
    if (arguments.length === 2) {
      if (innerText in node) {
        node.innerText === string; // 很旧的ie只支持
      } else {
        node.innerContent === string; // Chrome firefox
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      // dom.style(div,'color')
      if (typeof name === string) {
        return node.style[name];
        // dom.style(div,{color:red})
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
};
