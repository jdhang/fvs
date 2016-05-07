'use strict';

const crypto = require('crypto')

const util = {
  getSha1: function (data) {
    return crypto
      .createHash('sha1')
      .update(data)
      .digest('hex')
  }
}

class ListNode {
  constructor (value, next) {
    this.value = value
    this.next = next || null
    this.id = util.getSha1(value)
  }

  toString () {
    let cur = this
    let arr = []
    while(cur) {
      arr.push(cur.id)
      cur = cur.next
    }
    return '[' + arr.join(' ') + ']'
  }

  toStringShort () {
    let cur = this
    let arr = []
    while(cur) {
      arr.push(cur.id.slice(0, 6))
      cur = cur.next
    }
    return '[' + arr.join(' ') + ']'
  }

  length () {
    return this.next ? this.next.length() + 1 : 1
  }

  shiftNode (value) {
    return new ListNode(value, this)
  }

  append (ln) {
    if (!this.next) return ln.shiftNode(this.value)
    else return new ListNode(this.value, this.next.append(ln))
  }

  remove (id) {
    if (this.id === id) return this.next
    else if (this.next) return new ListNode(this.value, this.next.remove(id))
  }

  splitAt (id) {
    if (this.id === id) return null
    else if (this.next) return new ListNode(this.value, this.next.splitAt(id))
  }

  find (id) {
    if (this.id === id) return this
    else if (this.next) return this.next.find(id)
    else return null
  }

  insertAt (id, ln) {
    if (this.id === id) return ln.append(this)
    else return new ListNode(this.value, this.next.insertAt(id, ln))
  }

  commonAncestor (ln) {
    let ancestor = ln.find(this.id)
    return ancestor ? ancestor : this.next.commonAncestor(ln)
  }
}

module.exports = { util: util, ListNode: ListNode };
