import React from 'react'
import '../Button/Button.scss'

interface IButton {
  variant: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

const Button: React.FC<IButton> = ({ variant, size, children, ...rest }) => {
  return (
    <>
      <button className={` btn btn-${variant} ${size}`} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button
