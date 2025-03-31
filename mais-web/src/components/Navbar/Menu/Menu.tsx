import { useState } from "react";
import UpcomingEvents from "./Upcoming";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { SubMenu } from "./SubMenu";
import logo from "../../../assets/mais_logo_light.png";

const subMenus: Record<string, string[]> = {
  "Meet MAIS": ["Overview", "History", "Campus"],
  "Students": ["Sports", "Arts & Music", "DEA", "Student Council", "Clubs"],
  "Programs": ["PDQ", "Cambridge"],
  "Community": ["Parents", "Staff", "Alumni"],
  "Join Us": ["Admission", "Job Posting", "Contact Us", "Forums"],
};

const footerLinks: string[] = ["News", "Events", "Contact Us", "Forums"];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(true)}>
        <HiOutlineMenuAlt3 size={35} />
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#121212] text-white flex flex-col">
          <div className="w-full h-[6rem] mt-3 flex justify-center relative">
            <div className="flex flex-row items-center">
              <img src={logo} alt="Logo" className="h-full" />
              <span>
                <h1 className="text-2xl font-semibold">Mongol Aspiration</h1>
                <p className="text-md">International School</p>
              </span>
            </div>  
            <button className="absolute top-0 right-0 m-4 text-white" onClick={() => setIsOpen(false)}>
              <IoMdClose size={40} />
            </button>
          </div>
          <div className="w-full flex flex-col md:flex-row relative">
            <div className="flex w-full md:w-[60%] bg-inherit p-4 md:p-6 md:pl-20 space-x-4 md:space-x-6">
              <div className="w-full md:w-1/2">
                <nav className="mt-3 space-y-4 md:space-y-6 text-base md:text-lg w-full">
                  {Object.keys(subMenus).map((item, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => {
                        setHoveredItem(item);
                        setIsSubmenuOpen(true);
                      }}
                      className="flex justify-between w-full text-left items-center border-b border-gray-700 pb-3 md:pb-5 cursor-pointer hover:text-gray-400"
                    >
                      {item}
                      <span className="text-2xl md:text-3xl">
                        &#x203A;
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {isSubmenuOpen && hoveredItem && (
                <div
                  className="w-full md:w-1/2 bg-gray-800 p-4 md:p-6 rounded mt-4 md:mt-0"
                  onMouseEnter={() => setIsSubmenuOpen(true)}
                  onMouseLeave={() => setIsSubmenuOpen(false)}
                >
                  <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">{hoveredItem}</h2>
                  <ul className="space-y-2">
                    {subMenus[hoveredItem].map((subItem, index) => (
                      <li onClick={() => {console.log('hippy!')}} key={index} className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
                        {subItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full md:w-[30%] md:ml-auto md:pr-20 p-4 md:p-0">
              <UpcomingEvents />
            </div>
          </div>
          <div className="footer mt-auto h-[4rem] bg-gray-800 flex flex-col md:flex-row items-center p-4 md:p-0">
            <div className="w-full md:w-[50%] flex justify-center items-center mb-2 md:mb-0">
              <ul className="flex flex-wrap justify-center gap-4 md:gap-12">
                {footerLinks.map((link, index) => (
                  <li key={index} className="cursor-pointer hover:text-gray-400">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-[50%] flex justify-center items-center">
              <p>&copy; 2021 MAIS</p>
              <button>
                <a href="/publish" className="ml-4 text-blue-500 hover:underline">
                  Publish
                </a>
              </button>
            </div>  
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
