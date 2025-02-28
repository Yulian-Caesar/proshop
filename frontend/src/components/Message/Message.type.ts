export type MessageType = {
	variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark",
	children: React.ReactNode
}