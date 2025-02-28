import { Alert } from "react-bootstrap"
import { MessageType } from "./Message.type"

export const Message = ({variant = 'info', children}: MessageType) => {
	return (
		<Alert variant={variant}>
			{children}
		</Alert>
	)
}
