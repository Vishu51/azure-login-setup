// # Password Validator #
// 패스워드 유효성 검사기능을 제공한다.
// getPasswordValidation(userId, password, user) 함수로 검사하며
// user는 passwordPolicyEnable, pwMinimumLength를 담고있어야한다.
'use strict'

import commons from '@/plugins/commons'

const consecutiveAlphabet = {
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  getIdx (c) {
    const matchedChar = this.alphabet.findIndex(alph => alph === c.toLowerCase())
    if (matchedChar !== -1) {
      return { row: 0, col: matchedChar }
    }
    return { row: -1, col: -1 }
  }
}
// A keyboard layout to check consecutive characters.
const qwerty = {
  keyboard: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  ],
  getIdx (c) {
    for (const row in this.keyboard) {
      const matchedCharCol = this.keyboard[row].findIndex(col => col === c.toLowerCase())
      if (matchedCharCol !== -1) {
        return { row: row, col: matchedCharCol }
      }
    }
    return { row: -1, col: -1 }
  }
}

const hasConsecutiveChars = (password) => {
  let count = 0
  for (let idx = 0; idx < password.length - 1; idx++) {
    if (password[idx] === password[idx + 1]) {
      count++
    } else {
      count = 0
    }
    if (count === 2) return true
  }
  return false
}

const hasPattern = (password, pattern) => {
  const passwordChars = password.split('')
  let count = 0
  for (let i = 0; i < passwordChars.length - 1; i++) {
    const thisCharIdx = pattern.getIdx(passwordChars[i]) // this character's position
    const nextCharIdx = pattern.getIdx(passwordChars[i + 1]) // next character's position
    if (
      thisCharIdx.row === -1 ||
      nextCharIdx.row === -1 ||
      thisCharIdx.col === -1 ||
      nextCharIdx.col === -1
    ) { // when the character is not one of the characters in a qwerty keyboard
      count = 0
      continue
    }
    if (thisCharIdx.row !== nextCharIdx.row) { // when the rows are not matching
      count = 0
      continue
    }
    if (Math.abs(Number(thisCharIdx.col) - Number(nextCharIdx.col)) < 2) { // when two charasers are close to eachother
      if (count === 1) return true // when the password has more than two characters in a sequence
      count++
    }
  }
  return false
}

const userInfo = {
  user: {},
  userId: ''
}

const validator = {
  minCharLength: {
    isValid (val) {
      return RegExp(`^\\S{${userInfo.user.pwMinimumLength},}$`).test(val)
    },
    msg: 'Password must be 8 or more characters in length.'
  },
  specialChar: {
    isValid (val) {
      return RegExp('[!@#$%^&*()\\_\\+\\-={};\':"|,.<>/?]').test(val)
    },
    msg: 'Password must contain 1 or more special characters.'
  },
  number: {
    isValid (val) {
      return RegExp('[0-9]').test(val)
    },
    msg: 'Password must contain 1 or more digit characters.'
  },
  upperCase: {
    isValid (val) {
      return RegExp('^(?=.*[A-Z])').test(val)
    },
    msg: 'Password must contain 1 or more uppercase characters.'
  },
  lowerCase: {
    isValid (val) {
      return RegExp('^(?=.*[a-z])').test(val)
    },
    msg: 'Password must contain 1 or more lowercase characters.'
  },
  consecutiveChars: {
    isValid (val) {
      return (
        !hasConsecutiveChars(val) &&
                !hasPattern(val, qwerty) &&
                !hasPattern(val, consecutiveAlphabet)
      )
    },
    msg: 'Password cannot contains consecutive characters.'
  },
  containsUserId: {
    isValid (val) {
      return RegExp(`^((?!${userInfo.userId}).)*$`).test(val)
    },
    msg: `Password contains the user id '${userInfo.userId}'.`
  }
}

export const getPasswordValidation = (userId, password, user) => {
  if (user.pwPolicyEnable === 'true') {
    userInfo.user = user
    userInfo.userId = userId
    for (const key of Object.keys(validator)) {
      if (validator[key].isValid(password)) continue
      return { result: false, msg: validator[key].msg }
    }
    return { result: true, msg: '' }
  } else {
    return { result: true, msg: '' }
  }
}

// # Email validator #
const emailValidator = {
  isValid (val) {
    // Roughly checks if the value is valid email address.
    // e-mail: A@B.C
    // e-mail이 null, '', undefined 등 빈 값인경우 유효성 검사 하지 않는다.
    if (val === null || val === '' || val === undefined) return true
    if (typeof val !== 'string') return false
    const atIdx = val.indexOf('@')
    const dotIdx = val.indexOf('.', atIdx)
    const A = val.substring(0, atIdx)
    const B = val.substring(atIdx + 1, dotIdx)
    const C = val.substring(dotIdx + 1, val.length)
    if ([atIdx, dotIdx].includes(-1)) return false
    if ([A, B, C].find(t => !commons.isValidStr(t)) !== undefined) return false
    if (val.split('').filter(v => v === '@').length > 1) return false
    return true
  },
  msg: 'The email address is invalid.'
}

export const getEmailValidation = (email) => {
  if (emailValidator.isValid(email) === true) return { result: true, msg: '' }
  return { result: false, msg: emailValidator.msg }
}
