import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";

export default async function carDetailPage({params}:{params: Promise<{cid:string}>}){

    const carDetail = await getCar((await params).cid)
    const { cid } = await params;
    /*
    const mockCarRepo = new Map();
    mockCarRepo.set("001",{name:"Toyota Fortuner",image:"/img/car1.jpg"})
    mockCarRepo.set("002", {name:"Toyota Camry",image:"/img/car2.avif"})
    mockCarRepo.set("003",{name:"Toyota Yaris Ativ",image:"/img/car3.jpeg"})
    mockCarRepo.set("004", {name:"Toyota Bz4x",image:"/img/car4.jpg"})
    
    const carItem = mockCarRepo.get(cid);*/

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium"> {carDetail.data.model} </h1>
            <div className="flex flex-row my-5">
                <Image src={carDetail.data.picture}
                    alt = 'Car Image'   
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                <div className="text-md  mx-5 text-left"> {carDetail.data.description} 
                    <div className="text-md  mx-5">Doors: {carDetail.data.doors} </div>
                    <div className="text-md  mx-5">Seats: {carDetail.data.seats} </div>
                    <div className="text-md  mx-5">Large bags: {carDetail.data.largebags} </div>
                    <div className="text-md  mx-5">Small bags: {carDetail.data.smallbags} </div>
                    <div className="text-md  mx-5">Day Rate: {carDetail.data.dayrate} (insurance included) </div>
                </div>
                <Link href={`/reservations?id=${cid}&model=${carDetail.data.model}`}>
                 <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                    Make Reservation
                 </button>
                 </Link>
            </div>
            
        </main>
    );
}

export async function generateStaticParams(){
    return [{cid:'001'},{cid:'002'},{cid:'003'}]

}