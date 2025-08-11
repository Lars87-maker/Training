export function Button({variant='primary', ...props}:{variant?: 'primary'|'ghost'} & React.ButtonHTMLAttributes<HTMLButtonElement>){
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  return <button {...props} className={`${cls} ${props.className||''}`} />
}
