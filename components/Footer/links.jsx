

const links = () => {
    return (
        <div className="flex gap-32">
            <div className="flex flex-col items-start w-1/2">
                <div className="font-semibold">
                    Company
                </div>
                <div className="flex flex-col font-light items-start">
                <a href="/">Home</a>
                <a href="/about" >About Us</a>
                <a href="/contact" >Contact Us</a>
                </div>
            </div>
    
            <div className="flex flex-col items-start w-1/2">
                <div className="font-semibold">
                    Product
                </div>
                <div className="flex flex-col font-light items-start">
                <a href="/flight" >Flight</a>
                <a href="/hotel" >Hotel</a>
                <a href="/insurance" >Insurance</a>
                </div>
            </div>
        </div>
      );
    };


export default links
