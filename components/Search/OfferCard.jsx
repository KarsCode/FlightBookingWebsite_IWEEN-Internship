

// eslint-disable-next-line react/prop-types
const OfferCard = ({ category, title, description, imageUrl }) => {
  return (
    <div className="flex items-center justify-center gap-5 p-3 shadow-2xl rounded-2xl">
        <div className="">
            {/* Image */}
            <img src={imageUrl} alt={'Img'} className="h-100 w-100 object-cover rounded-2xl"/>
        </div>
        <div className="flex flex-col gap-3">
            <div>
            {category}
            </div>
            <div className="font-bold text-xl">
            {title}
            </div>
            <div className="font-extralight">
            {description}
            </div>
            
            <div>
                <button className="bg-[#06539A] text-white w-1/2 p-2 font-normal rounded-full">
                    Know More
                </button>
            </div>
        </div>
    </div>
  )
}

export default OfferCard
