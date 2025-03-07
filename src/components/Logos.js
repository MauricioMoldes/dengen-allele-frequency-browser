


const Logos = () => {
  return (
    <div className="flex justify-center items-center space-x-16 bg-gray-100 py-6">
	  <a
        href="https://www.rigshospitalet.dk"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rigshospitalet_logo.svg/800px-Rigshospitalet_logo.svg.png?20171103201311"
        alt="Rigshospitalet Logo"
        className="h-16 object-contain"
      />
	  </a>
	<a 
        href="https://eng.ngc.dk" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
      <img
        src="https://www.eng.ngc.dk/Media/638519742622405413/logo-2024.svg"
        alt="Danish National Genome Center Logo"
        className="h-16 object-contain"
      />
	 </a>
    </div>
  );
}

export default Logos;
