import efg from "../images/forklifts/efg.webp";
import ejc from "../images/forklifts/ejc.webp";
import eje from "../images/forklifts/eje.webp";
import ekx from "../images/forklifts/ekx.webp";
import etv from "../images/forklifts/etv.webp";
import etvQ from "../images/forklifts/etv-q.webp";


export type TForklift = { shortName: string, fullName: string, image: string }

export type TRackAccessories = {
    [key in keyof typeof forklifts]: TForklift[];
};


const forklifts = [
    { shortName: 'handtruck', fullName: 'Pallet Hand Truck', image: eje },
    { shortName: 'EJC', fullName: 'EJC', image: ejc },
    { shortName: 'ETV', fullName: 'ETV', image: etv },
    { shortName: 'ETV-Q', fullName: 'ETV-Q', image: etvQ },
    { shortName: 'Cantilever', fullName: 'Cantilever', image: efg },
    { shortName: 'System', fullName: 'System Truck', image: ekx },

]

export default forklifts