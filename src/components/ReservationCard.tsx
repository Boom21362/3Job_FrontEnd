'use client'
import { useAppSelector,AppDispatch } from "@/redux/store"
import { useDispatch, UseDispatch } from "react-redux"
import { removeReservation } from "@/redux/features/cartSlice"

export default function ReservationCard(){

    const dispatch = useDispatch<AppDispatch>()
    
    const carItems = useAppSelector((state)=>{
        return state.cartSlice.carItems
    })
    
    return(
        <>
            {
                carItems.map((reservationItems)=>(
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={reservationItems.carId}>
                        <div className="text-xl">{reservationItems.carModel}</div>
                        <div className="text-sm">Pick up {reservationItems.pickupDate} from {reservationItems.pickupLocation}</div>
                        <div className="text-sm">Return {reservationItems.returnDate} at {reservationItems.returnLocation}</div>
                        <div className="text-xl">Duration: {reservationItems.numOfDays}</div>  
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm mouse-pointer" onClick={()=>dispatch(removeReservation(reservationItems))}>
                        Remove from cart</button>
                    </div>                
                    
                ))
            }
        </>
    )
}