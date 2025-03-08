import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"



export const Rating = ({ value, text = ''}: {value: number, text?: string}) => {

	const renderStar = (index: number) => {
		if (value >= index) return <FaStar />;
		if (value >= index - 0.5) return <FaStarHalfAlt />;
		return <FaRegStar />;
	};

	const stars = Array.from({ length: 5 }, (_, index) => (
		<span key={index}>{
			renderStar(index + 1)
		}</span>
	));

	return (
		<div className="rating">
			{stars}
			<span className="rating-text">{text && text}</span>
		</div>
	)
}
