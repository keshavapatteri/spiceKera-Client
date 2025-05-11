
import { motion } from "framer-motion";
import { UserSlide } from "../Components/User/UserSlide";
import UserReviews from "../Components/User/UserReviews";
import { UserCards } from "../Components/User/UserCards";
import { Category } from "../Components/User/Categery";



export const UserHomePage = () => {


  return (
  
  <div>
<UserSlide/>
{/* cattegery */}


<Category/>
{/* cards */}
<UserCards/>


{/* About */}
    <div className="w-full px-6 py-12 bg-white pl-25 ">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left transition duration-300 group-hover:scale-105 group-hover:text-red-500">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Spice Kera
          </h1>
          <p className="text-gray-600 text-lg">
            We serve authentic, freshly prepared meals that bring flavor and joy to every bite.
            Whether you're craving classic Indian dishes or modern twists, we've got you covered!
          </p>
        </div>

        {/* Right: Image */}
        <motion.div
          className="md:w-1/4"
          whileHover={{ rotate: 1, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src="https://images.unsplash.com/photo-1551024601-bec78aea704b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Delicious food"
            className="w-full h-auto rounded-xl shadow-xl object-cover transition duration-300 group-hover:shadow-red-400"
          />
        </motion.div>
      </motion.div>
    </div>

{/* Review */}
<UserReviews/>

</div>
   
  );
};