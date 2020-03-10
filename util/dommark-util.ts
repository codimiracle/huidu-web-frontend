const xpath = require('xpath-dom');

interface Dommark {
  startDom: string;
  startOffset: number;
  endDom: string;
  endOffset: number;
}

export default class DommarkUtil {
  static getXPath(node: Node, relativeRoot: Node) {
    let path: string = xpath.getUniqueXPath(node, relativeRoot);
    path = path.replace('#text', 'text()');
    return path;
  }
  static getDommark(range: Range, relativeRoot?: Node) {
    let dommark = {
      startContainer: DommarkUtil.getXPath(range.startContainer, relativeRoot),
      startOffset: range.startOffset,
      endContainer: DommarkUtil.getXPath(range.endContainer, relativeRoot),
      endOffset: range.endOffset
    }
    return dommark;
  }
  static getRange(dommark: Dommark, relativeRoot?: Node) {
    let startContainer = xpath.find(dommark.startDom, relativeRoot);
    let endContainer = xpath.find(dommark.endDom, relativeRoot);
    if (startContainer && endContainer) {
      let range = new Range();
      range.setStart(startContainer, dommark.startOffset);
      range.setEnd(endContainer, dommark.endOffset);
      return range;
    }
    return null;
  }
}