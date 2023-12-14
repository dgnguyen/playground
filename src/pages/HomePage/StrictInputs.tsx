import React, { KeyboardEvent } from 'react'

import { Box, TextField, Typography } from '@mui/material'

const StrictInputs = () => {

  const [inputValue, setFieldValue] = React.useState<string | number>(0)

  const keyCodeForNavigate = ['ArrowLeft', 'ArrowRight', 'BackSpace']

  function handleKeyDownRate(event: KeyboardEvent<HTMLInputElement>) {
    const eventTarget = event.target as HTMLInputElement
    const currentValue = eventTarget.value
    const keyCode = event.key

    // allow numeric value with dots optional and navigate keycode
    if (/^[0-9]*\.?[0-9]*$/.test(keyCode) || keyCodeForNavigate.includes(keyCode)) {
      const selectionStart = eventTarget?.selectionStart || 0
      const selectionEnd = eventTarget?.selectionEnd || 0
      let newValue = ''
      if (keyCode === 'Backspace')
        newValue =
          currentValue.substring(0, selectionStart - 1) +
          currentValue.substring(selectionEnd)
      else if (['ArrowLeft', 'ArrowRight'].includes(keyCode)) newValue = currentValue
      else {
        newValue =
          currentValue.substring(0, selectionStart) +
          keyCode +
          currentValue.substring(selectionEnd)
      }

      const hasDot = currentValue.includes('.')
      const prevent2ndDot = hasDot && keyCode === '.'

      const numericValue = parseFloat(newValue)
      const valueShouldUnder100 = numericValue >= 0 && numericValue <= 100

      const digitsPart = newValue?.split('.')?.[1] || []
      const preventMoreThan2Digit = digitsPart.length > 2

      const preventValueSup100 = !valueShouldUnder100 && newValue !== ''

      if (prevent2ndDot || preventMoreThan2Digit || preventValueSup100) {
        event.preventDefault()
        return
      }
      if (newValue === '' || numericValue === 0) setFieldValue(0)
      else setFieldValue(newValue)
    } else {
      // Prevent input for any other keys (e.g., letters, special characters)
      event.preventDefault()
    }
  }

  function handleKeyDownFixed(event: KeyboardEvent<HTMLInputElement>) {
    const eventTarget = event.target as HTMLInputElement
    const currentValue = eventTarget.value
    const keyCode = event.key

    // allow numeric value with dots optional and navigate keycode
    if (/^[0-9]*\.?[0-9]*$/.test(keyCode) || keyCodeForNavigate.includes(keyCode)) {
      const selectionStart = eventTarget?.selectionStart || 0
      const selectionEnd = eventTarget?.selectionEnd || 0
      let newValue = ''
      if (keyCode === 'Backspace')
        newValue =
          currentValue.substring(0, selectionStart - 1) +
          currentValue.substring(selectionEnd)
      else if (['ArrowLeft', 'ArrowRight'].includes(keyCode)) newValue = currentValue
      else {
        newValue =
          currentValue.substring(0, selectionStart) +
          keyCode +
          currentValue.substring(selectionEnd)
      }

      const hasDot = currentValue.includes('.')
      const prevent2ndDot = hasDot && keyCode === '.'

      const numericValue = parseFloat(newValue)
      const valueShouldUnder100 = numericValue >= 0 && numericValue <= 100

      const digitsPart = newValue?.split('.')?.[1] || []
      const preventMoreThan2Digit = digitsPart.length > 2

      const preventValueSup100 = !valueShouldUnder100 && newValue !== ''

      if (prevent2ndDot || preventMoreThan2Digit || preventValueSup100) {
        event.preventDefault()
        return
      }
      if (newValue === '' || numericValue === 0) setFieldValue(0)
      else setFieldValue(newValue)
    } else {
      // Prevent input for any other keys (e.g., letters, special characters)
      event.preventDefault()
    }
  }
  return (<Box>
    <Typography variant="h4">Strict inputs</Typography>
    <Typography>Input type text for percentage, allow from 0 to 100% with 2 digits after dots</Typography>
    <TextField value={inputValue} onKeyDown={handleKeyDownRate} />
    <Typography>Input type text for number, allow only number with no digits</Typography>
    <TextField value={inputValue} onKeyDown={handleKeyDownFixed} />
  </Box>)
}

export default StrictInputs
