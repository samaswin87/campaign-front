
export const chatStyle = (type: string) => {
  const styleMap: { [key: string]: any } = {
    draft: { type: 'info', icon: 'el-icon-loading', color: '#c0c4cc' },
    outbound: { type: 'success', icon: 'el-icon-s-promotion', color: '#65a783' },
    inbound: { type: 'primary', icon: 'el-icon-message', color: '#80bcf5' }
  }
  return styleMap[type]
}

export const moustacheJson = (recipient: any) => {
  const moustacheKeys :any = {}
  if (!recipient) {
    return moustacheKeys
  }
  moustacheKeys['{first_name}'] = recipient.first_name
  moustacheKeys['{last_name}'] = recipient.last_name
  if (recipient.middle_name) {
    moustacheKeys['{middle_name}'] = recipient.middle_name
  }

  moustacheKeys['{gender}'] = recipient.gender ? 'Female' : 'Male'
  if (recipient.custom_fields) {
    Object.keys(recipient.custom_fields).map((key) => {
      moustacheKeys['{' + key + '}'] = recipient.custom_fields[key]
    })
  }
  return moustacheKeys
}

export default { chatStyle, moustacheJson }
