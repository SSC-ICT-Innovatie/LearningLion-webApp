
interface OptionProps {
  children: string
  onClick?: () => void
}

export const Option = ({ children, onClick }: OptionProps): JSX.Element => {
  return (
  <div className='option'>
    <p onClick={onClick}>{children}</p>
  </div>
  )
}