import getCars from "@/libs/getCars";
import CarCatalog from "@/components/CarCatalog";
import { Suspense } from "react";
import { LinearProgress,CircularProgress } from "@mui/material";
import CarPanel from "@/components/CarPanel";

export default function Car(){
    const cars = new Promise(resolve => setTimeout(resolve, 2000))
        .then(() => getCars());

    return(
        <main className="text-center p-5">
           
            <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-2xl font-semibold text-neutral-600 animate-pulse">
        Loading Catalog...
      </p>
      <CircularProgress size="5rem" thickness={4} sx={{ color: 'darkblue' }}/>
    </div>}>
            <CarCatalog carJson={cars}/>
            </Suspense>

        </main>
    );

}