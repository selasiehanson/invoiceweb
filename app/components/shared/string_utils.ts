interface IUtil {
  contains(owner: Array<any>, sub: any)
}

let Utils: IUtil = {

  /**
  * Check if b in contained in a
  */
  contains(owner, sub) {
    if (typeof (sub) !== 'string') return false;
    return owner.indexOf(sub) > -1;
  }
}

export { Utils };
