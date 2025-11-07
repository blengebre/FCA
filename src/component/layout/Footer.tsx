import { ArrowRight, Mail, MapPin, Phone, ShoppingCart } from "lucide-react"

function Footer(){
    return(
    <div  className="bg-slate-900 text-gray-400 h-[500px]">
        <div className="grid grid-cols-4 grid-rows-1 pl-[150px] pt-[50px] gap-4  ">
            <div>
                <div className="inline-flex items-center justify-center rounded-full p-1 bg-gradient-to-r from-pink-500 to-blue-900 my-[10px]">
                  <ShoppingCart className="w-6 h-6 text-white"/>
                </div>
                <p>Your one-stop destination for quality <br />products at great prices. Shop with <br />confidence and enjoy fast, reliable <br />delivery.</p>
                <ul className="mt-[20px]">
                    <li className=" flex py-1"> <Mail className="w-5 h-5 text-pink-400 mr-2" /> support@birhanu.et</li>
                    <li className=" flex py-1 "> <Phone className="w-5 h-5 text-blue-400 mr-2" /> +2519999999</li>
                    <li className=" flex py-1">  <MapPin className="w-5 h-5 text-pink-400 mr-2" />Addis Ababa, Ethiopia</li>
                </ul>
 
            </div>
            <div className="pl-[50px] my-[10px]">
               <h4 className="font-bold text-xl text-white pb-4"> Shop</h4>

  <li>All Products</li>
    <li>Electronics</li>
  <li> Clothing</li> 
   <li> Books</li> 
            </div>
            <div className="my-[10px]">
                         <h4 className="font-bold text-xl text-white pb-4"> Support</h4>
  <li> Help Center</li>
    <li>   Contact Us</li>
  <li>  Shipping Info</li> 
   <li>    Returns</li> 
            </div>
                     <div className="my-[10px]">
                         <h4 className="text-bold text-xl text-white pb-4" > Company</h4>
  <li>    About Us</li>
    <li>       Careers</li>
  <li>  Privacy Policy </li> 
   <li>   Terms of Service </li> 
            </div>


        </div>
        <hr  className="ml-[150px]  mr-[100px] text-white/15"/>
        <div className=" pl-[150px] pt-[50px] flex ">
          
          <div>
             <h5 className="font-bold">Stay Updated</h5>
            <p>

Get the latest deals and product updates
</p>
            </div> 
            <div>
<form action="
    " className="ml-[690px] flex">
      <input className="border-1 pl-[15px] text-white bg-gray-500/15 border-white/30 rounded-l-2xl w-[300px]" type="text" placeholder ="Enter your email address" />
     <button className=" flex justify-center bg-gradient-to-r from-pink-500 to-blue-900 text-white font-bold  rounded-r-2xl p-2 w-[150px]">
      Subscribe <ArrowRight className="ml-3.5"/> 
    </button>
    </form>
            </div>
    
   
   </div>
   <hr className="text-white/15 ml-[150px]  mr-[100px] mt-5"/>
        </div>

    )
}
export default Footer
