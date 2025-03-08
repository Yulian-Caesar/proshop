import { Pagination } from "react-bootstrap"
import { Link } from "react-router"


const Paginate = ({ pages, page, isAdmin = false }) => {
	return (
		pages > 1 && (
			<Pagination>
				{ [...Array(pages).keys()].map(x => (
					<Link 
						key={x + 1}
						to={
							!isAdmin 
							? `/page/${x + 1}`
							: `/admin/productlist/${x + 1}`
						}
					>
						<Pagination.Item as='span' active={x + 1 === page}>
						 	{x + 1}
						</Pagination.Item>
					</Link>
				)) }
			</Pagination>
		)
	)
}

export default Paginate