import Button from "./Button";

const Card = ({ deskripsi, gambar }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800">
          <img src={gambar} alt="Gambar" className="w-full rounded-xl" /> {/* Render gambar */}
        </h3>
        <div className="mt-2">
          <Button /> 
        </div>
        <p className="mt-2 text-gray-500">
          {deskripsi} 
        </p>
      </div>
    </div>
  );
};

export default Card;
