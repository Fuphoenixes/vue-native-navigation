let userAgent = null
const iosReg = /(iPhone|iPhone OS|Phone|iOS)/i
const AndroidReg = /Android/i
if (iosReg.test(navigator.userAgent)) {
  userAgent = {
    type: 'ios'
  }
} else if (AndroidReg.test(navigator.userAgent)) {
  const index = navigator.userAgent.indexOf('Android')
  userAgent = {
    type: 'Android',
    version: parseFloat(navigator.userAgent.slice(index + 8))
  }
} else {
  userAgent = {
    type: 'pc'
  }
}
export default userAgent
