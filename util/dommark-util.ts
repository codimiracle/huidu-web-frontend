const xpath = require('xpath-dom');

interface Dommark {
  startDom: string;
  startOffset: number;
  endDom: string;
  endOffset: number;
}

export default class DommarkUtil {
  static getXPath(node: Node, relativeRoot: Node): string {
    let path: string = xpath.getUniqueXPath(node, relativeRoot);
    // for #text node
    if (node.nodeName == '#text') {
      let markedIndex = null;
      let allTextNodes = xpath.findAll(path.replace('#text[1]', 'text()'), relativeRoot);
      for (let i = 0; i < allTextNodes.length; i++) {
        if (node == allTextNodes[i]) {
          markedIndex = i + 1;
          break;
        }
      }
      path = path.replace('#text[1]', 'text()[' + markedIndex + ']');
    } else {
      path = path.replace('#text', 'text()');
    }
    return path;
  }
  static getDommark(range: Range, relativeRoot?: Node): Dommark {
    let dommark: Dommark = {
      startDom: DommarkUtil.getXPath(range.startContainer, relativeRoot),
      startOffset: range.startOffset,
      endDom: DommarkUtil.getXPath(range.endContainer, relativeRoot),
      endOffset: range.endOffset
    }
    return dommark;
  }
  static getRange(dommark: Dommark, relativeRoot?: Node): Range | null {
    let startContainer = xpath.find(dommark.startDom, relativeRoot);
    let endContainer = xpath.find(dommark.endDom, relativeRoot);
    if (startContainer && endContainer) {
      let range = new Range();
      try { 
        range.setStart(startContainer, dommark.startOffset);
        range.setEnd(endContainer, dommark.endOffset);
      } catch (err) {
        console.log("标注 %s 失败", dommark);
        return null;
      }
      return range;
    }
    return null;
  }
}