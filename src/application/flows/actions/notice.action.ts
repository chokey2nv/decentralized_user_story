const pkg = '[NOTICE]',
SUCCESS_NOTICE = `${pkg} success`,
ERROR_NOTICE = `${pkg} error`,
WARNING_NOTICE = `${pkg} warning`;
export const showSuccessNotice = (message: any) => ({
  type: SUCCESS_NOTICE,
  payload: message
})
export const showErrorNotice = (message: any) => ({
  type: ERROR_NOTICE,
  payload: message
})
export const showWarningNotice = (message: any) => ({
  type: WARNING_NOTICE,
  payload: message
})