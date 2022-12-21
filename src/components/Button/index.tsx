import React, { ButtonHTMLAttributes } from 'react'

import '../Button/Button.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

const Button: React.FC<IButton> = ({
  variant,
  type,
  size,
  children,
  ...rest
}) => {
  return (
    <>
      <button className={` btn btn-${variant} ${size}`} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button
