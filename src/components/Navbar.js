import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      {/* Rigshospitalet Logo Above Navbar - Left Aligned */}
      <div className="flex justify-start py-8 bg-white shadow-md">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rigshospitalet_logo.svg/800px-Rigshospitalet_logo.svg.png?20171103201311"
          className="h-12 ml-4"
          /*src="/image.png"*/
          /*src="dengen_dall-e.webp"*/
          /*src="dengen_dall-e_tentative.png"   */       
          alt="Rigshospitalet"
          /*className="h-[140px] w-auto ml-4 rounded-full"*/ 
          
        />
      </div>

      
      {/* Navbar */}
      <nav className="bg-[#003865] shadow-md py-2 px-4">
       <div className="flex justify-between items-center">
         <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/terms" className="text-white hover:underline">
                Terms of Use
              </a>
            </li>
          </ul>
          </div>
        </nav>

    </div>
  );
};

export default Navbar;

