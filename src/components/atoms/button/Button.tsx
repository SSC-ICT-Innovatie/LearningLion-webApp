import './button.css'

interface ButtonProps {
  onClick: () => void,
  style?: React.CSSProperties,
  purpose?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'delete' | 'edit' | 'add' | 'cancel' | 'sucess'
  children?: React.ReactNode,
  className?: string
}

export const Button = ({onClick, style, purpose, children, className} : ButtonProps) => {
    return (
        <div onClick={onClick} style={style} className={`${purpose ? purpose : "general"} button ${className}`}>
            {children}
        </div>
    )
}