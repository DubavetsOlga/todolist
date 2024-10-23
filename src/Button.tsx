type ButtonPropsType = {
	title: string
	onClick: () => void
	isDisabled?: boolean
	className?: string
}

export const Button = ({title, onClick, isDisabled, className}: ButtonPropsType) => {
	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			className={className}
		>
			{title}
		</button>
	)
}
