import ProductCard from "./ProductCard"
import Link from "next/link"

interface Car {
  id: string;
  model: string;
  picture: string;
}

interface CarCatalogProps {
  carJson: Promise<{
    count: number;
    data: Car[];
  }>;
}

export default async function CarCatalog({ carJson }: CarCatalogProps) {
  const carJsonReady = await carJson
  return (
    <>
       <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
      <p className="text-xl font-semibold">
        Explore {carJsonReady.count} models in our catalog
      </p>
      
      <div 
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around"
        }}
      >
        {carJsonReady.data.map((carItem) => (
          <Link 
            href={`/car/${carItem.id}`} 
            className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
            key={carItem.id}
          >
            <ProductCard carName={carItem.model} imgSrc={carItem.picture} />
          </Link>
        ))}
      </div>
    </>
  );
}