import ImageCode from '../util/imageCode';
import Encrypto from '../util/encrypto';

module.exports = {
  encryptText(text) {
    return Encrypto.encryptText(this, text);
  },
  createImageCode() {
    return ImageCode.createImageCode(this.ctx);
  },
  verifyImageCode(clientCode) {
    ImageCode.verifyImageCode(this.ctx, clientCode);
  },
};
