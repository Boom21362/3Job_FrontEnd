import ProductCard from "./ProductCard"
import Link from "next/link"

interface Car {
  id: string;
  model: string;
  picture: string;
}

interface CarCatalogProps {
  carJson: {
    count: number;
    data: Car[];
  };
}

export default async function CarCatalog({ carJson }: CarCatalogProps) {
  const carJsonReady = await carJson
  return (
    <>
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
            className="w-1/5"
            key={carItem.id}
          >
            <ProductCard carName={carItem.model} imgSrc={carItem.picture} />
          </Link>
        ))}
      </div>
    </>
  );
}