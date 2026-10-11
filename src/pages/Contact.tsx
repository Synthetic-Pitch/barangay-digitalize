import { useEffect, useRef, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import {Mail,MapPinned,Phone,Flame,Siren,Ambulance, ArrowRight, CircleCheck} from "lucide-react";

const Contact = () => {

    const [showSentModal, setShowSentModal] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, []);1

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        setShowSentModal(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setShowSentModal(false), 600);
    };


    const List = [
        {src:Mail,text:"TumanaMarikina@gov.com"},
        {src:MapPinned,text:"Bagong Farmers Avenue I, Barangay Tumana, Marikina City, Metro Manila"},
        {src:Phone,text:"8646-0462 / 8646 0462"},
        {src:Flame,text:"FireDepartment : 933-3076",color:"red"},
        {src:Siren,text:"PoliceDepartment : 646-1631",color:"blue"},
        {src:Ambulance,text:"Rescue: 161", color:"green"}
    ]
    
    return (
        <div>
            <Navbar/>
            <section className="flex justify-center w-full font-dm-sans">
                <main className="w-full max-w-300 px-2 md:px-8 flex flex-col md:flex-row">
                    <aside className="w-full md:w-1/2 h-140 overflow-hidden flex flex-col justify-center items-start">
                        <div className="h-[40%] w-full flex flex-col justify-center  gap-4">
                            <p className="text-4xl font-bold">
                                Talk to our <br /> support team
                            </p>
                            <p className="text-gray-500 text-sm">
                                Feel free to reach out for help your order or any <br /> questions you may have regarding purchase.
                            </p>
                        </div>
                        <ul className="grow flex flex-col justify-end mb-20 gap-4 font-dm-sans">
                            {
                                List.map((item,index)=>(
                                    <li key={index} className="flex gap-4 items-center text-sm md:text-xs">
                                        <item.src className="size-6 md:size-5" color={`${item.color || ""}`}/>
                                        <p >{item.text}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </aside>
                    <footer className="w-full md:w-1/2 h-140 flex items-center justify-center ">
                        <form action="" onSubmit={handleSendMessage} className=" bg-[#F4F8F6] flex flex-col px-2 md:px-8 h-full md:h-auto w-full md:w-100
                         justify-center space-y-3 py-8 rounded-2xl  shadow-sm">
                            <label className=" md:text-xs font-semibold" htmlFor="Fullname">Full Name</label>
                            <input className=" md:text-xs py-2 px-2 outline-0 border border-gray-300 rounded-md focus:border-[#31A63E]" type="text" id="Fullname" placeholder="enter your fullname "/>
                            <label className=" md:text-xs font-semibold" htmlFor="Email">Email Address</label>
                            <input className=" md:text-xs py-2 px-2 outline-0 border border-gray-300 rounded-md focus:border-[#31A63E]" type="text" id="Email" placeholder="enter your email"/>
                            <label className=" md:text-xs font-semibold" htmlFor="number">Phone number</label>
                            <input className=" md:text-xs py-2 px-2 outline-0 border border-gray-300 rounded-md focus:border-[#31A63E]" type="text" id="number" placeholder="enter your phone number"/>
                            <label className=" md:text-xs font-semibold" htmlFor="message">Message</label>
                            <textarea className=" md:text-xs py-2 px-2 outline-0 border border-gray-300 rounded-md h-40 md:h-20 focus:border-[#31A63E]" name="" id="message"></textarea>
                            <button type="submit" className="flex gap-2 items-center text-white bg-[#125F44] self-start px-8 py-2 rounded-2xl  cursor-pointer group outline-0 text-xl md:text-xs">Send Message<ArrowRight size={18} className="group-hover:-rotate-45 transition-transform transition-all duration-75"/></button>
                        </form>
                    </footer>
                </main>
            </section>
            {showSentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="flex flex-col items-center gap-3 bg-white px-10 py-8 rounded-2xl shadow-lg">
                        <span className="flex items-center justify-center size-12 rounded-full bg-[#125F44]">
                            <CircleCheck size={28} className="text-white" />
                        </span>
                        <p className="text-sm font-semibold text-[#125F44]">Message sent successfully</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;