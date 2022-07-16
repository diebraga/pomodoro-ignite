import styled from 'styled-components'

type ButtonVariants = 'primary' | 'secondary' | 'success' | 'danger'

interface ButtonProps {
  variant?: ButtonVariants
}

interface ButtonContaineProps {
  variant: ButtonVariants
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Button</ButtonContainer>
}

const ButtonContainer = styled.button<ButtonContaineProps>`
  height: 40px;
  width: 100px;
`
