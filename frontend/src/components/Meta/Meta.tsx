import { Helmet } from 'react-helmet-async'

export const Meta = ({ 
		title = 'Welcome to Proshop', 
		description = 'We sell the best products for cheap', 
		keywords = 'electronics, buy electronics, cheap electronics' 
}) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description}></meta>
			<meta name='keywords' content={keywords}></meta>
		</Helmet>
	)
}
